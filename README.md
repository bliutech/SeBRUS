# SeBRUS: Crowdsourced Dataset Security with Blockchain
Repository for the Blockchain for Social Good project for the Governor's School of Engineering and Technology 2023.


## Explanation
This git comprises the physical build associated with our GSET research.

  This is SeBRUS (pronounced cerberus without the 'r'). It comprises our experimentation and coding using blockchain to ensure the security of crowdsourced contributions to machine learning datasets. SeBRUS, or Secure Blockchain Regularization Upload System, is built to allow for simple and secure machine learning dataset contribution. 

The paper is linked here: []


## Abstract
In the face of increasingly omnipotent machine learning systems, sufficient defense mechanisms have not been developed to neutralize the threat of data poisoning attacks. The decentralized nature of blockchain offers exciting solutions to this problem. The aim of this research was to investigate the deployment of Ethereum smart contracts to facilitate  comprehensive systems, foster statistical diversity, and ensure the security of crowdsourced data. The novel voting networks and poisoned data detection systems demonstrate the efficacy of a lightweight approach to detection schemes. Upon comparison  to currently implemented data collection defense systems, the developed application showed advantages in irreversibility, traceability, and public availability. The framework’s threat model is outlined to understand its contributions and limitations regarding secure crowdsourced data collection. This solution proposes a comprehensive and holistic method to attenuate the damage caused by various adversaries. 


### Required Installs
Metamask [https://metamask.io/]

Ganache [https://www.npmjs.com/package/truffle]

Python 3.0 + PIP
Node.js + NPM


## Starting the System
Set up the blockchain. Start running Ganache and connect Metamask to the blockchain and add the private key from one of the wallets (just not the first one, this is reserved for deploying contracts with Truffle).

Run the Server
```bash
cd server
virtualenv venv --python=3.10
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Deploy the Smart Contracts

```
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

## Authors
- Chloe Lee
- Rebekah Wang
- Cy Rosenberg
- Anusha Iyer
- Trisha Reddy
- Benson Liu (mentor)
