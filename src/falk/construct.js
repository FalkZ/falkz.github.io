/*function resolve(path, obj) {
	return path.split('.').reduce(function(prev, curr) {
		return prev ? prev[curr] : null
	}, obj || self)
}
*/
export default function(markup, { keepArrays }) {
	this.getPromise().then(() => {
		let output = []
		this.setAction('construct')
		Object.keys(markup).map(key => {
			let srcKey = markup[key].split('.')
			let tempObj = this.getState()

			try {
				for (var i = 0; i < srcKey.length; i++) {
					tempObj = tempObj[srcKey[i]]
				}

				if (Array.isArray(tempObj) && typeof keepArrays === 'undefined') {
					tempObj.map((content, index) => {
						if (typeof output[index] === 'undefined') {
							output[index] = { ...markup }
						}
						output[index][key] = content
						return null
					})
				} else {
					if (typeof output === 'undefined') {
						output = { ...markup }
					}
					output[key] = tempObj
				}
			} catch (e) {
				this.setError('wrong data type', tempObj)
			}

			return null
		})
		this.setState(output)
	})

	return this
}
