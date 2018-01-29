var chop = (input, string, { merge, noSpace, noNewLine, extract, removeTag, noZero, strip }) => {
	let extr = []

	if (!noNewLine) {
		string = '\n' + string
	}

	if (!noSpace) {
		string = string + ' '
	}

	input = input.split(string)
	if (noZero) {
		input.shift()
	}

	if (extract) {
		input = input.map((single, index) => {
			let temp = single.split('\n')[0]

			extr[index] = temp.trim()
			if (removeTag) {
				return single.replace(temp, '')
			} else {
				return single
			}
		})
	}

	if (removeTag) {
		string = ''
	}

	if (merge) {
		input = input.join(string)
	} else {
		input = input.map((single, index) => {
			if (index || noZero) {
				return string + single
			} else {
				return single
			}
		})
	}
	if (strip) {
		input = input.map(single => single.trim())
	}

	return { output: input, extract: extr }
}

export default function(string, options) {
	this.getPromise().then(() => {
		this.setAction('chop')
		var input = this.getState()
		var output
		if (Array.isArray(input)) {
			input.map((single, index) => {
				if (typeof single === 'string') {
					output[index] = chop(single, string, options)
				} else {
					this.setError('wrong data type', single)
				}
				return null
			})
		} else if (typeof input === 'string') {
			output = chop(input, string, options)
		} else {
			this.setError('wrong data type', input)
		}

		this.setState(output)
	})

	return this
}
