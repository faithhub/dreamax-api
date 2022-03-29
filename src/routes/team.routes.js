import { Router } from "express";

const router = Router();
const module = "support";

router.get('/get', function (req, res, next) {
    res.status(200).json({ status: "success" })
})

router.get('/get2', function (req, res, next) {
    res.status(200).json({ status: "success" })
})


export { module, router };
