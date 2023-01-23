import { NowRequest, NowResponse } from "@vercel/node";
//const fetch = require("node-fetch");
import fetch from 'node-fetch';

export default (req: NowRequest, res: NowResponse) => {
  fetch(
    "https://rpc.ankr.com/fantom", 
    {
      "headers": { "content-type": "application/json" },
      "body": "{\"method\":\"eth_call\",\"params\":[{\"to\":\"0x3a603eceae046828febbcbd097bf97adc23dc072\",\"data\":\"0x370158ea\"},\"latest\"],\"id\":96,\"jsonrpc\":\"2.0\"}",
      "method": "POST"
  }).then((response) => response.json()).then( rd=> {return res.json(rd}) 

  //return res.json({ message: "Hello World" });
};
