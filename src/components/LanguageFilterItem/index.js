// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersDataDetails, activeId, changeActiveId} = props
  const {id, language} = languageFiltersDataDetails
  const isActive = id === activeId
  const buttonClassName = isActive ? 'active-button' : 'button'

  const changeId = () => {
    changeActiveId(id)
  }

  return (
    <li className="language-buttons">
      <button type="button" className={buttonClassName} onClick={changeId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
