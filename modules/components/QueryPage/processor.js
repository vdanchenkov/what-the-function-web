import Worker from 'worker?inline!./worker'
import throttle from 'lodash/throttle'
import { timeout } from './../../constants'

export default (progressCallback, suggestionsCallback) => {
  let worker, lastIteration = 0, totalIterations = 0, timestamp
  let searchParams
  let suggestions

  const onProgress = throttle(progressCallback, 25)
  const onSuggestions = suggestions => suggestionsCallback([...suggestions])

  const getWorker = () => {
    worker = worker || new Worker

    worker.onmessage = ({ data }) => {
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
  }

  const inProgress = () => !!timestamp

  const check = () => {
    if (inProgress() && new Date().getTime() - timestamp > timeout) {
      console.error('Stalled on iteration %s from %s. Restart.', lastIteration, totalIterations)
      terminate()
      getWorker().postMessage({ ...searchParams, skip: lastIteration + 1 })
    }
  }
  setInterval(check, timeout)

  getWorker()

  const start = (args, result, modules) => {
    if (inProgress) {
      terminate()
      console.log('Terminate on parameter change')
    }
    console.time('process')
    suggestions = []
    onSuggestions(suggestions)
    searchParams = { args, result, modules }
    getWorker().postMessage(searchParams)
  }

  return { start }
}