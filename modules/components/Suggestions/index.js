import React from 'react'
import styles from './styles.css'
import SyntaxHighlight from './../SyntaxHighlight'
import DocLink from './DocLink'
import { suggestionToString } from 'what-the-function-core'
import warningSvg from './warning.svg'

const WarnModified = () => (
  <img src={warningSvg} className={styles.warning} title="Arguments have been modified by function call"/>
)

export default ({ suggestions }) => (
  <div className={styles.component}>
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
