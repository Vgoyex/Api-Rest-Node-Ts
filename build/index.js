"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
Server_1.server.listen(process.env.PORT || 3333, () => {
    return console.log(`RUNNING on port ${process.env.PORT || 3333}`);
});
