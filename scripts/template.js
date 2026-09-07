import { hydrateRoutePathname, Network, routeService, Service } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({/* origins */})

/**
 * @param {keyof typeof import('@shakerquiz/utilities').Network} maybeNetwork
 * @param {string} maybeRoute
 * @param {any[]} [maybeParams]
 * @param {ConstructorParameters<typeof URLSearchParams>[0]} [maybeSearch]
 * @param {keyof typeof import('@shakerquiz/utilities').Service} [maybeService]
 */
export const url = (maybeNetwork, maybeRoute, maybeParams, maybeSearch, maybeService) => {
  var service = maybeService
    ? Service[maybeService]
    : routeService(maybeRoute)

  if (maybeService && !service)
    throw TypeError(`Service[${maybeService}] must have a value.`)

  var network = Network[maybeNetwork]

  if (!network)
    throw TypeError(`Network[${maybeNetwork}] must have a value.`)

  var NetworkOrigin = ServiceNetworkOrigin[service]

  if (!NetworkOrigin)
    throw TypeError(`ServiceNetworkOrigin[${service}] must have a value.`)

  var origin = NetworkOrigin[network]

  if (!URL.canParse(origin))
    throw TypeError(`Origin '${origin}' is not an URL.`)

  var url = new URL(hydrateRoutePathname(maybeRoute, maybeParams), origin)

  url.search = new URLSearchParams(maybeSearch)

  return url
}
