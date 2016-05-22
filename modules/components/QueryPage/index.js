import React from 'react'
import requirejs from './../../requirejs'
import { functions, argumentCombinations, findFunction } from 'what-the-function-core'
import View from './view'

export default React.createClass({
  componentDidMount() {
    requirejs([ 'https://npmcdn.com/lodash@4.12.0' ], lodash => {
      this.setState({ libraries: { lodash, Object } })
      this.updateResults()
    })
  },
  getInitialState: () => ({
    suggestions: []
  }),
  updateResults() {
    if (!this.state.libraries || !this.state.args || !this.state.result) return
    const suggestions = findFunction(
      functions(this.state.libraries),
      argumentCombinations(...eval(this.state.args)),
      eval(this.state.result)
    )
    this.setState({ suggestions })
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
      />
    )
  }
})
