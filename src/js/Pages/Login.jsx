import React, {Component} from "react";
import SignUp from "../Components/login/SignUp";
import SignIn from "../Components/login/SignIn";
import "../../css/Login.css";

class Login extends Component {
    state = {
        view: true
    };

    handleChangeView = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            view: !prevState.view
        }));
    };

    render() {
        let view = this.state.view;
        let title = view ? 'Login' : 'Register';
        let button = view ? 'Register' : 'Cancel';
        return (
            <div className={'login_section'}>
                <div>
                    <button onClick={this.handleChangeView} className="btn btn-link register-btn">{button}</button>
                    <h2>{title}</h2>
                    {
                        view ?
                            <SignIn view={view}/>

                            :

                            <SignUp view={view}/>
                    }
                </div>
            </div>
        );
    }
}

export default Login;