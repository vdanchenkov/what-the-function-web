import React from 'react'
import '!style!raw!prismjs/themes/prism.css'
import { select } from 'glamor'
import Prism from 'prismjs'
import docLinks from './docLinks'

export default ({ code }) => (
  <span css={css} dangerouslySetInnerHTML={{ __html: docLinks(Prism.highlight(code, Prism.languages.javascript)) }} />
)

const css = [
  select(' a', {
    color: 'inherit',
    textDecoration: 'inherit'
  }),
  select(' a:hover', {
    textDecoration: 'underline',
    fontWeight: 'bold',
    cursor: 'pointer'
  })
]
