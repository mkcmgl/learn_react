import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
export default function NewsEditor(props) {
    const [editorState, setEditorState]=useState("")
  return (
      <div style={{height:"150px"}}>
          <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={(editorState) => setEditorState(editorState)}
              onBlur={() => {
                  // console.log()

                  props.getContent
                      (draftToHtml(convertToRaw(editorState.getCurrentContent())))
              }}
          ></Editor>
    </div>
  )
}
