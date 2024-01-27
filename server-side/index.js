require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const SOCKETIO = require('socket.io');
const axios = require('axios');

const app = express();
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

const socketHandler = SOCKETIO(server);

socketHandler.on("connection", (socket) => {
    socket.on("disconnect", () => {
        console.log('client disconnected');
    });
    console.log('client connected');
})

const getPrices = () => {
    axios.get(process.env.LIST_URL, {
        headers: {
            'x-messari-api-key': process.env.API_KEY,
        }
    })
        .then((response) => {
            const priceList = response.data.data.map((item) => {
                return {
                    id: item.id,
                    name: item.symbol,
                    price: item.metrics.market_data.price_usd,
                }
            })
            socketHandler.emit('crypto', priceList);
        }).catch((error) => {
            socketHandler.emit('crypto', {
                error: true,
                message: 'Error Fetching prices data from API',
                errorDetails: error,
            });
        })
    // https://api.messari.io/news/v1/news/assets?limit=25&page=1
};

setInterval(() => {
    getPrices();
}, 20000)

//Our Profile API 
app.get('/cryptos/profile', (req, res) => {
    res.json({ error: true, message: 'Missing Crypto Id in the API URL' });
})

app.get('/cryptos/profile/:id', (req, res) => {
    const cryptoId = req.params.id;
    axios.get(`${process.env.BASE_URL_V2}/${cryptoId}/profile`, {
        headers: {
            'x-messari-api-key': process.env.API_KEY,
        }
    }).then((responseData) => {
        res.json(responseData.data.data)

    }).catch((error) => {
        res.json({
            error: true,
            message: 'Error Fetching prices data from API',
            errorDetails: error,
        });
    })
})


//Our Market Data API 
app.get('/cryptos/market-data', (req, res) => {
    res.json({ error: true, message: 'Missing Crypto Id in the API URL' });
})

app.get('/cryptos/market-data/:id', (req, res) => {
    const cryptoId = req.params.id;
    axios.get(`${process.env.BASE_URL_V1}/${cryptoId}/metrics/market-data`, {
        headers: {
            'x-messari-api-key': process.env.API_KEY,
        }
    }).then((responseData) => {
        res.json(responseData.data.data)

    }).catch((error) => {
        res.json({
            error: true,
            message: 'Error Fetching prices data from API',
            errorDetails: error,
        });
    })
})