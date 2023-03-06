import { Component } from 'react'
import { floorsNRooms } from './_props/floorsNRooms'
import { CheckBox } from './CheckBox'
import { apiRoutes } from '/api_routes'

class NewReport extends Component {
	state = {
		formData: {
			floor: '',
			room: '',
			date: new Date(),
			issues: [],
			comment: '',
			solution: ''
		}
	}
	floors () {
		return floorsNRooms.map(({rooms, ...rest}) => ({...rest}))
	}
	roomsByFloor (floorKey = '') {
		const [floor] = floorsNRooms.filter(({key}) => floorKey === key)

		return floor ? floor.rooms : []
	}
	reinitializeFormData () {
		this.setState({
			formData: {
				floor: '',
				room: '',
				date: new Date(),
				issues: [],
				comment: '',
				solution: ''
			}
		})
	}
	updateFormData = (updateObject) => {
		this.setState((state) => ({
			...state,
			formData: {
				...state.formData,
				...updateObject
			}
		}))
	}
	submitData = (event) => {
		event.preventDefault()
		const {formData} = this.state

		fetch(apiRoutes.newReport, {
			method: 'POST',
			body: JSON.stringify({...formData})
		})
		.then((res) => res.json())
		.then(({type, message}) => {
			alert(message)

			if (type === 'success') {
				this.reinitializeFormData()
			}
		})
	}
	get issuesData () {
		return [
			{
				name: 'Electrical',
				key: 'electrical'
			},
			{
				name: 'Aesthetics',
				key: 'aesthetics'
			},
			{
				name: 'Others',
				key: 'others'
			},
		]
	}
	render () {
		const {updateFormData, submitData, issuesData} = this
		const {formData: {floor, room, date, issues, comment, solution}} = this.state

		return (
			<form
				className = 'row'
				onSubmit = {submitData}
				style = {{
					maxWidth: '750px'
				}}
			>
				<div className = 'col-12 mb-5'>
					<p className = 'bold mb-2'>Date</p>
					<input
						type = 'input'
						className = 'd-block w-100 p-3 bg-clear outline-0'
						value = {date.toDateString()}
						disabled = {true}
						style = {{
							resize: 'none',
							border: '2px solid var(--gray)',
							backdropFilter: 'blur(3px)'
						}}
					/>
				</div>
				<div className = 'col-md-6 mb-5'>
					<p className = 'bold mb-2'>Floor</p>
					<select
						className = 'd-block w-100 text-capitalize p-3 bg-clear outline-0'
						value = {floor}
						onChange = {({target: {value}}) => updateFormData({floor: value})}
						style = {{
							border: '2px solid var(--gray)',
							backdropFilter: 'blur(3px)'
						}}
					>
						<option>---</option>{
							this.floors().map(({name, key}) => (
								<option key = {key} value = {key}>{name}</option>
							))
						}
					</select>
				</div>
				<div className = 'col-md-6 mb-5'>
					<p className = 'bold mb-2'>Room</p>
					<select
						className = 'd-block w-100 text-capitalize p-3 bg-clear outline-0'
						value = {room}
						onChange = {({target: {value}}) => updateFormData({room: value})}
						style = {{
							border: '2px solid var(--gray)',
							backdropFilter: 'blur(3px)'
						}}

					>
						<option>---</option>{
							this.roomsByFloor(floor).map(({name, key}) => (
								<option key = {key} value = {key}>{name}</option>
							))
						}
					</select>
				</div>
				<div className = 'col-12 mb-5'>
					<p className = 'bold mb-2'>Issue</p>
					<div>{
						issuesData.map(({name, key}) => (
							<div className = 'mb-3' key = {key}>
								<CheckBox
									title = {name}
									value = {issues.includes(key)}
									onChange = {({value}) => updateFormData({issues: value ? [
										...issues,
										key
									] : issues.filter((each) => each !== key)})}
								/>
							</div>
						))
					}</div>
				</div>
				<div className = 'col-12 mb-5'>
					<p className = 'bold mb-2'>Comment</p>
					<textarea
						rows = '5'
						className = 'd-block w-100 p-3 bg-clear outline-0'
						value = {comment}
						onChange = {({target: {value}}) => updateFormData({comment: value})}
						style = {{
							resize: 'none',
							border: '2px solid var(--gray)',
							backdropFilter: 'blur(3px)'
						}}
					></textarea>
				</div>
				<div className = 'col-12 mb-5'>
					<p className = 'bold mb-2'>Solution</p>
					<textarea
						rows = '5'
						className = 'd-block w-100 p-3 bg-clear outline-0'
						value = {solution}
						onChange = {({target: {value}}) => updateFormData({solution: value})}
						style = {{
							resize: 'none',
							border: '2px solid var(--gray)',
							backdropFilter: 'blur(3px)'
						}}
					></textarea>
				</div>
				<div className = 'col-12 my-4'>
					<input
						type = 'submit'
						value = 'Save'
						className = 'd-block w-auto py-3 px-5 btn btn-dark border-0 outline-0 shadow'
					/>
				</div>
			</form>
		)
	}
}

export default {
	component: NewReport,
	pageName: 'new',
	buttonName: 'new report',
	iconName: 'bi-journal-plus',
	subtitle: 'Add new data to report'
}