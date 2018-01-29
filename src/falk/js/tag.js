import { createElement } from 'react'

export default function(tag) {
	this.getPromise().then(() => {
		this.setAction('tag')
		let input = this.getState()

		let output = []
		if (Array.isArray(input)) {
			input.map((properties, index) => {
				let content = properties.content
				const tempObj = { ...properties, key: index }
				delete tempObj.content
				output[index] = createElement(tag, tempObj, content)

				return null
			})
		} else {
			let content = input.content
			const tempObj = { ...input }
			delete tempObj.content
			output = createElement(tag, tempObj, content)
		}
		this.setState(output)
		return null
	})

	return this
}
