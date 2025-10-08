export var ServiceNetworkOrigin = {
  'Roles': {
    'Docker': new URL(process.env.NEXT_PUBLIC_ROLES_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_ROLES_PUBLIC_ORIGIN),
  },

  'Users': {
    'Docker': new URL(process.env.NEXT_PUBLIC_USERS_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_USERS_PUBLIC_ORIGIN),
  },

  'Checkin': {
    'Docker': new URL(process.env.NEXT_PUBLIC_CHECKIN_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_CHECKIN_PUBLIC_ORIGIN),
  },

  'Locations': {
    'Docker': new URL(process.env.NEXT_PUBLIC_LOCATIONS_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_LOCATIONS_PUBLIC_ORIGIN),
  },

  'Cities': {
    'Docker': new URL(process.env.NEXT_PUBLIC_CITIES_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_CITIES_PUBLIC_ORIGIN),
  },

  'Venues': {
    'Docker': new URL(process.env.NEXT_PUBLIC_VENUES_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_VENUES_PUBLIC_ORIGIN),
  },

  'Themes': {
    'Docker': new URL(process.env.NEXT_PUBLIC_THEMES_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_THEMES_PUBLIC_ORIGIN),
  },

  'Games': {
    'Docker': new URL(process.env.NEXT_PUBLIC_GAMES_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_GAMES_PUBLIC_ORIGIN),
  },

  'Registrations': {
    'Docker': new URL(process.env.NEXT_PUBLIC_REGISTRATIONS_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_REGISTRATIONS_PUBLIC_ORIGIN),
  },

  'Files': {
    'Docker': new URL(process.env.NEXT_PUBLIC_FILES_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_FILES_PUBLIC_ORIGIN),
  },

  'Minio': {
    'Docker': new URL(process.env.NEXT_PUBLIC_MINIO_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_MINIO_PUBLIC_ORIGIN),
  },

  'Landing': {
    'Docker': new URL(process.env.NEXT_PUBLIC_LANDING_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_LANDING_PUBLIC_ORIGIN),
  },

  'Vk': {
    'Docker': new URL(process.env.NEXT_PUBLIC_VK_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_VK_PUBLIC_ORIGIN),
  },

  'Hub': {
    'Docker': new URL(process.env.NEXT_PUBLIC_HUB_DOCKER_ORIGIN),
    'Public': new URL(process.env.NEXT_PUBLIC_HUB_PUBLIC_ORIGIN),
  },
}
