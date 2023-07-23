const axios = require("axios");
const prompt = require("prompt-sync")();
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // Create the merkle tree.
  const merkleTree = new MerkleTree(niceList);

  // Ask user input to get the name which will be searched and be sure it is not null.
  const name = prompt("Which name do you want to check?");
  if (!name) {
    alert("You have to type a name");
  }
  // Find the index of the name and get proof from merkle tree.
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof,
  });

  console.log({ gift });
}

main();
