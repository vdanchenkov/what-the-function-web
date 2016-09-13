import React from 'react'
import Editor from '../Editor'

export default ({ onArgumentsChange, onResultChange }) => (
  <div css={component}>
    <div>
      wtf({'{ lodash, ramda, Object }'})(
      <a css={sample}>sample</a>
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

const component = {
  fontSize: '0.85rem',
  fontFamily: `Consolas, "Liberation Mono", Menlo, Courier, monospace`,
  color: '#888',
  lineHeight: 1.4
}

const editor = {
  paddingLeft: '1rem'
}

const sample = {
  display: 'none',
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  textDecoration: 'underline',
  color: '#479DB9',
  paddingRight: '1rem',
  float: 'right'
}
