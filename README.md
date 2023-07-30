# SeBRUS: Crowdsourced Dataset Security with Blockchain
Repository for the Blockchain for Social Good project for the Governor's School of Engineering and Technology 2023.


## Explanation
This git comprises the physical build associated with our GSET research.

  This is SeBRUS (pronounced cerberus without the 'r'). It comprises our experimentation and coding using blockchain to ensure the security of crowdsourced contributions to machine learning datasets. SeBRUS, or Secure Blockchain Regularization Upload System, is built to allow for simple and secure machine learning dataset contribution. 

The paper is linked here: [https://drive.google.com/file/d/1DIrEjgSAHge_F-NTmSyuqiyDKQLja6ig/view?usp=sharing]


## Abstract
In the face of increasingly omnipotent machine learning systems, sufficient defense mechanisms have not been developed to neutralize the threat of data poisoning attacks. The decentralized nature of blockchain offers exciting solutions to this problem. The aim of this research was to investigate the deployment of Ethereum smart contracts to facilitate  comprehensive systems, foster statistical diversity, and ensure the security of crowdsourced data. The novel voting networks and poisoned data detection systems demonstrate the efficacy of a lightweight approach to detection schemes. Upon comparison  to currently implemented data collection defense systems, the developed application showed advantages in irreversibility, traceability, and public availability. The framework’s threat model is outlined to understand its contributions and limitations regarding secure crowdsourced data collection. This solution proposes a comprehensive and holistic method to attenuate the damage caused by various adversaries. 


### Required Installs
Metamask [https://metamask.io/]

Ganache [https://www.npmjs.com/package/truffle]

Python 3.0 + PIP

Node.js + NPM


## Starting the System

Make sure to start from scratch if the system has been started before. Delete test networks and accounts from MetaMask, the folder ```blockchain/build```, the folder ```server/abi```, and ```server/sqlite.db```.

Set up the blockchain. 

Start running a Quickstart workspace in Ganache. Under Contracts, link a truffle project (```truffle-config.js```) in the Workspace section, and then set the gas limit to 1000000000000000 under the Chain section. 

In MetaMask, manually create a new test network. Set any name for the network, and complete the following fields:

 * New RPC URL: HTTP://127.0.0.1:7545
 * Chain ID: 1337
 * Currency symbol: ETH

Import a new account in MetaMask. Under the Accounts section in Ganache, select an account. Do not select the first account (Index 0), this is reserved for deploying contracts with Truffle. Copy and paste the key (not the account address) into MetaMask.

Run the Server
```bash
cd server
virtualenv venv --python=3.10
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Deploy the Smart Contracts

```bash
cd blockchain
truffle compile
truffle migrate
python register.py
```

Run the Client
```bash
cd client
yarn install
yarn start
```

Go to http://localhost:3000/ to view the application.

Due to gas limits, uploaded images must be limited to a smaller size. Images from the MNIST (28x28) and CIFAR (32x32) datasets are suitable.

## Troubleshooting
When trying to run 
```virtualenv venv --python=3.10```, a ```zsh: command not found: virtualenv``` error may come up. If Anaconda is installed on your computer, you will have to run:
```bash
cd server
conda deactivate 
pip install virtualenv
virtualenv venv
source venv/bin/activate
```

## Authors
- Chloe Lee
- Rebekah Wang
- Cy Rosenberg
- Anusha Iyer
- Trisha Reddy
- Benson Liu (mentor)
