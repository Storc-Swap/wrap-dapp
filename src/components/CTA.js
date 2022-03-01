import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from './Container'
import { FaGithub } from  'react-icons/fa'

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={2}
  >

    <ChakraLink
      isExternal
      href="https://github.com/Storc-Swap/wrap-dapp"
      flexGrow={3}
      mx={2}
    >
  <Button  leftIcon={<FaGithub />}>
    Github
  </Button>
    </ChakraLink>
  </Container>
)
