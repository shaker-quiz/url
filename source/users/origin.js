export var ServiceNetworkOrigin = {
  'Roles': {
    'Docker': new URL(Deno.env.get('ROLES_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('ROLES_PUBLIC_ORIGIN')),
  },

  'Users': {
    'Docker': new URL(Deno.env.get('USERS_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('USERS_PUBLIC_ORIGIN')),
  },

  'Checkin': {
    'Docker': new URL(Deno.env.get('CHECKIN_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('CHECKIN_PUBLIC_ORIGIN')),
  },

  'Locations': {
    'Docker': new URL(Deno.env.get('LOCATIONS_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('LOCATIONS_PUBLIC_ORIGIN')),
  },

  'Cities': {
    'Docker': new URL(Deno.env.get('CITIES_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('CITIES_PUBLIC_ORIGIN')),
  },

  'Venues': {
    'Docker': new URL(Deno.env.get('VENUES_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('VENUES_PUBLIC_ORIGIN')),
  },

  'Themes': {
    'Docker': new URL(Deno.env.get('THEMES_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('THEMES_PUBLIC_ORIGIN')),
  },

  'Games': {
    'Docker': new URL(Deno.env.get('GAMES_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('GAMES_PUBLIC_ORIGIN')),
  },

  'Registrations': {
    'Docker': new URL(Deno.env.get('REGISTRATIONS_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('REGISTRATIONS_PUBLIC_ORIGIN')),
  },

  'Files': {
    'Docker': new URL(Deno.env.get('FILES_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('FILES_PUBLIC_ORIGIN')),
  },

  'Minio': {
    'Docker': new URL(Deno.env.get('MINIO_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('MINIO_PUBLIC_ORIGIN')),
  },

  'Landing': {
    'Docker': new URL(Deno.env.get('LANDING_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('LANDING_PUBLIC_ORIGIN')),
  },

  'Vk': {
    'Docker': new URL(Deno.env.get('VK_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('VK_PUBLIC_ORIGIN')),
  },

  'Hub': {
    'Docker': new URL(Deno.env.get('HUB_DOCKER_ORIGIN')),
    'Public': new URL(Deno.env.get('HUB_PUBLIC_ORIGIN')),
  },
}
