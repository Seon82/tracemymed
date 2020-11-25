from ellipticcurve.ecdsa import Ecdsa
from ellipticcurve.privateKey import PrivateKey
import requests
import hashlib


NODE_ADRESS = "http://localhost:5000"

ADMIN_PRIVATE_KEY = ellipticcurve.privateKey.PrivateKey.fromPem('-----BEGIN EC PRIVATE KEY-----\nMHQCAQEEID6TypbwEfEwdW0vgC7C4ObnBlGWmGW7avmg1QK710bfoAcGBSuBBAAK\noUQDQgAE7MTrJ3EZkwF/cz/Hv9OmmK1kI3oRQ4owzqZ0wDQaqMkCSaoNdDgN6Hvj\n38E0VbwZ0cuEnQmuhMjxBJ61EHwiJQ==\n-----END EC PRIVATE KEY-----\n')

def hash(dictionnary):
    dictionnary_string = json.dumps(dictionnary, sort_keys=True).encode()
    return hashlib.sha256(dictionnary_string).hexdigest()

def mine():
    return requests.get(NODE_ADRESS+"/mine").json()

def chain():
    return requests.get(NODE_ADRESS+"/chain").json()

def utxo():
    return requests.get(NODE_ADRESS+"/utxo").json()

def val():
    return requests.get(NODE_ADRESS+"/validity").json()

class Actor():
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
            Exception("invalid transaction")
        else:
            transaction['transaction_input'] = transaction_input
            signature = Ecdsa.sign(hash(transaction), self.privateKey)
            transaction['signature'] = signature.toBase64()
            return requests.post(NODE_ADRESS+'/transactions/new', json = transaction)



admin = Actor(NODE_ADRESS, admin_private_key)

suppliers = [Actor(NODE_ADRESS) for _ in range(10)]

admin.send(suppliers[0], 123)
