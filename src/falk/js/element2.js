export default function(object) {
	return Promise.all(object.promise).then(() => {
		return object.state[object.state.length - 1]
	})
}
