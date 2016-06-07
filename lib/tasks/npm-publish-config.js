'use strict'

const path = require('path')

const { updateJson } = require('../json.js')

const LABEL = '"publishConfig" for @scope (if any) set in package.json'

function fn ({ cwd, scope }) {
  if (!scope) {
    return Promise.resolve()
  }
  return updateJson(
    path.join(cwd, 'package.json'),
    (pkg) => {
      pkg.publishConfig = pkg.publishConfig || {}
      pkg.publishConfig.access = pkg.publishConfig.access || 'public'
      return pkg
    }
  )
}

module.exports = {
  fn,
  label: LABEL
}