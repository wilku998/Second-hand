"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (notifications, kind, user, property, propertyName) {
    return notifications.findIndex(function (e) {
        return e.kind === kind &&
            (property ? e[propertyName].toString() === property._id : true) &&
            e.user.toString() === user._id.toString();
    }) === -1;
});
//# sourceMappingURL=checkIfNotificationsExist.js.map