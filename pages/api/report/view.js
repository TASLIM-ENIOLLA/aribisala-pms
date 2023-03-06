import { supabase } from '/supabase'

export default async function handler (req, res) {
	const fs = require('fs')
	const path = require('path')

	const {method} = req

	if (method !== 'GET') {
		res.status(200).json({
			type: 'error',
			message: 'Request method is forbidden for this endpoint!'
		})
	}
	else {
		const {data, error} = await supabase.from('reports').select('*')

		if (error) {
			res.status(200).json({
	      type: 'error',
	      message: 'An error occured, please retry!'
	    })			
		}
		else {
			res.status(200).json({
	      type: 'success',
	      message: 'Report successfully fetched.',
	      data: data.map(({issues, ...rest}) => ({
	      	issues: JSON.parse(issues),
	      	...rest
	      }))
	    })
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