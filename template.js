import { hydrateRoutePathname, inferNetwork, inferRoute, inferRouteService, Network, Service } from '@shakerquiz/utilities'

export const ServiceNetworkOrigin = Object.freeze({/* ... */})

/** @returns {string} */
export const inferOrigin = Object.freeze((service, network) => {
    if (!(service in ServiceNetworkOrigin))
        throw TypeError(`Service '${service}' does not exist.`)

    if (!(network in ServiceNetworkOrigin[service]))
        throw TypeError(`Network '${network}' in Service '${service}' does not exist.`)

    return ServiceNetworkOrigin[service][network]
})

export const routeRequest = Object.freeze((maybeNetwork, maybeRoute, maybeRouteParams, maybeRouteSearch, init) => {
    var route = inferRoute(maybeRoute)

    if (route === 'Unknown')
        throw TypeError(`[routeRequest] Could not infer route for value: '${maybeRoute}'.`)

    var service = inferRouteService(maybeRoute)

    if (service === 'Unknown')
        throw TypeError(`[routeRequest] Could not infer service for value: '${maybeRoute}'.`)

    var network = inferNetwork(maybeNetwork)

    if (network === 'Unknown')
        throw TypeError(`[routeRequest] Could not infer network for value: '${maybeRoute}'.`)

    var url = new URL(
        hydrateRoutePathname(route, maybeRouteParams),
        inferOrigin(service, network),
    )

    url.search = maybeRouteSearch

    return fetch(url, init)
})
