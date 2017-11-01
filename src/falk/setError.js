export default function(type, cause) {
	if (typeof this.error === 'undefined') {
		this.error = []
	}
	if (typeof this.state !== 'undefined') {
		this.error[this.state.length] = { type, cause }
	} else {
		this.error = [{ type, cause }]
	}
	return null
}
