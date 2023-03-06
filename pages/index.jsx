import { Component } from 'react'
import IndexComponent from '/components/Index'
import ProceedBox from '/components/Index/ProceedBox'
import { server } from '/api_routes'

export default class Index extends Component {
  render () {
    return (
      <IndexComponent>
        <div
          className = 'row flex-column'
          style = {{
            minHeight: '100%'
          }}
        >
          <div className = 'col'>
            <div className = 'row h-100 flex-column align-items-center justify-content-center'>
              <div
                className = 'col-auto w-100'
                style = {{
                  maxWidth: '300px'
                }}
              >
                <ProceedBox />
              </div>
            </div>
          </div>
        </div>
      </IndexComponent>
    )
  }
}
