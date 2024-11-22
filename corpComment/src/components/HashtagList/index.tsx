import useFeedbackItemsContextHook from '../../hooks/useFeedbackItemsContextHook'
import HashtagItem from '../HashtagItem'

export default function HashtagList() {

  const {
    companyList,
    handleSelectCompany
  } = useFeedbackItemsContextHook()
  
  return (
    <ul className='hashtags'>
      {companyList.map((el: string) => <HashtagItem 
        {...{
          el,
          onSelectCompany: handleSelectCompany
        }}
        key={el}
      />)}
    </ul>
  )
}
