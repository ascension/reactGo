import bitcoinjs from 'bitcoinjs-lib';

var derivedPubKey = process.env.BIP32_DERIVED;

if (!derivedPubKey)
  throw new Error('Must set env var BIP32_DERIVED_KEY');

var hdNode = bitcoinjs.HDNode.fromBase58(derivedPubKey);

function deriveAddress(index) {
  return hdNode.derive(index).getAddress().toString();
}

export {
  deriveAddress
};