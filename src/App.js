import React, { Component } from 'react';
import './App.css';
import Text from './components/text'

class App extends Component {

  state = {
    texts: [
      { id: 1, value: 'boom', count: 4 },
      { id: 2, value: 'dog', count: 3 },
      { id: 3, value: 'hellfire', count: 8 }
    ],
    inputValue: 'Another',
    highestId: 3
  }

  removeHandler(id) {
    const textIndex = this.state.texts.findIndex(text => {
      return text.id === id;
    })
    const texts = [...this.state.texts];
    texts.splice(textIndex, 1);
    this.setState({ texts: texts });
  }

  addHandler() {
    let text = {
      id: this.state.highestId + 1,
      value: this.state.inputValue,
      count: this.state.inputValue.length
    }
    let texts = [...this.state.texts, text];
    this.setState({
      texts: texts,
      highestId: this.state.highestId + 1,
      inputValue: ''
    })
    document.querySelector('input').value = '';
  }

  changeInputValue(input) {
    this.setState({ inputValue: input.target.value });
  }

  render() {

    let texts = (
      <div>
        {
          this.state.texts.map(text => {
            return <Text
              key={text.id}
              id={text.id}
              value={text.value}
              count={text.count}
              click={() => this.removeHandler(text.id)}
            />
          })
        }
      </div>
    )

    return (
      <div >
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <br />
        <div className="App">
          {texts}
          <input
            type="text"
            value={this.inputValue}
            onChange={(event) => this.changeInputValue(event)} />
          <button onClick={() => this.addHandler()}>Add</button>
        </div>
      </div>
    );
  }
}

export default App;
