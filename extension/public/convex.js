"use strict";
var convex = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../common/temp/node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "../common/temp/node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray3;
      exports.fromByteArray = fromByteArray2;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray3(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray2(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // ../common/temp/node_modules/.pnpm/node-fetch@2.6.7_encoding@0.1.13/node_modules/node-fetch/browser.js
  var require_browser = __commonJS({
    "../common/temp/node_modules/.pnpm/node-fetch@2.6.7_encoding@0.1.13/node_modules/node-fetch/browser.js"(exports, module) {
      "use strict";
      var getGlobal = function() {
        if (typeof self !== "undefined") {
          return self;
        }
        if (typeof window !== "undefined") {
          return window;
        }
        if (typeof global !== "undefined") {
          return global;
        }
        throw new Error("unable to locate global object");
      };
      var global = getGlobal();
      module.exports = exports = global.fetch;
      if (global.fetch) {
        exports.default = global.fetch.bind(global);
      }
      exports.Headers = global.Headers;
      exports.Request = global.Request;
      exports.Response = global.Response;
    }
  });

  // src/browser/index.ts
  var browser_exports = {};
  __export(browser_exports, {
    ConvexHttpClient: () => ConvexHttpClient,
    InternalConvexClient: () => InternalConvexClient
  });

  // ../common/temp/node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // ../common/temp/node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }

  // ../common/temp/node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // ../common/temp/node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // src/index.ts
  var version = "0.9.1";

  // src/values/values.ts
  var Base64 = __toESM(require_base64_js());
  var LITTLE_ENDIAN = true;
  var MIN_INT64 = BigInt("-9223372036854775808");
  var MAX_INT64 = BigInt("9223372036854775807");
  var ZERO = BigInt("0");
  var EIGHT = BigInt("8");
  var TWOFIFTYSIX = BigInt("256");
  var Id = class {
    constructor(tableName, id) {
      this.tableName = tableName;
      this.id = id;
    }
    equals(other) {
      if (other instanceof Id) {
        return this.tableName === other.tableName && this.id === other.id;
      }
      return false;
    }
    static fromJSON(obj) {
      if (typeof obj.$id !== "string") {
        throw new Error(
          `Object ${JSON.stringify(obj)} isn't a valid Id: $id isn't a string.`
        );
      }
      const parts = obj.$id.split("|");
      if (parts.length !== 2) {
        throw new Error(
          `Object ${JSON.stringify(obj)} isn't a valid Id: Wrong number of parts.`
        );
      }
      return new Id(parts[0], parts[1]);
    }
    toJSON() {
      const idString = `${this.tableName}|${this.id}`;
      return { $id: idString };
    }
    toString() {
      return this.id;
    }
    inspect() {
      return `Id('${this.tableName}', '${this.id}')`;
    }
  };
  function isSpecial(n) {
    return Number.isNaN(n) || !Number.isFinite(n) || Object.is(n, -0);
  }
  function slowBigIntToBase64(value) {
    if (value < ZERO) {
      value -= MIN_INT64 + MIN_INT64;
    }
    let hex = value.toString(16);
    if (hex.length % 2 === 1)
      hex = "0" + hex;
    const bytes = new Uint8Array(new ArrayBuffer(8));
    let i = 0;
    for (const hexByte of hex.match(/.{2}/g).reverse()) {
      bytes.set([parseInt(hexByte, 16)], i++);
      value >>= EIGHT;
    }
    return Base64.fromByteArray(bytes);
  }
  function slowBase64ToBigInt(encoded) {
    const integerBytes = Base64.toByteArray(encoded);
    if (integerBytes.byteLength !== 8) {
      throw new Error(
        `Received ${integerBytes.byteLength} bytes, expected 8 for $integer`
      );
    }
    let value = ZERO;
    let power = ZERO;
    for (const byte of integerBytes) {
      value += BigInt(byte) * TWOFIFTYSIX ** power;
      power++;
    }
    if (value > MAX_INT64) {
      value += MIN_INT64 + MIN_INT64;
    }
    return value;
  }
  function modernBigIntToBase64(value) {
    if (value < MIN_INT64 || MAX_INT64 < value) {
      throw new Error(
        `BigInt ${value} does not fit into a 64-bit signed integer.`
      );
    }
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setBigInt64(0, value, true);
    return Base64.fromByteArray(new Uint8Array(buffer));
  }
  function modernBase64ToBigInt(encoded) {
    const integerBytes = Base64.toByteArray(encoded);
    if (integerBytes.byteLength !== 8) {
      throw new Error(
        `Received ${integerBytes.byteLength} bytes, expected 8 for $integer`
      );
    }
    const intBytesView = new DataView(integerBytes.buffer);
    return intBytesView.getBigInt64(0, true);
  }
  var bigIntToBase64 = DataView.prototype.setBigInt64 ? modernBigIntToBase64 : slowBigIntToBase64;
  var base64ToBigInt = DataView.prototype.getBigInt64 ? modernBase64ToBigInt : slowBase64ToBigInt;
  var MAX_IDENTIFIER_LEN = 64;
  var ALL_UNDERSCORES = /^_+$/;
  var IDENTIFIER_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/;
  function validateObjectField(k) {
    if (k.length === 0) {
      throw new Error("Empty field names are disallowed.");
    }
    if (k.length > MAX_IDENTIFIER_LEN) {
      throw new Error(
        `Field name ${k} exceeds maximum field name length ${MAX_IDENTIFIER_LEN}.`
      );
    }
    if (k.startsWith("$")) {
      throw new Error(`Field name ${k} starts with a '$', which is reserved.`);
    }
    if (ALL_UNDERSCORES.test(k)) {
      throw new Error(`Field name ${k} can't exclusively be underscores.`);
    }
    if (!IDENTIFIER_REGEX.test(k)) {
      throw new Error(
        `Field name ${k} must only contain alphanumeric characters or underscores and can't start with a number.`
      );
    }
  }
  function jsonToConvexInternal(value) {
    if (value === null) {
      return value;
    }
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string") {
      return value;
    }
    if (value instanceof Array) {
      return value.map(jsonToConvexInternal);
    }
    if (typeof value !== "object") {
      throw new Error(`Unexpected type of ${value}`);
    }
    const entries = Object.entries(value);
    if (entries.length === 1) {
      const key = entries[0][0];
      if (key === "$id" || key === "$weakRef" || key === "$strongRef") {
        return Id.fromJSON(value);
      }
      if (key === "$bytes") {
        if (typeof value.$bytes !== "string") {
          throw new Error(`Malformed $bytes field on ${value}`);
        }
        return Base64.toByteArray(value.$bytes).buffer;
      }
      if (key === "$integer") {
        if (typeof value.$integer !== "string") {
          throw new Error(`Malformed $integer field on ${value}`);
        }
        return base64ToBigInt(value.$integer);
      }
      if (key === "$float") {
        if (typeof value.$float !== "string") {
          throw new Error(`Malformed $float field on ${value}`);
        }
        const floatBytes = Base64.toByteArray(value.$float);
        if (floatBytes.byteLength !== 8) {
          throw new Error(
            `Received ${floatBytes.byteLength} bytes, expected 8 for $float`
          );
        }
        const floatBytesView = new DataView(floatBytes.buffer);
        const float = floatBytesView.getFloat64(0, LITTLE_ENDIAN);
        if (!isSpecial(float)) {
          throw new Error(`Float ${float} should be encoded as a number`);
        }
        return float;
      }
      if (key === "$set") {
        if (!(value.$set instanceof Array)) {
          throw new Error(`Malformed $set field on ${value}`);
        }
        return new Set(value.$set.map(jsonToConvexInternal));
      }
      if (key === "$map") {
        if (!(value.$map instanceof Array)) {
          throw new Error(`Malformed $map field on ${value}`);
        }
        const map = /* @__PURE__ */ new Map();
        for (const pair of value.$map) {
          if (!(pair instanceof Array) || pair.length !== 2) {
            throw new Error(`Malformed pair in $map ${value}`);
          }
          const k = jsonToConvexInternal(pair[0]);
          const v = jsonToConvexInternal(pair[1]);
          map.set(k, v);
        }
        return map;
      }
    }
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      validateObjectField(k);
      out[k] = jsonToConvexInternal(v);
    }
    return out;
  }
  function jsonToConvex(value) {
    return jsonToConvexInternal(value);
  }
  function stringifyValueForError(value) {
    return JSON.stringify(value, (_key, value2) => {
      if (value2 === void 0) {
        return "undefined";
      }
      return value2;
    });
  }
  function convexToJsonInternal(value, originalValue, context) {
    if (value === void 0) {
      const contextText = context && ` (present at path ${context} in original object ${stringifyValueForError(
        originalValue
      )})`;
      throw new Error(
        `undefined is not a valid Convex value${contextText}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
      );
    }
    if (value === null) {
      return value;
    }
    if (value instanceof Id) {
      return value.toJSON();
    }
    if (typeof value === "bigint") {
      if (value < MIN_INT64 || MAX_INT64 < value) {
        throw new Error(
          `BigInt ${value} does not fit into a 64-bit signed integer.`
        );
      }
      return { $integer: bigIntToBase64(value) };
    }
    if (typeof value === "number") {
      if (isSpecial(value)) {
        const buffer = new ArrayBuffer(8);
        new DataView(buffer).setFloat64(0, value, LITTLE_ENDIAN);
        return { $float: Base64.fromByteArray(new Uint8Array(buffer)) };
      } else {
        return value;
      }
    }
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      return value;
    }
    if (value instanceof ArrayBuffer) {
      return { $bytes: Base64.fromByteArray(new Uint8Array(value)) };
    }
    if (value instanceof Array) {
      return value.map(
        (value2, i) => convexToJsonInternal(value2, originalValue, context + `[${i}]`)
      );
    }
    if (value instanceof Set) {
      return {
        $set: [...value].map(
          (value2, i) => convexToJsonInternal(value2, originalValue, context + `.keys()[${i}]`)
        )
      };
    }
    if (value instanceof Map) {
      return {
        $map: [...value].map(([k, v], i) => {
          const jsonKey = convexToJsonInternal(
            k,
            originalValue,
            context + `.keys()[${i}]`
          );
          const jsonValue = convexToJsonInternal(
            v,
            originalValue,
            context + `.values()[${i}]`
          );
          return [jsonKey, jsonValue];
        })
      };
    }
    if (typeof value !== "object") {
      throw new Error(
        `${value} is not a supported Convex type (present at path ${context} in original object ${stringifyValueForError(
          originalValue
        )}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
      );
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== null && prototype !== Object.prototype) {
      throw new Error(
        `${value} is not a supported Convex type (present at path ${context} in original object ${stringifyValueForError(
          originalValue
        )}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
      );
    }
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      validateObjectField(k);
      out[k] = convexToJsonInternal(v, originalValue, context + `.${k}`);
    }
    return out;
  }
  function convexToJson(value) {
    return convexToJsonInternal(value, value, "");
  }

  // src/browser/logging.ts
  var INFO_COLOR = "color:rgb(0, 145, 255)";
  function prefix_for_source(source) {
    switch (source) {
      case "query":
        return "Q";
      case "mutation":
        return "M";
      case "action":
        return "A";
    }
  }
  function logToConsole(type, source, udfPath, message) {
    const prefix = prefix_for_source(source);
    if (type === "info") {
      console.log(`%c[CONVEX ${prefix}(${udfPath})] ${message}`, INFO_COLOR);
    } else {
      console.error(`[CONVEX ${prefix}(${udfPath})] ${message}`);
    }
  }
  function logFatalError(message) {
    const errorMessage = `[CONVEX FATAL ERROR] ${message}`;
    console.error(errorMessage);
    return new Error(errorMessage);
  }
  function createError(source, udfPath, message) {
    const prefix = prefix_for_source(source);
    return new Error(`[CONVEX ${prefix}(${udfPath})] ${message}`);
  }

  // src/browser/sync/action_manager.ts
  var ActionManager = class {
    constructor() {
      this.inflightActions = /* @__PURE__ */ new Map();
    }
    request(message) {
      const result = new Promise((resolve, reject) => {
        this.inflightActions.set(message.requestId, {
          message,
          onResult: resolve,
          onFailure: reject
        });
      });
      return result;
    }
    onResponse(response) {
      const actionInfo = this.inflightActions.get(response.requestId);
      if (actionInfo === void 0) {
        return;
      }
      this.inflightActions.delete(response.requestId);
      const udfPath = actionInfo.message.udfPath;
      for (const line of response.logLines) {
        logToConsole("info", "action", udfPath, line);
      }
      if (response.success) {
        actionInfo.onResult(jsonToConvex(response.result));
      } else {
        logToConsole("error", "action", udfPath, response.result);
        actionInfo.onFailure(createError("action", udfPath, response.result));
      }
    }
    hasInflightActions() {
      return this.inflightActions.size > 0;
    }
    restart() {
      for (const [actionId, actionInfo] of this.inflightActions) {
        this.inflightActions.delete(actionId);
        const udfPath = actionInfo.message.udfPath;
        actionInfo.onFailure(createError("action", udfPath, "Transient error"));
      }
    }
  };

  // src/browser/sync/udf_path_utils.ts
  function canonicalizeUdfPath(udfPath) {
    const pieces = udfPath.split(":");
    let moduleName;
    let functionName;
    if (pieces.length === 1) {
      moduleName = pieces[0];
      functionName = "default";
    } else {
      moduleName = pieces.slice(0, pieces.length - 1).join(":");
      functionName = pieces[pieces.length - 1];
    }
    if (!moduleName.endsWith(".js")) {
      moduleName = `${moduleName}.js`;
    }
    return `${moduleName}:${functionName}`;
  }
  function serializePathAndArgs(udfPath, args) {
    return JSON.stringify({
      udfPath: canonicalizeUdfPath(udfPath),
      args: convexToJson(args)
    });
  }

  // src/browser/sync/local_state.ts
  var LocalSyncState = class {
    constructor() {
      this.nextQueryId = 0;
      this.querySetVersion = 0;
      this.identityVersion = 0;
      this.querySet = /* @__PURE__ */ new Map();
      this.queryIdToToken = /* @__PURE__ */ new Map();
    }
    subscribe(udfPath, args, journal) {
      const canonicalizedUdfPath = canonicalizeUdfPath(udfPath);
      const queryToken = serializePathAndArgs(canonicalizedUdfPath, args);
      const existingEntry = this.querySet.get(queryToken);
      if (existingEntry !== void 0) {
        existingEntry.numSubscribers += 1;
        return {
          queryToken,
          modification: null,
          unsubscribe: () => this.removeSubscriber(queryToken)
        };
      } else {
        const queryId = this.nextQueryId++;
        const query = {
          id: queryId,
          canonicalizedUdfPath,
          args,
          numSubscribers: 1,
          journal
        };
        this.querySet.set(queryToken, query);
        this.queryIdToToken.set(queryId, queryToken);
        const baseVersion = this.querySetVersion;
        const newVersion = ++this.querySetVersion;
        const add = {
          type: "Add",
          queryId,
          udfPath: canonicalizedUdfPath,
          args: args.map(convexToJson),
          journal
        };
        const modification = {
          type: "ModifyQuerySet",
          baseVersion,
          newVersion,
          modifications: [add]
        };
        return {
          queryToken,
          modification,
          unsubscribe: () => this.removeSubscriber(queryToken)
        };
      }
    }
    saveQueryJournals(transition) {
      for (const modification of transition.modifications) {
        switch (modification.type) {
          case "QueryUpdated":
          case "QueryFailed": {
            const journal = modification.journal;
            if (journal !== void 0) {
              const queryToken = this.queryIdToToken.get(modification.queryId);
              if (queryToken !== void 0) {
                this.querySet.get(queryToken).journal = journal;
              }
            }
            break;
          }
          case "QueryRemoved": {
            break;
          }
          default: {
            const _ = modification;
            throw new Error(`Invalid modification ${modification}`);
          }
        }
      }
    }
    queryId(udfPath, args) {
      const canonicalizedUdfPath = canonicalizeUdfPath(udfPath);
      const queryToken = serializePathAndArgs(canonicalizedUdfPath, args);
      const existingEntry = this.querySet.get(queryToken);
      if (existingEntry !== void 0) {
        return existingEntry.id;
      }
      return null;
    }
    setAuth(value) {
      this.auth = {
        tokenType: "User",
        value
      };
      const baseVersion = this.identityVersion++;
      return {
        type: "Authenticate",
        baseVersion,
        ...this.auth
      };
    }
    setAdminAuth(value) {
      this.auth = {
        tokenType: "Admin",
        value
      };
      const baseVersion = this.identityVersion++;
      return {
        type: "Authenticate",
        baseVersion,
        ...this.auth
      };
    }
    clearAuth() {
      this.auth = void 0;
      const baseVersion = this.identityVersion++;
      return {
        type: "Authenticate",
        tokenType: "None",
        baseVersion
      };
    }
    hasAuth() {
      return !!this.auth;
    }
    isNewAuth(value) {
      return this.auth?.value !== value;
    }
    queryPath(queryId) {
      const pathAndArgs = this.queryIdToToken.get(queryId);
      if (pathAndArgs) {
        return this.querySet.get(pathAndArgs).canonicalizedUdfPath;
      }
      return null;
    }
    queryArgs(queryId) {
      const pathAndArgs = this.queryIdToToken.get(queryId);
      if (pathAndArgs) {
        return this.querySet.get(pathAndArgs).args;
      }
      return null;
    }
    queryToken(queryId) {
      return this.queryIdToToken.get(queryId) ?? null;
    }
    queryJournal(queryToken) {
      return this.querySet.get(queryToken)?.journal;
    }
    restart() {
      const modifications = [];
      for (const localQuery of this.querySet.values()) {
        const add = {
          type: "Add",
          queryId: localQuery.id,
          udfPath: localQuery.canonicalizedUdfPath,
          args: localQuery.args.map(convexToJson),
          journal: localQuery.journal
        };
        modifications.push(add);
      }
      this.querySetVersion = 1;
      const querySet = {
        type: "ModifyQuerySet",
        baseVersion: 0,
        newVersion: 1,
        modifications
      };
      if (!this.auth) {
        this.identityVersion = 0;
        return [querySet, void 0];
      }
      const authenticate = {
        type: "Authenticate",
        baseVersion: 0,
        ...this.auth
      };
      this.identityVersion = 1;
      return [querySet, authenticate];
    }
    removeSubscriber(queryToken) {
      const localQuery = this.querySet.get(queryToken);
      if (localQuery.numSubscribers > 1) {
        localQuery.numSubscribers -= 1;
        return null;
      } else {
        this.querySet.delete(queryToken);
        this.queryIdToToken.delete(localQuery.id);
        const baseVersion = this.querySetVersion;
        const newVersion = ++this.querySetVersion;
        const remove = {
          type: "Remove",
          queryId: localQuery.id
        };
        return {
          type: "ModifyQuerySet",
          baseVersion,
          newVersion,
          modifications: [remove]
        };
      }
    }
  };

  // src/browser/sync/request_manager.ts
  var RequestManager = class {
    constructor() {
      this.inflightRequests = /* @__PURE__ */ new Map();
    }
    request(message) {
      const result = new Promise((resolve, reject) => {
        this.inflightRequests.set(message.requestId, {
          message,
          status: { status: "Requested", onResult: resolve, onFailure: reject }
        });
      });
      return result;
    }
    onResponse(response) {
      const requestInfo = this.inflightRequests.get(response.requestId);
      if (requestInfo === void 0) {
        return null;
      }
      if (requestInfo.status.status !== "Requested") {
        return null;
      }
      const udfType = "mutation";
      const udfPath = requestInfo.message.udfPath;
      for (const line of response.logLines) {
        logToConsole("info", udfType, udfPath, line);
      }
      const status = requestInfo.status;
      let onResolve;
      if (response.success) {
        onResolve = () => status.onResult(jsonToConvex(response.result));
      } else {
        logToConsole("error", udfType, udfPath, response.result);
        onResolve = () => status.onFailure(createError(udfType, udfPath, response.result));
      }
      if (!response.success) {
        onResolve();
        this.inflightRequests.delete(response.requestId);
        return response.requestId;
      }
      requestInfo.status = {
        status: "Completed",
        ts: response.ts,
        onResolve
      };
      return null;
    }
    removeCompleted(ts) {
      const completeMutations = /* @__PURE__ */ new Set();
      for (const [requestId, requestInfo] of this.inflightRequests.entries()) {
        const status = requestInfo.status;
        if (status.status === "Completed" && status.ts.lessThanOrEqual(ts)) {
          status.onResolve();
          if (requestInfo.message.type === "Mutation") {
            completeMutations.add(requestId);
          }
          this.inflightRequests.delete(requestId);
        }
      }
      return completeMutations;
    }
    restart() {
      const allMessages = [];
      for (const value of this.inflightRequests.values()) {
        allMessages.push(value.message);
      }
      return allMessages;
    }
    hasIncompleteRequests() {
      for (const requestInfo of this.inflightRequests.values()) {
        if (requestInfo.status.status === "Requested") {
          return true;
        }
      }
      return false;
    }
    hasInflightRequests() {
      return this.inflightRequests.size > 0;
    }
  };

  // src/browser/sync/optimistic_updates_impl.ts
  var OptimisticLocalStoreImpl = class {
    constructor(queryResults) {
      this.queryResults = queryResults;
      this.modifiedQueries = [];
    }
    getQuery(name, args) {
      const query = this.queryResults.get(serializePathAndArgs(name, args));
      if (query === void 0) {
        return void 0;
      }
      return OptimisticLocalStoreImpl.queryValue(query.result);
    }
    getAllQueries(name) {
      const queriesWithName = [];
      for (const query of this.queryResults.values()) {
        if (query.udfPath === canonicalizeUdfPath(name)) {
          queriesWithName.push({
            args: query.args,
            value: OptimisticLocalStoreImpl.queryValue(query.result)
          });
        }
      }
      return queriesWithName;
    }
    setQuery(name, args, value) {
      const queryToken = serializePathAndArgs(name, args);
      let result;
      if (value === void 0) {
        result = void 0;
      } else {
        result = {
          success: true,
          value
        };
      }
      const query = {
        udfPath: name,
        args,
        result
      };
      this.queryResults.set(queryToken, query);
      this.modifiedQueries.push(queryToken);
    }
    static queryValue(result) {
      if (result === void 0) {
        return void 0;
      } else if (result.success) {
        return result.value;
      } else {
        return void 0;
      }
    }
  };
  var OptimisticQueryResults = class {
    constructor() {
      this.queryResults = /* @__PURE__ */ new Map();
      this.optimisticUpdates = [];
    }
    ingestQueryResultsFromServer(serverQueryResults, optimisticUpdatesToDrop) {
      this.optimisticUpdates = this.optimisticUpdates.filter((updateAndId) => {
        return !optimisticUpdatesToDrop.has(updateAndId.mutationId);
      });
      const oldQueryResults = this.queryResults;
      this.queryResults = new Map(serverQueryResults);
      const localStore = new OptimisticLocalStoreImpl(this.queryResults);
      for (const updateAndId of this.optimisticUpdates) {
        updateAndId.update(localStore);
      }
      const changedQueries = [];
      for (const [queryToken, query] of this.queryResults) {
        const oldQuery = oldQueryResults.get(queryToken);
        if (oldQuery === void 0 || oldQuery.result !== query.result) {
          changedQueries.push(queryToken);
        }
      }
      return changedQueries;
    }
    applyOptimisticUpdate(update, mutationId) {
      this.optimisticUpdates.push({
        update,
        mutationId
      });
      const localStore = new OptimisticLocalStoreImpl(this.queryResults);
      update(localStore);
      return localStore.modifiedQueries;
    }
    queryResult(queryToken) {
      const query = this.queryResults.get(queryToken);
      if (query === void 0) {
        return void 0;
      }
      const result = query.result;
      if (result === void 0) {
        return void 0;
      } else if (result.success) {
        return result.value;
      } else {
        throw createError("query", query.udfPath, result.errorMessage);
      }
    }
  };

  // src/browser/long.ts
  var Long = class {
    static isLong(obj) {
      return (obj && obj.__isUnsignedLong__) === true;
    }
    constructor(low, high) {
      this.low = low | 0;
      this.high = high | 0;
      this.__isUnsignedLong__ = true;
    }
    static fromBytesLE(bytes) {
      return new Long(
        bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
        bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24
      );
    }
    toBytesLE() {
      const hi = this.high;
      const lo = this.low;
      return [
        lo & 255,
        lo >>> 8 & 255,
        lo >>> 16 & 255,
        lo >>> 24,
        hi & 255,
        hi >>> 8 & 255,
        hi >>> 16 & 255,
        hi >>> 24
      ];
    }
    static fromNumber(value) {
      if (isNaN(value))
        return UZERO;
      if (value < 0)
        return UZERO;
      if (value >= TWO_PWR_64_DBL)
        return MAX_UNSIGNED_VALUE;
      return new Long(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0);
    }
    equals(other) {
      if (!Long.isLong(other))
        other = Long.fromValue(other);
      if (this.high >>> 31 === 1 && other.high >>> 31 === 1)
        return false;
      return this.high === other.high && this.low === other.low;
    }
    notEquals(other) {
      return !this.equals(other);
    }
    comp(other) {
      if (!Long.isLong(other))
        other = Long.fromValue(other);
      if (this.equals(other))
        return 0;
      return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
    }
    lessThanOrEqual(other) {
      return this.comp(other) <= 0;
    }
    static fromValue(val) {
      if (typeof val === "number")
        return Long.fromNumber(val);
      return new Long(val.low, val.high);
    }
  };
  var UZERO = new Long(0, 0);
  var TWO_PWR_16_DBL = 1 << 16;
  var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
  var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
  var MAX_UNSIGNED_VALUE = new Long(4294967295 | 0, 4294967295 | 0);

  // src/browser/sync/remote_query_set.ts
  var RemoteQuerySet = class {
    constructor(queryPath) {
      this.version = { querySet: 0, ts: Long.fromNumber(0), identity: 0 };
      this.remoteQuerySet = /* @__PURE__ */ new Map();
      this.queryPath = queryPath;
    }
    transition(transition) {
      const start = transition.startVersion;
      if (this.version.querySet !== start.querySet || this.version.ts.notEquals(start.ts) || this.version.identity !== start.identity) {
        throw new Error(`Invalid start version: ${start.ts}:${start.querySet}`);
      }
      for (const modification of transition.modifications) {
        switch (modification.type) {
          case "QueryUpdated": {
            const queryPath = this.queryPath(modification.queryId);
            if (queryPath) {
              for (const line of modification.logLines) {
                logToConsole("info", "query", queryPath, line);
              }
            }
            const value = jsonToConvex(modification.value ?? null);
            this.remoteQuerySet.set(modification.queryId, {
              success: true,
              value
            });
            break;
          }
          case "QueryFailed": {
            const queryPath = this.queryPath(modification.queryId);
            if (queryPath) {
              for (const line of modification.logLines) {
                logToConsole("info", "query", queryPath, line);
              }
            }
            this.remoteQuerySet.set(modification.queryId, {
              success: false,
              errorMessage: modification.errorMessage
            });
            break;
          }
          case "QueryRemoved": {
            this.remoteQuerySet.delete(modification.queryId);
            break;
          }
          default: {
            const _ = modification;
            throw new Error(`Invalid modification ${modification}`);
          }
        }
      }
      this.version = transition.endVersion;
    }
    remoteQueryResults() {
      return this.remoteQuerySet;
    }
    timestamp() {
      return this.version.ts;
    }
  };

  // src/browser/sync/protocol.ts
  var Base642 = __toESM(require_base64_js());
  function u64ToLong(encoded) {
    const integerBytes = Base642.toByteArray(encoded);
    return Long.fromBytesLE(Array.from(integerBytes));
  }
  function parseServerMessage(encoded) {
    switch (encoded.type) {
      case "FatalError":
      case "AuthError":
      case "ActionResponse":
      case "Ping": {
        return { ...encoded };
      }
      case "MutationResponse": {
        if (encoded.success) {
          return { ...encoded, ts: u64ToLong(encoded.ts) };
        } else {
          return { ...encoded };
        }
      }
      case "Transition": {
        return {
          ...encoded,
          startVersion: {
            ...encoded.startVersion,
            ts: u64ToLong(encoded.startVersion.ts)
          },
          endVersion: {
            ...encoded.endVersion,
            ts: u64ToLong(encoded.endVersion.ts)
          }
        };
      }
      default: {
        const _exhaustivenessCheck = encoded;
      }
    }
    return void 0;
  }

  // src/browser/sync/web_socket_manager.ts
  var CLOSE_NORMAL = 1e3;
  var CLOSE_NO_STATUS = 1005;
  function promisePair() {
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    return { promise, resolve: resolvePromise };
  }
  var WebSocketManager = class {
    constructor(uri, onOpen, onMessage, webSocketConstructor) {
      this.webSocketConstructor = webSocketConstructor;
      this.socket = { state: "disconnected" };
      this.connectionCount = 0;
      this.lastCloseReason = "InitialConnect";
      this.initialBackoff = 100;
      this.maxBackoff = 16e3;
      this.retries = 0;
      this.serverInactivityThreshold = 3e4;
      this.reconnectDueToServerInactivityTimeout = null;
      this.uri = uri;
      this.onOpen = onOpen;
      this.onMessage = onMessage;
      void this.connect();
    }
    async connect() {
      if (this.socket.state === "closing" || this.socket.state === "stopping" || this.socket.state === "stopped") {
        return;
      }
      if (this.socket.state !== "disconnected" && this.socket.state !== "paused") {
        throw new Error("Didn't start connection from disconnected state");
      }
      const ws = new this.webSocketConstructor(this.uri);
      this.socket = {
        state: "connecting",
        ws
      };
      ws.onopen = () => {
        if (this.socket.state !== "connecting") {
          throw new Error("onopen called with socket not in connecting state");
        }
        this.socket = { state: "ready", ws };
        this.onServerActivity();
        this.onOpen({
          connectionCount: this.connectionCount,
          lastCloseReason: this.lastCloseReason
        });
        if (this.lastCloseReason !== "InitialConnect") {
          console.log("WebSocket reconnected");
        }
        this.connectionCount += 1;
        this.lastCloseReason = null;
      };
      ws.onerror = (error) => {
        const message = error.message;
        console.log(`WebSocket error: ${message}`);
        this.closeAndReconnect("WebSocketError");
      };
      ws.onmessage = (message) => {
        this.retries = 0;
        this.onServerActivity();
        const serverMessage = parseServerMessage(JSON.parse(message.data));
        this.onMessage(serverMessage);
      };
      ws.onclose = (event) => {
        if (this.lastCloseReason === null) {
          this.lastCloseReason = event.reason ?? "OnCloseInvoked";
        }
        if (event.code !== CLOSE_NORMAL && event.code !== CLOSE_NO_STATUS) {
          let msg = `WebSocket closed unexpectedly with code ${event.code}`;
          if (event.reason) {
            msg += `: ${event.reason}`;
          }
          console.error(msg);
        }
        if (this.socket.state === "stopping") {
          this.socket.promisePair.resolve(null);
          this.socket = { state: "stopped" };
          return;
        }
        if (this.socket.state === "pausing") {
          this.socket.promisePair.resolve(null);
          this.socket = { state: "paused" };
          return;
        }
        this.socket = { state: "disconnected" };
        const backoff = this.nextBackoff();
        console.log(`Attempting reconnect in ${backoff}ms`);
        setTimeout(() => this.connect(), backoff);
      };
    }
    socketState() {
      return this.socket.state;
    }
    sendMessage(message) {
      if (this.socket.state === "ready") {
        const request = JSON.stringify(message);
        try {
          this.socket.ws.send(request);
        } catch (error) {
          console.log(
            `Failed to send message on WebSocket, reconnecting: ${error}`
          );
          this.closeAndReconnect("FailedToSendMessage");
        }
      }
    }
    onServerActivity() {
      if (this.reconnectDueToServerInactivityTimeout !== null) {
        clearTimeout(this.reconnectDueToServerInactivityTimeout);
        this.reconnectDueToServerInactivityTimeout = null;
      }
      this.reconnectDueToServerInactivityTimeout = setTimeout(() => {
        this.closeAndReconnect("InactiveServer");
      }, this.serverInactivityThreshold);
    }
    closeAndReconnect(closeReason) {
      switch (this.socket.state) {
        case "disconnected":
        case "closing":
        case "stopping":
        case "stopped":
        case "pausing":
        case "paused":
          return;
        case "connecting":
        case "ready":
          this.lastCloseReason = closeReason;
          this.socket.ws.close();
          this.socket = {
            state: "closing"
          };
          return;
        default: {
          const _ = this.socket;
        }
      }
    }
    async stop() {
      if (this.reconnectDueToServerInactivityTimeout) {
        clearTimeout(this.reconnectDueToServerInactivityTimeout);
      }
      switch (this.socket.state) {
        case "stopped":
          return;
        case "connecting":
        case "ready":
          this.socket.ws.close();
          this.socket = {
            state: "stopping",
            promisePair: promisePair()
          };
          await this.socket.promisePair.promise;
          return;
        case "pausing":
        case "closing":
          this.socket = {
            state: "stopping",
            promisePair: promisePair()
          };
          await this.socket.promisePair.promise;
          return;
        case "paused":
        case "disconnected":
          this.socket = { state: "stopped" };
          return;
        case "stopping":
          await this.socket.promisePair.promise;
          return;
        default: {
          const _ = this.socket;
        }
      }
    }
    async pause() {
      switch (this.socket.state) {
        case "stopping":
        case "stopped":
          return;
        case "paused":
          return;
        case "connecting":
        case "ready":
          this.socket.ws.close();
          this.socket = {
            state: "pausing",
            promisePair: promisePair()
          };
          await this.socket.promisePair.promise;
          return;
        case "closing":
          this.socket = {
            state: "pausing",
            promisePair: promisePair()
          };
          await this.socket.promisePair.promise;
          return;
        case "disconnected":
          this.socket = { state: "paused" };
          return;
        case "pausing":
          await this.socket.promisePair.promise;
          return;
        default: {
          const _ = this.socket;
        }
      }
    }
    async resume() {
      switch (this.socket.state) {
        case "pausing":
        case "paused":
          break;
        case "stopping":
        case "stopped":
          return;
        case "connecting":
        case "ready":
        case "closing":
        case "disconnected":
          throw new Error("`resume()` is only valid after `pause()`");
        default: {
          const _ = this.socket;
        }
      }
      if (this.socket.state === "pausing") {
        await this.socket.promisePair.promise;
      }
      await this.connect();
    }
    nextBackoff() {
      const baseBackoff = this.initialBackoff * Math.pow(2, this.retries);
      this.retries += 1;
      const actualBackoff = Math.min(baseBackoff, this.maxBackoff);
      const jitter = actualBackoff * (Math.random() - 0.5);
      return actualBackoff + jitter;
    }
  };

  // src/browser/sync/client.ts
  var DEFAULT_OPTIONS = {
    unsavedChangesWarning: true
  };
  var InternalConvexClient = class {
    constructor(address, onTransition, options) {
      this.fetchToken = null;
      if (typeof address === "object") {
        throw new Error(
          "Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly."
        );
      }
      options = { ...DEFAULT_OPTIONS, ...options };
      let webSocketConstructor = options.webSocketConstructor;
      if (!webSocketConstructor && typeof WebSocket === "undefined") {
        throw new Error(
          "No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient"
        );
      }
      webSocketConstructor = webSocketConstructor || WebSocket;
      const i = address.search("://");
      if (i === -1) {
        throw new Error("Provided address was not an absolute URL.");
      }
      const origin = address.substring(i + 3);
      const protocol = address.substring(0, i);
      let wsProtocol;
      if (protocol === "http") {
        wsProtocol = "ws";
      } else if (protocol === "https") {
        wsProtocol = "wss";
      } else {
        throw new Error(`Unknown parent protocol ${protocol}`);
      }
      const wsUri = `${wsProtocol}://${origin}/api/${version}/sync`;
      this.state = new LocalSyncState();
      this.remoteQuerySet = new RemoteQuerySet(
        (queryId) => this.state.queryPath(queryId)
      );
      this.requestManager = new RequestManager();
      this.actionManager = new ActionManager();
      this.optimisticQueryResults = new OptimisticQueryResults();
      this.onTransition = onTransition;
      this.nextRequestId = 0;
      this.sessionId = v4_default();
      const { unsavedChangesWarning } = options;
      if (typeof window === "undefined" && unsavedChangesWarning) {
        throw new Error(
          "unsavedChangesWarning enabled, but no window object found! Navigating away from the page could cause in-flight mutations to be dropped. Pass {unsavedChangesWarning: false} in Convex client options to disable this feature."
        );
      }
      unsavedChangesWarning && window.addEventListener("beforeunload", (e) => {
        if (this.requestManager.hasIncompleteRequests() || this.actionManager.hasInflightActions()) {
          e.preventDefault();
          const confirmationMessage = "Are you sure you want to leave? Your changes may not be saved.";
          (e || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        }
      });
      this.webSocketManager = new WebSocketManager(
        wsUri,
        (reconnectMetadata) => {
          this.webSocketManager.sendMessage({
            ...reconnectMetadata,
            type: "Connect",
            sessionId: this.sessionId
          });
          this.remoteQuerySet = new RemoteQuerySet(
            (queryId) => this.state.queryPath(queryId)
          );
          const [querySetModification, authModification] = this.state.restart();
          if (authModification) {
            this.webSocketManager.sendMessage(authModification);
          }
          this.webSocketManager.sendMessage(querySetModification);
          this.actionManager.restart();
          for (const message of this.requestManager.restart()) {
            this.webSocketManager.sendMessage(message);
          }
        },
        (serverMessage) => {
          switch (serverMessage.type) {
            case "Transition": {
              this.remoteQuerySet.transition(serverMessage);
              this.state.saveQueryJournals(serverMessage);
              const completedMutations = this.requestManager.removeCompleted(
                this.remoteQuerySet.timestamp()
              );
              this.notifyOnQueryResultChanges(completedMutations);
              break;
            }
            case "MutationResponse": {
              const completedMutationId = this.requestManager.onResponse(serverMessage);
              if (completedMutationId) {
                this.notifyOnQueryResultChanges(/* @__PURE__ */ new Set([completedMutationId]));
              }
              break;
            }
            case "ActionResponse": {
              this.actionManager.onResponse(serverMessage);
              break;
            }
            case "AuthError": {
              this.tryToReauthenticate(serverMessage).then().catch((error) => {
                logFatalError(error);
                void this.webSocketManager.stop();
              });
              break;
            }
            case "FatalError": {
              const error = logFatalError(serverMessage.error);
              void this.webSocketManager.stop();
              throw error;
            }
            case "Ping":
              break;
            default: {
              const _typeCheck = serverMessage;
            }
          }
        },
        webSocketConstructor
      );
    }
    notifyOnQueryResultChanges(completedMutations) {
      const remoteQueryResults = this.remoteQuerySet.remoteQueryResults();
      const queryTokenToValue = /* @__PURE__ */ new Map();
      for (const [queryId, result] of remoteQueryResults) {
        const queryToken = this.state.queryToken(queryId);
        if (queryToken !== null) {
          const query = {
            result,
            udfPath: this.state.queryPath(queryId),
            args: this.state.queryArgs(queryId)
          };
          queryTokenToValue.set(queryToken, query);
        }
      }
      this.onTransition(
        this.optimisticQueryResults.ingestQueryResultsFromServer(
          queryTokenToValue,
          completedMutations
        )
      );
    }
    async setAuth(fetchToken) {
      this.fetchToken = fetchToken;
      const token = await fetchToken();
      if (token) {
        this.authenticate(token);
      } else if (this.state.hasAuth()) {
        this.clearAuth();
      }
    }
    async tryToReauthenticate(serverMessage) {
      if (!this.fetchToken) {
        throw new Error(serverMessage.error);
      }
      console.log("Attempting to reauthenticate");
      await this.webSocketManager.pause();
      const token = await this.fetchToken();
      if (token && this.state.isNewAuth(token)) {
        this.state.setAuth(token);
      } else if (this.state.hasAuth()) {
        console.log("Reauthentication failed, clearing auth");
        this.state.clearAuth();
      }
      await this.webSocketManager.resume();
    }
    authenticate(token) {
      const message = this.state.setAuth(token);
      this.webSocketManager.sendMessage(message);
    }
    setAdminAuth(value) {
      const message = this.state.setAdminAuth(value);
      this.webSocketManager.sendMessage(message);
    }
    clearAuth() {
      const message = this.state.clearAuth();
      this.webSocketManager.sendMessage(message);
    }
    subscribe(name, args, journal) {
      if (!Array.isArray(args)) {
        throw new Error(
          `Query arguments to \`InternalConvexClient.subcribe\` must be an array. Received ${args}.`
        );
      }
      const { modification, queryToken, unsubscribe } = this.state.subscribe(
        name,
        args,
        journal
      );
      if (modification !== null) {
        this.webSocketManager.sendMessage(modification);
      }
      return {
        queryToken,
        unsubscribe: () => {
          const modification2 = unsubscribe();
          if (modification2) {
            this.webSocketManager.sendMessage(modification2);
          }
        }
      };
    }
    localQueryResult(udfPath, args) {
      const queryToken = serializePathAndArgs(udfPath, args);
      return this.optimisticQueryResults.queryResult(queryToken);
    }
    queryJournal(name, args) {
      const queryToken = serializePathAndArgs(name, args);
      return this.state.queryJournal(queryToken);
    }
    connectionState() {
      return {
        hasInflightRequests: this.requestManager.hasInflightRequests() || this.actionManager.hasInflightActions(),
        isWebSocketConnected: this.webSocketManager.socketState() === "ready"
      };
    }
    async mutate(udfPath, args, optimisticUpdate = null) {
      const requestId = this.nextRequestId;
      this.nextRequestId++;
      if (optimisticUpdate !== null) {
        const wrappedUpdate = (localQueryStore) => {
          optimisticUpdate(localQueryStore, ...args);
        };
        const changedQueries = this.optimisticQueryResults.applyOptimisticUpdate(
          wrappedUpdate,
          requestId
        );
        this.onTransition(changedQueries);
      }
      const message = {
        type: "Mutation",
        requestId,
        udfPath,
        args: convexToJson(args)
      };
      const result = this.requestManager.request(message);
      this.webSocketManager.sendMessage(message);
      return result;
    }
    async action(udfPath, args) {
      const requestId = this.nextRequestId;
      this.nextRequestId++;
      const message = {
        type: "Action",
        requestId,
        udfPath,
        args: convexToJson(args)
      };
      const result = this.actionManager.request(message);
      this.webSocketManager.sendMessage(message);
      return result;
    }
    async close() {
      return this.webSocketManager.stop();
    }
  };

  // src/common/index.ts
  var STATUS_CODE_UDF_FAILED = 560;

  // src/browser/http_client.ts
  var fetch = globalThis.fetch || ((...args) => Promise.resolve().then(() => __toESM(require_browser())).then(
    ({ default: fetch2 }) => fetch2(...args)
  ));
  var ConvexHttpClient = class {
    constructor(address) {
      this.address = `${address}/api`;
      this.debug = true;
    }
    backendUrl() {
      return this.address;
    }
    setAuth(value) {
      this.auth = value;
    }
    clearAuth() {
      this.auth = void 0;
    }
    setDebug(debug) {
      this.debug = debug;
    }
    query(name) {
      return async (...args) => {
        const body = JSON.stringify({
          path: name,
          args: convexToJson(args),
          debug: this.debug
        });
        const headers = {
          "Content-Type": "application/json",
          "Convex-Client": `npm-${version}`
        };
        if (this.auth) {
          headers["Authorization"] = `Bearer ${this.auth}`;
        }
        const response = await fetch(`${this.address}/query`, {
          body,
          method: "POST",
          headers,
          credentials: "include"
        });
        if (!response.ok && response.status !== STATUS_CODE_UDF_FAILED) {
          throw new Error(await response.text());
        }
        const respJSON = await response.json();
        for (const line of respJSON.logLines ?? []) {
          logToConsole("info", "query", name, line);
        }
        switch (respJSON.status) {
          case "success":
            return jsonToConvex(respJSON.value);
          case "error":
            throw new Error(respJSON.errorMessage);
          default:
            throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
        }
      };
    }
    mutation(name) {
      return async (...args) => {
        const body = JSON.stringify({
          path: name,
          args: convexToJson(args),
          debug: this.debug
        });
        const headers = {
          "Content-Type": "application/json",
          "Convex-Client": `npm-${version}`
        };
        if (this.auth) {
          headers["Authorization"] = `Bearer ${this.auth}`;
        }
        const response = await fetch(`${this.address}/mutation`, {
          body,
          method: "POST",
          headers,
          credentials: "include"
        });
        if (!response.ok && response.status !== STATUS_CODE_UDF_FAILED) {
          throw new Error(await response.text());
        }
        const respJSON = await response.json();
        for (const line of respJSON.logLines ?? []) {
          logToConsole("info", "mutation", name, line);
        }
        switch (respJSON.status) {
          case "success":
            return jsonToConvex(respJSON.value);
          case "error":
            throw new Error(respJSON.errorMessage);
          default:
            throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
        }
      };
    }
    action(name) {
      return async (...args) => {
        const body = JSON.stringify({
          path: name,
          args: convexToJson(args),
          debug: this.debug
        });
        const headers = {
          "Content-Type": "application/json",
          "Convex-Client": `npm-${version}`
        };
        if (this.auth) {
          headers["Authorization"] = `Bearer ${this.auth}`;
        }
        const response = await fetch(`${this.address}/action`, {
          body,
          method: "POST",
          headers,
          credentials: "include"
        });
        if (!response.ok && response.status !== STATUS_CODE_UDF_FAILED) {
          throw new Error(await response.text());
        }
        const respJSON = await response.json();
        for (const line of respJSON.logLines ?? []) {
          logToConsole("info", "action", name, line);
        }
        switch (respJSON.status) {
          case "success":
            return jsonToConvex(respJSON.value);
          case "error":
            throw new Error(respJSON.errorMessage);
          default:
            throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
        }
      };
    }
  };
  return __toCommonJS(browser_exports);
})();
//# sourceMappingURL=browser.bundle.js.map