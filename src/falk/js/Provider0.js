import React, { Component } from 'react'

var _this

const processChild = (element, index) => {
	if (typeof element.props !== 'undefined') {
		if (Array.isArray(element.props.children)) {
			element.props.children.map((child, index) => processChild(child, index))
		} else {
			console.log(element)
			var { type } = element

			if (typeof type !== 'string') {
				processFalk(type, index)
			} else {
				let elements = _this.state.elements
				elements[index] = { ...element }
				elements[index].key = index
				_this.setState({ elements })
			}
		}
	}
}

const processFalk = (type, index) => {
	type()
		.element()
		.then(that => {
			let elements = _this.state.elements
			elements[index] = { ...that }
			elements[index].key = index
			_this.setState({ elements })
			return null
		})
	return null
}

const getElements = element => {
	if (typeof element.props !== 'undefined') {
		if (Array.isArray(element.props.children)) {
			element.props.children.map((child, index) => processChild(child, index))
		} else {
			processChild(element.props.children, 0)
		}
	}
}

export default class Provider extends Component {
	constructor(props) {
		super(props)
		this.state = { elements: [] }
	}
	componentWillMount() {
		_this = this

		getElements(this.props.children)

		/*	if (Array.isArray(this.props.children)) {
			this.props.children.map((child, index) => {
				var { type } = child

				if (typeof type !== 'string') {
					type()
						.element()
						.then(that => {
							let elements = _this.state.elements
							elements[index] = { ...that }
							elements[index].key = index
							_this.setState({ elements })
							return null
						})
					return null
				} else {
					let elements = _this.state.elements
					elements[index] = { ...child }
					elements[index].key = index
					_this.setState({ elements })
				}
			})
		} else {
			var { type } = this.props.children
			console.log(type)
			if (typeof type !== 'string') {
				type()
					.element()
					.then(that => {
						let elements = _this.state.elements
						elements = { ...that }

						_this.setState({ elements })
						return null
					})
				return null
			} else {
				let elements = _this.state.elements
				elements = { ...this.props.children }

				_this.setState({ elements })
			}
		}
		*/
	}

	render() {
		return <span className="Provider">{this.state.elements}</span>
	}
}
