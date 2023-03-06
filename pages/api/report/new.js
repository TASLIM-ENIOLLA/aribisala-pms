import { supabase } from '/supabase'

export default async function handler (req, res) {
	const fs = require('fs')
	const path = require('path')

	const {body, method} = req

	if (method !== 'POST') {
		res.status(200).json({
			type: 'error',
			message: 'Request method is forbidden for this endpoint!'
		})
	}
	else {
		const formData = JSON.parse(body)
		const {floor, room, date, issues, comment, solution} = formData

		if ([floor, room, date, comment, solution].includes('')) {
			res.status(200).json({
				type: 'error',
				message: 'One or more compulsory fields are empty!'
			})
		}
		else if (new Date(date) === 'Invalid Date' || isNaN(new Date(date))) {
			res.status(200).json({
				type: 'error',
				message: 'Date seems to be invalid'
			})
		}
		else {
			const {data, error} = await supabase.from('reports').insert([
				{floor, room, date, issues: JSON.stringify(issues), comment, solution}
			])
			
			if (error) {
				res.status(200).json({
					type: 'error',
					message: 'An error occured, please retry!'
				})		
			}
			else {
				res.status(200).json({
          type: 'success',
          message: 'Report successfully saved.',
          data: {...formData}
        })
			}
		}
	}
}

function isJSON(string){
  try{
    JSON.parse(string)
    return true
  }
  catch(e){
    return false
  }
}