const SHA256 = require('crypto-js/sha256');

class Block{
    
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    /*This calculate the hash value of each block
    */
    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }


}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()]; //This is an array of blocks
        this.difficulty = 2;
    }
    /*This create the genesis block, i.e. the initial block of the blockchain
    */
    createGenesisBlock(){
        return new Block(0, "01/01/1997", "Genesis Block", "0" );
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }


    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }



     

}

let phemCoin = new BlockChain();
phemCoin.addBlock(new Block(1, "01/08/1995", {amount : 4}));
phemCoin.addBlock(new Block(2, "08/08/1995", {amount : 7}));

console.log(phemCoin);