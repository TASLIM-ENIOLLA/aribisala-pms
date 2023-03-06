const dev = process.env.NODE_ENV !== 'production'
export const server = dev ? 'http://localhost:3000' : 'https://ari-pms.vercel.app'

export const apiRoutes = {
	signIn: `${server}/api/sign-in`,
	newReport: `${server}/api/report/new`,
	viewReport: `${server}/api/report/view`,
}