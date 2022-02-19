var figlet = require('figlet');
var inquirer = require('inquirer');

const { getReturnAmount, randomNumber, initTreasuryWallet,initPublicWallet } = require('./helper');
const { getWalletBalance, transferSOL } = require("./solana");

const questions = [
  {
    type: 'input',
    name: 'amount',
    message: "Enter the amount you want to stake ?",
  },
  {
    type: 'input',
    name: 'ratio',
    message: "What is the ratio of your staking ?",
    default() {
      return '2';
    },
  },
  {
    type: 'input',
    name: 'random_number',
    message: "Guess a random number from 1 to 5 included"
  },
];

async function main() {
  const treasuryWallet = await initTreasuryWallet();
  const userWallet = await initPublicWallet();
  await getWalletBalance(treasuryWallet.publicKey);
  await getWalletBalance(userWallet.publicKey);
  
  await figlet('Roulette Game !!', async function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    const answers = await inquirer.prompt(questions);
    handleInputs(answers,treasuryWallet,userWallet);
  });
} 

async function handleInputs(answers,treasuryWallet,userWallet) {
  if(answers.amount >= 2.5){
    console.log('Maximum 2.5 SOL can be staked only');
    return;
  }
  console.log(`Transferring money from user wallet to treasury`)
  await transferSOL(userWallet,treasuryWallet,answers.amount);
  const number = await randomNumber(1,5);
  console.log(`The roulette number is ${number}`)
  if(number === answers.random_number){
    const winAmount = getReturnAmount(answers.amount,answers.ratio)
    console.log(`User won ${winAmount} SOL.`)
    await transferSOL(treasuryWallet,userWallet,winAmount);
  }
}

main()
