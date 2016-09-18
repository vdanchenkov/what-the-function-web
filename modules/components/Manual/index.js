import React from 'react'
import { timeout } from './../../constants'
import { select } from 'glamor'

const Manual = () => (
  <div css={component}>
    <div css={header}>
      What The Function
    </div>
    <div>
      <p>
        This app searches for functions and snippets in selected modules by argument list and expected result.  
      </p>
      <p>
        It tries permutations of the first three arguments so <code>wtf(2, 4).isEqual(2)</code> 
        will match <code>4 - 2</code> and <code>4 / 2</code>. Other arguments are kept as is for performance reasons.
      </p>
      <p> 
        In case single check takes more then { timeout } ms, it will be skipped.
      </p>
      <p>
        Modules are loaded from <a href="https://unpkg.com" target="_blank">unpkg.com</a>. 
        Thanks to it you will be able to add arbitrary modules in the next version.
      </p>
    </div>
  </div>
)

export default Manual

const component = [
  { fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif` },
  select(' p', { margin: '0.75rem 0' }),
  select(' code', {
    fontFamily: `Consolas, "Liberation Mono", Menlo, Courier, monospace`,
    backgroundColor: 'rgba(0,0,0,0.04)', 
    fontSize: '85%',
    paddingTop: '0.2em',
    paddingBottom: '0.2em'
  }),
  select(' code::before', {
    letterSpacing: '-0.2em',
    content: '"\\00a0"'
  }),
  select(' code::after', {
    letterSpacing: '-0.2em',
    content: '"\\00a0"'
  }),
  select(' a', { textDecoration: 'none' })
]

const header = {
  fontWeight: 'bold',
  fontSize: '1.5rem',
  textAlign: 'center'
}
