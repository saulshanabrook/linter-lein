'use babel'
/* global atom */

import { CompositeDisposable } from 'atom'
import path from 'path'

export default {
  config: {
    leinExecutablePath: {
      description: 'Path to the `lein` executable',
      type: 'string',
      default: 'lein'
    }
  },

  activate () {
    require('atom-package-deps').install()
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(
      atom.config.observe('linter-lein.leinExecutablePath', leinExecutablePath => {
        this.leinPath = leinExecutablePath
      })
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  provideLinter () {
    const helpers = require('atom-linter')
    return {
      name: 'lein',
      grammarScopes: ['source.clojure'],
      scope: 'file',
      lintOnFly: true,
      lint: textEditor => {
        const filePath = textEditor.getPath()
        const fileDir = path.dirname(filePath)
        const regex = new RegExp(/^(\d+)[ ]:[ ](.*)$/)
        return helpers.exec(
          this.leinPath,
          ['trampoline', 'check-stdin'],
          {
            cwd: fileDir,
            stdin: textEditor.getBuffer().getLines().join("\n")
          }
        ).then(eastwoodOut => eastwoodOut
          .split(/\n/)
          .map(l => regex.exec(l))
          .map(a => {console.log(a); return a})
          .filter(v => v !== null)
          .map(m => ({
            line: parseInt(m[1]) - 1,
            msg: m[2]
          }))
          .map(e => ({
            type: 'Error',
            text: e.msg,
            name: "lein check",
            filePath: filePath,
            range: helpers.rangeFromLineNumber(textEditor, e.line, 0)
          }))
        )
      }
    }
  }
}
