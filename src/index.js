import polygoat from 'polygoat';
import npm from 'npm';
import { makeEnv } from 'npm/lib/utils/lifecycle';
import npmRunPath from 'npm-run-path';

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
      const npmEnv = makeEnv({ scripts: {}, ...pkg });
      npmEnv.PATH = npmRunPath({ cwd: options.cwd });
      npmEnv.npm_execpath = require.main.filename;
      npmEnv.npm_node_execpath = npmEnv.NODE = npmEnv.NODE || process.execPath;
      if (options.scriptName) {
        npmEnv.npm_lifecycle_event = options.scriptName;
        npmEnv.npm_lifecycle_script = pkg.scripts[options.scriptName];
      }

      done(null, npmEnv);
    });
  }, callback);
}
