import React from 'react';
import './Register.css'

const Register=({onRouteChange})=>{
    return (
        <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
            <main className="pa4 ">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Register</legend>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" for="name">Name</label>
                    <input className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                    <input className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" for="password">Password</label>
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
            </form>
            </main>
        </article>
    )
}

export default Register;