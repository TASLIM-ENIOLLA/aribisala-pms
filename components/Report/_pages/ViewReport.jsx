import { Component } from 'react'
import { apiRoutes } from '/api_routes'
import { ReportContext } from '../_context'
import SearchWindow from '../SearchWindow'
import { getFloorData, getRoomData } from '/libs/report'

class ViewReport extends Component {
	state = {
		search: false,
		reportData: undefined,
		reportDataRoot: undefined
	}
	updateReportData = (reportData) => this.setState((state) => ({
		...state,
		reportData,
		reportDataRoot: reportData
	}))
	componentDidMount () {
		const {updateReportData, instantiateSearchWindow} = this

		fetch(apiRoutes.viewReport)
		.then((res) => res.json())
		.then(({data}) => updateReportData(data))

		instantiateSearchWindow()
	}
	instantiateSearchWindow = () => {
		if (window) {
			window.search = {
				open: () => {
					if (JSON.stringify(this.state.reportDataRoot) !== JSON.stringify(this.state.reportData)) {
						if (confirm('Do you want to clear all searches?')) {
							this.setState((state) => ({
								...state,
								reportData: state.reportDataRoot
							}))
						}
						else {
							this.setState((state) => ({
								...state,
								search: true
							}))
						}
					}
					else {
						this.setState((state) => ({
							...state,
							search: true
						}))
					}
				},
				close: () => this.setState((state) => ({
					...state,
					search: false
				})),
			}
		}
	}
	performSearch = ({search, what, floor, room, date, issues}) => {
		const {reportDataRoot} = this.state

		const result = reportDataRoot
		// Filter for record date
		.filter(({date: _date}) => (
			(date === '')
			? true
			: new Date(date).toDateString() === new Date(_date).toDateString()
		))
		// Filter for record issues
		.filter(({issues: _issues}) => (
			(issues === [])
			? true
			: issues.reduce((acc, each) => acc * Number(_issues.includes(each)), 1)
		))
		// Filter for record floor
		.filter(({floor: _floor}) => (
			(floor === '')
			? true
			: floor === _floor
		))
		// Filter for record room
		.filter(({room: _room}) => (
			(room === '')
			? true
			: room === _room
		))
		// Filter for record comment and solution
		.filter(({[what]: _search}) => {
			console.log(search,  '\n', _search, '\n',  new RegExp(search, 'gim').test(_search))

			return (
				(search === '')
				? true
				: (
					(!_search)
					? false
					: new RegExp(String(`${search}`), 'gim').test(`${_search}`)
				)
			)
		})

		this.setState((state) => ({
			...state,
			reportData: result
		}))

		window.search.close()
	}
	render () {
		const {parseIssuesData, performSearch} = this
		const {reportData, search} = this.state

		return (
			<section
				className = 'row'
			>
				<div className = 'col-12'>
					<div className = 'table-responsive'>
						<table
							className = 'table table-striped overflow-0 table-hover'
							style = {{
								position: 'relative',
								borderRadius: '10px'
							}}
						>
							<thead
								className = 'bg-dark text-white position-sticky'
								style = {{
									position: 'sticky',
									top: 0,
									left: 0
								}}
							>
								<tr className = 'text-capitalize bold'>
									<td>S/N</td>
									<td>floor</td>
									<td>room</td>
									<td>issues</td>
									<td>comment</td>
									<td>solution</td>
									<td>date</td>
								</tr>
							</thead>
							<tbody
								style = {{
									backdropFilter: 'blur(3px)'
								}}
							>{
								!reportData ? (
									<tr>
										<td colSpan = '7'>
											<div className = 'py-5 px-3 text-center bold'>
												Loading...
											</div>
										</td>
									</tr>
								) : (
									Array.isArray(reportData) && reportData.length > 0 ? reportData.map(({comment, date, solution, floor, room, issues}, index) => (
										<tr key = {index} className = 'text-capitalize bold'>
											<td>{++index}</td>
											<td>{getFloorData(floor).name}</td>
											<td>{getRoomData(floor, room).name}</td>
											<td>{
												issues.length > 0 ? (
													<ul className = 'ml-3 p-0'>{
														issues.map((issue, index) => (
															<li className = 'mb-1' key = {index}>{issue}</li>
														))
													}</ul>
												) : '---'
											}</td>
											<td style = {{minWidth: '200px'}}>{comment}</td>
											<td style = {{minWidth: '200px'}}>{solution}</td>
											<td style = {{minWidth: '100px'}}>{new Date(date).toDateString()}</td>
										</tr>
									)) : (
										<tr>
											<td colSpan = '7'>
												<div className = 'py-5 px-3 text-center bold'>
													Empty rows returned!
												</div>
											</td>
										</tr>
									) 
								)
							}</tbody>
						</table>
					</div>
				</div>
			 	{search && (
			 		<SearchWindow
			 			onSearch = {({params}) => performSearch(params)}
			 		/>
			 	)}
				<style jsx>{`
					::placeholder{
						color: var(--dark);
					}
					td, th{
						padding: 15px;
					}
				`}</style>
			</section>
		)
	}
}

export default {
	component: ViewReport,
	pageName: 'view',
	buttonName: 'view report',
	iconName: 'bi-journal-text',
	subtitle: 'Search and filter through records'
}