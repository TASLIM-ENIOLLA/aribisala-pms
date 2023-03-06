import { Component } from 'react'
import indexStyles from './_styles'

export default class Index extends Component {
	render () {
		const { children } = this.props

		return (
			<section
				style = {indexStyles.parentContainer}
				className = 'container-fluid py-5 vh-100 vw-100 overflow-y-auto'
			>
				{children}
			</section>
		)
	}
}