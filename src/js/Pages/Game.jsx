import React, {Component} from 'react';
import HangmanGame from '../Components/hangman/HangmanGame';
import UserInfo from '../Components/userInfo/userInfo';
import '../../css/Game.css'

class Game extends Component {
    render() {
        return (
            <div className={'wrapper'}>
                <div className={'game_section'}>
                    <HangmanGame/>
                </div>
                <div className={'user_info'}>
                    <UserInfo/>
                </div>
            </div>
        )
    }
}

export default Game;