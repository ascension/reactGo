import bitcoinjs from 'bitcoinjs-lib';
import { BIP32_DERIVED_KEY } from '../config/appConfig';

var derivedPubKey = BIP32_DERIVED_KEY;
if (!derivedPubKey)
  throw new Error('Must set env var BIP32_DERIVED_KEY');

var hdNode = bitcoinjs.HDNode.fromBase58(derivedPubKey);

function deriveAddress(index) {
  return hdNode.derive(index).getAddress().toString();
}

export {
  deriveAddress
};