import { join } from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { Network, Runtime, Service, Services } from '@shakerquiz/utilities'

/** @enum {string} */
const Platform = {
  ...Runtime,
  Bun: 'Bun',
  Deno: 'Deno',
  Vite: 'Vite',
}

/** @type {Record<string, string>} */
const ConsumerPlatform = {
  [Service['Checkin']]: Platform['Deno'],
  [Service['Cities']]: Platform['Deno'],
  [Service['Files']]: Platform['Bun'],
  [Service['Games']]: Platform['Deno'],
  [Service['Hub']]: Platform['Next'],
  [Service['Integrations']]: Platform['Bun'],
  [Service['Landing']]: Platform['Next'],
  [Service['Locations']]: Platform['Deno'],
  [Service['Procedures']]: Platform['Bun'],
  [Service['Registrations']]: Platform['Deno'],
  [Service['Roles']]: Platform['Deno'],
  [Service['Themes']]: Platform['Deno'],
  [Service['Updates']]: Platform['Bun'],
  [Service['Users']]: Platform['Deno'],
  [Service['Venues']]: Platform['Deno'],
  [Service['Vkma']]: Platform['Vite'],
}

/**
 * @param {string} service
 * @param {string} network
 * @param {string} platform
 * @returns {string}
 */
const generateEnvVarName = (service, network, platform) => {
  const baseVar = `${service.toUpperCase()}_${network.toUpperCase()}_ORIGIN`
  switch (platform) {
    case Platform['Vite']:
      return `VITE_${baseVar}`
    case Platform['Next']:
      return `NEXT_PUBLIC_${baseVar}`
    default:
      return baseVar
  }
}

/**
 * @param {string} varName
 * @param {string} platform
 * @returns {string}
 */
const generateEnvAccess = (varName, platform) => {
  switch (platform) {
    case Platform['Deno']:
      return `Deno.env.get('${varName}')`
    case Platform['Vite']:
      return `import.meta.env.${varName}`
    case Platform['Bun']:
    case Platform['Next']:
    default:
      return `process.env.${varName}`
  }
}

/**
 * @param {string} platform
 * @returns {string}
 */
const generateServiceNetworkOriginEntries = platform =>
  Services.map(service => {
    const networkEntries = Object.values(Network).map(network => {
      const varName = generateEnvVarName(service, network, platform)
      const envAccess = generateEnvAccess(varName, platform)
      return `[Network['${network}']]: ${envAccess},`
    }).join('\n')
    return `[Service['${service}']]: {\n${networkEntries}\n},`
  }).join('\n')

/**
 * @param {string} platform
 * @param {string} template
 * @returns {string}
 */
const generateFileContent = (platform, template) =>
  template.replace(
    `export var ServiceNetworkOrigin = {}`,
    `export var ServiceNetworkOrigin = {\n${generateServiceNetworkOriginEntries(platform)}\n}`,
  )

/**
 * @param {string} consumer
 * @param {string} content
 */
const writeConsumerFile = async (consumer, content) => {
  const dirPath = join('source', consumer.toLowerCase())
  const filePath = join(dirPath, 'index.js')
  await mkdir(dirPath, { recursive: true })
  await writeFile(filePath, content)
  return filePath
}

const generateAll = async () => {
  const template = await readFile('template.js', 'utf-8')

  const results = await Promise.all(
    Object.entries(ConsumerPlatform).map(async ([consumer, platform]) => {
      const content = generateFileContent(platform, template)
      const filePath = await writeConsumerFile(consumer, content)
      return { Consumer: consumer, Platform: platform, Path: filePath }
    }),
  )

  console.log('\n📦 Generated files:\n')
  console.table(results)

  const platformCounts = results.reduce((acc, { Platform: p }) => {
    acc[p] = (acc[p] || 0) + 1
    return acc
  }, {})

  console.log('\n📊 Platform distribution:\n')
  console.table(
    Object.entries(platformCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([platform, count]) => ({ Platform: platform, Count: count })),
  )
}

await generateAll()
