import React, { PropTypes } from 'react'
import { Editor as DraftEditor, EditorState } from 'draft-js'
import transform from './../../transform'
import styles from './styles.css'
import classnames from 'classnames'

export default class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }
    this.onCodeChange = (editorState) => {
      this.setState({ editorState })
      let isError
      try {
        let text = editorState.getCurrentContent().getPlainText()
        if (this.props.wrap) {
          text = this.props.wrap(text)
        }
        const code = transform(text).code
        this.props.onChange({ text, code })
        isError = false
      } catch (e) {
        isError = true
      }
      this.setState({ editorState, isError })
    }
  }
  render() {
    const { editorState } = this.state
    return (
      <div className={classnames(styles.component, { [styles.error]: this.state.isError })}>
        <DraftEditor
          editorState={editorState}
          onChange={this.onCodeChange}
          placeholder="..." />
      </div>
    )
  }
}

Editor.propTypes = {
  onChange: PropTypes.func,
  wrap: PropTypes.func
}
