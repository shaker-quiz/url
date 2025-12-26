import { hydrateRoutePathname, Network, Relation, Route, RouteService } from '@shakerquiz/utilities'

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
    var r = Relation
      .of(Route)
      .require(route)

    var rs = Relation
      .of(RouteService)
      .require(route)

    var n = Relation
      .of(Network)
      .require(network)

    if (!Object.hasOwn(ServiceNetworkOrigin, rs))
      throw TypeError(`Service '${rs}' does not exist.`)

    if (!Object.hasOwn(ServiceNetworkOrigin[rs], n))
      throw TypeError(`Network '${n}' in Service '${rs}' does not exist.`)

    var url = new URL(hydrateRoutePathname(r, params), ServiceNetworkOrigin[rs][n])

    url.search = search

    return fetch(url, init)
  },
)
