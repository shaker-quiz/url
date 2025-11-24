import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Network, Service, Services } from '@shakerquiz/utilities'

// ============================================================================
// Platform enum - extends Runtime concept for build/execution environments
// ============================================================================

/** @enum {string} */
const Platform = {
  Node: 'Node',
  Deno: 'Deno',
  Bun: 'Bun',
  Vite: 'Vite',
  NextJs: 'NextJs',
}

// ============================================================================
// Consumer to Platform mapping using Service enum keys
// ============================================================================

/** @type {Record<string, string>} */
const ConsumerPlatform = {
  [Service['Checkin']]: Platform['Deno'],
  [Service['Cities']]: Platform['Deno'],
  [Service['Files']]: Platform['Node'],
  [Service['Games']]: Platform['Deno'],
  [Service['Hub']]: Platform['NextJs'],
  [Service['Integrations']]: Platform['Node'],
  [Service['Landing']]: Platform['NextJs'],
  [Service['Locations']]: Platform['Deno'],
  [Service['Procedures']]: Platform['Node'],
  [Service['Registrations']]: Platform['Deno'],
  [Service['Roles']]: Platform['Deno'],
  [Service['Themes']]: Platform['Deno'],
  [Service['Updates']]: Platform['Node'],
  [Service['Users']]: Platform['Deno'],
  [Service['Venues']]: Platform['Deno'],
  [Service['Vkma']]: Platform['Vite'],
}

const Networks = Object.values(Network)

// ============================================================================
// Environment variable access generators per platform
// ============================================================================

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
    case Platform['NextJs']:
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
    case Platform['Node']:
    case Platform['Bun']:
    case Platform['NextJs']:
    default:
      return `process.env.${varName}`
  }
}

// ============================================================================
// Code generation helpers
// ============================================================================

/**
 * @param {string} platform
 * @returns {string}
 */
const generateServiceNetworkOriginEntries = platform =>
  Services.map(service => {
    const networkEntries = Networks.map(network => {
      const varName = generateEnvVarName(service, network, platform)
      const envAccess = generateEnvAccess(varName, platform)
      return `[Network['${network}']]: ${envAccess},`
    }).join('\n')
    return `[Service['${service}']]: {\n${networkEntries}\n},`
  }).join('\n')

/**
 * @param {string} platform
 * @param {string} staticContent
 * @returns {string}
 */
const generateFileContent = (platform, staticContent) =>
  `import { hydrateRoutePathname, inferNetwork, inferRoute, inferRouteService, Network, Service } from '@shakerquiz/utilities'

export var ServiceNetworkOrigin = {
${generateServiceNetworkOriginEntries(platform)}
}

${staticContent}`

// ============================================================================
// File operations
// ============================================================================

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

// ============================================================================
// Main execution
// ============================================================================

const generateAll = async () => {
  const staticContent = await readFile(join('template', 'static.js'), 'utf-8')

  const results = await Promise.all(
    Object.entries(ConsumerPlatform).map(async ([consumer, platform]) => {
      const content = generateFileContent(platform, staticContent)
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
