from collections import namedtuple

from ellipticcurve.ecdsa import Ecdsa
from ellipticcurve.privateKey import PrivateKey

#Tuto, How to:
# Generate Keys
#privateKey = PrivateKey()
#publicKey = privateKey.publicKey()


# Generate Signature
#signature = Ecdsa.sign(message, privateKey)

# Verify if signature is valid
#L = Ecdsa.verify(message, signature, publicKey)
#print(L)


# Creation of a namedtuple:
Wallet = namedtuple('Wallet', ["privatekey", "publickey"])

def get_wallet():
    ''' Returns a named tuple instance with the following attributes:
        - privatekey
        - publickey.

        Access them using:
            wallet = get_wallet()
            wallet.privatekey # gives the private key
            wallet.publickey # gives the public key.
    '''
    prk = PrivateKey()
    pbk = prk.publicKey()

    return Wallet(privatekey=prk, publickey=pbk)


def sign_tx(wallet, message):
    ''' Returns a signature for a given wallet and string message.

    Inputs:
        - wallet (namedtuple instance)
        - message (string)
    '''
    signature = Ecdsa.sign(message, wallet.privatekey)
    return signature


def verify_signature(wallet, message, signature):
    ''' Returns True of False if the signature matches the wallet's
    public key for the given message. (NB: Each signature is associated
    a specific message!)

    Inputs:
        - wallet (namedtuple instance)
        - message (string)
        - signature (output from sign_tx)
    '''
    flag = Ecdsa.verify(message, signature, wallet["publickey"])
    return flag




# Testing script
w = get_wallet()
print(w)


message = "Hello world"

signature = sign_tx(w, message)

print(signature)

verification = verify_signature(w, message, signature)

print(verification)