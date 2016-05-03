import React from 'react'
import styles from './styles.css'
import Codemirror from 'react-codemirror'
import babel from 'babel-core'

export default React.createClass({
  componentDidMount() {
    this.updateResults()
  },
  getInitialState: () => ({
    args: '[1, 2, 3]',
    result: '3',
    suggestions: [ 1,2,3 ]
  }),
  updateResults() {
    this.setState({ suggestions: [ `f(${this.state.args}) == ${this.state.result}` ] })
  },
  onResultChange: function (result) {
    this.setState({ result })
    this.updateResults()
  },
  onArgumentsChange: function (args) {
    this.setState({ args })
    this.updateResults()
  },
  render() {
    return (
        <QueryPageView
            args={this.state.args}
            result={this.state.result}
            onResultChange={this.onResultChange}
            onArgumentsChange={this.onArgumentsChange}
            suggestions={this.state.suggestions}
        />
    )
  }
})

export const QueryPageView = ({ args, result, onResultChange, onArgumentsChange, suggestions }) => {
  return (
      <div>
        <div className={styles.queryContainer}>
          <Codemirror className={styles.args} value={args} onChange={onArgumentsChange}/>
          <Codemirror className={styles.result} value={result} onChange={onResultChange}/>
        </div>
        {
          suggestions.map(suggestion => <div>{suggestion}</div>)
        }
      </div>
  )
}
