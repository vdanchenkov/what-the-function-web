import React from 'react'
import styles from './styles.css'
import Prism from 'prismjs'
import '!style!css!prismjs/themes/prism.css'

export const HL = ({code}) => (
  <span dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages.javascript)}} />
)

export default ({suggestions}) => (
  <div className={styles.component}>
    {
      suggestions.map(({ library, name, args, argsOrder, argsLabels }) => (
          <div key={library + name + argsOrder}>
            <HL code={library + '.' + name +'(' + argsLabels.join(', ') + ')'}/>
          </div>
      ))
    }
  </div>
)