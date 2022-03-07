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
import { Hero } from '@components/Hero'
import { Container } from '@components/Container'
import { Main } from '@components/Main'
import { DarkModeSwitch } from '@components/DarkModeSwitch'
import { CTA } from '@components/CTA'
import { UnwrapWidget } from '@components/UnwrapWidget'
import { Footer } from '@components/Footer'

import storc from '@public/purpstorc.png'  
import Image from 'next/image'

// alchemy-nft-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";



// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  // Replace with your Alchemy api key:
  const apiKey = process.env.ALCHEMY_API_KEY;
  

  // Initialize an alchemy-web3 instance:
  const web3 = createAlchemyWeb3(
    `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
  );

  //Currently is the address of the contract
  const  address  = context.params.slug;

  // Fetch metadata for a particular NFT:
  console.log(address);

  const response = await web3.alchemy.getNftMetadata({
    contractAddress: address,
    tokenId: "4"
  });

  //const data = context; 
  //const data = await response.json();
  console.log(response);
  // Pass data to the page via props
  return { props: {data: response  }}
}


const Unwrap = ({data}) => (
  <Container height="100vh">
    <Hero title='unwrap-dapp'/>
    
    <Main>
          <Image  src={storc} alt='Storc Card' />
          <UnwrapWidget data={data}/>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>(Guide Coming Soon)</Text>
    </Footer>
    <CTA />

    
  </Container>
)

export default Unwrap
