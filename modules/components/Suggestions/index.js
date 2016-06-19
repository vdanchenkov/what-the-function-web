import React from 'react'
import styles from './styles.css'
import SyntaxHighlight from './../SyntaxHighlight'
import DocLink from './DocLink'

export default ({suggestions, loading}) => (
  <div className={styles.component}>
    {
      suggestions.map(({ library, name, args, argsLabels }) => (
          <div key={library + name + argsLabels}>
            {library}
            <span className="token punctuation">.</span>
            <span className="token function"><DocLink module={library} func={name}>{name}</DocLink></span>
            <SyntaxHighlight code={'(' + argsLabels.join(', ') + ')'}/>
          </div>
      ))
    }
  </div>
)