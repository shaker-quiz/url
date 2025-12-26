import { hydrateRoutePathname, Network, Relation, Route, RouteService } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({Users: Object.freeze({Docker: process.env.USERS_DOCKER_ORIGIN,Public: process.env.USERS_PUBLIC_ORIGIN}),Roles: Object.freeze({Docker: process.env.ROLES_DOCKER_ORIGIN,Public: process.env.ROLES_PUBLIC_ORIGIN}),Checkin: Object.freeze({Docker: process.env.CHECKIN_DOCKER_ORIGIN,Public: process.env.CHECKIN_PUBLIC_ORIGIN}),Locations: Object.freeze({Docker: process.env.LOCATIONS_DOCKER_ORIGIN,Public: process.env.LOCATIONS_PUBLIC_ORIGIN}),Cities: Object.freeze({Docker: process.env.CITIES_DOCKER_ORIGIN,Public: process.env.CITIES_PUBLIC_ORIGIN}),Venues: Object.freeze({Docker: process.env.VENUES_DOCKER_ORIGIN,Public: process.env.VENUES_PUBLIC_ORIGIN}),Themes: Object.freeze({Docker: process.env.THEMES_DOCKER_ORIGIN,Public: process.env.THEMES_PUBLIC_ORIGIN}),Games: Object.freeze({Docker: process.env.GAMES_DOCKER_ORIGIN,Public: process.env.GAMES_PUBLIC_ORIGIN}),Registrations: Object.freeze({Docker: process.env.REGISTRATIONS_DOCKER_ORIGIN,Public: process.env.REGISTRATIONS_PUBLIC_ORIGIN}),Files: Object.freeze({Docker: process.env.FILES_DOCKER_ORIGIN,Public: process.env.FILES_PUBLIC_ORIGIN}),Procedures: Object.freeze({Docker: process.env.PROCEDURES_DOCKER_ORIGIN,Public: process.env.PROCEDURES_PUBLIC_ORIGIN}),Integrations: Object.freeze({Docker: process.env.INTEGRATIONS_DOCKER_ORIGIN,Public: process.env.INTEGRATIONS_PUBLIC_ORIGIN}),Updates: Object.freeze({Docker: process.env.UPDATES_DOCKER_ORIGIN,Public: process.env.UPDATES_PUBLIC_ORIGIN}),Hub: Object.freeze({Docker: process.env.HUB_DOCKER_ORIGIN,Public: process.env.HUB_PUBLIC_ORIGIN}),Landing: Object.freeze({Docker: process.env.LANDING_DOCKER_ORIGIN,Public: process.env.LANDING_PUBLIC_ORIGIN}),Vkma: Object.freeze({Docker: process.env.VKMA_DOCKER_ORIGIN,Public: process.env.VKMA_PUBLIC_ORIGIN}),Minio: Object.freeze({Docker: process.env.MINIO_DOCKER_ORIGIN,Public: process.env.MINIO_PUBLIC_ORIGIN})})

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
