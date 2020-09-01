const presets = ['@vue/cli-plugin-babel/preset'];
const plugins = [];

// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ],
//   plugins: [
//     [
//       'component',
//       {
//         libraryName: 'element-ui',
//         styleLibraryName: 'theme-chalk'
//       }
//     ]
//   ]
// };

if (process.env.VUE_APP_ENV === 'production') {
  plugins.push('transform-remove-console');
}

if (process.env.VUE_APP_ENV === 'test') {
  plugins.push('istanbul');
}

module.exports = { presets, plugins };
