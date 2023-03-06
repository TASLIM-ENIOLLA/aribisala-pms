import { Component } from 'react'
import { CheckBox } from '../_pages/CheckBox'

export default class MultiSelectCheckBox extends Component {
	state = {
		multiSelectCheckBoxList: []
	}
	componentDidMount () {
		const {value, onChange, checkboxes} = this.props

		this.onChange = onChange
		this.checkboxes = checkboxes

		this.setState({
			multiSelectCheckBoxList: value
		})
	}
	componentDidUpdate (_, prevState) {
		if (prevState.multiSelectCheckBoxList.length !== this.state.multiSelectCheckBoxList.length) {
			this.onChange({value: this.state.multiSelectCheckBoxList})
		}
	}
	render () {
		const {checkboxes} = this
		const {multiSelectCheckBoxList} = this.state

		return (
			<div>{
				checkboxes && checkboxes.map(({title, value}, index) => (
					<div className = 'mb-3 mr-4 d-inline-block' key = {index}>
						<CheckBox
							title = {title}
							value = {multiSelectCheckBoxList.includes(value)}
							onChange = {({value: _value}) => this.setState((state) => ({
								...state,
								multiSelectCheckBoxList: _value ? [
									...state.multiSelectCheckBoxList,
									value
								] : state.multiSelectCheckBoxList.filter((each) => each !== value)
							}))}
						/>
					</div>
				))
			}</div>
		)
	}
}