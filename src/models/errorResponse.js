class ErrorResponse {
    constructor(errorMessage) {
        this.status = 0;
        this.data = {
            message: errorMessage,
        };
    }
}

module.exports = ErrorResponse;
