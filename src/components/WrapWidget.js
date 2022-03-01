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

export const WrapWidget = () => {
    const [encryptedCode, setEncryptedCode] = useState('wrapped code here');
    const [redeemCode, setRedeemCode] = useState('code here');
    //
    const onConnectAccount = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
      }

    const onDecrypt = async (code) => {
      try {
        const decryptedRawMessage = await window.ethereum.request({
          method: 'eth_decrypt',
          params: [code, window.ethereum.selectedAddress],
        })

        setRedeemCode(decryptedRawMessage);

        // this.setState((state, props) => ({
        //       cardCode: decryptedRawMessage
        //     }))
      } catch (error) {
        console.log(error);
        setRedeemCode('Code Error')
        //cleartextDisplay.innerText = `Error: ${error.message}`

      }
    }

    function stringifiableToHex(value) {
      return ethers.utils.hexlify(Buffer.from(JSON.stringify(value)));
    }

    const encryptWrap = async event => {
      event.preventDefault()



      try {
        const wrappedCode = stringifiableToHex(
          encrypt(
             event.target.encryptedCode.value,
            { data: event.target.plainCode.value },
            'x25519-xsalsa20-poly1305',
          ),
        );
        console.log(wrappedCode);
        setEncryptedCode(wrappedCode);
      } catch (error) {
        console.log(error)
      }
    
      console.log(event.target.plainCode.value);
    
    }

    return (
      <Fragment>
        <form onSubmit={encryptWrap}>
          <FormControl >
            <FormLabel htmlFor='plainCode'>Code to Wrap</FormLabel>
            <Input id='plainCode' placeholder='Plain Text Code' />

            <FormLabel htmlFor='encryptedCode'>Recipient or Delegate Encryption Key</FormLabel>
            <Input id='encryptedCode' placeholder='Ex: qIK903AwuYsIIrPUth2zJq9406Aa+VEJx3MQd7jCDTk='  />
            <FormHelperText>This is different than the wallet address</FormHelperText>
            <Button width="100%" type='submit' bgGradient="linear(to-tr, purple.300,blue.400)">Wrap Code</Button>
            <Center>
            <Code fontSize='4xl' isTruncated>{encryptedCode}</Code>
            </Center>
          </FormControl>
        </form>
      </Fragment>
    );
};
