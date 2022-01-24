import React, { Component } from 'react';
import { socket } from '../App';

export default class GameLogic extends Component {
  render() {
    return(
        <div>
            <Question/>
        </div>
    )
  }
}


function Question() {
  return(
        <div>
            Word
        </div>
    )
}

