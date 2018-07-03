class Response {
    constructor(code, reason, content) {
        this.code = code || 200;
        this.reason = reason || "";
        this.content = content || {};
    }

}

module.exports = function (code, reason, content) {
    return new Response(code, reason, content);
}