// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItemsDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryItemsDetails

  return (
    <li className="repositoryitem-bg">
      <div className="img-container">
        <img src={avatarUrl} alt={name} className="image" />
        <h1 className="name">{name}</h1>
      </div>

      <div className="to-right">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logos"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="to-right">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logos"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="to-right">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logos"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
