class BaseException extends Error {
    constructor(args) {
        super(args);
        this.name = this.constructor.name;
        this.statusCode = 500;
        if (args && args.message) {
            this.message = args.message;
        }
    }
}

module.exports = BaseException;
