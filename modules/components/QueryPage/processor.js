import Worker from 'worker?inline!./worker'
import throttle from 'lodash/throttle'
import { timeout } from './../../constants'
import createPool from './createPool'

export default (progressCallback, suggestionsCallback) => {
  const pool = createPool()
  let currentPid = 0

  // For now set modules is called only once
  const setModules = modules => pool.setModules(modules)

  const onProgress = throttle(progressCallback, 25)
  const onSuggestions = suggestions => suggestionsCallback([ ...suggestions ])

  const start = (args, result) => {
    console.time('process')
    const pid = ++currentPid
    const suggestions = []
    let timestamp
    let total, last
    let intervalId

    pid === currentPid && onSuggestions(suggestions)

    const workerCallback = ({ data }) => {
      switch (data.action) {
        case 'start':
          total = data.total
          last = data.skipped
          if (!intervalId) {
            intervalId = setInterval(check, timeout)
            timestamp = new Date().getTime()
          }
          break
        case 'step':
          timestamp = new Date().getTime()
          last = data.current
          pid === currentPid && onProgress(Math.round(100 * last / total))
          if (data.display) {
            suggestions.push({ id: data.current, display: data.display, modified: data.modified })
          }
          break
        case 'finish':
        case 'error':
          pid === currentPid && onSuggestions(suggestions)
          clearInterval(intervalId)
          intervalId = undefined
          worker.terminate()
          console.timeEnd('process')
          pool.regenerate()
          break
      }
    }

    const createWorker = () => {
      const worker = pool.getWorker()
      worker.onmessage = workerCallback
      return worker
    }

    let worker = createWorker()

    const check = () => {
      if (new Date().getTime() - timestamp > timeout) {
        console.error('Stalled on iteration %s from %s. Restart.', last, total)
        clearInterval(intervalId)
        intervalId = undefined
        worker.terminate()
        worker = createWorker()
        worker.postMessage({ args, result, skip: last + 1 })
      }
    }

    worker.postMessage({ args, result })
  }
  return { start, setModules }
}
