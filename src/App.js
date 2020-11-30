import './App.css';
import Particles from 'react-particles-js';
import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';



class App extends Component {
  render() {
    return (
    <div className="App">
      <Particles className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
       {/*
      <FaceRecognition /> */}
    </div>
    )
  }
}

export default App;
