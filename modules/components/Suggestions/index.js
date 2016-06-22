import React from 'react'
import styles from './styles.css'
import SyntaxHighlight from './../SyntaxHighlight'
import DocLink from './DocLink'

export default ({ suggestions, loading }) => (
  <div className={styles.component}>
    {
      suggestions.map(({ library, name, argsLabels, display }) => (
          <div key={library + name + argsLabels + display}>
            { display ?
                <span>
                  { display.replace(/(\$)(\d+)/g, (_, __, i) => argsLabels[i - 1]) }
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
