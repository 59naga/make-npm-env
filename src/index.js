import polygoat from 'polygoat';
import npm from 'npm';
import { makeEnv } from 'npm/lib/utils/lifecycle';
import npmRunPath from 'npm-run-path';

function makeConfig(config = {}, prefix = 'npm_package_config_', data = {}) {
  Object.keys(config).forEach(key => {
    // @quote https://github.com/npm/npm/blob/v3.9.6/lib/utils/lifecycle.js#L348-L393
    const replacedKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
    if (typeof config[key] === 'object') {
      makeConfig(config[key], `${prefix}${replacedKey}_`, data);
      return;
    }
    const value = String(config[key]);
    const actualValue = value.indexOf('\n') > -1 ? JSON.stringify(config[key]) : value;
    data[`${prefix}${replacedKey}`] = actualValue;
  });
  return data;
}

export default function (...args) {
  const pkg = typeof args[0] === 'object' ? args[0] : {};
  const options = typeof args[1] === 'object' ? args[1] : {};
  const callback = typeof args[args.length - 1] === 'function' ? args[args.length - 1] : null;

  return polygoat((done) => {
    npm.load({}, (error) => {
      if (error) {
        done(error);
        return;
      }

      // @quote https://github.com/npm/npm/blob/v3.9.6/lib/utils/lifecycle.js
      const env = makeEnv({ scripts: {}, ...pkg }, null, process.env);
      env.PATH = npmRunPath({ cwd: options.cwd });
      env.npm_execpath = require.main.filename;
      env.npm_node_execpath = env.NODE = env.NODE || process.execPath;
      if (options.scriptName) {
        env.npm_lifecycle_event = options.scriptName;
        env.npm_lifecycle_script = pkg.scripts[options.scriptName];
      }
      const config = makeConfig(pkg.config);

      done(null, { ...env, ...config });
    });
  }, callback);
}
