import React from 'react'
import '!style!css!prismjs/themes/prism.css'
import Prism from 'prismjs'

export default ({code}) => (
  <span dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages.javascript)}} />
)