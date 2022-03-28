import express from "express";
import morgan from "morgan";
import cors from "cors"
// import routes from "../routes";


const app = express();

//request handling
app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", function (req, res, next) {
    res.status(200).json({
        msg: "good"
    })
})

app.use(cors)

//error page handling
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

const port = 5000
const server = app.listen(port, () => console.log("Server listening on port 5000"))


module.exports = server;