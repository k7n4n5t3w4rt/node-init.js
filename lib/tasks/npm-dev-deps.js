'use strict'

const path = require('path')

const semver = require('semver')

const updateJson = require('../json.js').updateJson

const LABEL = 'devDeps in package.json permit MINOR and PATCH updates'

function fn ({ cwd }) {
  return updateJson(path.join(cwd, 'package.json'), (pkg) => {
    pkg.devDependencies = pkg.devDependencies || {}
    Object.keys(pkg.devDependencies).forEach((dep) => {
      const version = pkg.devDependencies[dep]
      if (semver.valid(version)) {
        pkg.devDependencies[dep] = version.replace(/^\D*(\d)/, '^$1')
      }
    })
    return pkg
  })
}

module.exports = {
  fn,
  label: LABEL
}