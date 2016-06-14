import 'babel-polyfill'
import "script!requirejs/require"
import { functions } from 'what-the-function-core'
import cloneDeep from 'lodash/lang/cloneDeep'
import isEqual from 'lodash/lang/isEqual'

let funcList = []

requirejs([ 'https://npmcdn.com/lodash', 'https://npmcdn.com/ramda' ], (lodash, ramda) => {
  funcList = functions({ lodash, ramda, Object })
})

self.onmessage = event => {
  console.time('function search')
  const startTime = new Date().getTime();
  const suggestions = []
  postMessage({ suggestions })
  const { args, result } = event.data
  for (const f of funcList) {
    for (const a of args) {
      try {
        if (isEqual(f.func(...cloneDeep(a.args)), result)) {
          suggestions.push({
            argsLabels: a.argsLabels,
            library: f.library,
            name: f.name
          });
          postMessage(suggestions)
        }
      } catch (e) {

      }
    }
  }
  postMessage({ done: true, suggestions })
  console.timeEnd('function search')
}

