import React from 'react'
import Query from '../Query'
import Editor from '../Editor'
import Manual from '../Manual'
import Suggestions from '../Suggestions'
import ProgressBar from './../ProgressBar'

export default ({ onArgumentsChange, onResultChange, suggestions = [], loading, progress }) => {
  return (
      <div css={{ width: 400 }}>
        <Manual/>
        <div css={{ margin: '2rem 0' }}>
          <Query {...{onArgumentsChange, onResultChange}} />
        </div>
        <div css={{ margin: '2rem 0' }}>
          <Suggestions {...{suggestions, loading}}/>
        </div>
        <ProgressBar percent={progress} />
      </div>
  )
}
