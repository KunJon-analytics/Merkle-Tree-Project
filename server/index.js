const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

const giftList = [
  "Gift card to a popular store",
  "Gourmet chocolates assortment",
  "Personalized engraved pen",
  "Portable Bluetooth speaker",
  "Cozy throw blanket",
  "Set of scented candles",
  "Elegant photo frame",
  "Stylish wristwatch",
  "Deluxe shaving kit",
  "Artistic coffee mug set",
  "High-quality leather wallet",
  "Fitness tracker band",
  "Luxurious bathrobe",
  "Fashionable tote bag",
  "Culinary cooking set",
  "Travel neck pillow",
  "Premium tea sampler",
  "Wireless earbuds",
  "Aromatherapy diffuser",
  "Premium notebook and pen set",
];

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof } = req.body;

  // Prove that the name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    const randomIndex = Math.floor(Math.random() * giftList.length);
    res.send(giftList[randomIndex]);
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
