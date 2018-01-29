import React from 'react'
import Markdown from 'react-remarkable'

const MD = input => <Markdown source={input} />

export default function() {
	this.getPromise().then(() => {
		var input = this.getState()

		this.setAction('markdown')
		this.setState(MD(input))
		return null
	})

	return this
}
