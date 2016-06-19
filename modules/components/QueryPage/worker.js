import 'babel-polyfill'
import "script!requirejs/require"
import { functions, argumentCombinations } from 'what-the-function-core'
import cloneDeep from 'lodash/lang/cloneDeep'
import isEqual from 'lodash/lang/isEqual'

console.time('require')

const initPromise = new Promise((resolve, reject) => {
  requirejs([ 'https://npmcdn.com/lodash', 'https://npmcdn.com/ramda' ], (lodash, ramda) => {
    console.timeEnd('require')
    resolve(functions({ lodash, ramda, Object }))
  })
})

const onMessage = (event, funcList) => {
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
  const startIteration = event.data.startIteration || 1

  const argsList = argumentCombinations(...args)

  console.timeEnd('  init')
  console.time('  iterations')
  const totalIterations = funcList.length * argsList.length
  console.log(`going through ${totalIterations} iterations`)
  let currentIteration = 1;

  for (const f of funcList) {
    for (const a of argsList) {
      if (currentIteration >= startIteration) {
        postMessage({ currentIteration, totalIterations })
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
      }
      currentIteration++
    }
  }
  postMessage({ done: true, suggestions })
  console.timeEnd('  iterations')
  console.timeEnd('  total')
}

self.onmessage = (event) => {
  initPromise.then(funcList => onMessage(event, funcList))
}
