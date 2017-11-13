import React, { Component } from 'react'
import objectUnfreeze from 'object-unfreeze'

var _this
var that
//var p = new Promise(function(resolve, reject) {})
var promise = []

const processFalk = ({ type }) => type().element()

var get = (element, fullindex) => {
	if (typeof element.props !== 'undefined') {
		if (typeof element.props.children !== 'undefined') {
			if (Array.isArray(element.props.children)) {
				element.props.children.map((child, index) => {
					let itemp = [...fullindex]

					itemp.push(index)
					//	console.log(itemp)
					get(child, itemp)

					if (typeof child.type !== 'string' && typeof child.type !== 'undefined') {
						let p = processFalk(child).then(element => {
							//let temp = that
							//for (var i = 0; i < itemp.length; i++) {
							//temp =
							//console.log(temp)
							//	}

							var foo = that
							for (var i = 0; i + 1 < itemp.length; i++) {
								foo[itemp[i]] = objectUnfreeze(foo[itemp[i]])
								foo[itemp[i]].props = objectUnfreeze(foo[itemp[i]].props)
								foo[itemp[i]].props.children = objectUnfreeze(foo[itemp[i]].props.children)

								foo = foo[itemp[i]].props.children
							}

							foo[itemp[itemp.length - 1]] = element

							/*
							switch (itemp.length) {
								case 1:
									that[itemp[0]] = element

									break
								case 2:


									//that[itemp[0]].props.children[itemp[1]] = element
									console.log(foo)
									console.log(that)
									break

									let temp = objectUnfreeze(that[itemp[0]])
									that[itemp[0]] = temp
									temp = objectUnfreeze(that[itemp[0]].props)
									that[itemp[0]].props = temp
									temp = objectUnfreeze(that[itemp[0]].props.children)
									that[itemp[0]].props.children = temp

									that[itemp[0]].props.children[itemp[1]] = element
									//	console.log(that[itemp[0]])
									break
								case 3:
									that[itemp[0]].props.children[itemp[1]].props.children[itemp[2]] = element

									break
								default:
							}
							*/

							//console.log(that)

							//_this.setState({ elements: temp })
						})
						//console.log(p)

						promise.push(p)
					}
				})
			} else {
				let itemp = [...fullindex]
				if (itemp.length !== 0) {
					itemp.push('props')
					itemp.push('children')
				}
				itemp.push(0)
				//console.log(itemp)

				get(element.props.children, itemp)
				if (typeof element.props.children.type !== 'string' && typeof element.props.children.type !== 'undefined') {
					let p = processFalk(element.props.children).then(element => {
						//let temp = that
						//for (var i = 0; i < itemp.length; i++) {
						//temp =
						//console.log(temp)
						//	}
						that[itemp] = element

						console.log(_this.state.that)

						//_this.setState({ elements: temp })
					})
					console.log(p)

					promise.push(p)
				}
			}
		}
	}
}

export default class Provider extends Component {
	constructor(props) {
		super(props)

		this.state = { elements: [] }
	}

	componentWillMount() {
		//	console.log(this)
		_this = this
		that = objectUnfreeze(this.props.children)
		this.setState({ that }, get(_this, []))

		/*Object.defineProperty(that, '_source', {
			configurable: false,
			enumerable: false,
			writable: true
			//value: source
		})
		if (Object.freeze) {
		Object.freeze(element.props)
			Object.freeze(element)
			/}
*/

		//	console.log(promise)

		//console.log(that)

		// myOjbect is the object you want to iterate.
		// Notice the second argument (secondArg) we passed to .forEach.

		// this keyword = secondArg
	}
	componentDidMount() {
		Promise.all(promise).then(() => this.setState({ elements: that }))
	}

	render() {
		return <span className="Provider">{this.state.elements}</span>
	}
}
