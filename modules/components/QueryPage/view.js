import React from 'react'
import Query from '../Query'
import Suggestions from '../Suggestions'
import ProgressBar from './../ProgressBar'

const QueryPage_View = ({ onArgumentsChange, onResultChange, suggestions = [], loading, progress }) => {
  return (
      <div>
        <div css={{ margin: '2rem 0' }}>
          <Query {...{ onArgumentsChange, onResultChange }} />
        </div>
        <div css={{ margin: '2rem 0' }}>
          <Suggestions {...{ suggestions, loading }}/>
        </div>
        <ProgressBar percent={progress} />
      </div>
  )
}

export default QueryPage_View
