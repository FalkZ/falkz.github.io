/*function resolve(path, obj) {
	return path.split('.').reduce(function(prev, curr) {
		return prev ? prev[curr] : null
	}, obj || self)
}
*/
export default function(markup) {
	this.getPromise().then(() => {
		this.setAction('construct')
		Object.keys(markup).map(key => {
			let srcKey = markup[key].split('.')
			let tempObj = this.getState()

			try {
				for (var i = 0; i < srcKey.length; i++) {
					tempObj = tempObj[srcKey[i]]
				}
				markup[key] = tempObj
			} catch (e) {
				this.setError('wrong data type', tempObj)
			}

			return null
		})
		this.setState(markup)
	})

	return this
}
