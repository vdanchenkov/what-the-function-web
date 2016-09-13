import React from 'react'
import { timeout } from './../../constants'
import { select } from 'glamor'

export default () => (
  <div css={component}>
    <div css={header}>
      What The Function
    </div>
    <div>
      <p>
        This app aids in search for library functions by arguments and expected result.  
      </p>
      <p>
        Search is done by brute force. It tries all combinations of functions and arguments
        and shows matches. First 3 arguments will be permuted. So search 
        for <code>wtf(2, 4) == 2</code> will match <code>4 - 2</code>. Other arguments are
        kept as is for performance reasons. In case single test takes more then {
        timeout } ms, it will be skipped.
      </p>
      <p>
        Modules are loaded via <a href="https://unpkg.com" target="_blank">unpkg.com</a>. 
        Thanks to this project your can add any npm module to the search.
      </p>
    </div>
  </div>
)

const component = [
  { fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif` },
  select(' p', { margin: '1rem 0' }),
  select(' code', { fontStyle: 'italic', fontSize: 'larger' }),
  select(' a', { textDecoration: 'none' })
]

const header = {
  fontWeight: 'bold',
  fontSize: '1.2rem',
  marginBottom: '0.2rem',
  textAlign: 'center'
}