from ellipticcurve.ecdsa import Ecdsa
from ellipticcurve.privateKey import PrivateKey
import requests
import hashlib
import json

# Adress of the flask server:
NODE_ADRESS = "http://localhost:5000"

# Arbitrary key that is set for the creating blocks:
ADMIN_PRIVATE_KEY = PrivateKey.fromPem('-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEID6TypbwEfEwdW0vgC7C4ObnBlGWmGW7avmg1QK710bfoAcGBSuBBAAK\noUQDQgAE7MTrJ3EZkwF/cz/Hv9OmmK1kI3oRQ4owzqZ0wDQaqMkCSaoNdDgN6Hvj\n38E0VbwZ0cuEnQmuhMjxBJ61EHwiJQ==\n-----END EC PRIVATE KEY-----\n')

def hash(dictionnary):
    """Convert the dictionnary to a string (with sorted keys), then hash the latter
    using SHA-256.

    Args:
        dictionnary dict

    Returns:
        bin
    """
    dictionnary_string = json.dumps(dictionnary, sort_keys=True).encode()
    return hashlib.sha256(dictionnary_string).hexdigest()

def mine():
    '''Launch the 'mine' request on the flask server and get the
    appropriate response.'''
    return requests.get(NODE_ADRESS+"/mine").json()

def chain():
    '''Launch the 'chain' request on the flask server and get the
    appropriate response.'''
    return requests.get(NODE_ADRESS+"/chain").json()

def utxo():
    '''Launch the 'utxo' request on the flask server and get the
    appropriate response.'''
    return requests.get(NODE_ADRESS+"/utxo").json()

def val():
    '''Launch the 'val' request on the flask server and get the
    appropriate response.'''
    return requests.get(NODE_ADRESS+"/validity").json()



def history(batchID):
    '''Launch the 'get_history' request on the flask server and get the
    appropriate response.'''
    data = {'batchID': batchID}
    return requests.post(NODE_ADRESS+"/history", json=data).json()['history']

class Actor():
    """Class for actors of the blockchain. Those can be producers,
    companies or buyers.
    Every actor has an private key and a public key for identification
    and signature purposes.

    NB: To simplify the problem at hand, we have made the assumption
    that each actor is associated to a dedicated node.

    Args:
        node_address (string)
        private_key (PrivateKey, optional). Defaults to None.
    """

    def __init__(self, node_address, private_key = None):
        self.privateKey = private_key or PrivateKey()
        self.publicKey = self.privateKey.publicKey()
        self.node = node_address

    def send(self, recipient, batchID):
        transaction = {
        "sender": self.publicKey.toPem(),
        "recipient": recipient.publicKey.toPem(),
        "batchID": batchID,
        }
        transaction_input = requests.post(NODE_ADRESS+"/transactions/input", json = transaction).json()['transaction_input']
        if transaction_input is None:
            print("invalid transaction")
        else:
            transaction['transaction_input'] = transaction_input
            signature = Ecdsa.sign(hash(transaction), self.privateKey)
            transaction['signature'] = signature.toBase64()
            return requests.post(NODE_ADRESS+'/transactions/new', json = transaction)


# TESTING
# admin = Actor(NODE_ADRESS, ADMIN_PRIVATE_KEY)
#
# suppliers = [Actor(NODE_ADRESS) for _ in range(10)]
#
# admin.send(suppliers[0], "123")
# suppliers[0].send(suppliers[1], "123")
# mine()
# suppliers[1].send(suppliers[5], "123")
# mine()