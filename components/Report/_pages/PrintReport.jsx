import { Component } from 'react'
import { apiRoutes } from '/api_routes'
import SearchWindow from '../SearchWindow'
import { getFloorData, getRoomData } from '/libs/report'

class PrintReport extends Component {
	state = {
		print: false,
	}
	printReport = ({params}) => {
		fetch(apiRoutes.viewReport)
		.then((res) => res.json())
		.then(({data}) => {
			const result = this.performSearch(data, params)
			const {width, height} = window.screen

			if (result.length > 0) {
				const newWindow = window.open('', '_blank', `width=${width},height=${height}`)

				const html = document.createElement('html')
				const head = document.head.cloneNode(true)
				const body = document.createElement('body')

				const script = document.createElement('script')
				script.innerText = `document.querySelector('#printButton').addEventListener('click', (e) => {e.target.parentElement.remove(); window.print(); window.close()})`;

				const style = document.createElement('style')
				style.innerText = `thead > td{padding: 10px;}`

				const header = document.createElement('header')
				header.classList = 'px-3 py-4 position-sticky bg-white border-bottom'
				header.style = 'top: 0; left: 0;'

				const printButton = document.createElement('button')
				printButton.classList = 'btn btn-dark py-3 px-5 bold'
				printButton.id = 'printButton'
				printButton.innerText = 'Print as PDF'

				header.appendChild(printButton)

				const table = document.createElement('table')
				table.classList = 'table text-capitalize'

				const thead = document.createElement('thead')
				thead.style = 'padding: 0 15px;'

				const tbody = document.createElement('tbody')

				if (true) {
					const tr = document.createElement('tr');

					['floor', 'room', 'issues', 'comment', 'solution', 'date'].forEach((col) => {
						const td = document.createElement('td')
						td.style = `padding-top: 10px; padding-bottom: 10px;`
						td.innerText = col

						tr.appendChild(td)
					})

					thead.appendChild(tr)
				}

				result.forEach((row) => {
					const tr = document.createElement('tr');

					Object.values(row).forEach((col, index, array) => {
						const td = document.createElement('td')

						if (index === 0) {
							td.innerText = getFloorData(col).name
						}
						else if (index === 1) {
							td.innerText = getRoomData(array[--index], col).name
						}
						else if (Array.isArray(col)) {
							const ul = document.createElement('ul')

							col.forEach((each) => {
								const li = document.createElement('li')
								li.innerText = each

								ul.appendChild(li)
							})

							td.appendChild(ul)
						}
						else if (new Date(col) !== 'Invalid Date' && !isNaN(new Date(col))) {
							td.innerText = new Date(col).toDateString()
						}
						else {
							td.innerText = col
						}

						tr.appendChild(td)
					})

					tbody.appendChild(tr)
				})


				table.appendChild(thead)
				table.appendChild(tbody)

				body.appendChild(header)
				body.appendChild(table)
				body.appendChild(script)

				head.appendChild(style)

				html.appendChild(head)
				html.appendChild(body)

				newWindow.document.write(html.outerHTML)
				
				// newWindow.print()
				// newWindow.close()
			}
			else alert('Empty rows returned!')
		})
	}
	performSearch = (report, {search, what, floor, room, date, issues}) => {

		return report
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
		.filter(({[what]: _search}) => (
			(search === '')
			? true
			: (
				(!_search)
				? false
				: new RegExp(String(`${search}`), 'gim').test(`${_search}`)
			)
		))
	}
	instantiateSearchWindow = () => {
		if (window) {
			window.search = {
				open: () => this.setState((state) => ({
					...state,
					print: true
				})),
				close: () => this.setState((state) => ({
					...state,
					print: false
				})),
			}
		}
	}
	componentDidMount () {
		this.instantiateSearchWindow()
	}
	componentDidUpdate (_, prevState) {
		if (this.state.report !== undefined) {

		}

		this.instantiateSearchWindow()
	}
	render () {
		const {print} = this.state
		const {printReport} = this

		return (
			<section className = 'row'>
				<div className = 'col-12'>
					<button
						className = 'bg-dark text-white text-uppercase px-5 py-3 shadow border-0 outline-0 rounded-lg d-inline-flex align-items-center'
						style = {{
							gap: '15px'
						}}
						onClick = {() => window.search.open()}
					>
						<span className = 'bold'>print report</span>
						<span
							className = 'bi-printer-fill text-white'
							style = {{
								fontSize: '1.5rem'
							}}
						></span>
					</button>
				</div>{
					print && (
						<SearchWindow
							title = 'Print report'
							onSearch = {(params) => {
								window.search.close()
								printReport(params)
							}}
						/>
					)
				}
			</section>
		)
	}
}

export default {
	component: PrintReport,
	pageName: 'print',
	buttonName: 'print report',
	iconName: 'bi-receipt',
	subtitle: 'Print specific records'
}