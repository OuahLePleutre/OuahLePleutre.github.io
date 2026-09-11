---
title: "Using Bitcoin to prove document authorship"
date: 2026-09-03 15:00:00 +0200
categories: [Crypto, Blockchain]
tags: [Hash, Bitcoin, Blockchain]
description: How to use Bitcoin to create an irrefutable proof of a document authorship ?
---

# The need

Let's imagine you have created something you want to keep for yourself (like an image, a song, or whatever). In most jurisdictions, you obtain ```autmatically``` the copyright of it, but if someone steals it from you, the hard part is to prove that you created it before them. That's why I offer you a way to prove that you have the property of any document at a given time. Let's explore !

Disclaimer : Even if this proof is strong, I'm not a lawyer and I cannot guarantee that this is admissible in court. Do your own research in your jurisdiction. 

# Proving a document existence with Bitcoin

### What we need for it to work
The first step is to create a proof that a given document (or referred to file in this article) existed at a certain time. But we can't simply take a screenshot of the metadata of the file because these metadata are easily modifiable. We need our proof to be publicly visible and not falsifiable. Let's recap the constraints:

- The proof should attest the file existed at a given time
- The proof should not be modifiable/be irrefutable
- The proof should be public
- The proof should not expose the document itself (if we do not want it to be public at the time of the proof)

## How it works

### Hashing the document
We can easily achieve the last 2 constraints by ```hashing``` the document. Hashing is the process of mapping an arbitrary data stream into a unique fixed-size value, and the output *does not* indicate anything about the file content. A common and strong hash function used nowadays is ```SHA-256```. By hashing the file, we can publicly broadcast the output (we call this a ```hash```) to everyone. Nobody can retrieve the file content from the hash and later, we can broadcast our original document so everyone can verify (by hashing the document themselves) that the hash matches ! Try below : [TODO : incoporate a sha-256 calculator]

{% include components/sha256.html %}


### Using Bitcoin
We now need to satisfy the first to constraints. That's where Bitcoin steps in. the Bitcoin blockchain allows you to write anything via a ```transaction``` with the ```OP_RETURN``` opcode and inserting our hash with it. We then broadcast our transaction to the network and it will soon be included in a block. The reason why we do this is because every block on Bitcoin is timestamped (i.e. labeled with a date and time). When the block containing our transaction is mined, we get an irrefutable and public proof that our document existed at the time labeled in the block without exposing the document content !

{% include components/transaction.html %}


## Why it fails to prove authorship
Let's imagine that someone steals your document. Yes, you can show them the Bitcoin transaction with the timestamp and show that the hash on it matches the hash of your document but everyone can do so if your document is public. The thief can say the exact same thing and you're cooked.
In fact, this proof only works if the document is confidential to you only, and in this case, you should not need to have such a proof.
But this work is not worthless at all, we still created a ```proof of existence```. We can prove that a given document exists at a given time. Let's twist it a bit to gain authorship.

# Proving authorship of the document

What we can do is somehow put an authorship in the hash that we will publish to Bitcoin. Here's a possible design to achieve this :
Instead of hashing the raw document, we can incorporate it in a text file (like a cretificate) to add some information about the file. Here's how we do it :

Step 1 : hash the raw document. Output : H1

Step 2 : create the certificate containing your info (like name, title of the document, or anything) and H1.

Step 3 : hash the certificate. Output : H.

Step 4 : publish it on Bitcoin.

Let's visualize :

![btc proof explanation](/assets/img/btc_proof.svg){: .light}
![btc proof explanation](/assets/img/btc_proof_dark.svg){: .dark}
_How to create an authorship proof_

This way, we create a direct link between the certificate and the document. Later, to prove the authorship of the document at a precise date, you can show everyone the Bitcoin transaction id, the certificate and the document. Everyone can check that the hash on Bitcoin matches the hash of the certificate AND that the hash written on the certificate is the same as the document. You successfully prove your authorship of a document at the trasaction date ! Store a copy of the certificate, the document, and eventually H1 and H in a secure place, you will need this to prove the authorship.

# Attention points
Here are some things to clarify about this methodology.

You need to keep (preferably offline and on multiple devices) the ```exact``` certificate and the ```exact``` document that you hashed. Any difference in one of these files will produce a different hash and you will not be able to prove anything. Make sure to have the exact same files stored securely.

When (and if) you decide to show everyone the proof, you will release to the public your certificate (as they will hash it to verify the match). You have to make sure that all the information on the certificate are ```intended to the public```. Don't put any information that is not necessary to prove it's yours. Remember that when the hash is on Bitcoin, you cannot change anything in both certificate and document as the hashes will no longer match.

While Bitcoin provides a timestamp for every block, it is not minute precise, but in most cases, this will be perfectly fine.

A big concern with that method is that we cannot be certain who exactly created the original document. Tomorrow you can publish a certificate indicating that you created a document even though you actually stole it from someone else. To be clear, what you have is a proof that you owned and claimed this document at a given time. While this does not, by itself, prove legal ownership or authorship, it provides a strong cryptographic evidence conntecing you to the document before that date.

# Thanks for reading
Thanks a lot for reading my article. If you have any questions, concerns or if something sounds untrue, do not hesitate to contact me !