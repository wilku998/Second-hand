"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (notifications, kind, userID, secondPropertyID, secondPropertyName) {
    return notifications.findIndex(function (e) {
        return e.kind === kind &&
            (secondPropertyID ? e[secondPropertyName].toString() === secondPropertyID : true) &&
            e.user.toString() === userID;
    }) === -1;
});
//# sourceMappingURL=checkIfNotificationDoesntExist.js.map