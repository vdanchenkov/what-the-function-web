import Worker from 'worker?inline!./worker'
import throttle from 'lodash/throttle'
import { timeout } from './../../constants'

export default (progressCallback, suggestionsCallback) => {
  let worker, lastIteration = 0, totalIterations = 0, timestamp, pid, nextPid = 1
  let searchParams
  let suggestions

  const onProgress = throttle(progressCallback, 25)
  const onSuggestions = suggestions => suggestionsCallback([...suggestions])

  const getWorker = () => {
    worker = worker || new Worker

    worker.onmessage = ({ data }) => {
      if (data.pid != pid) {
        return
      }
      switch(data.action) {
        case 'start':
          totalIterations = data.total
          timestamp = new Date().getTime()
          break
        case 'step':
          timestamp = new Date().getTime()
          lastIteration = data.current
          onProgress(Math.round(100 * lastIteration / totalIterations))
          if (data.display) {
            suggestions.push({ id: data.current, display: data.display, modified: data.modified })
          }
          break
        case 'finish':
          timestamp = null
          pid = null
          onSuggestions(suggestions)
          console.timeEnd('process')
          break
      }
    }
    return worker
  }

  const terminate = () => {
    getWorker().terminate()
    worker = undefined
    timestamp = null
    pid = null
  }

  const check = () => {
    if (timestamp && new Date().getTime() - timestamp > timeout) {
      console.error('Stalled on iteration %s from %s. Restart.', lastIteration, totalIterations)
      terminate()
      getWorker().postMessage({ ...searchParams, skip: lastIteration + 1 })
    }
  }
  setInterval(check, timeout)

  getWorker()

  const start = (args, result, modules) => {
    pid = nextPid++
    console.time('process')
    suggestions = []
    onSuggestions(suggestions)
    searchParams = { args, result, modules }
    timestamp = null
    getWorker().postMessage({ pid, ...searchParams })
  }

  return { start }
}
