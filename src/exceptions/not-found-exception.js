const BaseException = require('./base-exception');

class NotFoundException extends BaseException {
    constructor(args) {
        super(args);
        this.statusCode = 404;
    }
}

module.exports = NotFoundException;
