import { access, hydrateRoutePathname, Network, Route, RouteService, Service } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({
Users: Object.freeze({
Docker: import.meta.env.VITE_USERS_DOCKER_ORIGIN,
Public: import.meta.env.VITE_USERS_PUBLIC_ORIGIN}),
Roles: Object.freeze({
Docker: import.meta.env.VITE_ROLES_DOCKER_ORIGIN,
Public: import.meta.env.VITE_ROLES_PUBLIC_ORIGIN}),
Checkin: Object.freeze({
Docker: import.meta.env.VITE_CHECKIN_DOCKER_ORIGIN,
Public: import.meta.env.VITE_CHECKIN_PUBLIC_ORIGIN}),
Locations: Object.freeze({
Docker: import.meta.env.VITE_LOCATIONS_DOCKER_ORIGIN,
Public: import.meta.env.VITE_LOCATIONS_PUBLIC_ORIGIN}),
Cities: Object.freeze({
Docker: import.meta.env.VITE_CITIES_DOCKER_ORIGIN,
Public: import.meta.env.VITE_CITIES_PUBLIC_ORIGIN}),
Venues: Object.freeze({
Docker: import.meta.env.VITE_VENUES_DOCKER_ORIGIN,
Public: import.meta.env.VITE_VENUES_PUBLIC_ORIGIN}),
Themes: Object.freeze({
Docker: import.meta.env.VITE_THEMES_DOCKER_ORIGIN,
Public: import.meta.env.VITE_THEMES_PUBLIC_ORIGIN}),
Games: Object.freeze({
Docker: import.meta.env.VITE_GAMES_DOCKER_ORIGIN,
Public: import.meta.env.VITE_GAMES_PUBLIC_ORIGIN}),
Registrations: Object.freeze({
Docker: import.meta.env.VITE_REGISTRATIONS_DOCKER_ORIGIN,
Public: import.meta.env.VITE_REGISTRATIONS_PUBLIC_ORIGIN}),
Procedures: Object.freeze({
Docker: import.meta.env.VITE_PROCEDURES_DOCKER_ORIGIN,
Public: import.meta.env.VITE_PROCEDURES_PUBLIC_ORIGIN}),
Updates: Object.freeze({
Docker: import.meta.env.VITE_UPDATES_DOCKER_ORIGIN,
Public: import.meta.env.VITE_UPDATES_PUBLIC_ORIGIN}),
Hub: Object.freeze({
Docker: import.meta.env.VITE_HUB_DOCKER_ORIGIN,
Public: import.meta.env.VITE_HUB_PUBLIC_ORIGIN}),
Landing: Object.freeze({
Docker: import.meta.env.VITE_LANDING_DOCKER_ORIGIN,
Public: import.meta.env.VITE_LANDING_PUBLIC_ORIGIN}),
Telegram: Object.freeze({
Docker: import.meta.env.VITE_TELEGRAM_DOCKER_ORIGIN,
Public: import.meta.env.VITE_TELEGRAM_PUBLIC_ORIGIN}),
Vkma: Object.freeze({
Docker: import.meta.env.VITE_VKMA_DOCKER_ORIGIN,
Public: import.meta.env.VITE_VKMA_PUBLIC_ORIGIN}),
Telegram: Object.freeze({
Docker: import.meta.env.VITE_TELEGRAM_DOCKER_ORIGIN,
Public: import.meta.env.VITE_TELEGRAM_PUBLIC_ORIGIN}),
Chatapp: Object.freeze({
Docker: import.meta.env.VITE_CHATAPP_DOCKER_ORIGIN,
Public: import.meta.env.VITE_CHATAPP_PUBLIC_ORIGIN}),
Bitrix: Object.freeze({
Docker: import.meta.env.VITE_BITRIX_DOCKER_ORIGIN,
Public: import.meta.env.VITE_BITRIX_PUBLIC_ORIGIN}),
Minio: Object.freeze({
Docker: import.meta.env.VITE_MINIO_DOCKER_ORIGIN,
Public: import.meta.env.VITE_MINIO_PUBLIC_ORIGIN})})

/**
 * @param {keyof typeof import('@shakerquiz/utilities').Network} maybeNetwork
 * @param {keyof typeof import('@shakerquiz/utilities').Route} maybeRoute
 * @param {any[]} maybeParams
 * @param {ConstructorParameters<typeof URLSearchParams>[0]} maybeSearch
 * @param {Parameters<typeof fetch>[1]} [maybeInit]
 */
export const request = (maybeNetwork, maybeRoute, maybeParams, maybeSearch, maybeInit) => {
  var route = access(Route, maybeRoute)

  var routeService = Object.hasOwn(maybeInit, 'service')
    ? access(Service, maybeInit.service)
    : access(RouteService, maybeRoute)

  var network = access(Network, maybeNetwork)

  if (!Object.hasOwn(ServiceNetworkOrigin, routeService))
    throw TypeError(`Service '${routeService}' does not exist.`)

  if (!Object.hasOwn(ServiceNetworkOrigin[routeService], network))
    throw TypeError(`Service '${routeService}' Network '${network}' does not exist.`)

  if (!URL.canParse(ServiceNetworkOrigin[routeService][network]))
    throw TypeError(`Origin '${ServiceNetworkOrigin[routeService][network]}' cannot be parsed as URL.`)

  var url = new URL(hydrateRoutePathname(route, maybeParams), ServiceNetworkOrigin[routeService][network])

  url.search = new URLSearchParams(maybeSearch)

  return fetch(url, maybeInit)
}
