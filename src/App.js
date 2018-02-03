import React, { Component } from 'react'
import Markdown from 'react-remarkable'
import $ from 'jquery'

// Material Design Styles
import 'material-design-lite/material.min.css'
import 'material-design-lite/material.min.js'

//import Provider from './falk/Provider'

//import Mapper from './Mapper'
import Falk, { Provider, Layout, Button, Icon } from './falk'

//styles

import './falk/styl/style.styl'

// auto reload

import './logo/style.css'

import title from './title.jpg'

const Sections = ({ content }) =>
	content.map((section, index) => (
		<section key={index} id={section.href}>
			<Markdown
				options={{
					html: true
				}}
			>
				{section.content}
			</Markdown>
			{section.after}
		</section>
	))

const Navigation = ({ content }) =>
	content.map((section, index) => (
		<Button className={'Nav'} key={index} href={'#' + section.href}>
			{section.name}
		</Button>
	))

/*Falk.init("Navigation")
    .fetch(
      "https://raw.githubusercontent.com/FalkZ/gmar-2/master/content/page.md"
    )
    .chop("##", { extract: true, noZero: true })
    .construct({ content: "this.extract", className: "this.extract" }, {})
    .tag("nav")
    .prepare("span");

const Two = () =>
  Falk.init("Two")
    .get(Falk.Navigation, 0)
    .markdown()
    .prepare("span");

const SocialMedia = () =>
  Falk.init("SocialMedia")
    .add(["facebook", "instagram", "youtube"])
    .construct({ name: "this" }, {})
    .tag(Icon)
    .construct(
      {
        content: "this",
        return: "props.children.props.name",
        onClick: bla => console.log(bla)
      },
      {}
    )
    .tag(Button)
    .prepare("span");
*/
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sections: [
				{
					name: '',
					content: '',
					after: (
						<div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate" />
					)
				}
			]
		}
	}
	componentWillMount() {
		$(document).on('click', 'a', function(event) {
			//event.preventDefault();
			try {
				$('html, body').animate(
					{
						scrollTop: $($.attr(this, 'href')).offset().top
					},
					500
				)
			} catch (e) {
				console.log(e)
			}
		})
		fetch('https://raw.githubusercontent.com/FalkZ/falkz.github.io/master/content/deutsch.md')
			.then(response => response.text())
			.then(text => {
				let temp = text.split('\n## ')
				let sections = []
				temp.map((section, index) => {
					if (index !== 0) {
						const name = section.split('\n')[0]
						sections[index - 1] = {
							name,
							href: name.split('/').join('-'),
							content: '\n## ' + section
						}
					}
					//console.log(sections);
					this.setState({ sections })
				})
			})
	}

	render() {
		return (
			<div className="App">
				<header>
					<i className="gmar-Joker" id="logo" />
					<a href="#home">
						<h1>GIVE ME A REASON</h1>
					</a>
					<Layout right>
						<Button href="https://www.facebook.com/GiveMeAReasonOfficial">
							<Icon name="facebook" />
						</Button>
						<Button href="https://www.instagram.com/givemeareason_official/">
							<Icon name="instagram" />
						</Button>
						<Button href="https://www.youtube.com/channel/UCCMwf_diPCwrFHMdAhFVBWg">
							<Icon name="youtube" />
						</Button>
					</Layout>

					<Layout right>
						<Navigation content={this.state.sections} />
					</Layout>
				</header>
				<section id="home">
					<img src={title} />
				</section>
				<Sections content={this.state.sections} />
				<i className="gmar-Joker" id="background" />
			</div>
		)
	}
}

export default App
