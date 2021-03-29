import React, { useState } from "react";
import { useHistory } from "react-router";

import "./SignIn.css";

export default function SignIn({ loadUser, setIsSignedIn }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const history = useHistory();

  const onSubmitSignIn = () => {
    fetch("https://protected-taiga-19734.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          setIsSignedIn(true);
          history.push("/");
        }
      });
  };
  return (
    <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
      <main className="pa4 ">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="br2 b pa2 input-reset bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="br2 b ph3 pv2 input-reset bg-transparent grow pointer f6 dib submit"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => history.push("/register")}
              className="f6 links dim db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}
