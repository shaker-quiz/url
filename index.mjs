import {Network, Runtime, ServiceRuntime, Services} from '@shakerquiz/utilities'
import {mkdir, readFile, writeFile} from 'node:fs/promises'

const template = await readFile('template.js', 'utf-8')

await Promise.all(
    Object.entries(ServiceRuntime)
        .filter(([, runtime]) => runtime in Runtime)
        .map(([service, runtime]) => Object.freeze({service, runtime, slug: service.toLowerCase()}))
        .map(({service, runtime, slug, dir = ['source', slug].join('/'), file = [dir, 'index.js'].join('/')}) =>
            mkdir(dir, {recursive: true}).then(() => writeFile(file, template.replace(`/* ... */`, Services.map(
                service => `[Service['${service}']]: {\n${Object.values(Network).map(network => {
                    const identifier = [service, network, 'origin'].join('_').toUpperCase()
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
                }).join('\n')}\n},`
            ).join('\n\n'))))
        )
)
