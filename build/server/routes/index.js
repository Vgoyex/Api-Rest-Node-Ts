"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    return res.send("RESP GET");
});
router.post("/post", (req, res) => {
    console.log(req.body);
    return res.json(req.body);
});
router.get("/test", (req, res) => {
    console.log("RES test");
    return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(req.body);
});
