Make Npm Env
---

<p align="right">
  <a href="https://npmjs.org/package/make-npm-env">
    <img src="https://img.shields.io/npm/v/make-npm-env.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/make-npm-env">
    <img src="http://img.shields.io/travis/59naga/make-npm-env.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/make-npm-env/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/make-npm-env.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/make-npm-env">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/make-npm-env.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/make-npm-env">
    <img src="https://img.shields.io/gemnasium/59naga/make-npm-env.svg?style=flat-square">
  </a>
</p>

generate `process.env` similar `npm run-script`

Installation
---
```bash
npm install make-npm-env --save
```

API
---
* `makeNpmEnv(packageJson[, opts], callback)` -> `callback(error, env)`
* `makeNpmEnv(packageJson[, opts])` -> `Promise(env)`

  ```js
  import makeNpmEnv from './';
  import data from './package.json';

  makeNpmEnv(data, (error, env) => console.log(env));
  // or ...
  makeNpmEnv(data).then(env => console.log(env));
  // {
  //   PATH: '/Users/59naga/Downloads/make-npm-env/node_modules/.bin:...',
  //   ...
  //   npm_package_scripts_start: 'mocha --watch',
  //   ...
  //   npm_config_user_agent: : 'npm/3.9.5 node/v5.11.1 darwin x64',
  //   ...
  //   npm_execpath: '/Users/59naga/Downloads/make-npm-env/example.js',
  //   NODE: '/Users/59naga/.nvm/versions/node/v5.11.1/bin/node',
  //   npm_node_execpath: '/Users/59naga/.nvm/versions/node/v5.11.1/bin/node'
  // }
  ```

Development
---
Requirement global
* NodeJS v5.11.1
* Npm v3.8.6 (or [pnpm](https://github.com/rstacruz/pnpm))

```bash
git clone https://github.com/59naga/make-npm-env
cd make-npm-env
npm install

npm test
```

License
---
[MIT](http://59naga.mit-license.org/)
