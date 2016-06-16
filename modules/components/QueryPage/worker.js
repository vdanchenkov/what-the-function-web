import 'babel-polyfill'
import "script!requirejs/require"
import { functions, argumentCombinations } from 'what-the-function-core'
import cloneDeep from 'lodash/lang/cloneDeep'
import isEqual from 'lodash/lang/isEqual'

let funcList = []

requirejs([ 'https://npmcdn.com/lodash', 'https://npmcdn.com/ramda' ], (lodash, ramda) => {
  funcList = functions({ lodash, ramda, Object })
})

self.onmessage = event => {
  console.log(`search wtf(${event.data.args.slice(1,-1)}) == ${event.data.result}`)
  console.time('  total')
  console.time('  init')
  const suggestions = []
  postMessage({ suggestions })
  let args, result
  try {
    args = eval(event.data.args)
    result = eval(event.data.result)
  } catch (e) {
    console.log(e)
    postMessage({ done: true, suggestions })
    return
  }

  const argsList = argumentCombinations(...args)

  console.timeEnd('  init')
  console.time('  iteration')

  const totalIterations = funcList.length * argsList.length
  let currentIteration = 0;

  for (const f of funcList) {
    for (const a of argsList) {
      try {
        if (isEqual(f.func(...cloneDeep(a.args)), result)) {
          suggestions.push({
            argsLabels: a.argsLabels,
            library: f.library,
            name: f.name
          });
          //postMessage({ suggestions })
        }
      } catch (e) {

      }
      postMessage({ currentIteration, totalIterations })
      currentIteration++
    }
  }
  postMessage({ done: true, suggestions })
  console.timeEnd('  iteration')
  console.timeEnd('  total')
}

