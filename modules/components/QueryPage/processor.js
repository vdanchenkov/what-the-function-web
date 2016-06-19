import Worker from 'worker!./worker'
import throttle from 'lodash/function/throttle'

export default (progressCallback, suggestionsCallback) => {
  let worker, currentIteration = 0, totalIterations = 0, lastResultTimestamp, args, result

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
      console.error('Stalled on iteration %s from %s. Restart in 3 seconds', currentIteration, totalIterations)
      getWorker().terminate()
      worker = undefined;
      getWorker();
      setTimeout(() => {
        getWorker().postMessage({ args, result, startIteration: currentIteration + 1 })
      }, 3000)
    }
  }
  setInterval(check, 4000)
  const setParams = (_args, _result) => {
    args = _args
    result = _result
  }

  getWorker()

  return {
    start(args, result) {
      setParams(args, result)
      getWorker().postMessage({ args, result })
    }
  }
}