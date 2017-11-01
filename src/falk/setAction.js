export default function(input) {
	if (typeof this.action !== 'undefined') {
		this.action.push(input)
	} else {
		this.action = [input]
	}
	return null
}
