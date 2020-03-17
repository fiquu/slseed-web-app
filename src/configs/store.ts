const modules: StoreModules = {};

export interface StoreModule {
  [key: string]: StoreModule | boolean;
}

export interface StoreModules {
  [key: string]: StoreModule;
}

// Import every module's `store/index.js` dynamically
const req = require.context('../modules/', true, /\/store\/.+\.ts$/);

for (const path of req.keys()) {
  const name = path.replace(/^.\/(.+)\/store\/(.+)\.ts$/, '$1');
  const prop = path.replace(/^.\/(.+)\/store\/(.+)\.ts$/, '$2');

  if (!modules[String(name)]) {
    modules[String(name)] = {
      namespaced: true
    };
  }

  modules[String(name)][String(prop)] = req(path).default;
}

export default {
  modules
};
