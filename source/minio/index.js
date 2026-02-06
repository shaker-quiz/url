import { access, hydrateRoutePathname, Network, RouteService, Service } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({
  Users: Object.freeze({
    Docker: process.env.USERS_DOCKER_ORIGIN,
    Public: process.env.USERS_PUBLIC_ORIGIN,
  }),
  Roles: Object.freeze({
    Docker: process.env.ROLES_DOCKER_ORIGIN,
    Public: process.env.ROLES_PUBLIC_ORIGIN,
  }),
  Checkin: Object.freeze({
    Docker: process.env.CHECKIN_DOCKER_ORIGIN,
    Public: process.env.CHECKIN_PUBLIC_ORIGIN,
  }),
  Locations: Object.freeze({
    Docker: process.env.LOCATIONS_DOCKER_ORIGIN,
    Public: process.env.LOCATIONS_PUBLIC_ORIGIN,
  }),
  Cities: Object.freeze({
    Docker: process.env.CITIES_DOCKER_ORIGIN,
    Public: process.env.CITIES_PUBLIC_ORIGIN,
  }),
  Venues: Object.freeze({
    Docker: process.env.VENUES_DOCKER_ORIGIN,
    Public: process.env.VENUES_PUBLIC_ORIGIN,
  }),
  Themes: Object.freeze({
    Docker: process.env.THEMES_DOCKER_ORIGIN,
    Public: process.env.THEMES_PUBLIC_ORIGIN,
  }),
  Games: Object.freeze({
    Docker: process.env.GAMES_DOCKER_ORIGIN,
    Public: process.env.GAMES_PUBLIC_ORIGIN,
  }),
  Registrations: Object.freeze({
    Docker: process.env.REGISTRATIONS_DOCKER_ORIGIN,
    Public: process.env.REGISTRATIONS_PUBLIC_ORIGIN,
  }),
  Procedures: Object.freeze({
    Docker: process.env.PROCEDURES_DOCKER_ORIGIN,
    Public: process.env.PROCEDURES_PUBLIC_ORIGIN,
  }),
  Updates: Object.freeze({
    Docker: process.env.UPDATES_DOCKER_ORIGIN,
    Public: process.env.UPDATES_PUBLIC_ORIGIN,
  }),
  Hub: Object.freeze({
    Docker: process.env.HUB_DOCKER_ORIGIN,
    Public: process.env.HUB_PUBLIC_ORIGIN,
  }),
  Landing: Object.freeze({
    Docker: process.env.LANDING_DOCKER_ORIGIN,
    Public: process.env.LANDING_PUBLIC_ORIGIN,
  }),
  Vkma: Object.freeze({
    Docker: process.env.VKMA_DOCKER_ORIGIN,
    Public: process.env.VKMA_PUBLIC_ORIGIN,
  }),
  Telegram: Object.freeze({
    Docker: process.env.TELEGRAM_DOCKER_ORIGIN,
    Public: process.env.TELEGRAM_PUBLIC_ORIGIN,
  }),
  Chatapp: Object.freeze({
    Docker: process.env.CHATAPP_DOCKER_ORIGIN,
    Public: process.env.CHATAPP_PUBLIC_ORIGIN,
  }),
  Bitrix: Object.freeze({
    Docker: process.env.BITRIX_DOCKER_ORIGIN,
    Public: process.env.BITRIX_PUBLIC_ORIGIN,
  }),
  Reposter: Object.freeze({
    Docker: process.env.REPOSTER_DOCKER_ORIGIN,
    Public: process.env.REPOSTER_PUBLIC_ORIGIN,
  }),
  Raffle: Object.freeze({
    Docker: process.env.RAFFLE_DOCKER_ORIGIN,
    Public: process.env.RAFFLE_PUBLIC_ORIGIN,
  }),
  Minio: Object.freeze({
    Docker: process.env.MINIO_DOCKER_ORIGIN,
    Public: process.env.MINIO_PUBLIC_ORIGIN,
  }),
})

/**
 * @param {keyof typeof import('@shakerquiz/utilities').Network} maybeNetwork
 * @param {keyof typeof import('@shakerquiz/utilities').Route} maybeRoute
 * @param {any[]} maybeParams
 * @param {ConstructorParameters<typeof URLSearchParams>[0]} maybeSearch
 * @param {keyof typeof import('@shakerquiz/utilities').Service} [maybeService]
 */
export const url = (maybeNetwork, maybeRoute, maybeParams, maybeSearch, maybeService) => {
  if (maybeService) {
    if (!Object.hasOwn(Service, maybeService))
      throw TypeError(`Could not access Service['${maybeService}'].`)
  }

  const routeService = maybeService
    ? Service[maybeService]
    : access(RouteService, maybeRoute)

  if (!Object.hasOwn(Network, maybeNetwork))
    throw TypeError(`Could not access Network['${maybeNetwork}'].`)

  const network = Network[maybeNetwork]

  if (!Object.hasOwn(ServiceNetworkOrigin, routeService))
    throw TypeError(`Service '${routeService}' does not exist.`)

  if (!Object.hasOwn(ServiceNetworkOrigin[routeService], network))
    throw TypeError(`Service '${routeService}' Network '${network}' does not exist.`)

  if (!URL.canParse(ServiceNetworkOrigin[routeService][network]))
    throw TypeError(`Origin '${ServiceNetworkOrigin[routeService][network]}' cannot be parsed as URL.`)

  const url = new URL(hydrateRoutePathname(maybeRoute, maybeParams), ServiceNetworkOrigin[routeService][network])

  url.search = new URLSearchParams(maybeSearch)

  return url
}

/**
 * @param {keyof typeof import('@shakerquiz/utilities').Network} maybeNetwork
 * @param {keyof typeof import('@shakerquiz/utilities').Route} maybeRoute
 * @param {any[]} maybeParams
 * @param {ConstructorParameters<typeof URLSearchParams>[0]} maybeSearch
 * @param {Parameters<typeof fetch>[1]} [maybeInit]
 */
export const request = (maybeNetwork, maybeRoute, maybeParams, maybeSearch, maybeInit) =>
  fetch(url(maybeNetwork, maybeRoute, maybeParams, maybeSearch, maybeInit?.service), maybeInit)
