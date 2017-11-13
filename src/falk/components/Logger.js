import React, { Component } from 'react'
import Log from 'react-log'

//import Style from './Logger.css'

const style = {
	fontFamily: 'Roboto, sans-serif',
	color: '#3366cc'
}
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
	<Log dir={props.dir}>
		<h2 style={{ ...h2, color: '#5a34ad', fontSize: '15px', padding: '0 3px' }}>
			{'⚛ '}
			<span style={{ ...h2, color: '#5a34ad' }}>{props.children}</span>
		</h2>
	</Log>
)

const State = props => {
	let icon = '⇣ '
	let paddingLeft = 0
	let paddingRight = 0
	if (props.index === '0') {
		icon = '+ '
		paddingLeft = '4px'
		paddingRight = '2px'
	}
	return (
		<Log dir={props.dir}>
			<h2 style={h2}>
				<span style={{ ...h2, paddingLeft, paddingRight }}>{icon}</span>
				<span style={h2}>{props.index + ' '}</span>
				<span style={light}>{props.children}</span>
			</h2>
		</Log>
	)
}

const Error = props => {
	return (
		<Log dir={props.dir}>
			<p style={error}>{'⚠ ' + props.children}</p>
		</Log>
	)
}

export default class Logger extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render = () => (
		<span className={'Falk Logger'}>
			<Header>Test</Header>

			<Error dir={this}>error</Error>
			<State index="0">fetch</State>
			<State index="1" dir={this.props}>
				dop
			</State>
			<State index="2" dir={this.state}>
				nop
			</State>

			<Element index="5">react</Element>
		</span>
	)
}
