import React, { useState } from "react";
import "./Register.css";

export default function Register({ loadUser, onRouteChange }) {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const onRegister = () => {
    fetch("https://protected-taiga-19734.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  return (
    <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
      <main className="pa4 ">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="br2 pa2 input-reset bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                value={registerName}
                onChange={(e) => setRegisterEmail(e.target.value)}
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
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onRegister}
              className="br2 b ph3 pv2 input-reset bg-transparent grow pointer f6 dib submit"
              type="submit"
              value="Register"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("signin")}
              className="f6 links dim db pointer"
            >
              Sign in
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}
