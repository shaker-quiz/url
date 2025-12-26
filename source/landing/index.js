import { hydrateRoutePathname, Network, Relation, Route, RouteService } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({Users: Object.freeze({Docker: process.env.NEXT_PUBLIC_USERS_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_USERS_PUBLIC_ORIGIN}),Roles: Object.freeze({Docker: process.env.NEXT_PUBLIC_ROLES_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_ROLES_PUBLIC_ORIGIN}),Checkin: Object.freeze({Docker: process.env.NEXT_PUBLIC_CHECKIN_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_CHECKIN_PUBLIC_ORIGIN}),Locations: Object.freeze({Docker: process.env.NEXT_PUBLIC_LOCATIONS_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_LOCATIONS_PUBLIC_ORIGIN}),Cities: Object.freeze({Docker: process.env.NEXT_PUBLIC_CITIES_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_CITIES_PUBLIC_ORIGIN}),Venues: Object.freeze({Docker: process.env.NEXT_PUBLIC_VENUES_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_VENUES_PUBLIC_ORIGIN}),Themes: Object.freeze({Docker: process.env.NEXT_PUBLIC_THEMES_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_THEMES_PUBLIC_ORIGIN}),Games: Object.freeze({Docker: process.env.NEXT_PUBLIC_GAMES_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_GAMES_PUBLIC_ORIGIN}),Registrations: Object.freeze({Docker: process.env.NEXT_PUBLIC_REGISTRATIONS_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_REGISTRATIONS_PUBLIC_ORIGIN}),Files: Object.freeze({Docker: process.env.NEXT_PUBLIC_FILES_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_FILES_PUBLIC_ORIGIN}),Procedures: Object.freeze({Docker: process.env.NEXT_PUBLIC_PROCEDURES_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_PROCEDURES_PUBLIC_ORIGIN}),Integrations: Object.freeze({Docker: process.env.NEXT_PUBLIC_INTEGRATIONS_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_INTEGRATIONS_PUBLIC_ORIGIN}),Updates: Object.freeze({Docker: process.env.NEXT_PUBLIC_UPDATES_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_UPDATES_PUBLIC_ORIGIN}),Hub: Object.freeze({Docker: process.env.NEXT_PUBLIC_HUB_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_HUB_PUBLIC_ORIGIN}),Landing: Object.freeze({Docker: process.env.NEXT_PUBLIC_LANDING_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_LANDING_PUBLIC_ORIGIN}),Vkma: Object.freeze({Docker: process.env.NEXT_PUBLIC_VKMA_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_VKMA_PUBLIC_ORIGIN}),Minio: Object.freeze({Docker: process.env.NEXT_PUBLIC_MINIO_DOCKER_ORIGIN,Public: process.env.NEXT_PUBLIC_MINIO_PUBLIC_ORIGIN})})

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
