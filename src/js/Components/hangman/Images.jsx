import React, {Component} from 'react';
import hangman from '../../../images/animals.png';
import hangman0 from '../../../images/hangman-0.png';
import hangman1 from '../../../images/hangman-1.png';
import hangman2 from '../../../images/hangman-2.png';
import hangman3 from '../../../images/hangman-3.png';
import hangman4 from '../../../images/hangman-4.png';
import hangman5 from '../../../images/hangman-5.png';
import hangman6 from '../../../images/hangman-7.png';
import hangman7 from '../../../images/hangman-8.png';
import hangman8 from '../../../images/hangman-9.png';
import '../../../css/Images.css'

class Images extends Component{
    render(){
        let number = this.props.image;
        return (
            <div>
                {
                    number === 10 && <img src={hangman} className="hangman_man" alt="man" />
                }
                {
                    number === 0 && <img src={hangman0} className="hangman_man" alt="man" />
                }
                {
                    number === 1 && <img src={hangman1} className="hangman_man" alt="man" />
                }
                {
                    number === 2 && <img src={hangman2} className="hangman_man" alt="man" />
                }
                {
                    number === 3 && <img src={hangman3} className="hangman_man" alt="man" />
                }
                {
                    number === 4 && <img src={hangman4} className="hangman_man" alt="man" />
                }
                {
                    number === 5 && <img src={hangman5} className="hangman_man" alt="man" />
                }
                {
                    number === 6 && <img src={hangman6} className="hangman_man" alt="man" />
                }
                {
                    number === 7 && <img src={hangman7} className="hangman_man" alt="man" />
                }
                {
                    number === 8 && <img src={hangman8} className="hangman_man" alt="man" />
                }
            </div>
        )
    }
}

export default Images;