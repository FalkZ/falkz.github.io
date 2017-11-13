export default function(content) {
	this.setPromise(Promise.resolve('Success'))
	this.getPromise().then(() => {
		this.setAction('add')

		this.setState(content)
		return null
	})

	return this
}
