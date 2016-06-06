'use strict';

const os = require('os')
const path = require('path')

const execa = require('execa')
const figures = require('figures')
const through2 = require('through2')
const vfs = require('vinyl-fs')

const fs = require('../fs.js')

const LABEL = '.gitignore set for Node.js'

function fn ({ cwd }) {
    const filePath = path.join(cwd, '.gitignore')
    return fs.access(filePath)
        .catch(() => fs.writeFile(filePath, ''))
        .then(() => new Promise((resolve, reject) => {
            vfs.src('.gitignore', { cwd })
                .pipe(through2.obj((file, enc, cb) => {
                    let contents = file.contents.toString(enc)
                    if (!/\bnode_modules\b/.test(contents)) {
                        contents += (`${os.EOL}node_modules${os.EOL}`)
                    }
                    file.contents = Buffer.from(contents, enc)
                    cb(null, file)
                }))
                .pipe(vfs.dest(cwd))
                .on('error', (err) => reject(err))
                .on('end', () => resolve())
        }))
}

module.exports = {
    fn,
    label: LABEL
}