import React from 'react'
import Editor from '../Editor'
import ModuleSelector from '../ModuleSelector'

const Query = ({ onArgumentsChange, onResultChange }) => (
  <div css={component}>
    <ModuleSelector />
    <div>
      wtf(
    </div>
    <div css={editor}>
      <Editor wrap={s => `[${s}]`} onChange={onArgumentsChange}/>
    </div>
    <div>
      ).eql(
    </div>
    <div css={editor}>
      <Editor wrap={s => `(${s})`} onChange={onResultChange}/>
    </div>
    <div>
      )
    </div>
  </div>
) 

export default Query

const component = {
  fontSize: '0.85rem',
  fontFamily: `Consolas, "Liberation Mono", Menlo, Courier, monospace`,
  color: '#888',
  lineHeight: 1.4,
  label: 'Query'
}

const editor = {
  paddingLeft: '1rem',
  label: 'TODO'
}

const sample = {
  display: 'none',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  textDecoration: 'underline',
  color: '#479DB9',
  paddingRight: '1rem',
  float: 'right'
}
