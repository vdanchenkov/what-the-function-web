import 'babel-polyfill'
import { wtf, snippets, builtInFunctions } from 'what-the-function-core'
import isEqual from 'lodash/isEqual'
import zipObject from 'lodash/zipObject'

let resolveModules

const modulesToSearch = new Promise(resolve => resolveModules = resolve)

self.onmessage = event => {
  if (event.data.action == 'loadModules') {
    resolveModules(loadModules(event.data.payload))
  } else {
    modulesToSearch.then(modules => search(modules, event.data.args, event.data.result, event.data.skip))
  }
}

const loadModules = modules => {
  console.time('eval modules')
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
  console.timeEnd('eval modules')
  return zipObject(resultNames, resultModules)
}

const search = (modulesToSearch, args, result, skip = 0) => {
  console.log(`search wtf(${args.slice(1,-1)}) == ${result} from ${Object.keys(modulesToSearch)}, skip: ${skip}`)
  console.time('  total')
  console.time('  init')
  let evaledArgs, evaledResult, outcomes
  try {
    evaledArgs = eval(args)
    evaledResult = eval(result)
    outcomes = wtf(modulesToSearch, builtInFunctions, snippets)(...evaledArgs)({ skip })
  } catch (e) {
    postMessage({ action: 'error', message: e.toString() })
  }
  console.timeEnd('  init')

  console.time('  iterations')
  console.log(`  going through ${outcomes.total} iterations`)
  postMessage({ action: 'start', skipped: skip, total: outcomes.total })
  for (const outcome of outcomes) {
    if (isEqual(outcome.result, evaledResult)) {
      postMessage({ action: 'step', ...outcome })
    } else {
      postMessage({ action: 'step', current: outcome.current })
    }
  }
  postMessage({ action: 'finish' })
  console.timeEnd('  iterations')
  console.timeEnd('  total')
}
