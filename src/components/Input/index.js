import React, { Component } from 'react';

import Engine from 'src/engine';

import store from 'src/store';
import script from 'src/script';

import s from './style.css';

const engine = new Engine(script, store);

class Input extends Component {
  state = { value: '' };

  componentDidMount() {
    engine.start();
  }

  onChange = (event) => {
    const value = event.target.value;

    this.setState({ value });
  }

  onCommand = (event) => {
    event.preventDefault();
    const command = this.state.value;
    this.setState({ value: '' });

    engine.action(command);
  }

  render() {
    return (
      <form onSubmit={this.onCommand}>
        <input className={s.input} onChange={this.onChange} value={this.state.value} placeholder="Your command here" />
      </form>
    );
  }
}

export default Input;
