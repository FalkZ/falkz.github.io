import { get } from 'lodash'
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
			//let srcKey = markup[key].split('.')
			let tempObj = this.getState()

			try {
				if (markup[key] !== 'this' && typeof markup[key] === 'string' && markup[key].substring(0, 5) === 'this.') {
					markup[key] = markup[key].split('this.')[1]
					tempObj = get(tempObj, markup[key])
				} else if (markup[key] !== 'this') {
					tempObj = markup[key]
				}
				/*
				for (var i = 0; i < srcKey.length; i++) {
					tempObj = tempObj[srcKey[i]]
				}
				*/

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
				this.setError('Error', e)
			}

			return null
		})
		this.setState(output)
	})

	return this
}
