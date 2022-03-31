const BaseException = require('./base-exception');

class UnAuthorizedException extends BaseException {
    constructor(args) {
        super(args);
        this.statusCode = 401;
    }
}

module.exports = UnAuthorizedException;
