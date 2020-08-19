const presets = ['@vue/cli-plugin-babel/preset'];
const plugins = [];

if (process.env.VUE_APP_ENV === 'production') {
  plugins.push('transform-remove-console');
}

if (process.env.VUE_APP_ENV === 'test') {
  plugins.push('istanbul');
}

module.exports = { presets, plugins };
