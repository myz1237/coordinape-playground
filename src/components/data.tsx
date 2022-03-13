import axios from 'axios'
import {useQuery} from 'react-query'
import {useAuthContext} from '../auth/context'
import {Tables} from '../components/tables'

const useCircleSnapshot = () => {
  const {token} = useAuthContext()
  return useQuery('circleSnapshot', async () => {
    const params = new URLSearchParams({token: token || ''})
    const response = await axios.get(`/api/snapshot?${params}`)
    return response.data
  })
}

export const Data = () => {
  const {isLoading, error, data} = useCircleSnapshot()

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {(error as any).message}</p>}
      {data && <Tables {...data} />}
    </div>
  )
}
