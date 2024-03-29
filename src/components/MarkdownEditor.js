import React from 'react';
import { marked } from 'marked';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: ''
        };
    }
    //Asycn method to fetch initial markdown text
    componentDidMount() {
        fetch('https://raw.githubusercontent.com/ericksonl/js-libraries/dev/src/components/MarkdownText.md')
            .then(response => response.text())
            .then(text => {
                this.setState({
                    markdown: text
                });
                console.log("what", text);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    handleEditorChange = (event) => {

        this.setState({
            markdown: event.target.value
        });
    }

    render() {
        const renderedMarkdown = marked(this.state.markdown, { sanitize: true });
        return (
            <>
                <div id='editor-wrapper'>
                    <h1 id='editor-title'>Markdown</h1>
                    <textarea id="editor" rows="4" cols="50" value={this.state.markdown} onChange={this.handleEditorChange}>
                    </textarea>
                </div>
                <div id='preview-wrapper'>
                    <h1 id='preview-title'>Preview</h1>
                    <div id="preview" dangerouslySetInnerHTML={{ __html: renderedMarkdown }}></div>
                </div>
            </>
        )
    }
}

export default Editor;