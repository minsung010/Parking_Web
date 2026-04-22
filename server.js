const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname));

app.get('/api/parking', async (req, res) => {
    try {
        const { sidoCode, sggCode } = req.query;
        const API_KEY = process.env.GONGU_API_KEY;

        const targetUrl = `https://www.eshare.go.kr/eshare-openapi/rsrc/list/010700/${API_KEY}`;
        const requestBody = {
            numOfRows: sggCode ? 200 : 500,
            pageNo: 1
        };

        if (sidoCode) {
            requestBody.ctpvCd = sidoCode;
        }

        if (sggCode) {
            requestBody.sggCd = sggCode;
        }

        console.log(" Proxying request to:", targetUrl, requestBody);

        const response = await axios.post(targetUrl, requestBody, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);

    } catch (error) {
        console.error(" Proxy error:", error.message);
        res.status(500).json({ error: "Failed to fetch data from Gongu Nuri API" });
    }
});

app.listen(PORT, () => {
    console.log(` Proxy server is running at http://localhost:${PORT}`);
    console.log(`  Live Server (index.html) will fetch from http://localhost:${PORT}/api/parking`);
});
