import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Service, Services } from '@shakerquiz/utilities'

// ============================================================================
// Platform enum - defines supported execution platforms
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
// Network enum - defines network types for env variable naming
// ============================================================================

/** @enum {string} */
const Network = {
  Docker: 'Docker',
  Public: 'Public',
}

const Networks = Object.values(Network)

// ============================================================================
// Consumer to Platform mapping
// ============================================================================

/** @type {Record<string, string>} */
const ConsumerPlatform = {
  checkin: Platform.Deno,
  cities: Platform.Deno,
  files: Platform.Node,
  games: Platform.Deno,
  hub: Platform.NextJs,
  integrations: Platform.Node,
  landing: Platform.NextJs,
  locations: Platform.Deno,
  procedures: Platform.Node,
  registrations: Platform.Deno,
  roles: Platform.Deno,
  themes: Platform.Deno,
  updates: Platform.Node,
  users: Platform.Deno,
  venues: Platform.Deno,
  vkma: Platform.Vite,
}

const Consumers = Object.keys(ConsumerPlatform)

// ============================================================================
// Environment variable access generators per platform
// ============================================================================

/**
 * Generates env variable name based on service, network and platform
 * @param {string} service - Service name (e.g., 'Users')
 * @param {string} network - Network type (e.g., 'Docker')
 * @param {string} platform - Target platform
 * @returns {string} - Environment variable name
 */
const generateEnvVarName = (service, network, platform) => {
  const baseVar = `${service.toUpperCase()}_${network.toUpperCase()}_ORIGIN`

  switch (platform) {
    case Platform.Vite:
      return `VITE_${baseVar}`
    case Platform.NextJs:
      return `NEXT_PUBLIC_${baseVar}`
    default:
      return baseVar
  }
}

/**
 * Generates env variable access code based on platform
 * @param {string} varName - Environment variable name
 * @param {string} platform - Target platform
 * @returns {string} - Code to access the env variable
 */
const generateEnvAccess = (varName, platform) => {
  switch (platform) {
    case Platform.Deno:
      return `Deno.env.get('${varName}')`
    case Platform.Vite:
      return `import.meta.env.${varName}`
    case Platform.Node:
    case Platform.Bun:
    case Platform.NextJs:
    default:
      return `process.env.${varName}`
  }
}

// ============================================================================
// Code generation helpers
// ============================================================================

/**
 * Generates ServiceNetworkOrigin object entries
 * @param {string} platform - Target platform
 * @returns {string} - Generated code for ServiceNetworkOrigin object
 */
const generateServiceNetworkOriginEntries = platform =>
  Services.map(service => {
    const networkEntries = Networks.map(network => {
      const varName = generateEnvVarName(service, network, platform)
      const envAccess = generateEnvAccess(varName, platform)
      return `    [Network['${network}']]: ${envAccess},`
    }).join('\n')

    return `  [Service['${service}']]: {\n${networkEntries}\n  },`
  }).join('\n\n')

/**
 * Generates the complete index.js file content for a consumer
 * @param {string} platform - Target platform
 * @returns {string} - Complete file content
 */
const generateFileContent = platform => `import { hydrateRoutePathname, inferNetwork, inferRoute, inferRouteService, Network, Service } from '@shakerquiz/utilities'

export var ServiceNetworkOrigin = {
${generateServiceNetworkOriginEntries(platform)}
}

/** @returns {string} */
export const inferOrigin = Object.freeze((service, network) => {
  if (!(service in ServiceNetworkOrigin))
    throw TypeError(\`Service '\${service}' does not exist.\`)

  if (!(network in ServiceNetworkOrigin[service]))
    throw TypeError(\`Network '\${network}' in Service '\${service}' does not exist.\`)

  return ServiceNetworkOrigin[service][network]
})

export const routeRequest = Object.freeze((maybeNetwork, maybeRoute, maybeRouteParams, maybeRouteSearch, init) => {
  var route = inferRoute(maybeRoute)

  if (route === 'Unknown')
    throw TypeError(\`[routeRequest] Could not infer route for value: '\${maybeRoute}'.\`)

  var service = inferRouteService(maybeRoute)

  if (service === 'Unknown')
    throw TypeError(\`[routeRequest] Could not infer service for value: '\${maybeRoute}'.\`)

  var network = inferNetwork(maybeNetwork)

  if (network === 'Unknown')
    throw TypeError(\`[routeRequest] Could not infer network for value: '\${maybeRoute}'.\`)

  var url = new URL(
    hydrateRoutePathname(route, maybeRouteParams),
    inferOrigin(service, network),
  )

  url.search = maybeRouteSearch

  return fetch(url, init)
})
`

// ============================================================================
// File writing
// ============================================================================

/**
 * Writes generated content to source/consumer/index.js
 * @param {string} consumer - Consumer name (directory name)
 * @param {string} content - File content to write
 */
const writeConsumerFile = async (consumer, content) => {
  const dirPath = join('source', consumer)
  const filePath = join(dirPath, 'index.js')

  await mkdir(dirPath, { recursive: true })
  await writeFile(filePath, content)

  console.log(`Generated: ${filePath}`)
}

// ============================================================================
// Main execution
// ============================================================================

const generateAll = async () => {
  console.log('Starting generation of source/*/index.js files...\n')

  const results = await Promise.all(
    Consumers.map(async consumer => {
      const platform = ConsumerPlatform[consumer]
      const content = generateFileContent(platform)
      await writeConsumerFile(consumer, content)
      return { consumer, platform }
    }),
  )

  console.log(`\nGenerated ${results.length} files successfully.`)
  console.log('\nPlatform distribution:')

  const platformCounts = results.reduce((acc, { platform }) => {
    acc[platform] = (acc[platform] || 0) + 1
    return acc
  }, {})

  Object.entries(platformCounts)
    .sort(([, a], [, b]) => b - a)
    .forEach(([platform, count]) => console.log(`  ${platform}: ${count}`))
}

await generateAll()
