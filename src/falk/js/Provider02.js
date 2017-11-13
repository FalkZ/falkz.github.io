import React, { Component } from 'react'
import objectUnfreeze from 'object-unfreeze'

var _this
var children

const processFalk = ({ type }) => type().element()

var getElement = (child, index, fullindex) => {
	let itemp = [...fullindex]

	itemp.push(index)

	get(child, itemp)
	//console.log(child.type)
	if (typeof child.type !== 'string' && typeof child.type !== 'undefined') {
		let p = processFalk(child).then(element => {
			// ~keys
			element = objectUnfreeze(element)
			element.props = objectUnfreeze(element.props)
			element.props.key = index
			var foo = children

			// unfreeze
			for (var i = 0; i + 1 < itemp.length; i++) {
				if (itemp[i] == null) {
					console.log(foo)
					/*if (typeof foo.props != 'undefined') {
						if (typeof foo.props.children != 'undefined') {
							foo = objectUnfreeze(foo)
							foo.props = objectUnfreeze(foo.props)
							foo.props.children = objectUnfreeze(foo.props.children)
						}
					}*/
				} else {
					if (typeof foo[itemp[i]].props != 'undefined') {
						if (typeof foo[itemp[i]].props.children != 'undefined') {
							foo[itemp[i]] = objectUnfreeze(foo[itemp[i]])
							foo[itemp[i]].props = objectUnfreeze(foo[itemp[i]].props)

							foo[itemp[i]].props.children = objectUnfreeze(foo[itemp[i]].props.children)
						}
					}
				}
				if (itemp[i + 1] != null) {
					if (itemp[i] == null) {
						foo = foo[itemp[i]].props.children
					} else {
						foo = foo[itemp[i]].props.children
					}
				}
			}
			//console.log(itemp)
			if (itemp[itemp.length - 1] != null) {
				foo[itemp[itemp.length - 1]] = element
			} else {
				console.log({ ...foo })
				foo[itemp[itemp.length - 2]] = element
			}
		})
		let promise = _this.state.promise
		promise.push(p)
		_this.setState({ promise })
	}

	return null
}

var get = (element, fullindex) => {
	if (typeof element.props !== 'undefined') {
		if (typeof element.props.children !== 'undefined') {
			if (Array.isArray(element.props.children)) {
				element.props.children.map((child, index) => getElement(child, index, fullindex))
			} else {
				//fullindex
				getElement(element.props.children, null, fullindex)
				/*let itemp = [...fullindex]
				if (itemp.length !== 0) {
					itemp.push('props')
					itemp.push('children')
				}
				itemp.push(0)

				get(element.props.children, itemp)
				if (typeof element.props.children.type !== 'string' && typeof element.props.children.type !== 'undefined') {
					let p = processFalk(element.props.children).then(element => {
						children[itemp] = element
					})
					let promise = _this.state.promise
					promise.push(p)
					_this.setState({ promise })

				}*/
			}
		}
	}
}

export default class Provider extends Component {
	constructor(props) {
		super(props)

		this.state = { children: [], promise: [] }
	}

	componentWillMount() {
		_this = this
		children = [...this.props.children]

		get(this, [])
		Promise.all(this.state.promise).then(() => this.setState({ children }))
		console.log(children)
	}
	componentDidMount() {}

	render() {
		return <span className="Provider">{this.state.children}</span>
	}
}
