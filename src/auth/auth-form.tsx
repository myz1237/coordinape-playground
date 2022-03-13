import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import {ChangeEvent, FormEvent, useState} from 'react'
import {useAuthContext} from './context'

const validationRegex = /Bearer \d{5}\|\w+/
const isValidToken = (value: string) => validationRegex.test(value)

export const AuthForm = () => {
  const [tokenString, setTokenString] = useState('')
  const isValid = isValidToken(tokenString)
  const {setToken} = useAuthContext()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTokenString(event.target.value)
  }

  const onSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    setToken(tokenString)
  }

  return (
    <Flex justifyContent="center">
      <Stack maxW="60ch" w="100%" spacing={6}>
        <Stack as="form" onSubmit={onSubmit}>
          <FormControl id="tokenString" isInvalid={!isValid}>
            <FormLabel>Token String</FormLabel>
            <Input value={tokenString} onChange={onChange} />
            <FormHelperText>
              A token from Coordinape which looks like &quot;Bearer
              12345|A1b2C3d4E5f6G7&quot;
            </FormHelperText>
            <FormErrorMessage>A valid token is required</FormErrorMessage>
          </FormControl>
          <Button type="submit" isDisabled={!isValid}>
            Submit
          </Button>
        </Stack>
        <details>
          <summary>Instructions to find your token</summary>
          <OrderedList spacing={3}>
            <ListItem>
              Log in to{' '}
              <Link href="https://app.coordinape.com/" target="_blank">
                Coordinape
              </Link>
            </ListItem>
            <ListItem>
              <Stack>
                <Text>Open the DevTools &quot;Network&quot; tab</Text>
                <Box position="relative" w="100%" h="37px">
                  <Image
                    src="/network-tab.png"
                    alt="Chrome DevTools with the Network tab selected"
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </Stack>
            </ListItem>
            <ListItem>
              <Text>
                Search for &quot;manifest&quot; and select the second option. If
                no results are found, refresh the page.
              </Text>
              <Box position="relative" w="100%" h="300px">
                <Image
                  src="/manifest.png"
                  alt="Searching for manifest in the Network tab"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            </ListItem>
            <ListItem>
              <Text>
                Scroll down to the &quot;Request Headers&quot; section and copy
                the value of the &quot;authorization&quot; header. The value
                starts with &quot;Bearer&quot;.
              </Text>
              <Box position="relative" w="100%" h="38px">
                <Image
                  src="/token.png"
                  alt="An authorization header"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            </ListItem>
            <ListItem>Paste the value in the field above and submit.</ListItem>
          </OrderedList>
        </details>
      </Stack>
    </Flex>
  )
}
