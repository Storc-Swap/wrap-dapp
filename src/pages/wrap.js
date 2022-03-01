import {
  Box,
  Center,
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Spacer
} from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { WrapWidget } from '../components/WrapWidget'
import { Footer } from '../components/Footer'

import storc from '../public/purpstorc.png'  
import Image from 'next/image'

const Wrap = () => (
  <Container height="100vh">
    <Hero title='wrap-dapp'/>
    
    <Main>
          <Image  src={storc} alt='Storc Card' />
          <WrapWidget/>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>(Guide Coming Soon)</Text>
    </Footer>
    <CTA />

    
  </Container>
)

export default Wrap
