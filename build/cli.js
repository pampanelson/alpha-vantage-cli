#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var yargs_1 = require("yargs");
var moment = require("moment");
//
// Entry point.
//
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var outputDataSize, interval, dataFrame, dateFormat, api;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!yargs_1.argv.type) {
                        console.error("Missing --type=<data-type> on the command line.");
                        process.exit(1);
                    }
                    if (!yargs_1.argv.symbol) {
                        console.error("Missing --symbol=<your-symbol> on the command line.");
                        process.exit(1);
                    }
                    if (!yargs_1.argv.apiKey) {
                        console.error("Missing --api-key=<alpha-vantage-api-key> on the command line.");
                        process.exit(1);
                    }
                    if (!yargs_1.argv.out) {
                        console.error("Missing --out=<output-csv-file> on the command line.");
                        process.exit(1);
                    }
                    outputDataSize = "compact";
                    if (yargs_1.argv.outputDataSize) {
                        outputDataSize = yargs_1.argv.outputDataSize;
                    }
                    interval = '60min';
                    if (yargs_1.argv.interval) {
                        interval = yargs_1.argv.interval;
                    }
                    api = new index_1.AlphaVantageAPI(yargs_1.argv.apiKey, outputDataSize, yargs_1.argv.verbose);
                    if (!(yargs_1.argv.type === 'daily')) return [3 /*break*/, 2];
                    return [4 /*yield*/, api.getDailyDataFrame(yargs_1.argv.symbol)];
                case 1:
                    dataFrame = _a.sent();
                    dateFormat = 'YYYY-MM-DD';
                    return [3 /*break*/, 5];
                case 2:
                    if (!(yargs_1.argv.type === 'intraday')) return [3 /*break*/, 4];
                    return [4 /*yield*/, api.getIntradayDataFrame(yargs_1.argv.symbol, interval)];
                case 3:
                    dataFrame = _a.sent();
                    dateFormat = "YYYY-MM-DD HH:mm:ss";
                    return [3 /*break*/, 5];
                case 4: throw new Error("Unexpected data type: " + yargs_1.argv.type + ", expected it to be either 'daily' or 'intrday'");
                case 5:
                    if (!yargs_1.argv.verbose) {
                        console.log('>> ' + yargs_1.argv.out);
                    }
                    dataFrame
                        .transformSeries({
                        Timestamp: function (t) { return moment(t).format(dateFormat); },
                    })
                        .asCSV()
                        .writeFileSync(yargs_1.argv.out);
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (err) {
    console.error("An error occurred.");
    console.error(err && err.stack || err);
});
//# sourceMappingURL=cli.js.map