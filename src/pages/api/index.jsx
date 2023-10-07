import { useParams } from 'react-router-dom'

const Api = () => {
  const { id } = useParams()
  return (
    <div className='container'>
      <h1>Api</h1>
      {id}
      </div>
  )
}

export default Api