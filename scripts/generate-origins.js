import { Networks, ServiceRuntime, Services } from '@shakerquiz/utilities'
import template from './assets/origins-template.js' with { type: 'text' }

let Service = service => `${service}: Object.freeze({/* networks */})`

let ServiceNetwork = (runtime, service) => network => {
  let identifier = [service, network, 'origin']
    .join('_')
    .toUpperCase()

  switch (runtime) {
    case 'Bun':
      return `${network}: process.env.${identifier}`

    case 'Deno':
      return `${network}: Deno.env.get('${identifier}')`

    case 'Node':
      return `${network}: process.env.NEXT_PUBLIC_${identifier}`

    case 'Vite':
      return `${network}: process.env.NEXT_PUBLIC_${identifier}`
  }
}

Object
  .entries(ServiceRuntime)
  .map(([service, runtime]) =>
    Bun.write(
      `source/${service.toLowerCase()}/index.js`,
      template.replace(
        '/* origins */',
        Services.map(service => Service(service).replace('/* networks */', Networks.map(ServiceNetwork(runtime, service)))),
      ),
    )
  )
