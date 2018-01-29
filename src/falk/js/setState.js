export default function(input) {
	if (typeof this.state !== 'undefined') {
		this.state[this.state.length] = input
	} else {
		this.state = [input]
	}
	return null
}
