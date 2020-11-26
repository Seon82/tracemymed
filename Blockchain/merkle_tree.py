import hashlib

def doubleSha256(string):
    """Double-encryption for better safety.

    Args:
        string (str)

    Returns:
        [str]: Hexadecimal string that corresponds to the
            double-encrypted input string
    """
    return hashlib.sha256(hashlib.sha256(string).hexdigest().encode()).hexdigest()

def findMerkleRoot(leafHash):
    """Through a recursive process, returns the Merkle Root of the given
    list.

    Args:
        leafHash (list): List of strings that corresponds to the different
                transactions.
    """


    # Auxiliairy function:
    def findMerkleRoot_recursive(leafHash):
        """Recursive function that returns the Merkle Root of the given list.

        Args:
            leafHash (list): List of strings that corresponds to the different
                transactions.


        Returns:
            [list]: 1-element list which contains the MerkleRoot
        """

        hash = []
        hash_processed = []

        # If leafHash is an empty list...
        if len(leafHash) == 0:
            return []

        # If not even, repeat the last element...
        if len(leafHash) % 2 != 0:
            leafHash.extend(leafHash[-1:])

        # Now we can loop in the final tree:
        for leaf in sorted(leafHash):
            hash.append(leaf)

            # If there are two first hashes...
            if len(hash) == 2:
                hash_concat = hash[0] + hash[1]
                hash_processed.append(doubleSha256(hash_concat.encode()))
                hash == [] # reset first hash to empty

            # If there is one or less hash, we do nothing:
            else:
                pass

        # When hash_processed has len equaled to 1, it means that we've already
        # obtained our Merkle Root:
        if len(hash_processed) == 1:
            return hash_processed

        # Otherwise, it means that we can redo the same algorithm but for
        # hash_processed. This recurrent process terminates since hash_processed
        # has a strictly decreasing size.
        else:
            return findMerkleRoot_recursive(hash_processed)

    if leafHash == []:
        return None
    return findMerkleRoot_recursive(leafHash)[0]