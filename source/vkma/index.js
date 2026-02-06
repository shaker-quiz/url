import { hydrateRoutePathname, Network, routeService, Service } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({
  Users: Object.freeze({
    Docker: import.meta.env.VITE_USERS_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_USERS_PUBLIC_ORIGIN,
  }),
  Roles: Object.freeze({
    Docker: import.meta.env.VITE_ROLES_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_ROLES_PUBLIC_ORIGIN,
  }),
  Checkin: Object.freeze({
    Docker: import.meta.env.VITE_CHECKIN_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_CHECKIN_PUBLIC_ORIGIN,
  }),
  Locations: Object.freeze({
    Docker: import.meta.env.VITE_LOCATIONS_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_LOCATIONS_PUBLIC_ORIGIN,
  }),
  Cities: Object.freeze({
    Docker: import.meta.env.VITE_CITIES_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_CITIES_PUBLIC_ORIGIN,
  }),
  Venues: Object.freeze({
    Docker: import.meta.env.VITE_VENUES_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_VENUES_PUBLIC_ORIGIN,
  }),
  Themes: Object.freeze({
    Docker: import.meta.env.VITE_THEMES_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_THEMES_PUBLIC_ORIGIN,
  }),
  Games: Object.freeze({
    Docker: import.meta.env.VITE_GAMES_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_GAMES_PUBLIC_ORIGIN,
  }),
  Registrations: Object.freeze({
    Docker: import.meta.env.VITE_REGISTRATIONS_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_REGISTRATIONS_PUBLIC_ORIGIN,
  }),
  Procedures: Object.freeze({
    Docker: import.meta.env.VITE_PROCEDURES_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_PROCEDURES_PUBLIC_ORIGIN,
  }),
  Updates: Object.freeze({
    Docker: import.meta.env.VITE_UPDATES_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_UPDATES_PUBLIC_ORIGIN,
  }),
  Hub: Object.freeze({
    Docker: import.meta.env.VITE_HUB_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_HUB_PUBLIC_ORIGIN,
  }),
  Landing: Object.freeze({
    Docker: import.meta.env.VITE_LANDING_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_LANDING_PUBLIC_ORIGIN,
  }),
  Vkma: Object.freeze({
    Docker: import.meta.env.VITE_VKMA_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_VKMA_PUBLIC_ORIGIN,
  }),
  Telegram: Object.freeze({
    Docker: import.meta.env.VITE_TELEGRAM_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_TELEGRAM_PUBLIC_ORIGIN,
  }),
  Chatapp: Object.freeze({
    Docker: import.meta.env.VITE_CHATAPP_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_CHATAPP_PUBLIC_ORIGIN,
  }),
  Bitrix: Object.freeze({
    Docker: import.meta.env.VITE_BITRIX_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_BITRIX_PUBLIC_ORIGIN,
  }),
  Reposter: Object.freeze({
    Docker: import.meta.env.VITE_REPOSTER_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_REPOSTER_PUBLIC_ORIGIN,
  }),
  Raffle: Object.freeze({
    Docker: import.meta.env.VITE_RAFFLE_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_RAFFLE_PUBLIC_ORIGIN,
  }),
  Minio: Object.freeze({
    Docker: import.meta.env.VITE_MINIO_DOCKER_ORIGIN,
    Public: import.meta.env.VITE_MINIO_PUBLIC_ORIGIN,
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

  const service = maybeService
    ? maybeService
    : routeService(maybeRoute)

  if (!Object.hasOwn(Network, maybeNetwork))
    throw TypeError(`Could not access Network['${maybeNetwork}'].`)

  const network = Network[maybeNetwork]

  if (!Object.hasOwn(ServiceNetworkOrigin, service))
    throw TypeError(`Could not access ServiceNetworkOrigin['${service}'].`)

  if (!Object.hasOwn(ServiceNetworkOrigin[service], network))
    throw TypeError(`Could not access ServiceNetworkOrigin['${service}']['${network}'].`)

  if (!URL.canParse(ServiceNetworkOrigin[service][network]))
    throw TypeError(`Origin '${ServiceNetworkOrigin[service][network]}' cannot be parsed as URL.`)

  const url = new URL(hydrateRoutePathname(maybeRoute, maybeParams), ServiceNetworkOrigin[service][network])

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
