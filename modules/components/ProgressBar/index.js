import React from 'react'
import { style, merge } from 'glamor'

export default ({ percent }) => {
  const component = style({
    position: 'fixed',
    top: 0,
    left: 0,
    height: 2,
    background: '#29D',
    boxShadow: '0 0 10px #29D, 0 0 5px #29D',
    transition: percent >= 20 && 'all 200ms ease',
    visibility: percent === 100 && 'hidden'
  })

  return <div {...component} style={{ width: percent + '%' }}/>
}
