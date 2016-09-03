import React from 'react'
import View from './view'
import processor from './processor'
import throttle from 'lodash/throttle'
import zipObject from 'lodash/zipObject'

export default React.createClass({
  componentDidMount() {
    this.processor = processor(
        (progress) => this.setState({ progress }),
        (suggestions) => this.setState({ suggestions })
    )
    const modules = [ 'lodash', 'ramda' ]
    Promise.all(modules.map(m => fetch(`https://unpkg.com/${m}`).then(r => r.text())))
        .then(result => this.processor.setModules(zipObject(modules, result)))
  },
  getInitialState: () => ({
    suggestions: []
  }),
  updateResults() {
    if (!this.state.args || !this.state.result) return
    const { args, result } = this.state
    this.processor.start(args, result)
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
