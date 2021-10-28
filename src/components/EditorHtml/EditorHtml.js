import React, { useState, useEffect } from 'react';
import AceEditor from "react-ace";
import Handlebars from 'handlebars';
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/snippets/handlebars"
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ace"
import "ace-builds/src-noconflict/snippets/html";
import 'ace-builds/webpack-resolver' 

var ace = require('brace');
const langTools = ace.require('ace/ext/language_tools');

const EditorHtml = ({ dataObj, onGetDataToRender, data }) => {
    console.log('aja')
    const objKeys = Object.keys(dataObj);
    const [valores, setValores] = useState('');
    var template;

    useEffect(() => {
        if(data){
            setValores(data)
        }
    }, [data])

    const onChange = (newValue, e) => {
        template = Handlebars.compile(newValue);
        setValores(newValue);
    }

    const onLoad = (e) => {
        var customCompleter = {
            getCompletions: function(editor, session, pos, prefix, callback) {
                const result = objKeys.map(keys => {
                    return {
                        name: keys,
                        value: keys,
                        meta: keys,
                        score: dataObj[keys]
                    }
                })
                callback(null, result)
            }
        }
        langTools.addCompleter(customCompleter)
    }

    const onBlur = (event, editor) => {
        const data = editor.getValue();
        template = Handlebars.compile(data)
        const valueRender = template(dataObj);
        onGetDataToRender(valueRender, data)
    }

    return (
        <AceEditor
            placeholder="HTML handlebars"
            mode="handlebars"
            theme="monokai"
            name="editor"
            onBlur={onBlur}
            onChange={onChange}
            onLoad={onLoad}
            fontSize={14}
            style={{
                height: "300px"
            }}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={valores}
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

export default EditorHtml;
