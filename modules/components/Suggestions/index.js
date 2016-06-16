import React from 'react'
import styles from './styles.css'
import SyntaxHighlight from './../SyntaxHighlight'

export default ({suggestions, loading}) => (
  <div className={styles.component}>
    {
      suggestions.map(({ library, name, args, argsLabels }) => (
          <div key={library + name + argsLabels}>
            <SyntaxHighlight code={library + '.' + name +'(' + argsLabels.join(', ') + ')'}/>
          </div>
      ))
    }
  </div>
)