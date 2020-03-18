const { version } = require('../package.json');
const app = require('../app.json');

module.exports = {
  name: app.name,
  themeColor: app.color,
  msTileColor: app.color,
  assetsVersion: version,
  appleMobileWebAppCapable: 'yes',

  manifestOptions: {
    background_color: app.background,
    orientation: 'portrait',
    theme_color: app.color,
    short_name: app.short,
    display: app.display,
    name: app.name,
    start_url: '/',
    scope: '/',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: '/icons/android-chrome-512x512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ]
  },

  iconPaths: {
    appleTouchIcon: 'icons/apple-touch-icon.png',
    maskIcon: 'icons/safari-pinned-tab.svg',
    msTileImage: 'icons/mstile-150x150.png',
    favicon32: 'icons/favicon-32x32.png',
    favicon16: 'icons/favicon-16x16.png'
  }
};
