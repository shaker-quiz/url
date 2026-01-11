import { access, hydrateRoutePathname, Network, Route, RouteService } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({/* origins */})

export const request = Object.freeze(
  /**
   * @param {keyof typeof import('@shakerquiz/utilities').Network} network
   * @param {keyof typeof import('@shakerquiz/utilities').Route} route
   * @param {*} params
   * @param {*} search
   * @param {*} init
   */
  (network, route, params, search, init) => {
    var r = access(Route, route)

    var rs = access(RouteService, route)

    var n = access(Network, network)

    if (!Object.hasOwn(ServiceNetworkOrigin, rs))
      throw TypeError(`Service '${rs}' does not exist.`)

    if (!Object.hasOwn(ServiceNetworkOrigin[rs], n))
      throw TypeError(`Network '${n}' in Service '${rs}' does not exist.`)

    var url = new URL(hydrateRoutePathname(r, params), ServiceNetworkOrigin[rs][n])

    url.search = search

    return fetch(url, init)
  },
)
