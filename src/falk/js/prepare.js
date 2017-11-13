import { createElement } from 'react'

export default function(tag) {
	let output = {}

	this.getPromise().then(() => {
		this.setAction('prepare')

		output = createElement(tag, { className: `Falk ${this.name}` }, this.getState())

		this.setState(output)
	})

	return this
}
