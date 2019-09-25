"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '.env.all') });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var items_1 = __importDefault(require("./routers/items"));
var users_1 = __importDefault(require("./routers/users"));
var images_1 = __importDefault(require("./routers/images"));
var messangerRooms_1 = __importDefault(require("./routers/messangerRooms"));
require("./db/mongoose");
var app = express_1.default();
var port = process.env.PORT || 3000;
var publicPath = path_1.default.join(__dirname, "..", "public");
app.use(express_1.default.json({ limit: "10mb" }));
app.use(cookie_parser_1.default());
app.use(items_1.default);
app.use(users_1.default);
app.use(images_1.default);
app.use(messangerRooms_1.default);
app.use(express_1.default.static(path_1.default.join(publicPath, "static")));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(publicPath, "index.html"));
});
exports.server = http_1.default.createServer(app);
exports.server.listen(port, function () {
    console.log("Server is listing on port " + port);
});
require("./socket");
//# sourceMappingURL=server.js.map