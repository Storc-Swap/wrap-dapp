import {useState} from "react";
import Barcode from 'react-barcode';
import {Fragment} from "react";
import {  Center,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,Button } from '@chakra-ui/react'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
// import { faMagic } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
// import {
//     truncStringPortion
// } from "@utils/nftCard";

export const UnwrapWidget = () => {
    const [encryptedCode, setEncryptedCode] = useState('sample code');
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


    const connectAndDecrypt = async event => {
      event.preventDefault()
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      console.log("current account is "+ account);
      console.log(event.target.encryptedCode.value);
      const result = await onDecrypt(event.target.encryptedCode.value);
    }

    return (
      <Fragment>
        <form onSubmit={connectAndDecrypt}>
          <FormControl >
            <FormLabel htmlFor='encryptedCode'>Wrapped Code</FormLabel>
            <Input id='encryptedCode' placeholder='Some Encrypted Text' />
            <FormHelperText>Only the correct wallet can unwrap redemption code.</FormHelperText>
            <Center>
              <Barcode width={2} height={50} lineColor="#e14eca"  background="transparent" marginTop={10} marginLeft={5} marginRight={5} value={redeemCode ?? 'code here'} required/>  
            </Center>
            <Button width="100%" type='submit' bgGradient="linear(to-tr, teal.300,yellow.400)">Unwrap Code</Button>
          </FormControl>
        </form>
      </Fragment>
    );
};
