import Worker from 'worker!./worker'
import throttle from 'lodash/function/throttle'

export default (progressCallback, suggestionsCallback) => {
  let worker, currentIteration = 0, totalIterations = 0, lastResultTimestamp

  const onProgress = throttle(progressCallback, 25)

  const inProgress = () => currentIteration < totalIterations

  const getWorker = () => {
    worker = worker || new Worker

    worker.onmessage = ({data}) => {
      if (data.suggestions) {
        suggestionsCallback(data.suggestions)
      }
      if (data.totalIterations) {
        totalIterations = data.totalIterations
      }
      if (data.currentIteration) {
        lastResultTimestamp = new Date().getTime()
        currentIteration = data.currentIteration
        onProgress(Math.round(100 * currentIteration / totalIterations))
      }
    }
    return worker
  }

  const check = () => {
    if (inProgress() && new Date().getTime() - lastResultTimestamp > 200) {
      console.error('Stalled on iteration %s from %s. Abort', currentIteration, totalIterations)
      getWorker().terminate()
      currentIteration = totalIterations
      worker = undefined;
      getWorker();
      onProgress(Math.round(100 * currentIteration / totalIterations))
    }
  }
  setInterval(check, 200)

  return {
    start(args, result) {
      const worker = getWorker()
      worker.postMessage({ args, result })
    }
  }
}