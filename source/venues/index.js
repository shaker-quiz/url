export var ServiceNetworkOrigin = {
  'Roles': {
    'Docker': Deno.env.get('ROLES_DOCKER_ORIGIN'),
    'Public': Deno.env.get('ROLES_PUBLIC_ORIGIN'),
  },

  'Users': {
    'Docker': Deno.env.get('USERS_DOCKER_ORIGIN'),
    'Public': Deno.env.get('USERS_PUBLIC_ORIGIN'),
  },

  'Checkin': {
    'Docker': Deno.env.get('CHECKIN_DOCKER_ORIGIN'),
    'Public': Deno.env.get('CHECKIN_PUBLIC_ORIGIN'),
  },

  'Locations': {
    'Docker': Deno.env.get('LOCATIONS_DOCKER_ORIGIN'),
    'Public': Deno.env.get('LOCATIONS_PUBLIC_ORIGIN'),
  },

  'Cities': {
    'Docker': Deno.env.get('CITIES_DOCKER_ORIGIN'),
    'Public': Deno.env.get('CITIES_PUBLIC_ORIGIN'),
  },

  'Venues': {
    'Docker': Deno.env.get('VENUES_DOCKER_ORIGIN'),
    'Public': Deno.env.get('VENUES_PUBLIC_ORIGIN'),
  },

  'Themes': {
    'Docker': Deno.env.get('THEMES_DOCKER_ORIGIN'),
    'Public': Deno.env.get('THEMES_PUBLIC_ORIGIN'),
  },

  'Games': {
    'Docker': Deno.env.get('GAMES_DOCKER_ORIGIN'),
    'Public': Deno.env.get('GAMES_PUBLIC_ORIGIN'),
  },

  'Registrations': {
    'Docker': Deno.env.get('REGISTRATIONS_DOCKER_ORIGIN'),
    'Public': Deno.env.get('REGISTRATIONS_PUBLIC_ORIGIN'),
  },

  'Files': {
    'Docker': Deno.env.get('FILES_DOCKER_ORIGIN'),
    'Public': Deno.env.get('FILES_PUBLIC_ORIGIN'),
  },

  'Integrations': {
    'Docker': Deno.env.get('INTEGRATIONS_DOCKER_ORIGIN'),
    'Public': Deno.env.get('INTEGRATIONS_PUBLIC_ORIGIN'),
  },

  'Updates': {
    'Docker': Deno.env.get('UPDATES_DOCKER_ORIGIN'),
    'Public': Deno.env.get('UPDATES_PUBLIC_ORIGIN'),
  },

  'Procedures': {
    'Docker': Deno.env.get('PROCEDURES_DOCKER_ORIGIN'),
    'Public': Deno.env.get('PROCEDURES_PUBLIC_ORIGIN'),
  },

  'Minio': {
    'Docker': Deno.env.get('MINIO_DOCKER_ORIGIN'),
    'Public': Deno.env.get('MINIO_PUBLIC_ORIGIN'),
  },

  'Landing': {
    'Docker': Deno.env.get('LANDING_DOCKER_ORIGIN'),
    'Public': Deno.env.get('LANDING_PUBLIC_ORIGIN'),
  },

  'Vk': {
    'Docker': Deno.env.get('VK_DOCKER_ORIGIN'),
    'Public': Deno.env.get('VK_PUBLIC_ORIGIN'),
  },

  'Hub': {
    'Docker': Deno.env.get('HUB_DOCKER_ORIGIN'),
    'Public': Deno.env.get('HUB_PUBLIC_ORIGIN'),
  },
}
