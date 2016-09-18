import React from 'react'
import Query from '../Query'
import Suggestions from '../Suggestions'
import ProgressBar from './../ProgressBar'
import ModuleSelector from '../ModuleSelector'
import Manual from './../Manual'

const QueryPage_View = ({ onArgumentsChange, onResultChange, suggestions = [], loading, progress }) => {
  return (
    <div>
      <div css={{ padding: 8 }}>
        <Manual/>
      </div>
      <div css={{ padding: 8 }}>
        <ModuleSelector />
      </div>
      <div css={{ padding: 8 }}>
        <Query {...{ onArgumentsChange, onResultChange }} />
      </div>
      <div css={{ padding: 8 }}>
        <Suggestions {...{ suggestions, loading }}/>
      </div>
      <ProgressBar percent={progress} />
    </div>
  )
}

export default QueryPage_View
