export default function() {
	if (typeof this.state !== 'undefined') {
		return this.state[this.state.length - 1]
	} else {
		return null
	}
}
