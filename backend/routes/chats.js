const express = require("express");
const router = express.Router();

const WebSocket = require("ws");
const Chat = require("../models").chat;

const axios = require("axios");

const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;
const Op = Sequelize.Op;

/* GET users listing. */
router.post("/", async (req, res, next) => {
  console.log("masuk fungsi");
  const ws = new WebSocket("ws://localhost:8001");
  console.log("masuk socket");
  ws.on("open", () => {
    const data = JSON.stringify({
      from: req.body.name,
      to: req.body.to,
      private: req.body.private,
      message: req.body.message
    });
    //   const data = JSON.stringify({
    //     from: "me",
    //     to: "me",
    //     private: false,
    //     message: "message!!!"
    //   });
    ws.send(data);
  });
  res.end();
});
/**
 * INSERT W/ QUERY
 */
router.post("/insert", async (req, res, next) => {
  console.log("masuk euy");
  const result = await Chat.create({
    name: req.body.name,
    message: req.body.message,
    to: req.body.to,
    date: req.body.date,
    created_at: new Date(),
    updated_at: new Date()
  });
//   console.log(result);
  if (result) {
    const data = {
      name: req.body.name,
      to: req.body.to,
      private: true,
      message: req.body.message
    };
    const resu = await axios.post("chats", data);
    //   res.end()
  }
  res.end();
  // res.json(result)
  /**
   * End
   */
  /**
   * insert with sequelize
   */
  // const result = await user.create({
  //   name: req.body.name,
  //   email:req.body.email,
  //   created_at: new Date,
  //   updated_at: new Date
  // })
  /**
   * End
   */
});

module.exports = router;
