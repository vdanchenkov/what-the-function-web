import React, { PropTypes } from 'react' 

const ModuleSelector = () => (
  <div>
    <h2 css={header}>Search in: </h2>
    <div css={list}>
      <label css={label}><input css={checkbox} type="checkbox" defaultChecked />lodash</label>
      <label css={label}><input css={checkbox} type="checkbox" defaultChecked />ramda</label>
      <label css={label}><input css={checkbox} type="checkbox" defaultChecked />snippets</label>
      <label css={label}><input css={checkbox} type="checkbox" defaultChecked />built-in</label>
    </div>
  </div>
)

ModuleSelector.propTypes = {
  moduleList: PropTypes.arrayOf(PropTypes.string) 
}

export default ModuleSelector

const list = {
  display: 'flex',
  flexWrap: 'wrap'
}

const label = { 
  backgroundColor: '#e8f5ff',
  border: '1px solid #b1ddff',
  borderRadius: 20,
  height: 20,
  margin: 4,
  padding: '0 8px',
  lineHeight: '16px'
}

const header = {
  fontSize: '1.2rem',
  margin: 0
}

const checkbox = { 
  margin: '0 4px 0 0',
  verticalAlign: '1px'
}
