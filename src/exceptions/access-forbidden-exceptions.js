const BaseException = require('./base-exception');

class AccessForbiddenException extends BaseException {
    constructor(args) {
        super(args);
        this.statusCode = 403;
    }
}

module.exports = AccessForbiddenException;
