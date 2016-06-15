import React from 'react'
import styles from './styles.css'
import SyntaxHighlight from './../SyntaxHighlight'
import '!style!css!react-spinner/react-spinner.css'
import Spinner from 'react-spinner'

export const HL = ({code}) => (
  <span dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages.javascript)}} />
)

export default ({suggestions, loading}) => (
  <div className={styles.component}>
    { loading ? <Spinner/> : null }
    {
      suggestions.map(({ library, name, args, argsLabels }) => (
          <div key={library + name + argsLabels}>
            <SyntaxHighlight code={library + '.' + name +'(' + argsLabels.join(', ') + ')'}/>
          </div>
      ))
    }
  </div>
)