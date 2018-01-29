import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import StackTrace from 'stacktrace-js'

window.onerror = function(msg, file, line, col, error) {
	StackTrace.fromError(error).then(console.log)
}
try {
	ReactDOM.render(<App />, document.getElementById('root'))
} catch (e) {
	console.log(e)
} finally {
}

registerServiceWorker()
