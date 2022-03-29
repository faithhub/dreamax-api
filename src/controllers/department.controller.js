
exports.text = async function (req, res, next) {
    res.status(200).json(
        {
            message: "test is okay now"
        }
    )
}

exports.home = async function (req, res, next) {
    res.status(201).json({ message: "Well done" });
}
