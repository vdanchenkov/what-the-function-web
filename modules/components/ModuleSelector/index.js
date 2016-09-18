import React, { PropTypes } from 'react' 

const ModuleSelector = () => (
  <div>
    <label css={label}><input css={checkbox} type="checkbox" />lodash</label>
    <label css={label}><input css={checkbox} type="checkbox" />ramda</label>
    <label css={label}><input css={checkbox} type="checkbox" />snippets</label>
    <label css={label}><input css={checkbox} type="checkbox" />Built-in functions</label>
  </div>
)

ModuleSelector.propTypes = {
  moduleList: PropTypes.arrayOf(PropTypes.string) 
}

export default ModuleSelector

const label = { display: 'block' }
const checkbox = { }

