import { Component } from 'react'

export class CheckBox extends Component {
	state = {
		checked: false
	}
	componentDidMount () {
		const {value} = this.props

		this.setState((state) => ({
			...state,
			checked: !!value
		}))
	}
	componentDidUpdate (prevProps, prevState) {
		const {checked} = this.state
		const {onChange} = this.props

		if (prevState.checked !== checked) {
			if (typeof onChange === 'function') onChange({value: checked})
		}

		if (prevProps.value !== this.props.value) {
			this.setState((state) => ({
				...state,
				checked: this.props.value
			}))
		}
	}
	onClick = () => {
		this.setState((state) => ({
			...state,
			checked: !state.checked
		}))
	}
	render () {
		const {title} = this.props
		const {checked} = this.state

		return (
			<div
				className = 'd-inline-flex align-items-center justify-content-center'
				onClick = {this.onClick}
				style = {{
					gap: '10px',
					cursor: 'pointer'
				}}
			>
				<div>
					<span
						className = {`bi-check-square${checked ? '-fill' : ''}`}
						style = {{
							fontSize: '1.5rem'
						}}
					></span>
				</div>
				<div>
					<span>{title}</span>
				</div>
			</div>
		)
	}
}