import Hapi from '@hapi/hapi'
import boom from '@hapi/boom'

// plugin to instantiate Prisma Client
const plugin: Hapi.Plugin<undefined> = {
  name: 'app/status',
  register: async function (server: Hapi.Server) {
    server.route({
      // default status endpoint
      method: 'GET',
      path: '/',
      handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        // return h.response({ up: true }).code(200)
        return boom.badImplementation('Internal server error')
      }
    })
  },
}

export default plugin
