import React from 'react'
import { args, result, header, queryContainer } from './styles.css'
import Codemirror from 'react-codemirror'

export default React.createClass({
  getInitialState: () => ({
    arguments: '[1, 2, 3]',
    result: '3'
  }),
  updateCode: newCode => {
    this.setState({ code: newCode })
  },
  onArgumentsChange: () => {

  },
  render() {
  const styles = {};
    return (
      <div>
        <h2 className={header}>Function arguments</h2>
        <div className={queryContainer}>
          <Codemirror className={args} value={this.state.arguments} onChange={this.onArgumentsChange}/>
          <Codemirror className={result} value={this.state.result}/>
        </div>
      </div>
    )
  }
})

