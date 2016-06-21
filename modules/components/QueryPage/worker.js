import 'babel-polyfill'
import { functions, argumentCombinations } from 'what-the-function-core'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import zipObject from 'lodash/zipObject'
import memoize from 'lodash/memoize'

const loadModules = memoize((modules) => {
  // prevent node style export
  const exports = undefined
  const module = undefined

  const resultModules = []
  const resultNames = []

  const define = (...args) => {
    const factory = args[args.length - 1]
    resultModules.push(typeof factory == 'function' ? factory() : factory)
  }
  define.amd = {}

  for (const moduleName in modules) {
    eval(modules[moduleName])
    // iteration order is not guarantied, so we have to push names in the same order as modules
    resultNames.push(moduleName)
  }

  return zipObject(resultNames, resultModules)
})

self.onmessage = (event) => {
  console.log(`search wtf(${event.data.args.slice(1,-1)}) == ${event.data.result} from ${Object.keys(event.data.modules)}`)
  console.time('  total')
  console.time('  init')
  console.time('  eval modules')
  const modules = loadModules(event.data.modules)
  console.timeEnd('  eval modules')
  const funcList = functions({ ...modules, Object })

  let args, result
  try {
    args = eval(event.data.args)
    result = eval(event.data.result)
  } catch (e) {
    postMessage({ error: e.toString() })
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
            const suggestion = {
              argsLabels: a.argsLabels,
              library: f.library,
              name: f.name
            }
            postMessage({ suggestion })
          }
        } catch (e) {

        }
      }
      currentIteration++
    }
  }
  console.timeEnd('  iterations')
  console.timeEnd('  total')
}
