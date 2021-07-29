import React, { Component } from 'react';
import produce from 'immer';

import './Cell.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  // update states and force rerender when receive props from parent 
  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  handleChange = e => {
    let value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    const { row, col } = this.state;
    if (isNaN(value) || value % 10 === 0) {
      value = '';
    } else if (value <= 0 || value > 9 ) {
      value = Math.abs(value) % 10;
    }
    // pass value to grid in Sudoku
    this.props.onChange(row, col, value);
  };

  render() {
    const { row, col, num, wrongNum, readOnly} = this.state;

    const visitStatusClass =  !readOnly && num ? 'userInputNum' :  '';
    const largeRowMargin = row % 3 === 2 ? 'largeRowMargin' : '';
    const largeColMargin = col % 3 === 2 ? 'largeColMargin' : '';

    const wrongNumClass = wrongNum ? 'cell-wrongNum' : '';

    return (
      <div
        id={`cell-${row}-${col}`}
        className={`cell ${largeRowMargin} ${largeColMargin} `}
      >
        <input
          row={row}
          col={col}
          className={`field ${visitStatusClass} ${wrongNumClass} `}
          value={num}
          onChange={this.handleChange}
          readOnly={readOnly}
        />
      </div>
    );
  }
}
