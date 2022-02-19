const {
  Keypair,
} = require("@solana/web3.js");

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function totalAmtToBePaid(sol){
  return sol;
}

function getReturnAmount(amount, stakeRatio){
  return amount*stakeRatio;
}

async function initTreasuryWallet(){
  const secretKey = new Uint8Array([
    116,  55,  43, 239, 41, 158, 218,  43,  55,  84,  10,
     41,  20,  48, 152, 91,  94, 121, 166, 135, 248,  61,
    159, 204, 246,  97, 21, 159, 103, 180, 198, 206, 149,
    112, 128, 143, 214,  2, 192,  88, 111,  91, 251, 161,
     77,  74,  91,   0, 66, 188,  45, 158,  97, 166, 169,
     45, 205,  24,  66, 57, 166,   5, 212,  29
  ])
  const walletKeyPair = await Keypair.fromSecretKey(secretKey);
  return walletKeyPair;
}

async function initPublicWallet(){
  const secretKey = new Uint8Array([
    219, 141, 163,  55, 114, 114,   6, 220,  13, 253,  95,
    106, 188,  27,  99, 111, 253, 129,   2, 162,  30, 113,
     18,  80,  92, 215, 146,  31,   3, 226, 187, 107, 219,
    119, 117, 244,  35, 148, 223, 168, 220,   6, 112, 214,
     90,  44,  95, 235, 121,  39, 237, 165,   6,   2, 184,
    137,  81, 123, 146, 216,  43, 198, 144, 218
  ])
  const walletKeyPair = await Keypair.fromSecretKey(secretKey);
  return walletKeyPair;
}

// const test = randomNumber(1,5);
// console.log(test)

module.exports = {
  randomNumber, 
  totalAmtToBePaid, 
  getReturnAmount,
  initTreasuryWallet,
  initPublicWallet
};