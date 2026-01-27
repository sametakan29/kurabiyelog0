module.exports = [
"[project]/node_modules/kind-of/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var toString = Object.prototype.toString;
module.exports = function kindOf(val) {
    if (val === void 0) return 'undefined';
    if (val === null) return 'null';
    var type = typeof val;
    if (type === 'boolean') return 'boolean';
    if (type === 'string') return 'string';
    if (type === 'number') return 'number';
    if (type === 'symbol') return 'symbol';
    if (type === 'function') {
        return isGeneratorFn(val) ? 'generatorfunction' : 'function';
    }
    if (isArray(val)) return 'array';
    if (isBuffer(val)) return 'buffer';
    if (isArguments(val)) return 'arguments';
    if (isDate(val)) return 'date';
    if (isError(val)) return 'error';
    if (isRegexp(val)) return 'regexp';
    switch(ctorName(val)){
        case 'Symbol':
            return 'symbol';
        case 'Promise':
            return 'promise';
        // Set, Map, WeakSet, WeakMap
        case 'WeakMap':
            return 'weakmap';
        case 'WeakSet':
            return 'weakset';
        case 'Map':
            return 'map';
        case 'Set':
            return 'set';
        // 8-bit typed arrays
        case 'Int8Array':
            return 'int8array';
        case 'Uint8Array':
            return 'uint8array';
        case 'Uint8ClampedArray':
            return 'uint8clampedarray';
        // 16-bit typed arrays
        case 'Int16Array':
            return 'int16array';
        case 'Uint16Array':
            return 'uint16array';
        // 32-bit typed arrays
        case 'Int32Array':
            return 'int32array';
        case 'Uint32Array':
            return 'uint32array';
        case 'Float32Array':
            return 'float32array';
        case 'Float64Array':
            return 'float64array';
    }
    if (isGeneratorObj(val)) {
        return 'generator';
    }
    // Non-plain objects
    type = toString.call(val);
    switch(type){
        case '[object Object]':
            return 'object';
        // iterators
        case '[object Map Iterator]':
            return 'mapiterator';
        case '[object Set Iterator]':
            return 'setiterator';
        case '[object String Iterator]':
            return 'stringiterator';
        case '[object Array Iterator]':
            return 'arrayiterator';
    }
    // other
    return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};
function ctorName(val) {
    return typeof val.constructor === 'function' ? val.constructor.name : null;
}
function isArray(val) {
    if (Array.isArray) return Array.isArray(val);
    return val instanceof Array;
}
function isError(val) {
    return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}
function isDate(val) {
    if (val instanceof Date) return true;
    return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}
function isRegexp(val) {
    if (val instanceof RegExp) return true;
    return typeof val.flags === 'string' && typeof val.ignoreCase === 'boolean' && typeof val.multiline === 'boolean' && typeof val.global === 'boolean';
}
function isGeneratorFn(name, val) {
    return ctorName(name) === 'GeneratorFunction';
}
function isGeneratorObj(val) {
    return typeof val.throw === 'function' && typeof val.return === 'function' && typeof val.next === 'function';
}
function isArguments(val) {
    try {
        if (typeof val.length === 'number' && typeof val.callee === 'function') {
            return true;
        }
    } catch (err) {
        if (err.message.indexOf('callee') !== -1) {
            return true;
        }
    }
    return false;
}
/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */ function isBuffer(val) {
    if (val.constructor && typeof val.constructor.isBuffer === 'function') {
        return val.constructor.isBuffer(val);
    }
    return false;
}
}),
"[project]/node_modules/is-extendable/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */ module.exports = function isExtendable(val) {
    return typeof val !== 'undefined' && val !== null && (typeof val === 'object' || typeof val === 'function');
};
}),
"[project]/node_modules/extend-shallow/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isObject = __turbopack_context__.r("[project]/node_modules/is-extendable/index.js [app-rsc] (ecmascript)");
module.exports = function extend(o /*, objects*/ ) {
    if (!isObject(o)) {
        o = {};
    }
    var len = arguments.length;
    for(var i = 1; i < len; i++){
        var obj = arguments[i];
        if (isObject(obj)) {
            assign(o, obj);
        }
    }
    return o;
};
function assign(a, b) {
    for(var key in b){
        if (hasOwn(b, key)) {
            a[key] = b[key];
        }
    }
}
/**
 * Returns true if the given `key` is an own property of `obj`.
 */ function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
}),
"[project]/node_modules/section-matter/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var typeOf = __turbopack_context__.r("[project]/node_modules/kind-of/index.js [app-rsc] (ecmascript)");
var extend = __turbopack_context__.r("[project]/node_modules/extend-shallow/index.js [app-rsc] (ecmascript)");
/**
 * Parse sections in `input` with the given `options`.
 *
 * ```js
 * var sections = require('{%= name %}');
 * var result = sections(input, options);
 * // { content: 'Content before sections', sections: [] }
 * ```
 * @param {String|Buffer|Object} `input` If input is an object, it's `content` property must be a string or buffer.
 * @param {Object} options
 * @return {Object} Returns an object with a `content` string and an array of `sections` objects.
 * @api public
 */ module.exports = function(input, options) {
    if (typeof options === 'function') {
        options = {
            parse: options
        };
    }
    var file = toObject(input);
    var defaults = {
        section_delimiter: '---',
        parse: identity
    };
    var opts = extend({}, defaults, options);
    var delim = opts.section_delimiter;
    var lines = file.content.split(/\r?\n/);
    var sections = null;
    var section = createSection();
    var content = [];
    var stack = [];
    function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
    }
    function closeSection(val) {
        if (stack.length) {
            section.key = getKey(stack[0], delim);
            section.content = val;
            opts.parse(section, sections);
            sections.push(section);
            section = createSection();
            content = [];
            stack = [];
        }
    }
    for(var i = 0; i < lines.length; i++){
        var line = lines[i];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
            if (ln.length === 3 && i !== 0) {
                if (len === 0 || len === 2) {
                    content.push(line);
                    continue;
                }
                stack.push(ln);
                section.data = content.join('\n');
                content = [];
                continue;
            }
            if (sections === null) {
                initSections(content.join('\n'));
            }
            if (len === 2) {
                closeSection(content.join('\n'));
            }
            stack.push(ln);
            continue;
        }
        content.push(line);
    }
    if (sections === null) {
        initSections(content.join('\n'));
    } else {
        closeSection(content.join('\n'));
    }
    file.sections = sections;
    return file;
};
function isDelimiter(line, delim) {
    if (line.slice(0, delim.length) !== delim) {
        return false;
    }
    if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
    }
    return true;
}
function toObject(input) {
    if (typeOf(input) !== 'object') {
        input = {
            content: input
        };
    }
    if (typeof input.content !== 'string' && !isBuffer(input.content)) {
        throw new TypeError('expected a buffer or string');
    }
    input.content = input.content.toString();
    input.sections = [];
    return input;
}
function getKey(val, delim) {
    return val ? val.slice(delim.length).trim() : '';
}
function createSection() {
    return {
        key: '',
        data: '',
        content: ''
    };
}
function identity(val) {
    return val;
}
function isBuffer(val) {
    if (val && val.constructor && typeof val.constructor.isBuffer === 'function') {
        return val.constructor.isBuffer(val);
    }
    return false;
}
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// YAML error class. http://stackoverflow.com/questions/8458984
//
function YAMLException(reason, mark) {
    // Super constructor
    Error.call(this);
    this.name = 'YAMLException';
    this.reason = reason;
    this.mark = mark;
    this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');
    // Include stack trace in error object
    if (Error.captureStackTrace) {
        // Chrome and NodeJS
        Error.captureStackTrace(this, this.constructor);
    } else {
        // FF, IE 10+ and Safari 6+. Fallback for others
        this.stack = new Error().stack || '';
    }
}
// Inherit from Error
YAMLException.prototype = Object.create(Error.prototype);
YAMLException.prototype.constructor = YAMLException;
YAMLException.prototype.toString = function toString(compact) {
    var result = this.name + ': ';
    result += this.reason || '(unknown reason)';
    if (!compact && this.mark) {
        result += ' ' + this.mark.toString();
    }
    return result;
};
module.exports = YAMLException;
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var YAMLException = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
var TYPE_CONSTRUCTOR_OPTIONS = [
    'kind',
    'resolve',
    'construct',
    'instanceOf',
    'predicate',
    'represent',
    'defaultStyle',
    'styleAliases'
];
var YAML_NODE_KINDS = [
    'scalar',
    'sequence',
    'mapping'
];
function compileStyleAliases(map) {
    var result = {};
    if (map !== null) {
        Object.keys(map).forEach(function(style) {
            map[style].forEach(function(alias) {
                result[String(alias)] = style;
            });
        });
    }
    return result;
}
function Type(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
            throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
    });
    // TODO: Add tag format check.
    this.tag = tag;
    this.kind = options['kind'] || null;
    this.resolve = options['resolve'] || function() {
        return true;
    };
    this.construct = options['construct'] || function(data) {
        return data;
    };
    this.instanceOf = options['instanceOf'] || null;
    this.predicate = options['predicate'] || null;
    this.represent = options['represent'] || null;
    this.defaultStyle = options['defaultStyle'] || null;
    this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
}
module.exports = Type;
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function isNothing(subject) {
    return typeof subject === 'undefined' || subject === null;
}
function isObject(subject) {
    return typeof subject === 'object' && subject !== null;
}
function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if (isNothing(sequence)) return [];
    return [
        sequence
    ];
}
function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
        sourceKeys = Object.keys(source);
        for(index = 0, length = sourceKeys.length; index < length; index += 1){
            key = sourceKeys[index];
            target[key] = source[key];
        }
    }
    return target;
}
function repeat(string, count) {
    var result = '', cycle;
    for(cycle = 0; cycle < count; cycle += 1){
        result += string;
    }
    return result;
}
function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
module.exports.isNothing = isNothing;
module.exports.isObject = isObject;
module.exports.toArray = toArray;
module.exports.repeat = repeat;
module.exports.isNegativeZero = isNegativeZero;
module.exports.extend = extend;
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*eslint-disable max-len*/ var common = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var YAMLException = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function compileList(schema, name, result) {
    var exclude = [];
    schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
    });
    schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
            if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
                exclude.push(previousIndex);
            }
        });
        result.push(currentType);
    });
    return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
    });
}
function compileMap() {
    var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
    }, index, length;
    function collectType(type) {
        result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }
    for(index = 0, length = arguments.length; index < length; index += 1){
        arguments[index].forEach(collectType);
    }
    return result;
}
function Schema(definition) {
    this.include = definition.include || [];
    this.implicit = definition.implicit || [];
    this.explicit = definition.explicit || [];
    this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== 'scalar') {
            throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
        }
    });
    this.compiledImplicit = compileList(this, 'implicit', []);
    this.compiledExplicit = compileList(this, 'explicit', []);
    this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
}
Schema.DEFAULT = null;
Schema.create = function createSchema() {
    var schemas, types;
    switch(arguments.length){
        case 1:
            schemas = Schema.DEFAULT;
            types = arguments[0];
            break;
        case 2:
            schemas = arguments[0];
            types = arguments[1];
            break;
        default:
            throw new YAMLException('Wrong number of arguments for Schema.create function');
    }
    schemas = common.toArray(schemas);
    types = common.toArray(types);
    if (!schemas.every(function(schema) {
        return schema instanceof Schema;
    })) {
        throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
    }
    if (!types.every(function(type) {
        return type instanceof Type;
    })) {
        throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }
    return new Schema({
        include: schemas,
        explicit: types
    });
};
module.exports = Schema;
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
module.exports = new Type('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function(data) {
        return data !== null ? data : '';
    }
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
module.exports = new Type('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function(data) {
        return data !== null ? data : [];
    }
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
module.exports = new Type('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function(data) {
        return data !== null ? data : {};
    }
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Standard YAML's Failsafe schema.
// http://www.yaml.org/spec/1.2/spec.html#id2802346
var Schema = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = new Schema({
    explicit: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveYamlNull(data) {
    if (data === null) return true;
    var max = data.length;
    return max === 1 && data === '~' || max === 4 && (data === 'null' || data === 'Null' || data === 'NULL');
}
function constructYamlNull() {
    return null;
}
function isNull(object) {
    return object === null;
}
module.exports = new Type('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
        canonical: function() {
            return '~';
        },
        lowercase: function() {
            return 'null';
        },
        uppercase: function() {
            return 'NULL';
        },
        camelcase: function() {
            return 'Null';
        }
    },
    defaultStyle: 'lowercase'
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveYamlBoolean(data) {
    if (data === null) return false;
    var max = data.length;
    return max === 4 && (data === 'true' || data === 'True' || data === 'TRUE') || max === 5 && (data === 'false' || data === 'False' || data === 'FALSE');
}
function constructYamlBoolean(data) {
    return data === 'true' || data === 'True' || data === 'TRUE';
}
function isBoolean(object) {
    return Object.prototype.toString.call(object) === '[object Boolean]';
}
module.exports = new Type('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
        lowercase: function(object) {
            return object ? 'true' : 'false';
        },
        uppercase: function(object) {
            return object ? 'TRUE' : 'FALSE';
        },
        camelcase: function(object) {
            return object ? 'True' : 'False';
        }
    },
    defaultStyle: 'lowercase'
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var common = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function isHexCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */  || 0x41 /* A */  <= c && c <= 0x46 /* F */  || 0x61 /* a */  <= c && c <= 0x66 /* f */ ;
}
function isOctCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x37 /* 7 */ ;
}
function isDecCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ;
}
function resolveYamlInteger(data) {
    if (data === null) return false;
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max) return false;
    ch = data[index];
    // sign
    if (ch === '-' || ch === '+') {
        ch = data[++index];
    }
    if (ch === '0') {
        // 0
        if (index + 1 === max) return true;
        ch = data[++index];
        // base 2, base 8, base 16
        if (ch === 'b') {
            // base 2
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === '_') continue;
                if (ch !== '0' && ch !== '1') return false;
                hasDigits = true;
            }
            return hasDigits && ch !== '_';
        }
        if (ch === 'x') {
            // base 16
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === '_') continue;
                if (!isHexCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== '_';
        }
        // base 8
        for(; index < max; index++){
            ch = data[index];
            if (ch === '_') continue;
            if (!isOctCode(data.charCodeAt(index))) return false;
            hasDigits = true;
        }
        return hasDigits && ch !== '_';
    }
    // base 10 (except 0) or base 60
    // value should not start with `_`;
    if (ch === '_') return false;
    for(; index < max; index++){
        ch = data[index];
        if (ch === '_') continue;
        if (ch === ':') break;
        if (!isDecCode(data.charCodeAt(index))) {
            return false;
        }
        hasDigits = true;
    }
    // Should have digits and should not end with `_`
    if (!hasDigits || ch === '_') return false;
    // if !base60 - done;
    if (ch !== ':') return true;
    // base60 almost not used, no needs to optimize
    return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}
function constructYamlInteger(data) {
    var value = data, sign = 1, ch, base, digits = [];
    if (value.indexOf('_') !== -1) {
        value = value.replace(/_/g, '');
    }
    ch = value[0];
    if (ch === '-' || ch === '+') {
        if (ch === '-') sign = -1;
        value = value.slice(1);
        ch = value[0];
    }
    if (value === '0') return 0;
    if (ch === '0') {
        if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
        if (value[1] === 'x') return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
    }
    if (value.indexOf(':') !== -1) {
        value.split(':').forEach(function(v) {
            digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
            value += d * base;
            base *= 60;
        });
        return sign * value;
    }
    return sign * parseInt(value, 10);
}
function isInteger(object) {
    return Object.prototype.toString.call(object) === '[object Number]' && object % 1 === 0 && !common.isNegativeZero(object);
}
module.exports = new Type('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
        binary: function(obj) {
            return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1);
        },
        octal: function(obj) {
            return obj >= 0 ? '0' + obj.toString(8) : '-0' + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
            return obj.toString(10);
        },
        /* eslint-disable max-len */ hexadecimal: function(obj) {
            return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() : '-0x' + obj.toString(16).toUpperCase().slice(1);
        }
    },
    defaultStyle: 'decimal',
    styleAliases: {
        binary: [
            2,
            'bin'
        ],
        octal: [
            8,
            'oct'
        ],
        decimal: [
            10,
            'dec'
        ],
        hexadecimal: [
            16,
            'hex'
        ]
    }
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var common = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var YAML_FLOAT_PATTERN = new RegExp(// 2.5e4, 2.5 and integers
'^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' + // .2e4, .2
// special case, seems not from spec
'|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' + // 20:59
'|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' + // .inf
'|[-+]?\\.(?:inf|Inf|INF)' + // .nan
'|\\.(?:nan|NaN|NAN))$');
function resolveYamlFloat(data) {
    if (data === null) return false;
    if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === '_') {
        return false;
    }
    return true;
}
function constructYamlFloat(data) {
    var value, sign, base, digits;
    value = data.replace(/_/g, '').toLowerCase();
    sign = value[0] === '-' ? -1 : 1;
    digits = [];
    if ('+-'.indexOf(value[0]) >= 0) {
        value = value.slice(1);
    }
    if (value === '.inf') {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === '.nan') {
        return NaN;
    } else if (value.indexOf(':') >= 0) {
        value.split(':').forEach(function(v) {
            digits.unshift(parseFloat(v, 10));
        });
        value = 0.0;
        base = 1;
        digits.forEach(function(d) {
            value += d * base;
            base *= 60;
        });
        return sign * value;
    }
    return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
        switch(style){
            case 'lowercase':
                return '.nan';
            case 'uppercase':
                return '.NAN';
            case 'camelcase':
                return '.NaN';
        }
    } else if (Number.POSITIVE_INFINITY === object) {
        switch(style){
            case 'lowercase':
                return '.inf';
            case 'uppercase':
                return '.INF';
            case 'camelcase':
                return '.Inf';
        }
    } else if (Number.NEGATIVE_INFINITY === object) {
        switch(style){
            case 'lowercase':
                return '-.inf';
            case 'uppercase':
                return '-.INF';
            case 'camelcase':
                return '-.Inf';
        }
    } else if (common.isNegativeZero(object)) {
        return '-0.0';
    }
    res = object.toString(10);
    // JS stringifier can build scientific format without dots: 5e-100,
    // while YAML requres dot: 5.e-100. Fix it with simple hack
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}
function isFloat(object) {
    return Object.prototype.toString.call(object) === '[object Number]' && (object % 1 !== 0 || common.isNegativeZero(object));
}
module.exports = new Type('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: 'lowercase'
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Standard YAML's JSON schema.
// http://www.yaml.org/spec/1.2/spec.html#id2803231
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, this schema is not such strict as defined in the YAML specification.
// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.
var Schema = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = new Schema({
    include: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js [app-rsc] (ecmascript)")
    ],
    implicit: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Standard YAML's Core schema.
// http://www.yaml.org/spec/1.2/spec.html#id2804923
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, Core schema has no distinctions from JSON schema is JS-YAML.
var Schema = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = new Schema({
    include: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var YAML_DATE_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' + // [1] year
'-([0-9][0-9])' + // [2] month
'-([0-9][0-9])$'); // [3] day
var YAML_TIMESTAMP_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' + // [1] year
'-([0-9][0-9]?)' + // [2] month
'-([0-9][0-9]?)' + // [3] day
'(?:[Tt]|[ \\t]+)' + // ...
'([0-9][0-9]?)' + // [4] hour
':([0-9][0-9])' + // [5] minute
':([0-9][0-9])' + // [6] second
'(?:\\.([0-9]*))?' + // [7] fraction
'(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
'(?::([0-9][0-9]))?))?$'); // [11] tz_minute
function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
}
function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error('Date resolve error');
    // match: [1] year [2] month [3] day
    year = +match[1];
    month = +match[2] - 1; // JS month starts with 0
    day = +match[3];
    if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
    }
    // match: [4] hour [5] minute [6] second [7] fraction
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
        fraction = match[7].slice(0, 3);
        while(fraction.length < 3){
            fraction += '0';
        }
        fraction = +fraction;
    }
    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
    if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
        if (match[9] === '-') delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
}
function representYamlTimestamp(object /*, style*/ ) {
    return object.toISOString();
}
module.exports = new Type('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveYamlMerge(data) {
    return data === '<<' || data === null;
}
module.exports = new Type('tag:yaml.org,2002:merge', {
    kind: 'scalar',
    resolve: resolveYamlMerge
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*eslint-disable no-bitwise*/ var NodeBuffer;
try {
    // A trick for browserified version, to not include `Buffer` shim
    var _require = /*TURBOPACK member replacement*/ __turbopack_context__.t;
    NodeBuffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)").Buffer;
} catch (__) {}
var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
function resolveYamlBinary(data) {
    if (data === null) return false;
    var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
    // Convert one by one.
    for(idx = 0; idx < max; idx++){
        code = map.indexOf(data.charAt(idx));
        // Skip CR/LF
        if (code > 64) continue;
        // Fail on illegal characters
        if (code < 0) return false;
        bitlen += 6;
    }
    // If there are any bits left, source was corrupted
    return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ''), max = input.length, map = BASE64_MAP, bits = 0, result = [];
    // Collect by 6*4 bits (3 bytes)
    for(idx = 0; idx < max; idx++){
        if (idx % 4 === 0 && idx) {
            result.push(bits >> 16 & 0xFF);
            result.push(bits >> 8 & 0xFF);
            result.push(bits & 0xFF);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
    }
    // Dump tail
    tailbits = max % 4 * 6;
    if (tailbits === 0) {
        result.push(bits >> 16 & 0xFF);
        result.push(bits >> 8 & 0xFF);
        result.push(bits & 0xFF);
    } else if (tailbits === 18) {
        result.push(bits >> 10 & 0xFF);
        result.push(bits >> 2 & 0xFF);
    } else if (tailbits === 12) {
        result.push(bits >> 4 & 0xFF);
    }
    // Wrap into Buffer for NodeJS and leave Array for browser
    if (NodeBuffer) {
        // Support node 6.+ Buffer API when available
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
    }
    return result;
}
function representYamlBinary(object /*, style*/ ) {
    var result = '', bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
    // Convert every three bytes to 4 ASCII characters.
    for(idx = 0; idx < max; idx++){
        if (idx % 3 === 0 && idx) {
            result += map[bits >> 18 & 0x3F];
            result += map[bits >> 12 & 0x3F];
            result += map[bits >> 6 & 0x3F];
            result += map[bits & 0x3F];
        }
        bits = (bits << 8) + object[idx];
    }
    // Dump tail
    tail = max % 3;
    if (tail === 0) {
        result += map[bits >> 18 & 0x3F];
        result += map[bits >> 12 & 0x3F];
        result += map[bits >> 6 & 0x3F];
        result += map[bits & 0x3F];
    } else if (tail === 2) {
        result += map[bits >> 10 & 0x3F];
        result += map[bits >> 4 & 0x3F];
        result += map[bits << 2 & 0x3F];
        result += map[64];
    } else if (tail === 1) {
        result += map[bits >> 2 & 0x3F];
        result += map[bits << 4 & 0x3F];
        result += map[64];
        result += map[64];
    }
    return result;
}
function isBinary(object) {
    return NodeBuffer && NodeBuffer.isBuffer(object);
}
module.exports = new Type('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString = Object.prototype.toString;
function resolveYamlOmap(data) {
    if (data === null) return true;
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== '[object Object]') return false;
        for(pairKey in pair){
            if (_hasOwnProperty.call(pair, pairKey)) {
                if (!pairHasKey) pairHasKey = true;
                else return false;
            }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
    }
    return true;
}
function constructYamlOmap(data) {
    return data !== null ? data : [];
}
module.exports = new Type('tag:yaml.org,2002:omap', {
    kind: 'sequence',
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var _toString = Object.prototype.toString;
function resolveYamlPairs(data) {
    if (data === null) return true;
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        if (_toString.call(pair) !== '[object Object]') return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return true;
}
function constructYamlPairs(data) {
    if (data === null) return [];
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return result;
}
module.exports = new Type('tag:yaml.org,2002:pairs', {
    kind: 'sequence',
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
    if (data === null) return true;
    var key, object = data;
    for(key in object){
        if (_hasOwnProperty.call(object, key)) {
            if (object[key] !== null) return false;
        }
    }
    return true;
}
function constructYamlSet(data) {
    return data !== null ? data : {};
}
module.exports = new Type('tag:yaml.org,2002:set', {
    kind: 'mapping',
    resolve: resolveYamlSet,
    construct: constructYamlSet
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// JS-YAML's default schema for `safeLoad` function.
// It is not described in the YAML specification.
//
// This schema is based on standard YAML's Core schema and includes most of
// extra types described at YAML tag repository. (http://yaml.org/type/)
var Schema = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = new Schema({
    include: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js [app-rsc] (ecmascript)")
    ],
    implicit: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js [app-rsc] (ecmascript)")
    ],
    explicit: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveJavascriptUndefined() {
    return true;
}
function constructJavascriptUndefined() {
    /*eslint-disable no-undefined*/ return undefined;
}
function representJavascriptUndefined() {
    return '';
}
function isUndefined(object) {
    return typeof object === 'undefined';
}
module.exports = new Type('tag:yaml.org,2002:js/undefined', {
    kind: 'scalar',
    resolve: resolveJavascriptUndefined,
    construct: constructJavascriptUndefined,
    predicate: isUndefined,
    represent: representJavascriptUndefined
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveJavascriptRegExp(data) {
    if (data === null) return false;
    if (data.length === 0) return false;
    var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = '';
    // if regexp starts with '/' it can have modifiers and must be properly closed
    // `/foo/gim` - modifiers tail can be maximum 3 chars
    if (regexp[0] === '/') {
        if (tail) modifiers = tail[1];
        if (modifiers.length > 3) return false;
        // if expression starts with /, is should be properly terminated
        if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
    }
    return true;
}
function constructJavascriptRegExp(data) {
    var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = '';
    // `/foo/gim` - tail can be maximum 4 chars
    if (regexp[0] === '/') {
        if (tail) modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
    }
    return new RegExp(regexp, modifiers);
}
function representJavascriptRegExp(object /*, style*/ ) {
    var result = '/' + object.source + '/';
    if (object.global) result += 'g';
    if (object.multiline) result += 'm';
    if (object.ignoreCase) result += 'i';
    return result;
}
function isRegExp(object) {
    return Object.prototype.toString.call(object) === '[object RegExp]';
}
module.exports = new Type('tag:yaml.org,2002:js/regexp', {
    kind: 'scalar',
    resolve: resolveJavascriptRegExp,
    construct: constructJavascriptRegExp,
    predicate: isRegExp,
    represent: representJavascriptRegExp
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var esprima;
// Browserified version does not have esprima
//
// 1. For node.js just require module as deps
// 2. For browser try to require mudule via external AMD system.
//    If not found - try to fallback to window.esprima. If not
//    found too - then fail to parse.
//
try {
    // workaround to exclude package from browserify list.
    var _require = /*TURBOPACK member replacement*/ __turbopack_context__.t;
    esprima = __turbopack_context__.r("[project]/node_modules/esprima/dist/esprima.js [app-rsc] (ecmascript)");
} catch (_) {
    /* eslint-disable no-redeclare */ /* global window */ if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
var Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
function resolveJavascriptFunction(data) {
    if (data === null) return false;
    try {
        var source = '(' + data + ')', ast = esprima.parse(source, {
            range: true
        });
        if (ast.type !== 'Program' || ast.body.length !== 1 || ast.body[0].type !== 'ExpressionStatement' || ast.body[0].expression.type !== 'ArrowFunctionExpression' && ast.body[0].expression.type !== 'FunctionExpression') {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
}
function constructJavascriptFunction(data) {
    /*jslint evil:true*/ var source = '(' + data + ')', ast = esprima.parse(source, {
        range: true
    }), params = [], body;
    if (ast.type !== 'Program' || ast.body.length !== 1 || ast.body[0].type !== 'ExpressionStatement' || ast.body[0].expression.type !== 'ArrowFunctionExpression' && ast.body[0].expression.type !== 'FunctionExpression') {
        throw new Error('Failed to resolve function');
    }
    ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
    });
    body = ast.body[0].expression.body.range;
    // Esprima's ranges include the first '{' and the last '}' characters on
    // function expressions. So cut them out.
    if (ast.body[0].expression.body.type === 'BlockStatement') {
        /*eslint-disable no-new-func*/ return new Function(params, source.slice(body[0] + 1, body[1] - 1));
    }
    // ES6 arrow functions can omit the BlockStatement. In that case, just return
    // the body.
    /*eslint-disable no-new-func*/ return new Function(params, 'return ' + source.slice(body[0], body[1]));
}
function representJavascriptFunction(object /*, style*/ ) {
    return object.toString();
}
function isFunction(object) {
    return Object.prototype.toString.call(object) === '[object Function]';
}
module.exports = new Type('tag:yaml.org,2002:js/function', {
    kind: 'scalar',
    resolve: resolveJavascriptFunction,
    construct: constructJavascriptFunction,
    predicate: isFunction,
    represent: representJavascriptFunction
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// JS-YAML's default schema for `load` function.
// It is not described in the YAML specification.
//
// This schema is based on JS-YAML's default safe schema and includes
// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
//
// Also this schema is used as default base schema at `Schema.create` function.
var Schema = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports = Schema.DEFAULT = new Schema({
    include: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)")
    ],
    explicit: [
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js [app-rsc] (ecmascript)"),
        __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js [app-rsc] (ecmascript)")
    ]
});
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var common = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
function Mark(name, buffer, position, line, column) {
    this.name = name;
    this.buffer = buffer;
    this.position = position;
    this.line = line;
    this.column = column;
}
Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
    var head, start, tail, end, snippet;
    if (!this.buffer) return null;
    indent = indent || 4;
    maxLength = maxLength || 75;
    head = '';
    start = this.position;
    while(start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1){
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
            head = ' ... ';
            start += 5;
            break;
        }
    }
    tail = '';
    end = this.position;
    while(end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1){
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
            tail = ' ... ';
            end -= 5;
            break;
        }
    }
    snippet = this.buffer.slice(start, end);
    return common.repeat(' ', indent) + head + snippet + tail + '\n' + common.repeat(' ', indent + this.position - start + head.length) + '^';
};
Mark.prototype.toString = function toString(compact) {
    var snippet, where = '';
    if (this.name) {
        where += 'in "' + this.name + '" ';
    }
    where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);
    if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
            where += ':\n' + snippet;
        }
    }
    return where;
};
module.exports = Mark;
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*eslint-disable max-len,no-use-before-define*/ var common = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var YAMLException = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
var Mark = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js [app-rsc] (ecmascript)");
var DEFAULT_SAFE_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)");
var DEFAULT_FULL_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)");
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
    return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
    return c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function is_WHITE_SPACE(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */ ;
}
function is_WS_OR_EOL(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */  || c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function is_FLOW_INDICATOR(c) {
    return c === 0x2C /* , */  || c === 0x5B /* [ */  || c === 0x5D /* ] */  || c === 0x7B /* { */  || c === 0x7D /* } */ ;
}
function fromHexCode(c) {
    var lc;
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) {
        return c - 0x30;
    }
    /*eslint-disable no-bitwise*/ lc = c | 0x20;
    if (0x61 /* a */  <= lc && lc <= 0x66 /* f */ ) {
        return lc - 0x61 + 10;
    }
    return -1;
}
function escapedHexLen(c) {
    if (c === 0x78 /* x */ ) {
        return 2;
    }
    if (c === 0x75 /* u */ ) {
        return 4;
    }
    if (c === 0x55 /* U */ ) {
        return 8;
    }
    return 0;
}
function fromDecimalCode(c) {
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) {
        return c - 0x30;
    }
    return -1;
}
function simpleEscapeSequence(c) {
    /* eslint-disable indent */ return c === 0x30 /* 0 */  ? '\x00' : c === 0x61 /* a */  ? '\x07' : c === 0x62 /* b */  ? '\x08' : c === 0x74 /* t */  ? '\x09' : c === 0x09 /* Tab */  ? '\x09' : c === 0x6E /* n */  ? '\x0A' : c === 0x76 /* v */  ? '\x0B' : c === 0x66 /* f */  ? '\x0C' : c === 0x72 /* r */  ? '\x0D' : c === 0x65 /* e */  ? '\x1B' : c === 0x20 /* Space */  ? ' ' : c === 0x22 /* " */  ? '\x22' : c === 0x2F /* / */  ? '/' : c === 0x5C /* \ */  ? '\x5C' : c === 0x4E /* N */  ? '\x85' : c === 0x5F /* _ */  ? '\xA0' : c === 0x4C /* L */  ? '\u2028' : c === 0x50 /* P */  ? '\u2029' : '';
}
function charFromCodepoint(c) {
    if (c <= 0xFFFF) {
        return String.fromCharCode(c);
    }
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode((c - 0x010000 >> 10) + 0xD800, (c - 0x010000 & 0x03FF) + 0xDC00);
}
// set a property of a literal object, while protecting against prototype pollution,
// see https://github.com/nodeca/js-yaml/issues/164 for more details
function setProperty(object, key, value) {
    // used for this specific key only because Object.defineProperty is slow
    if (key === '__proto__') {
        Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: value
        });
    } else {
        object[key] = value;
    }
}
var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for(var i = 0; i < 256; i++){
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State(input, options) {
    this.input = input;
    this.filename = options['filename'] || null;
    this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
    this.onWarning = options['onWarning'] || null;
    this.legacy = options['legacy'] || false;
    this.json = options['json'] || false;
    this.listener = options['listener'] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    this.documents = [];
/*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/ }
function generateError(state, message) {
    return new YAMLException(message, new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart));
}
function throwError(state, message) {
    throw generateError(state, message);
}
function throwWarning(state, message) {
    if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
    }
}
var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
            throwError(state, 'duplication of %YAML directive');
        }
        if (args.length !== 1) {
            throwError(state, 'YAML directive accepts exactly one argument');
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
            throwError(state, 'ill-formed argument of the YAML directive');
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
            throwError(state, 'unacceptable YAML version of the document');
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
            throwWarning(state, 'unsupported YAML version of the document');
        }
    },
    TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
            throwError(state, 'TAG directive accepts exactly two arguments');
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
            throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
            throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
            throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
        }
        state.tagMap[handle] = prefix;
    }
};
function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
            for(_position = 0, _length = _result.length; _position < _length; _position += 1){
                _character = _result.charCodeAt(_position);
                if (!(_character === 0x09 || 0x20 <= _character && _character <= 0x10FFFF)) {
                    throwError(state, 'expected valid JSON character');
                }
            }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
            throwError(state, 'the stream contains non-printable characters');
        }
        state.result += _result;
    }
}
function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
        throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
    }
    sourceKeys = Object.keys(source);
    for(index = 0, quantity = sourceKeys.length; index < quantity; index += 1){
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
            setProperty(destination, key, source[key]);
            overridableKeys[key] = true;
        }
    }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
    var index, quantity;
    // The output is a plain object here, so keys can only be strings.
    // We need to convert keyNode to a string, but doing so can hang the process
    // (deeply nested arrays that explode exponentially using aliases).
    if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for(index = 0, quantity = keyNode.length; index < quantity; index += 1){
            if (Array.isArray(keyNode[index])) {
                throwError(state, 'nested arrays are not supported inside keys');
            }
            if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
                keyNode[index] = '[object Object]';
            }
        }
    }
    // Avoid code execution in load() via toString property
    // (still use its own toString for arrays, timestamps,
    // and whatever user schema extensions happen to have @@toStringTag)
    if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
        keyNode = '[object Object]';
    }
    keyNode = String(keyNode);
    if (_result === null) {
        _result = {};
    }
    if (keyTag === 'tag:yaml.org,2002:merge') {
        if (Array.isArray(valueNode)) {
            for(index = 0, quantity = valueNode.length; index < quantity; index += 1){
                mergeMappings(state, _result, valueNode[index], overridableKeys);
            }
        } else {
            mergeMappings(state, _result, valueNode, overridableKeys);
        }
    } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
            state.line = startLine || state.line;
            state.position = startPos || state.position;
            throwError(state, 'duplicated mapping key');
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
    }
    return _result;
}
function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x0A /* LF */ ) {
        state.position++;
    } else if (ch === 0x0D /* CR */ ) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 0x0A /* LF */ ) {
            state.position++;
        }
    } else {
        throwError(state, 'a line break is expected');
    }
    state.line += 1;
    state.lineStart = state.position;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        while(is_WHITE_SPACE(ch)){
            ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 0x23 /* # */ ) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (ch !== 0x0A /* LF */  && ch !== 0x0D /* CR */  && ch !== 0)
        }
        if (is_EOL(ch)) {
            readLineBreak(state);
            ch = state.input.charCodeAt(state.position);
            lineBreaks++;
            state.lineIndent = 0;
            while(ch === 0x20 /* Space */ ){
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
            }
        } else {
            break;
        }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, 'deficient indentation');
    }
    return lineBreaks;
}
function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((ch === 0x2D /* - */  || ch === 0x2E /* . */ ) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
            return true;
        }
    }
    return false;
}
function writeFoldedLines(state, count) {
    if (count === 1) {
        state.result += ' ';
    } else if (count > 1) {
        state.result += common.repeat('\n', count - 1);
    }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 0x23 /* # */  || ch === 0x26 /* & */  || ch === 0x2A /* * */  || ch === 0x21 /* ! */  || ch === 0x7C /* | */  || ch === 0x3E /* > */  || ch === 0x27 /* ' */  || ch === 0x22 /* " */  || ch === 0x25 /* % */  || ch === 0x40 /* @ */  || ch === 0x60 /* ` */ ) {
        return false;
    }
    if (ch === 0x3F /* ? */  || ch === 0x2D /* - */ ) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            return false;
        }
    }
    state.kind = 'scalar';
    state.result = '';
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while(ch !== 0){
        if (ch === 0x3A /* : */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
                break;
            }
        } else if (ch === 0x23 /* # */ ) {
            preceding = state.input.charCodeAt(state.position - 1);
            if (is_WS_OR_EOL(preceding)) {
                break;
            }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
            break;
        } else if (is_EOL(ch)) {
            _line = state.line;
            _lineStart = state.lineStart;
            _lineIndent = state.lineIndent;
            skipSeparationSpace(state, false, -1);
            if (state.lineIndent >= nodeIndent) {
                hasPendingContent = true;
                ch = state.input.charCodeAt(state.position);
                continue;
            } else {
                state.position = captureEnd;
                state.line = _line;
                state.lineStart = _lineStart;
                state.lineIndent = _lineIndent;
                break;
            }
        }
        if (hasPendingContent) {
            captureSegment(state, captureStart, captureEnd, false);
            writeFoldedLines(state, state.line - _line);
            captureStart = captureEnd = state.position;
            hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
            captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
        return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x27 /* ' */ ) {
        return false;
    }
    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x27 /* ' */ ) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (ch === 0x27 /* ' */ ) {
                captureStart = state.position;
                state.position++;
                captureEnd = state.position;
            } else {
                return true;
            }
        } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, 'unexpected end of the document within a single quoted scalar');
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, 'unexpected end of the stream within a single quoted scalar');
}
function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x22 /* " */ ) {
        return false;
    }
    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x22 /* " */ ) {
            captureSegment(state, captureStart, state.position, true);
            state.position++;
            return true;
        } else if (ch === 0x5C /* \ */ ) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (is_EOL(ch)) {
                skipSeparationSpace(state, false, nodeIndent);
            // TODO: rework to inline fn with no type cast?
            } else if (ch < 256 && simpleEscapeCheck[ch]) {
                state.result += simpleEscapeMap[ch];
                state.position++;
            } else if ((tmp = escapedHexLen(ch)) > 0) {
                hexLength = tmp;
                hexResult = 0;
                for(; hexLength > 0; hexLength--){
                    ch = state.input.charCodeAt(++state.position);
                    if ((tmp = fromHexCode(ch)) >= 0) {
                        hexResult = (hexResult << 4) + tmp;
                    } else {
                        throwError(state, 'expected hexadecimal character');
                    }
                }
                state.result += charFromCodepoint(hexResult);
                state.position++;
            } else {
                throwError(state, 'unknown escape sequence');
            }
            captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, 'unexpected end of the document within a double quoted scalar');
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, 'unexpected end of the stream within a double quoted scalar');
}
function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x5B /* [ */ ) {
        terminator = 0x5D; /* ] */ 
        isMapping = false;
        _result = [];
    } else if (ch === 0x7B /* { */ ) {
        terminator = 0x7D; /* } */ 
        isMapping = true;
        _result = {};
    } else {
        return false;
    }
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(++state.position);
    while(ch !== 0){
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
            state.position++;
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = isMapping ? 'mapping' : 'sequence';
            state.result = _result;
            return true;
        } else if (!readNext) {
            throwError(state, 'missed comma between flow collection entries');
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 0x3F /* ? */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following)) {
                isPair = isExplicitPair = true;
                state.position++;
                skipSeparationSpace(state, true, nodeIndent);
            }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 0x3A /* : */ ) {
            isPair = true;
            ch = state.input.charCodeAt(++state.position);
            skipSeparationSpace(state, true, nodeIndent);
            composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
            valueNode = state.result;
        }
        if (isMapping) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
            _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
            _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 0x2C /* , */ ) {
            readNext = true;
            ch = state.input.charCodeAt(++state.position);
        } else {
            readNext = false;
        }
    }
    throwError(state, 'unexpected end of the stream within a flow collection');
}
function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x7C /* | */ ) {
        folding = false;
    } else if (ch === 0x3E /* > */ ) {
        folding = true;
    } else {
        return false;
    }
    state.kind = 'scalar';
    state.result = '';
    while(ch !== 0){
        ch = state.input.charCodeAt(++state.position);
        if (ch === 0x2B /* + */  || ch === 0x2D /* - */ ) {
            if (CHOMPING_CLIP === chomping) {
                chomping = ch === 0x2B /* + */  ? CHOMPING_KEEP : CHOMPING_STRIP;
            } else {
                throwError(state, 'repeat of a chomping mode identifier');
            }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
            if (tmp === 0) {
                throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
            } else if (!detectedIndent) {
                textIndent = nodeIndent + tmp - 1;
                detectedIndent = true;
            } else {
                throwError(state, 'repeat of an indentation width identifier');
            }
        } else {
            break;
        }
    }
    if (is_WHITE_SPACE(ch)) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (is_WHITE_SPACE(ch))
        if (ch === 0x23 /* # */ ) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (!is_EOL(ch) && ch !== 0)
        }
    }
    while(ch !== 0){
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while((!detectedIndent || state.lineIndent < textIndent) && ch === 0x20 /* Space */ ){
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
            textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
            emptyLines++;
            continue;
        }
        // End of the scalar.
        if (state.lineIndent < textIndent) {
            // Perform the chomping.
            if (chomping === CHOMPING_KEEP) {
                state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
            } else if (chomping === CHOMPING_CLIP) {
                if (didReadContent) {
                    state.result += '\n';
                }
            }
            break;
        }
        // Folded style: use fancy rules to handle line breaks.
        if (folding) {
            // Lines starting with white space characters (more-indented lines) are not folded.
            if (is_WHITE_SPACE(ch)) {
                atMoreIndented = true;
                // except for the first content line (cf. Example 8.1)
                state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
            // End of more-indented block.
            } else if (atMoreIndented) {
                atMoreIndented = false;
                state.result += common.repeat('\n', emptyLines + 1);
            // Just one line break - perceive as the same line.
            } else if (emptyLines === 0) {
                if (didReadContent) {
                    state.result += ' ';
                }
            // Several line breaks - perceive as different lines.
            } else {
                state.result += common.repeat('\n', emptyLines);
            }
        // Literal style: just add exact number of line breaks between content lines.
        } else {
            // Keep all line breaks except the header line break.
            state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while(!is_EOL(ch) && ch !== 0){
            ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
    }
    return true;
}
function readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (ch !== 0x2D /* - */ ) {
            break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
            break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
            if (state.lineIndent <= nodeIndent) {
                _result.push(null);
                ch = state.input.charCodeAt(state.position);
                continue;
            }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
            throwError(state, 'bad indentation of a sequence entry');
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'sequence';
        state.result = _result;
        return true;
    }
    return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line; // Save the current line.
        _pos = state.position;
        //
        // Explicit notation case. There are two separate blocks:
        // first for the key (denoted by "?") and second for the value (denoted by ":")
        //
        if ((ch === 0x3F /* ? */  || ch === 0x3A /* : */ ) && is_WS_OR_EOL(following)) {
            if (ch === 0x3F /* ? */ ) {
                if (atExplicitKey) {
                    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                    keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = true;
                allowCompact = true;
            } else if (atExplicitKey) {
                // i.e. 0x3A/* : */ === character after the explicit key.
                atExplicitKey = false;
                allowCompact = true;
            } else {
                throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
            }
            state.position += 1;
            ch = following;
        //
        // Implicit notation case. Flow-style node as the key first, then ":", and the value.
        //
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
            if (state.line === _line) {
                ch = state.input.charCodeAt(state.position);
                while(is_WHITE_SPACE(ch)){
                    ch = state.input.charCodeAt(++state.position);
                }
                if (ch === 0x3A /* : */ ) {
                    ch = state.input.charCodeAt(++state.position);
                    if (!is_WS_OR_EOL(ch)) {
                        throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
                    }
                    if (atExplicitKey) {
                        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                        keyTag = keyNode = valueNode = null;
                    }
                    detected = true;
                    atExplicitKey = false;
                    allowCompact = false;
                    keyTag = state.tag;
                    keyNode = state.result;
                } else if (detected) {
                    throwError(state, 'can not read an implicit mapping pair; a colon is missed');
                } else {
                    state.tag = _tag;
                    state.anchor = _anchor;
                    return true; // Keep the result of `composeNode`.
                }
            } else if (detected) {
                throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
            } else {
                state.tag = _tag;
                state.anchor = _anchor;
                return true; // Keep the result of `composeNode`.
            }
        } else {
            break; // Reading is done. Go to the epilogue.
        }
        //
        // Common reading code for both explicit and implicit notations.
        //
        if (state.line === _line || state.lineIndent > nodeIndent) {
            if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
                if (atExplicitKey) {
                    keyNode = state.result;
                } else {
                    valueNode = state.result;
                }
            }
            if (!atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
                keyTag = keyNode = valueNode = null;
            }
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
            throwError(state, 'bad indentation of a mapping entry');
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    //
    // Epilogue.
    //
    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
    }
    // Expose the resulting mapping.
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'mapping';
        state.result = _result;
    }
    return detected;
}
function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x21 /* ! */ ) return false;
    if (state.tag !== null) {
        throwError(state, 'duplication of a tag property');
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 0x3C /* < */ ) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
    } else if (ch === 0x21 /* ! */ ) {
        isNamed = true;
        tagHandle = '!!';
        ch = state.input.charCodeAt(++state.position);
    } else {
        tagHandle = '!';
    }
    _position = state.position;
    if (isVerbatim) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (ch !== 0 && ch !== 0x3E /* > */ )
        if (state.position < state.length) {
            tagName = state.input.slice(_position, state.position);
            ch = state.input.charCodeAt(++state.position);
        } else {
            throwError(state, 'unexpected end of the stream within a verbatim tag');
        }
    } else {
        while(ch !== 0 && !is_WS_OR_EOL(ch)){
            if (ch === 0x21 /* ! */ ) {
                if (!isNamed) {
                    tagHandle = state.input.slice(_position - 1, state.position + 1);
                    if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                        throwError(state, 'named tag handle cannot contain such characters');
                    }
                    isNamed = true;
                    _position = state.position + 1;
                } else {
                    throwError(state, 'tag suffix cannot contain exclamation marks');
                }
            }
            ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
            throwError(state, 'tag suffix cannot contain flow indicator characters');
        }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, 'tag name cannot contain such characters: ' + tagName);
    }
    if (isVerbatim) {
        state.tag = tagName;
    } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === '!') {
        state.tag = '!' + tagName;
    } else if (tagHandle === '!!') {
        state.tag = 'tag:yaml.org,2002:' + tagName;
    } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
}
function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x26 /* & */ ) return false;
    if (state.anchor !== null) {
        throwError(state, 'duplication of an anchor property');
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, 'name of an anchor node must contain at least one character');
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
}
function readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x2A /* * */ ) return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, 'name of an alias node must contain at least one character');
    }
    alias = state.input.slice(_position, state.position);
    if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
    }
    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
    if (state.listener !== null) {
        state.listener('open', state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            if (state.lineIndent > parentIndent) {
                indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
                indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
                indentStatus = -1;
            }
        }
    }
    if (indentStatus === 1) {
        while(readTagProperty(state) || readAnchorProperty(state)){
            if (skipSeparationSpace(state, true, -1)) {
                atNewLine = true;
                allowBlockCollections = allowBlockStyles;
                if (state.lineIndent > parentIndent) {
                    indentStatus = 1;
                } else if (state.lineIndent === parentIndent) {
                    indentStatus = 0;
                } else if (state.lineIndent < parentIndent) {
                    indentStatus = -1;
                }
            } else {
                allowBlockCollections = false;
            }
        }
    }
    if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
            flowIndent = parentIndent;
        } else {
            flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
            if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
                hasContent = true;
            } else {
                if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
                    hasContent = true;
                } else if (readAlias(state)) {
                    hasContent = true;
                    if (state.tag !== null || state.anchor !== null) {
                        throwError(state, 'alias node should not have any properties');
                    }
                } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
                    hasContent = true;
                    if (state.tag === null) {
                        state.tag = '?';
                    }
                }
                if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        } else if (indentStatus === 0) {
            // Special case: block sequences are allowed to have same indentation level as the parent.
            // http://www.yaml.org/spec/1.2/spec.html#id2799784
            hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
    }
    if (state.tag !== null && state.tag !== '!') {
        if (state.tag === '?') {
            // Implicit resolving is not allowed for non-scalar types, and '?'
            // non-specific tag is only automatically assigned to plain scalars.
            //
            // We only need to check kind conformity in case user explicitly assigns '?'
            // tag, for example like this: "!<?> [0]"
            //
            if (state.result !== null && state.kind !== 'scalar') {
                throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
            }
            for(typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1){
                type = state.implicitTypes[typeIndex];
                if (type.resolve(state.result)) {
                    state.result = type.construct(state.result);
                    state.tag = type.tag;
                    if (state.anchor !== null) {
                        state.anchorMap[state.anchor] = state.result;
                    }
                    break;
                }
            }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
            type = state.typeMap[state.kind || 'fallback'][state.tag];
            if (state.result !== null && type.kind !== state.kind) {
                throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
            }
            if (!type.resolve(state.result)) {
                throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
            } else {
                state.result = type.construct(state.result);
                if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        } else {
            throwError(state, 'unknown tag !<' + state.tag + '>');
        }
    }
    if (state.listener !== null) {
        state.listener('close', state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = {};
    state.anchorMap = {};
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 0x25 /* % */ ) {
            break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while(ch !== 0 && !is_WS_OR_EOL(ch)){
            ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
            throwError(state, 'directive name must not be less than one character in length');
        }
        while(ch !== 0){
            while(is_WHITE_SPACE(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 0x23 /* # */ ) {
                do {
                    ch = state.input.charCodeAt(++state.position);
                }while (ch !== 0 && !is_EOL(ch))
                break;
            }
            if (is_EOL(ch)) break;
            _position = state.position;
            while(ch !== 0 && !is_WS_OR_EOL(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
            directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
            throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2D /* - */  && state.input.charCodeAt(state.position + 1) === 0x2D /* - */  && state.input.charCodeAt(state.position + 2) === 0x2D /* - */ ) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
        throwError(state, 'directives end mark is expected');
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, 'non-ASCII line breaks are interpreted as content');
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 0x2E /* . */ ) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);
        }
        return;
    }
    if (state.position < state.length - 1) {
        throwError(state, 'end of the stream or a document separator is expected');
    } else {
        return;
    }
}
function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
        // Add tailing `\n` if not exists
        if (input.charCodeAt(input.length - 1) !== 0x0A /* LF */  && input.charCodeAt(input.length - 1) !== 0x0D /* CR */ ) {
            input += '\n';
        }
        // Strip BOM
        if (input.charCodeAt(0) === 0xFEFF) {
            input = input.slice(1);
        }
    }
    var state = new State(input, options);
    var nullpos = input.indexOf('\0');
    if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, 'null byte is not allowed in input');
    }
    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += '\0';
    while(state.input.charCodeAt(state.position) === 0x20 /* Space */ ){
        state.lineIndent += 1;
        state.position += 1;
    }
    while(state.position < state.length - 1){
        readDocument(state);
    }
    return state.documents;
}
function loadAll(input, iterator, options) {
    if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
        options = iterator;
        iterator = null;
    }
    var documents = loadDocuments(input, options);
    if (typeof iterator !== 'function') {
        return documents;
    }
    for(var index = 0, length = documents.length; index < length; index += 1){
        iterator(documents[index]);
    }
}
function load(input, options) {
    var documents = loadDocuments(input, options);
    if (documents.length === 0) {
        /*eslint-disable no-undefined*/ return undefined;
    } else if (documents.length === 1) {
        return documents[0];
    }
    throw new YAMLException('expected a single document in the stream, but found more');
}
function safeLoadAll(input, iterator, options) {
    if (typeof iterator === 'object' && iterator !== null && typeof options === 'undefined') {
        options = iterator;
        iterator = null;
    }
    return loadAll(input, iterator, common.extend({
        schema: DEFAULT_SAFE_SCHEMA
    }, options));
}
function safeLoad(input, options) {
    return load(input, common.extend({
        schema: DEFAULT_SAFE_SCHEMA
    }, options));
}
module.exports.loadAll = loadAll;
module.exports.load = load;
module.exports.safeLoadAll = safeLoadAll;
module.exports.safeLoad = safeLoad;
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*eslint-disable no-use-before-define*/ var common = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js [app-rsc] (ecmascript)");
var YAMLException = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
var DEFAULT_FULL_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)");
var DEFAULT_SAFE_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)");
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_TAB = 0x09; /* Tab */ 
var CHAR_LINE_FEED = 0x0A; /* LF */ 
var CHAR_CARRIAGE_RETURN = 0x0D; /* CR */ 
var CHAR_SPACE = 0x20; /* Space */ 
var CHAR_EXCLAMATION = 0x21; /* ! */ 
var CHAR_DOUBLE_QUOTE = 0x22; /* " */ 
var CHAR_SHARP = 0x23; /* # */ 
var CHAR_PERCENT = 0x25; /* % */ 
var CHAR_AMPERSAND = 0x26; /* & */ 
var CHAR_SINGLE_QUOTE = 0x27; /* ' */ 
var CHAR_ASTERISK = 0x2A; /* * */ 
var CHAR_COMMA = 0x2C; /* , */ 
var CHAR_MINUS = 0x2D; /* - */ 
var CHAR_COLON = 0x3A; /* : */ 
var CHAR_EQUALS = 0x3D; /* = */ 
var CHAR_GREATER_THAN = 0x3E; /* > */ 
var CHAR_QUESTION = 0x3F; /* ? */ 
var CHAR_COMMERCIAL_AT = 0x40; /* @ */ 
var CHAR_LEFT_SQUARE_BRACKET = 0x5B; /* [ */ 
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */ 
var CHAR_GRAVE_ACCENT = 0x60; /* ` */ 
var CHAR_LEFT_CURLY_BRACKET = 0x7B; /* { */ 
var CHAR_VERTICAL_LINE = 0x7C; /* | */ 
var CHAR_RIGHT_CURLY_BRACKET = 0x7D; /* } */ 
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0x00] = '\\0';
ESCAPE_SEQUENCES[0x07] = '\\a';
ESCAPE_SEQUENCES[0x08] = '\\b';
ESCAPE_SEQUENCES[0x09] = '\\t';
ESCAPE_SEQUENCES[0x0A] = '\\n';
ESCAPE_SEQUENCES[0x0B] = '\\v';
ESCAPE_SEQUENCES[0x0C] = '\\f';
ESCAPE_SEQUENCES[0x0D] = '\\r';
ESCAPE_SEQUENCES[0x1B] = '\\e';
ESCAPE_SEQUENCES[0x22] = '\\"';
ESCAPE_SEQUENCES[0x5C] = '\\\\';
ESCAPE_SEQUENCES[0x85] = '\\N';
ESCAPE_SEQUENCES[0xA0] = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';
var DEPRECATED_BOOLEANS_SYNTAX = [
    'y',
    'Y',
    'yes',
    'Yes',
    'YES',
    'on',
    'On',
    'ON',
    'n',
    'N',
    'no',
    'No',
    'NO',
    'off',
    'Off',
    'OFF'
];
function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;
    if (map === null) return {};
    result = {};
    keys = Object.keys(map);
    for(index = 0, length = keys.length; index < length; index += 1){
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === '!!') {
            tag = 'tag:yaml.org,2002:' + tag.slice(2);
        }
        type = schema.compiledTypeMap['fallback'][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
            style = type.styleAliases[style];
        }
        result[tag] = style;
    }
    return result;
}
function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 0xFF) {
        handle = 'x';
        length = 2;
    } else if (character <= 0xFFFF) {
        handle = 'u';
        length = 4;
    } else if (character <= 0xFFFFFFFF) {
        handle = 'U';
        length = 8;
    } else {
        throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
    }
    return '\\' + handle + common.repeat('0', length - string.length) + string;
}
function State(options) {
    this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
    this.indent = Math.max(1, options['indent'] || 2);
    this.noArrayIndent = options['noArrayIndent'] || false;
    this.skipInvalid = options['skipInvalid'] || false;
    this.flowLevel = common.isNothing(options['flowLevel']) ? -1 : options['flowLevel'];
    this.styleMap = compileStyleMap(this.schema, options['styles'] || null);
    this.sortKeys = options['sortKeys'] || false;
    this.lineWidth = options['lineWidth'] || 80;
    this.noRefs = options['noRefs'] || false;
    this.noCompatMode = options['noCompatMode'] || false;
    this.condenseFlow = options['condenseFlow'] || false;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = '';
    this.duplicates = [];
    this.usedDuplicates = null;
}
// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
    var ind = common.repeat(' ', spaces), position = 0, next = -1, result = '', line, length = string.length;
    while(position < length){
        next = string.indexOf('\n', position);
        if (next === -1) {
            line = string.slice(position);
            position = length;
        } else {
            line = string.slice(position, next + 1);
            position = next + 1;
        }
        if (line.length && line !== '\n') result += ind;
        result += line;
    }
    return result;
}
function generateNextLine(state, level) {
    return '\n' + common.repeat(' ', state.indent * level);
}
function testImplicitResolving(state, str) {
    var index, length, type;
    for(index = 0, length = state.implicitTypes.length; index < length; index += 1){
        type = state.implicitTypes[index];
        if (type.resolve(str)) {
            return true;
        }
    }
    return false;
}
// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
}
// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
    return 0x00020 <= c && c <= 0x00007E || 0x000A1 <= c && c <= 0x00D7FF && c !== 0x2028 && c !== 0x2029 || 0x0E000 <= c && c <= 0x00FFFD && c !== 0xFEFF /* BOM */  || 0x10000 <= c && c <= 0x10FFFF;
}
// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// [24] b-line-feed       ::=     #xA    /* LF */
// [25] b-carriage-return ::=     #xD    /* CR */
// [3]  c-byte-order-mark ::=     #xFEFF
function isNsChar(c) {
    return isPrintable(c) && !isWhitespace(c) && c !== 0xFEFF && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
// Simplified test for values allowed after the first character in plain style.
function isPlainSafe(c, prev) {
    // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
    // where nb-char ::= c-printable - b-char - c-byte-order-mark.
    return isPrintable(c) && c !== 0xFEFF && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
}
// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
    // Uses a subset of ns-char - c-indicator
    // where ns-char = nb-char - s-white.
    return isPrintable(c) && c !== 0xFEFF && !isWhitespace(c) // - s-white
     && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
    var i;
    var char, prev_char;
    var hasLineBreak = false;
    var hasFoldableLine = false; // only checked if shouldTrackWidth
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1; // count the first line correctly
    var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
    if (singleLineOnly) {
        // Case: no block styles.
        // Check for disallowed characters to rule out plain and single.
        for(i = 0; i < string.length; i++){
            char = string.charCodeAt(i);
            if (!isPrintable(char)) {
                return STYLE_DOUBLE;
            }
            prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
            plain = plain && isPlainSafe(char, prev_char);
        }
    } else {
        // Case: block styles permitted.
        for(i = 0; i < string.length; i++){
            char = string.charCodeAt(i);
            if (char === CHAR_LINE_FEED) {
                hasLineBreak = true;
                // Check if any line can be folded.
                if (shouldTrackWidth) {
                    hasFoldableLine = hasFoldableLine || i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== ' ';
                    previousLineBreak = i;
                }
            } else if (!isPrintable(char)) {
                return STYLE_DOUBLE;
            }
            prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
            plain = plain && isPlainSafe(char, prev_char);
        }
        // in case the end is missing a \n
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== ' ';
    }
    // Although every style can represent \n without escaping, prefer block styles
    // for multiline, since they're more readable and they don't add empty lines.
    // Also prefer folding a super-long line.
    if (!hasLineBreak && !hasFoldableLine) {
        // Strings interpretable as another type have to be quoted;
        // e.g. the string 'true' vs. the boolean true.
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
    }
    // Edge case: block indentation indicator can only have one digit.
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
    }
    // At this point we know block styles are valid.
    // Prefer literal style unless we want to fold.
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}
// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey) {
    state.dump = function() {
        if (string.length === 0) {
            return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
            return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level); // no 0-indent scalars
        // As indentation gets deeper, let the width decrease monotonically
        // to the lower bound min(state.lineWidth, 40).
        // Note that this implies
        //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
        //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
        // This behaves better than a constant minimum width which disallows narrower options,
        // or an indent threshold which causes the width to suddenly increase.
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        // Without knowing if keys are implicit/explicit, assume implicit for safety.
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string) {
            return testImplicitResolving(state, string);
        }
        switch(chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)){
            case STYLE_PLAIN:
                return string;
            case STYLE_SINGLE:
                return "'" + string.replace(/'/g, "''") + "'";
            case STYLE_LITERAL:
                return '|' + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
            case STYLE_FOLDED:
                return '>' + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
            case STYLE_DOUBLE:
                return '"' + escapeString(string, lineWidth) + '"';
            default:
                throw new YAMLException('impossible error: invalid scalar style');
        }
    }();
}
// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';
    // note the special case: the string '\n' counts as a "trailing" empty line.
    var clip = string[string.length - 1] === '\n';
    var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
    var chomp = keep ? '+' : clip ? '' : '-';
    return indentIndicator + chomp + '\n';
}
// (See the note for writeScalar.)
function dropEndingNewline(string) {
    return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}
// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
    // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
    // unless they're before or after a more-indented line, or at the very
    // beginning or end, in which case $k$ maps to $k$.
    // Therefore, parse each chunk as newline(s) followed by a content line.
    var lineRe = /(\n+)([^\n]*)/g;
    // first line (possibly an empty line)
    var result = function() {
        var nextLF = string.indexOf('\n');
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
    }();
    // If we haven't reached the first content line yet, don't add an extra \n.
    var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
    var moreIndented;
    // rest of the lines
    var match;
    while(match = lineRe.exec(string)){
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === ' ';
        result += prefix + (!prevMoreIndented && !moreIndented && line !== '' ? '\n' : '') + foldLine(line, width);
        prevMoreIndented = moreIndented;
    }
    return result;
}
// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
    if (line === '' || line[0] === ' ') return line;
    // Since a more-indented line adds a \n, breaks can't be followed by a space.
    var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
    var match;
    // start is an inclusive index. end, curr, and next are exclusive.
    var start = 0, end, curr = 0, next = 0;
    var result = '';
    // Invariants: 0 <= start <= length-1.
    //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
    // Inside the loop:
    //   A match implies length >= 2, so curr and next are <= length-2.
    while(match = breakRe.exec(line)){
        next = match.index;
        // maintain invariant: curr - start <= width
        if (next - start > width) {
            end = curr > start ? curr : next; // derive end <= length-2
            result += '\n' + line.slice(start, end);
            // skip the space that was output as \n
            start = end + 1; // derive start <= length-1
        }
        curr = next;
    }
    // By the invariants, start <= length-1, so there is something left over.
    // It is either the whole string or a part starting from non-whitespace.
    result += '\n';
    // Insert a break if the remainder is too long and there is a break available.
    if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
    } else {
        result += line.slice(start);
    }
    return result.slice(1); // drop extra \n joiner
}
// Escapes a double-quoted string.
function escapeString(string) {
    var result = '';
    var char, nextChar;
    var escapeSeq;
    for(var i = 0; i < string.length; i++){
        char = string.charCodeAt(i);
        // Check for surrogate pairs (reference Unicode 3.0 section "3.7 Surrogates").
        if (char >= 0xD800 && char <= 0xDBFF /* high surrogate */ ) {
            nextChar = string.charCodeAt(i + 1);
            if (nextChar >= 0xDC00 && nextChar <= 0xDFFF /* low surrogate */ ) {
                // Combine the surrogate pair and store it escaped.
                result += encodeHex((char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000);
                // Advance index one extra since we already used that char here.
                i++;
                continue;
            }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
    }
    return result;
}
function writeFlowSequence(state, level, object) {
    var _result = '', _tag = state.tag, index, length;
    for(index = 0, length = object.length; index < length; index += 1){
        // Write only valid elements.
        if (writeNode(state, level, object[index], false, false)) {
            if (index !== 0) _result += ',' + (!state.condenseFlow ? ' ' : '');
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = '[' + _result + ']';
}
function writeBlockSequence(state, level, object, compact) {
    var _result = '', _tag = state.tag, index, length;
    for(index = 0, length = object.length; index < length; index += 1){
        // Write only valid elements.
        if (writeNode(state, level + 1, object[index], true, true)) {
            if (!compact || index !== 0) {
                _result += generateNextLine(state, level);
            }
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                _result += '-';
            } else {
                _result += '- ';
            }
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = _result || '[]'; // Empty sequence if no valid values.
}
function writeFlowMapping(state, level, object) {
    var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = '';
        if (index !== 0) pairBuffer += ', ';
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
            continue; // Skip this pair because of invalid key;
        }
        if (state.dump.length > 1024) pairBuffer += '? ';
        pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');
        if (!writeNode(state, level, objectValue, false, false)) {
            continue; // Skip this pair because of invalid value.
        }
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = '{' + _result + '}';
}
function writeBlockMapping(state, level, object, compact) {
    var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    // Allow sorting keys so that the output file is deterministic
    if (state.sortKeys === true) {
        // Default sorting
        objectKeyList.sort();
    } else if (typeof state.sortKeys === 'function') {
        // Custom sort function
        objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
        // Something is wrong
        throw new YAMLException('sortKeys must be a boolean or a function');
    }
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = '';
        if (!compact || index !== 0) {
            pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
            continue; // Skip this pair because of invalid key.
        }
        explicitPair = state.tag !== null && state.tag !== '?' || state.dump && state.dump.length > 1024;
        if (explicitPair) {
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                pairBuffer += '?';
            } else {
                pairBuffer += '? ';
            }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
            pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
            continue; // Skip this pair because of invalid value.
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += ':';
        } else {
            pairBuffer += ': ';
        }
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}
function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for(index = 0, length = typeList.length; index < length; index += 1){
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === 'object' && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
            state.tag = explicit ? type.tag : '?';
            if (type.represent) {
                style = state.styleMap[type.tag] || type.defaultStyle;
                if (_toString.call(type.represent) === '[object Function]') {
                    _result = type.represent(object, style);
                } else if (_hasOwnProperty.call(type.represent, style)) {
                    _result = type.represent[style](object, style);
                } else {
                    throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
                }
                state.dump = _result;
            }
            return true;
        }
    }
    return false;
}
// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
        detectType(state, object, true);
    }
    var type = _toString.call(state.dump);
    if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
    }
    var objectOrArray = type === '[object Object]' || type === '[object Array]', duplicateIndex, duplicate;
    if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== '?' || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = '*ref_' + duplicateIndex;
    } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
            state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === '[object Object]') {
            if (block && Object.keys(state.dump).length !== 0) {
                writeBlockMapping(state, level, state.dump, compact);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + state.dump;
                }
            } else {
                writeFlowMapping(state, level, state.dump);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                }
            }
        } else if (type === '[object Array]') {
            var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
            if (block && state.dump.length !== 0) {
                writeBlockSequence(state, arrayLevel, state.dump, compact);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + state.dump;
                }
            } else {
                writeFlowSequence(state, arrayLevel, state.dump);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                }
            }
        } else if (type === '[object String]') {
            if (state.tag !== '?') {
                writeScalar(state, state.dump, level, iskey);
            }
        } else {
            if (state.skipInvalid) return false;
            throw new YAMLException('unacceptable kind of an object to dump ' + type);
        }
        if (state.tag !== null && state.tag !== '?') {
            state.dump = '!<' + state.tag + '> ' + state.dump;
        }
    }
    return true;
}
function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for(index = 0, length = duplicatesIndexes.length; index < length; index += 1){
        state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === 'object') {
        index = objects.indexOf(object);
        if (index !== -1) {
            if (duplicatesIndexes.indexOf(index) === -1) {
                duplicatesIndexes.push(index);
            }
        } else {
            objects.push(object);
            if (Array.isArray(object)) {
                for(index = 0, length = object.length; index < length; index += 1){
                    inspectNode(object[index], objects, duplicatesIndexes);
                }
            } else {
                objectKeyList = Object.keys(object);
                for(index = 0, length = objectKeyList.length; index < length; index += 1){
                    inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
                }
            }
        }
    }
}
function dump(input, options) {
    options = options || {};
    var state = new State(options);
    if (!state.noRefs) getDuplicateReferences(input, state);
    if (writeNode(state, 0, input, true, true)) return state.dump + '\n';
    return '';
}
function safeDump(input, options) {
    return dump(input, common.extend({
        schema: DEFAULT_SAFE_SCHEMA
    }, options));
}
module.exports.dump = dump;
module.exports.safeDump = safeDump;
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var loader = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js [app-rsc] (ecmascript)");
var dumper = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js [app-rsc] (ecmascript)");
function deprecated(name) {
    return function() {
        throw new Error('Function ' + name + ' is deprecated and cannot be used.');
    };
}
module.exports.Type = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js [app-rsc] (ecmascript)");
module.exports.Schema = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js [app-rsc] (ecmascript)");
module.exports.FAILSAFE_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js [app-rsc] (ecmascript)");
module.exports.JSON_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js [app-rsc] (ecmascript)");
module.exports.CORE_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js [app-rsc] (ecmascript)");
module.exports.DEFAULT_SAFE_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)");
module.exports.DEFAULT_FULL_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)");
module.exports.load = loader.load;
module.exports.loadAll = loader.loadAll;
module.exports.safeLoad = loader.safeLoad;
module.exports.safeLoadAll = loader.safeLoadAll;
module.exports.dump = dumper.dump;
module.exports.safeDump = dumper.safeDump;
module.exports.YAMLException = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js [app-rsc] (ecmascript)");
// Deprecated schema names from JS-YAML 2.0.x
module.exports.MINIMAL_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js [app-rsc] (ecmascript)");
module.exports.SAFE_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js [app-rsc] (ecmascript)");
module.exports.DEFAULT_SCHEMA = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js [app-rsc] (ecmascript)");
// Deprecated functions from JS-YAML 1.x.x
module.exports.scan = deprecated('scan');
module.exports.parse = deprecated('parse');
module.exports.compose = deprecated('compose');
module.exports.addConstructor = deprecated('addConstructor');
}),
"[project]/node_modules/gray-matter/node_modules/js-yaml/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var yaml = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js [app-rsc] (ecmascript)");
module.exports = yaml;
}),
"[project]/node_modules/gray-matter/lib/engines.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const yaml = __turbopack_context__.r("[project]/node_modules/gray-matter/node_modules/js-yaml/index.js [app-rsc] (ecmascript)");
/**
 * Default engines
 */ const engines = exports = module.exports;
/**
 * YAML
 */ engines.yaml = {
    parse: yaml.safeLoad.bind(yaml),
    stringify: yaml.safeDump.bind(yaml)
};
/**
 * JSON
 */ engines.json = {
    parse: JSON.parse.bind(JSON),
    stringify: function(obj, options) {
        const opts = Object.assign({
            replacer: null,
            space: 2
        }, options);
        return JSON.stringify(obj, opts.replacer, opts.space);
    }
};
/**
 * JavaScript
 */ engines.javascript = {
    parse: function parse(str, options, wrap) {
        /* eslint no-eval: 0 */ try {
            if (wrap !== false) {
                str = '(function() {\nreturn ' + str.trim() + ';\n}());';
            }
            return eval(str) || {};
        } catch (err) {
            if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
                return parse(str, options, false);
            }
            throw new SyntaxError(err);
        }
    },
    stringify: function() {
        throw new Error('stringifying JavaScript is not supported');
    }
};
}),
"[project]/node_modules/gray-matter/lib/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const stripBom = __turbopack_context__.r("[project]/node_modules/strip-bom-string/index.js [app-rsc] (ecmascript)");
const typeOf = __turbopack_context__.r("[project]/node_modules/kind-of/index.js [app-rsc] (ecmascript)");
exports.define = function(obj, key, val) {
    Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
    });
};
/**
 * Returns true if `val` is a buffer
 */ exports.isBuffer = function(val) {
    return typeOf(val) === 'buffer';
};
/**
 * Returns true if `val` is an object
 */ exports.isObject = function(val) {
    return typeOf(val) === 'object';
};
/**
 * Cast `input` to a buffer
 */ exports.toBuffer = function(input) {
    return typeof input === 'string' ? Buffer.from(input) : input;
};
/**
 * Cast `val` to a string.
 */ exports.toString = function(input) {
    if (exports.isBuffer(input)) return stripBom(String(input));
    if (typeof input !== 'string') {
        throw new TypeError('expected input to be a string or buffer');
    }
    return stripBom(input);
};
/**
 * Cast `val` to an array.
 */ exports.arrayify = function(val) {
    return val ? Array.isArray(val) ? val : [
        val
    ] : [];
};
/**
 * Returns true if `str` starts with `substr`.
 */ exports.startsWith = function(str, substr, len) {
    if (typeof len !== 'number') len = substr.length;
    return str.slice(0, len) === substr;
};
}),
"[project]/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const engines = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/engines.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/utils.js [app-rsc] (ecmascript)");
module.exports = function(options) {
    const opts = Object.assign({}, options);
    // ensure that delimiters are an array
    opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || '---');
    if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
    }
    opts.language = (opts.language || opts.lang || 'yaml').toLowerCase();
    opts.engines = Object.assign({}, engines, opts.parsers, opts.engines);
    return opts;
};
}),
"[project]/node_modules/gray-matter/lib/engine.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function(name, options) {
    let engine = options.engines[name] || options.engines[aliase(name)];
    if (typeof engine === 'undefined') {
        throw new Error('gray-matter engine "' + name + '" is not registered');
    }
    if (typeof engine === 'function') {
        engine = {
            parse: engine
        };
    }
    return engine;
};
function aliase(name) {
    switch(name.toLowerCase()){
        case 'js':
        case 'javascript':
            return 'javascript';
        case 'coffee':
        case 'coffeescript':
        case 'cson':
            return 'coffee';
        case 'yaml':
        case 'yml':
            return 'yaml';
        default:
            {
                return name;
            }
    }
}
}),
"[project]/node_modules/gray-matter/lib/stringify.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const typeOf = __turbopack_context__.r("[project]/node_modules/kind-of/index.js [app-rsc] (ecmascript)");
const getEngine = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/engine.js [app-rsc] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)");
module.exports = function(file, data, options) {
    if (data == null && options == null) {
        switch(typeOf(file)){
            case 'object':
                data = file.data;
                options = {};
                break;
            case 'string':
                return file;
            default:
                {
                    throw new TypeError('expected file to be a string or object');
                }
        }
    }
    const str = file.content;
    const opts = defaults(options);
    if (data == null) {
        if (!opts.data) return file;
        data = opts.data;
    }
    const language = file.language || opts.language;
    const engine = getEngine(language, opts);
    if (typeof engine.stringify !== 'function') {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
    }
    data = Object.assign({}, file.data, data);
    const open = opts.delimiters[0];
    const close = opts.delimiters[1];
    const matter = engine.stringify(data, options).trim();
    let buf = '';
    if (matter !== '{}') {
        buf = newline(open) + newline(matter) + newline(close);
    }
    if (typeof file.excerpt === 'string' && file.excerpt !== '') {
        if (str.indexOf(file.excerpt.trim()) === -1) {
            buf += newline(file.excerpt) + newline(close);
        }
    }
    return buf + newline(str);
};
function newline(str) {
    return str.slice(-1) !== '\n' ? str + '\n' : str;
}
}),
"[project]/node_modules/gray-matter/lib/excerpt.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const defaults = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)");
module.exports = function(file, options) {
    const opts = defaults(options);
    if (file.data == null) {
        file.data = {};
    }
    if (typeof opts.excerpt === 'function') {
        return opts.excerpt(file, opts);
    }
    const sep = file.data.excerpt_separator || opts.excerpt_separator;
    if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
    }
    const delimiter = typeof opts.excerpt === 'string' ? opts.excerpt : sep || opts.delimiters[0];
    // if enabled, get the excerpt defined after front-matter
    const idx = file.content.indexOf(delimiter);
    if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
    }
    return file;
};
}),
"[project]/node_modules/gray-matter/lib/to-file.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const typeOf = __turbopack_context__.r("[project]/node_modules/kind-of/index.js [app-rsc] (ecmascript)");
const stringify = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/stringify.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/utils.js [app-rsc] (ecmascript)");
/**
 * Normalize the given value to ensure an object is returned
 * with the expected properties.
 */ module.exports = function(file) {
    if (typeOf(file) !== 'object') {
        file = {
            content: file
        };
    }
    if (typeOf(file.data) !== 'object') {
        file.data = {};
    }
    // if file was passed as an object, ensure that
    // "file.content" is set
    if (file.contents && file.content == null) {
        file.content = file.contents;
    }
    // set non-enumerable properties on the file object
    utils.define(file, 'orig', utils.toBuffer(file.content));
    utils.define(file, 'language', file.language || '');
    utils.define(file, 'matter', file.matter || '');
    utils.define(file, 'stringify', function(data, options) {
        if (options && options.language) {
            file.language = options.language;
        }
        return stringify(file, data, options);
    });
    // strip BOM and ensure that "file.content" is a string
    file.content = utils.toString(file.content);
    file.isEmpty = false;
    file.excerpt = '';
    return file;
};
}),
"[project]/node_modules/gray-matter/lib/parse.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const getEngine = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/engine.js [app-rsc] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)");
module.exports = function(language, str, options) {
    const opts = defaults(options);
    const engine = getEngine(language, opts);
    if (typeof engine.parse !== 'function') {
        throw new TypeError('expected "' + language + '.parse" to be a function');
    }
    return engine.parse(str, opts);
};
}),
"[project]/node_modules/gray-matter/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const sections = __turbopack_context__.r("[project]/node_modules/section-matter/index.js [app-rsc] (ecmascript)");
const defaults = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/defaults.js [app-rsc] (ecmascript)");
const stringify = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/stringify.js [app-rsc] (ecmascript)");
const excerpt = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/excerpt.js [app-rsc] (ecmascript)");
const engines = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/engines.js [app-rsc] (ecmascript)");
const toFile = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/to-file.js [app-rsc] (ecmascript)");
const parse = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/parse.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/node_modules/gray-matter/lib/utils.js [app-rsc] (ecmascript)");
/**
 * Takes a string or object with `content` property, extracts
 * and parses front-matter from the string, then returns an object
 * with `data`, `content` and other [useful properties](#returned-object).
 *
 * ```js
 * const matter = require('gray-matter');
 * console.log(matter('---\ntitle: Home\n---\nOther stuff'));
 * //=> { data: { title: 'Home'}, content: 'Other stuff' }
 * ```
 * @param {Object|String} `input` String, or object with `content` string
 * @param {Object} `options`
 * @return {Object}
 * @api public
 */ function matter(input, options) {
    if (input === '') {
        return {
            data: {},
            content: input,
            excerpt: '',
            orig: input
        };
    }
    let file = toFile(input);
    const cached = matter.cache[file.content];
    if (!options) {
        if (cached) {
            file = Object.assign({}, cached);
            file.orig = cached.orig;
            return file;
        }
        // only cache if there are no options passed. if we cache when options
        // are passed, we would need to also cache options values, which would
        // negate any performance benefits of caching
        matter.cache[file.content] = file;
    }
    return parseMatter(file, options);
}
/**
 * Parse front matter
 */ function parseMatter(file, options) {
    const opts = defaults(options);
    const open = opts.delimiters[0];
    const close = '\n' + opts.delimiters[1];
    let str = file.content;
    if (opts.language) {
        file.language = opts.language;
    }
    // get the length of the opening delimiter
    const openLen = open.length;
    if (!utils.startsWith(str, open, openLen)) {
        excerpt(file, opts);
        return file;
    }
    // if the next character after the opening delimiter is
    // a character from the delimiter, then it's not a front-
    // matter delimiter
    if (str.charAt(openLen) === open.slice(-1)) {
        return file;
    }
    // strip the opening delimiter
    str = str.slice(openLen);
    const len = str.length;
    // use the language defined after first delimiter, if it exists
    const language = matter.language(str, opts);
    if (language.name) {
        file.language = language.name;
        str = str.slice(language.raw.length);
    }
    // get the index of the closing delimiter
    let closeIndex = str.indexOf(close);
    if (closeIndex === -1) {
        closeIndex = len;
    }
    // get the raw front-matter block
    file.matter = str.slice(0, closeIndex);
    const block = file.matter.replace(/^\s*#[^\n]+/gm, '').trim();
    if (block === '') {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
    } else {
        // create file.data by parsing the raw file.matter block
        file.data = parse(file.language, file.matter, opts);
    }
    // update file.content
    if (closeIndex === len) {
        file.content = '';
    } else {
        file.content = str.slice(closeIndex + close.length);
        if (file.content[0] === '\r') {
            file.content = file.content.slice(1);
        }
        if (file.content[0] === '\n') {
            file.content = file.content.slice(1);
        }
    }
    excerpt(file, opts);
    if (opts.sections === true || typeof opts.section === 'function') {
        sections(file, opts.section);
    }
    return file;
}
/**
 * Expose engines
 */ matter.engines = engines;
/**
 * Stringify an object to YAML or the specified language, and
 * append it to the given string. By default, only YAML and JSON
 * can be stringified. See the [engines](#engines) section to learn
 * how to stringify other languages.
 *
 * ```js
 * console.log(matter.stringify('foo bar baz', {title: 'Home'}));
 * // results in:
 * // ---
 * // title: Home
 * // ---
 * // foo bar baz
 * ```
 * @param {String|Object} `file` The content string to append to stringified front-matter, or a file object with `file.content` string.
 * @param {Object} `data` Front matter to stringify.
 * @param {Object} `options` [Options](#options) to pass to gray-matter and [js-yaml].
 * @return {String} Returns a string created by wrapping stringified yaml with delimiters, and appending that to the given string.
 * @api public
 */ matter.stringify = function(file, data, options) {
    if (typeof file === 'string') file = matter(file, options);
    return stringify(file, data, options);
};
/**
 * Synchronously read a file from the file system and parse
 * front matter. Returns the same object as the [main function](#matter).
 *
 * ```js
 * const file = matter.read('./content/blog-post.md');
 * ```
 * @param {String} `filepath` file path of the file to read.
 * @param {Object} `options` [Options](#options) to pass to gray-matter.
 * @return {Object} Returns [an object](#returned-object) with `data` and `content`
 * @api public
 */ matter.read = function(filepath, options) {
    const str = fs.readFileSync(filepath, 'utf8');
    const file = matter(str, options);
    file.path = filepath;
    return file;
};
/**
 * Returns true if the given `string` has front matter.
 * @param  {String} `string`
 * @param  {Object} `options`
 * @return {Boolean} True if front matter exists.
 * @api public
 */ matter.test = function(str, options) {
    return utils.startsWith(str, defaults(options).delimiters[0]);
};
/**
 * Detect the language to use, if one is defined after the
 * first front-matter delimiter.
 * @param  {String} `string`
 * @param  {Object} `options`
 * @return {Object} Object with `raw` (actual language string), and `name`, the language with whitespace trimmed
 */ matter.language = function(str, options) {
    const opts = defaults(options);
    const open = opts.delimiters[0];
    if (matter.test(str)) {
        str = str.slice(open.length);
    }
    const language = str.slice(0, str.search(/\r?\n/));
    return {
        raw: language,
        name: language ? language.trim() : ''
    };
};
/**
 * Expose `matter`
 */ matter.cache = {};
matter.clearCache = function() {
    matter.cache = {};
};
module.exports = matter;
}),
"[project]/node_modules/strip-bom-string/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */ module.exports = function(str) {
    if (typeof str === 'string' && str.charAt(0) === '\ufeff') {
        return str.slice(1);
    }
    return str;
};
}),
"[externals]/next-mdx-remote/rsc [external] (next-mdx-remote/rsc, esm_import, [project]/node_modules/next-mdx-remote)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("next-mdx-remote-bb3b2464f4f590a5/rsc");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @import {Node, Parent} from 'unist'
 */ /**
 * @template Fn
 * @template Fallback
 * @typedef {Fn extends (value: any) => value is infer Thing ? Thing : Fallback} Predicate
 */ /**
 * @callback Check
 *   Check that an arbitrary value is a node.
 * @param {unknown} this
 *   The given context.
 * @param {unknown} [node]
 *   Anything (typically a node).
 * @param {number | null | undefined} [index]
 *   The node’s position in its parent.
 * @param {Parent | null | undefined} [parent]
 *   The node’s parent.
 * @returns {boolean}
 *   Whether this is a node and passes a test.
 *
 * @typedef {Record<string, unknown> | Node} Props
 *   Object to check for equivalence.
 *
 *   Note: `Node` is included as it is common but is not indexable.
 *
 * @typedef {Array<Props | TestFunction | string> | ReadonlyArray<Props | TestFunction | string> | Props | TestFunction | string | null | undefined} Test
 *   Check for an arbitrary node.
 *
 * @callback TestFunction
 *   Check if a node passes a test.
 * @param {unknown} this
 *   The given context.
 * @param {Node} node
 *   A node.
 * @param {number | undefined} [index]
 *   The node’s position in its parent.
 * @param {Parent | undefined} [parent]
 *   The node’s parent.
 * @returns {boolean | undefined | void}
 *   Whether this node passes the test.
 *
 *   Note: `void` is included until TS sees no return as `undefined`.
 */ /**
 * Check if `node` is a `Node` and whether it passes the given test.
 *
 * @param {unknown} node
 *   Thing to check, typically `Node`.
 * @param {Test} test
 *   A check for a specific node.
 * @param {number | null | undefined} index
 *   The node’s position in its parent.
 * @param {Parent | null | undefined} parent
 *   The node’s parent.
 * @param {unknown} context
 *   Context object (`this`) to pass to `test` functions.
 * @returns {boolean}
 *   Whether `node` is a node and passes a test.
 */ __turbopack_context__.s([
    "convert",
    ()=>convert,
    "is",
    ()=>is
]);
const is = /**
     * @param {unknown} [node]
     * @param {Test} [test]
     * @param {number | null | undefined} [index]
     * @param {Parent | null | undefined} [parent]
     * @param {unknown} [context]
     * @returns {boolean}
     */ // eslint-disable-next-line max-params
function(node, test, index, parent, context) {
    const check = convert(test);
    if (index !== undefined && index !== null && (typeof index !== 'number' || index < 0 || index === Number.POSITIVE_INFINITY)) {
        throw new Error('Expected positive finite index');
    }
    if (parent !== undefined && parent !== null && (!is(parent) || !parent.children)) {
        throw new Error('Expected parent node');
    }
    if ((parent === undefined || parent === null) !== (index === undefined || index === null)) {
        throw new Error('Expected both parent and index');
    }
    return looksLikeANode(node) ? check.call(context, node, index, parent) : false;
};
const convert = /**
     * @param {Test} [test]
     * @returns {Check}
     */ function(test) {
    if (test === null || test === undefined) {
        return ok;
    }
    if (typeof test === 'function') {
        return castFactory(test);
    }
    if (typeof test === 'object') {
        return Array.isArray(test) ? anyFactory(test) : // narrows to `Array`.
        propertiesFactory(test);
    }
    if (typeof test === 'string') {
        return typeFactory(test);
    }
    throw new Error('Expected function, string, or object as test');
};
/**
 * @param {Array<Props | TestFunction | string>} tests
 * @returns {Check}
 */ function anyFactory(tests) {
    /** @type {Array<Check>} */ const checks = [];
    let index = -1;
    while(++index < tests.length){
        checks[index] = convert(tests[index]);
    }
    return castFactory(any);
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {TestFunction}
   */ function any(...parameters) {
        let index = -1;
        while(++index < checks.length){
            if (checks[index].apply(this, parameters)) return true;
        }
        return false;
    }
}
/**
 * Turn an object into a test for a node with a certain fields.
 *
 * @param {Props} check
 * @returns {Check}
 */ function propertiesFactory(check) {
    const checkAsRecord = check;
    return castFactory(all);
    //TURBOPACK unreachable
    ;
    /**
   * @param {Node} node
   * @returns {boolean}
   */ function all(node) {
        const nodeAsRecord = node;
        /** @type {string} */ let key;
        for(key in check){
            if (nodeAsRecord[key] !== checkAsRecord[key]) return false;
        }
        return true;
    }
}
/**
 * Turn a string into a test for a node with a certain type.
 *
 * @param {string} check
 * @returns {Check}
 */ function typeFactory(check) {
    return castFactory(type);
    //TURBOPACK unreachable
    ;
    /**
   * @param {Node} node
   */ function type(node) {
        return node && node.type === check;
    }
}
/**
 * Turn a custom test into a test for a node that passes that test.
 *
 * @param {TestFunction} testFunction
 * @returns {Check}
 */ function castFactory(testFunction) {
    return check;
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {Check}
   */ function check(value, index, parent) {
        return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index === 'number' ? index : undefined, parent || undefined));
    }
}
function ok() {
    return true;
}
/**
 * @param {unknown} value
 * @returns {value is Node}
 */ function looksLikeANode(value) {
    return value !== null && typeof value === 'object' && 'type' in value;
}
}),
"[project]/node_modules/unist-util-find-after/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findAfter",
    ()=>findAfter
]);
/**
 * @typedef {import('unist').Node} UnistNode
 * @typedef {import('unist').Parent} UnistParent
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ /**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends Array<any>
 *   ? MatchesOne<Value, Check[keyof Check]>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {(
 *   Kind extends {children: Array<infer Child>}
 *   ? Child
 *   : never
 * )} Child
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Kind
 *   All node types.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)");
;
const findAfter = /**
     * @param {UnistParent} parent
     * @param {UnistNode | number} index
     * @param {Test} [test]
     * @returns {UnistNode | undefined}
     */ function(parent, index, test) {
    const is = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convert"])(test);
    if (!parent || !parent.type || !parent.children) {
        throw new Error('Expected parent node');
    }
    if (typeof index === 'number') {
        if (index < 0 || index === Number.POSITIVE_INFINITY) {
            throw new Error('Expected positive finite number as index');
        }
    } else {
        index = parent.children.indexOf(index);
        if (index < 0) {
            throw new Error('Expected child node or index');
        }
    }
    while(++index < parent.children.length){
        if (is(parent.children[index], index, parent)) {
            return parent.children[index];
        }
    }
    return undefined;
};
}),
"[project]/node_modules/hast-util-is-element/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Parents} Parents
 */ /**
 * @template Fn
 * @template Fallback
 * @typedef {Fn extends (value: any) => value is infer Thing ? Thing : Fallback} Predicate
 */ /**
 * @callback Check
 *   Check that an arbitrary value is an element.
 * @param {unknown} this
 *   Context object (`this`) to call `test` with
 * @param {unknown} [element]
 *   Anything (typically a node).
 * @param {number | null | undefined} [index]
 *   Position of `element` in its parent.
 * @param {Parents | null | undefined} [parent]
 *   Parent of `element`.
 * @returns {boolean}
 *   Whether this is an element and passes a test.
 *
 * @typedef {Array<TestFunction | string> | TestFunction | string | null | undefined} Test
 *   Check for an arbitrary element.
 *
 *   * when `string`, checks that the element has that tag name
 *   * when `function`, see `TestFunction`
 *   * when `Array`, checks if one of the subtests pass
 *
 * @callback TestFunction
 *   Check if an element passes a test.
 * @param {unknown} this
 *   The given context.
 * @param {Element} element
 *   An element.
 * @param {number | undefined} [index]
 *   Position of `element` in its parent.
 * @param {Parents | undefined} [parent]
 *   Parent of `element`.
 * @returns {boolean | undefined | void}
 *   Whether this element passes the test.
 *
 *   Note: `void` is included until TS sees no return as `undefined`.
 */ /**
 * Check if `element` is an `Element` and whether it passes the given test.
 *
 * @param element
 *   Thing to check, typically `element`.
 * @param test
 *   Check for a specific element.
 * @param index
 *   Position of `element` in its parent.
 * @param parent
 *   Parent of `element`.
 * @param context
 *   Context object (`this`) to call `test` with.
 * @returns
 *   Whether `element` is an `Element` and passes a test.
 * @throws
 *   When an incorrect `test`, `index`, or `parent` is given; there is no error
 *   thrown when `element` is not a node or not an element.
 */ __turbopack_context__.s([
    "convertElement",
    ()=>convertElement,
    "isElement",
    ()=>isElement
]);
const isElement = /**
     * @param {unknown} [element]
     * @param {Test | undefined} [test]
     * @param {number | null | undefined} [index]
     * @param {Parents | null | undefined} [parent]
     * @param {unknown} [context]
     * @returns {boolean}
     */ // eslint-disable-next-line max-params
function(element, test, index, parent, context) {
    const check = convertElement(test);
    if (index !== null && index !== undefined && (typeof index !== 'number' || index < 0 || index === Number.POSITIVE_INFINITY)) {
        throw new Error('Expected positive finite `index`');
    }
    if (parent !== null && parent !== undefined && (!parent.type || !parent.children)) {
        throw new Error('Expected valid `parent`');
    }
    if ((index === null || index === undefined) !== (parent === null || parent === undefined)) {
        throw new Error('Expected both `index` and `parent`');
    }
    return looksLikeAnElement(element) ? check.call(context, element, index, parent) : false;
};
const convertElement = /**
     * @param {Test | null | undefined} [test]
     * @returns {Check}
     */ function(test) {
    if (test === null || test === undefined) {
        return element;
    }
    if (typeof test === 'string') {
        return tagNameFactory(test);
    }
    // Assume array.
    if (typeof test === 'object') {
        return anyFactory(test);
    }
    if (typeof test === 'function') {
        return castFactory(test);
    }
    throw new Error('Expected function, string, or array as `test`');
};
/**
 * Handle multiple tests.
 *
 * @param {Array<TestFunction | string>} tests
 * @returns {Check}
 */ function anyFactory(tests) {
    /** @type {Array<Check>} */ const checks = [];
    let index = -1;
    while(++index < tests.length){
        checks[index] = convertElement(tests[index]);
    }
    return castFactory(any);
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {TestFunction}
   */ function any(...parameters) {
        let index = -1;
        while(++index < checks.length){
            if (checks[index].apply(this, parameters)) return true;
        }
        return false;
    }
}
/**
 * Turn a string into a test for an element with a certain type.
 *
 * @param {string} check
 * @returns {Check}
 */ function tagNameFactory(check) {
    return castFactory(tagName);
    //TURBOPACK unreachable
    ;
    /**
   * @param {Element} element
   * @returns {boolean}
   */ function tagName(element) {
        return element.tagName === check;
    }
}
/**
 * Turn a custom test into a test for an element that passes that test.
 *
 * @param {TestFunction} testFunction
 * @returns {Check}
 */ function castFactory(testFunction) {
    return check;
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @type {Check}
   */ function check(value, index, parent) {
        return Boolean(looksLikeAnElement(value) && testFunction.call(this, value, typeof index === 'number' ? index : undefined, parent || undefined));
    }
}
/**
 * Make sure something is an element.
 *
 * @param {unknown} element
 * @returns {element is Element}
 */ function element(element) {
    return Boolean(element && typeof element === 'object' && 'type' in element && element.type === 'element' && 'tagName' in element && typeof element.tagName === 'string');
}
/**
 * @param {unknown} value
 * @returns {value is Element}
 */ function looksLikeAnElement(value) {
    return value !== null && typeof value === 'object' && 'type' in value && 'tagName' in value;
}
}),
"[project]/node_modules/hast-util-to-text/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toText",
    ()=>toText
]);
/**
 * @typedef {import('hast').Comment} Comment
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').Parents} Parents
 * @typedef {import('hast').Text} Text
 * @typedef {import('hast-util-is-element').TestFunction} TestFunction
 */ /**
 * @typedef {'normal' | 'nowrap' | 'pre' | 'pre-wrap'} Whitespace
 *   Valid and useful whitespace values (from CSS).
 *
 * @typedef {0 | 1 | 2} BreakNumber
 *   Specific break:
 *
 *   *   `0` — space
 *   *   `1` — line ending
 *   *   `2` — blank line
 *
 * @typedef {'\n'} BreakForce
 *   Forced break.
 *
 * @typedef {boolean} BreakValue
 *   Whether there was a break.
 *
 * @typedef {BreakNumber | BreakValue | undefined} BreakBefore
 *   Any value for a break before.
 *
 * @typedef {BreakForce | BreakNumber | BreakValue | undefined} BreakAfter
 *   Any value for a break after.
 *
 * @typedef CollectionInfo
 *   Info on current collection.
 * @property {BreakAfter} breakAfter
 *   Whether there was a break after.
 * @property {BreakBefore} breakBefore
 *   Whether there was a break before.
 * @property {Whitespace} whitespace
 *   Current whitespace setting.
 *
 * @typedef Options
 *   Configuration.
 * @property {Whitespace | null | undefined} [whitespace='normal']
 *   Initial CSS whitespace setting to use (default: `'normal'`).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$find$2d$after$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unist-util-find-after/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hast-util-is-element/lib/index.js [app-rsc] (ecmascript)");
;
;
const searchLineFeeds = /\n/g;
const searchTabOrSpaces = /[\t ]+/g;
const br = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])('br');
const cell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])(isCell);
const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])('p');
const row = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])('tr');
// Note that we don’t need to include void elements here as they don’t have text.
// See: <https://github.com/wooorm/html-void-elements>
const notRendered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])([
    // List from: <https://html.spec.whatwg.org/multipage/rendering.html#hidden-elements>
    'datalist',
    'head',
    'noembed',
    'noframes',
    'noscript',
    'rp',
    'script',
    'style',
    'template',
    'title',
    // Hidden attribute.
    hidden,
    // From: <https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3>
    closedDialog
]);
// See: <https://html.spec.whatwg.org/multipage/rendering.html#the-css-user-agent-style-sheet-and-presentational-hints>
const blockOrCaption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$is$2d$element$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convertElement"])([
    'address',
    'article',
    'aside',
    'blockquote',
    'body',
    'caption',
    'center',
    'dd',
    'dialog',
    'dir',
    'dl',
    'dt',
    'div',
    'figure',
    'figcaption',
    'footer',
    'form,',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'header',
    'hgroup',
    'hr',
    'html',
    'legend',
    'li',
    'listing',
    'main',
    'menu',
    'nav',
    'ol',
    'p',
    'plaintext',
    'pre',
    'section',
    'ul',
    'xmp' // Flow content (legacy)
]);
function toText(tree, options) {
    const options_ = options || {};
    const children = 'children' in tree ? tree.children : [];
    const block = blockOrCaption(tree);
    const whitespace = inferWhitespace(tree, {
        whitespace: options_.whitespace || 'normal',
        breakBefore: false,
        breakAfter: false
    });
    /** @type {Array<BreakNumber | string>} */ const results = [];
    // Treat `text` and `comment` as having normal white-space.
    // This deviates from the spec as in the DOM the node’s `.data` has to be
    // returned.
    // If you want that behavior use `hast-util-to-string`.
    // All other nodes are later handled as if they are `element`s (so the
    // algorithm also works on a `root`).
    // Nodes without children are treated as a void element, so `doctype` is thus
    // ignored.
    if (tree.type === 'text' || tree.type === 'comment') {
        results.push(...collectText(tree, {
            whitespace,
            breakBefore: true,
            breakAfter: true
        }));
    }
    // 1.  If this element is not being rendered, or if the user agent is a
    //     non-CSS user agent, then return the same value as the textContent IDL
    //     attribute on this element.
    //
    //     Note: we’re not supporting stylesheets so we’re acting as if the node
    //     is rendered.
    //
    //     If you want that behavior use `hast-util-to-string`.
    //     Important: we’ll have to account for this later though.
    // 2.  Let results be a new empty list.
    let index = -1;
    // 3.  For each child node node of this element:
    while(++index < children.length){
        // 3.1. Let current be the list resulting in running the inner text
        //      collection steps with node.
        //      Each item in results will either be a JavaScript string or a
        //      positive integer (a required line break count).
        // 3.2. For each item item in current, append item to results.
        results.push(...renderedTextCollection(children[index], // @ts-expect-error: `tree` is a parent if we’re here.
        tree, {
            whitespace,
            breakBefore: index ? undefined : block,
            breakAfter: index < children.length - 1 ? br(children[index + 1]) : block
        }));
    }
    // 4.  Remove any items from results that are the empty string.
    // 5.  Remove any runs of consecutive required line break count items at the
    //     start or end of results.
    // 6.  Replace each remaining run of consecutive required line break count
    //     items with a string consisting of as many U+000A LINE FEED (LF)
    //     characters as the maximum of the values in the required line break
    //     count items.
    /** @type {Array<string>} */ const result = [];
    /** @type {number | undefined} */ let count;
    index = -1;
    while(++index < results.length){
        const value = results[index];
        if (typeof value === 'number') {
            if (count !== undefined && value > count) count = value;
        } else if (value) {
            if (count !== undefined && count > -1) {
                result.push('\n'.repeat(count) || ' ');
            }
            count = -1;
            result.push(value);
        }
    }
    // 7.  Return the concatenation of the string items in results.
    return result.join('');
}
/**
 * <https://html.spec.whatwg.org/multipage/dom.html#rendered-text-collection-steps>
 *
 * @param {Nodes} node
 * @param {Parents} parent
 * @param {CollectionInfo} info
 * @returns {Array<BreakNumber | string>}
 */ function renderedTextCollection(node, parent, info) {
    if (node.type === 'element') {
        return collectElement(node, parent, info);
    }
    if (node.type === 'text') {
        return info.whitespace === 'normal' ? collectText(node, info) : collectPreText(node);
    }
    return [];
}
/**
 * Collect an element.
 *
 * @param {Element} node
 *   Element node.
 * @param {Parents} parent
 * @param {CollectionInfo} info
 *   Info on current collection.
 * @returns {Array<BreakNumber | string>}
 */ function collectElement(node, parent, info) {
    // First we infer the `white-space` property.
    const whitespace = inferWhitespace(node, info);
    const children = node.children || [];
    let index = -1;
    /** @type {Array<BreakNumber | string>} */ let items = [];
    // We’re ignoring point 3, and exiting without any content here, because we
    // deviated from the spec in `toText` at step 3.
    if (notRendered(node)) {
        return items;
    }
    /** @type {BreakNumber | undefined} */ let prefix;
    /** @type {BreakForce | BreakNumber | undefined} */ let suffix;
    // Note: we first detect if there is going to be a break before or after the
    // contents, as that changes the white-space handling.
    // 2.  If node’s computed value of `visibility` is not `visible`, then return
    //     items.
    //
    //     Note: Ignored, as everything is visible by default user agent styles.
    // 3.  If node is not being rendered, then return items. [...]
    //
    //     Note: We already did this above.
    // See `collectText` for step 4.
    // 5.  If node is a `<br>` element, then append a string containing a single
    //     U+000A LINE FEED (LF) character to items.
    if (br(node)) {
        suffix = '\n';
    } else if (row(node) && // @ts-expect-error: something up with types of parents.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$find$2d$after$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findAfter"])(parent, node, row)) {
        suffix = '\n';
    } else if (p(node)) {
        prefix = 2;
        suffix = 2;
    } else if (blockOrCaption(node)) {
        prefix = 1;
        suffix = 1;
    }
    // 1.  Let items be the result of running the inner text collection steps with
    //     each child node of node in tree order, and then concatenating the
    //     results to a single list.
    while(++index < children.length){
        items = items.concat(renderedTextCollection(children[index], node, {
            whitespace,
            breakBefore: index ? undefined : prefix,
            breakAfter: index < children.length - 1 ? br(children[index + 1]) : suffix
        }));
    }
    // 6.  If node’s computed value of `display` is `table-cell`, and node’s CSS
    //     box is not the last `table-cell` box of its enclosing `table-row` box,
    //     then append a string containing a single U+0009 CHARACTER TABULATION
    //     (tab) character to items.
    //
    //     See: <https://html.spec.whatwg.org/multipage/rendering.html#tables-2>
    if (cell(node) && // @ts-expect-error: something up with types of parents.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$find$2d$after$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findAfter"])(parent, node, cell)) {
        items.push('\t');
    }
    // Add the pre- and suffix.
    if (prefix) items.unshift(prefix);
    if (suffix) items.push(suffix);
    return items;
}
/**
 * 4.  If node is a Text node, then for each CSS text box produced by node,
 *     in content order, compute the text of the box after application of the
 *     CSS `white-space` processing rules and `text-transform` rules, set
 *     items to the list of the resulting strings, and return items.
 *     The CSS `white-space` processing rules are slightly modified:
 *     collapsible spaces at the end of lines are always collapsed, but they
 *     are only removed if the line is the last line of the block, or it ends
 *     with a br element.
 *     Soft hyphens should be preserved.
 *
 *     Note: See `collectText` and `collectPreText`.
 *     Note: we don’t deal with `text-transform`, no element has that by
 *     default.
 *
 * See: <https://drafts.csswg.org/css-text/#white-space-phase-1>
 *
 * @param {Comment | Text} node
 *   Text node.
 * @param {CollectionInfo} info
 *   Info on current collection.
 * @returns {Array<BreakNumber | string>}
 *   Result.
 */ function collectText(node, info) {
    const value = String(node.value);
    /** @type {Array<string>} */ const lines = [];
    /** @type {Array<BreakNumber | string>} */ const result = [];
    let start = 0;
    while(start <= value.length){
        searchLineFeeds.lastIndex = start;
        const match = searchLineFeeds.exec(value);
        const end = match && 'index' in match ? match.index : value.length;
        lines.push(// Any sequence of collapsible spaces and tabs immediately preceding or
        // following a segment break is removed.
        trimAndCollapseSpacesAndTabs(// […] ignoring bidi formatting characters (characters with the
        // Bidi_Control property [UAX9]: ALM, LTR, RTL, LRE-RLO, LRI-PDI) as if
        // they were not there.
        value.slice(start, end).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ''), start === 0 ? info.breakBefore : true, end === value.length ? info.breakAfter : true));
        start = end + 1;
    }
    // Collapsible segment breaks are transformed for rendering according to the
    // segment break transformation rules.
    // So here we jump to 4.1.2 of [CSSTEXT]:
    // Any collapsible segment break immediately following another collapsible
    // segment break is removed
    let index = -1;
    /** @type {BreakNumber | undefined} */ let join;
    while(++index < lines.length){
        // *   If the character immediately before or immediately after the segment
        //     break is the zero-width space character (U+200B), then the break is
        //     removed, leaving behind the zero-width space.
        if (lines[index].charCodeAt(lines[index].length - 1) === 0x20_0b /* ZWSP */  || index < lines.length - 1 && lines[index + 1].charCodeAt(0) === 0x20_0b) {
            result.push(lines[index]);
            join = undefined;
        } else if (lines[index]) {
            if (typeof join === 'number') result.push(join);
            result.push(lines[index]);
            join = 0;
        } else if (index === 0 || index === lines.length - 1) {
            // If this line is empty, and it’s the first or last, add a space.
            // Note that this function is only called in normal whitespace, so we
            // don’t worry about `pre`.
            result.push(0);
        }
    }
    return result;
}
/**
 * Collect a text node as “pre” whitespace.
 *
 * @param {Text} node
 *   Text node.
 * @returns {Array<BreakNumber | string>}
 *   Result.
 */ function collectPreText(node) {
    return [
        String(node.value)
    ];
}
/**
 * 3.  Every collapsible tab is converted to a collapsible space (U+0020).
 * 4.  Any collapsible space immediately following another collapsible
 *     space—even one outside the boundary of the inline containing that
 *     space, provided both spaces are within the same inline formatting
 *     context—is collapsed to have zero advance width. (It is invisible,
 *     but retains its soft wrap opportunity, if any.)
 *
 * @param {string} value
 *   Value to collapse.
 * @param {BreakBefore} breakBefore
 *   Whether there was a break before.
 * @param {BreakAfter} breakAfter
 *   Whether there was a break after.
 * @returns {string}
 *   Result.
 */ function trimAndCollapseSpacesAndTabs(value, breakBefore, breakAfter) {
    /** @type {Array<string>} */ const result = [];
    let start = 0;
    /** @type {number | undefined} */ let end;
    while(start < value.length){
        searchTabOrSpaces.lastIndex = start;
        const match = searchTabOrSpaces.exec(value);
        end = match ? match.index : value.length;
        // If we’re not directly after a segment break, but there was white space,
        // add an empty value that will be turned into a space.
        if (!start && !end && match && !breakBefore) {
            result.push('');
        }
        if (start !== end) {
            result.push(value.slice(start, end));
        }
        start = match ? end + match[0].length : end;
    }
    // If we reached the end, there was trailing white space, and there’s no
    // segment break after this node, add an empty value that will be turned
    // into a space.
    if (start !== end && !breakAfter) {
        result.push('');
    }
    return result.join(' ');
}
/**
 * Figure out the whitespace of a node.
 *
 * We don’t support void elements here (so `nobr wbr` -> `normal` is ignored).
 *
 * @param {Nodes} node
 *   Node (typically `Element`).
 * @param {CollectionInfo} info
 *   Info on current collection.
 * @returns {Whitespace}
 *   Applied whitespace.
 */ function inferWhitespace(node, info) {
    if (node.type === 'element') {
        const properties = node.properties || {};
        switch(node.tagName){
            case 'listing':
            case 'plaintext':
            case 'xmp':
                {
                    return 'pre';
                }
            case 'nobr':
                {
                    return 'nowrap';
                }
            case 'pre':
                {
                    return properties.wrap ? 'pre-wrap' : 'pre';
                }
            case 'td':
            case 'th':
                {
                    return properties.noWrap ? 'nowrap' : info.whitespace;
                }
            case 'textarea':
                {
                    return 'pre-wrap';
                }
            default:
        }
    }
    return info.whitespace;
}
/**
 * @type {TestFunction}
 * @param {Element} node
 * @returns {node is {properties: {hidden: true}}}
 */ function hidden(node) {
    return Boolean((node.properties || {}).hidden);
}
/**
 * @type {TestFunction}
 * @param {Element} node
 * @returns {node is {tagName: 'td' | 'th'}}
 */ function isCell(node) {
    return node.tagName === 'td' || node.tagName === 'th';
}
/**
 * @type {TestFunction}
 */ function closedDialog(node) {
    return node.tagName === 'dialog' && !(node.properties || {}).open;
}
}),
"[project]/node_modules/lowlight/lib/common.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "grammars",
    ()=>grammars
]);
/**
 * @import {LanguageFn} from 'highlight.js'
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$arduino$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/arduino.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$bash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/bash.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$c$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/c.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$cpp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/cpp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$csharp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/csharp.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$css$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/css.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$diff$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/diff.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$go$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/go.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$graphql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/graphql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$ini$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/ini.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$java$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/java.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$javascript$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/javascript.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$json$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/json.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$kotlin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/kotlin.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$less$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/less.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$lua$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/lua.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$makefile$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/makefile.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$markdown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/markdown.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$objectivec$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/objectivec.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$perl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/perl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$php$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/php.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$php$2d$template$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/php-template.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$plaintext$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/plaintext.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$python$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/python.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$python$2d$repl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/python-repl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$r$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/r.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$ruby$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/ruby.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$rust$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/rust.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$scss$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/scss.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$shell$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/shell.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/sql.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$swift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/swift.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$typescript$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/typescript.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$vbnet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/vbnet.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$wasm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/wasm.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$xml$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/xml.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$yaml$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/languages/yaml.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const grammars = {
    arduino: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$arduino$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    bash: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$bash$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    c: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$c$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    cpp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$cpp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    csharp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$csharp$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    css: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$css$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    diff: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$diff$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    go: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$go$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    graphql: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$graphql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    ini: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$ini$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    java: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$java$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    javascript: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$javascript$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    json: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$json$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    kotlin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$kotlin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    less: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$less$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    lua: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$lua$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    makefile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$makefile$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    markdown: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$markdown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    objectivec: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$objectivec$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    perl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$perl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    php: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$php$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    'php-template': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$php$2d$template$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    plaintext: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$plaintext$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    python: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$python$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    'python-repl': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$python$2d$repl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    r: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$r$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    ruby: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$ruby$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    rust: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$rust$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    scss: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$scss$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    shell: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$shell$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    sql: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$sql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    swift: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$swift$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    typescript: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$typescript$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    vbnet: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$vbnet$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    wasm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$wasm$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    xml: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$xml$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    yaml: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$languages$2f$yaml$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
};
}),
"[project]/node_modules/lowlight/lib/common.js [app-rsc] (ecmascript) <export grammars as common>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "common",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lowlight$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["grammars"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lowlight$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lowlight/lib/common.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/lowlight/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLowlight",
    ()=>createLowlight
]);
/**
 * @import {ElementContent, Element, RootData, Root} from 'hast'
 * @import {Emitter, HLJSOptions as HljsOptions, HighlightResult, LanguageFn} from 'highlight.js'
 */ /**
 * @typedef {Object} ExtraOptions
 *   Extra fields.
 * @property {ReadonlyArray<string> | null | undefined} [subset]
 *   List of allowed languages (default: all registered languages).
 *
 * @typedef Options
 *   Configuration for `highlight`.
 * @property {string | null | undefined} [prefix='hljs-']
 *   Class prefix (default: `'hljs-'`).
 *
 * @typedef {Options & ExtraOptions} AutoOptions
 *   Configuration for `highlightAuto`.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/core.js [app-rsc] (ecmascript) <locals>");
;
;
/** @type {AutoOptions} */ const emptyOptions = {};
const defaultPrefix = 'hljs-';
function createLowlight(grammars) {
    const high = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$core$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].newInstance();
    if (grammars) {
        register(grammars);
    }
    return {
        highlight,
        highlightAuto,
        listLanguages,
        register,
        registerAlias,
        registered
    };
    //TURBOPACK unreachable
    ;
    /**
   * Highlight `value` (code) as `language` (name).
   *
   * @example
   *   ```js
   *   import {common, createLowlight} from 'lowlight'
   *
   *   const lowlight = createLowlight(common)
   *
   *   console.log(lowlight.highlight('css', 'em { color: red }'))
   *   ```
   *
   *   Yields:
   *
   *   ```js
   *   {type: 'root', children: [Array], data: {language: 'css', relevance: 3}}
   *   ```
   *
   * @param {string} language
   *   Programming language name.
   * @param {string} value
   *   Code to highlight.
   * @param {Readonly<Options> | null | undefined} [options={}]
   *   Configuration (optional).
   * @returns {Root}
   *   Tree; with the following `data` fields: `language` (`string`), detected
   *   programming language name; `relevance` (`number`), how sure lowlight is
   *   that the given code is in the language.
   */ function highlight(language, value, options) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof language === 'string', 'expected `string` as `name`');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof value === 'string', 'expected `string` as `value`');
        const settings = options || emptyOptions;
        const prefix = typeof settings.prefix === 'string' ? settings.prefix : defaultPrefix;
        if (!high.getLanguage(language)) {
            throw new Error('Unknown language: `' + language + '` is not registered');
        }
        // See: <https://github.com/highlightjs/highlight.js/issues/3621#issuecomment-1528841888>
        high.configure({
            __emitter: HastEmitter,
            classPrefix: prefix
        });
        const result = high.highlight(value, {
            ignoreIllegals: true,
            language
        });
        // `highlight.js` seems to use this (currently) for broken grammars, so let’s
        // keep it in there just to be sure.
        /* c8 ignore next 5 */ if (result.errorRaised) {
            throw new Error('Could not highlight with `Highlight.js`', {
                cause: result.errorRaised
            });
        }
        const root = result._emitter.root;
        // Cast because it is always defined.
        const data = root.data;
        data.language = result.language;
        data.relevance = result.relevance;
        return root;
    }
    /**
   * Highlight `value` (code) and guess its programming language.
   *
   * @example
   *   ```js
   *   import {common, createLowlight} from 'lowlight'
   *
   *   const lowlight = createLowlight(common)
   *
   *   console.log(lowlight.highlightAuto('"hello, " + name + "!"'))
   *   ```
   *
   *   Yields:
   *
   *   ```js
   *   {type: 'root', children: [Array], data: {language: 'arduino', relevance: 2}}
   *   ```
   *
   * @param {string} value
   *   Code to highlight.
   * @param {Readonly<AutoOptions> | null | undefined} [options={}]
   *   Configuration (optional).
   * @returns {Root}
   *   Tree; with the following `data` fields: `language` (`string`), detected
   *   programming language name; `relevance` (`number`), how sure lowlight is
   *   that the given code is in the language.
   */ function highlightAuto(value, options) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(typeof value === 'string', 'expected `string` as `value`');
        const settings = options || emptyOptions;
        const subset = settings.subset || listLanguages();
        let index = -1;
        let relevance = 0;
        /** @type {Root | undefined} */ let result;
        while(++index < subset.length){
            const name = subset[index];
            if (!high.getLanguage(name)) continue;
            const current = highlight(name, value, options);
            if (current.data && current.data.relevance !== undefined && current.data.relevance > relevance) {
                relevance = current.data.relevance;
                result = current;
            }
        }
        return result || {
            type: 'root',
            children: [],
            data: {
                language: undefined,
                relevance
            }
        };
    }
    /**
   * List registered languages.
   *
   * @example
   *   ```js
   *   import {createLowlight} from 'lowlight'
   *   import markdown from 'highlight.js/lib/languages/markdown'
   *
   *   const lowlight = createLowlight()
   *
   *   console.log(lowlight.listLanguages()) // => []
   *
   *   lowlight.register({markdown})
   *
   *   console.log(lowlight.listLanguages()) // => ['markdown']
   *   ```
   *
   * @returns {Array<string>}
   *   Names of registered language.
   */ function listLanguages() {
        return high.listLanguages();
    }
    /**
   * Register languages.
   *
   * @example
   *   ```js
   *   import {createLowlight} from 'lowlight'
   *   import xml from 'highlight.js/lib/languages/xml'
   *
   *   const lowlight = createLowlight()
   *
   *   lowlight.register({xml})
   *
   *   // Note: `html` is an alias for `xml`.
   *   console.log(lowlight.highlight('html', '<em>Emphasis</em>'))
   *   ```
   *
   *   Yields:
   *
   *   ```js
   *   {type: 'root', children: [Array], data: {language: 'html', relevance: 2}}
   *   ```
   *
   * @overload
   * @param {Readonly<Record<string, LanguageFn>>} grammars
   * @returns {undefined}
   *
   * @overload
   * @param {string} name
   * @param {LanguageFn} grammar
   * @returns {undefined}
   *
   * @param {Readonly<Record<string, LanguageFn>> | string} grammarsOrName
   *   Grammars or programming language name.
   * @param {LanguageFn | undefined} [grammar]
   *   Grammar, if with name.
   * @returns {undefined}
   *   Nothing.
   */ function register(grammarsOrName, grammar) {
        if (typeof grammarsOrName === 'string') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(grammar !== undefined, 'expected `grammar`');
            high.registerLanguage(grammarsOrName, grammar);
        } else {
            /** @type {string} */ let name;
            for(name in grammarsOrName){
                if (Object.hasOwn(grammarsOrName, name)) {
                    high.registerLanguage(name, grammarsOrName[name]);
                }
            }
        }
    }
    /**
   * Register aliases.
   *
   * @example
   *   ```js
   *   import {createLowlight} from 'lowlight'
   *   import markdown from 'highlight.js/lib/languages/markdown'
   *
   *   const lowlight = createLowlight()
   *
   *   lowlight.register({markdown})
   *
   *   // lowlight.highlight('mdown', '<em>Emphasis</em>')
   *   // ^ would throw: Error: Unknown language: `mdown` is not registered
   *
   *   lowlight.registerAlias({markdown: ['mdown', 'mkdn', 'mdwn', 'ron']})
   *   lowlight.highlight('mdown', '<em>Emphasis</em>')
   *   // ^ Works!
   *   ```
   *
   * @overload
   * @param {Readonly<Record<string, ReadonlyArray<string> | string>>} aliases
   * @returns {undefined}
   *
   * @overload
   * @param {string} language
   * @param {ReadonlyArray<string> | string} alias
   * @returns {undefined}
   *
   * @param {Readonly<Record<string, ReadonlyArray<string> | string>> | string} aliasesOrName
   *   Map of programming language names to one or more aliases, or programming
   *   language name.
   * @param {ReadonlyArray<string> | string | undefined} [alias]
   *   One or more aliases for the programming language, if with `name`.
   * @returns {undefined}
   *   Nothing.
   */ function registerAlias(aliasesOrName, alias) {
        if (typeof aliasesOrName === 'string') {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$devlop$2f$lib$2f$development$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ok"])(alias !== undefined);
            high.registerAliases(// Note: copy needed because hljs doesn’t accept readonly arrays yet.
            typeof alias === 'string' ? alias : [
                ...alias
            ], {
                languageName: aliasesOrName
            });
        } else {
            /** @type {string} */ let key;
            for(key in aliasesOrName){
                if (Object.hasOwn(aliasesOrName, key)) {
                    const aliases = aliasesOrName[key];
                    high.registerAliases(// Note: copy needed because hljs doesn’t accept readonly arrays yet.
                    typeof aliases === 'string' ? aliases : [
                        ...aliases
                    ], {
                        languageName: key
                    });
                }
            }
        }
    }
    /**
   * Check whether an alias or name is registered.
   *
   * @example
   *   ```js
   *   import {createLowlight} from 'lowlight'
   *   import javascript from 'highlight.js/lib/languages/javascript'
   *
   *   const lowlight = createLowlight({javascript})
   *
   *   console.log(lowlight.registered('funkyscript')) // => `false`
   *
   *   lowlight.registerAlias({javascript: 'funkyscript'})
   *   console.log(lowlight.registered('funkyscript')) // => `true`
   *   ```
   *
   * @param {string} aliasOrName
   *   Name of a language or alias for one.
   * @returns {boolean}
   *   Whether `aliasOrName` is registered.
   */ function registered(aliasOrName) {
        return Boolean(high.getLanguage(aliasOrName));
    }
}
/** @type {Emitter} */ class HastEmitter {
    /**
   * @param {Readonly<HljsOptions>} options
   *   Configuration.
   * @returns
   *   Instance.
   */ constructor(options){
        /** @type {HljsOptions} */ this.options = options;
        /** @type {Root} */ this.root = {
            type: 'root',
            children: [],
            data: {
                language: undefined,
                relevance: 0
            }
        };
        /** @type {[Root, ...Array<Element>]} */ this.stack = [
            this.root
        ];
    }
    /**
   * @param {string} value
   *   Text to add.
   * @returns {undefined}
   *   Nothing.
   *
   */ addText(value) {
        if (value === '') return;
        const current = this.stack[this.stack.length - 1];
        const tail = current.children[current.children.length - 1];
        if (tail && tail.type === 'text') {
            tail.value += value;
        } else {
            current.children.push({
                type: 'text',
                value
            });
        }
    }
    /**
   *
   * @param {unknown} rawName
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */ startScope(rawName) {
        this.openNode(String(rawName));
    }
    /**
   * @returns {undefined}
   *   Nothing.
   */ endScope() {
        this.closeNode();
    }
    /**
   * @param {HastEmitter} other
   *   Other emitter.
   * @param {string} name
   *   Name of the sublanguage.
   * @returns {undefined}
   *   Nothing.
   */ __addSublanguage(other, name) {
        const current = this.stack[this.stack.length - 1];
        // Assume only element content.
        const results = other.root.children;
        if (name) {
            current.children.push({
                type: 'element',
                tagName: 'span',
                properties: {
                    className: [
                        name
                    ]
                },
                children: results
            });
        } else {
            current.children.push(...results);
        }
    }
    /**
   * @param {string} name
   *   Name to add.
   * @returns {undefined}
   *   Nothing.
   */ openNode(name) {
        const self = this;
        // First “class” gets the prefix. Rest gets a repeated underscore suffix.
        // See: <https://github.com/highlightjs/highlight.js/commit/51806aa>
        // See: <https://github.com/wooorm/lowlight/issues/43>
        const className = name.split('.').map(function(d, i) {
            return i ? d + '_'.repeat(i) : self.options.classPrefix + d;
        });
        const current = this.stack[this.stack.length - 1];
        /** @type {Element} */ const child = {
            type: 'element',
            tagName: 'span',
            properties: {
                className
            },
            children: []
        };
        current.children.push(child);
        this.stack.push(child);
    }
    /**
   * @returns {undefined}
   *   Nothing.
   */ closeNode() {
        this.stack.pop();
    }
    /**
   * @returns {undefined}
   *   Nothing.
   */ finalize() {}
    /**
   * @returns {string}
   *   Nothing.
   */ toHTML() {
        return '';
    }
}
}),
"[project]/node_modules/dequal/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dequal",
    ()=>dequal
]);
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
    for (key of iter.keys()){
        if (dequal(key, tar)) return key;
    }
}
function dequal(foo, bar) {
    var ctor, len, tmp;
    if (foo === bar) return true;
    if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
        if (ctor === Date) return foo.getTime() === bar.getTime();
        if (ctor === RegExp) return foo.toString() === bar.toString();
        if (ctor === Array) {
            if ((len = foo.length) === bar.length) {
                while(len-- && dequal(foo[len], bar[len]));
            }
            return len === -1;
        }
        if (ctor === Set) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len;
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!bar.has(tmp)) return false;
            }
            return true;
        }
        if (ctor === Map) {
            if (foo.size !== bar.size) {
                return false;
            }
            for (len of foo){
                tmp = len[0];
                if (tmp && typeof tmp === 'object') {
                    tmp = find(bar, tmp);
                    if (!tmp) return false;
                }
                if (!dequal(len[1], bar.get(tmp))) {
                    return false;
                }
            }
            return true;
        }
        if (ctor === ArrayBuffer) {
            foo = new Uint8Array(foo);
            bar = new Uint8Array(bar);
        } else if (ctor === DataView) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo.getInt8(len) === bar.getInt8(len));
            }
            return len === -1;
        }
        if (ArrayBuffer.isView(foo)) {
            if ((len = foo.byteLength) === bar.byteLength) {
                while(len-- && foo[len] === bar[len]);
            }
            return len === -1;
        }
        if (!ctor || typeof foo === 'object') {
            len = 0;
            for(ctor in foo){
                if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
                if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
            }
            return Object.keys(bar).length === len;
        }
    }
    return foo !== foo && bar !== bar;
}
}),
"[project]/node_modules/devlop/lib/development.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deprecate",
    ()=>deprecate,
    "equal",
    ()=>equal,
    "ok",
    ()=>ok,
    "unreachable",
    ()=>unreachable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dequal$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dequal/dist/index.mjs [app-rsc] (ecmascript)");
;
/**
 * @type {Set<string>}
 */ const codesWarned = new Set();
class AssertionError extends Error {
    name = 'Assertion';
    code = 'ERR_ASSERTION';
    /**
   * Create an assertion error.
   *
   * @param {string} message
   *   Message explaining error.
   * @param {unknown} actual
   *   Value.
   * @param {unknown} expected
   *   Baseline.
   * @param {string} operator
   *   Name of equality operation.
   * @param {boolean} generated
   *   Whether `message` is a custom message or not
   * @returns
   *   Instance.
   */ // eslint-disable-next-line max-params
    constructor(message, actual, expected, operator, generated){
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        /**
     * @type {unknown}
     */ this.actual = actual;
        /**
     * @type {unknown}
     */ this.expected = expected;
        /**
     * @type {boolean}
     */ this.generated = generated;
        /**
     * @type {string}
     */ this.operator = operator;
    }
}
class DeprecationError extends Error {
    name = 'DeprecationWarning';
    /**
   * Create a deprecation message.
   *
   * @param {string} message
   *   Message explaining deprecation.
   * @param {string | undefined} code
   *   Deprecation identifier; deprecation messages will be generated only once per code.
   * @returns
   *   Instance.
   */ constructor(message, code){
        super(message);
        /**
     * @type {string | undefined}
     */ this.code = code;
    }
}
function deprecate(fn, message, code) {
    let warned = false;
    // The wrapper will keep the same prototype as fn to maintain prototype chain
    Object.setPrototypeOf(deprecated, fn);
    // @ts-expect-error: it’s perfect, typescript…
    return deprecated;
    //TURBOPACK unreachable
    ;
    /**
   * @this {unknown}
   * @param  {...Array<unknown>} args
   * @returns {unknown}
   */ function deprecated(...args) {
        if (!warned) {
            warned = true;
            if (typeof code === 'string' && codesWarned.has(code)) {
            // Empty.
            } else {
                console.error(new DeprecationError(message, code || undefined));
                if (typeof code === 'string') codesWarned.add(code);
            }
        }
        return new.target ? Reflect.construct(fn, args, new.target) : Reflect.apply(fn, this, args);
    }
}
function equal(actual, expected, message) {
    assert((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dequal$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dequal"])(actual, expected), actual, expected, 'equal', 'Expected values to be deeply equal', message);
}
function ok(value, message) {
    assert(Boolean(value), false, true, 'ok', 'Expected value to be truthy', message);
}
function unreachable(message) {
    assert(false, false, true, 'ok', 'Unreachable', message);
}
/**
 * @param {boolean} bool
 *   Whether to skip this operation.
 * @param {unknown} actual
 *   Actual value.
 * @param {unknown} expected
 *   Expected value.
 * @param {string} operator
 *   Operator.
 * @param {string} defaultMessage
 *   Default message for operation.
 * @param {Error | string | null | undefined} userMessage
 *   User-provided message.
 * @returns {asserts bool}
 *   Nothing; throws when falsey.
 */ // eslint-disable-next-line max-params
function assert(bool, actual, expected, operator, defaultMessage, userMessage) {
    if (!bool) {
        throw userMessage instanceof Error ? userMessage : new AssertionError(userMessage || defaultMessage, actual, expected, operator, !userMessage);
    }
}
}),
"[project]/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/color.node.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @param {string} d
 * @returns {string}
 */ __turbopack_context__.s([
    "color",
    ()=>color
]);
function color(d) {
    return '\u001B[33m' + d + '\u001B[39m';
}
}),
"[project]/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTINUE",
    ()=>CONTINUE,
    "EXIT",
    ()=>EXIT,
    "SKIP",
    ()=>SKIP,
    "visitParents",
    ()=>visitParents
]);
/**
 * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ /**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends ReadonlyArray<infer T>
 *   ? MatchesOne<Value, T>
 *   : Check extends Array<infer T>
 *   ? MatchesOne<Value, T>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
 *   Number; capped reasonably.
 */ /**
 * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
 *   Increment a number in the type system.
 * @template {Uint} [I=0]
 *   Index.
 */ /**
 * @typedef {(
 *   Node extends UnistParent
 *   ? Node extends {children: Array<infer Children>}
 *     ? Child extends Children ? Node : never
 *     : never
 *   : never
 * )} InternalParent
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Depth extends Max
 *   ? never
 *   :
 *     | InternalParent<Node, Child>
 *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
 * )} InternalAncestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {InternalAncestor<InclusiveDescendant<Tree>, Child>} Ancestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Tree extends UnistParent
 *     ? Depth extends Max
 *       ? Tree
 *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
 *     : Tree
 * )} InclusiveDescendant
 *   Collect all (inclusive) descendants of `Tree`.
 *
 *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
 *   > recurse without actually running into an infinite loop, which the
 *   > previous version did.
 *   >
 *   > Practically, a max of `2` is typically enough assuming a `Root` is
 *   > passed, but it doesn’t improve performance.
 *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
 *   > Using up to `10` doesn’t hurt or help either.
 * @template {UnistNode} Tree
 *   Tree type.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {'skip' | boolean} Action
 *   Union of the action types.
 *
 * @typedef {number} Index
 *   Move to the sibling at `index` next (after node itself is completely
 *   traversed).
 *
 *   Useful if mutating the tree, such as removing the node the visitor is
 *   currently on, or any of its previous siblings.
 *   Results less than 0 or greater than or equal to `children.length` stop
 *   traversing the parent.
 *
 * @typedef {[(Action | null | undefined | void)?, (Index | null | undefined)?]} ActionTuple
 *   List with one or two values, the first an action, the second an index.
 *
 * @typedef {Action | ActionTuple | Index | null | undefined | void} VisitorResult
 *   Any value that can be returned from a visitor.
 */ /**
 * @callback Visitor
 *   Handle a node (matching `test`, if given).
 *
 *   Visitors are free to transform `node`.
 *   They can also transform the parent of node (the last of `ancestors`).
 *
 *   Replacing `node` itself, if `SKIP` is not returned, still causes its
 *   descendants to be walked (which is a bug).
 *
 *   When adding or removing previous siblings of `node` (or next siblings, in
 *   case of reverse), the `Visitor` should return a new `Index` to specify the
 *   sibling to traverse after `node` is traversed.
 *   Adding or removing next siblings of `node` (or previous siblings, in case
 *   of reverse) is handled as expected without needing to return a new `Index`.
 *
 *   Removing the children property of an ancestor still results in them being
 *   traversed.
 * @param {Visited} node
 *   Found node.
 * @param {Array<VisitedParents>} ancestors
 *   Ancestors of `node`.
 * @returns {VisitorResult}
 *   What to do next.
 *
 *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
 *   An `Action` is treated as a tuple of `[Action]`.
 *
 *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
 *   When the `Action` is `EXIT`, that action can be returned.
 *   When the `Action` is `CONTINUE`, `Index` can be returned.
 * @template {UnistNode} [Visited=UnistNode]
 *   Visited node type.
 * @template {UnistParent} [VisitedParents=UnistParent]
 *   Ancestor type.
 */ /**
 * @typedef {Visitor<Matches<InclusiveDescendant<Tree>, Check>, Ancestor<Tree, Matches<InclusiveDescendant<Tree>, Check>>>} BuildVisitor
 *   Build a typed `Visitor` function from a tree and a test.
 *
 *   It will infer which values are passed as `node` and which as `parents`.
 * @template {UnistNode} [Tree=UnistNode]
 *   Tree type.
 * @template {Test} [Check=Test]
 *   Test type.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unist-util-is/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$color$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/color.node.js [app-rsc] (ecmascript)");
;
;
/** @type {Readonly<ActionTuple>} */ const empty = [];
const CONTINUE = true;
const EXIT = false;
const SKIP = 'skip';
function visitParents(tree, test, visitor, reverse) {
    /** @type {Test} */ let check;
    if (typeof test === 'function' && typeof visitor !== 'function') {
        reverse = visitor;
        // @ts-expect-error no visitor given, so `visitor` is test.
        visitor = test;
    } else {
        // @ts-expect-error visitor given, so `test` isn’t a visitor.
        check = test;
    }
    const is = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$is$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["convert"])(check);
    const step = reverse ? -1 : 1;
    factory(tree, undefined, [])();
    /**
   * @param {UnistNode} node
   * @param {number | undefined} index
   * @param {Array<UnistParent>} parents
   */ function factory(node, index, parents) {
        const value = node && typeof node === 'object' ? node : {};
        if (typeof value.type === 'string') {
            const name = // `hast`
            typeof value.tagName === 'string' ? value.tagName : typeof value.name === 'string' ? value.name : undefined;
            Object.defineProperty(visit, 'name', {
                value: 'node (' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$color$2e$node$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["color"])(node.type + (name ? '<' + name + '>' : '')) + ')'
            });
        }
        return visit;
        //TURBOPACK unreachable
        ;
        function visit() {
            /** @type {Readonly<ActionTuple>} */ let result = empty;
            /** @type {Readonly<ActionTuple>} */ let subresult;
            /** @type {number} */ let offset;
            /** @type {Array<UnistParent>} */ let grandparents;
            if (!test || is(node, index, parents[parents.length - 1] || undefined)) {
                // @ts-expect-error: `visitor` is now a visitor.
                result = toResult(visitor(node, parents));
                if (result[0] === EXIT) {
                    return result;
                }
            }
            if ('children' in node && node.children) {
                const nodeAsParent = node;
                if (nodeAsParent.children && result[0] !== SKIP) {
                    offset = (reverse ? nodeAsParent.children.length : -1) + step;
                    grandparents = parents.concat(nodeAsParent);
                    while(offset > -1 && offset < nodeAsParent.children.length){
                        const child = nodeAsParent.children[offset];
                        subresult = factory(child, offset, grandparents)();
                        if (subresult[0] === EXIT) {
                            return subresult;
                        }
                        offset = typeof subresult[1] === 'number' ? subresult[1] : offset + step;
                    }
                }
            }
            return result;
        }
    }
}
/**
 * Turn a return value into a clean result.
 *
 * @param {VisitorResult} value
 *   Valid return values from visitors.
 * @returns {Readonly<ActionTuple>}
 *   Clean result.
 */ function toResult(value) {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'number') {
        return [
            CONTINUE,
            value
        ];
    }
    return value === null || value === undefined ? empty : [
        value
    ];
}
}),
"[project]/node_modules/unist-util-visit/lib/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "visit",
    ()=>visit
]);
/**
 * @import {Node as UnistNode, Parent as UnistParent} from 'unist'
 * @import {VisitorResult} from 'unist-util-visit-parents'
 */ /**
 * @typedef {Exclude<import('unist-util-is').Test, undefined> | undefined} Test
 *   Test from `unist-util-is`.
 *
 *   Note: we have remove and add `undefined`, because otherwise when generating
 *   automatic `.d.ts` files, TS tries to flatten paths from a local perspective,
 *   which doesn’t work when publishing on npm.
 */ // To do: use types from `unist-util-visit-parents` when it’s released.
/**
 * @typedef {(
 *   Fn extends (value: any) => value is infer Thing
 *   ? Thing
 *   : Fallback
 * )} Predicate
 *   Get the value of a type guard `Fn`.
 * @template Fn
 *   Value; typically function that is a type guard (such as `(x): x is Y`).
 * @template Fallback
 *   Value to yield if `Fn` is not a type guard.
 */ /**
 * @typedef {(
 *   Check extends null | undefined // No test.
 *   ? Value
 *   : Value extends {type: Check} // String (type) test.
 *   ? Value
 *   : Value extends Check // Partial test.
 *   ? Value
 *   : Check extends Function // Function test.
 *   ? Predicate<Check, Value> extends Value
 *     ? Predicate<Check, Value>
 *     : never
 *   : never // Some other test?
 * )} MatchesOne
 *   Check whether a node matches a primitive check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test, but not arrays.
 */ /**
 * @typedef {(
 *   Check extends ReadonlyArray<any>
 *   ? MatchesOne<Value, Check[number]>
 *   : MatchesOne<Value, Check>
 * )} Matches
 *   Check whether a node matches a check in the type system.
 * @template Value
 *   Value; typically unist `Node`.
 * @template Check
 *   Value; typically `unist-util-is`-compatible test.
 */ /**
 * @typedef {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10} Uint
 *   Number; capped reasonably.
 */ /**
 * @typedef {I extends 0 ? 1 : I extends 1 ? 2 : I extends 2 ? 3 : I extends 3 ? 4 : I extends 4 ? 5 : I extends 5 ? 6 : I extends 6 ? 7 : I extends 7 ? 8 : I extends 8 ? 9 : 10} Increment
 *   Increment a number in the type system.
 * @template {Uint} [I=0]
 *   Index.
 */ /**
 * @typedef {(
 *   Node extends UnistParent
 *   ? Node extends {children: Array<infer Children>}
 *     ? Child extends Children ? Node : never
 *     : never
 *   : never
 * )} InternalParent
 *   Collect nodes that can be parents of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {InternalParent<InclusiveDescendant<Tree>, Child>} Parent
 *   Collect nodes in `Tree` that can be parents of `Child`.
 * @template {UnistNode} Tree
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 */ /**
 * @typedef {(
 *   Depth extends Max
 *   ? never
 *   :
 *     | InternalParent<Node, Child>
 *     | InternalAncestor<Node, InternalParent<Node, Child>, Max, Increment<Depth>>
 * )} InternalAncestor
 *   Collect nodes in `Tree` that can be ancestors of `Child`.
 * @template {UnistNode} Node
 *   All node types in a tree.
 * @template {UnistNode} Child
 *   Node to search for.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @typedef {(
 *   Tree extends UnistParent
 *     ? Depth extends Max
 *       ? Tree
 *       : Tree | InclusiveDescendant<Tree['children'][number], Max, Increment<Depth>>
 *     : Tree
 * )} InclusiveDescendant
 *   Collect all (inclusive) descendants of `Tree`.
 *
 *   > 👉 **Note**: for performance reasons, this seems to be the fastest way to
 *   > recurse without actually running into an infinite loop, which the
 *   > previous version did.
 *   >
 *   > Practically, a max of `2` is typically enough assuming a `Root` is
 *   > passed, but it doesn’t improve performance.
 *   > It gets higher with `List > ListItem > Table > TableRow > TableCell`.
 *   > Using up to `10` doesn’t hurt or help either.
 * @template {UnistNode} Tree
 *   Tree type.
 * @template {Uint} [Max=10]
 *   Max; searches up to this depth.
 * @template {Uint} [Depth=0]
 *   Current depth.
 */ /**
 * @callback Visitor
 *   Handle a node (matching `test`, if given).
 *
 *   Visitors are free to transform `node`.
 *   They can also transform `parent`.
 *
 *   Replacing `node` itself, if `SKIP` is not returned, still causes its
 *   descendants to be walked (which is a bug).
 *
 *   When adding or removing previous siblings of `node` (or next siblings, in
 *   case of reverse), the `Visitor` should return a new `Index` to specify the
 *   sibling to traverse after `node` is traversed.
 *   Adding or removing next siblings of `node` (or previous siblings, in case
 *   of reverse) is handled as expected without needing to return a new `Index`.
 *
 *   Removing the children property of `parent` still results in them being
 *   traversed.
 * @param {Visited} node
 *   Found node.
 * @param {Visited extends UnistNode ? number | undefined : never} index
 *   Index of `node` in `parent`.
 * @param {Ancestor extends UnistParent ? Ancestor | undefined : never} parent
 *   Parent of `node`.
 * @returns {VisitorResult}
 *   What to do next.
 *
 *   An `Index` is treated as a tuple of `[CONTINUE, Index]`.
 *   An `Action` is treated as a tuple of `[Action]`.
 *
 *   Passing a tuple back only makes sense if the `Action` is `SKIP`.
 *   When the `Action` is `EXIT`, that action can be returned.
 *   When the `Action` is `CONTINUE`, `Index` can be returned.
 * @template {UnistNode} [Visited=UnistNode]
 *   Visited node type.
 * @template {UnistParent} [Ancestor=UnistParent]
 *   Ancestor type.
 */ /**
 * @typedef {Visitor<Visited, Parent<Ancestor, Visited>>} BuildVisitorFromMatch
 *   Build a typed `Visitor` function from a node and all possible parents.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} Visited
 *   Node type.
 * @template {UnistParent} Ancestor
 *   Parent type.
 */ /**
 * @typedef {(
 *   BuildVisitorFromMatch<
 *     Matches<Descendant, Check>,
 *     Extract<Descendant, UnistParent>
 *   >
 * )} BuildVisitorFromDescendants
 *   Build a typed `Visitor` function from a list of descendants and a test.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} Descendant
 *   Node type.
 * @template {Test} Check
 *   Test type.
 */ /**
 * @typedef {(
 *   BuildVisitorFromDescendants<
 *     InclusiveDescendant<Tree>,
 *     Check
 *   >
 * )} BuildVisitor
 *   Build a typed `Visitor` function from a tree and a test.
 *
 *   It will infer which values are passed as `node` and which as `parent`.
 * @template {UnistNode} [Tree=UnistNode]
 *   Node type.
 * @template {Test} [Check=Test]
 *   Test type.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/unist-util-visit/node_modules/unist-util-visit-parents/lib/index.js [app-rsc] (ecmascript)");
;
;
function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
    /** @type {boolean | null | undefined} */ let reverse;
    /** @type {Test} */ let test;
    /** @type {Visitor} */ let visitor;
    if (typeof testOrVisitor === 'function' && typeof visitorOrReverse !== 'function') {
        test = undefined;
        visitor = testOrVisitor;
        reverse = visitorOrReverse;
    } else {
        // @ts-expect-error: assume the overload with test was given.
        test = testOrVisitor;
        // @ts-expect-error: assume the overload with test was given.
        visitor = visitorOrReverse;
        reverse = maybeReverse;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$2f$node_modules$2f$unist$2d$util$2d$visit$2d$parents$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["visitParents"])(tree, test, overload, reverse);
    /**
   * @param {UnistNode} node
   * @param {Array<UnistParent>} parents
   */ function overload(node, parents) {
        const parent = parents[parents.length - 1];
        const index = parent ? parent.children.indexOf(node) : undefined;
        return visitor(node, index, parent);
    }
}
}),
"[project]/node_modules/rehype-highlight/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rehypeHighlight
]);
/**
 * @import {ElementContent, Element, Root} from 'hast'
 * @import {LanguageFn} from 'lowlight'
 * @import {VFile} from 'vfile'
 */ /**
 * @typedef Options
 *   Configuration (optional).
 * @property {Readonly<Record<string, ReadonlyArray<string> | string>> | null | undefined} [aliases={}]
 *   Register more aliases (optional);
 *   passed to `lowlight.registerAlias`.
 * @property {boolean | null | undefined} [detect=false]
 *   Highlight code without language classes by guessing its programming
 *   language (default: `false`).
 * @property {Readonly<Record<string, LanguageFn>> | null | undefined} [languages]
 *   Register languages (default: `common`);
 *   passed to `lowlight.register`.
 * @property {ReadonlyArray<string> | null | undefined} [plainText=[]]
 *   List of language names to not highlight (optional);
 *   note you can also add `no-highlight` classes.
 * @property {string | null | undefined} [prefix='hljs-']
 *   Class prefix (default: `'hljs-'`).
 * @property {ReadonlyArray<string> | null | undefined} [subset]
 *   Names of languages to check when detecting (default: all registered
 *   languages).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$text$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/hast-util-to-text/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lowlight$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__grammars__as__common$3e$__ = __turbopack_context__.i("[project]/node_modules/lowlight/lib/common.js [app-rsc] (ecmascript) <export grammars as common>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lowlight$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lowlight/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/unist-util-visit/lib/index.js [app-rsc] (ecmascript) <locals>");
;
;
;
/** @type {Options} */ const emptyOptions = {};
function rehypeHighlight(options) {
    const settings = options || emptyOptions;
    const aliases = settings.aliases;
    const detect = settings.detect || false;
    const languages = settings.languages || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lowlight$2f$lib$2f$common$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__grammars__as__common$3e$__["common"];
    const plainText = settings.plainText;
    const prefix = settings.prefix;
    const subset = settings.subset;
    let name = 'hljs';
    const lowlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lowlight$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createLowlight"])(languages);
    if (aliases) {
        lowlight.registerAlias(aliases);
    }
    if (prefix) {
        const pos = prefix.indexOf('-');
        name = pos === -1 ? prefix : prefix.slice(0, pos);
    }
    /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */ return function(tree, file) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$unist$2d$util$2d$visit$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["visit"])(tree, 'element', function(node, _, parent) {
            if (node.tagName !== 'code' || !parent || parent.type !== 'element' || parent.tagName !== 'pre') {
                return;
            }
            const lang = language(node);
            if (lang === false || !lang && !detect || lang && plainText && plainText.includes(lang)) {
                return;
            }
            if (!Array.isArray(node.properties.className)) {
                node.properties.className = [];
            }
            if (!node.properties.className.includes(name)) {
                node.properties.className.unshift(name);
            }
            const text = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$hast$2d$util$2d$to$2d$text$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toText"])(node, {
                whitespace: 'pre'
            });
            /** @type {Root} */ let result;
            try {
                result = lang ? lowlight.highlight(lang, text, {
                    prefix
                }) : lowlight.highlightAuto(text, {
                    prefix,
                    subset
                });
            } catch (error) {
                const cause = error;
                if (lang && /Unknown language/.test(cause.message)) {
                    file.message('Cannot highlight as `' + lang + '`, it’s not registered', {
                        ancestors: [
                            parent,
                            node
                        ],
                        cause,
                        place: node.position,
                        ruleId: 'missing-language',
                        source: 'rehype-highlight'
                    });
                    /* c8 ignore next 5 -- throw arbitrary hljs errors */ return;
                }
                throw cause;
            }
            if (!lang && result.data && result.data.language) {
                node.properties.className.push('language-' + result.data.language);
            }
            if (result.children.length > 0) {
                node.children = result.children;
            }
        });
    };
}
/**
 * Get the programming language of `node`.
 *
 * @param {Element} node
 *   Node.
 * @returns {false | string | undefined}
 *   Language or `undefined`, or `false` when an explikcit `no-highlight` class
 *   is used.
 */ function language(node) {
    const list = node.properties.className;
    let index = -1;
    if (!Array.isArray(list)) {
        return;
    }
    /** @type {string | undefined} */ let name;
    while(++index < list.length){
        const value = String(list[index]);
        if (value === 'no-highlight' || value === 'nohighlight') {
            return false;
        }
        if (!name && value.slice(0, 5) === 'lang-') {
            name = value.slice(5);
        }
        if (!name && value.slice(0, 9) === 'language-') {
            name = value.slice(9);
        }
    }
    return name;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ffb916fd._.js.map