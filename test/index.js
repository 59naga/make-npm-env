import assert from 'assert';
import { execSync } from 'child_process';
import data from '../package.json';

// target
import makeNpmEnv from '../src';

// environment
const nativeNpmEnv = JSON.parse(execSync('npm run env --silent').toString());
const ignore = [
  // todo: not exact same...
  'PATH',
  'SHLVL',
  '_',
  'npm_config_argv',
  'npm_config_loglevel',
  'npm_execpath',
  'npm_package_description',
  'npm_package_readmeFilename',
  'npm_package_version',
  'npm_package_author',
  'npm_package_repository_url',
];

// specs
describe('makeNpmEnv', () => {
  it('should generate the environment variables, such as `npm run-script`', async () => {
    const env = await makeNpmEnv(data);
    const expectedEnv = JSON.parse(JSON.stringify(nativeNpmEnv));

    // add ignore
    ['npm_lifecycle_event', 'npm_lifecycle_script'].concat(ignore).forEach(key => {
      delete env[key];
      delete expectedEnv[key];
    });

    assert.deepStrictEqual(env, expectedEnv);
  });

  it('if specify a opts.scriptName, should set `npm_lifecycle_`', async () => {
    const env = await makeNpmEnv(data, { scriptName: 'env' });
    const expectedEnv = JSON.parse(JSON.stringify(nativeNpmEnv));

    ignore.forEach(key => {
      delete env[key];
      delete expectedEnv[key];
    });

    assert.deepStrictEqual(env, expectedEnv);
  });
});
