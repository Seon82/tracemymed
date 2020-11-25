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



def wallet():
    prk = PrivateKey()
    pbk = prk.publicKey()
    return {"privatekey": prk, "publickey": pbk}

def sign_tx(wallet, message):
    signature = Ecdsa.sign(message, wallet["privatekey"])
    return signature

def verify_signature(wallet, message, signature):
    flag = Ecdsa.verify(message, signature, wallet["publickey"])
    return flag


# Testing script
w = wallet()
print(w)


message = "Hello world"

signature = sign_tx(w, message)

print(signature)

verification = verify_signature(w, message, signature)

print(verification)