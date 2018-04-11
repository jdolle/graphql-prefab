"use strict";
/**
 * Use addResolveFunctionsToSchema to combine w/schema.
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var path_1 = require("path");
var ramda_1 = require("ramda");
var graphql_resolvers_1 = require("graphql-resolvers");
var readResolversDir_1 = require("./lib/readResolversDir");
var compileResolver_1 = require("./lib/compileResolver");
var parseConfig_1 = require("./lib/parseConfig");
var RESOLVERS_DIR = process.env.RESOLVERS_DIR === undefined ?
    path_1["default"].join(__dirname, 'resolvers') : process.env.RESOLVERS_DIR;
var compileFields = ramda_1.mapObjIndexed(function (resolvers) {
    return graphql_resolvers_1.pipeResolvers.apply(void 0, ramda_1.map(compileResolver_1["default"], resolvers));
});
exports.compile = function (dir) {
    if (dir === void 0) { dir = RESOLVERS_DIR; }
    var resolvers = {};
    readResolversDir_1["default"](dir).forEach(function (filePath) {
        var typeConfig = parseConfig_1["default"](filePath);
        var defaultTypeName = path_1["default"].parse(filePath).name;
        var typeName = typeConfig.typeName === undefined ? defaultTypeName : typeConfig.typeName;
        resolvers = __assign({}, resolvers, (_a = {}, _a[typeName] = compileFields(typeConfig.fields), _a));
        var _a;
    });
    return resolvers;
};
