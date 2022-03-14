import {Box} from '@chakra-ui/react'
import {ReactNode} from 'react'

export const TableDescription = ({children}: {children: ReactNode}) => (
  <Box maxW="60ch">{children}</Box>
)
