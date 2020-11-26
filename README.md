<img align="left" width="65" right="65" src="https://i.imgur.com/1itG47K.png">

# TraceMyMed (a blockchain project)

[TOC]

## Description

This project is a 2nd-year project for the elective course "Introduction to Blockchain"  at CentraleSupélec.

It aims to implement a secure blockchain system that could be used to trace products in the supply chain industry. It allows to:

- Append transactions in the blockchain using *Proof of Work*
- Identify transactions with *elliptic curve* signature
- Check if the current chain is valid
- Solve conflicts by replacing the current chain with the longest one in the network.



It also features a frontend *flask* that allows the client to easily:

- Create wallets (a wallet is a container for private and public keys)
- Add new transactions while checking that they are possible
  - NB: To add initial items in the blockchain process, use the admin keys.



## Dependencies

- Works with `Python 3.8.5`



## Installation

### Backend
Enter the shell terminal and run the following prompt to install the required modules:

```shell
pip install -r requirements.txt
```

or if you prefer Conda:

```shell
conda env create --file requirements-conda.txt
```

### Frontend

First, move to the project folder using `cd`.

Then run the following commands in yout favorite shell:

```bash
conda install nodejs
npm install -g @angular/cli
cd ./Client/blockchainFrontend
npm install
```



## Usage

1. Move to the project folder using `cd`.

2. Start a blockchain node:

   ```bash
   python ./Blockchain/blockchain.py
   ```
3. Start the client app:

   * Run the *flask* backend server in a separate shell:
     ```
     python ./Client/crypto.py
     ```

   * Run the *angular* frontend server on another shell:

     ```
     ng serve -o
     ```

   Your default browser should open the webpage automatically.

   Otherwise, enter the following url: http://localhost:4200/.



## Testing

(à compléter)
