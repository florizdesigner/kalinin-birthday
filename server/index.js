require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(bodyParser.json());

// Telegram bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Endpoint for submitting order
app.post('/api/submit-order', async (req, res) => {
    try {
        const { links, description } = req.body;

        if (!links) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Format message for Telegram
        const message = `🎉 Новый заказ шмоток! 🎄\n\n🔗 Ссылки: ${JSON.stringify(links)}\n💬 Комментарий: ${JSON.stringify(description)}`;

        // Send to Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error submitting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});