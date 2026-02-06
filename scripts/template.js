import { hydrateRoutePathname, Network, routeService, Service } from '@shakerquiz/utilities'

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
