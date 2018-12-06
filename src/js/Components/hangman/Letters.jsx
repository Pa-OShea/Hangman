import React, {Component} from 'react';
import {doesInclude} from "../../../util/functions";
import '../../../css/Letters.css'

class Letters extends Component{

    getSlot = (letter, index) =>{
        let {guesses, reveal} = this.props;
        let classNames = ['letter-slot'];
        let contents = doesInclude(guesses, letter) ? letter : ' ';
        // console.log(letter);
        if (contents === ' ' && reveal) {
            classNames.push('revealed');
            contents = letter;
        }

        if(letter === ' '){
            return (
                <div key={index}/>
            )
        }else {
            return (
                <div
                    key={index}
                    className={classNames.join(' ')}>
                    {contents}
                </div>
            );
        }

    };

    getSlots = () => {
        let letters = this.props.word.split('');
        return letters.map(this.getSlot);
    };

    render(){
        return (
            <div className='letter-slots'>
                {this.getSlots()}
            </div>
        );
    }
}

export default Letters;