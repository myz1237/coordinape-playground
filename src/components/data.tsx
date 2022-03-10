import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'
import {CircleSnapshot} from '../types'
import {CappedTable} from './capped-table'
import {UnadjustedTable} from './unadjusted-table'

export interface DataProps extends CircleSnapshot {}

export const Data = ({users, totalGive}: DataProps) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Unadjusted</Tab>
        <Tab>&gt;10 -&gt; 10</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <UnadjustedTable users={users} totalGive={totalGive} />
        </TabPanel>
        <TabPanel>
          <CappedTable users={users} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
