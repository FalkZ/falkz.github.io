import React, { Component } from 'react'

var MapperList = props => {
	if (props.options.ordered) {
		return <ol className={props.className}> {ListItem(props)} </ol>
	} else {
		return <ul className={props.className}> {ListItem(props)} </ul>
	}
}

var ListItem = props => props.content.map((content, index) => <li key={index}>{content}</li>)

var MapperTable = props => <table className={props.className}> {TableRow(props)} </table>

var TableRow = props =>
	props.content.map((content, index) => {
		if (props.options.ordered) {
			return (
				<tr key={index}>
					<td>{index + 1}.</td>
					{TableItem(props, index)}
				</tr>
			)
		} else {
			return <tr key={index}>{TableItem(props, index)}</tr>
		}
	})

var TableItem = (props, indexrow) =>
	props.content[indexrow].map((content, index) => {
		if (props.options.flip) {
			return <td key={index}> {props.content[index][indexrow]} </td>
		} else {
			return <td key={index}>{content} </td>
		}
	})

export default class mapper extends Component {
	render() {
		if (Array.isArray(this.props.content[0])) {
			return MapperTable(this.props)
		} else {
			return MapperList(this.props)
		}
	}
}
