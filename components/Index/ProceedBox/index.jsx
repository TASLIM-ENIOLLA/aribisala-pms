import { Fragment, useState, Component } from 'react'
import { apiRoutes } from '/api_routes'

import user from './_assets/image/user.png'

export default class ProceedBox extends Component {
	state = {
		formData: {
	    username: '',
	    password: ''
	  }
	} 
	updateFormData = (updatedObj) => {
		this.setState((state) => ({
			...state,
			formData: {
				...state.formData,
				...updatedObj
			}
		}))
	}
  render () {
  	const { updateFormData, state: { formData } } = this

  	return (
			<form
				onSubmit = {(event) => {
					event.preventDefault()

					fetch(apiRoutes.signIn, {
						method: 'POST',
						body: JSON.stringify(formData)
					})
					.then((e) => e.json())
					.then(({typeCode, message}) => (typeCode === 1) ? window.location = './report' : alert(message))
				}}
			>
				<div
		      className = 'bg-white mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle p-3'
		      style = {{
		        width: '150px',
		        height: '150px',
		      }}
		    >
		    	<img
		    		src = {user.src}
		    		className = 'd-block w-100'
		    	/>
		    </div>
		    <input
				autoFocus
		    	type = 'text'
		    	placeholder = 'Enter username'
		    	className = 'd-block w-100 outline-0 text-white mx-auto p-3 border mb-4'
		    	value = {formData.username}
		    	onChange = {({target: {value}}) => updateFormData({username: value})}
		    	style = {{
		    		background: 'rgba(0,0,0,.5)',
		    		backdropFilter: 'blur(3px)'
		    	}}
		    />
		    <input
		    	type = 'password'
		    	placeholder = 'Enter password'
		    	className = 'd-block w-100 outline-0 text-white mx-auto p-3 border mb-4'
		    	value = {formData.password}
		    	onChange = {({target: {value}}) => updateFormData({password: value})}
		    	style = {{
		    		background: 'rgba(0,0,0,.5)',
		    		backdropFilter: 'blur(3px)'
		    	}}
		    />
		    <button className = 'border-0 text-uppercase bold outline-0 px-4 py-3 d-block w-100 theme-green-bg'>
		    	sign in
		    </button>
		   </form>
		)
  }
}