// config/middlewares.js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': ["'self'", 'data:', 'blob:', 'https://market-assets.strapi.io', 'https://res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://market-assets.strapi.io', 'https://res.cloudinary.com'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['https://blog.knotless.co', 'http://localhost:3000', 'https://knotless.co', 'https://knotless-v0-veltcr.flutterflow.app/',
        'https://testing--knotless.netlify.app',
        'https://knotless.netlify.app',
        'https://*.netlify.app',
      ],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      keepHeaderOnError: true,
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];