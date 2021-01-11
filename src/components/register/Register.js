import React from 'react';
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }
    onNameChange = (event)=>{
        this.setState({registerName: event.target.value})
    }
    onEmailChange = (event)=>{
        this.setState({registerEmail: event.target.value})
    }
    onPasswordChange = (event)=>{
        this.setState({registerPassword: event.target.value})
    }
    onRegister = ()=>{
        fetch('https://protected-taiga-19734.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(response=>response.json())
        .then(user=>{
            if (user.id){
                this.props.loadUser(user);
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
                    <input className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100"
                    type="text" name="name"  id="name"
                    onChange={this.onNameChange}
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100"
                    type="email" name="email-address"  id="email-address"
                    onChange={this.onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="br2 b pa2 input-reset bg-transparent hover-bg-black hover-white w-100"
                    type="password" name="password"  id="password"
                    onChange={this.onPasswordChange}
                    />
                </div>
                </fieldset>
                <div className="">
                <input
                onClick={ this.onRegister }
                className="br2 b ph3 pv2 input-reset bg-transparent grow pointer f6 dib submit"
                type="submit" value="Register"/>
                </div>
                <div className="lh-copy mt3">
                <p onClick={ () => onRouteChange("signin")}
                className="f6 links dim db pointer">Sign in</p>
                </div>
            </div>
            </main>
        </article>
    )
    }
}

export default Register;