import passwords from '/db/passwords.js'
import { supabase } from '/supabase'

export default async function handler (req, res) {
  const { body } = req
  const { username: u, password: p } = JSON.parse(body)
  const signInCredentials = [u.toLowerCase(), p.toLowerCase()]

  if ([...signInCredentials].includes('')) res.status(200).json({
    typeCode: 0,
    message: 'One or both fields are empty!'
  })
  verifySignInCredentials(...signInCredentials).then((verified) => {
    if (!verified) res.status(200).json({
      typeCode: 0,
      message: 'Username or password incorrect!'
    })

    res.status(200).json({
      typeCode: 1,
      message: 'Login successful!'
    })
  })
}

async function verifySignInCredentials (username, password) {
  const { data, error } = await supabase.from('users').select('username, password')

  if (error) return false
  
  const row = data.filter(({username: u, password: p}) => username === u && password === p)

  if (row.length < 1) return false
  else return true
}