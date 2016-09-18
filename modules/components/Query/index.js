import React from 'react'
import Editor from '../Editor'

const Query = ({ onArgumentsChange, onResultChange }) => (
  <div css={component}>
    wtf(
    <div css={editor}>
      <Editor wrap={s => `[${s}]`} onChange={onArgumentsChange}/>
    </div>  
    ).isEqual(
    <div css={editor}>
      <Editor wrap={s => `(${s})`} onChange={onResultChange}/>
    </div>
    )
  </div>
) 

export default Query

const component = {
  fontSize: '0.9rem',
  fontFamily: `Consolas, "Liberation Mono", Menlo, Courier, monospace`,
  color: '#888',
  lineHeight: 1.4
}

const editor = {
  display: 'inline-block'
}

