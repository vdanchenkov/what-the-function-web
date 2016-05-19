import React from 'react'
import styles from './styles.css'
import Editor from '../Editor'
import requirejs from './../../requirejs'

export default React.createClass({
  componentDidMount() {
    this.updateResults()
    let lodash;
    requirejs([ 'https://npmcdn.com/lodash@4.12.0' ], lib => { lodash = lib })
  },
  getInitialState: () => ({
    suggestions: [ 1, 2, 3 ]
  }),
  updateResults() {
    // TODO
  },
  onResultChange: function ({ object: result }) {
    this.setState({ result })
    this.updateResults()
  },
  onArgumentsChange: function ({ object: args }) {
    this.setState({ args })
    this.updateResults()
  },
  render() {
    return (
      <QueryPageView
          onResultChange={this.onResultChange}
          onArgumentsChange={this.onArgumentsChange}
          suggestions={this.state.suggestions}
      />
    )
  }
})

export const QueryPageView = ({ onArgumentsChange, onResultChange, suggestions }) => {
  return (
      <div className={styles.component}>
        <div>
          modules(lodash).wtf(
        </div>
        <div className={styles.editor}>
          <Editor wrap={s => `[${s}]`} onChange={onArgumentsChange}/>
        </div>
        <div>
          ).eql(
        </div>
        <div className={styles.editor}>
          <Editor onChange={onResultChange}/>
        </div>
        <div>
          )
        </div>
      </div>
  )
}
