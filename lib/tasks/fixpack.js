'use strict'

const path = require('path')

const execa = require('execa')

const updateJson = require('../json.js').updateJson

const LABEL = 'fixpack installed and configured'

function npmInstall (cwd) {
  return execa('npm', [
    'install', '--save-dev',
    'fixpack'
  ], { cwd })
}

function npmScript (cwd) {
  return updateJson(path.join(cwd, 'package.json'), (pkg) => {
    pkg.scripts = pkg.scripts || {}
    pkg.scripts.fixpack = 'fixpack'
    return pkg
  })
}

function fn ({ cwd }) {
  return npmInstall(cwd)
    .then(() => npmScript(cwd))
}

module.exports = {
  fn,
  label: LABEL
}