var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
global._bitcore = undefined;
var bitcore = require('bitcore-lib');
var BufferReader = bitcore.encoding.BufferReader;
var Block = bitcore.Block;
var BlockHeader = bitcore.BlockHeader;
var http = require("http");
var server = http.createServer();
server.listen(8099);
var io = require("socket.io").listen(server);
function MyService(options) {
  EventEmitter.call(this);
  this.node = options.node;
  this.node.services.bitcoind.on('tx', this.transactionHandler.bind(this));
  this.node.services.bitcoind.on('block', this.blockHandler.bind(this));

  io.on("connection",function(socket){
    console.warn("User-Client Connected!");
    io.emit("message", {test: "woot!"});
  });
}
inherits(MyService, EventEmitter);

MyService.dependencies = ['bitcoind'];


MyService.prototype.blockHandler = function(blockBuffer) {
  var blockHash = blockBuffer.toString('hex');
  try {
    this.node.services.bitcoind.getBlock(blockHash, function(err, block){
      block.transactions.forEach(function(transactionObj) {
        // get a bitcore object of the transaction (as above)
        this.node.services.bitcoind.getTransaction(transactionObj.hash, function(err, transaction) {
          console.log('getTransaction', transaction);
        });

        //  retrieve the transaction with input values, fees, spent and block info
        this.node.services.bitcoind.getDetailedTransaction(transactionObj.hash, function(err, txn) {
          console.log('getDetailedTransaction: ', txn);
        });
      }.bind(this));
      io.emit('new-block', block.transactions);
    }.bind(this));
  } catch(error) {
    console.log(error);
  }
  console.log('** New BlockHash ** ', blockHash);
};

MyService.prototype.transactionHandler = function(txBuffer) {
  var self = this;

  var tx = bitcore.Transaction().fromBuffer(txBuffer);
  //console.warn(tx);
};

MyService.prototype.stop = function(callback) {
  setImmediate(callback);
};

MyService.prototype.getAPIMethods = function() {
  return [];
};

MyService.prototype.getPublishEvents = function() {
  return [];
};

module.exports = MyService;