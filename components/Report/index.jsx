import styles from './_styles'
import SideBar from './SideBar'
import SearchWindow from './SearchWindow'
import { Component } from 'react'
import { withRouter } from 'next/router'
import { ReportContext } from './_context'
import { CheckBox } from './_pages/CheckBox'
import { renderToString } from 'react-dom/server'

export default class ReportComponent extends Component {
	state = {
		mobilesidebar: false
	}
	render () {
		const { mobilesidebar } = this.state
		const { floatingWindowActions } = this
		const { children, title, searchable } = this.props

		return (
			<section
				className = 'container-fluid vh-100 vw-100 position-relative'
				style = {styles.parentContainer}
			>
				{
					mobilesidebar && (
						<MobileSideBar onClose = {() => this.setState((state) => ({
							...state,
							mobilesidebar: false
						}))} />
					)
				}
			 	<div
			 		className = 'row h-100'
			 		style = {styles.rowContainer}
			 	>
			 		<div
			 			className = 'd-none d-md-block col-auto shadow h-100 overflow-y-auto bg-white'
			 		>
			 			<SideBar />
			 		</div>
			 		<div className = 'col h-100 overflow-y-auto'>
			 			<div className = 'row px-md-2 flex-column h-100 py-4 py-md-5'>
			 				<div className = 'col-auto pb-5'>
			 					<div className = 'row align-items-center justify-content-between'>
			 						<div className = 'col-auto'>
			 							<h4
			 								className = 'bold m-0 text-capitalize'
			 								onClick = {() => window.location.reload()}
			 								style = {{
			 									cursor: 'pointer'
			 								}}
			 							>
			 								{title || 'Report'}
			 							</h4>	
			 						</div>
			 						<div className = 'col-auto'>
			 							<div className = 'row align-items-center'>
			 								{
					 							searchable && (
					 								<div className = 'col'>
							 							<button
							 								className = 'border border-dark py-1 px-3 d-flex align-items-center outline-0 bg-clear'
							 								onClick = {() => window.search.open()}
							 								style = {{
							 									borderRadius: '20px'
							 								}}
							 							>
							 								<span
							 									className = 'bi-search text-dark mr-3'
							 									style = {{
							 										fontSize: '1.5rem'
							 									}}
							 								></span>
							 								<span>Search</span>
							 							</button>
							 						</div>
					 							)
					 						}
				 							<div className = 'd-md-none col'>
				 								<button
				 									className = 'bg-clear rounded border-0 outline-0'
				 									onClick = {() => this.setState((state) => ({
														...state,
														mobilesidebar: true
													}))}
				 								>
					 								<span
					 									className = 'bi-border-width text-dark'
					 									style = {{
					 										fontSize: '2.3rem'
					 									}}
					 								></span>
					 							</button>
				 							</div>
			 							</div>
			 						</div>
			 					</div>
							</div>
			 				<div className = 'col overflow-y-auto'>
			 					{children}
			 				</div>
			 			</div>
			 		</div>
			 	</div>
			 </section>
		)
	}
}

function MobileSideBar ({onClose}) {
	const close = () => {
		if (typeof onClose === 'function') onClose()
	}

	return (
		<section
			className = 'row h-100 position-fixed top-0 left-0 w-100 animated fadeIn'
			style = {{
				zIndex: 10,
				backdropFilter: 'blur(3px)'
			}}
		>
			<div
				className = 'col h-100 bg-white animated slideInLeft'
				style = {{maxWidth: '320px'}}
			>
				<div className = 'row pt-4'>
					<div className = 'col-auto'>
						<button
							className = 'bg-clear rounded border-0 outline-0'
							onClick = {() => close()}
						>
							<span
								className = 'bi-x text-dark'
								style = {{
									fontSize: '2.3rem'
								}}
							></span>
						</button>
					</div>
				</div>
				<SideBar />
			</div>
			<div className = 'col h-100' onClick = {() => close()}></div>
		</section>
	)
}