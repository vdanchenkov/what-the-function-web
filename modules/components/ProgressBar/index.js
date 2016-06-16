import React from 'react'
import styles from './styles.css'

export default ({percent}) => {
  const style = {
    width: percent + '%',
  }
  console.log(percent)
  if (percent == 100) {
    style.visibility = 'hidden'
  }
  // to prevent shrinking back
  if (percent < 20) {
    style.transition = 'none'
  }
  return <div className={styles.component} style={style}/>
}