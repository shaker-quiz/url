import { hydrateRoutePathname, inferNetwork, inferRoute, inferRouteService, Network, Service } from '@shakerquiz/utilities'

export var ServiceNetworkOrigin = {
  [Service['Users']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_USERS_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_USERS_PUBLIC_ORIGIN,
  },

  [Service['Roles']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_ROLES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_ROLES_PUBLIC_ORIGIN,
  },

  [Service['Checkin']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_CHECKIN_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_CHECKIN_PUBLIC_ORIGIN,
  },

  [Service['Locations']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_LOCATIONS_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_LOCATIONS_PUBLIC_ORIGIN,
  },

  [Service['Cities']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_CITIES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_CITIES_PUBLIC_ORIGIN,
  },

  [Service['Venues']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_VENUES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_VENUES_PUBLIC_ORIGIN,
  },

  [Service['Themes']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_THEMES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_THEMES_PUBLIC_ORIGIN,
  },

  [Service['Games']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_GAMES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_GAMES_PUBLIC_ORIGIN,
  },

  [Service['Registrations']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_REGISTRATIONS_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_REGISTRATIONS_PUBLIC_ORIGIN,
  },

  [Service['Files']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_FILES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_FILES_PUBLIC_ORIGIN,
  },

  [Service['Procedures']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_PROCEDURES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_PROCEDURES_PUBLIC_ORIGIN,
  },

  [Service['Integrations']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_INTEGRATIONS_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_INTEGRATIONS_PUBLIC_ORIGIN,
  },

  [Service['Updates']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_UPDATES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_UPDATES_PUBLIC_ORIGIN,
  },

  [Service['Hub']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_HUB_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_HUB_PUBLIC_ORIGIN,
  },

  [Service['Landing']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_LANDING_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_LANDING_PUBLIC_ORIGIN,
  },

  [Service['Vkma']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_VKMA_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_VKMA_PUBLIC_ORIGIN,
  },

  [Service['Minio']]: {
    [Network['Docker']]: process.env.NEXT_PUBLIC_MINIO_DOCKER_ORIGIN,
    [Network['Public']]: process.env.NEXT_PUBLIC_MINIO_PUBLIC_ORIGIN,
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
