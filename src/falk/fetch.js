var _this = {}
var fetchContent = (address, type) => {
	return fetch(address)
		.then(response => {
			if (response.status === 200) {
				if (type === 'json') {
					return response.json()
				} else {
					return response.text()
				}
			} else {
				return _this.setError(response.statusText, address)
			}
		})
		.catch(error => _this.setError('failed to fetch', address))
}

export default function(input, type) {
	this.setAction('fetch')
	_this = this

	var output = this.getState()

	try {
		if (Array.isArray(input)) {
			input.map((address, index) => {
				output[index] = fetchContent(address, type).then(state => this.setState(state))
				return null
			})
		} else {
			output = fetchContent(input, type).then(state => this.setState(state))
		}

		this.setPromise(output)
	} catch (error) {
		this.setError(error)
	} finally {
		return this
	}
}
