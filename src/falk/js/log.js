import ReactDOM from 'react-dom'

const css = css =>
	JSON.stringify(css)
		.replace(/"/g, '')
		.replace(/,/g, ';')
		.replace(/_/g, ',')
		.replace('{', '')
		.replace('}', '')

const style = {
	'font-family': 'Roboto_sans-serif',
	color: '#2752c2'
}

const h1 = {
	...style,
	'font-family': 'Lato_ sans-serif',
	'font-size': '30px'
}
const h2 = {
	...style,
	'font-weight': 'bold',
	'font-size': '20px'
}

const er = {
	...style,
	'font-size': '14px',
	'font-weight': 'bold',
	color: 'white',
	background: '#fd0e35',
	padding: '1px 5px',
	'border-radius': '3px',
	'line-height': 1.5
}
const light = {
	'font-weight': 'normal'
}
const sub = {
	...h2,
	'font-size': '10px',
	'font-weight': 'normal',
	'padding-left': '2px'
}

const getJSX = element => {
	let temp = document.createElement('div')
	ReactDOM.hydrate(element, temp)
	return temp.childNodes[0]
}

var gerror = false

const log = (content, style) => {
	let temp = []

	let tempstyle = []
	style.map((s, index) => tempstyle.push(css(s)))

	content.map((c, index) => temp.push(['%c' + c]))

	let _console
	;(_console = console).groupCollapsed.apply(_console, [temp.join(' '), ...tempstyle])
	//;(_console = console).log.apply(_console, temp[1])

	return null
}
var _console
const logHeader = name => (_console = console).group.apply(_console, ['%c' + name + '%c@falkAPI', css(h1), css(sub)])

const logState = ({ state, error, action }) =>
	state.map((state, index) => {
		if (gerror === false) {
			let icon = '⇣ '
			let paddingLeft = 0
			let paddingRight = 0

			if (index === 0) {
				icon = '+ '
				paddingLeft = '4px'
				paddingRight = '2px'
			} else if (index === action.length - 1) {
				icon = '⚛ '
			}

			log(
				[icon, index, action[index]],
				[{ ...h2, 'padding-left': paddingLeft, 'padding-right': paddingRight }, h2, { ...h2, ...light }]
			)
			if (typeof state !== 'undefined' && typeof state.$$typeof !== 'undefined') {
				console.log(getJSX(state))
			} else if (Array.isArray(state) && typeof state[0].$$typeof !== 'undefined') {
				state.map(log => console.log(getJSX(log)))
			} else if (typeof error !== 'undefined' && typeof error[index] !== 'undefined') {
				console.groupEnd()
				;(_console = console).groupCollapsed.apply(_console, ['%c⚠   ' + error[index].type, css(er)])
				console.dir(error[index].cause)
				console.groupEnd()
				gerror = true
			} else {
				console.dir(state)
			}

			console.groupEnd()
		}
		return null
	})

export default function(that) {
	console.groupEnd()
	logHeader(that.name)
	logState(that)
	console.groupEnd()
}
