import React from 'react'
import styles from './styles.css'
import SyntaxHighlight from './../SyntaxHighlight'
import DocLink from './DocLink'
import { suggestionToString } from 'what-the-function-core'

export default ({ suggestions }) => (
  <div className={styles.component}>
    {
      suggestions.map(({ id, display }) => (
          <div key={id}>
            <span>
              <SyntaxHighlight code={display}/>
            </span>
          </div>
      ))
    }
  </div>
)
