import React from 'react'
import View from './view'
import Worker from 'worker!./worker'

const worker = new Worker

export default React.createClass({
  componentDidMount() {
    worker.onmessage = this.onMessage
  },
  getInitialState: () => ({
    suggestions: []
  }),
  onMessage(event) {
    const { done, suggestions } = event.data

    if (done) {
      this.setState({
        loading: false,
        suggestions: suggestions,
      })
    } else {
      this.setState({
        loading: true,
        suggestions: suggestions,
      })
    }
  },
  updateResults() {
    if (!this.state.args || !this.state.result) return
    const { args, result } = this.state
    worker.postMessage({ args, result })
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
      />
    )
  }
})
