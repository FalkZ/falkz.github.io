import { Component, createElement } from 'react'
import './Icon.styl'

export default class Icon extends Component {
	render() {
		let props = { ...this.props }
		let className = ''
		if (typeof this.props.className !== 'undefined') {
			className = this.props.className
		}
		props.className = `Falk Icon fa fa-${this.props.name} ${className}`
		props['aria-hidden'] = 'true'
		return createElement('i', props)
	}
}
