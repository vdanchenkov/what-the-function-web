import 'babel-polyfill'
import { wtf, snippets, builtInFunctions } from 'what-the-function-core'
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
  const pid = event.data.pid
  const skip = event.data.skip
  console.log(`search wtf(${event.data.args.slice(1,-1)}) == ${event.data.result} from ${Object.keys(event.data.modules)}, skip: ${event.data.skip || 0}`)
  console.time('  total')
  console.time('  init')
  console.time('  eval modules')
  const modules = loadModules(event.data.modules)
  console.timeEnd('  eval modules')

  let args, result
  try {
    args = eval(event.data.args)
    result = eval(event.data.result)
  } catch (e) {
    postMessage({ action: 'error', message: e.toString(), pid })
    return
  }
  console.timeEnd('  init')

  console.time('  iterations')
  const outcomes = wtf(modules, builtInFunctions, snippets)(...args)({ skip })
  console.log(`going through ${outcomes.total} iterations`)
  postMessage({ action: 'start', total: outcomes.total, pid })
  for (const outcome of outcomes) {
    if (isEqual(outcome.result, result)) {
      postMessage({ action: 'step', ...outcome, pid })
    } else {
      postMessage({ action: 'step', current: outcome.current, pid })
    }
  }
  postMessage({ action: 'finish', pid })
  console.timeEnd('  iterations')
  console.timeEnd('  total')
}
