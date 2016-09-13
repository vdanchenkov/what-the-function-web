import Worker from 'worker?inline!./worker'

const poolSize = 5

export default () => {
  let pool = []
  let _modules = {}

  const createWorker = () => {
    const worker = new Worker()
    worker.postMessage({ action: 'loadModules', payload: _modules })
    return worker
  }

  const setModules = (modules) => {
    _modules = modules
    pool = []
    regenerate()
  }

  const getWorker = () => {
    return pool.shift() || createWorker()
  }

  const regenerate = () => {
    for (let i = pool.length; i < poolSize; i++ ) {
      pool.push(createWorker())
    }
  }

  return {
    setModules,
    getWorker,
    regenerate
  }
}
