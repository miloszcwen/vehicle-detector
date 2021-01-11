import './App.css';
import Particles from 'react-particles-js';
import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageRecognition from './components/imageRecognition/ImageRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';



const initialState = {
  input: "",
  imgUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    carCounter: 0,
    joined: ""
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: "",
      imgUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        carCounter: 0,
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      carCounter: data.carCounter,
      joined: data.joined
    }});
  }

  calculateCarLocation = (data) => {
    const clarifaiCar = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiCar.left_col * width,
      topRow: clarifaiCar.top_row * height,
      rightCol: width - (clarifaiCar.right_col * width),
      bottomRow: height - (clarifaiCar.bottom_row * height)
    }
  }

  displayCarBox = (box)=>{
    this.setState({box: box});
  }

  onInputChange = (e)=>{
    this.setState({input: e.target.value});
  }

    onPictureSubmit = ()=>{
      if(this.state.input){
        this.setState({imgUrl: this.state.input});
        fetch('https://protected-taiga-19734.herokuapp.com/imageurl', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                 input: this.state.input
              })
           })
           .then(response=>response.json())
        .then(response=>{
          if (response){
            fetch('https://protected-taiga-19734.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                 id: this.state.user.id
              })
           })
           .then(response=>response.json())
           .then(count=>{
              this.setState(Object.assign(this.state.user,{carCounter: count}))
          })
          .catch(error=>{console.log(error)});
          }
          this.displayCarBox(this.calculateCarLocation(response))
        })
        .catch(err=>console.log(err))
      }
  }

  onRouteChange = (route)=>{
    if(route==="home"){
      this.setState({isSignedIn: true});
    } else if(route==="signin"){
      this.setState(initialState);
    }
    this.setState({route: route})
  }

  render() {
    const {imgUrl, isSignedIn, box, route} = this.state;
    return (
      <>
    <div className="App">
      <Particles className="particles" />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
      { route === "home"
      ? <> <Logo />
      <Rank
        userName={this.state.user.name}
        carCounter={this.state.user.carCounter}
      />
      <ImageLinkForm
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onPictureSubmit}
      />
      <ImageRecognition
        imgUrl={imgUrl}
        box={box}
      />
      </>
      : (route === "signin"
      ? <SignIn
        loadUser={this.loadUser}
        onRouteChange={this.onRouteChange}
        />
      : <Register
        loadUser={this.loadUser}
        onRouteChange={this.onRouteChange}
        />
      )}
    </div>
    </>
    )
  }
}

export default App;

// test images:
// mix:
// https://images.freeimages.com/images/large-previews/389/girl-3-1438550.jpg
// https://media.istockphoto.com/photos/smiling-executive-using-smart-phone-on-city-street-picture-id924802018
// https://images.freeimages.com/images/large-previews/2af/couple-love-1240191.jpg
// https://images.freeimages.com/images/large-previews/3c6/race-across-america-3-1310174.jpg

// cars:
// https://images.unsplash.com/photo-1495837139561-4a6359962783?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80
// https://images.unsplash.com/photo-1563522288861-ed8f8bbe9279?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80
// https://images.unsplash.com/photo-1502489597346-dad15683d4c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=667&q=80

// clarafai models:
// d02b4508df58432fbb84e800597b8959 --face
// aa7f35c01e0642fda5cf400f543e7c40 - general
// f950c58836faebadfdd44d709fb7cef6 - vehicle

    // app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
    //   .then(generalModel => {
    //     return generalModel.predict(url);
    //   })
    //   .then(response => {
    //     var concepts = response['outputs'][0]['data']['concepts']
    //     console.log(concepts)
    //   })