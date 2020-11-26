# projet-blockchain

[TOC]

## Description

This project is a 2nd-year project for the elective course "Introduction to Blockchain"  at CentraleSupélec.

It aims to implement a secure blockchain system that could be used to trace products in the supply chain industry. It allows to:

- Append transactions in the blockchain using *Proof of Work*
- Identify transactions with *elliptic curve* signature
- Check if the current chain is valid
- Solve conflicts by replacing the current chain with the longest one in the network.



It also features a frontend *flask* that allows the client to easily:

- Add initial items in the blockchain process
- Add new transactions while checking that they are possible
- Check the blockchain's validity
- [to complete]



## Dependencies

- Works with `Python 3.8.5`



## Installation

Enter the shell terminal and run the following prompt to install the required modules:

```shell
pip install -r requirements.txt
```

or if you prefer Conda:

```shell
conda env create --file requirements-conda.txt
```



## Usage

1. To start ....