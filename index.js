import { Network, Runtime, ServiceRuntime, Services } from '@shakerquiz/utilities'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const template = await readFile('template.js', 'utf-8')

const filterKnownRuntimes = ([, runtime]) => runtime in Runtime

const writeServiceModule = ({ service, data, dir = service.toLowerCase() }) =>
  Promise.resolve()
    .then(() => mkdir(['source', dir].join('/')))
    .then(() => writeFile(['source', dir, 'index.js'].join('/'), data))

const getNetworkEntry = ({ runtime, network, identifier }) => {
  switch (runtime) {
    case Runtime['Bun']:
      return `[Network['${network}']]: process.env.${identifier},`
    case Runtime['Deno']:
      return `[Network['${network}']]: Deno.env.get('${identifier}'),`
    case Runtime['Node']:
      return `[Network['${network}']]: process.env.NEXT_PUBLIC_${identifier},`
    case Runtime['Vite']:
      return `[Network['${network}']]: process.env.NEXT_PUBLIC_${identifier},`
  }
}

const getServiceEntry = ({ service, networks }) => `[Service['${service}']]: {\n${networks}\n},`

const getIdentifier = ({ service, network }) => [service, network, 'origin'].join('_').toUpperCase()

await Promise.all(
  Object.entries(ServiceRuntime)
    .filter(filterKnownRuntimes)
    .map(([service, runtime]) =>
      writeServiceModule({
        service,
        data: template.replace(
          `/* ... */`,
          Services.map(service =>
            getServiceEntry({
              service,
              networks: Object.values(Network).map(network =>
                getNetworkEntry({
                  runtime,
                  network,
                  identifier: getIdentifier({ service, network }),
                })
              ).join('\n'),
            })
          ).join('\n\n'),
        ),
      })
    ),
)
