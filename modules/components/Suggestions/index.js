import React from 'react'
import SyntaxHighlight from './../SyntaxHighlight'
import warningSvg from './warning.svg'

const WarnModified = () => (
  <img src={warningSvg} css={warning} title="Arguments have been modified by function call"/>
)

export default ({ suggestions }) => (
  <div css={component}>
    {
      suggestions.map(({ id, display, modified }) => (
          <div key={id}>
            <span>
              {modified ? <WarnModified/> : null}
              <SyntaxHighlight code={display}/>
            </span>
          </div>
      ))
    }
  </div>
)

const component = {
  fontSize: '0.85rem',
  fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
  lineHeight: '1.4'
}

const warning = {
  marginLeft: '-1.2em',
  width: '1em',
  height: '1em',
  paddingRight: '0.2em',
  verticalAlign: '-0.1em'
}
