import React from 'react'
import Title from 'react-title-component'

export default React.createClass({
  render() {
    return (
      <div>
        <Title render="What the Function"/>
        <h1>What the Function</h1>
        {this.props.children}
      </div>
    )
  }
})

