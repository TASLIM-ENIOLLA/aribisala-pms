import { Component } from 'react'
import { floorsNRooms } from '../_pages/_props/floorsNRooms'
import MultiSelectCheckBox from '../MultiSelectCheckBox'

export default class SearchWindow extends Component {
	state = {
		searchData: {
			search: '',
			what: '',
			floor: '',
			room: '',
			date: '',
			issues: []
		}
	}
	floors () {
		return floorsNRooms.map(({rooms, ...rest}) => ({...rest}))
	}
	roomsByFloor (floorKey = '') {
		const [floor] = floorsNRooms.filter(({key}) => floorKey === key)

		return floor ? floor.rooms : []
	}
	updateSearchData = (updateObject) => {
		this.setState((state) => ({
			...state,
			searchData: {
				...state.searchData,
				...updateObject
			}
		}))
	}
	render () {
		const {actions, onSearch, title} = this.props
		const {updateSearchData, floors, roomsByFloor} = this
		const {searchData: {search, what, floor, room, date, issues}} = this.state

		return (
 			<div
		 		className = 'container-fluid animated fadeIn position-fixed h-100 w-100'
		 		style = {{
		 			background: 'rgba(0,0,0,.5)',
		 			top: 0,
		 			left: 0
		 		}}
		 	>
		 		<div className = 'row align-items-center justify-content-between py-5 h-100 overflow-y-auto'>
		 			<div className = 'col-auto w-100'>
		 				<div
		 					className = 'container-fluid overflow-0 bg-white shadow'
		 					style = {{
		 						maxWidth: '600px',
		 						borderRadius: '10px',
		 						maxHeight: '70%'
		 					}}
		 				>
		 					<div className = 'row flex-column'>
		 						<div className = 'col-auto'>
		 							<div className = 'row border-bottom align-items-center justify-content-between py-3 bg-light
		 							'>
		 								<div className = 'col-auto'>
		 									<h5 className = 'm-0 bold text-capitalize'>{title || 'Search records'}</h5>
		 								</div>
		 								<div className = 'col-auto'>
		 									<button
		 										className = 'p-0 bg-clear border-0 outline-0'
		 										onClick = {() => window.search.close()}
		 									>
		 										<span
			 										className = 'bi-x text-dark'
			 										style = {{
			 											fontSize: '1.5rem'
			 										}}
			 									></span>
		 									</button>
		 								</div>
		 							</div>
		 						</div>
		 						<div className = 'col'>
		 							<form
		 								className = 'row py-5 px-3'
		 								onSubmit = {(event) => {
		 									event.preventDefault()
		 									onSearch({params: {search, what, floor, room, date, issues}})
		 								}}
		 							>
		 								<div className = 'col-12 mb-4'>
		 									<h6 className = 'bold'>Search</h6>
		 									<input
		 										value = {search}
		 										onChange = {({target: {value}}) => updateSearchData({search: value})}
		 										className = 'd-block w-100 p-3 outline-0'
		 										placeholder = 'Type search query here...'
		 										style = {{
													border: '2px solid var(--gray)',
													backdropFilter: 'blur(3px)'
												}}
		 									/>
		 								</div>
		 								<div className = 'col-md-6 mb-4'>
		 									<h6 className = 'bold'>What</h6>
		 									<select
		 										value = {what}
		 										onChange = {({target: {value}}) => updateSearchData({what: value})}
		 										className = 'd-block w-100 p-3 outline-0 text-capitalize bg-clear'
		 										placeholder = 'Type search query here...'
		 										style = {{
													border: '2px solid var(--gray)',
													backdropFilter: 'blur(3px)'
												}}
		 									>
		 										<option>---</option>
		 										<option value = 'comment'>Comment</option>
		 										<option value = 'solution'>Solution</option>
		 									</select>
		 								</div>
		 								<div className = 'col-md-6 mb-4'>
		 									<h6 className = 'bold'>Floor</h6>
		 									<select
		 										value = {floor}
		 										onChange = {({target: {value}}) => updateSearchData({floor: value})}
		 										className = 'd-block w-100 p-3 outline-0 text-capitalize bg-clear'
		 										placeholder = 'Type search query here...'
		 										style = {{
													border: '2px solid var(--gray)',
													backdropFilter: 'blur(3px)'
												}}
		 									>	
		 										<option value = ''>---</option>
		 									{
		 										floors().map(({name, key}, index) => (
		 											<option value = {key} key = {index}>{name}</option>
		 										))
		 									}</select>
		 								</div>
		 								<div className = 'col-md-6 mb-4'>
		 									<h6 className = 'bold'>Room</h6>
		 									<select
		 										value = {room}
		 										onChange = {({target: {value}}) => updateSearchData({room: value})}
		 										className = 'd-block w-100 p-3 outline-0 text-capitalize bg-clear'
		 										placeholder = 'Type search query here...'
		 										style = {{
													border: '2px solid var(--gray)',
													backdropFilter: 'blur(3px)'
												}}
		 									>
		 										<option value = ''>---</option>
		 									{
		 										roomsByFloor(floor).map(({name, key}, index) => (
		 											<option value = {key} key = {index}>{name}</option>
		 										))
		 									}</select>
		 								</div>
		 								<div className = 'col-md-6 mb-4'>
		 									<h6 className = 'bold'>Date</h6>
		 									<input
		 										value = {date}
		 										onChange = {({target: {value}}) => updateSearchData({date: value})}
		 										type = 'date'
		 										className = 'd-block w-100 p-3 outline-0 bg-clear'
		 										placeholder = 'Type search query here...'
		 										style = {{
													border: '2px solid var(--gray)',
													backdropFilter: 'blur(3px)'
												}}
		 									/>
		 								</div>
		 								<div className = 'col-12 mb-4'>
		 									<h6 className = 'bold mb-2'>Issues</h6>
											<MultiSelectCheckBox
												checkboxes = {[
													{
														title: 'Electrical',
														value: 'electrical'
													},
													{
														title: 'Aesthetics',
														value: 'aesthetics'
													},
													{
														title: 'Others',
														value: 'others'
													},
												]}
												value = {issues}
												onChange = {({value}) => updateSearchData({issues: value})}
											/>
		 								</div>
		 								<div className = 'col-12'>
											<button
												type = 'submit'
												className = 'd-block text-uppercase bold shadow-sm rounded-lg w-100 p-3 bg-dark text-white border-0 outline-0'
											>
												{title || 'Search records'}
											</button>
		 								</div>
		 							</form>
		 						</div>
		 					</div>
		 				</div>
		 			</div>
		 		</div>
		 	</div>
 		)
	}
}
