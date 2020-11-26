import hashlib
import json

from collections import namedtuple

from ellipticcurve.ecdsa import Ecdsa
from ellipticcurve.privateKey import PrivateKey

import requests

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin


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

def hash(dictionnary):
        """
        Creates a SHA-256 hash of a dict
        :param block: <dict>
        :return: <str>
        """

        # We must make sure that the Dictionary is Ordered, or we'll have inconsistent hashes
        dictionnary_string = json.dumps(dictionnary, sort_keys=True).encode()
        return hashlib.sha256(dictionnary_string).hexdigest()




basePrivateKey = PrivateKey.fromPem('-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEID6TypbwEfEwdW0vgC7C4ObnBlGWmGW7avmg1QK710bfoAcGBSuBBAAK\noUQDQgAE7MTrJ3EZkwF/cz/Hv9OmmK1kI3oRQ4owzqZ0wDQaqMkCSaoNdDgN6Hvj\n38E0VbwZ0cuEnQmuhMjxBJ61EHwiJQ==\n-----END EC PRIVATE KEY-----\n')

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False


@app.route('/keys', methods=['POST'])
@cross_origin()
def getKeys():
    basejson = request.get_json()
    base = basejson.get('base')
    # base = request.get_json().get('base')

    response = {}
    if base:
        response = {
            'privateKey' : str(basePrivateKey.toPem()),
            'publicKey': str(basePrivateKey.publicKey().toPem())
        }
    else:
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
    print(values.get('message'))
    message = hash(values.get('message'))
    print("#####"+values.get('privateKey')+"#####")
    privateKey = PrivateKey.fromPem((values.get('privateKey')))
    print(privateKey)
    response = sign_tx(privateKey, message)
    return jsonify(response.toBase64()), 200


app.run(host='0.0.0.0', port=5999)
