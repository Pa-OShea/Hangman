import React, {Component} from 'react';
import {doesInclude} from '../../../util/functions'
import '../../../css/Keyboard.css'

const ROW_ONE = 'abcdefghi'.split('');
const ROW_TWO = 'jklmnopq'.split('');
const ROW_THREE = 'rstuvwxyz'.split('');

class Keyboard extends Component {
    handleClick(letter) {
        if (this.props.enabled) {
            this.props.onPress(letter);
        }
    }

    getButton = (letter) =>{
        let disabled = doesInclude(this.props.disabledLetters, letter);
        let className = disabled ? '_disabled' : '';
        return (
            <button
                key={letter}
                className={'keyboard_button' + className}
                onClick={this.handleClick.bind(this, letter)}
                disabled={disabled}>
                {letter}
            </button>
        );
    };

    getRow = (row) =>{
        return (
            <div className='button-row' key={row.join('')}>
                {row.map(this.getButton)}
            </div>
        );
    };

    render() {
        return (
            <div className='hangman-keyboard'>
                {[ROW_ONE, ROW_TWO, ROW_THREE].map(this.getRow)}
            </div>
        );
    }
}

export default Keyboard;