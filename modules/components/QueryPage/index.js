import React from 'react'
import styles from './styles.css'
import Codemirror from 'react-codemirror'
import classnames from 'classnames'
import { transform } from 'babel-core'

export default React.createClass({
  componentDidMount() {
    this.updateResults()
  },
  getInitialState: () => ({
    args: '[1, 2, 3]',
    result: '3',
    suggestions: [ 1, 2, 3 ]
  }),
  updateResults() {
    try {
      const result = transform(this.state.args)
      this.setState({ suggestions: [ result.code ], argsError: undefined })
    } catch (e) {
      this.setState({ argsError: e.toString() })
    }
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
            argsError={this.state.argsError}
            result={this.state.result}
            onResultChange={this.onResultChange}
            onArgumentsChange={this.onArgumentsChange}
            suggestions={this.state.suggestions}
        />
    )
  }
})

export const QueryPageView = ({ args, argsError, result, onResultChange, onArgumentsChange, suggestions }) => {
  return (
      <div>
        <div className={styles.queryContainer}>
          <Codemirror
              className={classnames(styles.args, { [ styles.error ]: argsError })}
              value={args}
              onChange={onArgumentsChange}
              textAreaClassName={argsError ? styles.error : ''}
          />
          <Codemirror className={styles.result} value={result} onChange={onResultChange}/>
        </div>
        { argsError ? <div>Error: {argsError}</div> : null }
        {
          suggestions.map(suggestion => <div>{suggestion}</div>)
        }
      </div>
  )
}
