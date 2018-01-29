export default function() {
	if (typeof this.state !== 'undefined') {
		return this.promise[this.state.length]
	} else if (typeof this.promise !== 'undefined') {
		return this.promise[0]
	} else {
		return new Promise(function(resolve, reject) {
			resolve('Success')
		})
	}
}
