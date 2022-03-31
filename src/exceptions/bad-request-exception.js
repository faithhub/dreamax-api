const BaseException = require('./base-exception');

class BadRequestException extends BaseException {
    constructor(args) {
        super(args);
        this.statusCode = 400;
    }
}

module.exports = BadRequestException;
