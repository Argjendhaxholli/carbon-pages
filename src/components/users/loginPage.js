import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { loginUserAction } from '../../actions/authenticationActions';


class LoginPage extends Component {
    onHandleLogin = (event) => {
        event.preventDefault();
        
        let email = event.target.email.value;
        let password = event.target.password.value;

        const data = {
            email, password
        
        }
        
        this.props.dispatch(loginUserAction(data));
    }


    render() {
        let isSuccess, message;
        
        if(this.props.response.login.hasOwnProperty('response')) {
            isSuccess = this.props.response.login.response.user.id;
            message = this.props.response.login.response.message;
            
            if(isSuccess){
                localStorage.removeItem('token');
                localStorage.setItem('token', this.props.response.login.response.access_token);
            }
        }

        return (
            <div>
                {!isSuccess ? <div>{message}</div> : browserHistory.push('dashboard')}
                <div class="container d-flex justify-content-center">
                    <div class="w-25 mt-lg-5">
                            <form class="form-signin" onSubmit={this.onHandleLogin}>
                                <img class="mb-4" src="../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                                <label for="inputEmail" class="sr-only">Email address</label>
                                <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                                <label for="inputPassword" class="sr-only">Password</label>
                                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required />
                                <div class="checkbox mb-3">
                                    <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                    </label>
                                </div>
                                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                                <p class="mt-5 mb-3 text-muted">2020-2021</p>
                            </form>
                            &copy; Copyright to <Link to='register'>Zero Karbon</Link>
                    </div>
                </div>    
          </div>
        );
    }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginPage);