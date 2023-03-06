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
				script.innerText = `document.querySelector('#printButton').addEventListener('click', (e) => {e.target.parentElement.remove(); document.head.title.inn window.print(); window.close()})`;

				const style = document.createElement('style')
				style.innerText = `thead > td{padding: 15px;} .table-container{min-height: calc(100vh - 77.75px);}`

				const header = document.createElement('header')
				header.classList = 'px-3 py-4 position-sticky bg-light border-bottom'
				header.style = 'top: 0; left: 0;'

				const printButton = document.createElement('button')
				printButton.classList = 'btn btn-dark py-3 px-5 bold'
				printButton.id = 'printButton'
				printButton.innerText = 'Print as PDF'

				header.appendChild(printButton)

				const tableContainer = document.createElement('div')
				tableContainer.classList = 'table-container'
				tableContainer.style = 'overflow: auto;'

				const table = document.createElement('table')
				table.classList = 'table text-capitalize'

				const thead = document.createElement('thead')

				const tbody = document.createElement('tbody')

				if (true) {
					const tr = document.createElement('tr');

					['S/N', 'floor', 'room', 'issues', 'comment', 'solution', 'date'].forEach((col) => {
						const td = document.createElement('td')
						td.style = `padding-top: 20px; padding-bottom: 20px;`
						td.innerText = col

						tr.appendChild(td)
					})

					thead.appendChild(tr)
				}

				result.forEach(({floor, room, issues, comment, solution, date}, index) => {
					const tr = document.createElement('tr')

					const td0 = document.createElement('td')
					const td1 = document.createElement('td')
					const td2 = document.createElement('td')
					const td3 = document.createElement('td')
					const td4 = document.createElement('td')
					const td5 = document.createElement('td')
					const td6 = document.createElement('td')

					td0.innerText = ++index
					td1.innerText = getFloorData(floor).name
					td1.style = 'min-width: 80px;'
					td2.innerText = getRoomData(floor, room).name
					td2.style = 'min-width: 80px;'
					td3.innerHTML = `<ul>${issues.reduce((acc, each) => (
						`${acc}<li>${each}</li>`
					), '')}</ul>`
					td3.style = 'min-width: 100px;'
					td4.innerText = comment
					td4.style = 'min-width: 200px;'
					td5.innerText = solution
					td5.style = 'min-width: 200px;'
					td6.innerText = new Date(date).toDateString()
					td6.style = 'min-width: 80px;'

					tr.appendChild(td0)
					tr.appendChild(td1)
					tr.appendChild(td2)
					tr.appendChild(td3)
					tr.appendChild(td4)
					tr.appendChild(td5)
					tr.appendChild(td6)

					tbody.appendChild(tr)

				})


				table.appendChild(thead)
				table.appendChild(tbody)

				tableContainer.appendChild(table)

				body.appendChild(header)
				body.appendChild(tableContainer)
				body.appendChild(script)

				head.appendChild(style)

				html.appendChild(head)
				html.appendChild(body)

				newWindow.document.write(html.outerHTML)
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