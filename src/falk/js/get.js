export default function(object, index) {
	if (typeof index !== 'undefined') {
		this.setAction('get')
		const output = Promise.all(object.promise).then(() => {
			this.setState(object.state[index])
			return object.state[index]
		})

		this.setPromise(output)
	}
	return this
}
