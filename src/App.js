import "./App.css";
import Particles from "react-particles-js";
import React, { useState } from "react";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from "./components/rank/Rank";
import ImageRecognition from "./components/imageRecognition/ImageRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";

const initialUser = {
  id: "",
  name: "",
  email: "",
  carCounter: 0,
  joined: "",
};

export default function App() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUser);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      carCounter: data.carCounter,
      joined: data.joined,
    });
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const calculateCarLocation = (data) => {
    const clarifaiCar =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiCar.left_col * width,
      topRow: clarifaiCar.top_row * height,
      rightCol: width - clarifaiCar.right_col * width,
      bottomRow: height - clarifaiCar.bottom_row * height,
    };
  };

  const displayCarBox = (box) => {
    setBox(box);
  };

  const onPictureSubmit = () => {
    if (input) {
      setImgUrl(input);
      fetch("https://protected-taiga-19734.herokuapp.com/imageurl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: imgUrl }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            fetch("https://protected-taiga-19734.herokuapp.com/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: user.id }),
            })
              .then((response) => response.json())
              .then((count) => {
                setUser({ ...user, carCounter: count });
              })
              .catch((error) => {
                console.log(error);
              });
          }
          displayCarBox(calculateCarLocation(response));
        })
        .catch((err) => console.log(err));
    }
  };

  const onRouteChange = (route) => {
    if (route === "home") {
      setIsSignedIn(true);
    } else if (route === "signin") {
      setInput("");
      setImgUrl("");
      setBox({});
      setIsSignedIn(false);
      setUser(initialUser);
    }
    setRoute(route);
  };

  return (
    <>
      <div className="App">
        <Particles className="particles" />
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
        {route === "home" ? (
          <>
            {" "}
            <Logo />
            <Rank userName={user.name} carCounter={user.carCounter} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onPictureSubmit}
            />
            <ImageRecognition imgUrl={imgUrl} box={box} />
          </>
        ) : route === "signin" ? (
          <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
        ) : (
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )}
      </div>
    </>
  );
}
