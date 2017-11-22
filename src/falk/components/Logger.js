import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Log from 'react-log'

import s from './Logger.css'

//import Style from './Logger.css'

const style = {
	fontFamily: 'Roboto sans-serif',
	color: '#3366cc'
}

const CSS = css =>
	JSON.stringify(css)
		.replace(/"/g, '')
		.replace(/,/g, ';')
		.replace(/_/g, ',')
		.replace('{', '')
		.replace('}', '')

const styl = CSS({
	'font-family': 'Roboto _ sans-serif',
	color: '#3366cc'
})

console.log(styl)

const h1 = {
	...style,
	fontFamily: 'Lato, sans-serif'
}
const h2 = {
	...style,
	fontSize: '20px',
	textAlign: 'right',
	display: 'table'
}

const error = {
	...style,
	fontSize: '15px',
	fontWeight: 'bold',
	color: 'white',
	background: '#fd0e35',
	padding: '1px 5px',
	borderRadius: '3px',
	lineHeight: 1.5
}
const light = {
	...h2,
	fontWeight: 'normal'
}
const sub = {
	...h2,
	fontSize: '10px',
	fontWeight: 'normal',
	paddingLeft: '2px'
}

const getJSX = element => {
	let temp = document.createElement('div')
	ReactDOM.hydrate(element, temp)
	return temp
}

const Header = props => {
	let color = {}

	if (typeof props.El !== 'undefined') {
		color = { color: '#5a34ad' }
	}

	return (
		<Log>
			<h1 style={{ ...h1, ...color }}>
				{props.children}
				<span style={{ ...sub, ...color }}>@falkAPI</span>
			</h1>
		</Log>
	)
}

const Element = props => (
	<Log log={props.log}>
		<h2 style={{ ...h2, color: '#5a34ad', fontSize: '15px', padding: '0 3px' }}>
			{'⚛ '}
			<span style={{ ...h2, color: '#5a34ad' }}>{props.children}</span>
		</h2>
	</Log>
)

const logJSX = (log, icon, paddingLeft, paddingRight, props) => (
	<Log log={log}>
		<h2 style={h2}>
			<span style={{ ...h2, paddingLeft, paddingRight }}>{icon}</span>
			<span style={h2}>{props.index + ' '}</span>
			<span style={light}>{props.children}</span>
		</h2>
	</Log>
)

const State = props => {
	let icon = '⇣ '
	let paddingLeft = 0
	let paddingRight = 0
	if (props.index === 0) {
		icon = '+ '
		paddingLeft = '4px'
		paddingRight = '2px'
	}

	if (typeof props.log.$$typeof !== 'undefined') {
		return logJSX(getJSX(props.log), icon, paddingLeft, paddingRight, props)
	} else if (Array.isArray(props.log) && typeof props.log[0].$$typeof !== 'undefined') {
		let el = []
		props.log.map(log => el.push(getJSX(log)))

		return logJSX(el, icon, paddingLeft, paddingRight, props)
	} else {
		return (
			<Log log={props.log}>
				<h2 style={h2}>
					<span style={{ ...h2, paddingLeft, paddingRight }}>{icon}</span>
					<span style={h2}>{props.index + ' '}</span>
					<span style={light}>{props.children}</span>
				</h2>
			</Log>
		)
	}
}

const Error = props => {
	return (
		<Log log={props.log}>
			<p style={error}>{'⚠ ' + props.children}</p>
		</Log>
	)
}

export default class Logger extends Component {
	constructor(props) {
		super(props)
		this.state = { error: false }
	}
	componentWillMount() {
		let element = getJSX(this.props.element)
		this.setState({ element })
	}

	logState = () =>
		this.props.state.map((state, index) => {
			if (typeof this.props.error !== 'undefined' && typeof this.props.error[index] !== 'undefined') {
				this.setState({ error: true })
				return (
					<span key={index}>
						<State index={index}>{this.props.action[index]}</State>
						<Error log={this.props.error[index].cause}>{this.props.error[index].type}</Error>
					</span>
				)
			} else if (this.state.error === false) {
				return (
					<State key={index} index={index} log={state}>
						{this.props.action[index]}
					</State>
				)
			}
			return null
		})

	logElement = () => {
		if (this.state.error === false) {
			return <Element log={this.state.element}>element</Element>
		} else {
			return null
		}
	}

	render() {
		return (
			<span className={'Falk Logger'}>
				<Header>{this.props.name}</Header>
				{this.logState()}
				{this.logElement()}
			</span>
		)
	}
}
