export default function(input) {
	if (typeof this.state !== 'undefined') {
		this.promise[this.state.length] = input
	} else {
		this.promise = [input]
	}
	return null
}
