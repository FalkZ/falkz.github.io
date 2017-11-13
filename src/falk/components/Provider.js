import { Component, createElement } from 'react'
import objectUnfreeze from 'object-unfreeze'
import { get, set } from 'lodash'
import jsxToString from 'jsx-to-string'

var _this
var elements

const setKey = (element, key) => {
	element = objectUnfreeze(element)
	element.key = key
	return element
}

const getFalk = ({ type }) => type().element()

const setFalk = (element, index, fullindex) => {
	element = setKey(element, index)

	let partindex = []
	for (var i = 0; i < fullindex.length; i++) {
		partindex.push(fullindex[i])
		set(elements, partindex, objectUnfreeze(get(elements, partindex)))
	}

	set(elements, fullindex, element)
}

const getElement = (element, index, fullindex) => {
	let tempindex = [...fullindex]

	tempindex.push('props')
	tempindex.push('children')
	if (index != null) {
		tempindex.push(index)
	}
	if (Array.isArray(element) === false && index != null) {
		element = setKey(element, index)
	}
	getChildren(element, tempindex)

	if (
		typeof element.type !== 'string' &&
		typeof element.type !== 'undefined' &&
		typeof element !== 'string' &&
		typeof element.type.prototype.render === 'undefined' &&
		typeof element.type().element !== 'undefined'
	) {
		let p = getFalk(element).then(element => setFalk(element, index, tempindex))
		let promise = _this.state.promise
		promise.push(p)
		_this.setState({ promise })
	}

	return null
}

const getChildren = (element, fullindex) => {
	if (hasChildren(element)) {
		if (Array.isArray(element.props.children)) {
			element.props.children.map((child, index) => getElement(child, index, fullindex))
		} else {
			getElement(element.props.children, null, fullindex)
		}
	}
}

const hasChildren = element => {
	if (typeof element.props !== 'undefined') {
		if (typeof element.props.children !== 'undefined') {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}

const setState = () => {
	Promise.all(_this.state.promise)
		.then(() => {
			elements = objectUnfreeze(elements)
			elements.props = objectUnfreeze(elements.props)

			let className = ''
			if (typeof elements.props.className !== 'undefined') {
				className = elements.props.className
			}
			elements.props.className = `Falk Provider ${className}`
			elements = createElement('span', elements.props, elements.props.children)
			_this.setState({ elements })

			let logarr = jsxToString(elements)
				.split('\n')
				.slice(0, 0 + 6)

			logarr.push('%c ...')
			logarr = logarr.join('\n')
			console.log(logarr, 'font-weight: bold; font-size: 15px; font-family: Roboto, sans-serif; color: #3366cc')
		})
		.catch(error => console.log(error))
}

export default class Provider extends Component {
	constructor(props) {
		super(props)
		this.state = { elements: [], promise: [] }
	}

	componentWillMount() {
		_this = this
		elements = { ...this }

		getChildren(this, [])
		setState()
	}
	render() {
		return this.state.elements
	}
}
