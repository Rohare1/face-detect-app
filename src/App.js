import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
	apiKey: '2ed676e6f0174028bf48b1c7d9f7a71d'
});

const particleOptions = {
	particles: {
		number: {
			value: 80,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: ''
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onInputChange(event) {
		this.setState({input: event.target.value});
	}
	onSubmit() {
		this.setState({imageUrl: this.state.input})
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
			function(response) {
				console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
			},
			function(err) {
				console.log(err)
			}
		);
	}
	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particleOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
				<FaceRecognition imageUrl={this.state.imageUrl }/>
			</div>
		);
	}
}

export default App;
