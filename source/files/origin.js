export var ServiceNetworkOrigin = {
  'Roles': {
    'Docker': new URL(process.env.ROLES_DOCKER_ORIGIN),
    'Public': new URL(process.env.ROLES_PUBLIC_ORIGIN),
  },

  'Users': {
    'Docker': new URL(process.env.USERS_DOCKER_ORIGIN),
    'Public': new URL(process.env.USERS_PUBLIC_ORIGIN),
  },

  'Checkin': {
    'Docker': new URL(process.env.CHECKIN_DOCKER_ORIGIN),
    'Public': new URL(process.env.CHECKIN_PUBLIC_ORIGIN),
  },

  'Locations': {
    'Docker': new URL(process.env.LOCATIONS_DOCKER_ORIGIN),
    'Public': new URL(process.env.LOCATIONS_PUBLIC_ORIGIN),
  },

  'Cities': {
    'Docker': new URL(process.env.CITIES_DOCKER_ORIGIN),
    'Public': new URL(process.env.CITIES_PUBLIC_ORIGIN),
  },

  'Venues': {
    'Docker': new URL(process.env.VENUES_DOCKER_ORIGIN),
    'Public': new URL(process.env.VENUES_PUBLIC_ORIGIN),
  },

  'Themes': {
    'Docker': new URL(process.env.THEMES_DOCKER_ORIGIN),
    'Public': new URL(process.env.THEMES_PUBLIC_ORIGIN),
  },

  'Games': {
    'Docker': new URL(process.env.GAMES_DOCKER_ORIGIN),
    'Public': new URL(process.env.GAMES_PUBLIC_ORIGIN),
  },

  'Registrations': {
    'Docker': new URL(process.env.REGISTRATIONS_DOCKER_ORIGIN),
    'Public': new URL(process.env.REGISTRATIONS_PUBLIC_ORIGIN),
  },

  'Files': {
    'Docker': new URL(process.env.FILES_DOCKER_ORIGIN),
    'Public': new URL(process.env.FILES_PUBLIC_ORIGIN),
  },

  'Minio': {
    'Docker': new URL(process.env.MINIO_DOCKER_ORIGIN),
    'Public': new URL(process.env.MINIO_PUBLIC_ORIGIN),
  },

  'Landing': {
    'Docker': new URL(process.env.LANDING_DOCKER_ORIGIN),
    'Public': new URL(process.env.LANDING_PUBLIC_ORIGIN),
  },

  'Vk': {
    'Docker': new URL(process.env.VK_DOCKER_ORIGIN),
    'Public': new URL(process.env.VK_PUBLIC_ORIGIN),
  },

  'Hub': {
    'Docker': new URL(process.env.HUB_DOCKER_ORIGIN),
    'Public': new URL(process.env.HUB_PUBLIC_ORIGIN),
  },
}
