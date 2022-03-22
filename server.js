require("dotenv").config();
const auth = {
    username: process.env.PROJECT_ID, // Project-ID
    password: process.env.API_TOKEN, // API token
};
const apiurl = `https://${process.env.SPACE_URL}`;

const axios = require("axios");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

// middleware
app.use(bodyParser.json());
app.use(cors());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
}

// Getting chat token from SignalWire
app.post("/get_chat_token", async (req, res) => {
    const { member_id, channels } = req.body;

    const channelsPerms = {}
    for (const c of channels) {
        channelsPerms[c] = { read: true, write: true }
    }

    const tokenApi = apiurl + "/api/chat/tokens";
    const reply = await axios.post(tokenApi,
        {
            ttl: 50,
            channels: channelsPerms,
            member_id,
            state: {},
        },
        { auth }
    )

    res.json({
        token: reply.data.token
    })
});

// Start the server
app.listen(PORT, function () {
    console.log(`Server now listening on PORT ${PORT}!`);
});
