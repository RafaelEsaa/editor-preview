import React, { useState, useEffect } from 'react';
import AceEditor from "react-ace";

const EditorCss = ({ onGetCssValue, data }) => {
    const [css, setCss] = useState('')

    useEffect(() => {
        if(data){
            setCss(data)
        }
    }, [data])

    const onChangeCss = (newValue) => {
        setCss(newValue);
    }

    const onBlur = (event, editor) => {
        const dataCss = editor.getValue();
        onGetCssValue(dataCss)
    }

    return (
        <AceEditor
            placeholder="CSS"
            mode="css"
            theme="monokai"
            name="editorCss"
            value={css}
            onChange={onChangeCss}
            onBlur={onBlur}
            fontSize={14}
            style={{
                height: "300px"
            }}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
            editorProps={{$blockScrolling: true}}
        />
    );
}
 
export default EditorCss;