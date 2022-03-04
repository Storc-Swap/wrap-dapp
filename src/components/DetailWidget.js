import {useState} from "react";
import Barcode from 'react-barcode';
import {Fragment} from "react";
import {  Center,
  Code,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,Button } from '@chakra-ui/react'

  import {
    encrypt,
  } from 'eth-sig-util';

  import {ethers} from 'ethers'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
// import { faMagic } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
// import {
//     truncStringPortion
// } from "@utils/nftCard";

export const DetailWidget = () => {
    const [encryptedCode, setEncryptedCode] = useState('wrapped code here');
    const [walletAddress, setWalletAddress] = useState('wallet address');
    //
    const onConnectAccount = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
      }

    function stringifiableToHex(value) {
      return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)));
    }

    const getPubKey = async event => {
      event.preventDefault()
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const pubKey = await ethereum.request({
          method: 'eth_getEncryptionPublicKey',
          params: [accounts[0]],
        });
        setWalletAddress(window.ethereum.selectedAddress);
        setEncryptedCode(pubKey);
       // console.log(encryptedCode);
        //encryptMessageInput.disabled = false;
      } catch (error) {
        console.log(error);
      }
    
    }

    return (
      <Fragment>
        <form onSubmit={getPubKey}>
          <FormControl >
            <FormLabel htmlFor='plainCode'>Wallet Address</FormLabel>
            <Code fontSize='2xl' isTruncated>{walletAddress}</Code>
            <FormLabel htmlFor='encryptedCode'>Public Key</FormLabel>
            <Code fontSize='3xl' isTruncated>{encryptedCode}</Code>
            <FormHelperText>This is different than the wallet address</FormHelperText>
            <Button width="100%" type='submit' bgGradient="linear(to-tr, purple.300,blue.400)">Get Public Key</Button>
            <Center>
            </Center>
          </FormControl>
        </form>
      </Fragment>
    );
};
