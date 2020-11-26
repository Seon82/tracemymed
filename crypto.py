from collections import namedtuple

from ellipticcurve.ecdsa import Ecdsa
from ellipticcurve.privateKey import PrivateKey

import requests

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin


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


def sign_tx(privateKey, message):
    ''' Returns a signature for a given wallet and string message.
    Inputs:
        - wallet (namedtuple instance)
        - message (string)
    '''
    signature = Ecdsa.sign(message, privateKey)
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
# w = get_wallet()

# message = "Hello world"

# signature = sign_tx(w, message)

# print(signature)

# verification = verify_signature(w, message, signature)

# print(verification)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False


@app.route('/keys', methods=['GET'])
@cross_origin()
def getKeys():
    wallet = get_wallet()
    response = {
            'publicKey': str(wallet.publickey.toPem()),
            'privateKey': str(wallet.privatekey.toPem())
        }
    return jsonify(response), 200

@app.route('/sign', methods=['POST'])
@cross_origin()
def signMessage():
    values = request.get_json()
    message = values.get('message')
    privateKey = PrivateKey.fromPem(values.get('privateKey'))
    print(privateKey)
    response = sign_tx(privateKey, message)
    return jsonify(response.toBase64()), 200


app.run(host='0.0.0.0', port=5999)
