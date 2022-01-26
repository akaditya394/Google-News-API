const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();




app.listen(4000, () => {
    console.log("server listening on port 4000");
})