// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, vaccinationData: {}}

  componentDidMount() {
    this.getVaccination()
  }

  getVaccination = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        vaccinationBy7: data.last_7_days_vaccination.map(each => ({
          vaccination: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(e => ({
          age: e.age,
          count: e.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(e => ({
          gender: e.gender,
          count: e.count,
        })),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderVaccination = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <VaccinationCoverage details={vaccinationData.vaccinationBy7} />
        <VaccinationByGender details={vaccinationData.vaccinationByGender} />
        <VaccinationByAge details={vaccinationData.vaccinationByAge} />
      </>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBasedOnStatus = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccination()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main">
        <div className="mainDiv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="iconStyle"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWin vaccination in india</h1>
        {this.renderViewBasedOnStatus()}
      </div>
    )
  }
}

export default CowinDashboard
