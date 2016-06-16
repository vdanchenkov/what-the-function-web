import React from 'react'
import View from './view'
import Worker from 'worker!./worker'
import throttle from 'lodash/function/throttle'

export default React.createClass({
  componentDidMount() {
    this.worker = new Worker;
    this.worker.onmessage = this.onMessage
    this.onProgressUpdate = throttle((progress) => {
      this.setState({ progress })
    }, 10)
  },
  getInitialState: () => ({
    suggestions: []
  }),
  onMessage(event) {
    const { done, suggestions, currentIteration, totalIterations } = event.data
    if (suggestions) {
      this.setState({ suggestions })
    }

    if (currentIteration) {
      this.onProgressUpdate(Math.round(100 * currentIteration / totalIterations))
    }
  },
  updateResults() {
    if (!this.state.args || !this.state.result) return
    const { args, result } = this.state
    this.worker.postMessage({ args, result })
  },
  onResultChange: function (result) {
    this.setState({ result }, this.updateResults)
  },
  onArgumentsChange: function (args) {
    this.setState({ args }, this.updateResults)
  },
  render() {
    return (
      <View
          onResultChange={this.onResultChange}
          onArgumentsChange={this.onArgumentsChange}
          suggestions={this.state.suggestions}
          loading={this.state.loading}
          progress={this.state.progress}
      />
    )
  }
})
