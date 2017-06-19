import bitcoinjs from 'bitcoinjs-lib';
import EthereumWallet from 'ethereumjs-wallet/hdkey';
import { BIP32_DERIVED_KEY } from '../config/appConfig';

const derivedPubKey = BIP32_DERIVED_KEY;
if (!derivedPubKey)
  throw new Error('Must set env var BIP32_DERIVED_KEY');

const hdNode = bitcoinjs.HDNode.fromBase58(derivedPubKey);

const ethereumHD = EthereumWallet.fromExtendedKey(derivedPubKey);

function deriveAddress(index) {
  return hdNode.derive(index).getAddress().toString();
}

function deriveEthereumAddress(index) {
  const addresses = {};

  if (!addresses[index]) {
    const etherAddress = ethereumHD.deriveChild(index);
    console.log('etherAddress:', etherAddress.getWallet().getAddressString());
    addresses[index] = etherAddress.getWallet().getAddressString();
  }
  console.log('ether addresses', addresses);
  return addresses[index];
}

export {
  deriveAddress,
  deriveEthereumAddress
};