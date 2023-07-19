# gset23bsg
Repository for the Blockchain for Social Good project for GSET 2023.

## Contributing
The following workflow should be used when contributing to this repository.

```bash
git clone https://github.com/bliutech/gset23bsg.git
cd gset23bsg
git checkout -b <wip-feature-name>
# Make changes
git add -A
git commit -m "Add a commit message"
git push origin <wip-feature-name>
# Open a pull request on GitHub and request a review
```

## Installation
This project is broken into three parts, `client`, `server`, and `blockchain`.

### Client
Run the following commands to install the dependencies and start the client. You should be able to view the client at http://localhost:3000 in your browser.

```bash
cd client
yarn install
yarn start
```

### Server
Run the following commands to install the dependencies and start the server. You should be be able to have the server running at http://localhost:5000.

```bash
cd server
virtualenv venv --python=3.10
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### Blockchain
Run the follow commands to deploy the smart contracts to the local blockchain.

```
cd blockchain
truffle compile
truffle migrate
python register.py
```

## Linting
This project supports CI/CD for linting. For the client application, it uses `prettier` for linting. To check if any formatting changes need to be made, run the following.

```
npm run check
```

To resolve any needed changes run
```
npm run fix
```

For the server application, it uses `black` for linting. To check if any formatting changes need to be made, run the following.

```
python -m black --check *.py */*.py
```

To resolve any needed changes run
```
python -m black *.py */*.py
```

## Authors
- Chloe Lee
- Rebekah Wang
- Cy Rosenberg
- Anusha Iyer
- Trisha Reddy
- Benson Liu (mentor)
