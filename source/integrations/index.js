import { guardKey, hydrateRoutePathname, Network, Route, RouteService, Service } from '@shakerquiz/utilities'

export var ServiceNetworkOrigin = {
  [Service['Roles']]: {
    [Network['Docker']]: process.env.ROLES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.ROLES_PUBLIC_ORIGIN,
  },

  [Service['Users']]: {
    [Network['Docker']]: process.env.USERS_DOCKER_ORIGIN,
    [Network['Public']]: process.env.USERS_PUBLIC_ORIGIN,
  },

  [Service['Checkin']]: {
    [Network['Docker']]: process.env.CHECKIN_DOCKER_ORIGIN,
    [Network['Public']]: process.env.CHECKIN_PUBLIC_ORIGIN,
  },

  [Service['Locations']]: {
    [Network['Docker']]: process.env.LOCATIONS_DOCKER_ORIGIN,
    [Network['Public']]: process.env.LOCATIONS_PUBLIC_ORIGIN,
  },

  [Service['Cities']]: {
    [Network['Docker']]: process.env.CITIES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.CITIES_PUBLIC_ORIGIN,
  },

  [Service['Venues']]: {
    [Network['Docker']]: process.env.VENUES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.VENUES_PUBLIC_ORIGIN,
  },

  [Service['Themes']]: {
    [Network['Docker']]: process.env.THEMES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.THEMES_PUBLIC_ORIGIN,
  },

  [Service['Games']]: {
    [Network['Docker']]: process.env.GAMES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.GAMES_PUBLIC_ORIGIN,
  },

  [Service['Registrations']]: {
    [Network['Docker']]: process.env.REGISTRATIONS_DOCKER_ORIGIN,
    [Network['Public']]: process.env.REGISTRATIONS_PUBLIC_ORIGIN,
  },

  [Service['Files']]: {
    [Network['Docker']]: process.env.FILES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.FILES_PUBLIC_ORIGIN,
  },

  [Service['Integrations']]: {
    [Network['Docker']]: process.env.INTEGRATIONS_DOCKER_ORIGIN,
    [Network['Public']]: process.env.INTEGRATIONS_PUBLIC_ORIGIN,
  },

  [Service['Updates']]: {
    [Network['Docker']]: process.env.UPDATES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.UPDATES_PUBLIC_ORIGIN,
  },

  [Service['Procedures']]: {
    [Network['Docker']]: process.env.PROCEDURES_DOCKER_ORIGIN,
    [Network['Public']]: process.env.PROCEDURES_PUBLIC_ORIGIN,
  },

  [Service['Minio']]: {
    [Network['Docker']]: process.env.MINIO_DOCKER_ORIGIN,
    [Network['Public']]: process.env.MINIO_PUBLIC_ORIGIN,
  },

  [Service['Landing']]: {
    [Network['Docker']]: process.env.LANDING_DOCKER_ORIGIN,
    [Network['Public']]: process.env.LANDING_PUBLIC_ORIGIN,
  },

  [Service['Vkma']]: {
    [Network['Docker']]: process.env.VKMA_DOCKER_ORIGIN,
    [Network['Public']]: process.env.VKMA_PUBLIC_ORIGIN,
  },

  [Service['Hub']]: {
    [Network['Docker']]: process.env.HUB_DOCKER_ORIGIN,
    [Network['Public']]: process.env.HUB_PUBLIC_ORIGIN,
  },

  [Service['Minio']]: {
    [Network['Docker']]: process.env.MINIO_DOCKER_ORIGIN,
    [Network['Public']]: process.env.MINIO_PUBLIC_ORIGIN,
  },
}

/**
 * @returns {string}
 */
export var guardOrigin = (maybeService, maybeNetwork) => {
  var service = guardKey(Service, maybeService)

  var network = guardKey(Network, maybeNetwork)

  if (!(service in ServiceNetworkOrigin))
    throw TypeError(`Service '${service}' does not exist.`)

  if (!(network in ServiceNetworkOrigin[service]))
    throw TypeError(`Network '${network}' in Service '${service}' does not exist.`)

  return ServiceNetworkOrigin[service][network]
}

export var routeRequest = (maybeNetwork, maybeRoute, maybeRouteParams, maybeRouteSearch, init) => {
  var route = guardKey(Route, maybeRoute)

  var url = new URL(
    hydrateRoutePathname(route, maybeRouteParams),
    guardOrigin(guardKey(RouteService, route), guardKey(Network, maybeNetwork)),
  )

  url.search = maybeRouteSearch

  return fetch(url, init)
}
