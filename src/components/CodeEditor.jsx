import React, { useState, useRef, useEffect } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import github from "prism-react-renderer/themes/github/index"

const CodeEditor = () => {
  const [code, setCode] = useState(`import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <h1>Hello world</h1>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));`);

const textareaRef = useRef(null)
const highlightRef = useRef(null);

useEffect(() => {
    if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        
        if (highlightRef.current) {
          highlightRef.current.style.height = `${textarea.scrollHeight}px`;
        }
      }
  }, [code]);

const handleCodeChange = (event) => {
    const { value, selectionStart, selectionEnd } = event.target;
    setCode(value);
    
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
      }
    }, 0);
  };

  return (
    <div className="code-editor" style={{position: "relative", textAlign:"left", minHeight: "200px", maxHeight: "600px", overflow: "inherit"}}>
      <Highlight {...defaultProps} theme={github} code={code} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} ref={highlightRef} style={{ ...style, margin: 0, padding: '10px', overflow:"hidden"}}>
            {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i})
                return (
                    <div key={i} {...{...lineProps, key: undefined}}>
                {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token, key})
                    return <span key={key} {...{...tokenProps, key: undefined}} />
                })}
              </div>
                )
            })}
          </pre>
        )}
      </Highlight>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleCodeChange}
        spellCheck="false"
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: '10px',
            border: 'none',
            fontFamily: 'monospace',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            overflow: 'hidden',
            color: 'transparent',
            caretColor: 'black',
            backgroundColor: 'transparent',
            resize: 'none',
            outline: 'none',
          }}
      />
    </div>
  );
};
export default CodeEditor;