import { Component, memo } from 'react'
import ReportComponent from '/components/Report'
import { reportPages } from '/components/Report/_pages'

class ReportPage extends Component {
	get searchableComponentsByPageName () {
		return [
			'view'
		]
	}
	get pageData () {
		const { pageName } = this.props
		const [pageData] = reportPages.filter(({pageName: __pageName}) => __pageName === pageName)

		return pageData
	}
	render () {
		const PageComponent = this.pageData.component
		const PageTitle = this.pageData.buttonName
		const PageName = this.pageData.pageName

		return (
			<ReportComponent
				title = {PageTitle}
				searchable = {this.searchableComponentsByPageName.includes(PageName)}
			>
				<PageComponent />
			</ReportComponent>
		)
	}
}

export default memo(ReportPage)

function validatePageName (pageName) {
	const [pageData] = reportPages.filter(({pageName: __pageName}) => __pageName === pageName)

	return pageData
}

export function getServerSideProps (context) {
	const {query: {pageName}} = context
	const page = validatePageName(pageName)

	if (!page) return {
		notFound: true
	}

	return {
		props: {
			pageName: page.pageName
		}
	}
}