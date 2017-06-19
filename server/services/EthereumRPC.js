import ethrpc from 'ethrpc';
import { getSocket } from '../../server';
import LedgerService from '../services/LedgerService';
import { LEDGER_TXN_TYPES, CURRENCY } from '../config/constants';
import parallelLimit from 'async/parallelLimit';


const connectionConfiguration = {
  httpAddresses: ['http://174.138.61.46:8545'], // optional, default empty array
  wsAddresses: [], // optional, default empty array
  ipcAddresses: [], // optional, default empty array
  // networkID: 3, // optional, used to verify connection to the intended network (blockchain)
  connectionTimeout: 3000, // optional, default 3000
  errorHandler: function(err) {
    console.error(err);
  } // optional, used for errors that can't be correlated back to a request
};

const addressesToUsersMap = {
  '0x1c3f580daeaac2f540c998c8ae3e4b18440f7c45': 11,
  '0x91337a300e0361bddb2e377dd4e88ccb7796663d': 12,
  '0x70faa28a6b8d6829a4b1e649d26ec9a2a39ba413': 12,
  '0x96fc4553a00c117c5b0bed950dd625d1c16dc894': 12,
  '0xd24400ae8bfebb18ca49be86258a3c749cf46853': 12
};

export default function connect() {
  const ledgerService = new LedgerService();
  const socket = getSocket();
  const asyncTasks = [];

  function emitNewBlock(block) {
    try {
      socket.emit('action', {
        type: 'NEW_ETHEREUM_BLOCK',
        payload: { hash: block.hash, transactions: block.transactions }
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  function createDepositRecord(userId, amount, txnId) {
    return ledgerService.userDeposit(userId, amount, txnId, CURRENCY.ETH);
  }

  function createDepositRecordForEachAddressTransaction(userId, addressToTransactionsInfoMap) {
    addressToTransactionsInfoMap[address].forEach(({ amount, txnId }) => {
      console.log('DEPOSIT:', userId, amount, txnId, CURRENCY.ETH);
      asyncTasks.push(() => createDepositRecord(userId, amount, txnId));
    });
  }

  function handleBlock(block) {
    emitNewBlock(block);

    const addressToTransactionsInfoMap = getTransactionIdsAddresses(block.transactions);

    Object.keys(addressToTransactionsInfoMap).forEach(address => {
      if (addressesToUsersMap[address]) {
        const userId = addressesToUsersMap[address];
        createDepositRecordForEachAddressTransaction(userId, addressToTransactionsInfoMap);
        // addressToTransactionsInfoMap[address].forEach(({ amount, txnId }) => {
        //   console.log('DEPOSIT:', userId, amount, txnId, CURRENCY.ETH);
        //   tasks.push(() => {
        //     ledgerService.userDeposit(userId, amount, txnId, CURRENCY.ETH);
        //   });
        // });
      }
    });


    parallelLimit(asyncTasks, 1, (err) => {
      console.log(err);
    })
  }

  ethrpc.connect(connectionConfiguration, function(err) {
    if (err) {
      console.error('Failed to connect to Ethereum node.', err);
    } else {
      console.log('Connected to Ethereum node!');
      const blockStream = ethrpc.getBlockStream();

      // ethrpc.newFilter({ address: '0x1c3f580daeaac2f540c998c8ae3e4b18440f7c45'}, (resultOrError) => {
      //   console.log('resultOrError', resultOrError);
      // })
      const onBlockAddedSubscriptionToken = blockStream.subscribeToOnBlockAdded(block => {

        handleBlock(block);

        // const socket = getSocket();
        // socket.emit('action', {
        //   type: 'NEW_ETHEREUM_BLOCK',
        //   payload: { hash: block.hash, transactions: block.transactions }
        // });
        // console.log('Ether: NEW BLOCK', block.hash);
        //
        // const addressToTransactionInfoMap = getTransactionIdsAddresses(block.transactions);
        //
        // const tasks = [];
        //
        // Object.keys(addressToTransactionInfoMap).forEach(address => {
        //   if (addressesToUsersMap[address]) {
        //     const userId = addressesToUsersMap[address];
        //     addressToTransactionInfoMap[address].forEach(({ amount, txnId }) => {
        //       console.log('DEPOSIT:', userId, amount, txnId, CURRENCY.ETH);
        //       tasks.push(() => {
        //         ledgerService.userDeposit(userId, amount, txnId, CURRENCY.ETH);
        //       });
        //     });
        //   }
        // });
        //
        //
        // parallelLimit(tasks, 1, (err) => {
        //   console.log(err);
        // })
        // console.log('addresses for txns', addressToTransactionInfoMap);
      });
    }
  });
}

function getTransactionIdsAddresses(txnIds) {
  const addressToAmountLists = {};

  for (let i = 0; i < txnIds.length; i++) {
    const txnId = txnIds[i];
    const txnDetails = ethrpc.getTransactionByHash(txnId);
    if (txnDetails.to) {
      // Handle Multiple Txns to the same address
      const txnInfo = { amount: parseInt(txnDetails.value, 16), txnId };
      if (addressToAmountLists[txnDetails.to]) {
        addressToAmountLists[txnDetails.to].push(txnInfo);
      } else {
        addressToAmountLists[txnDetails.to] = [txnInfo];
      }
    }
  }

  return addressToAmountLists;
}
