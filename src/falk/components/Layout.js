import { Component, createElement } from 'react'
import './Layout.styl'

const propertyList = ['right', 'center', 'paper', 'inline']

export default class Layout extends Component {
	render() {
		let props = { ...this.props }
		let className = ''
		if (typeof props.className !== 'undefined') {
			className = ' ' + props.className
		}
		let helper = []

		propertyList.map(property => {
			if (typeof props[property] !== 'undefined') {
				helper.push(property)
				delete props[property]
			}
			return null
		})

		props.className = `Falk Layout ${helper.join(' ')}${className}`

		return createElement('span', props)
	}
}
