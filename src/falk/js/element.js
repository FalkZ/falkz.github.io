import log from './log'

export default function() {
	return Promise.all(this.promise).then(() => {
		log(this)
		return this.state[this.state.length - 1]
	})
}
