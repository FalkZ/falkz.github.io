import falk from './'

export default function(name) {
	this[name] = Object.assign({ name, parent: this }, falk)
	return this[name]
}
