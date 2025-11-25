import { hydrateRoutePathname, inferNetwork, inferRoute, inferRouteService, Network, Service } from '@shakerquiz/utilities'

export var ServiceNetworkOrigin = {
  [Service['Users']]: {
    [Network['Docker']]: Deno.env.get('USERS_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('USERS_PUBLIC_ORIGIN'),
  },
  [Service['Roles']]: {
    [Network['Docker']]: Deno.env.get('ROLES_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('ROLES_PUBLIC_ORIGIN'),
  },
  [Service['Checkin']]: {
    [Network['Docker']]: Deno.env.get('CHECKIN_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('CHECKIN_PUBLIC_ORIGIN'),
  },
  [Service['Locations']]: {
    [Network['Docker']]: Deno.env.get('LOCATIONS_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('LOCATIONS_PUBLIC_ORIGIN'),
  },
  [Service['Cities']]: {
    [Network['Docker']]: Deno.env.get('CITIES_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('CITIES_PUBLIC_ORIGIN'),
  },
  [Service['Venues']]: {
    [Network['Docker']]: Deno.env.get('VENUES_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('VENUES_PUBLIC_ORIGIN'),
  },
  [Service['Themes']]: {
    [Network['Docker']]: Deno.env.get('THEMES_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('THEMES_PUBLIC_ORIGIN'),
  },
  [Service['Games']]: {
    [Network['Docker']]: Deno.env.get('GAMES_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('GAMES_PUBLIC_ORIGIN'),
  },
  [Service['Registrations']]: {
    [Network['Docker']]: Deno.env.get('REGISTRATIONS_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('REGISTRATIONS_PUBLIC_ORIGIN'),
  },
  [Service['Files']]: {
    [Network['Docker']]: Deno.env.get('FILES_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('FILES_PUBLIC_ORIGIN'),
  },
  [Service['Procedures']]: {
    [Network['Docker']]: Deno.env.get('PROCEDURES_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('PROCEDURES_PUBLIC_ORIGIN'),
  },
  [Service['Integrations']]: {
    [Network['Docker']]: Deno.env.get('INTEGRATIONS_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('INTEGRATIONS_PUBLIC_ORIGIN'),
  },
  [Service['Updates']]: {
    [Network['Docker']]: Deno.env.get('UPDATES_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('UPDATES_PUBLIC_ORIGIN'),
  },
  [Service['Hub']]: {
    [Network['Docker']]: Deno.env.get('HUB_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('HUB_PUBLIC_ORIGIN'),
  },
  [Service['Landing']]: {
    [Network['Docker']]: Deno.env.get('LANDING_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('LANDING_PUBLIC_ORIGIN'),
  },
  [Service['Vkma']]: {
    [Network['Docker']]: Deno.env.get('VKMA_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('VKMA_PUBLIC_ORIGIN'),
  },
  [Service['Minio']]: {
    [Network['Docker']]: Deno.env.get('MINIO_DOCKER_ORIGIN'),
    [Network['Public']]: Deno.env.get('MINIO_PUBLIC_ORIGIN'),
  },
}

/** @returns {string} */
export const inferOrigin = Object.freeze((service, network) => {
  if (!(service in ServiceNetworkOrigin))
    throw TypeError(`Service '${service}' does not exist.`)

  if (!(network in ServiceNetworkOrigin[service]))
    throw TypeError(`Network '${network}' in Service '${service}' does not exist.`)

  return ServiceNetworkOrigin[service][network]
})

export const routeRequest = Object.freeze((maybeNetwork, maybeRoute, maybeRouteParams, maybeRouteSearch, init) => {
  var route = inferRoute(maybeRoute)

  if (route === 'Unknown')
    throw TypeError(`[routeRequest] Could not infer route for value: '${maybeRoute}'.`)

  var service = inferRouteService(maybeRoute)

  if (service === 'Unknown')
    throw TypeError(`[routeRequest] Could not infer service for value: '${maybeRoute}'.`)

  var network = inferNetwork(maybeNetwork)

  if (network === 'Unknown')
    throw TypeError(`[routeRequest] Could not infer network for value: '${maybeRoute}'.`)

  var url = new URL(
    hydrateRoutePathname(route, maybeRouteParams),
    inferOrigin(service, network),
  )

  url.search = maybeRouteSearch

  return fetch(url, init)
})
