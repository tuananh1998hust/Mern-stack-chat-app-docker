const express = require("express");
const app = express();
const http = require("http").Server(app);

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server is running on port ${port}`));
