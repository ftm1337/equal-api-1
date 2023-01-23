import { NowRequest, NowResponse } from "@vercel/node";
//const fetch = require("node-fetch");
import fetch from 'node-fetch';

export default (req: NowRequest, res: NowResponse) => {
  fetch("https://rpc.ankr.com/fantom", {
		"credentials": "omit",
		"headers": {
				"Accept": "*/*",
				"content-type": "application/json"
		},
		"body": "{\"method\":\"eth_call\",\"params\":[{\"to\":\"0x3a603eceae046828febbcbd097bf97adc23dc072\",\"data\":\"0x370158ea\"},\"latest\"],\"id\":96,\"jsonrpc\":\"2.0\"}",
		"method": "POST",
		"mode": "cors"
	})
	.then((response) => response.json())
	.then((d) => {
		if (d) {
			i = d.result;
			/*	result: RLP-encoded
			_info[0] = block.timestamp;
			_info[1] = price();
			_info[2] = circulatingSupply();
			_info[3] = outstandingSupply();
			_info[4] = dilutedSupply();
			_info[5] = inNFT();
			_info[6] = inGauges();
			_info[7] = inExcluded();
			_info[8] = veNFT.totalSupply();
			_info[9] = lockRatio();
			_info[10] = liquidity();
			_info[11] = circulatingMarketCap();
			_info[12] = marketCap();
			_info[13] = fdv();
			_info[14] = lockedMarketCap();
			*/
			return res.json({
				data: {
					// Supply: supply,
					lastUpdateTimestamp:	Number("0x"+i.substr( 2+64*0 , 64 ))
					, price:				Number("0x"+i.substr( 2+64*1 , 64 )) / 1e18
					, circulatingSupply:	Number("0x"+i.substr( 2+64*2 , 64 )) / 1e18
					, outstandingSupply:	Number("0x"+i.substr( 2+64*3 , 64 )) / 1e18
					, dilutedSupply:		Number("0x"+i.substr( 2+64*4 , 64 )) / 1e18
					, supplyInVeNFT:		Number("0x"+i.substr( 2+64*5 , 64 )) / 1e18
					, supplyInGaugeRewards:	Number("0x"+i.substr( 2+64*6 , 64 )) / 1e18
					, supplyInExcluded:		Number("0x"+i.substr( 2+64*7 , 64 )) / 1e18
					, veTotalSupply:		Number("0x"+i.substr( 2+64*8 , 64 )) / 1e18
					, lockRatio:			Number("0x"+i.substr( 2+64*9 , 64 )) / 1e18
					, pool2Liquidity:		Number("0x"+i.substr( 2+64*10, 64 )) / 1e18
					, marketCapCirculating:	Number("0x"+i.substr( 2+64*11, 64 )) / 1e18
					, marketCapOutstanding:	Number("0x"+i.substr( 2+64*12, 64 )) / 1e18
					, marketCapDiluted:		Number("0x"+i.substr( 2+64*13, 64 )) / 1e18
					, marketCapLocked:		Number("0x"+i.substr( 2+64*14, 64 )) / 1e18
					// For coingecko
					//, circulatingSupply:	Number("0x"+i.substr( 2+64*2 , 64 )) / 1e18
					, totalSupply:			Number("0x"+i.substr( 2+64*3 , 64 )) / 1e18
					, maxSupply:			Number("0x"+i.substr( 2+64*4 , 64 )) / 1e18
				},
			});
		} else {
			return res.json("No Response from Fantom RPC");
		}
	});

  //return res.json({ message: "Hello World" });
};
