import React, { Component } from 'react'

export default class Provider extends Component {
	constructor(props) {
		super(props)
		this.state = { elements: [] }
	}
	componentWillMount() {
		var _this = this

		if (Array.isArray(this.props.children)) {
			this.props.children.map(({ type }, index) => {
				type()
					.element()
					.then(that => {
						let elements = _this.state.elements
						elements[index] = that
						_this.setState({ elements })
						return null
					})
				return null
			})
		} else {
			this.props.children
				.type()
				.element()
				.then(that => {
					let elements = _this.state.elements
					elements = that
					_this.setState({ elements })
					return null
				})
		}
	}

	render() {
		return <span className="Provider">{this.state.elements}</span>
	}
}
