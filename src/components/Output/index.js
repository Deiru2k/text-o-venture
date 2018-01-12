import React, { Component } from 'react';
import { connect } from 'react-redux';

import s from './style.css';

class Output extends Component {
  render() {
    const { text = [] } = this.props;

    return (
      <div className={s.window}>
        {text.map((line, index) => <p key={index}>{line}</p>)}
      </div>
    );
  }
}

const mapState = ({ text }) => ({ text });

export default connect(mapState)(Output);
