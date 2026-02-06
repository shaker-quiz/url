import { access, hydrateRoutePathname, Network, RouteService, Service } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({/* origins */})

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
