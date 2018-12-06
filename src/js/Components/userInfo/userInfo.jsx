import React, {Component} from 'react';
import {LOGIN} from "../../../util/constants";
import {withFirebase} from '../../../util/Firebase';
import {withRouter} from 'react-router-dom';

const INITIAL_STATE = {
    username: '',
    wins: 0,
    error: null,
};

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    componentWillMount() {
        let ref = this.props.firebase.doGetInfo();

        ref.on('value', snapshot => {
            let user = (snapshot.val()) || 'Anonymous';
            this.setState({username: user.username, wins: user.wins})
        });
    }

    handleClick = (e) => {
        e.preventDefault();

        this.props.firebase.doSignOut()
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(LOGIN);
            })
            .catch(error => {
                this.setState({error: error.message});
            });
    };

    render() {
        let {error, username, wins} = this.state;
        if (!this.props.firebase.doIsSignedIn()) {
            return <div>fucked</div>
        } else {
            return (
                <div>
                    {
                        error ?
                            <div className="help-block">{error}</div>

                            :

                            <table className="table">
                                <tbody>
                                <tr>
                                    <td>Username:</td>
                                    <td>{username}</td>
                                </tr>
                                <tr>
                                    <td>Wins:</td>
                                    <td>{wins}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <button onClick={this.handleClick} className="btn btn-primary">Log out</button>
                                    </td>
                                    <td/>
                                </tr>
                                </tbody>
                            </table>

                    }

                </div>

            )
        }

    }
}

export default withRouter(withFirebase(UserInfo));