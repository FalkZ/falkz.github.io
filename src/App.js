import React, { Component } from 'react'
//import Markdown from 'react-remarkable'
import Provider from './falk/Provider'

//import Mapper from './Mapper'
import falk from './falk'

//styles
import './App.styl'

const Page = () =>
	falk
		.init('Page')
		.fetch('https://raw.githubusercontent.com/FalkZ/gmar/master/content/page.md')
		.chop('##', { extract: true })
		.construct({ content: 'extract', className: 'extract' }, {})
		.tag('p')
		.prepare('span')
		.logger()

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		//console.log(falk.construct({ src: { content: 'test1', href: 'url' } }, ['src.content', 'src.href']))

		return (
			<div className="App">
				<div className="title">
					<h1>falkAPI</h1>
					<p>open Console</p>
				</div>
				<Provider name={[Page]}>
					<Page />
				</Provider>
			</div>
		)
	}
}

export default App
