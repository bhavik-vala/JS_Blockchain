// Begining with writing Blockchain code
// First off, Creating a block class
// then, writing a blockchain class that will begin producing blocks
// validating new blocks


const SHA256 = require('crypto-js/sha256');

class Block{
	
	constructor(index, timestamp, txns, previousHash) {
		this.index = index;
		this.timestamp = timestamp;
		this.txns = txns;
		this.previousHash = previousHash;
		this.nonce = 0;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce).toString();

	}

	mineBlock(difficulty) {
		let count = 0;
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce ++;
			this.hash = this.calculateHash();

		}

		console.log("Blocked sucessfully hashed: (" +count+" iterations).Hash: " + this.hash);


	}

}

class Blockchain {

	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 3;

	}

	createGenesisBlock(){
		return new Block (0, "15/01/2020", "Genesis Block", "0");
	}

	getlatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getlatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	isChainValid (){
		for (let i = 1; this.chain.length; i++){
			const currentBlock = this.chain [i];
			const previousBlock = this.chain[i - 1];

			if(currentBlock.hash !== currentBlock.calculateHash() ){
				return false;
			}

			if(currentblock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}
}



const bitcoin = new Blockchain();

console.log("Starting to mine a block.......");

bitcoin.addBlock( new Block (0, "15/01/2020", {
	amount: 10
}
));

bitcoin.addBlock( new Block (0, "16/01/2020", {
	amount: 20
}
));

console.log(JSON.stringify (bitcoin, null, 4));
