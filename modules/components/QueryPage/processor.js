import Worker from 'worker?inline!./worker'
import throttle from 'lodash/throttle'
import { timeout } from './../../constants'

export default (progressCallback, suggestionsCallback) => {
  let worker, currentIteration = 0, totalIterations = 0, lastResultTimestamp
  let searchParams
  let suggestions

  const onProgress = throttle(progressCallback, 25)
  const onSuggestions = suggestions => suggestionsCallback([...suggestions])

  const inProgress = () => currentIteration < totalIterations

  const getWorker = () => {
    worker = worker || new Worker

    worker.onmessage = ({ data }) => {
      if (data.suggestion) {
        suggestions.push(data.suggestion)
      }
      if (data.totalIterations) {
        totalIterations = data.totalIterations
      }
      if (data.currentIteration) {
        lastResultTimestamp = new Date().getTime()
        currentIteration = data.currentIteration
        onProgress(Math.round(100 * currentIteration / totalIterations))
        if (currentIteration == totalIterations) {
          onSuggestions(suggestions)
          console.timeEnd('process')
        }
        if (currentIteration > totalIterations) {
          console.error('Current iteration index should not be greater then total')
        }
      }
    }
    return worker
  }

  const check = () => {
    if (inProgress() && lastResultTimestamp && new Date().getTime() - lastResultTimestamp > timeout) {
      console.error('Stalled on iteration %s from %s. Restart.', currentIteration, totalIterations)
      getWorker().terminate()
      worker = undefined
      lastResultTimestamp = 0
      getWorker().postMessage({ ...searchParams, startIteration: currentIteration + 1 })
    }
  }
  setInterval(check, timeout)

  getWorker()

  const start = (args, result, modules) => {
    console.time('process')
    suggestions = []
    onSuggestions(suggestions)
    searchParams = { args, result, modules }
    getWorker().postMessage(searchParams)
  }

  return { start }
}