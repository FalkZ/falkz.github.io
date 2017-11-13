export default function(type, cause) {
	if (typeof this.error === 'undefined') {
		this.error = {}
	}

	this.error[this.action.length - 1] = { type, cause }

	return null
}
