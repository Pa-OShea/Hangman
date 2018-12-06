import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {GAME} from "../../../util/constants";
import {withFirebase} from "../../../util/Firebase";

const INITIAL_STATE = {
    user: {
        email: '',
        password: '',
        username: '',
        wins: 0
    },
    submitted: false,
    error: ''
};

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    handleSubmit = (event) =>{
        event.preventDefault();

        const {user} = this.state;
        this.setState({submitted: true});
        if (user.email && user.username && user.password) {
            let username = user.username;
            let wins = 0;

            this.props.firebase.doCreateUserWithEmailAndPassword(user.email, user.password)
                .then(authUser => {
                    return this.props.firebase.user(authUser.user.uid).set({
                        username,
                        wins
                    })
                })
                .then(() => {
                    this.setState({ ...INITIAL_STATE });
                    this.props.history.push(GAME);
                })
                .catch(error => {
                    this.setState({ error: error.message });
                });
        }
    };

    render() {
        const {user, submitted, error} = this.state;
        return (

            <form name="form" onSubmit={this.handleSubmit}>
                {submitted && error &&
                <div className="help-block">{error}</div>
                }
                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" value={user.email}
                           onChange={this.handleChange}/>
                    {submitted && !user.email &&
                    <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={user.username}
                           onChange={this.handleChange}/>
                    {submitted && !user.username &&
                    <div className="help-block">Username is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password}
                           onChange={this.handleChange}/>
                    {submitted && !user.password &&
                    <div className="help-block">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
        );
    }
}

export default withRouter(withFirebase(SignUp));