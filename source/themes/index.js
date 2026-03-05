import { getOwn, hydrateRoutePathname, Network, routeService, Service } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({
  Users: Object.freeze({
    Docker: Bun.env.USERS_DOCKER_ORIGIN,
    Public: Bun.env.USERS_PUBLIC_ORIGIN,
  }),
  Roles: Object.freeze({
    Docker: Bun.env.ROLES_DOCKER_ORIGIN,
    Public: Bun.env.ROLES_PUBLIC_ORIGIN,
  }),
  Checkin: Object.freeze({
    Docker: Bun.env.CHECKIN_DOCKER_ORIGIN,
    Public: Bun.env.CHECKIN_PUBLIC_ORIGIN,
  }),
  Locations: Object.freeze({
    Docker: Bun.env.LOCATIONS_DOCKER_ORIGIN,
    Public: Bun.env.LOCATIONS_PUBLIC_ORIGIN,
  }),
  Cities: Object.freeze({
    Docker: Bun.env.CITIES_DOCKER_ORIGIN,
    Public: Bun.env.CITIES_PUBLIC_ORIGIN,
  }),
  Venues: Object.freeze({
    Docker: Bun.env.VENUES_DOCKER_ORIGIN,
    Public: Bun.env.VENUES_PUBLIC_ORIGIN,
  }),
  Themes: Object.freeze({
    Docker: Bun.env.THEMES_DOCKER_ORIGIN,
    Public: Bun.env.THEMES_PUBLIC_ORIGIN,
  }),
  Games: Object.freeze({
    Docker: Bun.env.GAMES_DOCKER_ORIGIN,
    Public: Bun.env.GAMES_PUBLIC_ORIGIN,
  }),
  Registrations: Object.freeze({
    Docker: Bun.env.REGISTRATIONS_DOCKER_ORIGIN,
    Public: Bun.env.REGISTRATIONS_PUBLIC_ORIGIN,
  }),
  Procedures: Object.freeze({
    Docker: Bun.env.PROCEDURES_DOCKER_ORIGIN,
    Public: Bun.env.PROCEDURES_PUBLIC_ORIGIN,
  }),
  Updates: Object.freeze({
    Docker: Bun.env.UPDATES_DOCKER_ORIGIN,
    Public: Bun.env.UPDATES_PUBLIC_ORIGIN,
  }),
  Hub: Object.freeze({
    Docker: Bun.env.HUB_DOCKER_ORIGIN,
    Public: Bun.env.HUB_PUBLIC_ORIGIN,
  }),
  Landing: Object.freeze({
    Docker: Bun.env.LANDING_DOCKER_ORIGIN,
    Public: Bun.env.LANDING_PUBLIC_ORIGIN,
  }),
  Vkma: Object.freeze({
    Docker: Bun.env.VKMA_DOCKER_ORIGIN,
    Public: Bun.env.VKMA_PUBLIC_ORIGIN,
  }),
  Telegram: Object.freeze({
    Docker: Bun.env.TELEGRAM_DOCKER_ORIGIN,
    Public: Bun.env.TELEGRAM_PUBLIC_ORIGIN,
  }),
  Chatapp: Object.freeze({
    Docker: Bun.env.CHATAPP_DOCKER_ORIGIN,
    Public: Bun.env.CHATAPP_PUBLIC_ORIGIN,
  }),
  Bitrix: Object.freeze({
    Docker: Bun.env.BITRIX_DOCKER_ORIGIN,
    Public: Bun.env.BITRIX_PUBLIC_ORIGIN,
  }),
  Reposter: Object.freeze({
    Docker: Bun.env.REPOSTER_DOCKER_ORIGIN,
    Public: Bun.env.REPOSTER_PUBLIC_ORIGIN,
  }),
  Raffle: Object.freeze({
    Docker: Bun.env.RAFFLE_DOCKER_ORIGIN,
    Public: Bun.env.RAFFLE_PUBLIC_ORIGIN,
  }),
  Minio: Object.freeze({
    Docker: Bun.env.MINIO_DOCKER_ORIGIN,
    Public: Bun.env.MINIO_PUBLIC_ORIGIN,
  }),
})

/**
 * @param {keyof typeof import('@shakerquiz/utilities').Network} maybeNetwork
 * @param {string} maybeRoute
 * @param {any[]} maybeParams
 * @param {ConstructorParameters<typeof URLSearchParams>[0]} maybeSearch
 * @param {keyof typeof import('@shakerquiz/utilities').Service} [maybeService]
 */
export const url = (maybeNetwork, maybeRoute, maybeParams, maybeSearch, maybeService) => {
  var service = maybeService
    ? getOwn(Service, maybeService)
    : routeService(maybeRoute)

  var network = getOwn(Network, maybeNetwork)

  var networkOrigin = getOwn(ServiceNetworkOrigin, service)

  var origin = getOwn(networkOrigin, network)

  if (!URL.canParse(origin))
    throw TypeError(`Origin '${origin}' is not an URL.`)

  var url = new URL(hydrateRoutePathname(maybeRoute, maybeParams), origin)

  url.search = new URLSearchParams(maybeSearch)

  return url
}

/**
 * @param {keyof typeof import('@shakerquiz/utilities').Network} maybeNetwork
 * @param {string} maybeRoute
 * @param {any[]} maybeParams
 * @param {ConstructorParameters<typeof URLSearchParams>[0]} maybeSearch
 * @param {Parameters<typeof fetch>[1]} [maybeInit]
 */
export const request = (maybeNetwork, maybeRoute, maybeParams, maybeSearch, maybeInit) =>
  fetch(url(maybeNetwork, maybeRoute, maybeParams, maybeSearch, maybeInit?.service), maybeInit)
