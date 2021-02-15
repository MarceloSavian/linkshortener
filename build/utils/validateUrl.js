"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validURL = void 0;
function validURL(str) {
    var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null);
}
exports.validURL = validURL;
