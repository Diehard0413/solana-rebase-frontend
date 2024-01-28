import {Inject, Injectable} from '@angular/core';
import {WEB3} from '../../core/web3';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

import Web3 from 'web3';

import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { environment } from 'src/environments/environment';
import { toBn, fromBn } from "evm-bn";

const tokenBV = require('../../contracts/token.json');
const stakingAbi = require('../../contracts/staking.json');
const bondAbi = require('../../contracts/bonds.json');

export interface Options {
  interval: number;
  blocksToWait: number;
}

@Injectable({
  providedIn: 'root'
})

export class ContractService {
  web3Modal;
  web3js;
  wallet;
  provider;
  accounts;
  balance;
  transactionsBlocks: BehaviorSubject<any[]>;
  DEFAULT_INTERVAL = 500;
  DEFAULT_BLOCKS_TO_WAIT = 1;

  constructor(@Inject(WEB3) private web3: Web3) {
    this.transactionsBlocks = new BehaviorSubject([]);
    this.provider = new Web3.providers.HttpProvider(
      'https://eth.llamarpc.com/'
    );
    this.web3js =    new Web3(this.provider);
    this.accounts =  this.web3js.eth.getAccounts();
    const providerOptions = {
      injected: {
        display: {          
          name: "Injected",
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
      walletconnect: {
        display: {
          name: "WalletConnect",
          description: "Connect with Wallet Connect"
        },
        package: WalletConnectProvider,
        options: {
          infuraId: '6fd17c7c59b74f07b60710fc50b4b1c8',
          rpc: {
            1: "https://eth.llamarpc.com/"
          },
          networkParams: {
            host: "https://eth.llamarpc.com/",
            name: '',
            chainId: 1,
            networkId: 1
          },
        }
      }
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(199, 199, 199)",
        main: "rgb(16, 26, 32)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(207, 60, 78,1)"
      }
    });
  }


  async connectAccount(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.provider = await this.web3Modal.connect();
      this.web3js =   await new Web3(this.provider);
      this.accounts = await this.web3js.eth.getAccounts();
      window.ethereum = this.provider;
      resolve(this.accounts[0]);
    });
  }

  async createWallet(password: any, username?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.wallet = this.web3js.eth.accounts.create();
      this.wallet.keyName = username;
      this.web3js.eth.accounts.wallet.add({
        privateKey: this.wallet.privateKey,
        address: this.wallet.address
      });
      const encrypt = this.wallet.encrypt(password);
      this.web3js.eth.accounts.wallet.save(password);

      resolve({wallet: this.wallet, encryption: encrypt});
    });
  }

  async getWallet() {
    return await this.web3js.eth.accounts.wallet;
  }

  async decryptWallet(encrypt, password) {
    return await this.web3js.eth.accounts.wallet.decrypt([encrypt], password);
  }

  async loadWallet(password: any, keyName?: string) {
    return await this.web3js.eth.accounts.wallet.load(password);
  }

  isValidAddress(address): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const isValid: boolean = await this.web3js.utils.isAddress(address);
      resolve(isValid);
    });
  }

  async cullinTransaction(amount, from, to, pk) {
    const rawTransaction = {
      from: from,
      to: to,
      value: this.web3js.utils.toHex(this.web3js.utils.toWei(amount, 'ether')),
      gas: 2000,
      chainId: 97
    };
  }


  async onDisconnect() {

    if (this.provider.close) {
      await this.provider.close();
      await this.web3Modal.clearCachedProvider();
    }
    this.provider = null;
    this.balance = null;
    this.accounts = null;

  }

  async getAddressBUSD(abi, contract, wallet): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractAbi(contract, abi).then((response: any) => {
        response.contract.methods.balanceOf(wallet).call((error, balance) => {
          if (error) {
            reject(error);
          }
          resolve(this.web3js.utils.fromWei(balance, 'ether'));
        });
      });
    });
  }

  async getWalletBalance(wallet): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const bnb = await this.web3js.eth.getBalance(wallet);
      resolve(this.web3js.utils.fromWei(bnb));
    });
  }

  async getTokenWalletBalance(address?: any, contract?: any, abi?:any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('contract', contract);
      this.contractAbi(contract, tokenBV).then(async (response: any) => {
        const context: any = response.contract;
        context.setProvider(this.provider);
       try {
        let balance;
        try {balance = await context.methods.balanceOf(address).call()} catch {balance = 0};
        if(balance) {
          const format = this.web3js.utils.fromWei(balance);
          resolve(Number(format).toFixed(4));
        }else{
          reject();
        }
       } catch {
        reject();
       }
      });
    });
  }
  async getUSDCBalance(address?: any, contract?: any, abi?:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contractAbi(contract, tokenBV).then(async (response: any) => {
        const context: any = response.contract;
        context.setProvider(this.provider);
        try {
          let balance;
          try {
            balance = await context.methods.balanceOf(address).call();
          } catch {
            balance = 0;
          }
          if (balance) {
            const format = (balance / 1e6).toFixed(6); // Adjusted for 6 decimal places
            resolve(format);
          } else {
            reject();
          }
        } catch {
          reject();
        }
      });
    });
  }
  
  async asyncSend(contract?: any, abi?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        this.contractAbi(environment.contract, tokenBV).then(async (response: any) => {
          const context: any = response.contract;
          window.ethereum.contract  = await context;
          this.accounts = await this.web3js.eth.getAccounts();
          await window.ethereum.contract.methods.claim().send({from: this.accounts[0]})
          .then(response => {
            if(response) {
            resolve(response);
          }
          })
          .catch((error) => {
            reject(error.message);
          });
        });
    });
  }


  async getBaseInfo(contract:any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.contractAbi(contract, tokenBV).then(async (response: any) => {
        const context: any = response.contract;
        const name = await context.methods.name().call();
        const symbol = await context.methods.symbol().call();
        const initSupply = await context.methods.initSupply().call();
        const totalSupply = await context.methods.totalSupply().call();
        const rebaseRatio = await context.methods.rebaseRatio().call();
        const LPpool = await context.methods.LPpool().call();
        const staked = await context.methods.balanceOf(environment.staking).call();
        resolve({
          name: name, 
          symbol: symbol, 
          address: contract, 
          initSupply: Number(this.web3js.utils.fromWei(initSupply, 'ether')),
          totalSupply: Number(this.web3js.utils.fromWei(totalSupply.toString(), 'ether')),
          staked: Number(this.web3js.utils.fromWei(staked.toString(), 'ether')),
          rebaseRatio: rebaseRatio,
          LPpoolAddress: LPpool
        });
      });
    });
  }

  async calculateTVL(contract: any, priceUsd) {
    return new Promise(async (resolve, reject) => {
    this.contractAbi(contract, tokenBV).then(async (response: any) => {
     
      try{
          let contractAddresses = ['0x4b398fCd7841412610b653B34E89c9b19a42EbFc', '0xB6e0B8f068efCb07Ed724881699f3253401E312E'];
          const context: any = response.contract;
          let totalTVLInUSD = 0;

          for (const address of contractAddresses) {
              const balance = await context.methods.balanceOf(address).call();
              const balanceInUSD = (balance / Math.pow(10, 18)) * priceUsd;
              totalTVLInUSD += balanceInUSD;
          }

          resolve(totalTVLInUSD);
        } catch{}
      })
    });
   
}

  async getPoolInfo(contract?: any, poolId?: any): Promise<any> {
    try {
      const response: any = await this.contractAbi(contract, stakingAbi);
      const context = response.contract;
      const poolInfo = await context.methods.poolInfo(poolId).call();
      const totalburn = await context.methods.totalburn().call();
  
      return {
        lpToken: poolInfo.lpToken,
        totalTokens: Number(this.web3js.utils.fromWei(poolInfo.totalToken.toString(), 'ether')).toFixed(4),
        totalburn: Number(this.web3js.utils.fromWei(totalburn.toString(), 'ether')).toFixed(4), 
        allocationPoints: poolInfo.allocPoint.toString(),
        lastRewardTime: new Date(poolInfo.lastRewardTime * 1000).toLocaleString(),
        accBTCPerShare: (poolInfo.accBTCPerShare / 1e8).toLocaleString(),
        accUSDCPerShare: (poolInfo.accUSDCPerShare / 1e6).toLocaleString()
      };
      
    } catch (error) {
      console.error('Error fetching pool info:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async getPoolUserInfo(contract?: any, poolId?: any, address?: any): Promise<any> {
    try {
      const response:any = await this.contractAbi(contract, stakingAbi);
      const context = response.contract;
      const userInfo = await context.methods.userInfo(poolId, address).call();
      const pendingBTC = await context.methods.pendingBTC(poolId, address).call();
      const pendingUSDC = await context.methods.pendingUSDC(poolId, address).call();
      const lastDepositTime = Number(userInfo.lastDepositTime); // Convert to number
      const feeThreshold = lastDepositTime + (2 * 24 * 60 * 60);
      const currentTime = Math.floor(Date.now() / 1000);
      let fee = 0;
      if (currentTime < feeThreshold) { fee = 10;}

      // const feeThresholdDate = new Date(feeThreshold * 1000);

      // const formattedDate = feeThresholdDate.toISOString().replace('T', ' ').substring(0, 19);
      const feeThresholdDate = new Date(feeThreshold * 1000); // Convert to milliseconds
      let feeThresholdFormatted = feeThresholdDate.toLocaleString(); // Convert to a readable forma

      if(feeThresholdFormatted == '03/01/1970, 01:00:00') feeThresholdFormatted = '0';


      return {
        amount: Number(this.web3js.utils.fromWei(userInfo.amount.toString(), 'ether')).toFixed(4),
        rewardDebt: Number(this.web3js.utils.fromWei(userInfo.rewardDebt.toString(), 'ether')).toFixed(4),
        USDCrewardDebt: (userInfo.USDCrewardDebt / 1e6).toLocaleString(),
        lastDepositTime: new Date(userInfo.lastDepositTime * 1000).toLocaleString(),
        pendingUSDC: (pendingUSDC / 1e6).toLocaleString(),
        pendingBTC:  Number(this.web3js.utils.fromWei(pendingBTC.toString(), 'ether')).toFixed(4),
        fee: fee,
        feeThreshold: feeThresholdFormatted
      };
      
    } catch (error) {
      console.error('Error fetching user pool info:', error);
      throw error;
    }
  }
  
  async getSatkingAPR(contract?: any, poolId?: any): Promise<any> {
    try {
      const response:any = await this.contractAbi(contract, stakingAbi);
      const context = response.contract;
      const poolInfo = await context.methods.poolInfo(poolId).call();
      const BTCPerSecond = await context.methods.BTCPerSecond().call();
      const totalStaked = poolInfo.totalToken;
      
      const secondsInYear = 365 * 24 * 60 * 60;
      const annualRewards = BTCPerSecond * secondsInYear;
      const apr = (annualRewards / totalStaked) * 100;


      const secondsInDay = 24 * 60 * 60;
      const dailyRewards = BTCPerSecond * secondsInDay;
      const dailyApr = (dailyRewards / totalStaked) * 100;

      return {
        apr: Number(apr).toFixed(2),
        dailyapr: Number(dailyApr).toFixed(2)
      }
      
    } catch (error) {
      console.error('Error fetching user pool info:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  async getStakingAPYLP(contract?: any, poolId?: any, price?: any): Promise<any> {
    try {
      const response:any = await this.contractAbi(contract, stakingAbi);
      const context = response.contract;
      const poolInfo = await context.methods.poolInfo(poolId).call();
      const BTCPerSecond = await context.methods.BTCPerSecond().call();
      const totalStaked = await poolInfo.totalToken * price;

      const secondsInYear = 365 * 24 * 60 * 60;
      const annualRewards = BTCPerSecond * secondsInYear;
      const apr = (annualRewards / totalStaked) * 100;

      const secondsInDay = 24 * 60 * 60;
      const dailyRewards = BTCPerSecond * secondsInDay;
      const dailyApr = (dailyRewards / totalStaked) * 100;

      return {
        apr: Number(apr).toFixed(2),
        dailyapr: Number(dailyApr).toFixed(2)
      }
      
    } catch (error) {
      console.error('Error fetching user pool info:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
  
  
  

  async getBondInfo(contract?: any): Promise<any> {
    try {
      const response: any = await this.contractAbi(contract, bondAbi);
      const context = response.contract;
      const bondPrice = await context.methods.bondPrice().call();
      const remainingBonds = await context.methods.remainingbondableTokens().call();

      return {
        bondPrice: (Number(bondPrice) / 1000),
        remainingBonds: Number(this.web3js.utils.fromWei(remainingBonds.toString(), 'ether')).toFixed(4),
        discount: "0",
      };

    } catch (error) {
      console.error('Error fetching pool info:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }


  
  async bondTokens(contract: any, address: any, amount?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.contractAbi(contract, bondAbi).then(async (response: any) => {
        const context: any = response.contract;
        window.ethereum.contract  = await context;
        var decimals = 6;
        var factor = Math.pow(10, decimals);
        var amountInSmallestUnit = (amount * factor).toString(); // Convert to the smallest unit and then to a string
        var _amount = this.web3js.utils.toHex(this.web3js.utils.toBN(amountInSmallestUnit));

        await window.ethereum.contract.methods.bond(_amount).send({from: address})
        .then(response => {
          if(response) {
          resolve(response);
        }
        })
        .catch((error) => {
          reject(error.message);
        });
      });
    });
  }

  async bondLPTokens(contract: any, address: any, amount?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.contractAbi(contract, bondAbi).then(async (response: any) => {
        const context: any = response.contract;
        window.ethereum.contract  = await context;
        var decimals = 18;
        var factor = Math.pow(10, decimals);
        var amountInSmallestUnit = (amount * factor).toString(); // Convert to the smallest unit and then to a string
        var _amount = this.web3js.utils.toHex(this.web3js.utils.toBN(amountInSmallestUnit));

        await window.ethereum.contract.methods.bond(_amount).send({from: address})
        .then(response => {
          if(response) {
          resolve(response);
        }
        })
        .catch((error) => {
          reject(error.message);
        });
      });
    });
  }


  async bondClaim(contract: any, address: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.contractAbi(contract, bondAbi).then(async (response: any) => {
        const context: any = response.contract;
        window.ethereum.contract  = await context;
        await window.ethereum.contract.methods.claim().send({from: address})
        .then(response => {
          if(response) {
          resolve(response);
        }
        })
        .catch((error) => {
          reject(error.message);
        });
      });
    });
  }

  async approveBond(from, to, amount, contract?: any, abi?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        this.contractAbi(contract, tokenBV).then(async (response: any) => {
          const context: any = response.contract;
          window.ethereum.contract  = await context;
          var _amount = this.web3js.utils.toHex(this.web3js.utils.toBN(amount).mul(this.web3js.utils.toBN(10**6)));

          await window.ethereum.contract.methods.approve(to, _amount).send({from: from})
          .then(response => {
            if(response) {
            resolve(response);
          }
          })
          .catch((error) => {
            reject(error.message);
          });
        });
    });
  }

  async fetchBondDetails(contract?: any, address?: string): Promise<any> {
    try {
      const response: any = await this.contractAbi(contract, bondAbi);
      const context = response.contract;
      const userInfo = await context.methods.userInfo(address).call();
      const remainingTimeInSeconds = await context.methods.remainingVestedTime(address).call();
      const claimAmount = await context.methods.canclaimTokens(address).call();

      const bondedAmount = Number(this.web3js.utils.fromWei(userInfo.totalbonded, 'ether')).toFixed(4);
      const btcVested = bondedAmount;
      let vestingRemaining;
      if (remainingTimeInSeconds > 0) {
        const currentTime = new Date();
        const vestingEndDate = new Date(currentTime.getTime() + remainingTimeInSeconds * 1000);
        vestingRemaining = vestingEndDate.toLocaleString();
      }
      return {
        bondedAmount: `${bondedAmount}`,
        btcVested: `${btcVested}`,
        vestingRemaining: `${vestingRemaining}`,
        claimAmount: Number(this.web3js.utils.fromWei(claimAmount, 'ether')).toFixed(4)
      };
    } catch (error) {
      console.error('Error fetching bond details:', error);
      return null;
    }
  }

  async approveStake(from, to, amount, contract?: any, abi?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        this.contractAbi(contract, tokenBV).then(async (response: any) => {
          const context: any = response.contract;
          window.ethereum.contract  = await context;
          var amountToBuyWith = await this.web3js.utils.toHex(this.web3js.utils.toWei(String(amount), 'ether'));

          await window.ethereum.contract.methods.approve(to, amountToBuyWith).send({from: from})
          .then(response => {
            if(response) {
            resolve(response);
          }
          })
          .catch((error) => {
            reject(error.message);
          });
        });
    });
  }

  async claimTokens(method, address, contract?: any, abi?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.contractAbi(contract, stakingAbi).then(async (response: any) => {
        const context: any = response.contract;
        
        window.ethereum.contract  = await context;
         await window.ethereum.contract.methods.claim().send({from: address})
        .on('error', function(error){reject(error)})
        .once('receipt', function(receipt){ resolve(receipt) });
      });
    });
  }

async stake(contract, address, pid?: any, amount?: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    this.contractAbi(contract, stakingAbi).then(async (response: any) => {
      const context: any = response.contract;
      window.ethereum.contract  = await context;
      var _amount = await this.web3js.utils.toHex(this.web3js.utils.toWei(String(amount), 'ether'));
      await window.ethereum.contract.methods.deposit(pid, _amount).send({from: address})
      .then(response => {
        if(response) {
        resolve(response);
      }
      })
      .catch((error) => {
        reject(error.message);
      });
    });
  });
}

async usntake(contract, address, pid?: any, amount?: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    this.contractAbi(contract, stakingAbi).then(async (response: any) => {
      const context: any = response.contract;
      window.ethereum.contract  = await context;
      var _amount = await this.web3js.utils.toHex(this.web3js.utils.toWei(String(amount), 'ether'));
      await window.ethereum.contract.methods.withdraw(pid, _amount).send({from: address})
      .then(response => {
        if(response) {
        resolve(response);
      }
      })
      .catch((error) => {
        reject(error.message);
      });
    });
  });
}


async humanize(contract, amount, decimals) {
  let format = fromBn(amount, Number(decimals));
  return format;
}

  shortenWallet(wallet) {
    let shortenAddress = wallet;
    const first = shortenAddress.substring(0, 4);
    const last = shortenAddress.substr(shortenAddress.length - 4);
    return `${first}....${last}`;
  }

  async formWeiConvert(balance): Promise<any> {
    return new Promise(async (resolve, reject) => {
       resolve(this.web3js.utils.fromWei(balance));
    });
  }

  async getAccount() {
    this.accounts = await this.web3js.eth.getAccounts();
    if (this.accounts) {
      return this.accounts;
    }
  }

  async accountInfo(accounts) {
    const initialvalue = await this.web3js.eth.getBalance(accounts);
    this.balance = this.web3js.utils.fromWei(initialvalue, 'ether');
    return this.balance;
  }

  async getAccountInfo(account): Promise<any> {
    const initialvalue = await this.web3js.eth.getBalance(account);
    return this.web3js.utils.fromWei(initialvalue, 'ether'); // returns balance.
  }

  async getTransactions(): Promise<any> {
    const lastBlock = await this.web3js.eth.getBlock('latest');
    const transactionsBlocks = [];

    for (let i = 0; i < lastBlock.number + 1; i++) {
      const block = await this.web3js.eth.getBlock(i);
      const transaction = block.transactions;
      const tx = await this.web3js.eth.getTransaction(transaction);
      const receipts = await this.web3js.eth.getTransactionReceipt(transaction);
      if (tx) {
        transactionsBlocks.push({transactions: tx, receipt: receipts});
      }
    }

    return new Promise((resolve, reject) => {
      resolve(transactionsBlocks);
    });
  }

  async contractAbi(address, abi) {
    if(abi.abi) {
      abi = abi.abi;
    }
    return new Promise((resolve, reject) => {
      var Contract: any = new this.web3js.eth.Contract(abi, address);
      resolve({contract: Contract});
    });
  }

  async contractAbi2(address, abi) {
    return new Promise((resolve, reject) => {
      var Contract: any = new this.web3js.eth.Contract(abi, address);
      resolve({contract: Contract});
    });
  }

  async contractAbiGasAdjust(address, abi) {
    return new Promise(async (resolve, reject) => {
      this.accounts =  this.web3js.eth.getAccounts();
      var count = await this.web3js.eth.getTransactionCount(address);
      var gasPrice =  await this.web3js.eth.getGasPrice();
      var Contract: any = new this.web3js.eth.Contract(abi, address, {
        from: this.accounts[0],
        gasPrice: gasPrice,
        gasLimit: this.web3js.utils.toHex(290000),
        nonce: count
    });
      resolve({contract: Contract});
    });
  }

  async rpc(func) {
    while (true) {
      try {
        return await func.call();
      } catch (error) {
        if (!error.message.startsWith("Invalid JSON RPC response"))
          throw error;
      }
    }
  }

  setContractEventListener(contract: any): Promise<any> {
    return new Promise(((resolve, reject) => {
      contract.events.allEvents(() => {
      }).on('data', (event) => {
        resolve(event);
      }).on('error', (error) => {
        reject(error);
      });
    }));
  }

  getReceipt(hash, cb): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.web3js.eth.getTransactionReceipt(hash, function (err, receipt) {
        if (err) {
        }
        if (receipt !== null) {
          if (cb) {
            cb(receipt);
            resolve(receipt);
          }
        } else {
          window.setTimeout(function () {
            this.getReceipt(hash, cb);
          }, 1000);
        }
      });
    });
  }

  setDecimals( number, decimals ){
    number = number.toString();
    let numberAbs = number.split('.')[0]
    let numberDecimals = number.split('.')[1] ? number.split('.')[1] : '';
    while( numberDecimals.length < decimals ){
        numberDecimals += "0";
    }
    return numberAbs + numberDecimals;
}


  failure(message: string) {
    // const snackbarRef = this.snackbar.open(message);
    // snackbarRef.dismiss()
  }

  success() {
    // const snackbarRef = this.snackbar.open('Transaction complete successfully');
    // snackbarRef.dismiss()
  }
}
