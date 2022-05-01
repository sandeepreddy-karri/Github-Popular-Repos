import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeId: 'ALL',
    repositoryItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getItems()
  }

  changeActiveId = id => {
    this.setState({activeId: id}, this.getItems)
  }

  getItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(product => ({
        name: product.name,
        issuesCount: product.issues_count,
        forksCount: product.forks_count,
        id: product.id,
        starsCount: product.stars_count,
        avatarUrl: product.avatar_url,
      }))
      this.setState({
        repositoryItems: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPrimeDealsList = () => {
    const {repositoryItems} = this.state

    return (
      <ul className="respo-container">
        {repositoryItems.map(repositoryItemsDetails => (
          <RepositoryItem
            repositoryItemsDetails={repositoryItemsDetails}
            key={repositoryItemsDetails.id}
          />
        ))}
      </ul>
    )
  }

  renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="failure view"
      className="register-prime-image"
    />
  )

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderingrepositoriesall = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPrimeDealsList()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state

    return (
      <div className="main-bg">
        <h1 className="title">Popular</h1>
        <ul className="language-bg">
          {languageFiltersData.map(languageFiltersDataDetails => (
            <LanguageFilterItem
              languageFiltersDataDetails={languageFiltersDataDetails}
              activeId={activeId}
              changeActiveId={this.changeActiveId}
              key={languageFiltersDataDetails.id}
            />
          ))}
        </ul>
        {this.renderingrepositoriesall()}
      </div>
    )
  }
}

export default GithubPopularRepos
