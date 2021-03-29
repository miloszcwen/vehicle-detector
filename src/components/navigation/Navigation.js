import React from "react";
import { useHistory } from "react-router";

const Navigation = ({ isSignedIn, logOut }) => {
  const history = useHistory();

  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={logOut} className="f3 link dim underline pa3 pointer">
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => history.push("/signin")}
          className="f3 link dim underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => history.push("/register")}
          className="f3 link dim underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
