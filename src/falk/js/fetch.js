var er
var error = (type, cause) => {
	er = { type, cause }
}
var fetchContent = (address, type) => {
	try {
		return fetch(address)
			.then(response => {
				if (response.ok && response.status === 200) {
					if (type === 'json') {
						return response.json()
					} else {
						return response.text()
					}
				} else {
					error(response.statusText, { response, address })
				}
			})
			.catch(e => error('failed to fetch', { e, address }))
	} catch (e) {
		error('failed to fetch', { e, address })
	}
}

export default function(input, type) {
	this.setAction('fetch')

	var output = this.getState()

	try {
		if (Array.isArray(input)) {
			input.map((address, index) => {
				output[index] = fetchContent(address, type).then(state => this.setState(state))
				return null
			})
		} else {
			output = fetchContent(input, type).then(state => {
				this.setState(state)
				if (typeof er !== 'undefined') {
					var { type, cause } = er
					this.setError(type, cause)
					this.setPromise(Promise.reject())
				}
			})
		}

		this.setPromise(output)
	} catch (error) {
		this.setError('failed to fetch', error)
	} finally {
		return this
	}
}
