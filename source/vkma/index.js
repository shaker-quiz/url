import { hydrateRoutePathname, inferNetwork, inferRoute, inferRouteService, Network, Service } from '@shakerquiz/utilities'

export var ServiceNetworkOrigin = {
  [Service['Roles']]: {
    [Network['Docker']]: import.meta.env.VITE_ROLES_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_ROLES_PUBLIC_ORIGIN,
  },

  [Service['Users']]: {
    [Network['Docker']]: import.meta.env.VITE_USERS_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_USERS_PUBLIC_ORIGIN,
  },

  [Service['Checkin']]: {
    [Network['Docker']]: import.meta.env.VITE_CHECKIN_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_CHECKIN_PUBLIC_ORIGIN,
  },

  [Service['Locations']]: {
    [Network['Docker']]: import.meta.env.VITE_LOCATIONS_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_LOCATIONS_PUBLIC_ORIGIN,
  },

  [Service['Cities']]: {
    [Network['Docker']]: import.meta.env.VITE_CITIES_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_CITIES_PUBLIC_ORIGIN,
  },

  [Service['Venues']]: {
    [Network['Docker']]: import.meta.env.VITE_VENUES_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_VENUES_PUBLIC_ORIGIN,
  },

  [Service['Themes']]: {
    [Network['Docker']]: import.meta.env.VITE_THEMES_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_THEMES_PUBLIC_ORIGIN,
  },

  [Service['Games']]: {
    [Network['Docker']]: import.meta.env.VITE_GAMES_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_GAMES_PUBLIC_ORIGIN,
  },

  [Service['Registrations']]: {
    [Network['Docker']]: import.meta.env.VITE_REGISTRATIONS_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_REGISTRATIONS_PUBLIC_ORIGIN,
  },

  [Service['Files']]: {
    [Network['Docker']]: import.meta.env.VITE_FILES_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_FILES_PUBLIC_ORIGIN,
  },

  [Service['Integrations']]: {
    [Network['Docker']]: import.meta.env.VITE_INTEGRATIONS_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_INTEGRATIONS_PUBLIC_ORIGIN,
  },

  [Service['Updates']]: {
    [Network['Docker']]: import.meta.env.VITE_UPDATES_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_UPDATES_PUBLIC_ORIGIN,
  },

  [Service['Procedures']]: {
    [Network['Docker']]: import.meta.env.VITE_PROCEDURES_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_PROCEDURES_PUBLIC_ORIGIN,
  },

  [Service['Minio']]: {
    [Network['Docker']]: import.meta.env.VITE_MINIO_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_MINIO_PUBLIC_ORIGIN,
  },

  [Service['Landing']]: {
    [Network['Docker']]: import.meta.env.VITE_LANDING_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_LANDING_PUBLIC_ORIGIN,
  },

  [Service['Vkma']]: {
    [Network['Docker']]: import.meta.env.VITE_VKMA_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_VKMA_PUBLIC_ORIGIN,
  },

  [Service['Hub']]: {
    [Network['Docker']]: import.meta.env.VITE_HUB_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_HUB_PUBLIC_ORIGIN,
  },

  [Service['Minio']]: {
    [Network['Docker']]: import.meta.env.VITE_MINIO_DOCKER_ORIGIN,
    [Network['Public']]: import.meta.env.VITE_MINIO_PUBLIC_ORIGIN,
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
