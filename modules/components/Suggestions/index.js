import React from 'react'
import styles from './styles.css'
import SyntaxHighlight from './../SyntaxHighlight'
import DocLink from './DocLink'
import { suggestionToString } from 'what-the-function-core'

export default ({ suggestions }) => (
  <div className={styles.component}>
    {
      suggestions.map(({ library, name, argsLabels, display }) => (
          <div key={[ library, name, argsLabels, display ].join('|')}>
            { display ?
                <span>
                  <SyntaxHighlight code={ suggestionToString({ argsLabels, display }) }/>
                </span>
              :
                <span>
                  {library}
                  <span className="token punctuation">.</span>
                  <span className="token function"><DocLink module={library} func={name}>{name}</DocLink></span>
                  <SyntaxHighlight code={'(' + argsLabels.join(', ') + ')'}/>
                </span>
            }
          </div>
      ))
    }
  </div>
)
