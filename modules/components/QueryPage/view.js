import React from 'react'
import styles from './styles.css'
import Editor from '../Editor'
import Prism from 'prismjs'
import '!style!css!prismjs/themes/prism.css'

const HL = ({code}) => (
  <span dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages.javascript)}} />
)

export default ({ onArgumentsChange, onResultChange, suggestions = [] }) => {
  return (
      <div className={styles.component}>
        <div>
          wtf({'{ lodash, ramda, Object }'})(
        </div>
        <div className={styles.editor}>
          <Editor wrap={s => `[${s}]`} onChange={onArgumentsChange}/>
        </div>
        <div>
          ).eql(
        </div>
        <div className={styles.editor}>
          <Editor onChange={onResultChange}/>
        </div>
        <div>
          )
        </div>
        <div className={styles.suggestions}>
        {
          suggestions.map(({ library, name, args, argsOrder, argsLabels }) => (
              <div key={library + name + argsOrder}>
                <HL code={library + '.' + name +'(' + argsLabels.join(', ') + ')'}/>
              </div>
          ))
        }
        </div>
      </div>
  )
}
