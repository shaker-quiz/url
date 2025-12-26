import { hydrateRoutePathname, Network, Relation, Route, RouteService } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({Users: Object.freeze({Docker: Deno.env.get('USERS_DOCKER_ORIGIN'),Public: Deno.env.get('USERS_PUBLIC_ORIGIN')}),Roles: Object.freeze({Docker: Deno.env.get('ROLES_DOCKER_ORIGIN'),Public: Deno.env.get('ROLES_PUBLIC_ORIGIN')}),Checkin: Object.freeze({Docker: Deno.env.get('CHECKIN_DOCKER_ORIGIN'),Public: Deno.env.get('CHECKIN_PUBLIC_ORIGIN')}),Locations: Object.freeze({Docker: Deno.env.get('LOCATIONS_DOCKER_ORIGIN'),Public: Deno.env.get('LOCATIONS_PUBLIC_ORIGIN')}),Cities: Object.freeze({Docker: Deno.env.get('CITIES_DOCKER_ORIGIN'),Public: Deno.env.get('CITIES_PUBLIC_ORIGIN')}),Venues: Object.freeze({Docker: Deno.env.get('VENUES_DOCKER_ORIGIN'),Public: Deno.env.get('VENUES_PUBLIC_ORIGIN')}),Themes: Object.freeze({Docker: Deno.env.get('THEMES_DOCKER_ORIGIN'),Public: Deno.env.get('THEMES_PUBLIC_ORIGIN')}),Games: Object.freeze({Docker: Deno.env.get('GAMES_DOCKER_ORIGIN'),Public: Deno.env.get('GAMES_PUBLIC_ORIGIN')}),Registrations: Object.freeze({Docker: Deno.env.get('REGISTRATIONS_DOCKER_ORIGIN'),Public: Deno.env.get('REGISTRATIONS_PUBLIC_ORIGIN')}),Files: Object.freeze({Docker: Deno.env.get('FILES_DOCKER_ORIGIN'),Public: Deno.env.get('FILES_PUBLIC_ORIGIN')}),Procedures: Object.freeze({Docker: Deno.env.get('PROCEDURES_DOCKER_ORIGIN'),Public: Deno.env.get('PROCEDURES_PUBLIC_ORIGIN')}),Integrations: Object.freeze({Docker: Deno.env.get('INTEGRATIONS_DOCKER_ORIGIN'),Public: Deno.env.get('INTEGRATIONS_PUBLIC_ORIGIN')}),Updates: Object.freeze({Docker: Deno.env.get('UPDATES_DOCKER_ORIGIN'),Public: Deno.env.get('UPDATES_PUBLIC_ORIGIN')}),Hub: Object.freeze({Docker: Deno.env.get('HUB_DOCKER_ORIGIN'),Public: Deno.env.get('HUB_PUBLIC_ORIGIN')}),Landing: Object.freeze({Docker: Deno.env.get('LANDING_DOCKER_ORIGIN'),Public: Deno.env.get('LANDING_PUBLIC_ORIGIN')}),Vkma: Object.freeze({Docker: Deno.env.get('VKMA_DOCKER_ORIGIN'),Public: Deno.env.get('VKMA_PUBLIC_ORIGIN')}),Minio: Object.freeze({Docker: Deno.env.get('MINIO_DOCKER_ORIGIN'),Public: Deno.env.get('MINIO_PUBLIC_ORIGIN')})})

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
