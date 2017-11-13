export default function() {
	return Promise.all(this.promise).then(() => {
		return this.state[this.state.length - 1]
	})
}
