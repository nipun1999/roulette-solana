const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account
} = require("@solana/web3.js");
const web3 = require("@solana/web3.js")

const getWalletBalance = async (publicKey) => {
  try {
    const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
    const walletBalance = await connection.getBalance(
      new PublicKey(publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(`Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async (publicKey) => {
  try {
      const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
      console.log(`-- Airdropping 2 SOL --`)
      const fromAirDropSignature = await connection.requestAirdrop(
          new PublicKey(publicKey),
          2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
      console.log(err);
  }
};

const transferSOL=async (from,to,transferAmt)=>{
  try{
      const connection=new web3.Connection(web3.clusterApiUrl("testnet"),"confirmed");
      const transaction=new web3.Transaction().add(
          web3.SystemProgram.transfer({
              fromPubkey:new web3.PublicKey(from.publicKey.toString()),
              toPubkey:new web3.PublicKey(to.publicKey.toString()),
              lamports:transferAmt*web3.LAMPORTS_PER_SOL
          })
      )
      const signature=await web3.sendAndConfirmTransaction(
          connection,
          transaction,
          [from]
      )
      return signature;
  }catch(err){
      console.log(err);
  }
}

module.exports = {
  getWalletBalance,
  airDropSol,
  transferSOL
}