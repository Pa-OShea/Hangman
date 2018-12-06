import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {withFirebase} from '../../../util/Firebase';
import {withRouter} from 'react-router-dom';
import {GAME} from "../../../util/constants";

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({submitted: true});
        const {email, password} = this.state;
        if (email && password) {
            this.props.firebase
                .doSignInWithEmailAndPassword(email, password)
                .then(() => {
                    this.setState({...INITIAL_STATE});
                    this.props.history.push(GAME);
                })
                .catch(error => {
                    this.setState({error: error.message});
                });
        }
    };


    render() {
        const {email, password, error, submitted, redirect} = this.state;
        return (

            <form name="form" onSubmit={this.handleSubmit}>
                {submitted && error &&
                <div className="help-block">{error}</div>
                }
                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" value={email}
                           onChange={this.handleChange}/>
                    {submitted && !email &&
                    <div className="help-block">Email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.handleChange}/>
                    {submitted && !password &&
                    <div className="help-block">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                {redirect && (
                    <Redirect to={'/game'}/>
                )}
            </form>

        );
    }
}

export default withRouter(withFirebase(SignIn));