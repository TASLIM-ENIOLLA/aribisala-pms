import { reportPages } from '../_pages'
import { withRouter } from 'next/router'
import { Component, Fragment } from 'react'

class SideBar extends Component {
	render () {
		const {query: {pageName: __pageName}} = this.props.router
		
		return (
			<Fragment>
				<div
					className = 'h-100 py-4 py-md-5 row px-2 flex-column'
					style = {{
						minWidth: '280px'
					}}
				>
					<div className = 'col-auto pb-4'>
						<h4 className = 'bold'>Menu</h4>
					</div>
					<div className = 'col'>
						<div className = 'row flex-column'>{
							reportPages
							.map(({component, ...rest}) => ({...rest}))
							.map(({buttonName, iconName, pageName}, index) => (
								<div
									key = {index}
									className = {`col-auto mb-2 ${__pageName === pageName ? 'bg-light' : ''}`}
								>
									<a
										title = {buttonName}
										href = {`/report/${pageName}`}
				 						className = 'd-flex align-items-center text-left bg-clear outline-0 w-100 py-3 px-0 text-capitalize border-0'
				 						style = {{
				 							textDecoration: 'none'
				 						}}
				 					>
				 						<span
				 							className = {`${iconName} mr-3`}
				 							style = {{
				 								fontSize: '2rem'
				 							}}
				 						></span>
				 						<span className = 'bold text-dark'>{buttonName}</span>
				 					</a>
								</div>
							))
						}</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default withRouter(SideBar)