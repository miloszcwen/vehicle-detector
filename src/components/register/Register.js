import React from 'react';
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event)=>{
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event)=>{
        this.setState({signInPassword: event.target.value})
    }
    onSubmitSignIn = ()=>{
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response=>response.json())
        .then(data=>{
            if (data === 'success'){
                this.props.onRouteChange("home");
            }
        })
    }
    render() {
        const {onRouteChange}= this.props;
    return (
        <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
            <main className="pa4 ">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Register</legend>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="br2 b pa2 input-reset bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                </div>
                </fieldset>
                <div className="">
                <input
                onClick={ () => onRouteChange("home") }
                className="br2 b ph3 pv2 input-reset bg-transparent grow pointer f6 dib submit"
                type="submit" value="Register"/>
                </div>
                <div className="lh-copy mt3">
                <p onClick={ () => onRouteChange("signin")} className="f6 links dim db pointer">Sign in</p>
                </div>
            </div>
            </main>
        </article>
    )
    }
}

export default Register;