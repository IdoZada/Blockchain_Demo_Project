# Blockchain website demo

The project demonstrates how blockchain works.

There are several tabs on the site:

## Hash
How to encrypt data using the SHA256 library.

![image](https://user-images.githubusercontent.com/48810056/131903941-eba9210f-525f-41f1-875f-1d2768045bfc.png)


## Block
Which properties affect the encryption of the block and when mine is performed on a specific block a current hash of the block is obtained.

### Correct block

![image](https://user-images.githubusercontent.com/48810056/131904194-a27f2621-c26d-4091-8040-4dc1cd444d07.png)

### Incorrect block

![image](https://user-images.githubusercontent.com/48810056/131904261-2d68c3ac-1c92-4fc7-9732-760ef55e0aec.png)


## Blockchain 
This tab demonstrate the chaining of the blocks.
if specific block is changed a new calculation of the hash and previous hash is performed and as a result the blockchain is incorrect.

### Correct block

![image](https://user-images.githubusercontent.com/48810056/131905441-513f05fc-438f-4eba-a04a-2d4f099e1416.png)

### Incorrect block

![image](https://user-images.githubusercontent.com/48810056/131905362-5ab75df8-397e-4878-a0cb-81de50c107f9.png)

## Distributed Blockchain 
This tab demonstrate the copies of blockchain in many contries in the world.

#### Peer A

![image](https://user-images.githubusercontent.com/48810056/131905870-1d5f6ab2-2bed-48ad-af5e-ad21b9fae48b.png)

#### Peer B

![image](https://user-images.githubusercontent.com/48810056/131905991-efeb9312-51e0-473e-b04e-135e0cef0060.png)


## Token
This tab demo the transactions for each block.

![image](https://user-images.githubusercontent.com/48810056/131906145-3713bcae-b8ca-4298-97d7-bf7c228848c3.png)

## Keys
Generate pairs of keys:
PublicKey
PrivateKey

![image](https://user-images.githubusercontent.com/48810056/131907157-4bb04c5c-ec65-45ff-a150-f3f966d46e02.png)

## Signature
Each transaction is signed

### Sign Transaction

![image](https://user-images.githubusercontent.com/48810056/131907864-ed2a4907-3bc2-4d1f-af5a-99d8b45cc2bb.png)

### Verify Transaction

![image](https://user-images.githubusercontent.com/48810056/131907927-49dee138-4471-43af-b374-e06800aa051a.png)



This project combine several web technologies.
The project is divided according to the methodology of the Rest API

## Technologies:

### Backend side
* NodeJS
* Express
* RestAPI
* MongoDB

### Frontend side
* React hooks
* Bootstrap 4/5
