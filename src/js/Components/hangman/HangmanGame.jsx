import React, {Component} from 'react';
import Images from './Images';
import randomwords from "../../../util/words/randomwords";
import movies from '../../../util/words/movies';
import people from '../../../util/words/people';
import Letters from "./Letters";
import Keyboard from "./Keyboard";
import _ from 'underscore';
import {doesInclude, getWord} from '../../../util/functions'
import {withFirebase} from '../../../util/Firebase';

class HangmanGame extends Component {
    componentWillMount() {
        this.newGame();
    }

    newGame = () => {
        let cat = Math.floor(Math.random() * (4 - 1) + 1);
        // console.log(cat);
        let category = '';
        let word = '';
        if (cat === 1) {
            category = 'Random words';
            word = getWord(randomwords).toLocaleLowerCase();
        } else if (cat === 2) {
            category = 'Celebrities';
            word = getWord(people).toLocaleLowerCase();
        } else if (cat === 3) {
            category = 'Movies';
            word = getWord(movies).toLocaleLowerCase();
        }
        // let word = getWord(words);
        let strikes = 0;
        let guesses = [];
        let over = false;
        let won = false;
        this.setState({category, word, strikes, guesses, over, won});
        // console.log(word);
    };

    hasWon = () => {
        let {word, guesses} = this.state;
        return !_.chain(word.split(''))
            .map(letter => doesInclude(guesses, letter))
            .contains(false)
            .value();
    };

    checkLetter = (letter) => {
        let {word, strikes, guesses, over, won} = this.state;

        if (!doesInclude(word, letter)) {
            strikes++;
        }

        if (doesInclude(word, ' ')) {
            guesses.push(' ');
        }

        guesses.push(letter);

        won = this.hasWon();

        if (strikes >= 8 && !won) {
            strikes = 8;
            over = true;
        } else if (won) {
            this.props.firebase.doWinsUpdate(1);
            strikes = 10;
            over = true;
        }

        this.setState({strikes, guesses, over, won});
    };

    getTitle = () => {
        if (this.state.won) {
            return 'YOU WON!';
        } else if (this.state.over) {
            return 'Game Over';
        } else {
            return 'Hang Man';
        }
    };

    newGameClass = () => {
        let playing = (!this.state.over && !this.state.won);
        return playing ? 'new-game' : 'new-game shown';
    };

    render() {

        let {category, strikes, won, guesses, over, word} = this.state;

        return (
            <div>

                <h1>{this.getTitle()}</h1>
                <div className={'category'}>
                    <p>The category is {category}</p>
                </div>
                <Images image={strikes}/>

                <Letters
                    word={word}
                    reveal={over}
                    guesses={guesses}/>

                <Keyboard
                    onPress={this.checkLetter}
                    enabled={!over && !won}
                    disabledLetters={guesses}/>

                <button
                    className={this.newGameClass()}
                    disabled={!over && !won}
                    onClick={this.newGame}>
                    New Game
                </button>
            </div>
        )
    }
}

export default withFirebase(HangmanGame);