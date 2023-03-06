import { Component } from 'react'
import ReportComponent from '/components/Report'
import { reportPages } from '/components/Report/_pages'

export default class Index extends Component {
  render () {
    return (
      <ReportComponent title = 'Overview'>
      	<div className = 'row'>{
      		...reportPages
					.map(({component, ...rest}) => ({...rest}))
      		.map(({iconName, buttonName, pageName, subtitle}, index) => (
      			<div className = 'col-lg-3 col-md-6 col-12 mb-4' key = {index}>
	      			<a
	      				title = {`${subtitle}`}
	      				href = {`/report/${pageName}`}
	      				className = 'container-fluid d-block w-100 py-4 shadow rounded-lg bg-white'
	      				style = {{
	      					textDecoration: 'none'
	      				}}
	      			>
	      				<div className = 'row align-items-center flex-nowrap'>
		      				<div className = 'col-auto'>
		      					<span
				 							className = {iconName}
				 							style = {{
				 								fontSize: '2rem'
				 							}}
				 						></span>
		      				</div>
		      				<div
			      				className = 'col'
			      				style = {{
			      					overflow: 'hidden'
			      				}}
		      				>
		      					<div className = 'text-capitalize bold'>{buttonName}</div>
		      					<div className = 'text-muted one-liner'>{subtitle}</div>
		      				</div>
		      			</div>
	      			</a>
	      		</div>
      		))
      	}</div>
      	<style jsx>{`
      		.one-liner{
      			overflow-x: hidden;
      			text-overflow: ellipsis;
      			white-space: nowrap;
      			max-width: 100%;
      		}
      	`}</style>
      </ReportComponent>
    )
  }
}