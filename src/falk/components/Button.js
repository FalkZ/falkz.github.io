import { Component, createElement } from 'react'
import { get } from 'lodash'
import './Button.scss'

export default class Button extends Component {
	render() {
		let props = { ...this.props }
		let returnValue = this
		if (typeof this.props.return !== 'undefined') {
			returnValue = get(this, this.props.return)
		} else {
			returnValue = this
		}
		props.className = `Falk Button ${this.props.className}`

		if (typeof this.props.onClick === 'function') {
			props.onClick = () => this.props.onClick(returnValue)
		}
		return createElement('button', props)
	}
}
