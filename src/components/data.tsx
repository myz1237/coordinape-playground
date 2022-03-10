import {CircleSnapshot} from '../types'
import {UnadjustedTable} from './unadjusted-table'

export interface DataProps extends CircleSnapshot {}

export const Data = ({users, totalGive}: DataProps) => {
  return (
    <div>
      <UnadjustedTable users={users} totalGive={totalGive} />
    </div>
  )
}
