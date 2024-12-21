/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./extract.js":
/*!********************!*\
  !*** ./extract.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   splitIntoLines: () => (/* binding */ splitIntoLines)
/* harmony export */ });
function addWordOntoLine(line, word) {
    if (line.length != 0) {
        line += " ";
    }
    return(line += word);
}

function splitIntoLines(input, len) {
    var i;
    var output = [];
    var lineSoFar = "";
    var temp;
    var words = input.split(' ');
    for (i = 0; i < words.length;) {
        // check if adding this word would exceed the len
        temp = addWordOntoLine(lineSoFar, words[i]);
        if (temp.length > len) {
            if (lineSoFar.length == 0) {
                lineSoFar = temp;     // force to put at least one word in each line
                i++;                  // skip past this word now
            }
            output.push(lineSoFar);   // put line into output
            lineSoFar = "";           // init back to empty
        } else {
            lineSoFar = temp;         // take the new word
            i++;                      // skip past this word now
        }
    }
    if (lineSoFar.length > 0) {
        output.push(lineSoFar);
    }
    return(output);
}

/***/ }),

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return Object.propertyIsEnumerable.call(target, symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./node_modules/dom-serializer/lib/foreignNames.js":
/*!*********************************************************!*\
  !*** ./node_modules/dom-serializer/lib/foreignNames.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.attributeNames = exports.elementNames = void 0;
exports.elementNames = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath",
].map(function (val) { return [val.toLowerCase(), val]; }));
exports.attributeNames = new Map([
    "definitionURL",
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan",
].map(function (val) { return [val.toLowerCase(), val]; }));


/***/ }),

/***/ "./node_modules/dom-serializer/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-serializer/lib/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.render = void 0;
/*
 * Module dependencies
 */
var ElementType = __importStar(__webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js"));
var entities_1 = __webpack_require__(/*! entities */ "./node_modules/entities/lib/index.js");
/**
 * Mixed-case SVG and MathML tags & attributes
 * recognized by the HTML parser.
 *
 * @see https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
 */
var foreignNames_js_1 = __webpack_require__(/*! ./foreignNames.js */ "./node_modules/dom-serializer/lib/foreignNames.js");
var unencodedElements = new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript",
]);
function replaceQuotes(value) {
    return value.replace(/"/g, "&quot;");
}
/**
 * Format attributes
 */
function formatAttributes(attributes, opts) {
    var _a;
    if (!attributes)
        return;
    var encode = ((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) === false
        ? replaceQuotes
        : opts.xmlMode || opts.encodeEntities !== "utf8"
            ? entities_1.encodeXML
            : entities_1.escapeAttribute;
    return Object.keys(attributes)
        .map(function (key) {
        var _a, _b;
        var value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
        if (opts.xmlMode === "foreign") {
            /* Fix up mixed-case attribute names */
            key = (_b = foreignNames_js_1.attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
        }
        if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
            return key;
        }
        return "".concat(key, "=\"").concat(encode(value), "\"");
    })
        .join(" ");
}
/**
 * Self-enclosing tags
 */
var singleTag = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
/**
 * Renders a DOM node or an array of DOM nodes to a string.
 *
 * Can be thought of as the equivalent of the `outerHTML` of the passed node(s).
 *
 * @param node Node to be rendered.
 * @param options Changes serialization behavior
 */
function render(node, options) {
    if (options === void 0) { options = {}; }
    var nodes = "length" in node ? node : [node];
    var output = "";
    for (var i = 0; i < nodes.length; i++) {
        output += renderNode(nodes[i], options);
    }
    return output;
}
exports.render = render;
exports["default"] = render;
function renderNode(node, options) {
    switch (node.type) {
        case ElementType.Root:
            return render(node.children, options);
        // @ts-expect-error We don't use `Doctype` yet
        case ElementType.Doctype:
        case ElementType.Directive:
            return renderDirective(node);
        case ElementType.Comment:
            return renderComment(node);
        case ElementType.CDATA:
            return renderCdata(node);
        case ElementType.Script:
        case ElementType.Style:
        case ElementType.Tag:
            return renderTag(node, options);
        case ElementType.Text:
            return renderText(node, options);
    }
}
var foreignModeIntegrationPoints = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title",
]);
var foreignElements = new Set(["svg", "math"]);
function renderTag(elem, opts) {
    var _a;
    // Handle SVG / MathML in HTML
    if (opts.xmlMode === "foreign") {
        /* Fix up mixed-case element names */
        elem.name = (_a = foreignNames_js_1.elementNames.get(elem.name)) !== null && _a !== void 0 ? _a : elem.name;
        /* Exit foreign mode at integration points */
        if (elem.parent &&
            foreignModeIntegrationPoints.has(elem.parent.name)) {
            opts = __assign(__assign({}, opts), { xmlMode: false });
        }
    }
    if (!opts.xmlMode && foreignElements.has(elem.name)) {
        opts = __assign(__assign({}, opts), { xmlMode: "foreign" });
    }
    var tag = "<".concat(elem.name);
    var attribs = formatAttributes(elem.attribs, opts);
    if (attribs) {
        tag += " ".concat(attribs);
    }
    if (elem.children.length === 0 &&
        (opts.xmlMode
            ? // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
                opts.selfClosingTags !== false
            : // User explicitly asked for self-closing tags, even in HTML mode
                opts.selfClosingTags && singleTag.has(elem.name))) {
        if (!opts.xmlMode)
            tag += " ";
        tag += "/>";
    }
    else {
        tag += ">";
        if (elem.children.length > 0) {
            tag += render(elem.children, opts);
        }
        if (opts.xmlMode || !singleTag.has(elem.name)) {
            tag += "</".concat(elem.name, ">");
        }
    }
    return tag;
}
function renderDirective(elem) {
    return "<".concat(elem.data, ">");
}
function renderText(elem, opts) {
    var _a;
    var data = elem.data || "";
    // If entities weren't decoded, no need to encode them back
    if (((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) !== false &&
        !(!opts.xmlMode &&
            elem.parent &&
            unencodedElements.has(elem.parent.name))) {
        data =
            opts.xmlMode || opts.encodeEntities !== "utf8"
                ? (0, entities_1.encodeXML)(data)
                : (0, entities_1.escapeText)(data);
    }
    return data;
}
function renderCdata(elem) {
    return "<![CDATA[".concat(elem.children[0].data, "]]>");
}
function renderComment(elem) {
    return "<!--".concat(elem.data, "-->");
}


/***/ }),

/***/ "./node_modules/domelementtype/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/domelementtype/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
/** Types of elements found in htmlparser2's DOM */
var ElementType;
(function (ElementType) {
    /** Type for the root element of a document */
    ElementType["Root"] = "root";
    /** Type for Text */
    ElementType["Text"] = "text";
    /** Type for <? ... ?> */
    ElementType["Directive"] = "directive";
    /** Type for <!-- ... --> */
    ElementType["Comment"] = "comment";
    /** Type for <script> tags */
    ElementType["Script"] = "script";
    /** Type for <style> tags */
    ElementType["Style"] = "style";
    /** Type for Any tag */
    ElementType["Tag"] = "tag";
    /** Type for <![CDATA[ ... ]]> */
    ElementType["CDATA"] = "cdata";
    /** Type for <!doctype ...> */
    ElementType["Doctype"] = "doctype";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */
function isTag(elem) {
    return (elem.type === ElementType.Tag ||
        elem.type === ElementType.Script ||
        elem.type === ElementType.Style);
}
exports.isTag = isTag;
// Exports for backwards compatibility
/** Type for the root element of a document */
exports.Root = ElementType.Root;
/** Type for Text */
exports.Text = ElementType.Text;
/** Type for <? ... ?> */
exports.Directive = ElementType.Directive;
/** Type for <!-- ... --> */
exports.Comment = ElementType.Comment;
/** Type for <script> tags */
exports.Script = ElementType.Script;
/** Type for <style> tags */
exports.Style = ElementType.Style;
/** Type for Any tag */
exports.Tag = ElementType.Tag;
/** Type for <![CDATA[ ... ]]> */
exports.CDATA = ElementType.CDATA;
/** Type for <!doctype ...> */
exports.Doctype = ElementType.Doctype;


/***/ }),

/***/ "./node_modules/domhandler/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/domhandler/lib/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomHandler = void 0;
var domelementtype_1 = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js");
var node_js_1 = __webpack_require__(/*! ./node.js */ "./node_modules/domhandler/lib/node.js");
__exportStar(__webpack_require__(/*! ./node.js */ "./node_modules/domhandler/lib/node.js"), exports);
// Default options
var defaultOpts = {
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false,
};
var DomHandler = /** @class */ (function () {
    /**
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */
    function DomHandler(callback, options, elementCB) {
        /** The elements of the DOM */
        this.dom = [];
        /** The root element for the DOM */
        this.root = new node_js_1.Document(this.dom);
        /** Indicated whether parsing has been completed. */
        this.done = false;
        /** Stack of open tags. */
        this.tagStack = [this.root];
        /** A data node that is still being written to. */
        this.lastNode = null;
        /** Reference to the parser instance. Used for location information. */
        this.parser = null;
        // Make it possible to skip arguments, for backwards-compatibility
        if (typeof options === "function") {
            elementCB = options;
            options = defaultOpts;
        }
        if (typeof callback === "object") {
            options = callback;
            callback = undefined;
        }
        this.callback = callback !== null && callback !== void 0 ? callback : null;
        this.options = options !== null && options !== void 0 ? options : defaultOpts;
        this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
    }
    DomHandler.prototype.onparserinit = function (parser) {
        this.parser = parser;
    };
    // Resets the handler back to starting state
    DomHandler.prototype.onreset = function () {
        this.dom = [];
        this.root = new node_js_1.Document(this.dom);
        this.done = false;
        this.tagStack = [this.root];
        this.lastNode = null;
        this.parser = null;
    };
    // Signals the handler that parsing is done
    DomHandler.prototype.onend = function () {
        if (this.done)
            return;
        this.done = true;
        this.parser = null;
        this.handleCallback(null);
    };
    DomHandler.prototype.onerror = function (error) {
        this.handleCallback(error);
    };
    DomHandler.prototype.onclosetag = function () {
        this.lastNode = null;
        var elem = this.tagStack.pop();
        if (this.options.withEndIndices) {
            elem.endIndex = this.parser.endIndex;
        }
        if (this.elementCB)
            this.elementCB(elem);
    };
    DomHandler.prototype.onopentag = function (name, attribs) {
        var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : undefined;
        var element = new node_js_1.Element(name, attribs, undefined, type);
        this.addNode(element);
        this.tagStack.push(element);
    };
    DomHandler.prototype.ontext = function (data) {
        var lastNode = this.lastNode;
        if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
            lastNode.data += data;
            if (this.options.withEndIndices) {
                lastNode.endIndex = this.parser.endIndex;
            }
        }
        else {
            var node = new node_js_1.Text(data);
            this.addNode(node);
            this.lastNode = node;
        }
    };
    DomHandler.prototype.oncomment = function (data) {
        if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
            this.lastNode.data += data;
            return;
        }
        var node = new node_js_1.Comment(data);
        this.addNode(node);
        this.lastNode = node;
    };
    DomHandler.prototype.oncommentend = function () {
        this.lastNode = null;
    };
    DomHandler.prototype.oncdatastart = function () {
        var text = new node_js_1.Text("");
        var node = new node_js_1.CDATA([text]);
        this.addNode(node);
        text.parent = node;
        this.lastNode = text;
    };
    DomHandler.prototype.oncdataend = function () {
        this.lastNode = null;
    };
    DomHandler.prototype.onprocessinginstruction = function (name, data) {
        var node = new node_js_1.ProcessingInstruction(name, data);
        this.addNode(node);
    };
    DomHandler.prototype.handleCallback = function (error) {
        if (typeof this.callback === "function") {
            this.callback(error, this.dom);
        }
        else if (error) {
            throw error;
        }
    };
    DomHandler.prototype.addNode = function (node) {
        var parent = this.tagStack[this.tagStack.length - 1];
        var previousSibling = parent.children[parent.children.length - 1];
        if (this.options.withStartIndices) {
            node.startIndex = this.parser.startIndex;
        }
        if (this.options.withEndIndices) {
            node.endIndex = this.parser.endIndex;
        }
        parent.children.push(node);
        if (previousSibling) {
            node.prev = previousSibling;
            previousSibling.next = node;
        }
        node.parent = parent;
        this.lastNode = null;
    };
    return DomHandler;
}());
exports.DomHandler = DomHandler;
exports["default"] = DomHandler;


/***/ }),

/***/ "./node_modules/domhandler/lib/node.js":
/*!*********************************************!*\
  !*** ./node_modules/domhandler/lib/node.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloneNode = exports.hasChildren = exports.isDocument = exports.isDirective = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = exports.Element = exports.Document = exports.CDATA = exports.NodeWithChildren = exports.ProcessingInstruction = exports.Comment = exports.Text = exports.DataNode = exports.Node = void 0;
var domelementtype_1 = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js");
/**
 * This object will be used as the prototype for Nodes when creating a
 * DOM-Level-1-compliant structure.
 */
var Node = /** @class */ (function () {
    function Node() {
        /** Parent of the node */
        this.parent = null;
        /** Previous sibling */
        this.prev = null;
        /** Next sibling */
        this.next = null;
        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
        this.startIndex = null;
        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
        this.endIndex = null;
    }
    Object.defineProperty(Node.prototype, "parentNode", {
        // Read-write aliases for properties
        /**
         * Same as {@link parent}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.parent;
        },
        set: function (parent) {
            this.parent = parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "previousSibling", {
        /**
         * Same as {@link prev}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.prev;
        },
        set: function (prev) {
            this.prev = prev;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "nextSibling", {
        /**
         * Same as {@link next}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.next;
        },
        set: function (next) {
            this.next = next;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Clone this node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */
    Node.prototype.cloneNode = function (recursive) {
        if (recursive === void 0) { recursive = false; }
        return cloneNode(this, recursive);
    };
    return Node;
}());
exports.Node = Node;
/**
 * A node that contains some data.
 */
var DataNode = /** @class */ (function (_super) {
    __extends(DataNode, _super);
    /**
     * @param data The content of the data node
     */
    function DataNode(data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        return _this;
    }
    Object.defineProperty(DataNode.prototype, "nodeValue", {
        /**
         * Same as {@link data}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.data;
        },
        set: function (data) {
            this.data = data;
        },
        enumerable: false,
        configurable: true
    });
    return DataNode;
}(Node));
exports.DataNode = DataNode;
/**
 * Text within the document.
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = domelementtype_1.ElementType.Text;
        return _this;
    }
    Object.defineProperty(Text.prototype, "nodeType", {
        get: function () {
            return 3;
        },
        enumerable: false,
        configurable: true
    });
    return Text;
}(DataNode));
exports.Text = Text;
/**
 * Comments within the document.
 */
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = domelementtype_1.ElementType.Comment;
        return _this;
    }
    Object.defineProperty(Comment.prototype, "nodeType", {
        get: function () {
            return 8;
        },
        enumerable: false,
        configurable: true
    });
    return Comment;
}(DataNode));
exports.Comment = Comment;
/**
 * Processing instructions, including doc types.
 */
var ProcessingInstruction = /** @class */ (function (_super) {
    __extends(ProcessingInstruction, _super);
    function ProcessingInstruction(name, data) {
        var _this = _super.call(this, data) || this;
        _this.name = name;
        _this.type = domelementtype_1.ElementType.Directive;
        return _this;
    }
    Object.defineProperty(ProcessingInstruction.prototype, "nodeType", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return ProcessingInstruction;
}(DataNode));
exports.ProcessingInstruction = ProcessingInstruction;
/**
 * A `Node` that can have children.
 */
var NodeWithChildren = /** @class */ (function (_super) {
    __extends(NodeWithChildren, _super);
    /**
     * @param children Children of the node. Only certain node types can have children.
     */
    function NodeWithChildren(children) {
        var _this = _super.call(this) || this;
        _this.children = children;
        return _this;
    }
    Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
        // Aliases
        /** First child of the node. */
        get: function () {
            var _a;
            return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
        /** Last child of the node. */
        get: function () {
            return this.children.length > 0
                ? this.children[this.children.length - 1]
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
        /**
         * Same as {@link children}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.children;
        },
        set: function (children) {
            this.children = children;
        },
        enumerable: false,
        configurable: true
    });
    return NodeWithChildren;
}(Node));
exports.NodeWithChildren = NodeWithChildren;
var CDATA = /** @class */ (function (_super) {
    __extends(CDATA, _super);
    function CDATA() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = domelementtype_1.ElementType.CDATA;
        return _this;
    }
    Object.defineProperty(CDATA.prototype, "nodeType", {
        get: function () {
            return 4;
        },
        enumerable: false,
        configurable: true
    });
    return CDATA;
}(NodeWithChildren));
exports.CDATA = CDATA;
/**
 * The root node of the document.
 */
var Document = /** @class */ (function (_super) {
    __extends(Document, _super);
    function Document() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = domelementtype_1.ElementType.Root;
        return _this;
    }
    Object.defineProperty(Document.prototype, "nodeType", {
        get: function () {
            return 9;
        },
        enumerable: false,
        configurable: true
    });
    return Document;
}(NodeWithChildren));
exports.Document = Document;
/**
 * An element within the DOM.
 */
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    /**
     * @param name Name of the tag, eg. `div`, `span`.
     * @param attribs Object mapping attribute names to attribute values.
     * @param children Children of the node.
     */
    function Element(name, attribs, children, type) {
        if (children === void 0) { children = []; }
        if (type === void 0) { type = name === "script"
            ? domelementtype_1.ElementType.Script
            : name === "style"
                ? domelementtype_1.ElementType.Style
                : domelementtype_1.ElementType.Tag; }
        var _this = _super.call(this, children) || this;
        _this.name = name;
        _this.attribs = attribs;
        _this.type = type;
        return _this;
    }
    Object.defineProperty(Element.prototype, "nodeType", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "tagName", {
        // DOM Level 1 aliases
        /**
         * Same as {@link name}.
         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
         */
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Element.prototype, "attributes", {
        get: function () {
            var _this = this;
            return Object.keys(this.attribs).map(function (name) {
                var _a, _b;
                return ({
                    name: name,
                    value: _this.attribs[name],
                    namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
                    prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    return Element;
}(NodeWithChildren));
exports.Element = Element;
/**
 * @param node Node to check.
 * @returns `true` if the node is a `Element`, `false` otherwise.
 */
function isTag(node) {
    return (0, domelementtype_1.isTag)(node);
}
exports.isTag = isTag;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
 */
function isCDATA(node) {
    return node.type === domelementtype_1.ElementType.CDATA;
}
exports.isCDATA = isCDATA;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Text`, `false` otherwise.
 */
function isText(node) {
    return node.type === domelementtype_1.ElementType.Text;
}
exports.isText = isText;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `Comment`, `false` otherwise.
 */
function isComment(node) {
    return node.type === domelementtype_1.ElementType.Comment;
}
exports.isComment = isComment;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */
function isDirective(node) {
    return node.type === domelementtype_1.ElementType.Directive;
}
exports.isDirective = isDirective;
/**
 * @param node Node to check.
 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
 */
function isDocument(node) {
    return node.type === domelementtype_1.ElementType.Root;
}
exports.isDocument = isDocument;
/**
 * @param node Node to check.
 * @returns `true` if the node has children, `false` otherwise.
 */
function hasChildren(node) {
    return Object.prototype.hasOwnProperty.call(node, "children");
}
exports.hasChildren = hasChildren;
/**
 * Clone a node, and optionally its children.
 *
 * @param recursive Clone child nodes as well.
 * @returns A clone of the node.
 */
function cloneNode(node, recursive) {
    if (recursive === void 0) { recursive = false; }
    var result;
    if (isText(node)) {
        result = new Text(node.data);
    }
    else if (isComment(node)) {
        result = new Comment(node.data);
    }
    else if (isTag(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_1 = new Element(node.name, __assign({}, node.attribs), children);
        children.forEach(function (child) { return (child.parent = clone_1); });
        if (node.namespace != null) {
            clone_1.namespace = node.namespace;
        }
        if (node["x-attribsNamespace"]) {
            clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
        }
        if (node["x-attribsPrefix"]) {
            clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
        }
        result = clone_1;
    }
    else if (isCDATA(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_2 = new CDATA(children);
        children.forEach(function (child) { return (child.parent = clone_2); });
        result = clone_2;
    }
    else if (isDocument(node)) {
        var children = recursive ? cloneChildren(node.children) : [];
        var clone_3 = new Document(children);
        children.forEach(function (child) { return (child.parent = clone_3); });
        if (node["x-mode"]) {
            clone_3["x-mode"] = node["x-mode"];
        }
        result = clone_3;
    }
    else if (isDirective(node)) {
        var instruction = new ProcessingInstruction(node.name, node.data);
        if (node["x-name"] != null) {
            instruction["x-name"] = node["x-name"];
            instruction["x-publicId"] = node["x-publicId"];
            instruction["x-systemId"] = node["x-systemId"];
        }
        result = instruction;
    }
    else {
        throw new Error("Not implemented yet: ".concat(node.type));
    }
    result.startIndex = node.startIndex;
    result.endIndex = node.endIndex;
    if (node.sourceCodeLocation != null) {
        result.sourceCodeLocation = node.sourceCodeLocation;
    }
    return result;
}
exports.cloneNode = cloneNode;
function cloneChildren(childs) {
    var children = childs.map(function (child) { return cloneNode(child, true); });
    for (var i = 1; i < children.length; i++) {
        children[i].prev = children[i - 1];
        children[i - 1].next = children[i];
    }
    return children;
}


/***/ }),

/***/ "./node_modules/domutils/lib/feeds.js":
/*!********************************************!*\
  !*** ./node_modules/domutils/lib/feeds.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFeed = void 0;
var stringify_js_1 = __webpack_require__(/*! ./stringify.js */ "./node_modules/domutils/lib/stringify.js");
var legacy_js_1 = __webpack_require__(/*! ./legacy.js */ "./node_modules/domutils/lib/legacy.js");
/**
 * Get the feed object from the root of a DOM tree.
 *
 * @category Feeds
 * @param doc - The DOM to to extract the feed from.
 * @returns The feed.
 */
function getFeed(doc) {
    var feedRoot = getOneElement(isValidFeed, doc);
    return !feedRoot
        ? null
        : feedRoot.name === "feed"
            ? getAtomFeed(feedRoot)
            : getRssFeed(feedRoot);
}
exports.getFeed = getFeed;
/**
 * Parse an Atom feed.
 *
 * @param feedRoot The root of the feed.
 * @returns The parsed feed.
 */
function getAtomFeed(feedRoot) {
    var _a;
    var childs = feedRoot.children;
    var feed = {
        type: "atom",
        items: (0, legacy_js_1.getElementsByTagName)("entry", childs).map(function (item) {
            var _a;
            var children = item.children;
            var entry = { media: getMediaElements(children) };
            addConditionally(entry, "id", "id", children);
            addConditionally(entry, "title", "title", children);
            var href = (_a = getOneElement("link", children)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
            if (href) {
                entry.link = href;
            }
            var description = fetch("summary", children) || fetch("content", children);
            if (description) {
                entry.description = description;
            }
            var pubDate = fetch("updated", children);
            if (pubDate) {
                entry.pubDate = new Date(pubDate);
            }
            return entry;
        }),
    };
    addConditionally(feed, "id", "id", childs);
    addConditionally(feed, "title", "title", childs);
    var href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
    if (href) {
        feed.link = href;
    }
    addConditionally(feed, "description", "subtitle", childs);
    var updated = fetch("updated", childs);
    if (updated) {
        feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "email", childs, true);
    return feed;
}
/**
 * Parse a RSS feed.
 *
 * @param feedRoot The root of the feed.
 * @returns The parsed feed.
 */
function getRssFeed(feedRoot) {
    var _a, _b;
    var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
    var feed = {
        type: feedRoot.name.substr(0, 3),
        id: "",
        items: (0, legacy_js_1.getElementsByTagName)("item", feedRoot.children).map(function (item) {
            var children = item.children;
            var entry = { media: getMediaElements(children) };
            addConditionally(entry, "id", "guid", children);
            addConditionally(entry, "title", "title", children);
            addConditionally(entry, "link", "link", children);
            addConditionally(entry, "description", "description", children);
            var pubDate = fetch("pubDate", children) || fetch("dc:date", children);
            if (pubDate)
                entry.pubDate = new Date(pubDate);
            return entry;
        }),
    };
    addConditionally(feed, "title", "title", childs);
    addConditionally(feed, "link", "link", childs);
    addConditionally(feed, "description", "description", childs);
    var updated = fetch("lastBuildDate", childs);
    if (updated) {
        feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "managingEditor", childs, true);
    return feed;
}
var MEDIA_KEYS_STRING = ["url", "type", "lang"];
var MEDIA_KEYS_INT = [
    "fileSize",
    "bitrate",
    "framerate",
    "samplingrate",
    "channels",
    "duration",
    "height",
    "width",
];
/**
 * Get all media elements of a feed item.
 *
 * @param where Nodes to search in.
 * @returns Media elements.
 */
function getMediaElements(where) {
    return (0, legacy_js_1.getElementsByTagName)("media:content", where).map(function (elem) {
        var attribs = elem.attribs;
        var media = {
            medium: attribs["medium"],
            isDefault: !!attribs["isDefault"],
        };
        for (var _i = 0, MEDIA_KEYS_STRING_1 = MEDIA_KEYS_STRING; _i < MEDIA_KEYS_STRING_1.length; _i++) {
            var attrib = MEDIA_KEYS_STRING_1[_i];
            if (attribs[attrib]) {
                media[attrib] = attribs[attrib];
            }
        }
        for (var _a = 0, MEDIA_KEYS_INT_1 = MEDIA_KEYS_INT; _a < MEDIA_KEYS_INT_1.length; _a++) {
            var attrib = MEDIA_KEYS_INT_1[_a];
            if (attribs[attrib]) {
                media[attrib] = parseInt(attribs[attrib], 10);
            }
        }
        if (attribs["expression"]) {
            media.expression = attribs["expression"];
        }
        return media;
    });
}
/**
 * Get one element by tag name.
 *
 * @param tagName Tag name to look for
 * @param node Node to search in
 * @returns The element or null
 */
function getOneElement(tagName, node) {
    return (0, legacy_js_1.getElementsByTagName)(tagName, node, true, 1)[0];
}
/**
 * Get the text content of an element with a certain tag name.
 *
 * @param tagName Tag name to look for.
 * @param where Node to search in.
 * @param recurse Whether to recurse into child nodes.
 * @returns The text content of the element.
 */
function fetch(tagName, where, recurse) {
    if (recurse === void 0) { recurse = false; }
    return (0, stringify_js_1.textContent)((0, legacy_js_1.getElementsByTagName)(tagName, where, recurse, 1)).trim();
}
/**
 * Adds a property to an object if it has a value.
 *
 * @param obj Object to be extended
 * @param prop Property name
 * @param tagName Tag name that contains the conditionally added property
 * @param where Element to search for the property
 * @param recurse Whether to recurse into child nodes.
 */
function addConditionally(obj, prop, tagName, where, recurse) {
    if (recurse === void 0) { recurse = false; }
    var val = fetch(tagName, where, recurse);
    if (val)
        obj[prop] = val;
}
/**
 * Checks if an element is a feed root node.
 *
 * @param value The name of the element to check.
 * @returns Whether an element is a feed root node.
 */
function isValidFeed(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
}
//# sourceMappingURL=feeds.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/helpers.js":
/*!**********************************************!*\
  !*** ./node_modules/domutils/lib/helpers.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uniqueSort = exports.compareDocumentPosition = exports.DocumentPosition = exports.removeSubsets = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
/**
 * Given an array of nodes, remove any member that is contained by another
 * member.
 *
 * @category Helpers
 * @param nodes Nodes to filter.
 * @returns Remaining nodes that aren't contained by other nodes.
 */
function removeSubsets(nodes) {
    var idx = nodes.length;
    /*
     * Check if each node (or one of its ancestors) is already contained in the
     * array.
     */
    while (--idx >= 0) {
        var node = nodes[idx];
        /*
         * Remove the node if it is not unique.
         * We are going through the array from the end, so we only
         * have to check nodes that preceed the node under consideration in the array.
         */
        if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
            nodes.splice(idx, 1);
            continue;
        }
        for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
            if (nodes.includes(ancestor)) {
                nodes.splice(idx, 1);
                break;
            }
        }
    }
    return nodes;
}
exports.removeSubsets = removeSubsets;
/**
 * @category Helpers
 * @see {@link http://dom.spec.whatwg.org/#dom-node-comparedocumentposition}
 */
var DocumentPosition;
(function (DocumentPosition) {
    DocumentPosition[DocumentPosition["DISCONNECTED"] = 1] = "DISCONNECTED";
    DocumentPosition[DocumentPosition["PRECEDING"] = 2] = "PRECEDING";
    DocumentPosition[DocumentPosition["FOLLOWING"] = 4] = "FOLLOWING";
    DocumentPosition[DocumentPosition["CONTAINS"] = 8] = "CONTAINS";
    DocumentPosition[DocumentPosition["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition = exports.DocumentPosition || (exports.DocumentPosition = {}));
/**
 * Compare the position of one node against another node in any other document,
 * returning a bitmask with the values from {@link DocumentPosition}.
 *
 * Document order:
 * > There is an ordering, document order, defined on all the nodes in the
 * > document corresponding to the order in which the first character of the
 * > XML representation of each node occurs in the XML representation of the
 * > document after expansion of general entities. Thus, the document element
 * > node will be the first node. Element nodes occur before their children.
 * > Thus, document order orders element nodes in order of the occurrence of
 * > their start-tag in the XML (after expansion of entities). The attribute
 * > nodes of an element occur after the element and before its children. The
 * > relative order of attribute nodes is implementation-dependent.
 *
 * Source:
 * http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
 *
 * @category Helpers
 * @param nodeA The first node to use in the comparison
 * @param nodeB The second node to use in the comparison
 * @returns A bitmask describing the input nodes' relative position.
 *
 * See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
 * a description of these values.
 */
function compareDocumentPosition(nodeA, nodeB) {
    var aParents = [];
    var bParents = [];
    if (nodeA === nodeB) {
        return 0;
    }
    var current = (0, domhandler_1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
    while (current) {
        aParents.unshift(current);
        current = current.parent;
    }
    current = (0, domhandler_1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
    while (current) {
        bParents.unshift(current);
        current = current.parent;
    }
    var maxIdx = Math.min(aParents.length, bParents.length);
    var idx = 0;
    while (idx < maxIdx && aParents[idx] === bParents[idx]) {
        idx++;
    }
    if (idx === 0) {
        return DocumentPosition.DISCONNECTED;
    }
    var sharedParent = aParents[idx - 1];
    var siblings = sharedParent.children;
    var aSibling = aParents[idx];
    var bSibling = bParents[idx];
    if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
        if (sharedParent === nodeB) {
            return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
        }
        return DocumentPosition.FOLLOWING;
    }
    if (sharedParent === nodeA) {
        return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
    }
    return DocumentPosition.PRECEDING;
}
exports.compareDocumentPosition = compareDocumentPosition;
/**
 * Sort an array of nodes based on their relative position in the document,
 * removing any duplicate nodes. If the array contains nodes that do not belong
 * to the same document, sort order is unspecified.
 *
 * @category Helpers
 * @param nodes Array of DOM nodes.
 * @returns Collection of unique nodes, sorted in document order.
 */
function uniqueSort(nodes) {
    nodes = nodes.filter(function (node, i, arr) { return !arr.includes(node, i + 1); });
    nodes.sort(function (a, b) {
        var relative = compareDocumentPosition(a, b);
        if (relative & DocumentPosition.PRECEDING) {
            return -1;
        }
        else if (relative & DocumentPosition.FOLLOWING) {
            return 1;
        }
        return 0;
    });
    return nodes;
}
exports.uniqueSort = uniqueSort;
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/domutils/lib/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasChildren = exports.isDocument = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = void 0;
__exportStar(__webpack_require__(/*! ./stringify.js */ "./node_modules/domutils/lib/stringify.js"), exports);
__exportStar(__webpack_require__(/*! ./traversal.js */ "./node_modules/domutils/lib/traversal.js"), exports);
__exportStar(__webpack_require__(/*! ./manipulation.js */ "./node_modules/domutils/lib/manipulation.js"), exports);
__exportStar(__webpack_require__(/*! ./querying.js */ "./node_modules/domutils/lib/querying.js"), exports);
__exportStar(__webpack_require__(/*! ./legacy.js */ "./node_modules/domutils/lib/legacy.js"), exports);
__exportStar(__webpack_require__(/*! ./helpers.js */ "./node_modules/domutils/lib/helpers.js"), exports);
__exportStar(__webpack_require__(/*! ./feeds.js */ "./node_modules/domutils/lib/feeds.js"), exports);
/** @deprecated Use these methods from `domhandler` directly. */
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
Object.defineProperty(exports, "isTag", ({ enumerable: true, get: function () { return domhandler_1.isTag; } }));
Object.defineProperty(exports, "isCDATA", ({ enumerable: true, get: function () { return domhandler_1.isCDATA; } }));
Object.defineProperty(exports, "isText", ({ enumerable: true, get: function () { return domhandler_1.isText; } }));
Object.defineProperty(exports, "isComment", ({ enumerable: true, get: function () { return domhandler_1.isComment; } }));
Object.defineProperty(exports, "isDocument", ({ enumerable: true, get: function () { return domhandler_1.isDocument; } }));
Object.defineProperty(exports, "hasChildren", ({ enumerable: true, get: function () { return domhandler_1.hasChildren; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/legacy.js":
/*!*********************************************!*\
  !*** ./node_modules/domutils/lib/legacy.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getElementsByTagType = exports.getElementsByTagName = exports.getElementById = exports.getElements = exports.testElement = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
var querying_js_1 = __webpack_require__(/*! ./querying.js */ "./node_modules/domutils/lib/querying.js");
/**
 * A map of functions to check nodes against.
 */
var Checks = {
    tag_name: function (name) {
        if (typeof name === "function") {
            return function (elem) { return (0, domhandler_1.isTag)(elem) && name(elem.name); };
        }
        else if (name === "*") {
            return domhandler_1.isTag;
        }
        return function (elem) { return (0, domhandler_1.isTag)(elem) && elem.name === name; };
    },
    tag_type: function (type) {
        if (typeof type === "function") {
            return function (elem) { return type(elem.type); };
        }
        return function (elem) { return elem.type === type; };
    },
    tag_contains: function (data) {
        if (typeof data === "function") {
            return function (elem) { return (0, domhandler_1.isText)(elem) && data(elem.data); };
        }
        return function (elem) { return (0, domhandler_1.isText)(elem) && elem.data === data; };
    },
};
/**
 * Returns a function to check whether a node has an attribute with a particular
 * value.
 *
 * @param attrib Attribute to check.
 * @param value Attribute value to look for.
 * @returns A function to check whether the a node has an attribute with a
 *   particular value.
 */
function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
        return function (elem) { return (0, domhandler_1.isTag)(elem) && value(elem.attribs[attrib]); };
    }
    return function (elem) { return (0, domhandler_1.isTag)(elem) && elem.attribs[attrib] === value; };
}
/**
 * Returns a function that returns `true` if either of the input functions
 * returns `true` for a node.
 *
 * @param a First function to combine.
 * @param b Second function to combine.
 * @returns A function taking a node and returning `true` if either of the input
 *   functions returns `true` for the node.
 */
function combineFuncs(a, b) {
    return function (elem) { return a(elem) || b(elem); };
}
/**
 * Returns a function that executes all checks in `options` and returns `true`
 * if any of them match a node.
 *
 * @param options An object describing nodes to look for.
 * @returns A function that executes all checks in `options` and returns `true`
 *   if any of them match a node.
 */
function compileTest(options) {
    var funcs = Object.keys(options).map(function (key) {
        var value = options[key];
        return Object.prototype.hasOwnProperty.call(Checks, key)
            ? Checks[key](value)
            : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
/**
 * Checks whether a node matches the description in `options`.
 *
 * @category Legacy Query Functions
 * @param options An object describing nodes to look for.
 * @param node The element to test.
 * @returns Whether the element matches the description in `options`.
 */
function testElement(options, node) {
    var test = compileTest(options);
    return test ? test(node) : true;
}
exports.testElement = testElement;
/**
 * Returns all nodes that match `options`.
 *
 * @category Legacy Query Functions
 * @param options An object describing nodes to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes that match `options`.
 */
function getElements(options, nodes, recurse, limit) {
    if (limit === void 0) { limit = Infinity; }
    var test = compileTest(options);
    return test ? (0, querying_js_1.filter)(test, nodes, recurse, limit) : [];
}
exports.getElements = getElements;
/**
 * Returns the node with the supplied ID.
 *
 * @category Legacy Query Functions
 * @param id The unique ID attribute value to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @returns The node with the supplied ID.
 */
function getElementById(id, nodes, recurse) {
    if (recurse === void 0) { recurse = true; }
    if (!Array.isArray(nodes))
        nodes = [nodes];
    return (0, querying_js_1.findOne)(getAttribCheck("id", id), nodes, recurse);
}
exports.getElementById = getElementById;
/**
 * Returns all nodes with the supplied `tagName`.
 *
 * @category Legacy Query Functions
 * @param tagName Tag name to search for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes with the supplied `tagName`.
 */
function getElementsByTagName(tagName, nodes, recurse, limit) {
    if (recurse === void 0) { recurse = true; }
    if (limit === void 0) { limit = Infinity; }
    return (0, querying_js_1.filter)(Checks["tag_name"](tagName), nodes, recurse, limit);
}
exports.getElementsByTagName = getElementsByTagName;
/**
 * Returns all nodes with the supplied `type`.
 *
 * @category Legacy Query Functions
 * @param type Element type to look for.
 * @param nodes Nodes to search through.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes with the supplied `type`.
 */
function getElementsByTagType(type, nodes, recurse, limit) {
    if (recurse === void 0) { recurse = true; }
    if (limit === void 0) { limit = Infinity; }
    return (0, querying_js_1.filter)(Checks["tag_type"](type), nodes, recurse, limit);
}
exports.getElementsByTagType = getElementsByTagType;
//# sourceMappingURL=legacy.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/manipulation.js":
/*!***************************************************!*\
  !*** ./node_modules/domutils/lib/manipulation.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepend = exports.prependChild = exports.append = exports.appendChild = exports.replaceElement = exports.removeElement = void 0;
/**
 * Remove an element from the dom
 *
 * @category Manipulation
 * @param elem The element to be removed
 */
function removeElement(elem) {
    if (elem.prev)
        elem.prev.next = elem.next;
    if (elem.next)
        elem.next.prev = elem.prev;
    if (elem.parent) {
        var childs = elem.parent.children;
        var childsIndex = childs.lastIndexOf(elem);
        if (childsIndex >= 0) {
            childs.splice(childsIndex, 1);
        }
    }
    elem.next = null;
    elem.prev = null;
    elem.parent = null;
}
exports.removeElement = removeElement;
/**
 * Replace an element in the dom
 *
 * @category Manipulation
 * @param elem The element to be replaced
 * @param replacement The element to be added
 */
function replaceElement(elem, replacement) {
    var prev = (replacement.prev = elem.prev);
    if (prev) {
        prev.next = replacement;
    }
    var next = (replacement.next = elem.next);
    if (next) {
        next.prev = replacement;
    }
    var parent = (replacement.parent = elem.parent);
    if (parent) {
        var childs = parent.children;
        childs[childs.lastIndexOf(elem)] = replacement;
        elem.parent = null;
    }
}
exports.replaceElement = replaceElement;
/**
 * Append a child to an element.
 *
 * @category Manipulation
 * @param parent The element to append to.
 * @param child The element to be added as a child.
 */
function appendChild(parent, child) {
    removeElement(child);
    child.next = null;
    child.parent = parent;
    if (parent.children.push(child) > 1) {
        var sibling = parent.children[parent.children.length - 2];
        sibling.next = child;
        child.prev = sibling;
    }
    else {
        child.prev = null;
    }
}
exports.appendChild = appendChild;
/**
 * Append an element after another.
 *
 * @category Manipulation
 * @param elem The element to append after.
 * @param next The element be added.
 */
function append(elem, next) {
    removeElement(next);
    var parent = elem.parent;
    var currNext = elem.next;
    next.next = currNext;
    next.prev = elem;
    elem.next = next;
    next.parent = parent;
    if (currNext) {
        currNext.prev = next;
        if (parent) {
            var childs = parent.children;
            childs.splice(childs.lastIndexOf(currNext), 0, next);
        }
    }
    else if (parent) {
        parent.children.push(next);
    }
}
exports.append = append;
/**
 * Prepend a child to an element.
 *
 * @category Manipulation
 * @param parent The element to prepend before.
 * @param child The element to be added as a child.
 */
function prependChild(parent, child) {
    removeElement(child);
    child.parent = parent;
    child.prev = null;
    if (parent.children.unshift(child) !== 1) {
        var sibling = parent.children[1];
        sibling.prev = child;
        child.next = sibling;
    }
    else {
        child.next = null;
    }
}
exports.prependChild = prependChild;
/**
 * Prepend an element before another.
 *
 * @category Manipulation
 * @param elem The element to prepend before.
 * @param prev The element be added.
 */
function prepend(elem, prev) {
    removeElement(prev);
    var parent = elem.parent;
    if (parent) {
        var childs = parent.children;
        childs.splice(childs.indexOf(elem), 0, prev);
    }
    if (elem.prev) {
        elem.prev.next = prev;
    }
    prev.parent = parent;
    prev.prev = elem.prev;
    prev.next = elem;
    elem.prev = prev;
}
exports.prepend = prepend;
//# sourceMappingURL=manipulation.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/querying.js":
/*!***********************************************!*\
  !*** ./node_modules/domutils/lib/querying.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findAll = exports.existsOne = exports.findOne = exports.findOneChild = exports.find = exports.filter = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
/**
 * Search a node and its children for nodes passing a test function. If `node` is not an array, it will be wrapped in one.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param node Node to search. Will be included in the result set if it matches.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes passing `test`.
 */
function filter(test, node, recurse, limit) {
    if (recurse === void 0) { recurse = true; }
    if (limit === void 0) { limit = Infinity; }
    return find(test, Array.isArray(node) ? node : [node], recurse, limit);
}
exports.filter = filter;
/**
 * Search an array of nodes and their children for nodes passing a test function.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @param recurse Also consider child nodes.
 * @param limit Maximum number of nodes to return.
 * @returns All nodes passing `test`.
 */
function find(test, nodes, recurse, limit) {
    var result = [];
    /** Stack of the arrays we are looking at. */
    var nodeStack = [nodes];
    /** Stack of the indices within the arrays. */
    var indexStack = [0];
    for (;;) {
        // First, check if the current array has any more elements to look at.
        if (indexStack[0] >= nodeStack[0].length) {
            // If we have no more arrays to look at, we are done.
            if (indexStack.length === 1) {
                return result;
            }
            // Otherwise, remove the current array from the stack.
            nodeStack.shift();
            indexStack.shift();
            // Loop back to the start to continue with the next array.
            continue;
        }
        var elem = nodeStack[0][indexStack[0]++];
        if (test(elem)) {
            result.push(elem);
            if (--limit <= 0)
                return result;
        }
        if (recurse && (0, domhandler_1.hasChildren)(elem) && elem.children.length > 0) {
            /*
             * Add the children to the stack. We are depth-first, so this is
             * the next array we look at.
             */
            indexStack.unshift(0);
            nodeStack.unshift(elem.children);
        }
    }
}
exports.find = find;
/**
 * Finds the first element inside of an array that matches a test function. This is an alias for `Array.prototype.find`.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns The first node in the array that passes `test`.
 * @deprecated Use `Array.prototype.find` directly.
 */
function findOneChild(test, nodes) {
    return nodes.find(test);
}
exports.findOneChild = findOneChild;
/**
 * Finds one element in a tree that passes a test.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Node or array of nodes to search.
 * @param recurse Also consider child nodes.
 * @returns The first node that passes `test`.
 */
function findOne(test, nodes, recurse) {
    if (recurse === void 0) { recurse = true; }
    var elem = null;
    for (var i = 0; i < nodes.length && !elem; i++) {
        var node = nodes[i];
        if (!(0, domhandler_1.isTag)(node)) {
            continue;
        }
        else if (test(node)) {
            elem = node;
        }
        else if (recurse && node.children.length > 0) {
            elem = findOne(test, node.children, true);
        }
    }
    return elem;
}
exports.findOne = findOne;
/**
 * Checks if a tree of nodes contains at least one node passing a test.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns Whether a tree of nodes contains at least one node passing the test.
 */
function existsOne(test, nodes) {
    return nodes.some(function (checked) {
        return (0, domhandler_1.isTag)(checked) &&
            (test(checked) || existsOne(test, checked.children));
    });
}
exports.existsOne = existsOne;
/**
 * Search an array of nodes and their children for elements passing a test function.
 *
 * Same as `find`, but limited to elements and with less options, leading to reduced complexity.
 *
 * @category Querying
 * @param test Function to test nodes on.
 * @param nodes Array of nodes to search.
 * @returns All nodes passing `test`.
 */
function findAll(test, nodes) {
    var result = [];
    var nodeStack = [nodes];
    var indexStack = [0];
    for (;;) {
        if (indexStack[0] >= nodeStack[0].length) {
            if (nodeStack.length === 1) {
                return result;
            }
            // Otherwise, remove the current array from the stack.
            nodeStack.shift();
            indexStack.shift();
            // Loop back to the start to continue with the next array.
            continue;
        }
        var elem = nodeStack[0][indexStack[0]++];
        if (!(0, domhandler_1.isTag)(elem))
            continue;
        if (test(elem))
            result.push(elem);
        if (elem.children.length > 0) {
            indexStack.unshift(0);
            nodeStack.unshift(elem.children);
        }
    }
}
exports.findAll = findAll;
//# sourceMappingURL=querying.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/stringify.js":
/*!************************************************!*\
  !*** ./node_modules/domutils/lib/stringify.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.innerText = exports.textContent = exports.getText = exports.getInnerHTML = exports.getOuterHTML = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
var dom_serializer_1 = __importDefault(__webpack_require__(/*! dom-serializer */ "./node_modules/dom-serializer/lib/index.js"));
var domelementtype_1 = __webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js");
/**
 * @category Stringify
 * @deprecated Use the `dom-serializer` module directly.
 * @param node Node to get the outer HTML of.
 * @param options Options for serialization.
 * @returns `node`'s outer HTML.
 */
function getOuterHTML(node, options) {
    return (0, dom_serializer_1.default)(node, options);
}
exports.getOuterHTML = getOuterHTML;
/**
 * @category Stringify
 * @deprecated Use the `dom-serializer` module directly.
 * @param node Node to get the inner HTML of.
 * @param options Options for serialization.
 * @returns `node`'s inner HTML.
 */
function getInnerHTML(node, options) {
    return (0, domhandler_1.hasChildren)(node)
        ? node.children.map(function (node) { return getOuterHTML(node, options); }).join("")
        : "";
}
exports.getInnerHTML = getInnerHTML;
/**
 * Get a node's inner text. Same as `textContent`, but inserts newlines for `<br>` tags. Ignores comments.
 *
 * @category Stringify
 * @deprecated Use `textContent` instead.
 * @param node Node to get the inner text of.
 * @returns `node`'s inner text.
 */
function getText(node) {
    if (Array.isArray(node))
        return node.map(getText).join("");
    if ((0, domhandler_1.isTag)(node))
        return node.name === "br" ? "\n" : getText(node.children);
    if ((0, domhandler_1.isCDATA)(node))
        return getText(node.children);
    if ((0, domhandler_1.isText)(node))
        return node.data;
    return "";
}
exports.getText = getText;
/**
 * Get a node's text content. Ignores comments.
 *
 * @category Stringify
 * @param node Node to get the text content of.
 * @returns `node`'s text content.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}
 */
function textContent(node) {
    if (Array.isArray(node))
        return node.map(textContent).join("");
    if ((0, domhandler_1.hasChildren)(node) && !(0, domhandler_1.isComment)(node)) {
        return textContent(node.children);
    }
    if ((0, domhandler_1.isText)(node))
        return node.data;
    return "";
}
exports.textContent = textContent;
/**
 * Get a node's inner text, ignoring `<script>` and `<style>` tags. Ignores comments.
 *
 * @category Stringify
 * @param node Node to get the inner text of.
 * @returns `node`'s inner text.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText}
 */
function innerText(node) {
    if (Array.isArray(node))
        return node.map(innerText).join("");
    if ((0, domhandler_1.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1.isCDATA)(node))) {
        return innerText(node.children);
    }
    if ((0, domhandler_1.isText)(node))
        return node.data;
    return "";
}
exports.innerText = innerText;
//# sourceMappingURL=stringify.js.map

/***/ }),

/***/ "./node_modules/domutils/lib/traversal.js":
/*!************************************************!*\
  !*** ./node_modules/domutils/lib/traversal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prevElementSibling = exports.nextElementSibling = exports.getName = exports.hasAttrib = exports.getAttributeValue = exports.getSiblings = exports.getParent = exports.getChildren = void 0;
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
/**
 * Get a node's children.
 *
 * @category Traversal
 * @param elem Node to get the children of.
 * @returns `elem`'s children, or an empty array.
 */
function getChildren(elem) {
    return (0, domhandler_1.hasChildren)(elem) ? elem.children : [];
}
exports.getChildren = getChildren;
/**
 * Get a node's parent.
 *
 * @category Traversal
 * @param elem Node to get the parent of.
 * @returns `elem`'s parent node, or `null` if `elem` is a root node.
 */
function getParent(elem) {
    return elem.parent || null;
}
exports.getParent = getParent;
/**
 * Gets an elements siblings, including the element itself.
 *
 * Attempts to get the children through the element's parent first. If we don't
 * have a parent (the element is a root node), we walk the element's `prev` &
 * `next` to get all remaining nodes.
 *
 * @category Traversal
 * @param elem Element to get the siblings of.
 * @returns `elem`'s siblings, including `elem`.
 */
function getSiblings(elem) {
    var _a, _b;
    var parent = getParent(elem);
    if (parent != null)
        return getChildren(parent);
    var siblings = [elem];
    var prev = elem.prev, next = elem.next;
    while (prev != null) {
        siblings.unshift(prev);
        (_a = prev, prev = _a.prev);
    }
    while (next != null) {
        siblings.push(next);
        (_b = next, next = _b.next);
    }
    return siblings;
}
exports.getSiblings = getSiblings;
/**
 * Gets an attribute from an element.
 *
 * @category Traversal
 * @param elem Element to check.
 * @param name Attribute name to retrieve.
 * @returns The element's attribute value, or `undefined`.
 */
function getAttributeValue(elem, name) {
    var _a;
    return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
}
exports.getAttributeValue = getAttributeValue;
/**
 * Checks whether an element has an attribute.
 *
 * @category Traversal
 * @param elem Element to check.
 * @param name Attribute name to look for.
 * @returns Returns whether `elem` has the attribute `name`.
 */
function hasAttrib(elem, name) {
    return (elem.attribs != null &&
        Object.prototype.hasOwnProperty.call(elem.attribs, name) &&
        elem.attribs[name] != null);
}
exports.hasAttrib = hasAttrib;
/**
 * Get the tag name of an element.
 *
 * @category Traversal
 * @param elem The element to get the name for.
 * @returns The tag name of `elem`.
 */
function getName(elem) {
    return elem.name;
}
exports.getName = getName;
/**
 * Returns the next element sibling of a node.
 *
 * @category Traversal
 * @param elem The element to get the next sibling of.
 * @returns `elem`'s next sibling that is a tag, or `null` if there is no next
 * sibling.
 */
function nextElementSibling(elem) {
    var _a;
    var next = elem.next;
    while (next !== null && !(0, domhandler_1.isTag)(next))
        (_a = next, next = _a.next);
    return next;
}
exports.nextElementSibling = nextElementSibling;
/**
 * Returns the previous element sibling of a node.
 *
 * @category Traversal
 * @param elem The element to get the previous sibling of.
 * @returns `elem`'s previous sibling that is a tag, or `null` if there is no
 * previous sibling.
 */
function prevElementSibling(elem) {
    var _a;
    var prev = elem.prev;
    while (prev !== null && !(0, domhandler_1.isTag)(prev))
        (_a = prev, prev = _a.prev);
    return prev;
}
exports.prevElementSibling = prevElementSibling;
//# sourceMappingURL=traversal.js.map

/***/ }),

/***/ "./node_modules/entities/lib/decode.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/decode.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeXML = exports.decodeHTMLStrict = exports.decodeHTMLAttribute = exports.decodeHTML = exports.determineBranch = exports.EntityDecoder = exports.DecodingMode = exports.BinTrieFlags = exports.fromCodePoint = exports.replaceCodePoint = exports.decodeCodePoint = exports.xmlDecodeTree = exports.htmlDecodeTree = void 0;
var decode_data_html_js_1 = __importDefault(__webpack_require__(/*! ./generated/decode-data-html.js */ "./node_modules/entities/lib/generated/decode-data-html.js"));
exports.htmlDecodeTree = decode_data_html_js_1.default;
var decode_data_xml_js_1 = __importDefault(__webpack_require__(/*! ./generated/decode-data-xml.js */ "./node_modules/entities/lib/generated/decode-data-xml.js"));
exports.xmlDecodeTree = decode_data_xml_js_1.default;
var decode_codepoint_js_1 = __importStar(__webpack_require__(/*! ./decode_codepoint.js */ "./node_modules/entities/lib/decode_codepoint.js"));
exports.decodeCodePoint = decode_codepoint_js_1.default;
var decode_codepoint_js_2 = __webpack_require__(/*! ./decode_codepoint.js */ "./node_modules/entities/lib/decode_codepoint.js");
Object.defineProperty(exports, "replaceCodePoint", ({ enumerable: true, get: function () { return decode_codepoint_js_2.replaceCodePoint; } }));
Object.defineProperty(exports, "fromCodePoint", ({ enumerable: true, get: function () { return decode_codepoint_js_2.fromCodePoint; } }));
var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function (BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags = exports.BinTrieFlags || (exports.BinTrieFlags = {}));
function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F));
}
function isAsciiAlphaNumeric(code) {
    return ((code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z) ||
        (code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z) ||
        isNumber(code));
}
/**
 * Checks if the given character is a valid end character for an entity in an attribute.
 *
 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
 */
function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function (EntityDecoderState) {
    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function (DecodingMode) {
    /** Entities in text nodes that can end with any character. */
    DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
    /** Only allow entities terminated with a semicolon. */
    DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
    /** Entities in attributes have limitations on ending characters. */
    DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode = exports.DecodingMode || (exports.DecodingMode = {}));
/**
 * Token decoder with support of writing partial entities.
 */
var EntityDecoder = /** @class */ (function () {
    function EntityDecoder(
    /** The tree used to decode entities. */
    decodeTree, 
    /**
     * The function that is called when a codepoint is decoded.
     *
     * For multi-byte named entities, this will be called multiple times,
     * with the second codepoint, and the same `consumed` value.
     *
     * @param codepoint The decoded codepoint.
     * @param consumed The number of bytes consumed by the decoder.
     */
    emitCodePoint, 
    /** An object that is used to produce errors. */
    errors) {
        this.decodeTree = decodeTree;
        this.emitCodePoint = emitCodePoint;
        this.errors = errors;
        /** The current state of the decoder. */
        this.state = EntityDecoderState.EntityStart;
        /** Characters that were consumed while parsing an entity. */
        this.consumed = 1;
        /**
         * The result of the entity.
         *
         * Either the result index of a numeric entity, or the codepoint of a
         * numeric entity.
         */
        this.result = 0;
        /** The current index in the decode tree. */
        this.treeIndex = 0;
        /** The number of characters that were consumed in excess. */
        this.excess = 1;
        /** The mode in which the decoder is operating. */
        this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */
    EntityDecoder.prototype.startEntity = function (decodeMode) {
        this.decodeMode = decodeMode;
        this.state = EntityDecoderState.EntityStart;
        this.result = 0;
        this.treeIndex = 0;
        this.excess = 1;
        this.consumed = 1;
    };
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param string The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.write = function (str, offset) {
        switch (this.state) {
            case EntityDecoderState.EntityStart: {
                if (str.charCodeAt(offset) === CharCodes.NUM) {
                    this.state = EntityDecoderState.NumericStart;
                    this.consumed += 1;
                    return this.stateNumericStart(str, offset + 1);
                }
                this.state = EntityDecoderState.NamedEntity;
                return this.stateNamedEntity(str, offset);
            }
            case EntityDecoderState.NumericStart: {
                return this.stateNumericStart(str, offset);
            }
            case EntityDecoderState.NumericDecimal: {
                return this.stateNumericDecimal(str, offset);
            }
            case EntityDecoderState.NumericHex: {
                return this.stateNumericHex(str, offset);
            }
            case EntityDecoderState.NamedEntity: {
                return this.stateNamedEntity(str, offset);
            }
        }
    };
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.stateNumericStart = function (str, offset) {
        if (offset >= str.length) {
            return -1;
        }
        if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(str, offset + 1);
        }
        this.state = EntityDecoderState.NumericDecimal;
        return this.stateNumericDecimal(str, offset);
    };
    EntityDecoder.prototype.addToNumericResult = function (str, start, end, base) {
        if (start !== end) {
            var digitCount = end - start;
            this.result =
                this.result * Math.pow(base, digitCount) +
                    parseInt(str.substr(start, digitCount), base);
            this.consumed += digitCount;
        }
    };
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.stateNumericHex = function (str, offset) {
        var startIdx = offset;
        while (offset < str.length) {
            var char = str.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 16);
                return this.emitNumericEntity(char, 3);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 16);
        return -1;
    };
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.stateNumericDecimal = function (str, offset) {
        var startIdx = offset;
        while (offset < str.length) {
            var char = str.charCodeAt(offset);
            if (isNumber(char)) {
                offset += 1;
            }
            else {
                this.addToNumericResult(str, startIdx, offset, 10);
                return this.emitNumericEntity(char, 2);
            }
        }
        this.addToNumericResult(str, startIdx, offset, 10);
        return -1;
    };
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */
    EntityDecoder.prototype.emitNumericEntity = function (lastCp, expectedLength) {
        var _a;
        // Ensure we consumed at least one digit.
        if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
        }
        // Figure out if this is a legit end of the entity
        if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
        }
        else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
        }
        this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
        if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
                this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
        }
        return this.consumed;
    };
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param str The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */
    EntityDecoder.prototype.stateNamedEntity = function (str, offset) {
        var decodeTree = this.decodeTree;
        var current = decodeTree[this.treeIndex];
        // The mask is the number of bytes of the value, including the current byte.
        var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        for (; offset < str.length; offset++, this.excess++) {
            var char = str.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
                return this.result === 0 ||
                    // If we are parsing an attribute
                    (this.decodeMode === DecodingMode.Attribute &&
                        // We shouldn't have consumed any characters after the entity,
                        (valueLength === 0 ||
                            // And there should be no invalid characters.
                            isEntityInAttributeInvalidEnd(char)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            // If the branch is a value, store it and continue
            if (valueLength !== 0) {
                // If the entity is terminated by a semicolon, we are done.
                if (char === CharCodes.SEMI) {
                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                }
                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                if (this.decodeMode !== DecodingMode.Strict) {
                    this.result = this.treeIndex;
                    this.consumed += this.excess;
                    this.excess = 0;
                }
            }
        }
        return -1;
    };
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */
    EntityDecoder.prototype.emitNotTerminatedNamedEntity = function () {
        var _a;
        var _b = this, result = _b.result, decodeTree = _b.decodeTree;
        var valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
        this.emitNamedEntityData(result, valueLength, this.consumed);
        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
        return this.consumed;
    };
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */
    EntityDecoder.prototype.emitNamedEntityData = function (result, valueLength, consumed) {
        var decodeTree = this.decodeTree;
        this.emitCodePoint(valueLength === 1
            ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH
            : decodeTree[result + 1], consumed);
        if (valueLength === 3) {
            // For multi-byte values, we need to emit the second byte.
            this.emitCodePoint(decodeTree[result + 2], consumed);
        }
        return consumed;
    };
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */
    EntityDecoder.prototype.end = function () {
        var _a;
        switch (this.state) {
            case EntityDecoderState.NamedEntity: {
                // Emit a named entity if we have one.
                return this.result !== 0 &&
                    (this.decodeMode !== DecodingMode.Attribute ||
                        this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
            }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal: {
                return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
                return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
                (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                return 0;
            }
            case EntityDecoderState.EntityStart: {
                // Return 0 if we have no entity.
                return 0;
            }
        }
    };
    return EntityDecoder;
}());
exports.EntityDecoder = EntityDecoder;
/**
 * Creates a function that decodes entities in a string.
 *
 * @param decodeTree The decode tree.
 * @returns A function that decodes entities in a string.
 */
function getDecoder(decodeTree) {
    var ret = "";
    var decoder = new EntityDecoder(decodeTree, function (str) { return (ret += (0, decode_codepoint_js_1.fromCodePoint)(str)); });
    return function decodeWithTrie(str, decodeMode) {
        var lastIndex = 0;
        var offset = 0;
        while ((offset = str.indexOf("&", offset)) >= 0) {
            ret += str.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            var len = decoder.write(str, 
            // Skip the "&"
            offset + 1);
            if (len < 0) {
                lastIndex = offset + decoder.end();
                break;
            }
            lastIndex = offset + len;
            // If `len` is 0, skip the current `&` and continue.
            offset = len === 0 ? lastIndex + 1 : lastIndex;
        }
        var result = ret + str.slice(lastIndex);
        // Make sure we don't keep a reference to the final string.
        ret = "";
        return result;
    };
}
/**
 * Determines the branch of the current node that is taken given the current
 * character. This function is used to traverse the trie.
 *
 * @param decodeTree The trie.
 * @param current The current node.
 * @param nodeIdx The index right after the current node and its value.
 * @param char The current character.
 * @returns The index of the next node, or -1 if no branch is taken.
 */
function determineBranch(decodeTree, current, nodeIdx, char) {
    var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        var value = char - jumpOffset;
        return value < 0 || value >= branchCount
            ? -1
            : decodeTree[nodeIdx + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    var lo = nodeIdx;
    var hi = lo + branchCount - 1;
    while (lo <= hi) {
        var mid = (lo + hi) >>> 1;
        var midVal = decodeTree[mid];
        if (midVal < char) {
            lo = mid + 1;
        }
        else if (midVal > char) {
            hi = mid - 1;
        }
        else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
exports.determineBranch = determineBranch;
var htmlDecoder = getDecoder(decode_data_html_js_1.default);
var xmlDecoder = getDecoder(decode_data_xml_js_1.default);
/**
 * Decodes an HTML string.
 *
 * @param str The string to decode.
 * @param mode The decoding mode.
 * @returns The decoded string.
 */
function decodeHTML(str, mode) {
    if (mode === void 0) { mode = DecodingMode.Legacy; }
    return htmlDecoder(str, mode);
}
exports.decodeHTML = decodeHTML;
/**
 * Decodes an HTML string in an attribute.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeHTMLAttribute(str) {
    return htmlDecoder(str, DecodingMode.Attribute);
}
exports.decodeHTMLAttribute = decodeHTMLAttribute;
/**
 * Decodes an HTML string, requiring all entities to be terminated by a semicolon.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeHTMLStrict(str) {
    return htmlDecoder(str, DecodingMode.Strict);
}
exports.decodeHTMLStrict = decodeHTMLStrict;
/**
 * Decodes an XML string, requiring all entities to be terminated by a semicolon.
 *
 * @param str The string to decode.
 * @returns The decoded string.
 */
function decodeXML(str) {
    return xmlDecoder(str, DecodingMode.Strict);
}
exports.decodeXML = decodeXML;
//# sourceMappingURL=decode.js.map

/***/ }),

/***/ "./node_modules/entities/lib/decode_codepoint.js":
/*!*******************************************************!*\
  !*** ./node_modules/entities/lib/decode_codepoint.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceCodePoint = exports.fromCodePoint = void 0;
var decodeMap = new Map([
    [0, 65533],
    // C1 Unicode control character reference replacements
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);
/**
 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
 */
exports.fromCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
    var output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
};
/**
 * Replace the given code point with a replacement character if it is a
 * surrogate or is outside the valid range. Otherwise return the code
 * point unchanged.
 */
function replaceCodePoint(codePoint) {
    var _a;
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return 0xfffd;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}
exports.replaceCodePoint = replaceCodePoint;
/**
 * Replace the code point if relevant, then convert it to a string.
 *
 * @deprecated Use `fromCodePoint(replaceCodePoint(codePoint))` instead.
 * @param codePoint The code point to decode.
 * @returns The decoded code point.
 */
function decodeCodePoint(codePoint) {
    return (0, exports.fromCodePoint)(replaceCodePoint(codePoint));
}
exports["default"] = decodeCodePoint;
//# sourceMappingURL=decode_codepoint.js.map

/***/ }),

/***/ "./node_modules/entities/lib/encode.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/encode.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.encodeNonAsciiHTML = exports.encodeHTML = void 0;
var encode_html_js_1 = __importDefault(__webpack_require__(/*! ./generated/encode-html.js */ "./node_modules/entities/lib/generated/encode-html.js"));
var escape_js_1 = __webpack_require__(/*! ./escape.js */ "./node_modules/entities/lib/escape.js");
var htmlReplacer = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
/**
 * Encodes all characters in the input using HTML entities. This includes
 * characters that are valid ASCII characters in HTML documents, such as `#`.
 *
 * To get a more compact output, consider using the `encodeNonAsciiHTML`
 * function, which will only encode characters that are not valid in HTML
 * documents, as well as non-ASCII characters.
 *
 * If a character has no equivalent entity, a numeric hexadecimal reference
 * (eg. `&#xfc;`) will be used.
 */
function encodeHTML(data) {
    return encodeHTMLTrieRe(htmlReplacer, data);
}
exports.encodeHTML = encodeHTML;
/**
 * Encodes all non-ASCII characters, as well as characters not valid in HTML
 * documents using HTML entities. This function will not encode characters that
 * are valid in HTML documents, such as `#`.
 *
 * If a character has no equivalent entity, a numeric hexadecimal reference
 * (eg. `&#xfc;`) will be used.
 */
function encodeNonAsciiHTML(data) {
    return encodeHTMLTrieRe(escape_js_1.xmlReplacer, data);
}
exports.encodeNonAsciiHTML = encodeNonAsciiHTML;
function encodeHTMLTrieRe(regExp, str) {
    var ret = "";
    var lastIdx = 0;
    var match;
    while ((match = regExp.exec(str)) !== null) {
        var i = match.index;
        ret += str.substring(lastIdx, i);
        var char = str.charCodeAt(i);
        var next = encode_html_js_1.default.get(char);
        if (typeof next === "object") {
            // We are in a branch. Try to match the next char.
            if (i + 1 < str.length) {
                var nextChar = str.charCodeAt(i + 1);
                var value = typeof next.n === "number"
                    ? next.n === nextChar
                        ? next.o
                        : undefined
                    : next.n.get(nextChar);
                if (value !== undefined) {
                    ret += value;
                    lastIdx = regExp.lastIndex += 1;
                    continue;
                }
            }
            next = next.v;
        }
        // We might have a tree node without a value; skip and use a numeric entity.
        if (next !== undefined) {
            ret += next;
            lastIdx = i + 1;
        }
        else {
            var cp = (0, escape_js_1.getCodePoint)(str, i);
            ret += "&#x".concat(cp.toString(16), ";");
            // Increase by 1 if we have a surrogate pair
            lastIdx = regExp.lastIndex += Number(cp !== char);
        }
    }
    return ret + str.substr(lastIdx);
}
//# sourceMappingURL=encode.js.map

/***/ }),

/***/ "./node_modules/entities/lib/escape.js":
/*!*********************************************!*\
  !*** ./node_modules/entities/lib/escape.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.escapeText = exports.escapeAttribute = exports.escapeUTF8 = exports.escape = exports.encodeXML = exports.getCodePoint = exports.xmlReplacer = void 0;
exports.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
var xmlCodeMap = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"],
]);
// For compatibility with node < 4, we wrap `codePointAt`
exports.getCodePoint = 
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.prototype.codePointAt != null
    ? function (str, index) { return str.codePointAt(index); }
    : // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        function (c, index) {
            return (c.charCodeAt(index) & 0xfc00) === 0xd800
                ? (c.charCodeAt(index) - 0xd800) * 0x400 +
                    c.charCodeAt(index + 1) -
                    0xdc00 +
                    0x10000
                : c.charCodeAt(index);
        };
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using XML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */
function encodeXML(str) {
    var ret = "";
    var lastIdx = 0;
    var match;
    while ((match = exports.xmlReplacer.exec(str)) !== null) {
        var i = match.index;
        var char = str.charCodeAt(i);
        var next = xmlCodeMap.get(char);
        if (next !== undefined) {
            ret += str.substring(lastIdx, i) + next;
            lastIdx = i + 1;
        }
        else {
            ret += "".concat(str.substring(lastIdx, i), "&#x").concat((0, exports.getCodePoint)(str, i).toString(16), ";");
            // Increase by 1 if we have a surrogate pair
            lastIdx = exports.xmlReplacer.lastIndex += Number((char & 0xfc00) === 0xd800);
        }
    }
    return ret + str.substr(lastIdx);
}
exports.encodeXML = encodeXML;
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using numeric hexadecimal reference (eg. `&#xfc;`).
 *
 * Have a look at `escapeUTF8` if you want a more concise output at the expense
 * of reduced transportability.
 *
 * @param data String to escape.
 */
exports.escape = encodeXML;
/**
 * Creates a function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 *
 * @param regex Regular expression to match characters to escape.
 * @param map Map of characters to escape to their entities.
 *
 * @returns Function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 */
function getEscaper(regex, map) {
    return function escape(data) {
        var match;
        var lastIdx = 0;
        var result = "";
        while ((match = regex.exec(data))) {
            if (lastIdx !== match.index) {
                result += data.substring(lastIdx, match.index);
            }
            // We know that this character will be in the map.
            result += map.get(match[0].charCodeAt(0));
            // Every match will be of length 1
            lastIdx = match.index + 1;
        }
        return result + data.substring(lastIdx);
    };
}
/**
 * Encodes all characters not valid in XML documents using XML entities.
 *
 * Note that the output will be character-set dependent.
 *
 * @param data String to escape.
 */
exports.escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
/**
 * Encodes all characters that have to be escaped in HTML attributes,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */
exports.escapeAttribute = getEscaper(/["&\u00A0]/g, new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"],
]));
/**
 * Encodes all characters that have to be escaped in HTML text,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */
exports.escapeText = getEscaper(/[&<>\u00A0]/g, new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"],
]));
//# sourceMappingURL=escape.js.map

/***/ }),

/***/ "./node_modules/entities/lib/generated/decode-data-html.js":
/*!*****************************************************************!*\
  !*** ./node_modules/entities/lib/generated/decode-data-html.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Generated using scripts/write-decode-map.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = new Uint16Array(
// prettier-ignore
"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c"
    .split("")
    .map(function (c) { return c.charCodeAt(0); }));
//# sourceMappingURL=decode-data-html.js.map

/***/ }),

/***/ "./node_modules/entities/lib/generated/decode-data-xml.js":
/*!****************************************************************!*\
  !*** ./node_modules/entities/lib/generated/decode-data-xml.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Generated using scripts/write-decode-map.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = new Uint16Array(
// prettier-ignore
"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022"
    .split("")
    .map(function (c) { return c.charCodeAt(0); }));
//# sourceMappingURL=decode-data-xml.js.map

/***/ }),

/***/ "./node_modules/entities/lib/generated/encode-html.js":
/*!************************************************************!*\
  !*** ./node_modules/entities/lib/generated/encode-html.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Generated using scripts/write-encode-map.ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
function restoreDiff(arr) {
    for (var i = 1; i < arr.length; i++) {
        arr[i][0] += arr[i - 1][0] + 1;
    }
    return arr;
}
// prettier-ignore
exports["default"] = new Map(/* #__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* #__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* #__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* #__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
//# sourceMappingURL=encode-html.js.map

/***/ }),

/***/ "./node_modules/entities/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/entities/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLAttribute = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.DecodingMode = exports.EntityDecoder = exports.encodeHTML5 = exports.encodeHTML4 = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.escapeText = exports.escapeAttribute = exports.escapeUTF8 = exports.escape = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = exports.EncodingMode = exports.EntityLevel = void 0;
var decode_js_1 = __webpack_require__(/*! ./decode.js */ "./node_modules/entities/lib/decode.js");
var encode_js_1 = __webpack_require__(/*! ./encode.js */ "./node_modules/entities/lib/encode.js");
var escape_js_1 = __webpack_require__(/*! ./escape.js */ "./node_modules/entities/lib/escape.js");
/** The level of entities to support. */
var EntityLevel;
(function (EntityLevel) {
    /** Support only XML entities. */
    EntityLevel[EntityLevel["XML"] = 0] = "XML";
    /** Support HTML entities, which are a superset of XML entities. */
    EntityLevel[EntityLevel["HTML"] = 1] = "HTML";
})(EntityLevel = exports.EntityLevel || (exports.EntityLevel = {}));
var EncodingMode;
(function (EncodingMode) {
    /**
     * The output is UTF-8 encoded. Only characters that need escaping within
     * XML will be escaped.
     */
    EncodingMode[EncodingMode["UTF8"] = 0] = "UTF8";
    /**
     * The output consists only of ASCII characters. Characters that need
     * escaping within HTML, and characters that aren't ASCII characters will
     * be escaped.
     */
    EncodingMode[EncodingMode["ASCII"] = 1] = "ASCII";
    /**
     * Encode all characters that have an equivalent entity, as well as all
     * characters that are not ASCII characters.
     */
    EncodingMode[EncodingMode["Extensive"] = 2] = "Extensive";
    /**
     * Encode all characters that have to be escaped in HTML attributes,
     * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
     */
    EncodingMode[EncodingMode["Attribute"] = 3] = "Attribute";
    /**
     * Encode all characters that have to be escaped in HTML text,
     * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
     */
    EncodingMode[EncodingMode["Text"] = 4] = "Text";
})(EncodingMode = exports.EncodingMode || (exports.EncodingMode = {}));
/**
 * Decodes a string with entities.
 *
 * @param data String to decode.
 * @param options Decoding options.
 */
function decode(data, options) {
    if (options === void 0) { options = EntityLevel.XML; }
    var level = typeof options === "number" ? options : options.level;
    if (level === EntityLevel.HTML) {
        var mode = typeof options === "object" ? options.mode : undefined;
        return (0, decode_js_1.decodeHTML)(data, mode);
    }
    return (0, decode_js_1.decodeXML)(data);
}
exports.decode = decode;
/**
 * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
 *
 * @param data String to decode.
 * @param options Decoding options.
 * @deprecated Use `decode` with the `mode` set to `Strict`.
 */
function decodeStrict(data, options) {
    var _a;
    if (options === void 0) { options = EntityLevel.XML; }
    var opts = typeof options === "number" ? { level: options } : options;
    (_a = opts.mode) !== null && _a !== void 0 ? _a : (opts.mode = decode_js_1.DecodingMode.Strict);
    return decode(data, opts);
}
exports.decodeStrict = decodeStrict;
/**
 * Encodes a string with entities.
 *
 * @param data String to encode.
 * @param options Encoding options.
 */
function encode(data, options) {
    if (options === void 0) { options = EntityLevel.XML; }
    var opts = typeof options === "number" ? { level: options } : options;
    // Mode `UTF8` just escapes XML entities
    if (opts.mode === EncodingMode.UTF8)
        return (0, escape_js_1.escapeUTF8)(data);
    if (opts.mode === EncodingMode.Attribute)
        return (0, escape_js_1.escapeAttribute)(data);
    if (opts.mode === EncodingMode.Text)
        return (0, escape_js_1.escapeText)(data);
    if (opts.level === EntityLevel.HTML) {
        if (opts.mode === EncodingMode.ASCII) {
            return (0, encode_js_1.encodeNonAsciiHTML)(data);
        }
        return (0, encode_js_1.encodeHTML)(data);
    }
    // ASCII and Extensive are equivalent
    return (0, escape_js_1.encodeXML)(data);
}
exports.encode = encode;
var escape_js_2 = __webpack_require__(/*! ./escape.js */ "./node_modules/entities/lib/escape.js");
Object.defineProperty(exports, "encodeXML", ({ enumerable: true, get: function () { return escape_js_2.encodeXML; } }));
Object.defineProperty(exports, "escape", ({ enumerable: true, get: function () { return escape_js_2.escape; } }));
Object.defineProperty(exports, "escapeUTF8", ({ enumerable: true, get: function () { return escape_js_2.escapeUTF8; } }));
Object.defineProperty(exports, "escapeAttribute", ({ enumerable: true, get: function () { return escape_js_2.escapeAttribute; } }));
Object.defineProperty(exports, "escapeText", ({ enumerable: true, get: function () { return escape_js_2.escapeText; } }));
var encode_js_2 = __webpack_require__(/*! ./encode.js */ "./node_modules/entities/lib/encode.js");
Object.defineProperty(exports, "encodeHTML", ({ enumerable: true, get: function () { return encode_js_2.encodeHTML; } }));
Object.defineProperty(exports, "encodeNonAsciiHTML", ({ enumerable: true, get: function () { return encode_js_2.encodeNonAsciiHTML; } }));
// Legacy aliases (deprecated)
Object.defineProperty(exports, "encodeHTML4", ({ enumerable: true, get: function () { return encode_js_2.encodeHTML; } }));
Object.defineProperty(exports, "encodeHTML5", ({ enumerable: true, get: function () { return encode_js_2.encodeHTML; } }));
var decode_js_2 = __webpack_require__(/*! ./decode.js */ "./node_modules/entities/lib/decode.js");
Object.defineProperty(exports, "EntityDecoder", ({ enumerable: true, get: function () { return decode_js_2.EntityDecoder; } }));
Object.defineProperty(exports, "DecodingMode", ({ enumerable: true, get: function () { return decode_js_2.DecodingMode; } }));
Object.defineProperty(exports, "decodeXML", ({ enumerable: true, get: function () { return decode_js_2.decodeXML; } }));
Object.defineProperty(exports, "decodeHTML", ({ enumerable: true, get: function () { return decode_js_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTMLStrict", ({ enumerable: true, get: function () { return decode_js_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeHTMLAttribute", ({ enumerable: true, get: function () { return decode_js_2.decodeHTMLAttribute; } }));
// Legacy aliases (deprecated)
Object.defineProperty(exports, "decodeHTML4", ({ enumerable: true, get: function () { return decode_js_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTML5", ({ enumerable: true, get: function () { return decode_js_2.decodeHTML; } }));
Object.defineProperty(exports, "decodeHTML4Strict", ({ enumerable: true, get: function () { return decode_js_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeHTML5Strict", ({ enumerable: true, get: function () { return decode_js_2.decodeHTMLStrict; } }));
Object.defineProperty(exports, "decodeXMLStrict", ({ enumerable: true, get: function () { return decode_js_2.decodeXML; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/htmlparser2/lib/Parser.js":
/*!************************************************!*\
  !*** ./node_modules/htmlparser2/lib/Parser.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Parser = void 0;
var Tokenizer_js_1 = __importStar(__webpack_require__(/*! ./Tokenizer.js */ "./node_modules/htmlparser2/lib/Tokenizer.js"));
var decode_js_1 = __webpack_require__(/*! entities/lib/decode.js */ "./node_modules/entities/lib/decode.js");
var formTags = new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea",
]);
var pTag = new Set(["p"]);
var tableSectionTags = new Set(["thead", "tbody"]);
var ddtTags = new Set(["dd", "dt"]);
var rtpTags = new Set(["rt", "rp"]);
var openImpliesClose = new Map([
    ["tr", new Set(["tr", "th", "td"])],
    ["th", new Set(["th"])],
    ["td", new Set(["thead", "th", "td"])],
    ["body", new Set(["head", "link", "script"])],
    ["li", new Set(["li"])],
    ["p", pTag],
    ["h1", pTag],
    ["h2", pTag],
    ["h3", pTag],
    ["h4", pTag],
    ["h5", pTag],
    ["h6", pTag],
    ["select", formTags],
    ["input", formTags],
    ["output", formTags],
    ["button", formTags],
    ["datalist", formTags],
    ["textarea", formTags],
    ["option", new Set(["option"])],
    ["optgroup", new Set(["optgroup", "option"])],
    ["dd", ddtTags],
    ["dt", ddtTags],
    ["address", pTag],
    ["article", pTag],
    ["aside", pTag],
    ["blockquote", pTag],
    ["details", pTag],
    ["div", pTag],
    ["dl", pTag],
    ["fieldset", pTag],
    ["figcaption", pTag],
    ["figure", pTag],
    ["footer", pTag],
    ["form", pTag],
    ["header", pTag],
    ["hr", pTag],
    ["main", pTag],
    ["nav", pTag],
    ["ol", pTag],
    ["pre", pTag],
    ["section", pTag],
    ["table", pTag],
    ["ul", pTag],
    ["rt", rtpTags],
    ["rp", rtpTags],
    ["tbody", tableSectionTags],
    ["tfoot", tableSectionTags],
]);
var voidElements = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);
var foreignContextElements = new Set(["math", "svg"]);
var htmlIntegrationElements = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignobject",
    "desc",
    "title",
]);
var reNameEnd = /\s|\//;
var Parser = /** @class */ (function () {
    function Parser(cbs, options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c, _d, _e;
        this.options = options;
        /** The start index of the last event. */
        this.startIndex = 0;
        /** The end index of the last event. */
        this.endIndex = 0;
        /**
         * Store the start index of the current open tag,
         * so we can update the start index for attributes.
         */
        this.openTagStart = 0;
        this.tagname = "";
        this.attribname = "";
        this.attribvalue = "";
        this.attribs = null;
        this.stack = [];
        this.foreignContext = [];
        this.buffers = [];
        this.bufferOffset = 0;
        /** The index of the last written buffer. Used when resuming after a `pause()`. */
        this.writeIndex = 0;
        /** Indicates whether the parser has finished running / `.end` has been called. */
        this.ended = false;
        this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
        this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : !options.xmlMode;
        this.lowerCaseAttributeNames =
            (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode;
        this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : Tokenizer_js_1.default)(this.options, this);
        (_e = (_d = this.cbs).onparserinit) === null || _e === void 0 ? void 0 : _e.call(_d, this);
    }
    // Tokenizer event handlers
    /** @internal */
    Parser.prototype.ontext = function (start, endIndex) {
        var _a, _b;
        var data = this.getSlice(start, endIndex);
        this.endIndex = endIndex - 1;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, data);
        this.startIndex = endIndex;
    };
    /** @internal */
    Parser.prototype.ontextentity = function (cp) {
        var _a, _b;
        /*
         * Entities can be emitted on the character, or directly after.
         * We use the section start here to get accurate indices.
         */
        var index = this.tokenizer.getSectionStart();
        this.endIndex = index - 1;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, (0, decode_js_1.fromCodePoint)(cp));
        this.startIndex = index;
    };
    Parser.prototype.isVoidElement = function (name) {
        return !this.options.xmlMode && voidElements.has(name);
    };
    /** @internal */
    Parser.prototype.onopentagname = function (start, endIndex) {
        this.endIndex = endIndex;
        var name = this.getSlice(start, endIndex);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        this.emitOpenTag(name);
    };
    Parser.prototype.emitOpenTag = function (name) {
        var _a, _b, _c, _d;
        this.openTagStart = this.startIndex;
        this.tagname = name;
        var impliesClose = !this.options.xmlMode && openImpliesClose.get(name);
        if (impliesClose) {
            while (this.stack.length > 0 &&
                impliesClose.has(this.stack[this.stack.length - 1])) {
                var element = this.stack.pop();
                (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, element, true);
            }
        }
        if (!this.isVoidElement(name)) {
            this.stack.push(name);
            if (foreignContextElements.has(name)) {
                this.foreignContext.push(true);
            }
            else if (htmlIntegrationElements.has(name)) {
                this.foreignContext.push(false);
            }
        }
        (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name);
        if (this.cbs.onopentag)
            this.attribs = {};
    };
    Parser.prototype.endOpenTag = function (isImplied) {
        var _a, _b;
        this.startIndex = this.openTagStart;
        if (this.attribs) {
            (_b = (_a = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a, this.tagname, this.attribs, isImplied);
            this.attribs = null;
        }
        if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
            this.cbs.onclosetag(this.tagname, true);
        }
        this.tagname = "";
    };
    /** @internal */
    Parser.prototype.onopentagend = function (endIndex) {
        this.endIndex = endIndex;
        this.endOpenTag(false);
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.onclosetag = function (start, endIndex) {
        var _a, _b, _c, _d, _e, _f;
        this.endIndex = endIndex;
        var name = this.getSlice(start, endIndex);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        if (foreignContextElements.has(name) ||
            htmlIntegrationElements.has(name)) {
            this.foreignContext.pop();
        }
        if (!this.isVoidElement(name)) {
            var pos = this.stack.lastIndexOf(name);
            if (pos !== -1) {
                if (this.cbs.onclosetag) {
                    var count = this.stack.length - pos;
                    while (count--) {
                        // We know the stack has sufficient elements.
                        this.cbs.onclosetag(this.stack.pop(), count !== 0);
                    }
                }
                else
                    this.stack.length = pos;
            }
            else if (!this.options.xmlMode && name === "p") {
                // Implicit open before close
                this.emitOpenTag("p");
                this.closeCurrentTag(true);
            }
        }
        else if (!this.options.xmlMode && name === "br") {
            // We can't use `emitOpenTag` for implicit open, as `br` would be implicitly closed.
            (_b = (_a = this.cbs).onopentagname) === null || _b === void 0 ? void 0 : _b.call(_a, "br");
            (_d = (_c = this.cbs).onopentag) === null || _d === void 0 ? void 0 : _d.call(_c, "br", {}, true);
            (_f = (_e = this.cbs).onclosetag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", false);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.onselfclosingtag = function (endIndex) {
        this.endIndex = endIndex;
        if (this.options.xmlMode ||
            this.options.recognizeSelfClosing ||
            this.foreignContext[this.foreignContext.length - 1]) {
            this.closeCurrentTag(false);
            // Set `startIndex` for next node
            this.startIndex = endIndex + 1;
        }
        else {
            // Ignore the fact that the tag is self-closing.
            this.onopentagend(endIndex);
        }
    };
    Parser.prototype.closeCurrentTag = function (isOpenImplied) {
        var _a, _b;
        var name = this.tagname;
        this.endOpenTag(isOpenImplied);
        // Self-closing tags will be on the top of the stack
        if (this.stack[this.stack.length - 1] === name) {
            // If the opening tag isn't implied, the closing tag has to be implied.
            (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, name, !isOpenImplied);
            this.stack.pop();
        }
    };
    /** @internal */
    Parser.prototype.onattribname = function (start, endIndex) {
        this.startIndex = start;
        var name = this.getSlice(start, endIndex);
        this.attribname = this.lowerCaseAttributeNames
            ? name.toLowerCase()
            : name;
    };
    /** @internal */
    Parser.prototype.onattribdata = function (start, endIndex) {
        this.attribvalue += this.getSlice(start, endIndex);
    };
    /** @internal */
    Parser.prototype.onattribentity = function (cp) {
        this.attribvalue += (0, decode_js_1.fromCodePoint)(cp);
    };
    /** @internal */
    Parser.prototype.onattribend = function (quote, endIndex) {
        var _a, _b;
        this.endIndex = endIndex;
        (_b = (_a = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a, this.attribname, this.attribvalue, quote === Tokenizer_js_1.QuoteType.Double
            ? '"'
            : quote === Tokenizer_js_1.QuoteType.Single
                ? "'"
                : quote === Tokenizer_js_1.QuoteType.NoValue
                    ? undefined
                    : null);
        if (this.attribs &&
            !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
            this.attribs[this.attribname] = this.attribvalue;
        }
        this.attribvalue = "";
    };
    Parser.prototype.getInstructionName = function (value) {
        var index = value.search(reNameEnd);
        var name = index < 0 ? value : value.substr(0, index);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        return name;
    };
    /** @internal */
    Parser.prototype.ondeclaration = function (start, endIndex) {
        this.endIndex = endIndex;
        var value = this.getSlice(start, endIndex);
        if (this.cbs.onprocessinginstruction) {
            var name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction("!".concat(name), "!".concat(value));
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.onprocessinginstruction = function (start, endIndex) {
        this.endIndex = endIndex;
        var value = this.getSlice(start, endIndex);
        if (this.cbs.onprocessinginstruction) {
            var name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction("?".concat(name), "?".concat(value));
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.oncomment = function (start, endIndex, offset) {
        var _a, _b, _c, _d;
        this.endIndex = endIndex;
        (_b = (_a = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a, this.getSlice(start, endIndex - offset));
        (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.oncdata = function (start, endIndex, offset) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.endIndex = endIndex;
        var value = this.getSlice(start, endIndex - offset);
        if (this.options.xmlMode || this.options.recognizeCDATA) {
            (_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
            (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
        }
        else {
            (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, "[CDATA[".concat(value, "]]"));
            (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    };
    /** @internal */
    Parser.prototype.onend = function () {
        var _a, _b;
        if (this.cbs.onclosetag) {
            // Set the end index for all remaining tags
            this.endIndex = this.startIndex;
            for (var index = this.stack.length; index > 0; this.cbs.onclosetag(this.stack[--index], true))
                ;
        }
        (_b = (_a = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    /**
     * Resets the parser to a blank state, ready to parse a new HTML document
     */
    Parser.prototype.reset = function () {
        var _a, _b, _c, _d;
        (_b = (_a = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.tokenizer.reset();
        this.tagname = "";
        this.attribname = "";
        this.attribs = null;
        this.stack.length = 0;
        this.startIndex = 0;
        this.endIndex = 0;
        (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
        this.buffers.length = 0;
        this.bufferOffset = 0;
        this.writeIndex = 0;
        this.ended = false;
    };
    /**
     * Resets the parser, then parses a complete document and
     * pushes it to the handler.
     *
     * @param data Document to parse.
     */
    Parser.prototype.parseComplete = function (data) {
        this.reset();
        this.end(data);
    };
    Parser.prototype.getSlice = function (start, end) {
        while (start - this.bufferOffset >= this.buffers[0].length) {
            this.shiftBuffer();
        }
        var slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
        while (end - this.bufferOffset > this.buffers[0].length) {
            this.shiftBuffer();
            slice += this.buffers[0].slice(0, end - this.bufferOffset);
        }
        return slice;
    };
    Parser.prototype.shiftBuffer = function () {
        this.bufferOffset += this.buffers[0].length;
        this.writeIndex--;
        this.buffers.shift();
    };
    /**
     * Parses a chunk of data and calls the corresponding callbacks.
     *
     * @param chunk Chunk to parse.
     */
    Parser.prototype.write = function (chunk) {
        var _a, _b;
        if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".write() after done!"));
            return;
        }
        this.buffers.push(chunk);
        if (this.tokenizer.running) {
            this.tokenizer.write(chunk);
            this.writeIndex++;
        }
    };
    /**
     * Parses the end of the buffer and clears the stack, calls onend.
     *
     * @param chunk Optional final chunk to parse.
     */
    Parser.prototype.end = function (chunk) {
        var _a, _b;
        if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".end() after done!"));
            return;
        }
        if (chunk)
            this.write(chunk);
        this.ended = true;
        this.tokenizer.end();
    };
    /**
     * Pauses parsing. The parser won't emit events until `resume` is called.
     */
    Parser.prototype.pause = function () {
        this.tokenizer.pause();
    };
    /**
     * Resumes parsing after `pause` was called.
     */
    Parser.prototype.resume = function () {
        this.tokenizer.resume();
        while (this.tokenizer.running &&
            this.writeIndex < this.buffers.length) {
            this.tokenizer.write(this.buffers[this.writeIndex++]);
        }
        if (this.ended)
            this.tokenizer.end();
    };
    /**
     * Alias of `write`, for backwards compatibility.
     *
     * @param chunk Chunk to parse.
     * @deprecated
     */
    Parser.prototype.parseChunk = function (chunk) {
        this.write(chunk);
    };
    /**
     * Alias of `end`, for backwards compatibility.
     *
     * @param chunk Optional final chunk to parse.
     * @deprecated
     */
    Parser.prototype.done = function (chunk) {
        this.end(chunk);
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map

/***/ }),

/***/ "./node_modules/htmlparser2/lib/Tokenizer.js":
/*!***************************************************!*\
  !*** ./node_modules/htmlparser2/lib/Tokenizer.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QuoteType = void 0;
var decode_js_1 = __webpack_require__(/*! entities/lib/decode.js */ "./node_modules/entities/lib/decode.js");
var CharCodes;
(function (CharCodes) {
    CharCodes[CharCodes["Tab"] = 9] = "Tab";
    CharCodes[CharCodes["NewLine"] = 10] = "NewLine";
    CharCodes[CharCodes["FormFeed"] = 12] = "FormFeed";
    CharCodes[CharCodes["CarriageReturn"] = 13] = "CarriageReturn";
    CharCodes[CharCodes["Space"] = 32] = "Space";
    CharCodes[CharCodes["ExclamationMark"] = 33] = "ExclamationMark";
    CharCodes[CharCodes["Number"] = 35] = "Number";
    CharCodes[CharCodes["Amp"] = 38] = "Amp";
    CharCodes[CharCodes["SingleQuote"] = 39] = "SingleQuote";
    CharCodes[CharCodes["DoubleQuote"] = 34] = "DoubleQuote";
    CharCodes[CharCodes["Dash"] = 45] = "Dash";
    CharCodes[CharCodes["Slash"] = 47] = "Slash";
    CharCodes[CharCodes["Zero"] = 48] = "Zero";
    CharCodes[CharCodes["Nine"] = 57] = "Nine";
    CharCodes[CharCodes["Semi"] = 59] = "Semi";
    CharCodes[CharCodes["Lt"] = 60] = "Lt";
    CharCodes[CharCodes["Eq"] = 61] = "Eq";
    CharCodes[CharCodes["Gt"] = 62] = "Gt";
    CharCodes[CharCodes["Questionmark"] = 63] = "Questionmark";
    CharCodes[CharCodes["UpperA"] = 65] = "UpperA";
    CharCodes[CharCodes["LowerA"] = 97] = "LowerA";
    CharCodes[CharCodes["UpperF"] = 70] = "UpperF";
    CharCodes[CharCodes["LowerF"] = 102] = "LowerF";
    CharCodes[CharCodes["UpperZ"] = 90] = "UpperZ";
    CharCodes[CharCodes["LowerZ"] = 122] = "LowerZ";
    CharCodes[CharCodes["LowerX"] = 120] = "LowerX";
    CharCodes[CharCodes["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
/** All the states the tokenizer can be in. */
var State;
(function (State) {
    State[State["Text"] = 1] = "Text";
    State[State["BeforeTagName"] = 2] = "BeforeTagName";
    State[State["InTagName"] = 3] = "InTagName";
    State[State["InSelfClosingTag"] = 4] = "InSelfClosingTag";
    State[State["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
    State[State["InClosingTagName"] = 6] = "InClosingTagName";
    State[State["AfterClosingTagName"] = 7] = "AfterClosingTagName";
    // Attributes
    State[State["BeforeAttributeName"] = 8] = "BeforeAttributeName";
    State[State["InAttributeName"] = 9] = "InAttributeName";
    State[State["AfterAttributeName"] = 10] = "AfterAttributeName";
    State[State["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
    State[State["InAttributeValueDq"] = 12] = "InAttributeValueDq";
    State[State["InAttributeValueSq"] = 13] = "InAttributeValueSq";
    State[State["InAttributeValueNq"] = 14] = "InAttributeValueNq";
    // Declarations
    State[State["BeforeDeclaration"] = 15] = "BeforeDeclaration";
    State[State["InDeclaration"] = 16] = "InDeclaration";
    // Processing instructions
    State[State["InProcessingInstruction"] = 17] = "InProcessingInstruction";
    // Comments & CDATA
    State[State["BeforeComment"] = 18] = "BeforeComment";
    State[State["CDATASequence"] = 19] = "CDATASequence";
    State[State["InSpecialComment"] = 20] = "InSpecialComment";
    State[State["InCommentLike"] = 21] = "InCommentLike";
    // Special tags
    State[State["BeforeSpecialS"] = 22] = "BeforeSpecialS";
    State[State["SpecialStartSequence"] = 23] = "SpecialStartSequence";
    State[State["InSpecialTag"] = 24] = "InSpecialTag";
    State[State["BeforeEntity"] = 25] = "BeforeEntity";
    State[State["BeforeNumericEntity"] = 26] = "BeforeNumericEntity";
    State[State["InNamedEntity"] = 27] = "InNamedEntity";
    State[State["InNumericEntity"] = 28] = "InNumericEntity";
    State[State["InHexEntity"] = 29] = "InHexEntity";
})(State || (State = {}));
function isWhitespace(c) {
    return (c === CharCodes.Space ||
        c === CharCodes.NewLine ||
        c === CharCodes.Tab ||
        c === CharCodes.FormFeed ||
        c === CharCodes.CarriageReturn);
}
function isEndOfTagSection(c) {
    return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isNumber(c) {
    return c >= CharCodes.Zero && c <= CharCodes.Nine;
}
function isASCIIAlpha(c) {
    return ((c >= CharCodes.LowerA && c <= CharCodes.LowerZ) ||
        (c >= CharCodes.UpperA && c <= CharCodes.UpperZ));
}
function isHexDigit(c) {
    return ((c >= CharCodes.UpperA && c <= CharCodes.UpperF) ||
        (c >= CharCodes.LowerA && c <= CharCodes.LowerF));
}
var QuoteType;
(function (QuoteType) {
    QuoteType[QuoteType["NoValue"] = 0] = "NoValue";
    QuoteType[QuoteType["Unquoted"] = 1] = "Unquoted";
    QuoteType[QuoteType["Single"] = 2] = "Single";
    QuoteType[QuoteType["Double"] = 3] = "Double";
})(QuoteType = exports.QuoteType || (exports.QuoteType = {}));
/**
 * Sequences used to match longer strings.
 *
 * We don't have `Script`, `Style`, or `Title` here. Instead, we re-use the *End
 * sequences with an increased offset.
 */
var Sequences = {
    Cdata: new Uint8Array([0x43, 0x44, 0x41, 0x54, 0x41, 0x5b]),
    CdataEnd: new Uint8Array([0x5d, 0x5d, 0x3e]),
    CommentEnd: new Uint8Array([0x2d, 0x2d, 0x3e]),
    ScriptEnd: new Uint8Array([0x3c, 0x2f, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74]),
    StyleEnd: new Uint8Array([0x3c, 0x2f, 0x73, 0x74, 0x79, 0x6c, 0x65]),
    TitleEnd: new Uint8Array([0x3c, 0x2f, 0x74, 0x69, 0x74, 0x6c, 0x65]), // `</title`
};
var Tokenizer = /** @class */ (function () {
    function Tokenizer(_a, cbs) {
        var _b = _a.xmlMode, xmlMode = _b === void 0 ? false : _b, _c = _a.decodeEntities, decodeEntities = _c === void 0 ? true : _c;
        this.cbs = cbs;
        /** The current state the tokenizer is in. */
        this.state = State.Text;
        /** The read buffer. */
        this.buffer = "";
        /** The beginning of the section that is currently being read. */
        this.sectionStart = 0;
        /** The index within the buffer that we are currently looking at. */
        this.index = 0;
        /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
        this.baseState = State.Text;
        /** For special parsing behavior inside of script and style tags. */
        this.isSpecial = false;
        /** Indicates whether the tokenizer has been paused. */
        this.running = true;
        /** The offset of the current buffer. */
        this.offset = 0;
        this.currentSequence = undefined;
        this.sequenceIndex = 0;
        this.trieIndex = 0;
        this.trieCurrent = 0;
        /** For named entities, the index of the value. For numeric entities, the code point. */
        this.entityResult = 0;
        this.entityExcess = 0;
        this.xmlMode = xmlMode;
        this.decodeEntities = decodeEntities;
        this.entityTrie = xmlMode ? decode_js_1.xmlDecodeTree : decode_js_1.htmlDecodeTree;
    }
    Tokenizer.prototype.reset = function () {
        this.state = State.Text;
        this.buffer = "";
        this.sectionStart = 0;
        this.index = 0;
        this.baseState = State.Text;
        this.currentSequence = undefined;
        this.running = true;
        this.offset = 0;
    };
    Tokenizer.prototype.write = function (chunk) {
        this.offset += this.buffer.length;
        this.buffer = chunk;
        this.parse();
    };
    Tokenizer.prototype.end = function () {
        if (this.running)
            this.finish();
    };
    Tokenizer.prototype.pause = function () {
        this.running = false;
    };
    Tokenizer.prototype.resume = function () {
        this.running = true;
        if (this.index < this.buffer.length + this.offset) {
            this.parse();
        }
    };
    /**
     * The current index within all of the written data.
     */
    Tokenizer.prototype.getIndex = function () {
        return this.index;
    };
    /**
     * The start of the current section.
     */
    Tokenizer.prototype.getSectionStart = function () {
        return this.sectionStart;
    };
    Tokenizer.prototype.stateText = function (c) {
        if (c === CharCodes.Lt ||
            (!this.decodeEntities && this.fastForwardTo(CharCodes.Lt))) {
            if (this.index > this.sectionStart) {
                this.cbs.ontext(this.sectionStart, this.index);
            }
            this.state = State.BeforeTagName;
            this.sectionStart = this.index;
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.state = State.BeforeEntity;
        }
    };
    Tokenizer.prototype.stateSpecialStartSequence = function (c) {
        var isEnd = this.sequenceIndex === this.currentSequence.length;
        var isMatch = isEnd
            ? // If we are at the end of the sequence, make sure the tag name has ended
                isEndOfTagSection(c)
            : // Otherwise, do a case-insensitive comparison
                (c | 0x20) === this.currentSequence[this.sequenceIndex];
        if (!isMatch) {
            this.isSpecial = false;
        }
        else if (!isEnd) {
            this.sequenceIndex++;
            return;
        }
        this.sequenceIndex = 0;
        this.state = State.InTagName;
        this.stateInTagName(c);
    };
    /** Look for an end tag. For <title> tags, also decode entities. */
    Tokenizer.prototype.stateInSpecialTag = function (c) {
        if (this.sequenceIndex === this.currentSequence.length) {
            if (c === CharCodes.Gt || isWhitespace(c)) {
                var endOfText = this.index - this.currentSequence.length;
                if (this.sectionStart < endOfText) {
                    // Spoof the index so that reported locations match up.
                    var actualIndex = this.index;
                    this.index = endOfText;
                    this.cbs.ontext(this.sectionStart, endOfText);
                    this.index = actualIndex;
                }
                this.isSpecial = false;
                this.sectionStart = endOfText + 2; // Skip over the `</`
                this.stateInClosingTagName(c);
                return; // We are done; skip the rest of the function.
            }
            this.sequenceIndex = 0;
        }
        if ((c | 0x20) === this.currentSequence[this.sequenceIndex]) {
            this.sequenceIndex += 1;
        }
        else if (this.sequenceIndex === 0) {
            if (this.currentSequence === Sequences.TitleEnd) {
                // We have to parse entities in <title> tags.
                if (this.decodeEntities && c === CharCodes.Amp) {
                    this.state = State.BeforeEntity;
                }
            }
            else if (this.fastForwardTo(CharCodes.Lt)) {
                // Outside of <title> tags, we can fast-forward.
                this.sequenceIndex = 1;
            }
        }
        else {
            // If we see a `<`, set the sequence index to 1; useful for eg. `<</script>`.
            this.sequenceIndex = Number(c === CharCodes.Lt);
        }
    };
    Tokenizer.prototype.stateCDATASequence = function (c) {
        if (c === Sequences.Cdata[this.sequenceIndex]) {
            if (++this.sequenceIndex === Sequences.Cdata.length) {
                this.state = State.InCommentLike;
                this.currentSequence = Sequences.CdataEnd;
                this.sequenceIndex = 0;
                this.sectionStart = this.index + 1;
            }
        }
        else {
            this.sequenceIndex = 0;
            this.state = State.InDeclaration;
            this.stateInDeclaration(c); // Reconsume the character
        }
    };
    /**
     * When we wait for one specific character, we can speed things up
     * by skipping through the buffer until we find it.
     *
     * @returns Whether the character was found.
     */
    Tokenizer.prototype.fastForwardTo = function (c) {
        while (++this.index < this.buffer.length + this.offset) {
            if (this.buffer.charCodeAt(this.index - this.offset) === c) {
                return true;
            }
        }
        /*
         * We increment the index at the end of the `parse` loop,
         * so set it to `buffer.length - 1` here.
         *
         * TODO: Refactor `parse` to increment index before calling states.
         */
        this.index = this.buffer.length + this.offset - 1;
        return false;
    };
    /**
     * Comments and CDATA end with `-->` and `]]>`.
     *
     * Their common qualities are:
     * - Their end sequences have a distinct character they start with.
     * - That character is then repeated, so we have to check multiple repeats.
     * - All characters but the start character of the sequence can be skipped.
     */
    Tokenizer.prototype.stateInCommentLike = function (c) {
        if (c === this.currentSequence[this.sequenceIndex]) {
            if (++this.sequenceIndex === this.currentSequence.length) {
                if (this.currentSequence === Sequences.CdataEnd) {
                    this.cbs.oncdata(this.sectionStart, this.index, 2);
                }
                else {
                    this.cbs.oncomment(this.sectionStart, this.index, 2);
                }
                this.sequenceIndex = 0;
                this.sectionStart = this.index + 1;
                this.state = State.Text;
            }
        }
        else if (this.sequenceIndex === 0) {
            // Fast-forward to the first character of the sequence
            if (this.fastForwardTo(this.currentSequence[0])) {
                this.sequenceIndex = 1;
            }
        }
        else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
            // Allow long sequences, eg. --->, ]]]>
            this.sequenceIndex = 0;
        }
    };
    /**
     * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
     *
     * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
     * We allow anything that wouldn't end the tag.
     */
    Tokenizer.prototype.isTagStartChar = function (c) {
        return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
    };
    Tokenizer.prototype.startSpecial = function (sequence, offset) {
        this.isSpecial = true;
        this.currentSequence = sequence;
        this.sequenceIndex = offset;
        this.state = State.SpecialStartSequence;
    };
    Tokenizer.prototype.stateBeforeTagName = function (c) {
        if (c === CharCodes.ExclamationMark) {
            this.state = State.BeforeDeclaration;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.Questionmark) {
            this.state = State.InProcessingInstruction;
            this.sectionStart = this.index + 1;
        }
        else if (this.isTagStartChar(c)) {
            var lower = c | 0x20;
            this.sectionStart = this.index;
            if (!this.xmlMode && lower === Sequences.TitleEnd[2]) {
                this.startSpecial(Sequences.TitleEnd, 3);
            }
            else {
                this.state =
                    !this.xmlMode && lower === Sequences.ScriptEnd[2]
                        ? State.BeforeSpecialS
                        : State.InTagName;
            }
        }
        else if (c === CharCodes.Slash) {
            this.state = State.BeforeClosingTagName;
        }
        else {
            this.state = State.Text;
            this.stateText(c);
        }
    };
    Tokenizer.prototype.stateInTagName = function (c) {
        if (isEndOfTagSection(c)) {
            this.cbs.onopentagname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
    };
    Tokenizer.prototype.stateBeforeClosingTagName = function (c) {
        if (isWhitespace(c)) {
            // Ignore
        }
        else if (c === CharCodes.Gt) {
            this.state = State.Text;
        }
        else {
            this.state = this.isTagStartChar(c)
                ? State.InClosingTagName
                : State.InSpecialComment;
            this.sectionStart = this.index;
        }
    };
    Tokenizer.prototype.stateInClosingTagName = function (c) {
        if (c === CharCodes.Gt || isWhitespace(c)) {
            this.cbs.onclosetag(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterClosingTagName;
            this.stateAfterClosingTagName(c);
        }
    };
    Tokenizer.prototype.stateAfterClosingTagName = function (c) {
        // Skip everything until ">"
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.state = State.Text;
            this.baseState = State.Text;
            this.sectionStart = this.index + 1;
        }
    };
    Tokenizer.prototype.stateBeforeAttributeName = function (c) {
        if (c === CharCodes.Gt) {
            this.cbs.onopentagend(this.index);
            if (this.isSpecial) {
                this.state = State.InSpecialTag;
                this.sequenceIndex = 0;
            }
            else {
                this.state = State.Text;
            }
            this.baseState = this.state;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.Slash) {
            this.state = State.InSelfClosingTag;
        }
        else if (!isWhitespace(c)) {
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
        }
    };
    Tokenizer.prototype.stateInSelfClosingTag = function (c) {
        if (c === CharCodes.Gt) {
            this.cbs.onselfclosingtag(this.index);
            this.state = State.Text;
            this.baseState = State.Text;
            this.sectionStart = this.index + 1;
            this.isSpecial = false; // Reset special state, in case of self-closing special tags
        }
        else if (!isWhitespace(c)) {
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
    };
    Tokenizer.prototype.stateInAttributeName = function (c) {
        if (c === CharCodes.Eq || isEndOfTagSection(c)) {
            this.cbs.onattribname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterAttributeName;
            this.stateAfterAttributeName(c);
        }
    };
    Tokenizer.prototype.stateAfterAttributeName = function (c) {
        if (c === CharCodes.Eq) {
            this.state = State.BeforeAttributeValue;
        }
        else if (c === CharCodes.Slash || c === CharCodes.Gt) {
            this.cbs.onattribend(QuoteType.NoValue, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
        else if (!isWhitespace(c)) {
            this.cbs.onattribend(QuoteType.NoValue, this.index);
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
        }
    };
    Tokenizer.prototype.stateBeforeAttributeValue = function (c) {
        if (c === CharCodes.DoubleQuote) {
            this.state = State.InAttributeValueDq;
            this.sectionStart = this.index + 1;
        }
        else if (c === CharCodes.SingleQuote) {
            this.state = State.InAttributeValueSq;
            this.sectionStart = this.index + 1;
        }
        else if (!isWhitespace(c)) {
            this.sectionStart = this.index;
            this.state = State.InAttributeValueNq;
            this.stateInAttributeValueNoQuotes(c); // Reconsume token
        }
    };
    Tokenizer.prototype.handleInAttributeValue = function (c, quote) {
        if (c === quote ||
            (!this.decodeEntities && this.fastForwardTo(quote))) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(quote === CharCodes.DoubleQuote
                ? QuoteType.Double
                : QuoteType.Single, this.index);
            this.state = State.BeforeAttributeName;
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.baseState = this.state;
            this.state = State.BeforeEntity;
        }
    };
    Tokenizer.prototype.stateInAttributeValueDoubleQuotes = function (c) {
        this.handleInAttributeValue(c, CharCodes.DoubleQuote);
    };
    Tokenizer.prototype.stateInAttributeValueSingleQuotes = function (c) {
        this.handleInAttributeValue(c, CharCodes.SingleQuote);
    };
    Tokenizer.prototype.stateInAttributeValueNoQuotes = function (c) {
        if (isWhitespace(c) || c === CharCodes.Gt) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(QuoteType.Unquoted, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
        else if (this.decodeEntities && c === CharCodes.Amp) {
            this.baseState = this.state;
            this.state = State.BeforeEntity;
        }
    };
    Tokenizer.prototype.stateBeforeDeclaration = function (c) {
        if (c === CharCodes.OpeningSquareBracket) {
            this.state = State.CDATASequence;
            this.sequenceIndex = 0;
        }
        else {
            this.state =
                c === CharCodes.Dash
                    ? State.BeforeComment
                    : State.InDeclaration;
        }
    };
    Tokenizer.prototype.stateInDeclaration = function (c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.ondeclaration(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    };
    Tokenizer.prototype.stateInProcessingInstruction = function (c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.onprocessinginstruction(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    };
    Tokenizer.prototype.stateBeforeComment = function (c) {
        if (c === CharCodes.Dash) {
            this.state = State.InCommentLike;
            this.currentSequence = Sequences.CommentEnd;
            // Allow short comments (eg. <!-->)
            this.sequenceIndex = 2;
            this.sectionStart = this.index + 1;
        }
        else {
            this.state = State.InDeclaration;
        }
    };
    Tokenizer.prototype.stateInSpecialComment = function (c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.oncomment(this.sectionStart, this.index, 0);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    };
    Tokenizer.prototype.stateBeforeSpecialS = function (c) {
        var lower = c | 0x20;
        if (lower === Sequences.ScriptEnd[3]) {
            this.startSpecial(Sequences.ScriptEnd, 4);
        }
        else if (lower === Sequences.StyleEnd[3]) {
            this.startSpecial(Sequences.StyleEnd, 4);
        }
        else {
            this.state = State.InTagName;
            this.stateInTagName(c); // Consume the token again
        }
    };
    Tokenizer.prototype.stateBeforeEntity = function (c) {
        // Start excess with 1 to include the '&'
        this.entityExcess = 1;
        this.entityResult = 0;
        if (c === CharCodes.Number) {
            this.state = State.BeforeNumericEntity;
        }
        else if (c === CharCodes.Amp) {
            // We have two `&` characters in a row. Stay in the current state.
        }
        else {
            this.trieIndex = 0;
            this.trieCurrent = this.entityTrie[0];
            this.state = State.InNamedEntity;
            this.stateInNamedEntity(c);
        }
    };
    Tokenizer.prototype.stateInNamedEntity = function (c) {
        this.entityExcess += 1;
        this.trieIndex = (0, decode_js_1.determineBranch)(this.entityTrie, this.trieCurrent, this.trieIndex + 1, c);
        if (this.trieIndex < 0) {
            this.emitNamedEntity();
            this.index--;
            return;
        }
        this.trieCurrent = this.entityTrie[this.trieIndex];
        var masked = this.trieCurrent & decode_js_1.BinTrieFlags.VALUE_LENGTH;
        // If the branch is a value, store it and continue
        if (masked) {
            // The mask is the number of bytes of the value, including the current byte.
            var valueLength = (masked >> 14) - 1;
            // If we have a legacy entity while parsing strictly, just skip the number of bytes
            if (!this.allowLegacyEntity() && c !== CharCodes.Semi) {
                this.trieIndex += valueLength;
            }
            else {
                // Add 1 as we have already incremented the excess
                var entityStart = this.index - this.entityExcess + 1;
                if (entityStart > this.sectionStart) {
                    this.emitPartial(this.sectionStart, entityStart);
                }
                // If this is a surrogate pair, consume the next two bytes
                this.entityResult = this.trieIndex;
                this.trieIndex += valueLength;
                this.entityExcess = 0;
                this.sectionStart = this.index + 1;
                if (valueLength === 0) {
                    this.emitNamedEntity();
                }
            }
        }
    };
    Tokenizer.prototype.emitNamedEntity = function () {
        this.state = this.baseState;
        if (this.entityResult === 0) {
            return;
        }
        var valueLength = (this.entityTrie[this.entityResult] & decode_js_1.BinTrieFlags.VALUE_LENGTH) >>
            14;
        switch (valueLength) {
            case 1: {
                this.emitCodePoint(this.entityTrie[this.entityResult] &
                    ~decode_js_1.BinTrieFlags.VALUE_LENGTH);
                break;
            }
            case 2: {
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                break;
            }
            case 3: {
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
            }
        }
    };
    Tokenizer.prototype.stateBeforeNumericEntity = function (c) {
        if ((c | 0x20) === CharCodes.LowerX) {
            this.entityExcess++;
            this.state = State.InHexEntity;
        }
        else {
            this.state = State.InNumericEntity;
            this.stateInNumericEntity(c);
        }
    };
    Tokenizer.prototype.emitNumericEntity = function (strict) {
        var entityStart = this.index - this.entityExcess - 1;
        var numberStart = entityStart + 2 + Number(this.state === State.InHexEntity);
        if (numberStart !== this.index) {
            // Emit leading data if any
            if (entityStart > this.sectionStart) {
                this.emitPartial(this.sectionStart, entityStart);
            }
            this.sectionStart = this.index + Number(strict);
            this.emitCodePoint((0, decode_js_1.replaceCodePoint)(this.entityResult));
        }
        this.state = this.baseState;
    };
    Tokenizer.prototype.stateInNumericEntity = function (c) {
        if (c === CharCodes.Semi) {
            this.emitNumericEntity(true);
        }
        else if (isNumber(c)) {
            this.entityResult = this.entityResult * 10 + (c - CharCodes.Zero);
            this.entityExcess++;
        }
        else {
            if (this.allowLegacyEntity()) {
                this.emitNumericEntity(false);
            }
            else {
                this.state = this.baseState;
            }
            this.index--;
        }
    };
    Tokenizer.prototype.stateInHexEntity = function (c) {
        if (c === CharCodes.Semi) {
            this.emitNumericEntity(true);
        }
        else if (isNumber(c)) {
            this.entityResult = this.entityResult * 16 + (c - CharCodes.Zero);
            this.entityExcess++;
        }
        else if (isHexDigit(c)) {
            this.entityResult =
                this.entityResult * 16 + ((c | 0x20) - CharCodes.LowerA + 10);
            this.entityExcess++;
        }
        else {
            if (this.allowLegacyEntity()) {
                this.emitNumericEntity(false);
            }
            else {
                this.state = this.baseState;
            }
            this.index--;
        }
    };
    Tokenizer.prototype.allowLegacyEntity = function () {
        return (!this.xmlMode &&
            (this.baseState === State.Text ||
                this.baseState === State.InSpecialTag));
    };
    /**
     * Remove data that has already been consumed from the buffer.
     */
    Tokenizer.prototype.cleanup = function () {
        // If we are inside of text or attributes, emit what we already have.
        if (this.running && this.sectionStart !== this.index) {
            if (this.state === State.Text ||
                (this.state === State.InSpecialTag && this.sequenceIndex === 0)) {
                this.cbs.ontext(this.sectionStart, this.index);
                this.sectionStart = this.index;
            }
            else if (this.state === State.InAttributeValueDq ||
                this.state === State.InAttributeValueSq ||
                this.state === State.InAttributeValueNq) {
                this.cbs.onattribdata(this.sectionStart, this.index);
                this.sectionStart = this.index;
            }
        }
    };
    Tokenizer.prototype.shouldContinue = function () {
        return this.index < this.buffer.length + this.offset && this.running;
    };
    /**
     * Iterates through the buffer, calling the function corresponding to the current state.
     *
     * States that are more likely to be hit are higher up, as a performance improvement.
     */
    Tokenizer.prototype.parse = function () {
        while (this.shouldContinue()) {
            var c = this.buffer.charCodeAt(this.index - this.offset);
            switch (this.state) {
                case State.Text: {
                    this.stateText(c);
                    break;
                }
                case State.SpecialStartSequence: {
                    this.stateSpecialStartSequence(c);
                    break;
                }
                case State.InSpecialTag: {
                    this.stateInSpecialTag(c);
                    break;
                }
                case State.CDATASequence: {
                    this.stateCDATASequence(c);
                    break;
                }
                case State.InAttributeValueDq: {
                    this.stateInAttributeValueDoubleQuotes(c);
                    break;
                }
                case State.InAttributeName: {
                    this.stateInAttributeName(c);
                    break;
                }
                case State.InCommentLike: {
                    this.stateInCommentLike(c);
                    break;
                }
                case State.InSpecialComment: {
                    this.stateInSpecialComment(c);
                    break;
                }
                case State.BeforeAttributeName: {
                    this.stateBeforeAttributeName(c);
                    break;
                }
                case State.InTagName: {
                    this.stateInTagName(c);
                    break;
                }
                case State.InClosingTagName: {
                    this.stateInClosingTagName(c);
                    break;
                }
                case State.BeforeTagName: {
                    this.stateBeforeTagName(c);
                    break;
                }
                case State.AfterAttributeName: {
                    this.stateAfterAttributeName(c);
                    break;
                }
                case State.InAttributeValueSq: {
                    this.stateInAttributeValueSingleQuotes(c);
                    break;
                }
                case State.BeforeAttributeValue: {
                    this.stateBeforeAttributeValue(c);
                    break;
                }
                case State.BeforeClosingTagName: {
                    this.stateBeforeClosingTagName(c);
                    break;
                }
                case State.AfterClosingTagName: {
                    this.stateAfterClosingTagName(c);
                    break;
                }
                case State.BeforeSpecialS: {
                    this.stateBeforeSpecialS(c);
                    break;
                }
                case State.InAttributeValueNq: {
                    this.stateInAttributeValueNoQuotes(c);
                    break;
                }
                case State.InSelfClosingTag: {
                    this.stateInSelfClosingTag(c);
                    break;
                }
                case State.InDeclaration: {
                    this.stateInDeclaration(c);
                    break;
                }
                case State.BeforeDeclaration: {
                    this.stateBeforeDeclaration(c);
                    break;
                }
                case State.BeforeComment: {
                    this.stateBeforeComment(c);
                    break;
                }
                case State.InProcessingInstruction: {
                    this.stateInProcessingInstruction(c);
                    break;
                }
                case State.InNamedEntity: {
                    this.stateInNamedEntity(c);
                    break;
                }
                case State.BeforeEntity: {
                    this.stateBeforeEntity(c);
                    break;
                }
                case State.InHexEntity: {
                    this.stateInHexEntity(c);
                    break;
                }
                case State.InNumericEntity: {
                    this.stateInNumericEntity(c);
                    break;
                }
                default: {
                    // `this._state === State.BeforeNumericEntity`
                    this.stateBeforeNumericEntity(c);
                }
            }
            this.index++;
        }
        this.cleanup();
    };
    Tokenizer.prototype.finish = function () {
        if (this.state === State.InNamedEntity) {
            this.emitNamedEntity();
        }
        // If there is remaining data, emit it in a reasonable way
        if (this.sectionStart < this.index) {
            this.handleTrailingData();
        }
        this.cbs.onend();
    };
    /** Handle any trailing data. */
    Tokenizer.prototype.handleTrailingData = function () {
        var endIndex = this.buffer.length + this.offset;
        if (this.state === State.InCommentLike) {
            if (this.currentSequence === Sequences.CdataEnd) {
                this.cbs.oncdata(this.sectionStart, endIndex, 0);
            }
            else {
                this.cbs.oncomment(this.sectionStart, endIndex, 0);
            }
        }
        else if (this.state === State.InNumericEntity &&
            this.allowLegacyEntity()) {
            this.emitNumericEntity(false);
            // All trailing data will have been consumed
        }
        else if (this.state === State.InHexEntity &&
            this.allowLegacyEntity()) {
            this.emitNumericEntity(false);
            // All trailing data will have been consumed
        }
        else if (this.state === State.InTagName ||
            this.state === State.BeforeAttributeName ||
            this.state === State.BeforeAttributeValue ||
            this.state === State.AfterAttributeName ||
            this.state === State.InAttributeName ||
            this.state === State.InAttributeValueSq ||
            this.state === State.InAttributeValueDq ||
            this.state === State.InAttributeValueNq ||
            this.state === State.InClosingTagName) {
            /*
             * If we are currently in an opening or closing tag, us not calling the
             * respective callback signals that the tag should be ignored.
             */
        }
        else {
            this.cbs.ontext(this.sectionStart, endIndex);
        }
    };
    Tokenizer.prototype.emitPartial = function (start, endIndex) {
        if (this.baseState !== State.Text &&
            this.baseState !== State.InSpecialTag) {
            this.cbs.onattribdata(start, endIndex);
        }
        else {
            this.cbs.ontext(start, endIndex);
        }
    };
    Tokenizer.prototype.emitCodePoint = function (cp) {
        if (this.baseState !== State.Text &&
            this.baseState !== State.InSpecialTag) {
            this.cbs.onattribentity(cp);
        }
        else {
            this.cbs.ontextentity(cp);
        }
    };
    return Tokenizer;
}());
exports["default"] = Tokenizer;
//# sourceMappingURL=Tokenizer.js.map

/***/ }),

/***/ "./node_modules/htmlparser2/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/htmlparser2/lib/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomUtils = exports.parseFeed = exports.getFeed = exports.ElementType = exports.Tokenizer = exports.createDomStream = exports.parseDOM = exports.parseDocument = exports.DefaultHandler = exports.DomHandler = exports.Parser = void 0;
var Parser_js_1 = __webpack_require__(/*! ./Parser.js */ "./node_modules/htmlparser2/lib/Parser.js");
var Parser_js_2 = __webpack_require__(/*! ./Parser.js */ "./node_modules/htmlparser2/lib/Parser.js");
Object.defineProperty(exports, "Parser", ({ enumerable: true, get: function () { return Parser_js_2.Parser; } }));
var domhandler_1 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
var domhandler_2 = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
Object.defineProperty(exports, "DomHandler", ({ enumerable: true, get: function () { return domhandler_2.DomHandler; } }));
// Old name for DomHandler
Object.defineProperty(exports, "DefaultHandler", ({ enumerable: true, get: function () { return domhandler_2.DomHandler; } }));
// Helper methods
/**
 * Parses the data, returns the resulting document.
 *
 * @param data The data that should be parsed.
 * @param options Optional options for the parser and DOM builder.
 */
function parseDocument(data, options) {
    var handler = new domhandler_1.DomHandler(undefined, options);
    new Parser_js_1.Parser(handler, options).end(data);
    return handler.root;
}
exports.parseDocument = parseDocument;
/**
 * Parses data, returns an array of the root nodes.
 *
 * Note that the root nodes still have a `Document` node as their parent.
 * Use `parseDocument` to get the `Document` node instead.
 *
 * @param data The data that should be parsed.
 * @param options Optional options for the parser and DOM builder.
 * @deprecated Use `parseDocument` instead.
 */
function parseDOM(data, options) {
    return parseDocument(data, options).children;
}
exports.parseDOM = parseDOM;
/**
 * Creates a parser instance, with an attached DOM handler.
 *
 * @param callback A callback that will be called once parsing has been completed.
 * @param options Optional options for the parser and DOM builder.
 * @param elementCallback An optional callback that will be called every time a tag has been completed inside of the DOM.
 */
function createDomStream(callback, options, elementCallback) {
    var handler = new domhandler_1.DomHandler(callback, options, elementCallback);
    return new Parser_js_1.Parser(handler, options);
}
exports.createDomStream = createDomStream;
var Tokenizer_js_1 = __webpack_require__(/*! ./Tokenizer.js */ "./node_modules/htmlparser2/lib/Tokenizer.js");
Object.defineProperty(exports, "Tokenizer", ({ enumerable: true, get: function () { return __importDefault(Tokenizer_js_1).default; } }));
/*
 * All of the following exports exist for backwards-compatibility.
 * They should probably be removed eventually.
 */
exports.ElementType = __importStar(__webpack_require__(/*! domelementtype */ "./node_modules/domelementtype/lib/index.js"));
var domutils_1 = __webpack_require__(/*! domutils */ "./node_modules/domutils/lib/index.js");
var domutils_2 = __webpack_require__(/*! domutils */ "./node_modules/domutils/lib/index.js");
Object.defineProperty(exports, "getFeed", ({ enumerable: true, get: function () { return domutils_2.getFeed; } }));
var parseFeedDefaultOptions = { xmlMode: true };
/**
 * Parse a feed.
 *
 * @param feed The feed that should be parsed, as a string.
 * @param options Optionally, options for parsing. When using this, you should set `xmlMode` to `true`.
 */
function parseFeed(feed, options) {
    if (options === void 0) { options = parseFeedDefaultOptions; }
    return (0, domutils_1.getFeed)(parseDOM(feed, options));
}
exports.parseFeed = parseFeed;
exports.DomUtils = __importStar(__webpack_require__(/*! domutils */ "./node_modules/domutils/lib/index.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

﻿module.exports = __webpack_require__(/*! ./lda */ "./node_modules/ldawithmorelanguages/lib/lda.js");

/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/lda.js":
/*!******************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/lda.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var stem = __webpack_require__(/*! stem-porter */ "./node_modules/stem-porter/index.js");

//
// Based on javascript implementation https://github.com/awaisathar/lda.js
// Original code based on http://www.arbylon.net/projects/LdaGibbsSampler.java
//
var process = function(sentences, numberOfTopics, numberOfTermsPerTopic, languages, alphaValue, betaValue, randomSeed) {
    // The result will consist of topics and their included terms [[{"term":"word1", "probability":0.065}, {"term":"word2", "probability":0.047}, ... ], [{"term":"word1", "probability":0.085}, {"term":"word2", "probability":0.024}, ... ]].
    var result = [];
    // Index-encoded array of sentences, with each row containing the indices of the words in the vocabulary.
    var documents = new Array();
    // Hash of vocabulary words and the count of how many times each word has been seen.
    var f = {};
    // Vocabulary of unique words (porter stemmed).
    var vocab=new Array();
    // Vocabulary of unique words in their original form.
    var vocabOrig = {};
    // Array of stop words
    languages = languages || Array('en');

    if (sentences && sentences.length > 0) {
      var stopwords = new Array();

      languages.forEach(function(value) {
          var stopwordsLang = __webpack_require__("./node_modules/ldawithmorelanguages/lib sync recursive ^\\.\\/stopwords_.*\\.js$")("./stopwords_" + value + ".js");
          stopwords = stopwords.concat(stopwordsLang.stop_words);
      });

      for(var i=0;i<sentences.length;i++) {
          if (sentences[i]=="") continue;
          documents[i] = new Array();

          var words = sentences[i] ? sentences[i].split(/[\s,\"]+/) : null;

          if(!words) continue;
          for(var wc=0;wc<words.length;wc++) {
              var w=words[wc].toLowerCase().replace(/[^a-z\'A-Z0-9\u00C0-\u00ff ]+/g, '');
              var wStemmed = stem(w);
              if (w=="" || !wStemmed || w.length==1 || stopwords.indexOf(w.replace("'", "")) > -1 || stopwords.indexOf(wStemmed) > -1 || w.indexOf("http")==0) continue;
              if (f[wStemmed]) { 
                  f[wStemmed]=f[wStemmed]+1;
              } 
              else if(wStemmed) { 
                  f[wStemmed]=1; 
                  vocab.push(wStemmed);
                  vocabOrig[wStemmed] = w;
              };
              
              documents[i].push(vocab.indexOf(wStemmed));
          }
      }

      var V = vocab.length;
      var M = documents.length;
      var K = parseInt(numberOfTopics);
      var alpha = alphaValue || 0.1;  // per-document distributions over topics
      var beta = betaValue || .01;  // per-topic distributions over words
      documents = documents.filter((doc) => { return doc.length }); // filter empty documents

      lda.configure(documents,V,10000, 2000, 100, 10, randomSeed);
      lda.gibbs(K, alpha, beta);

      var theta = lda.getTheta();
      var phi = lda.getPhi();

      var text = '';

      //topics
      var topTerms=numberOfTermsPerTopic;
      for (var k = 0; k < phi.length; k++) {
          var things = new Array();
          for (var w = 0; w < phi[k].length; w++) {
               things.push(""+phi[k][w].toPrecision(2)+"_"+vocab[w] + "_" + vocabOrig[vocab[w]]);
          }
          things.sort().reverse();
          //console.log(things);
          if(topTerms>vocab.length) topTerms=vocab.length;

          //console.log('Topic ' + (k + 1));
          var row = [];
          
          for (var t = 0; t < topTerms; t++) {
              var topicTerm=things[t].split("_")[2];
              var prob=parseInt(things[t].split("_")[0]*100);
              if (prob<2) continue;
              
              //console.log('Top Term: ' + topicTerm + ' (' + prob + '%)');
              
              var term = {};
              term.term = topicTerm;
              term.probability = parseFloat(things[t].split("_")[0]);
              row.push(term);
          }

          result.push(row);
      }
    }
    
    return result;
}

function makeArray(x) {
    var a = new Array();    
    for (var i=0;i<x;i++)  {
        a[i]=0;
    }
    return a;
}

function make2DArray(x,y) {
    var a = new Array();    
    for (var i=0;i<x;i++)  {
        a[i]=new Array();
        for (var j=0;j<y;j++)
            a[i][j]=0;
    }
    return a;
}

var lda = new function() {
    var documents,z,nw,nd,nwsum,ndsum,thetasum,phisum,V,K,alpha,beta; 
    var THIN_INTERVAL = 20;
    var BURN_IN = 100;
    var ITERATIONS = 1000;
    var SAMPLE_LAG;
    var RANDOM_SEED;
    var dispcol = 0;
    var numstats=0;
    this.configure = function (docs,v,iterations,burnIn,thinInterval,sampleLag,randomSeed) {
        this.ITERATIONS = iterations;
        this.BURN_IN = burnIn;
        this.THIN_INTERVAL = thinInterval;
        this.SAMPLE_LAG = sampleLag;
        this.RANDOM_SEED = randomSeed;
        this.documents = docs;
        this.V = v;
        this.dispcol=0;
        this.numstats=0; 
    }
    this.initialState = function (K) {
        var i;
        var M = this.documents.length;
        this.nw = make2DArray(this.V,K); 
        this.nd = make2DArray(M,K); 
        this.nwsum = makeArray(K); 
        this.ndsum = makeArray(M);
        this.z = new Array();   for (i=0;i<M;i++) this.z[i]=new Array();
        for (var m = 0; m < M; m++) {
                var N = this.documents[m].length;
                this.z[m] = new Array();
                for (var n = 0; n < N; n++) {
                    var topic = parseInt(""+(this.getRandom() * K));                 
                    this.z[m][n] = topic;
                    this.nw[this.documents[m][n]][topic]++;
                    this.nd[m][topic]++;
                    this.nwsum[topic]++;
                }
                this.ndsum[m] = N;
        }
    }
    
    this.gibbs = function (K,alpha,beta) {
        var i;
        this.K = K;
        this.alpha = alpha;
        this.beta = beta;
        if (this.SAMPLE_LAG > 0) {
            this.thetasum = make2DArray(this.documents.length,this.K);
            this.phisum = make2DArray(this.K,this.V);
            this.numstats = 0;
        }
        this.initialState(K);
        //document.write("Sampling " + this.ITERATIONS
         //   + " iterations with burn-in of " + this.BURN_IN + " (B/S="
         //   + this.THIN_INTERVAL + ").<br/>");
        for (i = 0; i < this.ITERATIONS; i++) {
            for (var m = 0; m < this.z.length; m++) {
                for (var n = 0; n < this.z[m].length; n++) {
                    var topic = this.sampleFullConditional(m, n);
                    this.z[m][n] = topic;
                }
            }
            if ((i < this.BURN_IN) && (i % this.THIN_INTERVAL == 0)) {
                //document.write("B");
                this.dispcol++;
            }
            if ((i > this.BURN_IN) && (i % this.THIN_INTERVAL == 0)) {
                //document.write("S");
                this.dispcol++;
            }
            if ((i > this.BURN_IN) && (this.SAMPLE_LAG > 0) && (i % this.SAMPLE_LAG == 0)) {
                this.updateParams();
                //document.write("|");                
                if (i % this.THIN_INTERVAL != 0)
                    this.dispcol++;
            }
            if (this.dispcol >= 100) {
                //document.write("*<br/>");                
                this.dispcol = 0;
            }
        }
    }
    
    this.sampleFullConditional = function(m,n) {
        var topic = this.z[m][n];
        this.nw[this.documents[m][n]][topic]--;
        this.nd[m][topic]--;
        this.nwsum[topic]--;
        this.ndsum[m]--;
        var p = makeArray(this.K);
        for (var k = 0; k < this.K; k++) {
            p[k] = (this.nw[this.documents[m][n]][k] + this.beta) / (this.nwsum[k] + this.V * this.beta)
                * (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
        }
        for (var k = 1; k < p.length; k++) {
            p[k] += p[k - 1];
        }
        var u = this.getRandom() * p[this.K - 1];
        for (topic = 0; topic < p.length; topic++) {
            if (u < p[topic])
                break;
        }
        this.nw[this.documents[m][n]][topic]++;
        this.nd[m][topic]++;
        this.nwsum[topic]++;
        this.ndsum[m]++;
        return topic;
    }
    
    this.updateParams =function () {
        for (var m = 0; m < this.documents.length; m++) {
            for (var k = 0; k < this.K; k++) {
                this.thetasum[m][k] += (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
            }
        }
        for (var k = 0; k < this.K; k++) {
            for (var w = 0; w < this.V; w++) {
                this.phisum[k][w] += (this.nw[w][k] + this.beta) / (this.nwsum[k] + this.V * this.beta);
            }
        }
        this.numstats++;
    }
    
    this.getTheta = function() {
        var theta = new Array(); for(var i=0;i<this.documents.length;i++) theta[i] = new Array();
        if (this.SAMPLE_LAG > 0) {
            for (var m = 0; m < this.documents.length; m++) {
                for (var k = 0; k < this.K; k++) {
                    theta[m][k] = this.thetasum[m][k] / this.numstats;
                }
            }
        } else {
            for (var m = 0; m < this.documents.length; m++) {
                for (var k = 0; k < this.K; k++) {
                    theta[m][k] = (this.nd[m][k] + this.alpha) / (this.ndsum[m] + this.K * this.alpha);
                }
            }
        }
        return theta;
    }
    
    this.getPhi = function () {
        var phi = new Array(); for(var i=0;i<this.K;i++) phi[i] = new Array();
        if (this.SAMPLE_LAG > 0) {
            for (var k = 0; k < this.K; k++) {
                for (var w = 0; w < this.V; w++) {
                    phi[k][w] = this.phisum[k][w] / this.numstats;
                }
            }
        } else {
            for (var k = 0; k < this.K; k++) {
                for (var w = 0; w < this.V; w++) {
                    phi[k][w] = (this.nw[w][k] + this.beta) / (this.nwsum[k] + this.V * this.beta);
                }
            }
        }
        return phi;
    }

    this.getRandom = function() {
        if (this.RANDOM_SEED) {
            // generate a pseudo-random number using a seed to ensure reproducable results.
            var x = Math.sin(this.RANDOM_SEED++) * 1000000;
            return x - Math.floor(x);
        } else {
            // use standard random algorithm.
            return Math.random();
        }
    }
}

module.exports = process;


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_af.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_af.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "'n",
    "aan",
    "af",
    "al",
    "as",
    "baie",
    "by",
    "daar",
    "dag",
    "dat",
    "die",
    "dit",
    "een",
    "ek",
    "en",
    "gaan",
    "gesê",
    "haar",
    "het",
    "hom",
    "hulle",
    "hy",
    "in",
    "is",
    "jou",
    "jy",
    "kan",
    "kom",
    "ma",
    "maar",
    "met",
    "my",
    "na",
    "nie",
    "om",
    "ons",
    "op",
    "saam",
    "sal",
    "se",
    "sien",
    "so",
    "sy",
    "te",
    "toe",
    "uit",
    "van",
    "vir",
    "was",
    "wat",
    "ŉ"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ar.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ar.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "،",
    "آض",
    "آمينَ",
    "آه",
    "آهاً",
    "آي",
    "أ",
    "أب",
    "أجل",
    "أجمع",
    "أخ",
    "أخذ",
    "أصبح",
    "أضحى",
    "أقبل",
    "أقل",
    "أكثر",
    "ألا",
    "أم",
    "أما",
    "أمامك",
    "أمامكَ",
    "أمسى",
    "أمّا",
    "أن",
    "أنا",
    "أنت",
    "أنتم",
    "أنتما",
    "أنتن",
    "أنتِ",
    "أنشأ",
    "أنّى",
    "أو",
    "أوشك",
    "أولئك",
    "أولئكم",
    "أولاء",
    "أولالك",
    "أوّهْ",
    "أي",
    "أيا",
    "أين",
    "أينما",
    "أيّ",
    "أَنَّ",
    "أََيُّ",
    "أُفٍّ",
    "إذ",
    "إذا",
    "إذاً",
    "إذما",
    "إذن",
    "إلى",
    "إليكم",
    "إليكما",
    "إليكنّ",
    "إليكَ",
    "إلَيْكَ",
    "إلّا",
    "إمّا",
    "إن",
    "إنّما",
    "إي",
    "إياك",
    "إياكم",
    "إياكما",
    "إياكن",
    "إيانا",
    "إياه",
    "إياها",
    "إياهم",
    "إياهما",
    "إياهن",
    "إياي",
    "إيهٍ",
    "إِنَّ",
    "ا",
    "ابتدأ",
    "اثر",
    "اجل",
    "احد",
    "اخرى",
    "اخلولق",
    "اذا",
    "اربعة",
    "ارتدّ",
    "استحال",
    "اطار",
    "اعادة",
    "اعلنت",
    "اف",
    "اكثر",
    "اكد",
    "الألاء",
    "الألى",
    "الا",
    "الاخيرة",
    "الان",
    "الاول",
    "الاولى",
    "التى",
    "التي",
    "الثاني",
    "الثانية",
    "الذاتي",
    "الذى",
    "الذي",
    "الذين",
    "السابق",
    "الف",
    "اللائي",
    "اللاتي",
    "اللتان",
    "اللتيا",
    "اللتين",
    "اللذان",
    "اللذين",
    "اللواتي",
    "الماضي",
    "المقبل",
    "الوقت",
    "الى",
    "اليوم",
    "اما",
    "امام",
    "امس",
    "ان",
    "انبرى",
    "انقلب",
    "انه",
    "انها",
    "او",
    "اول",
    "اي",
    "ايار",
    "ايام",
    "ايضا",
    "ب",
    "بات",
    "باسم",
    "بان",
    "بخٍ",
    "برس",
    "بسبب",
    "بسّ",
    "بشكل",
    "بضع",
    "بطآن",
    "بعد",
    "بعض",
    "بك",
    "بكم",
    "بكما",
    "بكن",
    "بل",
    "بلى",
    "بما",
    "بماذا",
    "بمن",
    "بن",
    "بنا",
    "به",
    "بها",
    "بي",
    "بيد",
    "بين",
    "بَسْ",
    "بَلْهَ",
    "بِئْسَ",
    "تانِ",
    "تانِك",
    "تبدّل",
    "تجاه",
    "تحوّل",
    "تلقاء",
    "تلك",
    "تلكم",
    "تلكما",
    "تم",
    "تينك",
    "تَيْنِ",
    "تِه",
    "تِي",
    "ثلاثة",
    "ثم",
    "ثمّ",
    "ثمّة",
    "ثُمَّ",
    "جعل",
    "جلل",
    "جميع",
    "جير",
    "حار",
    "حاشا",
    "حاليا",
    "حاي",
    "حتى",
    "حرى",
    "حسب",
    "حم",
    "حوالى",
    "حول",
    "حيث",
    "حيثما",
    "حين",
    "حيَّ",
    "حَبَّذَا",
    "حَتَّى",
    "حَذارِ",
    "خلا",
    "خلال",
    "دون",
    "دونك",
    "ذا",
    "ذات",
    "ذاك",
    "ذانك",
    "ذانِ",
    "ذلك",
    "ذلكم",
    "ذلكما",
    "ذلكن",
    "ذو",
    "ذوا",
    "ذواتا",
    "ذواتي",
    "ذيت",
    "ذينك",
    "ذَيْنِ",
    "ذِه",
    "ذِي",
    "راح",
    "رجع",
    "رويدك",
    "ريث",
    "رُبَّ",
    "زيارة",
    "سبحان",
    "سرعان",
    "سنة",
    "سنوات",
    "سوف",
    "سوى",
    "سَاءَ",
    "سَاءَمَا",
    "شبه",
    "شخصا",
    "شرع",
    "شَتَّانَ",
    "صار",
    "صباح",
    "صفر",
    "صهٍ",
    "صهْ",
    "ضد",
    "ضمن",
    "طاق",
    "طالما",
    "طفق",
    "طَق",
    "ظلّ",
    "عاد",
    "عام",
    "عاما",
    "عامة",
    "عدا",
    "عدة",
    "عدد",
    "عدم",
    "عسى",
    "عشر",
    "عشرة",
    "علق",
    "على",
    "عليك",
    "عليه",
    "عليها",
    "علًّ",
    "عن",
    "عند",
    "عندما",
    "عوض",
    "عين",
    "عَدَسْ",
    "عَمَّا",
    "غدا",
    "غير",
    "ـ",
    "ف",
    "فان",
    "فلان",
    "فو",
    "فى",
    "في",
    "فيم",
    "فيما",
    "فيه",
    "فيها",
    "قال",
    "قام",
    "قبل",
    "قد",
    "قطّ",
    "قلما",
    "قوة",
    "كأنّما",
    "كأين",
    "كأيّ",
    "كأيّن",
    "كاد",
    "كان",
    "كانت",
    "كذا",
    "كذلك",
    "كرب",
    "كل",
    "كلا",
    "كلاهما",
    "كلتا",
    "كلم",
    "كليكما",
    "كليهما",
    "كلّما",
    "كلَّا",
    "كم",
    "كما",
    "كي",
    "كيت",
    "كيف",
    "كيفما",
    "كَأَنَّ",
    "كِخ",
    "لئن",
    "لا",
    "لات",
    "لاسيما",
    "لدن",
    "لدى",
    "لعمر",
    "لقاء",
    "لك",
    "لكم",
    "لكما",
    "لكن",
    "لكنَّما",
    "لكي",
    "لكيلا",
    "للامم",
    "لم",
    "لما",
    "لمّا",
    "لن",
    "لنا",
    "له",
    "لها",
    "لو",
    "لوكالة",
    "لولا",
    "لوما",
    "لي",
    "لَسْتَ",
    "لَسْتُ",
    "لَسْتُم",
    "لَسْتُمَا",
    "لَسْتُنَّ",
    "لَسْتِ",
    "لَسْنَ",
    "لَعَلَّ",
    "لَكِنَّ",
    "لَيْتَ",
    "لَيْسَ",
    "لَيْسَا",
    "لَيْسَتَا",
    "لَيْسَتْ",
    "لَيْسُوا",
    "لَِسْنَا",
    "ما",
    "ماانفك",
    "مابرح",
    "مادام",
    "ماذا",
    "مازال",
    "مافتئ",
    "مايو",
    "متى",
    "مثل",
    "مذ",
    "مساء",
    "مع",
    "معاذ",
    "مقابل",
    "مكانكم",
    "مكانكما",
    "مكانكنّ",
    "مكانَك",
    "مليار",
    "مليون",
    "مما",
    "ممن",
    "من",
    "منذ",
    "منها",
    "مه",
    "مهما",
    "مَنْ",
    "مِن",
    "نحن",
    "نحو",
    "نعم",
    "نفس",
    "نفسه",
    "نهاية",
    "نَخْ",
    "نِعِمّا",
    "نِعْمَ",
    "ها",
    "هاؤم",
    "هاكَ",
    "هاهنا",
    "هبّ",
    "هذا",
    "هذه",
    "هكذا",
    "هل",
    "هلمَّ",
    "هلّا",
    "هم",
    "هما",
    "هن",
    "هنا",
    "هناك",
    "هنالك",
    "هو",
    "هي",
    "هيا",
    "هيت",
    "هيّا",
    "هَؤلاء",
    "هَاتانِ",
    "هَاتَيْنِ",
    "هَاتِه",
    "هَاتِي",
    "هَجْ",
    "هَذا",
    "هَذانِ",
    "هَذَيْنِ",
    "هَذِه",
    "هَذِي",
    "هَيْهَاتَ",
    "و",
    "و6",
    "وا",
    "واحد",
    "واضاف",
    "واضافت",
    "واكد",
    "وان",
    "واهاً",
    "واوضح",
    "وراءَك",
    "وفي",
    "وقال",
    "وقالت",
    "وقد",
    "وقف",
    "وكان",
    "وكانت",
    "ولا",
    "ولم",
    "ومن",
    "وهو",
    "وهي",
    "ويكأنّ",
    "وَيْ",
    "وُشْكَانََ",
    "يكون",
    "يمكن",
    "يوم",
    "ّأيّان"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_bg.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_bg.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "а",
    "автентичен",
    "аз",
    "ако",
    "ала",
    "бе",
    "без",
    "беше",
    "би",
    "бивш",
    "бивша",
    "бившо",
    "бил",
    "била",
    "били",
    "било",
    "благодаря",
    "близо",
    "бъдат",
    "бъде",
    "бяха",
    "в",
    "вас",
    "ваш",
    "ваша",
    "вероятно",
    "вече",
    "взема",
    "ви",
    "вие",
    "винаги",
    "внимава",
    "време",
    "все",
    "всеки",
    "всички",
    "всичко",
    "всяка",
    "във",
    "въпреки",
    "върху",
    "г",
    "ги",
    "главен",
    "главна",
    "главно",
    "глас",
    "го",
    "година",
    "години",
    "годишен",
    "д",
    "да",
    "дали",
    "два",
    "двама",
    "двамата",
    "две",
    "двете",
    "ден",
    "днес",
    "дни",
    "до",
    "добра",
    "добре",
    "добро",
    "добър",
    "докато",
    "докога",
    "дори",
    "досега",
    "доста",
    "друг",
    "друга",
    "други",
    "е",
    "евтин",
    "едва",
    "един",
    "една",
    "еднаква",
    "еднакви",
    "еднакъв",
    "едно",
    "екип",
    "ето",
    "живот",
    "за",
    "забавям",
    "зад",
    "заедно",
    "заради",
    "засега",
    "заспал",
    "затова",
    "защо",
    "защото",
    "и",
    "из",
    "или",
    "им",
    "има",
    "имат",
    "иска",
    "й",
    "каза",
    "как",
    "каква",
    "какво",
    "както",
    "какъв",
    "като",
    "кога",
    "когато",
    "което",
    "които",
    "кой",
    "който",
    "колко",
    "която",
    "къде",
    "където",
    "към",
    "лесен",
    "лесно",
    "ли",
    "лош",
    "м",
    "май",
    "малко",
    "ме",
    "между",
    "мек",
    "мен",
    "месец",
    "ми",
    "много",
    "мнозина",
    "мога",
    "могат",
    "може",
    "мокър",
    "моля",
    "момента",
    "му",
    "н",
    "на",
    "над",
    "назад",
    "най",
    "направи",
    "напред",
    "например",
    "нас",
    "не",
    "него",
    "нещо",
    "нея",
    "ни",
    "ние",
    "никой",
    "нито",
    "нищо",
    "но",
    "нов",
    "нова",
    "нови",
    "новина",
    "някои",
    "някой",
    "няколко",
    "няма",
    "обаче",
    "около",
    "освен",
    "особено",
    "от",
    "отгоре",
    "отново",
    "още",
    "пак",
    "по",
    "повече",
    "повечето",
    "под",
    "поне",
    "поради",
    "после",
    "почти",
    "прави",
    "пред",
    "преди",
    "през",
    "при",
    "пък",
    "първата",
    "първи",
    "първо",
    "пъти",
    "равен",
    "равна",
    "с",
    "са",
    "сам",
    "само",
    "се",
    "сега",
    "си",
    "син",
    "скоро",
    "след",
    "следващ",
    "сме",
    "смях",
    "според",
    "сред",
    "срещу",
    "сте",
    "съм",
    "със",
    "също",
    "т",
    "т.н.",
    "тази",
    "така",
    "такива",
    "такъв",
    "там",
    "твой",
    "те",
    "тези",
    "ти",
    "то",
    "това",
    "тогава",
    "този",
    "той",
    "толкова",
    "точно",
    "три",
    "трябва",
    "тук",
    "тъй",
    "тя",
    "тях",
    "у",
    "утре",
    "харесва",
    "хиляди",
    "ч",
    "часа",
    "че",
    "често",
    "чрез",
    "ще",
    "щом",
    "юмрук",
    "я",
    "як"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_bn.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_bn.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "অতএব",
    "অথচ",
    "অথবা",
    "অনুযায়ী",
    "অনেক",
    "অনেকে",
    "অনেকেই",
    "অন্তত",
    "অন্য",
    "অবধি",
    "অবশ্য",
    "অর্থাত",
    "আই",
    "আগামী",
    "আগে",
    "আগেই",
    "আছে",
    "আজ",
    "আদ্যভাগে",
    "আপনার",
    "আপনি",
    "আবার",
    "আমরা",
    "আমাকে",
    "আমাদের",
    "আমার",
    "আমি",
    "আর",
    "আরও",
    "ই",
    "ইত্যাদি",
    "ইহা",
    "উচিত",
    "উত্তর",
    "উনি",
    "উপর",
    "উপরে",
    "এ",
    "এঁদের",
    "এঁরা",
    "এই",
    "একই",
    "একটি",
    "একবার",
    "একে",
    "এক্",
    "এখন",
    "এখনও",
    "এখানে",
    "এখানেই",
    "এটা",
    "এটাই",
    "এটি",
    "এত",
    "এতটাই",
    "এতে",
    "এদের",
    "এব",
    "এবং",
    "এবার",
    "এমন",
    "এমনকী",
    "এমনি",
    "এর",
    "এরা",
    "এল",
    "এস",
    "এসে",
    "ঐ",
    "ও",
    "ওঁদের",
    "ওঁর",
    "ওঁরা",
    "ওই",
    "ওকে",
    "ওখানে",
    "ওদের",
    "ওর",
    "ওরা",
    "কখনও",
    "কত",
    "কবে",
    "কমনে",
    "কয়েক",
    "কয়েকটি",
    "করছে",
    "করছেন",
    "করতে",
    "করবে",
    "করবেন",
    "করলে",
    "করলেন",
    "করা",
    "করাই",
    "করায়",
    "করার",
    "করি",
    "করিতে",
    "করিয়া",
    "করিয়ে",
    "করে",
    "করেই",
    "করেছিলেন",
    "করেছে",
    "করেছেন",
    "করেন",
    "কাউকে",
    "কাছ",
    "কাছে",
    "কাজ",
    "কাজে",
    "কারও",
    "কারণ",
    "কি",
    "কিংবা",
    "কিছু",
    "কিছুই",
    "কিন্তু",
    "কী",
    "কে",
    "কেউ",
    "কেউই",
    "কেখা",
    "কেন",
    "কোটি",
    "কোন",
    "কোনও",
    "কোনো",
    "ক্ষেত্রে",
    "কয়েক",
    "খুব",
    "গিয়ে",
    "গিয়েছে",
    "গিয়ে",
    "গুলি",
    "গেছে",
    "গেল",
    "গেলে",
    "গোটা",
    "চলে",
    "চান",
    "চায়",
    "চার",
    "চালু",
    "চেয়ে",
    "চেষ্টা",
    "ছাড়া",
    "ছাড়াও",
    "ছিল",
    "ছিলেন",
    "জন",
    "জনকে",
    "জনের",
    "জন্য",
    "জন্যওজে",
    "জানতে",
    "জানা",
    "জানানো",
    "জানায়",
    "জানিয়ে",
    "জানিয়েছে",
    "জে",
    "জ্নজন",
    "টি",
    "ঠিক",
    "তখন",
    "তত",
    "তথা",
    "তবু",
    "তবে",
    "তা",
    "তাঁকে",
    "তাঁদের",
    "তাঁর",
    "তাঁরা",
    "তাঁাহারা",
    "তাই",
    "তাও",
    "তাকে",
    "তাতে",
    "তাদের",
    "তার",
    "তারপর",
    "তারা",
    "তারৈ",
    "তাহলে",
    "তাহা",
    "তাহাতে",
    "তাহার",
    "তিনঐ",
    "তিনি",
    "তিনিও",
    "তুমি",
    "তুলে",
    "তেমন",
    "তো",
    "তোমার",
    "থাকবে",
    "থাকবেন",
    "থাকা",
    "থাকায়",
    "থাকে",
    "থাকেন",
    "থেকে",
    "থেকেই",
    "থেকেও",
    "দিকে",
    "দিতে",
    "দিন",
    "দিয়ে",
    "দিয়েছে",
    "দিয়েছেন",
    "দিলেন",
    "দু",
    "দুই",
    "দুটি",
    "দুটো",
    "দেওয়া",
    "দেওয়ার",
    "দেওয়া",
    "দেখতে",
    "দেখা",
    "দেখে",
    "দেন",
    "দেয়",
    "দ্বারা",
    "ধরা",
    "ধরে",
    "ধামার",
    "নতুন",
    "নয়",
    "না",
    "নাই",
    "নাকি",
    "নাগাদ",
    "নানা",
    "নিজে",
    "নিজেই",
    "নিজেদের",
    "নিজের",
    "নিতে",
    "নিয়ে",
    "নিয়ে",
    "নেই",
    "নেওয়া",
    "নেওয়ার",
    "নেওয়া",
    "নয়",
    "পক্ষে",
    "পর",
    "পরে",
    "পরেই",
    "পরেও",
    "পর্যন্ত",
    "পাওয়া",
    "পাচ",
    "পারি",
    "পারে",
    "পারেন",
    "পি",
    "পেয়ে",
    "পেয়্র্",
    "প্রতি",
    "প্রথম",
    "প্রভৃতি",
    "প্রযন্ত",
    "প্রাথমিক",
    "প্রায়",
    "প্রায়",
    "ফলে",
    "ফিরে",
    "ফের",
    "বক্তব্য",
    "বদলে",
    "বন",
    "বরং",
    "বলতে",
    "বলল",
    "বললেন",
    "বলা",
    "বলে",
    "বলেছেন",
    "বলেন",
    "বসে",
    "বহু",
    "বা",
    "বাদে",
    "বার",
    "বি",
    "বিনা",
    "বিভিন্ন",
    "বিশেষ",
    "বিষয়টি",
    "বেশ",
    "বেশি",
    "ব্যবহার",
    "ব্যাপারে",
    "ভাবে",
    "ভাবেই",
    "মতো",
    "মতোই",
    "মধ্যভাগে",
    "মধ্যে",
    "মধ্যেই",
    "মধ্যেও",
    "মনে",
    "মাত্র",
    "মাধ্যমে",
    "মোট",
    "মোটেই",
    "যখন",
    "যত",
    "যতটা",
    "যথেষ্ট",
    "যদি",
    "যদিও",
    "যা",
    "যাঁর",
    "যাঁরা",
    "যাওয়া",
    "যাওয়ার",
    "যাওয়া",
    "যাকে",
    "যাচ্ছে",
    "যাতে",
    "যাদের",
    "যান",
    "যাবে",
    "যায়",
    "যার",
    "যারা",
    "যিনি",
    "যে",
    "যেখানে",
    "যেতে",
    "যেন",
    "যেমন",
    "র",
    "রকম",
    "রয়েছে",
    "রাখা",
    "রেখে",
    "লক্ষ",
    "শুধু",
    "শুরু",
    "সঙ্গে",
    "সঙ্গেও",
    "সব",
    "সবার",
    "সমস্ত",
    "সম্প্রতি",
    "সহ",
    "সহিত",
    "সাধারণ",
    "সামনে",
    "সি",
    "সুতরাং",
    "সে",
    "সেই",
    "সেখান",
    "সেখানে",
    "সেটা",
    "সেটাই",
    "সেটাও",
    "সেটি",
    "স্পষ্ট",
    "স্বয়ং",
    "হইতে",
    "হইবে",
    "হইয়া",
    "হওয়া",
    "হওয়ায়",
    "হওয়ার",
    "হচ্ছে",
    "হত",
    "হতে",
    "হতেই",
    "হন",
    "হবে",
    "হবেন",
    "হয়",
    "হয়তো",
    "হয়নি",
    "হয়ে",
    "হয়েই",
    "হয়েছিল",
    "হয়েছে",
    "হয়েছেন",
    "হল",
    "হলে",
    "হলেই",
    "হলেও",
    "হলো",
    "হাজার",
    "হিসাবে",
    "হৈলে",
    "হোক",
    "হয়"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_br.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_br.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "'blam",
    "'d",
    "'m",
    "'r",
    "'ta",
    "'vat",
    "'z",
    "'zo",
    "a",
    "a:",
    "aba",
    "abalamour",
    "abaoe",
    "ac'hane",
    "ac'hanoc'h",
    "ac'hanomp",
    "ac'hanon",
    "ac'hanout",
    "adal",
    "adalek",
    "adarre",
    "ae",
    "aec'h",
    "aed",
    "aemp",
    "aen",
    "aent",
    "aes",
    "afe",
    "afec'h",
    "afed",
    "afemp",
    "afen",
    "afent",
    "afes",
    "ag",
    "ah",
    "aimp",
    "aint",
    "aio",
    "aiou",
    "aje",
    "ajec'h",
    "ajed",
    "ajemp",
    "ajen",
    "ajent",
    "ajes",
    "al",
    "alato",
    "alies",
    "aliesañ",
    "alkent",
    "all",
    "allas",
    "allo",
    "allô",
    "am",
    "amañ",
    "amzer",
    "an",
    "anezhañ",
    "anezhe",
    "anezhi",
    "anezho",
    "anvet",
    "aon",
    "aotren",
    "ar",
    "arall",
    "araok",
    "araoki",
    "araozañ",
    "araozo",
    "araozoc'h",
    "araozomp",
    "araozon",
    "araozor",
    "araozout",
    "arbenn",
    "arre",
    "atalek",
    "atav",
    "az",
    "azalek",
    "azirazañ",
    "azirazi",
    "azirazo",
    "azirazoc'h",
    "azirazomp",
    "azirazon",
    "azirazor",
    "azirazout",
    "b:",
    "ba",
    "ba'l",
    "ba'n",
    "ba'r",
    "bad",
    "bah",
    "bal",
    "ban",
    "bar",
    "bastañ",
    "befe",
    "bell",
    "benaos",
    "benn",
    "bennag",
    "bennak",
    "bennozh",
    "bep",
    "bepred",
    "berr",
    "berzh",
    "bet",
    "betek",
    "betra",
    "bev",
    "bevet",
    "bez",
    "bezañ",
    "beze",
    "bezent",
    "bezet",
    "bezh",
    "bezit",
    "bezomp",
    "bihan",
    "bije",
    "biou",
    "biskoazh",
    "blam",
    "bo",
    "boa",
    "bominapl",
    "boudoudom",
    "bouez",
    "boull",
    "boum",
    "bout",
    "bras",
    "brasañ",
    "brav",
    "bravo",
    "bremañ",
    "bres",
    "brokenn",
    "bronn",
    "brrr",
    "brutal",
    "buhezek",
    "c'h:",
    "c'haout",
    "c'he",
    "c'hem",
    "c'herz",
    "c'heñver",
    "c'hichen",
    "c'hiz",
    "c'hoazh",
    "c'horre",
    "c'houde",
    "c'houst",
    "c'hreiz",
    "c'hwec'h",
    "c'hwec'hvet",
    "c'hwezek",
    "c'hwi",
    "ch:",
    "chaous",
    "chik",
    "chit",
    "chom",
    "chut",
    "d'",
    "d'al",
    "d'an",
    "d'ar",
    "d'az",
    "d'e",
    "d'he",
    "d'ho",
    "d'hol",
    "d'hon",
    "d'hor",
    "d'o",
    "d'ober",
    "d'ul",
    "d'un",
    "d'ur",
    "d:",
    "da",
    "dak",
    "daka",
    "dal",
    "dalbezh",
    "dalc'hmat",
    "dalit",
    "damdost",
    "damheñvel",
    "damm",
    "dan",
    "danvez",
    "dao",
    "daol",
    "daonet",
    "daou",
    "daoust",
    "daouzek",
    "daouzekvet",
    "darn",
    "dastrewiñ",
    "dav",
    "davedoc'h",
    "davedomp",
    "davedon",
    "davedor",
    "davedout",
    "davet",
    "davetañ",
    "davete",
    "daveti",
    "daveto",
    "defe",
    "dehou",
    "dek",
    "dekvet",
    "den",
    "deoc'h",
    "deomp",
    "deor",
    "derc'hel",
    "deus",
    "dez",
    "deze",
    "dezhañ",
    "dezhe",
    "dezhi",
    "dezho",
    "di",
    "diabarzh",
    "diagent",
    "diar",
    "diaraok",
    "diavaez",
    "dibaoe",
    "dibaot",
    "dibar",
    "dic'halañ",
    "didiac'h",
    "dienn",
    "difer",
    "diganeoc'h",
    "diganeomp",
    "diganeor",
    "diganimp",
    "diganin",
    "diganit",
    "digant",
    "digantañ",
    "digante",
    "diganti",
    "diganto",
    "digemmesk",
    "diget",
    "digor",
    "digoret",
    "dija",
    "dije",
    "dimp",
    "din",
    "dinaou",
    "dindan",
    "dindanañ",
    "dindani",
    "dindano",
    "dindanoc'h",
    "dindanomp",
    "dindanon",
    "dindanor",
    "dindanout",
    "dioutañ",
    "dioute",
    "diouti",
    "diouto",
    "diouzh",
    "diouzhin",
    "diouzhit",
    "diouzhoc'h",
    "diouzhomp",
    "diouzhor",
    "dirak",
    "dirazañ",
    "dirazi",
    "dirazo",
    "dirazoc'h",
    "dirazomp",
    "dirazon",
    "dirazor",
    "dirazout",
    "disheñvel",
    "dispar",
    "distank",
    "dister",
    "disterañ",
    "disterig",
    "distro",
    "dit",
    "divaez",
    "diwar",
    "diwezhat",
    "diwezhañ",
    "do",
    "doa",
    "doare",
    "dont",
    "dost",
    "doue",
    "douetus",
    "douez",
    "doug",
    "draou",
    "draoñ",
    "dre",
    "drede",
    "dreist",
    "dreistañ",
    "dreisti",
    "dreisto",
    "dreistoc'h",
    "dreistomp",
    "dreiston",
    "dreistor",
    "dreistout",
    "drek",
    "dreñv",
    "dring",
    "dro",
    "du",
    "e",
    "e:",
    "eas",
    "ebet",
    "ec'h",
    "edo",
    "edoc'h",
    "edod",
    "edomp",
    "edon",
    "edont",
    "edos",
    "eer",
    "eeun",
    "efed",
    "egedoc'h",
    "egedomp",
    "egedon",
    "egedor",
    "egedout",
    "eget",
    "egetañ",
    "egete",
    "egeti",
    "egeto",
    "eh",
    "eil",
    "eilvet",
    "eizh",
    "eizhvet",
    "ejoc'h",
    "ejod",
    "ejomp",
    "ejont",
    "ejout",
    "el",
    "em",
    "emaint",
    "emaoc'h",
    "emaomp",
    "emaon",
    "emaout",
    "emañ",
    "eme",
    "emeur",
    "emezañ",
    "emezi",
    "emezo",
    "emezoc'h",
    "emezomp",
    "emezon",
    "emezout",
    "emporzhiañ",
    "en",
    "end",
    "endan",
    "endra",
    "enep",
    "ennañ",
    "enni",
    "enno",
    "ennoc'h",
    "ennomp",
    "ennon",
    "ennor",
    "ennout",
    "enta",
    "eo",
    "eomp",
    "eont",
    "eor",
    "eot",
    "er",
    "erbet",
    "erfin",
    "esa",
    "esae",
    "espar",
    "estlamm",
    "estrañj",
    "eta",
    "etre",
    "etreoc'h",
    "etrezo",
    "etrezoc'h",
    "etrezomp",
    "etrezor",
    "euh",
    "eur",
    "eus",
    "evel",
    "evelato",
    "eveldoc'h",
    "eveldomp",
    "eveldon",
    "eveldor",
    "eveldout",
    "evelkent",
    "eveltañ",
    "evelte",
    "evelti",
    "evelto",
    "evidoc'h",
    "evidomp",
    "evidon",
    "evidor",
    "evidout",
    "evit",
    "evitañ",
    "evite",
    "eviti",
    "evito",
    "ez",
    "eñ",
    "f:",
    "fac'h",
    "fall",
    "fed",
    "feiz",
    "fenn",
    "fezh",
    "fin",
    "finsalvet",
    "foei",
    "fouilhezañ",
    "g:",
    "gallout",
    "ganeoc'h",
    "ganeomp",
    "ganin",
    "ganit",
    "gant",
    "gantañ",
    "ganti",
    "ganto",
    "gaout",
    "gast",
    "gein",
    "gellout",
    "genndost",
    "gentañ",
    "ger",
    "gerz",
    "get",
    "geñver",
    "gichen",
    "gin",
    "giz",
    "glan",
    "gloev",
    "goll",
    "gorre",
    "goude",
    "gouez",
    "gouezit",
    "gouezomp",
    "goulz",
    "gounnar",
    "gour",
    "goust",
    "gouze",
    "gouzout",
    "gra",
    "grak",
    "grec'h",
    "greiz",
    "grenn",
    "greomp",
    "grit",
    "groñs",
    "gutez",
    "gwall",
    "gwashoc'h",
    "gwazh",
    "gwech",
    "gwechall",
    "gwechoù",
    "gwell",
    "gwezh",
    "gwezhall",
    "gwezharall",
    "gwezhoù",
    "gwig",
    "gwirionez",
    "gwitibunan",
    "gêr",
    "h:",
    "ha",
    "hag",
    "han",
    "hanter",
    "hanterc'hantad",
    "hanterkantved",
    "harz",
    "hañ",
    "hañval",
    "he",
    "hebioù",
    "hec'h",
    "hei",
    "hein",
    "hem",
    "hemañ",
    "hen",
    "hend",
    "henhont",
    "henn",
    "hennezh",
    "hent",
    "hep",
    "hervez",
    "hervezañ",
    "hervezi",
    "hervezo",
    "hervezoc'h",
    "hervezomp",
    "hervezon",
    "hervezor",
    "hervezout",
    "heul",
    "heuliañ",
    "hevelep",
    "heverk",
    "heñvel",
    "heñvelat",
    "heñvelañ",
    "heñveliñ",
    "heñveloc'h",
    "heñvelout",
    "hi",
    "hilh",
    "hini",
    "hirie",
    "hirio",
    "hiziv",
    "hiziviken",
    "ho",
    "hoaliñ",
    "hoc'h",
    "hogen",
    "hogos",
    "hogozik",
    "hol",
    "holl",
    "holà",
    "homañ",
    "hon",
    "honhont",
    "honnezh",
    "hont",
    "hop",
    "hopala",
    "hor",
    "hou",
    "houp",
    "hudu",
    "hue",
    "hui",
    "hum",
    "hurrah",
    "i",
    "i:",
    "in",
    "int",
    "is",
    "ispisial",
    "isurzhiet",
    "it",
    "ivez",
    "izelañ",
    "j:",
    "just",
    "k:",
    "kae",
    "kaer",
    "kalon",
    "kalz",
    "kant",
    "kaout",
    "kar",
    "kazi",
    "keid",
    "kein",
    "keit",
    "kel",
    "kellies",
    "keloù",
    "kement",
    "ken",
    "kenkent",
    "kenkoulz",
    "kenment",
    "kent",
    "kentañ",
    "kentizh",
    "kentoc'h",
    "kentre",
    "ker",
    "kerkent",
    "kerz",
    "kerzh",
    "ket",
    "keta",
    "keñver",
    "keñverel",
    "keñverius",
    "kichen",
    "kichenik",
    "kit",
    "kiz",
    "klak",
    "klek",
    "klik",
    "komprenet",
    "komz",
    "kont",
    "korf",
    "korre",
    "koulskoude",
    "koulz",
    "koust",
    "krak",
    "krampouezh",
    "krec'h",
    "kreiz",
    "kuit",
    "kwir",
    "l:",
    "la",
    "laez",
    "laoskel",
    "laouen",
    "lavar",
    "lavaret",
    "lavarout",
    "lec'h",
    "lein",
    "leizh",
    "lerc'h",
    "leun",
    "leuskel",
    "lew",
    "lies",
    "liesañ",
    "lod",
    "lusk",
    "lâr",
    "lârout",
    "m:",
    "ma",
    "ma'z",
    "mac'h",
    "mac'hat",
    "mac'hañ",
    "mac'hoc'h",
    "mad",
    "maez",
    "maksimal",
    "mann",
    "mar",
    "mard",
    "marg",
    "marzh",
    "mat",
    "mañ",
    "me",
    "memes",
    "memestra",
    "merkapl",
    "mersi",
    "mes",
    "mesk",
    "met",
    "meur",
    "mil",
    "minimal",
    "moan",
    "moaniaat",
    "mod",
    "mont",
    "mout",
    "mui",
    "muiañ",
    "muioc'h",
    "n",
    "n'",
    "n:",
    "na",
    "nag",
    "naontek",
    "naturel",
    "nav",
    "navet",
    "ne",
    "nebeudig",
    "nebeut",
    "nebeutañ",
    "nebeutoc'h",
    "neketa",
    "nemedoc'h",
    "nemedomp",
    "nemedon",
    "nemedor",
    "nemedout",
    "nemet",
    "nemetañ",
    "nemete",
    "nemeti",
    "nemeto",
    "nemeur",
    "neoac'h",
    "nepell",
    "nerzh",
    "nes",
    "neseser",
    "netra",
    "neubeudoù",
    "neuhe",
    "neuze",
    "nevez",
    "newazh",
    "nez",
    "ni",
    "nikun",
    "niverus",
    "nul",
    "o",
    "o:",
    "oa",
    "oac'h",
    "oad",
    "oamp",
    "oan",
    "oant",
    "oar",
    "oas",
    "ober",
    "oc'h",
    "oc'ho",
    "oc'hola",
    "oc'hpenn",
    "oh",
    "ohe",
    "ollé",
    "olole",
    "olé",
    "omp",
    "on",
    "ordin",
    "ordinal",
    "ouejoc'h",
    "ouejod",
    "ouejomp",
    "ouejont",
    "ouejout",
    "ouek",
    "ouezas",
    "ouezi",
    "ouezimp",
    "ouezin",
    "ouezint",
    "ouezis",
    "ouezo",
    "ouezoc'h",
    "ouezor",
    "ouf",
    "oufe",
    "oufec'h",
    "oufed",
    "oufemp",
    "oufen",
    "oufent",
    "oufes",
    "ouie",
    "ouiec'h",
    "ouied",
    "ouiemp",
    "ouien",
    "ouient",
    "ouies",
    "ouije",
    "ouijec'h",
    "ouijed",
    "ouijemp",
    "ouijen",
    "ouijent",
    "ouijes",
    "out",
    "outañ",
    "outi",
    "outo",
    "ouzer",
    "ouzh",
    "ouzhin",
    "ouzhit",
    "ouzhoc'h",
    "ouzhomp",
    "ouzhor",
    "ouzhpenn",
    "ouzhpennik",
    "ouzoc'h",
    "ouzomp",
    "ouzon",
    "ouzont",
    "ouzout",
    "p'",
    "p:",
    "pa",
    "pad",
    "padal",
    "paf",
    "pan",
    "panevedeoc'h",
    "panevedo",
    "panevedomp",
    "panevedon",
    "panevedout",
    "panevet",
    "panevetañ",
    "paneveti",
    "pas",
    "paseet",
    "pe",
    "peadra",
    "peder",
    "pedervet",
    "pedervetvet",
    "pefe",
    "pegeit",
    "pegement",
    "pegen",
    "pegiz",
    "pegoulz",
    "pehini",
    "pelec'h",
    "pell",
    "pemod",
    "pemp",
    "pempved",
    "pemzek",
    "penaos",
    "penn",
    "peogwir",
    "peotramant",
    "pep",
    "perak",
    "perc'hennañ",
    "pergen",
    "permetiñ",
    "peseurt",
    "pet",
    "petiaoul",
    "petoare",
    "petra",
    "peur",
    "peurgetket",
    "peurheñvel",
    "peurliesañ",
    "peurvuiañ",
    "peus",
    "peustost",
    "peuz",
    "pevar",
    "pevare",
    "pevarevet",
    "pevarzek",
    "pez",
    "peze",
    "pezh",
    "pff",
    "pfft",
    "pfut",
    "picher",
    "pif",
    "pife",
    "pign",
    "pije",
    "pikol",
    "pitiaoul",
    "piv",
    "plaouf",
    "plok",
    "plouf",
    "po",
    "poa",
    "poelladus",
    "pof",
    "pok",
    "posupl",
    "pouah",
    "pourc'henn",
    "prest",
    "prestik",
    "prim",
    "prin",
    "provostapl",
    "pst",
    "pu",
    "pur",
    "r:",
    "ra",
    "rae",
    "raec'h",
    "raed",
    "raemp",
    "raen",
    "raent",
    "raes",
    "rafe",
    "rafec'h",
    "rafed",
    "rafemp",
    "rafen",
    "rafent",
    "rafes",
    "rag",
    "raimp",
    "raint",
    "raio",
    "raje",
    "rajec'h",
    "rajed",
    "rajemp",
    "rajen",
    "rajent",
    "rajes",
    "rak",
    "ral",
    "ran",
    "rankout",
    "raok",
    "razh",
    "re",
    "reas",
    "reer",
    "regennoù",
    "reiñ",
    "rejoc'h",
    "rejod",
    "rejomp",
    "rejont",
    "rejout",
    "rener",
    "rentañ",
    "reoc'h",
    "reomp",
    "reont",
    "reor",
    "reot",
    "resis",
    "ret",
    "reve",
    "rez",
    "ri",
    "rik",
    "rin",
    "ris",
    "rit",
    "rouez",
    "s:",
    "sac'h",
    "sant",
    "sav",
    "sañset",
    "se",
    "sed",
    "seitek",
    "seizh",
    "seizhvet",
    "sell",
    "sellit",
    "ser",
    "setu",
    "seul",
    "seurt",
    "siwazh",
    "skignañ",
    "skoaz",
    "skouer",
    "sort",
    "souden",
    "souvitañ",
    "soñj",
    "speriañ",
    "spririñ",
    "stad",
    "stlabezañ",
    "stop",
    "stranañ",
    "strewiñ",
    "strishaat",
    "stumm",
    "sujed",
    "surtoud",
    "t:",
    "ta",
    "taer",
    "tailh",
    "tak",
    "tal",
    "talvoudegezh",
    "tamm",
    "tanav",
    "taol",
    "te",
    "techet",
    "teir",
    "teirvet",
    "telt",
    "teltenn",
    "teus",
    "teut",
    "teuteu",
    "ti",
    "tik",
    "toa",
    "tok",
    "tost",
    "tostig",
    "toud",
    "touesk",
    "touez",
    "toull",
    "tra",
    "trantenn",
    "traoñ",
    "trawalc'h",
    "tre",
    "trede",
    "tregont",
    "tremenet",
    "tri",
    "trivet",
    "triwec'h",
    "trizek",
    "tro",
    "trugarez",
    "trumm",
    "tsoin",
    "tsouin",
    "tu",
    "tud",
    "u:",
    "ugent",
    "uhel",
    "uhelañ",
    "ul",
    "un",
    "unan",
    "unanez",
    "unanig",
    "unnek",
    "unnekvet",
    "ur",
    "urzh",
    "us",
    "v:",
    "va",
    "vale",
    "van",
    "vare",
    "vat",
    "vefe",
    "vefec'h",
    "vefed",
    "vefemp",
    "vefen",
    "vefent",
    "vefes",
    "vesk",
    "vete",
    "vez",
    "vezan",
    "vezañ",
    "veze",
    "vezec'h",
    "vezed",
    "vezemp",
    "vezen",
    "vezent",
    "vezer",
    "vezes",
    "vezez",
    "vezit",
    "vezomp",
    "vezont",
    "vi",
    "vihan",
    "vihanañ",
    "vije",
    "vijec'h",
    "vijed",
    "vijemp",
    "vijen",
    "vijent",
    "vijes",
    "viken",
    "vimp",
    "vin",
    "vint",
    "vior",
    "viot",
    "virviken",
    "viskoazh",
    "vlan",
    "vlaou",
    "vo",
    "vod",
    "voe",
    "voec'h",
    "voed",
    "voemp",
    "voen",
    "voent",
    "voes",
    "vont",
    "vostapl",
    "vrac'h",
    "vrasañ",
    "vremañ",
    "w:",
    "walc'h",
    "war",
    "warnañ",
    "warni",
    "warno",
    "warnoc'h",
    "warnomp",
    "warnon",
    "warnor",
    "warnout",
    "wazh",
    "wech",
    "wechoù",
    "well",
    "y:",
    "you",
    "youadenn",
    "youc'hadenn",
    "youc'hou",
    "z:",
    "za",
    "zan",
    "zaw",
    "zeu",
    "zi",
    "ziar",
    "zigarez",
    "ziget",
    "zindan",
    "zioc'h",
    "ziouzh",
    "zirak",
    "zivout",
    "ziwar",
    "ziwezhañ",
    "zo",
    "zoken",
    "zokenoc'h",
    "zouesk",
    "zouez",
    "zro",
    "zu"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ca.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ca.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "abans",
    "ací",
    "ah",
    "així",
    "això",
    "al",
    "aleshores",
    "algun",
    "alguna",
    "algunes",
    "alguns",
    "alhora",
    "allà",
    "allí",
    "allò",
    "als",
    "altra",
    "altre",
    "altres",
    "amb",
    "ambdues",
    "ambdós",
    "anar",
    "ans",
    "apa",
    "aquell",
    "aquella",
    "aquelles",
    "aquells",
    "aquest",
    "aquesta",
    "aquestes",
    "aquests",
    "aquí",
    "baix",
    "bastant",
    "bé",
    "cada",
    "cadascuna",
    "cadascunes",
    "cadascuns",
    "cadascú",
    "com",
    "consegueixo",
    "conseguim",
    "conseguir",
    "consigueix",
    "consigueixen",
    "consigueixes",
    "contra",
    "d'un",
    "d'una",
    "d'unes",
    "d'uns",
    "dalt",
    "de",
    "del",
    "dels",
    "des",
    "des de",
    "després",
    "dins",
    "dintre",
    "donat",
    "doncs",
    "durant",
    "e",
    "eh",
    "el",
    "elles",
    "ells",
    "els",
    "em",
    "en",
    "encara",
    "ens",
    "entre",
    "era",
    "erem",
    "eren",
    "eres",
    "es",
    "esta",
    "estan",
    "estat",
    "estava",
    "estaven",
    "estem",
    "esteu",
    "estic",
    "està",
    "estàvem",
    "estàveu",
    "et",
    "etc",
    "ets",
    "fa",
    "faig",
    "fan",
    "fas",
    "fem",
    "fer",
    "feu",
    "fi",
    "fins",
    "fora",
    "gairebé",
    "ha",
    "han",
    "has",
    "haver",
    "havia",
    "he",
    "hem",
    "heu",
    "hi",
    "ho",
    "i",
    "igual",
    "iguals",
    "inclòs",
    "ja",
    "jo",
    "l'hi",
    "la",
    "les",
    "li",
    "li'n",
    "llarg",
    "llavors",
    "m'he",
    "ma",
    "mal",
    "malgrat",
    "mateix",
    "mateixa",
    "mateixes",
    "mateixos",
    "me",
    "mentre",
    "meu",
    "meus",
    "meva",
    "meves",
    "mode",
    "molt",
    "molta",
    "moltes",
    "molts",
    "mon",
    "mons",
    "més",
    "n'he",
    "n'hi",
    "ne",
    "ni",
    "no",
    "nogensmenys",
    "només",
    "nosaltres",
    "nostra",
    "nostre",
    "nostres",
    "o",
    "oh",
    "oi",
    "on",
    "pas",
    "pel",
    "pels",
    "per",
    "per que",
    "perquè",
    "però",
    "poc",
    "poca",
    "pocs",
    "podem",
    "poden",
    "poder",
    "podeu",
    "poques",
    "potser",
    "primer",
    "propi",
    "puc",
    "qual",
    "quals",
    "quan",
    "quant",
    "que",
    "quelcom",
    "qui",
    "quin",
    "quina",
    "quines",
    "quins",
    "què",
    "s'ha",
    "s'han",
    "sa",
    "sabem",
    "saben",
    "saber",
    "sabeu",
    "sap",
    "saps",
    "semblant",
    "semblants",
    "sense",
    "ser",
    "ses",
    "seu",
    "seus",
    "seva",
    "seves",
    "si",
    "sobre",
    "sobretot",
    "soc",
    "solament",
    "sols",
    "som",
    "son",
    "sons",
    "sota",
    "sou",
    "sóc",
    "són",
    "t'ha",
    "t'han",
    "t'he",
    "ta",
    "tal",
    "també",
    "tampoc",
    "tan",
    "tant",
    "tanta",
    "tantes",
    "te",
    "tene",
    "tenim",
    "tenir",
    "teniu",
    "teu",
    "teus",
    "teva",
    "teves",
    "tinc",
    "ton",
    "tons",
    "tot",
    "tota",
    "totes",
    "tots",
    "un",
    "una",
    "unes",
    "uns",
    "us",
    "va",
    "vaig",
    "vam",
    "van",
    "vas",
    "veu",
    "vosaltres",
    "vostra",
    "vostre",
    "vostres",
    "érem",
    "éreu",
    "és",
    "éssent",
    "últim",
    "ús"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_cs.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_cs.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "aby",
    "ahoj",
    "aj",
    "ale",
    "anebo",
    "ani",
    "aniž",
    "ano",
    "asi",
    "aspoň",
    "atd",
    "atp",
    "az",
    "ačkoli",
    "až",
    "bez",
    "beze",
    "blízko",
    "bohužel",
    "brzo",
    "bude",
    "budem",
    "budeme",
    "budes",
    "budete",
    "budeš",
    "budou",
    "budu",
    "by",
    "byl",
    "byla",
    "byli",
    "bylo",
    "byly",
    "bys",
    "byt",
    "být",
    "během",
    "chce",
    "chceme",
    "chcete",
    "chceš",
    "chci",
    "chtít",
    "chtějí",
    "chut'",
    "chuti",
    "ci",
    "clanek",
    "clanku",
    "clanky",
    "co",
    "coz",
    "což",
    "cz",
    "daleko",
    "dalsi",
    "další",
    "den",
    "deset",
    "design",
    "devatenáct",
    "devět",
    "dnes",
    "do",
    "dobrý",
    "docela",
    "dva",
    "dvacet",
    "dvanáct",
    "dvě",
    "dál",
    "dále",
    "děkovat",
    "děkujeme",
    "děkuji",
    "email",
    "ho",
    "hodně",
    "i",
    "jak",
    "jakmile",
    "jako",
    "jakož",
    "jde",
    "je",
    "jeden",
    "jedenáct",
    "jedna",
    "jedno",
    "jednou",
    "jedou",
    "jeho",
    "jehož",
    "jej",
    "jeji",
    "jejich",
    "její",
    "jelikož",
    "jemu",
    "jen",
    "jenom",
    "jenž",
    "jeste",
    "jestli",
    "jestliže",
    "ještě",
    "jež",
    "ji",
    "jich",
    "jimi",
    "jinak",
    "jine",
    "jiné",
    "jiz",
    "již",
    "jsem",
    "jses",
    "jseš",
    "jsi",
    "jsme",
    "jsou",
    "jste",
    "já",
    "jí",
    "jím",
    "jíž",
    "jšte",
    "k",
    "kam",
    "každý",
    "kde",
    "kdo",
    "kdy",
    "kdyz",
    "když",
    "ke",
    "kolik",
    "kromě",
    "ktera",
    "ktere",
    "kteri",
    "kterou",
    "ktery",
    "která",
    "které",
    "který",
    "kteři",
    "kteří",
    "ku",
    "kvůli",
    "ma",
    "mají",
    "mate",
    "me",
    "mezi",
    "mi",
    "mit",
    "mne",
    "mnou",
    "mně",
    "moc",
    "mohl",
    "mohou",
    "moje",
    "moji",
    "možná",
    "muj",
    "musí",
    "muze",
    "my",
    "má",
    "málo",
    "mám",
    "máme",
    "máte",
    "máš",
    "mé",
    "mí",
    "mít",
    "mě",
    "můj",
    "může",
    "na",
    "nad",
    "nade",
    "nam",
    "napiste",
    "napište",
    "naproti",
    "nas",
    "nasi",
    "načež",
    "naše",
    "naši",
    "ne",
    "nebo",
    "nebyl",
    "nebyla",
    "nebyli",
    "nebyly",
    "nechť",
    "nedělají",
    "nedělá",
    "nedělám",
    "neděláme",
    "neděláte",
    "neděláš",
    "neg",
    "nejsi",
    "nejsou",
    "nemají",
    "nemáme",
    "nemáte",
    "neměl",
    "neni",
    "není",
    "nestačí",
    "nevadí",
    "nez",
    "než",
    "nic",
    "nich",
    "nimi",
    "nove",
    "novy",
    "nové",
    "nový",
    "nula",
    "ná",
    "nám",
    "námi",
    "nás",
    "náš",
    "ní",
    "ním",
    "ně",
    "něco",
    "nějak",
    "někde",
    "někdo",
    "němu",
    "němuž",
    "o",
    "od",
    "ode",
    "on",
    "ona",
    "oni",
    "ono",
    "ony",
    "osm",
    "osmnáct",
    "pak",
    "patnáct",
    "po",
    "pod",
    "podle",
    "pokud",
    "potom",
    "pouze",
    "pozdě",
    "pořád",
    "prave",
    "pravé",
    "pred",
    "pres",
    "pri",
    "pro",
    "proc",
    "prostě",
    "prosím",
    "proti",
    "proto",
    "protoze",
    "protože",
    "proč",
    "prvni",
    "první",
    "práve",
    "pta",
    "pět",
    "před",
    "přede",
    "přes",
    "přese",
    "při",
    "přičemž",
    "re",
    "rovně",
    "s",
    "se",
    "sedm",
    "sedmnáct",
    "si",
    "sice",
    "skoro",
    "smí",
    "smějí",
    "snad",
    "spolu",
    "sta",
    "sto",
    "strana",
    "sté",
    "sve",
    "svych",
    "svym",
    "svymi",
    "své",
    "svých",
    "svým",
    "svými",
    "svůj",
    "ta",
    "tady",
    "tak",
    "take",
    "takhle",
    "taky",
    "takze",
    "také",
    "takže",
    "tam",
    "tamhle",
    "tamhleto",
    "tamto",
    "tato",
    "te",
    "tebe",
    "tebou",
    "ted'",
    "tedy",
    "tema",
    "ten",
    "tento",
    "teto",
    "ti",
    "tim",
    "timto",
    "tipy",
    "tisíc",
    "tisíce",
    "to",
    "tobě",
    "tohle",
    "toho",
    "tohoto",
    "tom",
    "tomto",
    "tomu",
    "tomuto",
    "toto",
    "trošku",
    "tu",
    "tuto",
    "tvoje",
    "tvá",
    "tvé",
    "tvůj",
    "ty",
    "tyto",
    "téma",
    "této",
    "tím",
    "tímto",
    "tě",
    "těm",
    "těma",
    "těmu",
    "třeba",
    "tři",
    "třináct",
    "u",
    "určitě",
    "uz",
    "už",
    "v",
    "vam",
    "vas",
    "vase",
    "vaše",
    "vaši",
    "ve",
    "vedle",
    "večer",
    "vice",
    "vlastně",
    "vsak",
    "vy",
    "vám",
    "vámi",
    "vás",
    "váš",
    "více",
    "však",
    "všechen",
    "všechno",
    "všichni",
    "vůbec",
    "vždy",
    "z",
    "za",
    "zatímco",
    "zač",
    "zda",
    "zde",
    "ze",
    "zpet",
    "zpravy",
    "zprávy",
    "zpět",
    "čau",
    "či",
    "článek",
    "článku",
    "články",
    "čtrnáct",
    "čtyři",
    "šest",
    "šestnáct",
    "že"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_da.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_da.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "ad",
    "af",
    "aldrig",
    "alle",
    "alt",
    "anden",
    "andet",
    "andre",
    "at",
    "bare",
    "begge",
    "blev",
    "blive",
    "bliver",
    "da",
    "de",
    "dem",
    "den",
    "denne",
    "der",
    "deres",
    "det",
    "dette",
    "dig",
    "din",
    "dine",
    "disse",
    "dit",
    "dog",
    "du",
    "efter",
    "ej",
    "eller",
    "en",
    "end",
    "ene",
    "eneste",
    "enhver",
    "er",
    "et",
    "far",
    "fem",
    "fik",
    "fire",
    "flere",
    "fleste",
    "for",
    "fordi",
    "forrige",
    "fra",
    "få",
    "får",
    "før",
    "god",
    "godt",
    "ham",
    "han",
    "hans",
    "har",
    "havde",
    "have",
    "hej",
    "helt",
    "hende",
    "hendes",
    "her",
    "hos",
    "hun",
    "hvad",
    "hvem",
    "hver",
    "hvilken",
    "hvis",
    "hvor",
    "hvordan",
    "hvorfor",
    "hvornår",
    "i",
    "ikke",
    "ind",
    "ingen",
    "intet",
    "ja",
    "jeg",
    "jer",
    "jeres",
    "jo",
    "kan",
    "kom",
    "komme",
    "kommer",
    "kun",
    "kunne",
    "lad",
    "lav",
    "lidt",
    "lige",
    "lille",
    "man",
    "mand",
    "mange",
    "med",
    "meget",
    "men",
    "mens",
    "mere",
    "mig",
    "min",
    "mine",
    "mit",
    "mod",
    "må",
    "ned",
    "nej",
    "ni",
    "nogen",
    "noget",
    "nogle",
    "nu",
    "ny",
    "nyt",
    "når",
    "nær",
    "næste",
    "næsten",
    "og",
    "også",
    "okay",
    "om",
    "op",
    "os",
    "otte",
    "over",
    "på",
    "se",
    "seks",
    "selv",
    "ser",
    "ses",
    "sig",
    "sige",
    "sin",
    "sine",
    "sit",
    "skal",
    "skulle",
    "som",
    "stor",
    "store",
    "syv",
    "så",
    "sådan",
    "tag",
    "tage",
    "thi",
    "ti",
    "til",
    "to",
    "tre",
    "ud",
    "under",
    "var",
    "ved",
    "vi",
    "vil",
    "ville",
    "vor",
    "vores",
    "være",
    "været"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_de.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_de.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "ab",
    "aber",
    "ach",
    "acht",
    "achte",
    "achten",
    "achter",
    "achtes",
    "ag",
    "alle",
    "allein",
    "allem",
    "allen",
    "aller",
    "allerdings",
    "alles",
    "allgemeinen",
    "als",
    "also",
    "am",
    "an",
    "ander",
    "andere",
    "anderem",
    "anderen",
    "anderer",
    "anderes",
    "anderm",
    "andern",
    "anderr",
    "anders",
    "au",
    "auch",
    "auf",
    "aus",
    "ausser",
    "ausserdem",
    "außer",
    "außerdem",
    "b",
    "bald",
    "bei",
    "beide",
    "beiden",
    "beim",
    "beispiel",
    "bekannt",
    "bereits",
    "besonders",
    "besser",
    "besten",
    "bin",
    "bis",
    "bisher",
    "bist",
    "c",
    "d",
    "d.h",
    "da",
    "dabei",
    "dadurch",
    "dafür",
    "dagegen",
    "daher",
    "dahin",
    "dahinter",
    "damals",
    "damit",
    "danach",
    "daneben",
    "dank",
    "dann",
    "daran",
    "darauf",
    "daraus",
    "darf",
    "darfst",
    "darin",
    "darum",
    "darunter",
    "darüber",
    "das",
    "dasein",
    "daselbst",
    "dass",
    "dasselbe",
    "davon",
    "davor",
    "dazu",
    "dazwischen",
    "daß",
    "dein",
    "deine",
    "deinem",
    "deinen",
    "deiner",
    "deines",
    "dem",
    "dementsprechend",
    "demgegenüber",
    "demgemäss",
    "demgemäß",
    "demselben",
    "demzufolge",
    "den",
    "denen",
    "denn",
    "denselben",
    "der",
    "deren",
    "derer",
    "derjenige",
    "derjenigen",
    "dermassen",
    "dermaßen",
    "derselbe",
    "derselben",
    "des",
    "deshalb",
    "desselben",
    "dessen",
    "deswegen",
    "dich",
    "die",
    "diejenige",
    "diejenigen",
    "dies",
    "diese",
    "dieselbe",
    "dieselben",
    "diesem",
    "diesen",
    "dieser",
    "dieses",
    "dir",
    "doch",
    "dort",
    "drei",
    "drin",
    "dritte",
    "dritten",
    "dritter",
    "drittes",
    "du",
    "durch",
    "durchaus",
    "durfte",
    "durften",
    "dürfen",
    "dürft",
    "e",
    "eben",
    "ebenso",
    "ehrlich",
    "ei",
    "ei,",
    "eigen",
    "eigene",
    "eigenen",
    "eigener",
    "eigenes",
    "ein",
    "einander",
    "eine",
    "einem",
    "einen",
    "einer",
    "eines",
    "einig",
    "einige",
    "einigem",
    "einigen",
    "einiger",
    "einiges",
    "einmal",
    "eins",
    "elf",
    "en",
    "ende",
    "endlich",
    "entweder",
    "er",
    "ernst",
    "erst",
    "erste",
    "ersten",
    "erster",
    "erstes",
    "es",
    "etwa",
    "etwas",
    "euch",
    "euer",
    "eure",
    "eurem",
    "euren",
    "eurer",
    "eures",
    "f",
    "folgende",
    "früher",
    "fünf",
    "fünfte",
    "fünften",
    "fünfter",
    "fünftes",
    "für",
    "g",
    "gab",
    "ganz",
    "ganze",
    "ganzen",
    "ganzer",
    "ganzes",
    "gar",
    "gedurft",
    "gegen",
    "gegenüber",
    "gehabt",
    "gehen",
    "geht",
    "gekannt",
    "gekonnt",
    "gemacht",
    "gemocht",
    "gemusst",
    "genug",
    "gerade",
    "gern",
    "gesagt",
    "geschweige",
    "gewesen",
    "gewollt",
    "geworden",
    "gibt",
    "ging",
    "gleich",
    "gott",
    "gross",
    "grosse",
    "grossen",
    "grosser",
    "grosses",
    "groß",
    "große",
    "großen",
    "großer",
    "großes",
    "gut",
    "gute",
    "guter",
    "gutes",
    "h",
    "hab",
    "habe",
    "haben",
    "habt",
    "hast",
    "hat",
    "hatte",
    "hatten",
    "hattest",
    "hattet",
    "heisst",
    "her",
    "heute",
    "hier",
    "hin",
    "hinter",
    "hoch",
    "hätte",
    "hätten",
    "i",
    "ich",
    "ihm",
    "ihn",
    "ihnen",
    "ihr",
    "ihre",
    "ihrem",
    "ihren",
    "ihrer",
    "ihres",
    "im",
    "immer",
    "in",
    "indem",
    "infolgedessen",
    "ins",
    "irgend",
    "ist",
    "j",
    "ja",
    "jahr",
    "jahre",
    "jahren",
    "je",
    "jede",
    "jedem",
    "jeden",
    "jeder",
    "jedermann",
    "jedermanns",
    "jedes",
    "jedoch",
    "jemand",
    "jemandem",
    "jemanden",
    "jene",
    "jenem",
    "jenen",
    "jener",
    "jenes",
    "jetzt",
    "k",
    "kam",
    "kann",
    "kannst",
    "kaum",
    "kein",
    "keine",
    "keinem",
    "keinen",
    "keiner",
    "keines",
    "kleine",
    "kleinen",
    "kleiner",
    "kleines",
    "kommen",
    "kommt",
    "konnte",
    "konnten",
    "kurz",
    "können",
    "könnt",
    "könnte",
    "l",
    "lang",
    "lange",
    "leicht",
    "leide",
    "lieber",
    "los",
    "m",
    "machen",
    "macht",
    "machte",
    "mag",
    "magst",
    "mahn",
    "mal",
    "man",
    "manche",
    "manchem",
    "manchen",
    "mancher",
    "manches",
    "mann",
    "mehr",
    "mein",
    "meine",
    "meinem",
    "meinen",
    "meiner",
    "meines",
    "mensch",
    "menschen",
    "mich",
    "mir",
    "mit",
    "mittel",
    "mochte",
    "mochten",
    "morgen",
    "muss",
    "musst",
    "musste",
    "mussten",
    "muß",
    "mußt",
    "möchte",
    "mögen",
    "möglich",
    "mögt",
    "müssen",
    "müsst",
    "müßt",
    "n",
    "na",
    "nach",
    "nachdem",
    "nahm",
    "natürlich",
    "neben",
    "nein",
    "neue",
    "neuen",
    "neun",
    "neunte",
    "neunten",
    "neunter",
    "neuntes",
    "nicht",
    "nichts",
    "nie",
    "niemand",
    "niemandem",
    "niemanden",
    "noch",
    "nun",
    "nur",
    "o",
    "ob",
    "oben",
    "oder",
    "offen",
    "oft",
    "ohne",
    "ordnung",
    "p",
    "q",
    "r",
    "recht",
    "rechte",
    "rechten",
    "rechter",
    "rechtes",
    "richtig",
    "rund",
    "s",
    "sa",
    "sache",
    "sagt",
    "sagte",
    "sah",
    "satt",
    "schlecht",
    "schluss",
    "schon",
    "sechs",
    "sechste",
    "sechsten",
    "sechster",
    "sechstes",
    "sehr",
    "sei",
    "seid",
    "seien",
    "sein",
    "seine",
    "seinem",
    "seinen",
    "seiner",
    "seines",
    "seit",
    "seitdem",
    "selbst",
    "sich",
    "sie",
    "sieben",
    "siebente",
    "siebenten",
    "siebenter",
    "siebentes",
    "sind",
    "so",
    "solang",
    "solche",
    "solchem",
    "solchen",
    "solcher",
    "solches",
    "soll",
    "sollen",
    "sollst",
    "sollt",
    "sollte",
    "sollten",
    "sondern",
    "sonst",
    "soweit",
    "sowie",
    "später",
    "startseite",
    "statt",
    "steht",
    "suche",
    "t",
    "tag",
    "tage",
    "tagen",
    "tat",
    "teil",
    "tel",
    "tritt",
    "trotzdem",
    "tun",
    "u",
    "uhr",
    "um",
    "und",
    "uns",
    "unse",
    "unsem",
    "unsen",
    "unser",
    "unsere",
    "unserer",
    "unses",
    "unter",
    "v",
    "vergangenen",
    "viel",
    "viele",
    "vielem",
    "vielen",
    "vielleicht",
    "vier",
    "vierte",
    "vierten",
    "vierter",
    "viertes",
    "vom",
    "von",
    "vor",
    "w",
    "wahr",
    "wann",
    "war",
    "waren",
    "warst",
    "wart",
    "warum",
    "was",
    "weg",
    "wegen",
    "weil",
    "weit",
    "weiter",
    "weitere",
    "weiteren",
    "weiteres",
    "welche",
    "welchem",
    "welchen",
    "welcher",
    "welches",
    "wem",
    "wen",
    "wenig",
    "wenige",
    "weniger",
    "weniges",
    "wenigstens",
    "wenn",
    "wer",
    "werde",
    "werden",
    "werdet",
    "weshalb",
    "wessen",
    "wie",
    "wieder",
    "wieso",
    "will",
    "willst",
    "wir",
    "wird",
    "wirklich",
    "wirst",
    "wissen",
    "wo",
    "woher",
    "wohin",
    "wohl",
    "wollen",
    "wollt",
    "wollte",
    "wollten",
    "worden",
    "wurde",
    "wurden",
    "während",
    "währenddem",
    "währenddessen",
    "wäre",
    "würde",
    "würden",
    "x",
    "y",
    "z",
    "z.b",
    "zehn",
    "zehnte",
    "zehnten",
    "zehnter",
    "zehntes",
    "zeit",
    "zu",
    "zuerst",
    "zugleich",
    "zum",
    "zunächst",
    "zur",
    "zurück",
    "zusammen",
    "zwanzig",
    "zwar",
    "zwei",
    "zweite",
    "zweiten",
    "zweiter",
    "zweites",
    "zwischen",
    "zwölf",
    "über",
    "überhaupt",
    "übrigens"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_el.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_el.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "ένα",
    "έναν",
    "ένας",
    "αι",
    "ακομα",
    "ακομη",
    "ακριβως",
    "αληθεια",
    "αληθινα",
    "αλλα",
    "αλλαχου",
    "αλλες",
    "αλλη",
    "αλλην",
    "αλλης",
    "αλλιως",
    "αλλιωτικα",
    "αλλο",
    "αλλοι",
    "αλλοιως",
    "αλλοιωτικα",
    "αλλον",
    "αλλος",
    "αλλοτε",
    "αλλου",
    "αλλους",
    "αλλων",
    "αμα",
    "αμεσα",
    "αμεσως",
    "αν",
    "ανα",
    "αναμεσα",
    "αναμεταξυ",
    "ανευ",
    "αντι",
    "αντιπερα",
    "αντις",
    "ανω",
    "ανωτερω",
    "αξαφνα",
    "απ",
    "απεναντι",
    "απο",
    "αποψε",
    "από",
    "αρα",
    "αραγε",
    "αργα",
    "αργοτερο",
    "αριστερα",
    "αρκετα",
    "αρχικα",
    "ας",
    "αυριο",
    "αυτα",
    "αυτες",
    "αυτεσ",
    "αυτη",
    "αυτην",
    "αυτης",
    "αυτο",
    "αυτοι",
    "αυτον",
    "αυτος",
    "αυτοσ",
    "αυτου",
    "αυτους",
    "αυτουσ",
    "αυτων",
    "αφοτου",
    "αφου",
    "αἱ",
    "αἳ",
    "αἵ",
    "αὐτόσ",
    "αὐτὸς",
    "αὖ",
    "α∆ιακοπα",
    "βεβαια",
    "βεβαιοτατα",
    "γάρ",
    "γα",
    "γα^",
    "γε",
    "γι",
    "για",
    "γοῦν",
    "γρηγορα",
    "γυρω",
    "γὰρ",
    "δ'",
    "δέ",
    "δή",
    "δαί",
    "δαίσ",
    "δαὶ",
    "δαὶς",
    "δε",
    "δεν",
    "δι",
    "δι'",
    "διά",
    "δια",
    "διὰ",
    "δὲ",
    "δὴ",
    "δ’",
    "εαν",
    "εαυτο",
    "εαυτον",
    "εαυτου",
    "εαυτους",
    "εαυτων",
    "εγκαιρα",
    "εγκαιρως",
    "εγω",
    "ειθε",
    "ειμαι",
    "ειμαστε",
    "ειναι",
    "εις",
    "εισαι",
    "εισαστε",
    "ειστε",
    "ειτε",
    "ειχα",
    "ειχαμε",
    "ειχαν",
    "ειχατε",
    "ειχε",
    "ειχες",
    "ει∆εμη",
    "εκ",
    "εκαστα",
    "εκαστες",
    "εκαστη",
    "εκαστην",
    "εκαστης",
    "εκαστο",
    "εκαστοι",
    "εκαστον",
    "εκαστος",
    "εκαστου",
    "εκαστους",
    "εκαστων",
    "εκει",
    "εκεινα",
    "εκεινες",
    "εκεινεσ",
    "εκεινη",
    "εκεινην",
    "εκεινης",
    "εκεινο",
    "εκεινοι",
    "εκεινον",
    "εκεινος",
    "εκεινοσ",
    "εκεινου",
    "εκεινους",
    "εκεινουσ",
    "εκεινων",
    "εκτος",
    "εμας",
    "εμεις",
    "εμενα",
    "εμπρος",
    "εν",
    "ενα",
    "εναν",
    "ενας",
    "ενος",
    "εντελως",
    "εντος",
    "εντωμεταξυ",
    "ενω",
    "ενός",
    "εξ",
    "εξαφνα",
    "εξης",
    "εξισου",
    "εξω",
    "επ",
    "επί",
    "επανω",
    "επειτα",
    "επει∆η",
    "επι",
    "επισης",
    "επομενως",
    "εσας",
    "εσεις",
    "εσενα",
    "εστω",
    "εσυ",
    "ετερα",
    "ετεραι",
    "ετερας",
    "ετερες",
    "ετερη",
    "ετερης",
    "ετερο",
    "ετεροι",
    "ετερον",
    "ετερος",
    "ετερου",
    "ετερους",
    "ετερων",
    "ετουτα",
    "ετουτες",
    "ετουτη",
    "ετουτην",
    "ετουτης",
    "ετουτο",
    "ετουτοι",
    "ετουτον",
    "ετουτος",
    "ετουτου",
    "ετουτους",
    "ετουτων",
    "ετσι",
    "ευγε",
    "ευθυς",
    "ευτυχως",
    "εφεξης",
    "εχει",
    "εχεις",
    "εχετε",
    "εχθες",
    "εχομε",
    "εχουμε",
    "εχουν",
    "εχτες",
    "εχω",
    "εως",
    "εἰ",
    "εἰμί",
    "εἰμὶ",
    "εἰς",
    "εἰσ",
    "εἴ",
    "εἴμι",
    "εἴτε",
    "ε∆ω",
    "η",
    "ημασταν",
    "ημαστε",
    "ημουν",
    "ησασταν",
    "ησαστε",
    "ησουν",
    "ηταν",
    "ητανε",
    "ητοι",
    "ηττον",
    "η∆η",
    "θα",
    "ι",
    "ιι",
    "ιιι",
    "ισαμε",
    "ισια",
    "ισως",
    "ισωσ",
    "ι∆ια",
    "ι∆ιαν",
    "ι∆ιας",
    "ι∆ιες",
    "ι∆ιο",
    "ι∆ιοι",
    "ι∆ιον",
    "ι∆ιος",
    "ι∆ιου",
    "ι∆ιους",
    "ι∆ιων",
    "ι∆ιως",
    "κ",
    "καί",
    "καίτοι",
    "καθ",
    "καθε",
    "καθεμια",
    "καθεμιας",
    "καθενα",
    "καθενας",
    "καθενος",
    "καθετι",
    "καθολου",
    "καθως",
    "και",
    "κακα",
    "κακως",
    "καλα",
    "καλως",
    "καμια",
    "καμιαν",
    "καμιας",
    "καμποσα",
    "καμποσες",
    "καμποση",
    "καμποσην",
    "καμποσης",
    "καμποσο",
    "καμποσοι",
    "καμποσον",
    "καμποσος",
    "καμποσου",
    "καμποσους",
    "καμποσων",
    "κανεις",
    "κανεν",
    "κανενα",
    "κανεναν",
    "κανενας",
    "κανενος",
    "καποια",
    "καποιαν",
    "καποιας",
    "καποιες",
    "καποιο",
    "καποιοι",
    "καποιον",
    "καποιος",
    "καποιου",
    "καποιους",
    "καποιων",
    "καποτε",
    "καπου",
    "καπως",
    "κατ",
    "κατά",
    "κατα",
    "κατι",
    "κατιτι",
    "κατοπιν",
    "κατω",
    "κατὰ",
    "καὶ",
    "κι",
    "κιολας",
    "κλπ",
    "κοντα",
    "κτλ",
    "κυριως",
    "κἀν",
    "κἂν",
    "λιγακι",
    "λιγο",
    "λιγωτερο",
    "λογω",
    "λοιπα",
    "λοιπον",
    "μέν",
    "μέσα",
    "μή",
    "μήτε",
    "μία",
    "μα",
    "μαζι",
    "μακαρι",
    "μακρυα",
    "μαλιστα",
    "μαλλον",
    "μας",
    "με",
    "μεθ",
    "μεθαυριο",
    "μειον",
    "μελει",
    "μελλεται",
    "μεμιας",
    "μεν",
    "μερικα",
    "μερικες",
    "μερικοι",
    "μερικους",
    "μερικων",
    "μεσα",
    "μετ",
    "μετά",
    "μετα",
    "μεταξυ",
    "μετὰ",
    "μεχρι",
    "μη",
    "μην",
    "μηπως",
    "μητε",
    "μη∆ε",
    "μιά",
    "μια",
    "μιαν",
    "μιας",
    "μολις",
    "μολονοτι",
    "μοναχα",
    "μονες",
    "μονη",
    "μονην",
    "μονης",
    "μονο",
    "μονοι",
    "μονομιας",
    "μονος",
    "μονου",
    "μονους",
    "μονων",
    "μου",
    "μπορει",
    "μπορουν",
    "μπραβο",
    "μπρος",
    "μἐν",
    "μὲν",
    "μὴ",
    "μὴν",
    "να",
    "ναι",
    "νωρις",
    "ξανα",
    "ξαφνικα",
    "ο",
    "οι",
    "ολα",
    "ολες",
    "ολη",
    "ολην",
    "ολης",
    "ολο",
    "ολογυρα",
    "ολοι",
    "ολον",
    "ολονεν",
    "ολος",
    "ολοτελα",
    "ολου",
    "ολους",
    "ολων",
    "ολως",
    "ολως∆ιολου",
    "ομως",
    "ομωσ",
    "οποια",
    "οποιαν",
    "οποιαν∆ηποτε",
    "οποιας",
    "οποιας∆ηποτε",
    "οποια∆ηποτε",
    "οποιες",
    "οποιες∆ηποτε",
    "οποιο",
    "οποιοι",
    "οποιον",
    "οποιον∆ηποτε",
    "οποιος",
    "οποιος∆ηποτε",
    "οποιου",
    "οποιους",
    "οποιους∆ηποτε",
    "οποιου∆ηποτε",
    "οποιο∆ηποτε",
    "οποιων",
    "οποιων∆ηποτε",
    "οποι∆ηποτε",
    "οποτε",
    "οποτε∆ηποτε",
    "οπου",
    "οπου∆ηποτε",
    "οπως",
    "οπωσ",
    "ορισμενα",
    "ορισμενες",
    "ορισμενων",
    "ορισμενως",
    "οσα",
    "οσα∆ηποτε",
    "οσες",
    "οσες∆ηποτε",
    "οση",
    "οσην",
    "οσην∆ηποτε",
    "οσης",
    "οσης∆ηποτε",
    "οση∆ηποτε",
    "οσο",
    "οσοι",
    "οσοι∆ηποτε",
    "οσον",
    "οσον∆ηποτε",
    "οσος",
    "οσος∆ηποτε",
    "οσου",
    "οσους",
    "οσους∆ηποτε",
    "οσου∆ηποτε",
    "οσο∆ηποτε",
    "οσων",
    "οσων∆ηποτε",
    "οταν",
    "οτι",
    "οτι∆ηποτε",
    "οτου",
    "ου",
    "ουτε",
    "ου∆ε",
    "οχι",
    "οἱ",
    "οἳ",
    "οἷς",
    "οὐ",
    "οὐδ",
    "οὐδέ",
    "οὐδείσ",
    "οὐδεὶς",
    "οὐδὲ",
    "οὐδὲν",
    "οὐκ",
    "οὐχ",
    "οὐχὶ",
    "οὓς",
    "οὔτε",
    "οὕτω",
    "οὕτως",
    "οὕτωσ",
    "οὖν",
    "οὗ",
    "οὗτος",
    "οὗτοσ",
    "παλι",
    "παντοτε",
    "παντου",
    "παντως",
    "παρ",
    "παρά",
    "παρα",
    "παρὰ",
    "περί",
    "περα",
    "περι",
    "περιπου",
    "περισσοτερο",
    "περσι",
    "περυσι",
    "περὶ",
    "πια",
    "πιθανον",
    "πιο",
    "πισω",
    "πλαι",
    "πλεον",
    "πλην",
    "ποια",
    "ποιαν",
    "ποιας",
    "ποιες",
    "ποιεσ",
    "ποιο",
    "ποιοι",
    "ποιον",
    "ποιος",
    "ποιοσ",
    "ποιου",
    "ποιους",
    "ποιουσ",
    "ποιων",
    "πολυ",
    "ποσες",
    "ποση",
    "ποσην",
    "ποσης",
    "ποσοι",
    "ποσος",
    "ποσους",
    "ποτε",
    "που",
    "πουθε",
    "πουθενα",
    "ποῦ",
    "πρεπει",
    "πριν",
    "προ",
    "προκειμενου",
    "προκειται",
    "προπερσι",
    "προς",
    "προσ",
    "προτου",
    "προχθες",
    "προχτες",
    "πρωτυτερα",
    "πρόσ",
    "πρὸ",
    "πρὸς",
    "πως",
    "πωσ",
    "σαν",
    "σας",
    "σε",
    "σεις",
    "σημερα",
    "σιγα",
    "σου",
    "στα",
    "στη",
    "στην",
    "στης",
    "στις",
    "στο",
    "στον",
    "στου",
    "στους",
    "στων",
    "συγχρονως",
    "συν",
    "συναμα",
    "συνεπως",
    "συνηθως",
    "συχνα",
    "συχνας",
    "συχνες",
    "συχνη",
    "συχνην",
    "συχνης",
    "συχνο",
    "συχνοι",
    "συχνον",
    "συχνος",
    "συχνου",
    "συχνους",
    "συχνων",
    "συχνως",
    "σχε∆ον",
    "σωστα",
    "σόσ",
    "σύ",
    "σύν",
    "σὸς",
    "σὺ",
    "σὺν",
    "τά",
    "τήν",
    "τί",
    "τίς",
    "τίσ",
    "τα",
    "ταυτα",
    "ταυτες",
    "ταυτη",
    "ταυτην",
    "ταυτης",
    "ταυτο,ταυτον",
    "ταυτος",
    "ταυτου",
    "ταυτων",
    "ταχα",
    "ταχατε",
    "ταῖς",
    "τα∆ε",
    "τε",
    "τελικα",
    "τελικως",
    "τες",
    "τετοια",
    "τετοιαν",
    "τετοιας",
    "τετοιες",
    "τετοιο",
    "τετοιοι",
    "τετοιον",
    "τετοιος",
    "τετοιου",
    "τετοιους",
    "τετοιων",
    "τη",
    "την",
    "της",
    "τησ",
    "τι",
    "τινα",
    "τιποτα",
    "τιποτε",
    "τις",
    "τισ",
    "το",
    "τοί",
    "τοι",
    "τοιοῦτος",
    "τοιοῦτοσ",
    "τον",
    "τος",
    "τοσα",
    "τοσες",
    "τοση",
    "τοσην",
    "τοσης",
    "τοσο",
    "τοσοι",
    "τοσον",
    "τοσος",
    "τοσου",
    "τοσους",
    "τοσων",
    "τοτε",
    "του",
    "τουλαχιστο",
    "τουλαχιστον",
    "τους",
    "τουτα",
    "τουτες",
    "τουτη",
    "τουτην",
    "τουτης",
    "τουτο",
    "τουτοι",
    "τουτοις",
    "τουτον",
    "τουτος",
    "τουτου",
    "τουτους",
    "τουτων",
    "τούσ",
    "τοὺς",
    "τοῖς",
    "τοῦ",
    "τυχον",
    "των",
    "τωρα",
    "τό",
    "τόν",
    "τότε",
    "τὰ",
    "τὰς",
    "τὴν",
    "τὸ",
    "τὸν",
    "τῆς",
    "τῆσ",
    "τῇ",
    "τῶν",
    "τῷ",
    "υπ",
    "υπερ",
    "υπο",
    "υποψη",
    "υποψιν",
    "υπό",
    "υστερα",
    "φετος",
    "χαμηλα",
    "χθες",
    "χτες",
    "χωρις",
    "χωριστα",
    "ψηλα",
    "ω",
    "ωραια",
    "ως",
    "ωσ",
    "ωσαν",
    "ωσοτου",
    "ωσπου",
    "ωστε",
    "ωστοσο",
    "ωχ",
    "ἀλλ'",
    "ἀλλά",
    "ἀλλὰ",
    "ἀλλ’",
    "ἀπ",
    "ἀπό",
    "ἀπὸ",
    "ἀφ",
    "ἂν",
    "ἃ",
    "ἄλλος",
    "ἄλλοσ",
    "ἄν",
    "ἄρα",
    "ἅμα",
    "ἐάν",
    "ἐγώ",
    "ἐγὼ",
    "ἐκ",
    "ἐμόσ",
    "ἐμὸς",
    "ἐν",
    "ἐξ",
    "ἐπί",
    "ἐπεὶ",
    "ἐπὶ",
    "ἐστι",
    "ἐφ",
    "ἐὰν",
    "ἑαυτοῦ",
    "ἔτι",
    "ἡ",
    "ἢ",
    "ἣ",
    "ἤ",
    "ἥ",
    "ἧς",
    "ἵνα",
    "ὁ",
    "ὃ",
    "ὃν",
    "ὃς",
    "ὅ",
    "ὅδε",
    "ὅθεν",
    "ὅπερ",
    "ὅς",
    "ὅσ",
    "ὅστις",
    "ὅστισ",
    "ὅτε",
    "ὅτι",
    "ὑμόσ",
    "ὑπ",
    "ὑπέρ",
    "ὑπό",
    "ὑπὲρ",
    "ὑπὸ",
    "ὡς",
    "ὡσ",
    "ὥς",
    "ὥστε",
    "ὦ",
    "ᾧ",
    "∆α",
    "∆ε",
    "∆εινα",
    "∆εν",
    "∆εξια",
    "∆ηθεν",
    "∆ηλα∆η",
    "∆ι",
    "∆ια",
    "∆ιαρκως",
    "∆ικα",
    "∆ικο",
    "∆ικοι",
    "∆ικος",
    "∆ικου",
    "∆ικους",
    "∆ιολου",
    "∆ιπλα",
    "∆ιχως"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_en.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_en.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "'ll",
    "'tis",
    "'twas",
    "'ve",
    "10",
    "39",
    "a",
    "a's",
    "able",
    "ableabout",
    "about",
    "above",
    "abroad",
    "abst",
    "accordance",
    "according",
    "accordingly",
    "across",
    "act",
    "actually",
    "ad",
    "added",
    "adj",
    "adopted",
    "ae",
    "af",
    "affected",
    "affecting",
    "affects",
    "after",
    "afterwards",
    "ag",
    "again",
    "against",
    "ago",
    "ah",
    "ahead",
    "ai",
    "ain't",
    "aint",
    "al",
    "all",
    "allow",
    "allows",
    "almost",
    "alone",
    "along",
    "alongside",
    "already",
    "also",
    "although",
    "always",
    "am",
    "amid",
    "amidst",
    "among",
    "amongst",
    "amoungst",
    "amount",
    "an",
    "and",
    "announce",
    "another",
    "any",
    "anybody",
    "anyhow",
    "anymore",
    "anyone",
    "anything",
    "anyway",
    "anyways",
    "anywhere",
    "ao",
    "apart",
    "apparently",
    "appear",
    "appreciate",
    "appropriate",
    "approximately",
    "aq",
    "ar",
    "are",
    "area",
    "areas",
    "aren",
    "aren't",
    "arent",
    "arise",
    "around",
    "arpa",
    "as",
    "aside",
    "ask",
    "asked",
    "asking",
    "asks",
    "associated",
    "at",
    "au",
    "auth",
    "available",
    "aw",
    "away",
    "awfully",
    "az",
    "b",
    "ba",
    "back",
    "backed",
    "backing",
    "backs",
    "backward",
    "backwards",
    "bb",
    "bd",
    "be",
    "became",
    "because",
    "become",
    "becomes",
    "becoming",
    "been",
    "before",
    "beforehand",
    "began",
    "begin",
    "beginning",
    "beginnings",
    "begins",
    "behind",
    "being",
    "beings",
    "believe",
    "below",
    "beside",
    "besides",
    "best",
    "better",
    "between",
    "beyond",
    "bf",
    "bg",
    "bh",
    "bi",
    "big",
    "bill",
    "billion",
    "biol",
    "bj",
    "bm",
    "bn",
    "bo",
    "both",
    "bottom",
    "br",
    "brief",
    "briefly",
    "bs",
    "bt",
    "but",
    "buy",
    "bv",
    "bw",
    "by",
    "bz",
    "c",
    "c'mon",
    "c's",
    "ca",
    "call",
    "came",
    "can",
    "can't",
    "cannot",
    "cant",
    "caption",
    "case",
    "cases",
    "cause",
    "causes",
    "cc",
    "cd",
    "certain",
    "certainly",
    "cf",
    "cg",
    "ch",
    "changes",
    "ci",
    "ck",
    "cl",
    "clear",
    "clearly",
    "click",
    "cm",
    "cmon",
    "cn",
    "co",
    "co.",
    "com",
    "come",
    "comes",
    "computer",
    "con",
    "concerning",
    "consequently",
    "consider",
    "considering",
    "contain",
    "containing",
    "contains",
    "copy",
    "corresponding",
    "could",
    "could've",
    "couldn",
    "couldn't",
    "couldnt",
    "course",
    "cr",
    "cry",
    "cs",
    "cu",
    "currently",
    "cv",
    "cx",
    "cy",
    "cz",
    "d",
    "dare",
    "daren't",
    "darent",
    "date",
    "de",
    "dear",
    "definitely",
    "describe",
    "described",
    "despite",
    "detail",
    "did",
    "didn",
    "didn't",
    "didnt",
    "differ",
    "different",
    "differently",
    "directly",
    "dj",
    "dk",
    "dm",
    "do",
    "does",
    "doesn",
    "doesn't",
    "doesnt",
    "doing",
    "don",
    "don't",
    "done",
    "dont",
    "doubtful",
    "down",
    "downed",
    "downing",
    "downs",
    "downwards",
    "due",
    "during",
    "dz",
    "e",
    "each",
    "early",
    "ec",
    "ed",
    "edu",
    "ee",
    "effect",
    "eg",
    "eh",
    "eight",
    "eighty",
    "either",
    "eleven",
    "else",
    "elsewhere",
    "empty",
    "end",
    "ended",
    "ending",
    "ends",
    "enough",
    "entirely",
    "er",
    "es",
    "especially",
    "et",
    "et-al",
    "etc",
    "even",
    "evenly",
    "ever",
    "evermore",
    "every",
    "everybody",
    "everyone",
    "everything",
    "everywhere",
    "ex",
    "exactly",
    "example",
    "except",
    "f",
    "face",
    "faces",
    "fact",
    "facts",
    "fairly",
    "far",
    "farther",
    "felt",
    "few",
    "fewer",
    "ff",
    "fi",
    "fifteen",
    "fifth",
    "fifty",
    "fify",
    "fill",
    "find",
    "finds",
    "fire",
    "first",
    "five",
    "fix",
    "fj",
    "fk",
    "fm",
    "fo",
    "followed",
    "following",
    "follows",
    "for",
    "forever",
    "former",
    "formerly",
    "forth",
    "forty",
    "forward",
    "found",
    "four",
    "fr",
    "free",
    "from",
    "front",
    "full",
    "fully",
    "further",
    "furthered",
    "furthering",
    "furthermore",
    "furthers",
    "fx",
    "g",
    "ga",
    "gave",
    "gb",
    "gd",
    "ge",
    "general",
    "generally",
    "get",
    "gets",
    "getting",
    "gf",
    "gg",
    "gh",
    "gi",
    "give",
    "given",
    "gives",
    "giving",
    "gl",
    "gm",
    "gmt",
    "gn",
    "go",
    "goes",
    "going",
    "gone",
    "good",
    "goods",
    "got",
    "gotten",
    "gov",
    "gp",
    "gq",
    "gr",
    "great",
    "greater",
    "greatest",
    "greetings",
    "group",
    "grouped",
    "grouping",
    "groups",
    "gs",
    "gt",
    "gu",
    "gw",
    "gy",
    "h",
    "had",
    "hadn't",
    "hadnt",
    "half",
    "happens",
    "hardly",
    "has",
    "hasn",
    "hasn't",
    "hasnt",
    "have",
    "haven",
    "haven't",
    "havent",
    "having",
    "he",
    "he'd",
    "he'll",
    "he's",
    "hed",
    "hell",
    "hello",
    "help",
    "hence",
    "her",
    "here",
    "here's",
    "hereafter",
    "hereby",
    "herein",
    "heres",
    "hereupon",
    "hers",
    "herself",
    "herse”",
    "hes",
    "hi",
    "hid",
    "high",
    "higher",
    "highest",
    "him",
    "himself",
    "himse”",
    "his",
    "hither",
    "hk",
    "hm",
    "hn",
    "home",
    "homepage",
    "hopefully",
    "how",
    "how'd",
    "how'll",
    "how's",
    "howbeit",
    "however",
    "hr",
    "ht",
    "htm",
    "html",
    "http",
    "hu",
    "hundred",
    "i",
    "i'd",
    "i'll",
    "i'm",
    "i've",
    "i.e.",
    "id",
    "ie",
    "if",
    "ignored",
    "ii",
    "il",
    "ill",
    "im",
    "immediate",
    "immediately",
    "importance",
    "important",
    "in",
    "inasmuch",
    "inc",
    "inc.",
    "indeed",
    "index",
    "indicate",
    "indicated",
    "indicates",
    "information",
    "inner",
    "inside",
    "insofar",
    "instead",
    "int",
    "interest",
    "interested",
    "interesting",
    "interests",
    "into",
    "invention",
    "inward",
    "io",
    "iq",
    "ir",
    "is",
    "isn",
    "isn't",
    "isnt",
    "it",
    "it'd",
    "it'll",
    "it's",
    "itd",
    "itll",
    "its",
    "itself",
    "itse”",
    "ive",
    "j",
    "je",
    "jm",
    "jo",
    "join",
    "jp",
    "just",
    "k",
    "ke",
    "keep",
    "keeps",
    "kept",
    "keys",
    "kg",
    "kh",
    "ki",
    "kind",
    "km",
    "kn",
    "knew",
    "know",
    "known",
    "knows",
    "kp",
    "kr",
    "kw",
    "ky",
    "kz",
    "l",
    "la",
    "large",
    "largely",
    "last",
    "lately",
    "later",
    "latest",
    "latter",
    "latterly",
    "lb",
    "lc",
    "least",
    "length",
    "less",
    "lest",
    "let",
    "let's",
    "lets",
    "li",
    "like",
    "liked",
    "likely",
    "likewise",
    "line",
    "little",
    "lk",
    "ll",
    "long",
    "longer",
    "longest",
    "look",
    "looking",
    "looks",
    "low",
    "lower",
    "lr",
    "ls",
    "lt",
    "ltd",
    "lu",
    "lv",
    "ly",
    "m",
    "ma",
    "made",
    "mainly",
    "make",
    "makes",
    "making",
    "man",
    "many",
    "may",
    "maybe",
    "mayn't",
    "maynt",
    "mc",
    "md",
    "me",
    "mean",
    "means",
    "meantime",
    "meanwhile",
    "member",
    "members",
    "men",
    "merely",
    "mg",
    "mh",
    "microsoft",
    "might",
    "might've",
    "mightn't",
    "mightnt",
    "mil",
    "mill",
    "million",
    "mine",
    "minus",
    "miss",
    "mk",
    "ml",
    "mm",
    "mn",
    "mo",
    "more",
    "moreover",
    "most",
    "mostly",
    "move",
    "mp",
    "mq",
    "mr",
    "mrs",
    "ms",
    "msie",
    "mt",
    "mu",
    "much",
    "mug",
    "must",
    "must've",
    "mustn't",
    "mustnt",
    "mv",
    "mw",
    "mx",
    "my",
    "myself",
    "myse”",
    "mz",
    "n",
    "na",
    "name",
    "namely",
    "nay",
    "nc",
    "nd",
    "ne",
    "near",
    "nearly",
    "necessarily",
    "necessary",
    "need",
    "needed",
    "needing",
    "needn't",
    "neednt",
    "needs",
    "neither",
    "net",
    "netscape",
    "never",
    "neverf",
    "neverless",
    "nevertheless",
    "new",
    "newer",
    "newest",
    "next",
    "nf",
    "ng",
    "ni",
    "nine",
    "ninety",
    "nl",
    "no",
    "no-one",
    "nobody",
    "non",
    "none",
    "nonetheless",
    "noone",
    "nor",
    "normally",
    "nos",
    "not",
    "noted",
    "nothing",
    "notwithstanding",
    "novel",
    "now",
    "nowhere",
    "np",
    "nr",
    "nu",
    "null",
    "number",
    "numbers",
    "nz",
    "o",
    "obtain",
    "obtained",
    "obviously",
    "of",
    "off",
    "often",
    "oh",
    "ok",
    "okay",
    "old",
    "older",
    "oldest",
    "om",
    "omitted",
    "on",
    "once",
    "one",
    "one's",
    "ones",
    "only",
    "onto",
    "open",
    "opened",
    "opening",
    "opens",
    "opposite",
    "or",
    "ord",
    "order",
    "ordered",
    "ordering",
    "orders",
    "org",
    "other",
    "others",
    "otherwise",
    "ought",
    "oughtn't",
    "oughtnt",
    "our",
    "ours",
    "ourselves",
    "out",
    "outside",
    "over",
    "overall",
    "owing",
    "own",
    "p",
    "pa",
    "page",
    "pages",
    "part",
    "parted",
    "particular",
    "particularly",
    "parting",
    "parts",
    "past",
    "pe",
    "per",
    "perhaps",
    "pf",
    "pg",
    "ph",
    "pk",
    "pl",
    "place",
    "placed",
    "places",
    "please",
    "plus",
    "pm",
    "pmid",
    "pn",
    "point",
    "pointed",
    "pointing",
    "points",
    "poorly",
    "possible",
    "possibly",
    "potentially",
    "pp",
    "pr",
    "predominantly",
    "present",
    "presented",
    "presenting",
    "presents",
    "presumably",
    "previously",
    "primarily",
    "probably",
    "problem",
    "problems",
    "promptly",
    "proud",
    "provided",
    "provides",
    "pt",
    "put",
    "puts",
    "pw",
    "py",
    "q",
    "qa",
    "que",
    "quickly",
    "quite",
    "qv",
    "r",
    "ran",
    "rather",
    "rd",
    "re",
    "readily",
    "really",
    "reasonably",
    "recent",
    "recently",
    "ref",
    "refs",
    "regarding",
    "regardless",
    "regards",
    "related",
    "relatively",
    "research",
    "reserved",
    "respectively",
    "resulted",
    "resulting",
    "results",
    "right",
    "ring",
    "ro",
    "room",
    "rooms",
    "round",
    "ru",
    "run",
    "rw",
    "s",
    "sa",
    "said",
    "same",
    "saw",
    "say",
    "saying",
    "says",
    "sb",
    "sc",
    "sd",
    "se",
    "sec",
    "second",
    "secondly",
    "seconds",
    "section",
    "see",
    "seeing",
    "seem",
    "seemed",
    "seeming",
    "seems",
    "seen",
    "sees",
    "self",
    "selves",
    "sensible",
    "sent",
    "serious",
    "seriously",
    "seven",
    "seventy",
    "several",
    "sg",
    "sh",
    "shall",
    "shan't",
    "shant",
    "she",
    "she'd",
    "she'll",
    "she's",
    "shed",
    "shell",
    "shes",
    "should",
    "should've",
    "shouldn",
    "shouldn't",
    "shouldnt",
    "show",
    "showed",
    "showing",
    "shown",
    "showns",
    "shows",
    "si",
    "side",
    "sides",
    "significant",
    "significantly",
    "similar",
    "similarly",
    "since",
    "sincere",
    "site",
    "six",
    "sixty",
    "sj",
    "sk",
    "sl",
    "slightly",
    "sm",
    "small",
    "smaller",
    "smallest",
    "sn",
    "so",
    "some",
    "somebody",
    "someday",
    "somehow",
    "someone",
    "somethan",
    "something",
    "sometime",
    "sometimes",
    "somewhat",
    "somewhere",
    "soon",
    "sorry",
    "specifically",
    "specified",
    "specify",
    "specifying",
    "sr",
    "st",
    "state",
    "states",
    "still",
    "stop",
    "strongly",
    "su",
    "sub",
    "substantially",
    "successfully",
    "such",
    "sufficiently",
    "suggest",
    "sup",
    "sure",
    "sv",
    "sy",
    "system",
    "sz",
    "t",
    "t's",
    "take",
    "taken",
    "taking",
    "tc",
    "td",
    "tell",
    "ten",
    "tends",
    "test",
    "text",
    "tf",
    "tg",
    "th",
    "than",
    "thank",
    "thanks",
    "thanx",
    "that",
    "that'll",
    "that's",
    "that've",
    "thatll",
    "thats",
    "thatve",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "thence",
    "there",
    "there'd",
    "there'll",
    "there're",
    "there's",
    "there've",
    "thereafter",
    "thereby",
    "thered",
    "therefore",
    "therein",
    "therell",
    "thereof",
    "therere",
    "theres",
    "thereto",
    "thereupon",
    "thereve",
    "these",
    "they",
    "they'd",
    "they'll",
    "they're",
    "they've",
    "theyd",
    "theyll",
    "theyre",
    "theyve",
    "thick",
    "thin",
    "thing",
    "things",
    "think",
    "thinks",
    "third",
    "thirty",
    "this",
    "thorough",
    "thoroughly",
    "those",
    "thou",
    "though",
    "thoughh",
    "thought",
    "thoughts",
    "thousand",
    "three",
    "throug",
    "through",
    "throughout",
    "thru",
    "thus",
    "til",
    "till",
    "tip",
    "tis",
    "tj",
    "tk",
    "tm",
    "tn",
    "to",
    "today",
    "together",
    "too",
    "took",
    "top",
    "toward",
    "towards",
    "tp",
    "tr",
    "tried",
    "tries",
    "trillion",
    "truly",
    "try",
    "trying",
    "ts",
    "tt",
    "turn",
    "turned",
    "turning",
    "turns",
    "tv",
    "tw",
    "twas",
    "twelve",
    "twenty",
    "twice",
    "two",
    "tz",
    "u",
    "ua",
    "ug",
    "uk",
    "um",
    "un",
    "under",
    "underneath",
    "undoing",
    "unfortunately",
    "unless",
    "unlike",
    "unlikely",
    "until",
    "unto",
    "up",
    "upon",
    "ups",
    "upwards",
    "us",
    "use",
    "used",
    "useful",
    "usefully",
    "usefulness",
    "uses",
    "using",
    "usually",
    "uucp",
    "uy",
    "uz",
    "v",
    "va",
    "value",
    "various",
    "vc",
    "ve",
    "versus",
    "very",
    "vg",
    "vi",
    "via",
    "viz",
    "vn",
    "vol",
    "vols",
    "vs",
    "vu",
    "w",
    "want",
    "wanted",
    "wanting",
    "wants",
    "was",
    "wasn",
    "wasn't",
    "wasnt",
    "way",
    "ways",
    "we",
    "we'd",
    "we'll",
    "we're",
    "we've",
    "web",
    "webpage",
    "website",
    "wed",
    "welcome",
    "well",
    "wells",
    "went",
    "were",
    "weren",
    "weren't",
    "werent",
    "weve",
    "wf",
    "what",
    "what'd",
    "what'll",
    "what's",
    "what've",
    "whatever",
    "whatll",
    "whats",
    "whatve",
    "when",
    "when'd",
    "when'll",
    "when's",
    "whence",
    "whenever",
    "where",
    "where'd",
    "where'll",
    "where's",
    "whereafter",
    "whereas",
    "whereby",
    "wherein",
    "wheres",
    "whereupon",
    "wherever",
    "whether",
    "which",
    "whichever",
    "while",
    "whilst",
    "whim",
    "whither",
    "who",
    "who'd",
    "who'll",
    "who's",
    "whod",
    "whoever",
    "whole",
    "wholl",
    "whom",
    "whomever",
    "whos",
    "whose",
    "why",
    "why'd",
    "why'll",
    "why's",
    "widely",
    "width",
    "will",
    "willing",
    "wish",
    "with",
    "within",
    "without",
    "won",
    "won't",
    "wonder",
    "wont",
    "words",
    "work",
    "worked",
    "working",
    "works",
    "world",
    "would",
    "would've",
    "wouldn",
    "wouldn't",
    "wouldnt",
    "ws",
    "www",
    "x",
    "y",
    "ye",
    "year",
    "years",
    "yes",
    "yet",
    "you",
    "you'd",
    "you'll",
    "you're",
    "you've",
    "youd",
    "youll",
    "young",
    "younger",
    "youngest",
    "your",
    "youre",
    "yours",
    "yourself",
    "yourselves",
    "youve",
    "yt",
    "yu",
    "z",
    "za",
    "zero",
    "zm",
    "zr"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_eo.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_eo.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "adiaŭ",
    "ajn",
    "al",
    "ankoraŭ",
    "antaŭ",
    "aŭ",
    "bonan",
    "bonvole",
    "bonvolu",
    "bv",
    "ci",
    "cia",
    "cian",
    "cin",
    "d-ro",
    "da",
    "de",
    "dek",
    "deka",
    "do",
    "doktor'",
    "doktoro",
    "du",
    "dua",
    "dum",
    "eble",
    "ekz",
    "ekzemple",
    "en",
    "estas",
    "estis",
    "estos",
    "estu",
    "estus",
    "eĉ",
    "f-no",
    "feliĉan",
    "for",
    "fraŭlino",
    "ha",
    "havas",
    "havis",
    "havos",
    "havu",
    "havus",
    "he",
    "ho",
    "hu",
    "ili",
    "ilia",
    "ilian",
    "ilin",
    "inter",
    "io",
    "ion",
    "iu",
    "iujn",
    "iun",
    "ja",
    "jam",
    "je",
    "jes",
    "k",
    "kaj",
    "ke",
    "kio",
    "kion",
    "kiu",
    "kiujn",
    "kiun",
    "kvankam",
    "kvar",
    "kvara",
    "kvazaŭ",
    "kvin",
    "kvina",
    "la",
    "li",
    "lia",
    "lian",
    "lin",
    "malantaŭ",
    "male",
    "malgraŭ",
    "mem",
    "mi",
    "mia",
    "mian",
    "min",
    "minus",
    "naŭ",
    "naŭa",
    "ne",
    "nek",
    "nenio",
    "nenion",
    "neniu",
    "neniun",
    "nepre",
    "ni",
    "nia",
    "nian",
    "nin",
    "nu",
    "nun",
    "nur",
    "ok",
    "oka",
    "oni",
    "onia",
    "onian",
    "onin",
    "plej",
    "pli",
    "plu",
    "plus",
    "por",
    "post",
    "preter",
    "s-no",
    "s-ro",
    "se",
    "sed",
    "sep",
    "sepa",
    "ses",
    "sesa",
    "si",
    "sia",
    "sian",
    "sin",
    "sinjor'",
    "sinjorino",
    "sinjoro",
    "sub",
    "super",
    "supren",
    "sur",
    "tamen",
    "tio",
    "tion",
    "tiu",
    "tiujn",
    "tiun",
    "tra",
    "tri",
    "tria",
    "tuj",
    "tute",
    "unu",
    "unua",
    "ve",
    "verŝajne",
    "vi",
    "via",
    "vian",
    "vin",
    "ĉi",
    "ĉio",
    "ĉion",
    "ĉiu",
    "ĉiujn",
    "ĉiun",
    "ĉu",
    "ĝi",
    "ĝia",
    "ĝian",
    "ĝin",
    "ĝis",
    "ĵus",
    "ŝi",
    "ŝia",
    "ŝin"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_es.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_es.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "_",
    "a",
    "actualmente",
    "acuerdo",
    "adelante",
    "ademas",
    "además",
    "adrede",
    "afirmó",
    "agregó",
    "ahi",
    "ahora",
    "ahí",
    "al",
    "algo",
    "alguna",
    "algunas",
    "alguno",
    "algunos",
    "algún",
    "alli",
    "allí",
    "alrededor",
    "ambos",
    "ampleamos",
    "antano",
    "antaño",
    "ante",
    "anterior",
    "antes",
    "apenas",
    "aproximadamente",
    "aquel",
    "aquella",
    "aquellas",
    "aquello",
    "aquellos",
    "aqui",
    "aquél",
    "aquélla",
    "aquéllas",
    "aquéllos",
    "aquí",
    "arriba",
    "arribaabajo",
    "aseguró",
    "asi",
    "así",
    "atras",
    "aun",
    "aunque",
    "ayer",
    "añadió",
    "aún",
    "b",
    "bajo",
    "bastante",
    "bien",
    "breve",
    "buen",
    "buena",
    "buenas",
    "bueno",
    "buenos",
    "c",
    "cada",
    "casi",
    "cerca",
    "cierta",
    "ciertas",
    "cierto",
    "ciertos",
    "cinco",
    "claro",
    "comentó",
    "como",
    "con",
    "conmigo",
    "conocer",
    "conseguimos",
    "conseguir",
    "considera",
    "consideró",
    "consigo",
    "consigue",
    "consiguen",
    "consigues",
    "contigo",
    "contra",
    "cosas",
    "creo",
    "cual",
    "cuales",
    "cualquier",
    "cuando",
    "cuanta",
    "cuantas",
    "cuanto",
    "cuantos",
    "cuatro",
    "cuenta",
    "cuál",
    "cuáles",
    "cuándo",
    "cuánta",
    "cuántas",
    "cuánto",
    "cuántos",
    "cómo",
    "d",
    "da",
    "dado",
    "dan",
    "dar",
    "de",
    "debajo",
    "debe",
    "deben",
    "debido",
    "decir",
    "dejó",
    "del",
    "delante",
    "demasiado",
    "demás",
    "dentro",
    "deprisa",
    "desde",
    "despacio",
    "despues",
    "después",
    "detras",
    "detrás",
    "dia",
    "dias",
    "dice",
    "dicen",
    "dicho",
    "dieron",
    "diferente",
    "diferentes",
    "dijeron",
    "dijo",
    "dio",
    "donde",
    "dos",
    "durante",
    "día",
    "días",
    "dónde",
    "e",
    "ejemplo",
    "el",
    "ella",
    "ellas",
    "ello",
    "ellos",
    "embargo",
    "empleais",
    "emplean",
    "emplear",
    "empleas",
    "empleo",
    "en",
    "encima",
    "encuentra",
    "enfrente",
    "enseguida",
    "entonces",
    "entre",
    "era",
    "erais",
    "eramos",
    "eran",
    "eras",
    "eres",
    "es",
    "esa",
    "esas",
    "ese",
    "eso",
    "esos",
    "esta",
    "estaba",
    "estabais",
    "estaban",
    "estabas",
    "estad",
    "estada",
    "estadas",
    "estado",
    "estados",
    "estais",
    "estamos",
    "estan",
    "estando",
    "estar",
    "estaremos",
    "estará",
    "estarán",
    "estarás",
    "estaré",
    "estaréis",
    "estaría",
    "estaríais",
    "estaríamos",
    "estarían",
    "estarías",
    "estas",
    "este",
    "estemos",
    "esto",
    "estos",
    "estoy",
    "estuve",
    "estuviera",
    "estuvierais",
    "estuvieran",
    "estuvieras",
    "estuvieron",
    "estuviese",
    "estuvieseis",
    "estuviesen",
    "estuvieses",
    "estuvimos",
    "estuviste",
    "estuvisteis",
    "estuviéramos",
    "estuviésemos",
    "estuvo",
    "está",
    "estábamos",
    "estáis",
    "están",
    "estás",
    "esté",
    "estéis",
    "estén",
    "estés",
    "ex",
    "excepto",
    "existe",
    "existen",
    "explicó",
    "expresó",
    "f",
    "fin",
    "final",
    "fue",
    "fuera",
    "fuerais",
    "fueran",
    "fueras",
    "fueron",
    "fuese",
    "fueseis",
    "fuesen",
    "fueses",
    "fui",
    "fuimos",
    "fuiste",
    "fuisteis",
    "fuéramos",
    "fuésemos",
    "g",
    "general",
    "gran",
    "grandes",
    "gueno",
    "h",
    "ha",
    "haber",
    "habia",
    "habida",
    "habidas",
    "habido",
    "habidos",
    "habiendo",
    "habla",
    "hablan",
    "habremos",
    "habrá",
    "habrán",
    "habrás",
    "habré",
    "habréis",
    "habría",
    "habríais",
    "habríamos",
    "habrían",
    "habrías",
    "habéis",
    "había",
    "habíais",
    "habíamos",
    "habían",
    "habías",
    "hace",
    "haceis",
    "hacemos",
    "hacen",
    "hacer",
    "hacerlo",
    "haces",
    "hacia",
    "haciendo",
    "hago",
    "han",
    "has",
    "hasta",
    "hay",
    "haya",
    "hayamos",
    "hayan",
    "hayas",
    "hayáis",
    "he",
    "hecho",
    "hemos",
    "hicieron",
    "hizo",
    "horas",
    "hoy",
    "hube",
    "hubiera",
    "hubierais",
    "hubieran",
    "hubieras",
    "hubieron",
    "hubiese",
    "hubieseis",
    "hubiesen",
    "hubieses",
    "hubimos",
    "hubiste",
    "hubisteis",
    "hubiéramos",
    "hubiésemos",
    "hubo",
    "i",
    "igual",
    "incluso",
    "indicó",
    "informo",
    "informó",
    "intenta",
    "intentais",
    "intentamos",
    "intentan",
    "intentar",
    "intentas",
    "intento",
    "ir",
    "j",
    "junto",
    "k",
    "l",
    "la",
    "lado",
    "largo",
    "las",
    "le",
    "lejos",
    "les",
    "llegó",
    "lleva",
    "llevar",
    "lo",
    "los",
    "luego",
    "lugar",
    "m",
    "mal",
    "manera",
    "manifestó",
    "mas",
    "mayor",
    "me",
    "mediante",
    "medio",
    "mejor",
    "mencionó",
    "menos",
    "menudo",
    "mi",
    "mia",
    "mias",
    "mientras",
    "mio",
    "mios",
    "mis",
    "misma",
    "mismas",
    "mismo",
    "mismos",
    "modo",
    "momento",
    "mucha",
    "muchas",
    "mucho",
    "muchos",
    "muy",
    "más",
    "mí",
    "mía",
    "mías",
    "mío",
    "míos",
    "n",
    "nada",
    "nadie",
    "ni",
    "ninguna",
    "ningunas",
    "ninguno",
    "ningunos",
    "ningún",
    "no",
    "nos",
    "nosotras",
    "nosotros",
    "nuestra",
    "nuestras",
    "nuestro",
    "nuestros",
    "nueva",
    "nuevas",
    "nuevo",
    "nuevos",
    "nunca",
    "o",
    "ocho",
    "os",
    "otra",
    "otras",
    "otro",
    "otros",
    "p",
    "pais",
    "para",
    "parece",
    "parte",
    "partir",
    "pasada",
    "pasado",
    "paìs",
    "peor",
    "pero",
    "pesar",
    "poca",
    "pocas",
    "poco",
    "pocos",
    "podeis",
    "podemos",
    "poder",
    "podria",
    "podriais",
    "podriamos",
    "podrian",
    "podrias",
    "podrá",
    "podrán",
    "podría",
    "podrían",
    "poner",
    "por",
    "por qué",
    "porque",
    "posible",
    "primer",
    "primera",
    "primero",
    "primeros",
    "principalmente",
    "pronto",
    "propia",
    "propias",
    "propio",
    "propios",
    "proximo",
    "próximo",
    "próximos",
    "pudo",
    "pueda",
    "puede",
    "pueden",
    "puedo",
    "pues",
    "q",
    "qeu",
    "que",
    "quedó",
    "queremos",
    "quien",
    "quienes",
    "quiere",
    "quiza",
    "quizas",
    "quizá",
    "quizás",
    "quién",
    "quiénes",
    "qué",
    "r",
    "raras",
    "realizado",
    "realizar",
    "realizó",
    "repente",
    "respecto",
    "s",
    "sabe",
    "sabeis",
    "sabemos",
    "saben",
    "saber",
    "sabes",
    "sal",
    "salvo",
    "se",
    "sea",
    "seamos",
    "sean",
    "seas",
    "segun",
    "segunda",
    "segundo",
    "según",
    "seis",
    "ser",
    "sera",
    "seremos",
    "será",
    "serán",
    "serás",
    "seré",
    "seréis",
    "sería",
    "seríais",
    "seríamos",
    "serían",
    "serías",
    "seáis",
    "señaló",
    "si",
    "sido",
    "siempre",
    "siendo",
    "siete",
    "sigue",
    "siguiente",
    "sin",
    "sino",
    "sobre",
    "sois",
    "sola",
    "solamente",
    "solas",
    "solo",
    "solos",
    "somos",
    "son",
    "soy",
    "soyos",
    "su",
    "supuesto",
    "sus",
    "suya",
    "suyas",
    "suyo",
    "suyos",
    "sé",
    "sí",
    "sólo",
    "t",
    "tal",
    "tambien",
    "también",
    "tampoco",
    "tan",
    "tanto",
    "tarde",
    "te",
    "temprano",
    "tendremos",
    "tendrá",
    "tendrán",
    "tendrás",
    "tendré",
    "tendréis",
    "tendría",
    "tendríais",
    "tendríamos",
    "tendrían",
    "tendrías",
    "tened",
    "teneis",
    "tenemos",
    "tener",
    "tenga",
    "tengamos",
    "tengan",
    "tengas",
    "tengo",
    "tengáis",
    "tenida",
    "tenidas",
    "tenido",
    "tenidos",
    "teniendo",
    "tenéis",
    "tenía",
    "teníais",
    "teníamos",
    "tenían",
    "tenías",
    "tercera",
    "ti",
    "tiempo",
    "tiene",
    "tienen",
    "tienes",
    "toda",
    "todas",
    "todavia",
    "todavía",
    "todo",
    "todos",
    "total",
    "trabaja",
    "trabajais",
    "trabajamos",
    "trabajan",
    "trabajar",
    "trabajas",
    "trabajo",
    "tras",
    "trata",
    "través",
    "tres",
    "tu",
    "tus",
    "tuve",
    "tuviera",
    "tuvierais",
    "tuvieran",
    "tuvieras",
    "tuvieron",
    "tuviese",
    "tuvieseis",
    "tuviesen",
    "tuvieses",
    "tuvimos",
    "tuviste",
    "tuvisteis",
    "tuviéramos",
    "tuviésemos",
    "tuvo",
    "tuya",
    "tuyas",
    "tuyo",
    "tuyos",
    "tú",
    "u",
    "ultimo",
    "un",
    "una",
    "unas",
    "uno",
    "unos",
    "usa",
    "usais",
    "usamos",
    "usan",
    "usar",
    "usas",
    "uso",
    "usted",
    "ustedes",
    "v",
    "va",
    "vais",
    "valor",
    "vamos",
    "van",
    "varias",
    "varios",
    "vaya",
    "veces",
    "ver",
    "verdad",
    "verdadera",
    "verdadero",
    "vez",
    "vosotras",
    "vosotros",
    "voy",
    "vuestra",
    "vuestras",
    "vuestro",
    "vuestros",
    "w",
    "x",
    "y",
    "ya",
    "yo",
    "z",
    "él",
    "éramos",
    "ésa",
    "ésas",
    "ése",
    "ésos",
    "ésta",
    "éstas",
    "éste",
    "éstos",
    "última",
    "últimas",
    "último",
    "últimos"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_et.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_et.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "aga",
    "ei",
    "et",
    "ja",
    "jah",
    "kas",
    "kui",
    "kõik",
    "ma",
    "me",
    "mida",
    "midagi",
    "mind",
    "minu",
    "mis",
    "mu",
    "mul",
    "mulle",
    "nad",
    "nii",
    "oled",
    "olen",
    "oli",
    "oma",
    "on",
    "pole",
    "sa",
    "seda",
    "see",
    "selle",
    "siin",
    "siis",
    "ta",
    "te",
    "ära"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_eu.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_eu.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "al",
    "anitz",
    "arabera",
    "asko",
    "baina",
    "bat",
    "batean",
    "batek",
    "bati",
    "batzuei",
    "batzuek",
    "batzuetan",
    "batzuk",
    "bera",
    "beraiek",
    "berau",
    "berauek",
    "bere",
    "berori",
    "beroriek",
    "beste",
    "bezala",
    "da",
    "dago",
    "dira",
    "ditu",
    "du",
    "dute",
    "edo",
    "egin",
    "ere",
    "eta",
    "eurak",
    "ez",
    "gainera",
    "gu",
    "gutxi",
    "guzti",
    "haiei",
    "haiek",
    "haietan",
    "hainbeste",
    "hala",
    "han",
    "handik",
    "hango",
    "hara",
    "hari",
    "hark",
    "hartan",
    "hau",
    "hauei",
    "hauek",
    "hauetan",
    "hemen",
    "hemendik",
    "hemengo",
    "hi",
    "hona",
    "honek",
    "honela",
    "honetan",
    "honi",
    "hor",
    "hori",
    "horiei",
    "horiek",
    "horietan",
    "horko",
    "horra",
    "horrek",
    "horrela",
    "horretan",
    "horri",
    "hortik",
    "hura",
    "izan",
    "ni",
    "noiz",
    "nola",
    "non",
    "nondik",
    "nongo",
    "nor",
    "nora",
    "ze",
    "zein",
    "zen",
    "zenbait",
    "zenbat",
    "zer",
    "zergatik",
    "ziren",
    "zituen",
    "zu",
    "zuek",
    "zuen",
    "zuten"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_fa.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_fa.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "!",
    ",",
    ".",
    ":",
    ";",
    "،",
    "؛",
    "؟",
    "آباد",
    "آره",
    "آری",
    "آمد",
    "آمده",
    "آن",
    "آنان",
    "آنجا",
    "آنطور",
    "آنقدر",
    "آنكه",
    "آنها",
    "آنچه",
    "آنکه",
    "آورد",
    "آورده",
    "آيد",
    "آی",
    "آیا",
    "آیند",
    "اتفاقا",
    "اثرِ",
    "احتراما",
    "احتمالا",
    "اخیر",
    "اری",
    "از",
    "ازجمله",
    "اساسا",
    "است",
    "استفاد",
    "استفاده",
    "اش",
    "اشکارا",
    "اصلا",
    "اصولا",
    "اعلام",
    "اغلب",
    "اكنون",
    "الان",
    "البته",
    "البتّه",
    "ام",
    "اما",
    "امروز",
    "امروزه",
    "امسال",
    "امشب",
    "امور",
    "ان",
    "انجام",
    "اند",
    "انشاالله",
    "انصافا",
    "انطور",
    "انقدر",
    "انها",
    "انچنان",
    "انکه",
    "انگار",
    "او",
    "اول",
    "اولا",
    "اي",
    "ايشان",
    "ايم",
    "اين",
    "اينكه",
    "اکثرا",
    "اکنون",
    "اگر",
    "ای",
    "ایا",
    "اید",
    "ایشان",
    "ایم",
    "این",
    "اینجا",
    "ایند",
    "اینطور",
    "اینقدر",
    "اینها",
    "اینچنین",
    "اینک",
    "اینکه",
    "اینگونه",
    "با",
    "بار",
    "بارة",
    "باره",
    "بارها",
    "باز",
    "بازهم",
    "باش",
    "باشد",
    "باشم",
    "باشند",
    "باشيم",
    "باشی",
    "باشید",
    "باشیم",
    "بالا",
    "بالاخره",
    "بالایِ",
    "بالطبع",
    "بايد",
    "باید",
    "بتوان",
    "بتواند",
    "بتوانی",
    "بتوانیم",
    "بخش",
    "بخشی",
    "بخواه",
    "بخواهد",
    "بخواهم",
    "بخواهند",
    "بخواهی",
    "بخواهید",
    "بخواهیم",
    "بد",
    "بدون",
    "بر",
    "برابر",
    "برابرِ",
    "براحتی",
    "براساس",
    "براستی",
    "براي",
    "برای",
    "برایِ",
    "برخوردار",
    "برخي",
    "برخی",
    "برداري",
    "برعکس",
    "بروز",
    "بزرگ",
    "بزودی",
    "بسا",
    "بسيار",
    "بسياري",
    "بسیار",
    "بسیاری",
    "بطور",
    "بعد",
    "بعدا",
    "بعدها",
    "بعری",
    "بعضا",
    "بعضي",
    "بلافاصله",
    "بلكه",
    "بله",
    "بلکه",
    "بلی",
    "بنابراين",
    "بنابراین",
    "بندي",
    "به",
    "بهتر",
    "بهترين",
    "بود",
    "بودم",
    "بودن",
    "بودند",
    "بوده",
    "بودی",
    "بودید",
    "بودیم",
    "بویژه",
    "بي",
    "بيست",
    "بيش",
    "بيشتر",
    "بيشتري",
    "بين",
    "بکن",
    "بکند",
    "بکنم",
    "بکنند",
    "بکنی",
    "بکنید",
    "بکنیم",
    "بگو",
    "بگوید",
    "بگویم",
    "بگویند",
    "بگویی",
    "بگویید",
    "بگوییم",
    "بگیر",
    "بگیرد",
    "بگیرم",
    "بگیرند",
    "بگیری",
    "بگیرید",
    "بگیریم",
    "بی",
    "بیا",
    "بیاب",
    "بیابد",
    "بیابم",
    "بیابند",
    "بیابی",
    "بیابید",
    "بیابیم",
    "بیاور",
    "بیاورد",
    "بیاورم",
    "بیاورند",
    "بیاوری",
    "بیاورید",
    "بیاوریم",
    "بیاید",
    "بیایم",
    "بیایند",
    "بیایی",
    "بیایید",
    "بیاییم",
    "بیرون",
    "بیرونِ",
    "بیش",
    "بیشتر",
    "بیشتری",
    "بین",
    "ت",
    "تا",
    "تازه",
    "تاكنون",
    "تان",
    "تاکنون",
    "تحت",
    "تر",
    "تر  براساس",
    "ترين",
    "تقریبا",
    "تلویحا",
    "تمام",
    "تماما",
    "تمامي",
    "تنها",
    "تو",
    "تواند",
    "توانست",
    "توانستم",
    "توانستن",
    "توانستند",
    "توانسته",
    "توانستی",
    "توانستیم",
    "توانم",
    "توانند",
    "توانی",
    "توانید",
    "توانیم",
    "توسط",
    "تولِ",
    "تویِ",
    "ثانیا",
    "جا",
    "جاي",
    "جايي",
    "جای",
    "جدا",
    "جديد",
    "جدید",
    "جريان",
    "جریان",
    "جز",
    "جلوگيري",
    "جلویِ",
    "جمعا",
    "جناح",
    "جهت",
    "حاضر",
    "حال",
    "حالا",
    "حتما",
    "حتي",
    "حتی",
    "حداکثر",
    "حدودا",
    "حدودِ",
    "حق",
    "خارجِ",
    "خب",
    "خدمات",
    "خصوصا",
    "خلاصه",
    "خواست",
    "خواستم",
    "خواستن",
    "خواستند",
    "خواسته",
    "خواستی",
    "خواستید",
    "خواستیم",
    "خواهد",
    "خواهم",
    "خواهند",
    "خواهيم",
    "خواهی",
    "خواهید",
    "خواهیم",
    "خوب",
    "خود",
    "خودت",
    "خودتان",
    "خودش",
    "خودشان",
    "خودم",
    "خودمان",
    "خوشبختانه",
    "خويش",
    "خویش",
    "خویشتن",
    "خیاه",
    "خیر",
    "خیلی",
    "داد",
    "دادم",
    "دادن",
    "دادند",
    "داده",
    "دادی",
    "دادید",
    "دادیم",
    "دار",
    "دارد",
    "دارم",
    "دارند",
    "داريم",
    "داری",
    "دارید",
    "داریم",
    "داشت",
    "داشتم",
    "داشتن",
    "داشتند",
    "داشته",
    "داشتی",
    "داشتید",
    "داشتیم",
    "دانست",
    "دانند",
    "دایم",
    "دایما",
    "در",
    "درباره",
    "درمجموع",
    "درون",
    "دریغ",
    "دقیقا",
    "دنبالِ",
    "ده",
    "دهد",
    "دهم",
    "دهند",
    "دهی",
    "دهید",
    "دهیم",
    "دو",
    "دوباره",
    "دوم",
    "ديده",
    "ديروز",
    "ديگر",
    "ديگران",
    "ديگري",
    "دیر",
    "دیروز",
    "دیگر",
    "دیگران",
    "دیگری",
    "را",
    "راحت",
    "راسا",
    "راستی",
    "راه",
    "رسما",
    "رسید",
    "رفت",
    "رفته",
    "رو",
    "روب",
    "روز",
    "روزانه",
    "روزهاي",
    "روي",
    "روی",
    "رویِ",
    "ريزي",
    "زمان",
    "زمانی",
    "زمینه",
    "زود",
    "زياد",
    "زير",
    "زيرا",
    "زیر",
    "زیرِ",
    "سابق",
    "ساخته",
    "سازي",
    "سالانه",
    "سالیانه",
    "سایر",
    "سراسر",
    "سرانجام",
    "سریعا",
    "سریِ",
    "سعي",
    "سمتِ",
    "سوم",
    "سوي",
    "سوی",
    "سویِ",
    "سپس",
    "شان",
    "شايد",
    "شاید",
    "شخصا",
    "شد",
    "شدم",
    "شدن",
    "شدند",
    "شده",
    "شدی",
    "شدید",
    "شدیدا",
    "شدیم",
    "شش",
    "شش  نداشته",
    "شما",
    "شناسي",
    "شود",
    "شوم",
    "شوند",
    "شونده",
    "شوی",
    "شوید",
    "شویم",
    "صرفا",
    "صورت",
    "ضدِّ",
    "ضدِّ",
    "ضمن",
    "طبعا",
    "طبقِ",
    "طبیعتا",
    "طرف",
    "طريق",
    "طریق",
    "طور",
    "طي",
    "طی",
    "ظاهرا",
    "عدم",
    "عقبِ",
    "علّتِ",
    "علیه",
    "عمدا",
    "عمدتا",
    "عمل",
    "عملا",
    "عنوان",
    "عنوانِ",
    "غالبا",
    "غير",
    "غیر",
    "فردا",
    "فعلا",
    "فقط",
    "فكر",
    "فوق",
    "قابل",
    "قبل",
    "قبلا",
    "قدری",
    "قصدِ",
    "قطعا",
    "كرد",
    "كردم",
    "كردن",
    "كردند",
    "كرده",
    "كسي",
    "كل",
    "كمتر",
    "كند",
    "كنم",
    "كنند",
    "كنيد",
    "كنيم",
    "كه",
    "لااقل",
    "لطفا",
    "لطفاً",
    "ما",
    "مان",
    "مانند",
    "مانندِ",
    "مبادا",
    "متاسفانه",
    "متعاقبا",
    "مثل",
    "مثلا",
    "مثلِ",
    "مجانی",
    "مجددا",
    "مجموعا",
    "مختلف",
    "مدام",
    "مدت",
    "مدّتی",
    "مردم",
    "مرسی",
    "مستقیما",
    "مسلما",
    "مطمینا",
    "معمولا",
    "مقابل",
    "ممکن",
    "من",
    "موارد",
    "مورد",
    "موقتا",
    "مي",
    "ميليارد",
    "ميليون",
    "مگر",
    "می",
    "می شود",
    "میان",
    "می‌رسد",
    "می‌رود",
    "می‌شود",
    "می‌کنیم",
    "ناشي",
    "نام",
    "ناگاه",
    "ناگهان",
    "ناگهانی",
    "نبايد",
    "نباید",
    "نبود",
    "نخست",
    "نخستين",
    "نخواهد",
    "نخواهم",
    "نخواهند",
    "نخواهی",
    "نخواهید",
    "نخواهیم",
    "ندارد",
    "ندارم",
    "ندارند",
    "نداری",
    "ندارید",
    "نداریم",
    "نداشت",
    "نداشتم",
    "نداشتند",
    "نداشته",
    "نداشتی",
    "نداشتید",
    "نداشتیم",
    "نزديك",
    "نزدِ",
    "نزدیکِ",
    "نسبتا",
    "نشان",
    "نشده",
    "نظير",
    "نظیر",
    "نكرده",
    "نمايد",
    "نمي",
    "نمی",
    "نمی‌شود",
    "نه",
    "نهایتا",
    "نوع",
    "نوعي",
    "نوعی",
    "نيز",
    "نيست",
    "نگاه",
    "نیز",
    "نیست",
    "ها",
    "هاي",
    "هايي",
    "های",
    "هایی",
    "هبچ",
    "هر",
    "هرچه",
    "هرگز",
    "هزار",
    "هست",
    "هستم",
    "هستند",
    "هستيم",
    "هستی",
    "هستید",
    "هستیم",
    "هفت",
    "هم",
    "همان",
    "همه",
    "همواره",
    "همين",
    "همچنان",
    "همچنين",
    "همچنین",
    "همچون",
    "همیشه",
    "همین",
    "هنوز",
    "هنگام",
    "هنگامِ",
    "هنگامی",
    "هيچ",
    "هیچ",
    "هیچگاه",
    "و",
    "واقعا",
    "واقعی",
    "وجود",
    "وسطِ",
    "وضع",
    "وقتي",
    "وقتی",
    "وقتیکه",
    "ولی",
    "وي",
    "وگو",
    "وی",
    "ویژه",
    "يا",
    "يابد",
    "يك",
    "يكديگر",
    "يكي",
    "ّه",
    "٪",
    "پارسال",
    "پاعینِ",
    "پس",
    "پنج",
    "پيش",
    "پیدا",
    "پیش",
    "پیشاپیش",
    "پیشتر",
    "پیشِ",
    "چرا",
    "چطور",
    "چقدر",
    "چنان",
    "چنانچه",
    "چنانکه",
    "چند",
    "چندین",
    "چنين",
    "چنین",
    "چه",
    "چهار",
    "چو",
    "چون",
    "چيزي",
    "چگونه",
    "چیز",
    "چیزی",
    "چیست",
    "کاش",
    "کامل",
    "کاملا",
    "کتبا",
    "کجا",
    "کجاست",
    "کدام",
    "کرد",
    "کردم",
    "کردن",
    "کردند",
    "کرده",
    "کردی",
    "کردید",
    "کردیم",
    "کس",
    "کسانی",
    "کسی",
    "کل",
    "کلا",
    "کم",
    "کماکان",
    "کمتر",
    "کمتری",
    "کمی",
    "کن",
    "کنار",
    "کنارِ",
    "کند",
    "کنم",
    "کنند",
    "کننده",
    "کنون",
    "کنونی",
    "کنی",
    "کنید",
    "کنیم",
    "که",
    "کو",
    "کَی",
    "کی",
    "گاه",
    "گاهی",
    "گذاري",
    "گذاشته",
    "گذشته",
    "گردد",
    "گرفت",
    "گرفتم",
    "گرفتن",
    "گرفتند",
    "گرفته",
    "گرفتی",
    "گرفتید",
    "گرفتیم",
    "گروهي",
    "گفت",
    "گفتم",
    "گفتن",
    "گفتند",
    "گفته",
    "گفتی",
    "گفتید",
    "گفتیم",
    "گه",
    "گهگاه",
    "گو",
    "گويد",
    "گويند",
    "گویا",
    "گوید",
    "گویم",
    "گویند",
    "گویی",
    "گویید",
    "گوییم",
    "گيرد",
    "گيري",
    "گیرد",
    "گیرم",
    "گیرند",
    "گیری",
    "گیرید",
    "گیریم",
    "ی",
    "یا",
    "یابد",
    "یابم",
    "یابند",
    "یابی",
    "یابید",
    "یابیم",
    "یافت",
    "یافتم",
    "یافتن",
    "یافته",
    "یافتی",
    "یافتید",
    "یافتیم",
    "یعنی",
    "یقینا",
    "یه",
    "یک",
    "یکی",
    "۰",
    "۱",
    "۲",
    "۳",
    "۴",
    "۵",
    "۶",
    "۷",
    "۸",
    "۹"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_fi.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_fi.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "aiemmin",
    "aika",
    "aikaa",
    "aikaan",
    "aikaisemmin",
    "aikaisin",
    "aikajen",
    "aikana",
    "aikoina",
    "aikoo",
    "aikovat",
    "aina",
    "ainakaan",
    "ainakin",
    "ainoa",
    "ainoat",
    "aiomme",
    "aion",
    "aiotte",
    "aist",
    "aivan",
    "ajan",
    "alas",
    "alemmas",
    "alkuisin",
    "alkuun",
    "alla",
    "alle",
    "aloitamme",
    "aloitan",
    "aloitat",
    "aloitatte",
    "aloitattivat",
    "aloitettava",
    "aloitettevaksi",
    "aloitettu",
    "aloitimme",
    "aloitin",
    "aloitit",
    "aloititte",
    "aloittaa",
    "aloittamatta",
    "aloitti",
    "aloittivat",
    "alta",
    "aluksi",
    "alussa",
    "alusta",
    "annettavaksi",
    "annetteva",
    "annettu",
    "ansiosta",
    "antaa",
    "antamatta",
    "antoi",
    "aoua",
    "apu",
    "asia",
    "asiaa",
    "asian",
    "asiasta",
    "asiat",
    "asioiden",
    "asioihin",
    "asioita",
    "asti",
    "avuksi",
    "avulla",
    "avun",
    "avutta",
    "edelle",
    "edelleen",
    "edellä",
    "edeltä",
    "edemmäs",
    "edes",
    "edessä",
    "edestä",
    "ehkä",
    "ei",
    "eikä",
    "eilen",
    "eivät",
    "eli",
    "ellei",
    "elleivät",
    "ellemme",
    "ellen",
    "ellet",
    "ellette",
    "emme",
    "en",
    "enemmän",
    "eniten",
    "ennen",
    "ensi",
    "ensimmäinen",
    "ensimmäiseksi",
    "ensimmäisen",
    "ensimmäisenä",
    "ensimmäiset",
    "ensimmäisiksi",
    "ensimmäisinä",
    "ensimmäisiä",
    "ensimmäistä",
    "ensin",
    "entinen",
    "entisen",
    "entisiä",
    "entisten",
    "entistä",
    "enää",
    "eri",
    "erittäin",
    "erityisesti",
    "eräiden",
    "eräs",
    "eräät",
    "esi",
    "esiin",
    "esillä",
    "esimerkiksi",
    "et",
    "eteen",
    "etenkin",
    "etessa",
    "ette",
    "ettei",
    "että",
    "haikki",
    "halua",
    "haluaa",
    "haluamatta",
    "haluamme",
    "haluan",
    "haluat",
    "haluatte",
    "haluavat",
    "halunnut",
    "halusi",
    "halusimme",
    "halusin",
    "halusit",
    "halusitte",
    "halusivat",
    "halutessa",
    "haluton",
    "he",
    "hei",
    "heidän",
    "heidät",
    "heihin",
    "heille",
    "heillä",
    "heiltä",
    "heissä",
    "heistä",
    "heitä",
    "helposti",
    "heti",
    "hetkellä",
    "hieman",
    "hitaasti",
    "hoikein",
    "huolimatta",
    "huomenna",
    "hyvien",
    "hyviin",
    "hyviksi",
    "hyville",
    "hyviltä",
    "hyvin",
    "hyvinä",
    "hyvissä",
    "hyvistä",
    "hyviä",
    "hyvä",
    "hyvät",
    "hyvää",
    "hän",
    "häneen",
    "hänelle",
    "hänellä",
    "häneltä",
    "hänen",
    "hänessä",
    "hänestä",
    "hänet",
    "häntä",
    "ihan",
    "ilman",
    "ilmeisesti",
    "itse",
    "itsensä",
    "itseään",
    "ja",
    "jo",
    "johon",
    "joiden",
    "joihin",
    "joiksi",
    "joilla",
    "joille",
    "joilta",
    "joina",
    "joissa",
    "joista",
    "joita",
    "joka",
    "jokainen",
    "jokin",
    "joko",
    "joksi",
    "joku",
    "jolla",
    "jolle",
    "jolloin",
    "jolta",
    "jompikumpi",
    "jona",
    "jonka",
    "jonkin",
    "jonne",
    "joo",
    "jopa",
    "jos",
    "joskus",
    "jossa",
    "josta",
    "jota",
    "jotain",
    "joten",
    "jotenkin",
    "jotenkuten",
    "jotka",
    "jotta",
    "jouduimme",
    "jouduin",
    "jouduit",
    "jouduitte",
    "joudumme",
    "joudun",
    "joudutte",
    "joukkoon",
    "joukossa",
    "joukosta",
    "joutua",
    "joutui",
    "joutuivat",
    "joutumaan",
    "joutuu",
    "joutuvat",
    "juuri",
    "jälkeen",
    "jälleen",
    "jää",
    "kahdeksan",
    "kahdeksannen",
    "kahdella",
    "kahdelle",
    "kahdelta",
    "kahden",
    "kahdessa",
    "kahdesta",
    "kahta",
    "kahteen",
    "kai",
    "kaiken",
    "kaikille",
    "kaikilta",
    "kaikkea",
    "kaikki",
    "kaikkia",
    "kaikkiaan",
    "kaikkialla",
    "kaikkialle",
    "kaikkialta",
    "kaikkien",
    "kaikkin",
    "kaksi",
    "kannalta",
    "kannattaa",
    "kanssa",
    "kanssaan",
    "kanssamme",
    "kanssani",
    "kanssanne",
    "kanssasi",
    "kauan",
    "kauemmas",
    "kaukana",
    "kautta",
    "kehen",
    "keiden",
    "keihin",
    "keiksi",
    "keille",
    "keillä",
    "keiltä",
    "keinä",
    "keissä",
    "keistä",
    "keitten",
    "keittä",
    "keitä",
    "keneen",
    "keneksi",
    "kenelle",
    "kenellä",
    "keneltä",
    "kenen",
    "kenenä",
    "kenessä",
    "kenestä",
    "kenet",
    "kenettä",
    "kennessästä",
    "kenties",
    "kerran",
    "kerta",
    "kertaa",
    "keskellä",
    "kesken",
    "keskimäärin",
    "ketkä",
    "ketä",
    "kiitos",
    "kohti",
    "koko",
    "kokonaan",
    "kolmas",
    "kolme",
    "kolmen",
    "kolmesti",
    "koska",
    "koskaan",
    "kovin",
    "kuin",
    "kuinka",
    "kuinkan",
    "kuitenkaan",
    "kuitenkin",
    "kuka",
    "kukaan",
    "kukin",
    "kukka",
    "kumpainen",
    "kumpainenkaan",
    "kumpi",
    "kumpikaan",
    "kumpikin",
    "kun",
    "kuten",
    "kuuden",
    "kuusi",
    "kuutta",
    "kylliksi",
    "kyllä",
    "kymmenen",
    "kyse",
    "liian",
    "liki",
    "lisäksi",
    "lisää",
    "lla",
    "luo",
    "luona",
    "lähekkäin",
    "lähelle",
    "lähellä",
    "läheltä",
    "lähemmäs",
    "lähes",
    "lähinnä",
    "lähtien",
    "läpi",
    "mahdollisimman",
    "mahdollista",
    "me",
    "meidän",
    "meidät",
    "meihin",
    "meille",
    "meillä",
    "meiltä",
    "meissä",
    "meistä",
    "meitä",
    "melkein",
    "melko",
    "menee",
    "meneet",
    "menemme",
    "menen",
    "menet",
    "menette",
    "menevät",
    "meni",
    "menimme",
    "menin",
    "menit",
    "menivät",
    "mennessä",
    "mennyt",
    "menossa",
    "mihin",
    "mikin",
    "miksi",
    "mikä",
    "mikäli",
    "mikään",
    "mille",
    "milloin",
    "milloinkan",
    "millä",
    "miltä",
    "minkä",
    "minne",
    "minua",
    "minulla",
    "minulle",
    "minulta",
    "minun",
    "minussa",
    "minusta",
    "minut",
    "minuun",
    "minä",
    "missä",
    "mistä",
    "miten",
    "mitkä",
    "mitä",
    "mitään",
    "moi",
    "molemmat",
    "mones",
    "monesti",
    "monet",
    "moni",
    "moniaalla",
    "moniaalle",
    "moniaalta",
    "monta",
    "muassa",
    "muiden",
    "muita",
    "muka",
    "mukaan",
    "mukaansa",
    "mukana",
    "mutta",
    "muu",
    "muualla",
    "muualle",
    "muualta",
    "muuanne",
    "muulloin",
    "muun",
    "muut",
    "muuta",
    "muutama",
    "muutaman",
    "muuten",
    "myöhemmin",
    "myös",
    "myöskin",
    "myöskään",
    "myötä",
    "ne",
    "neljä",
    "neljän",
    "neljää",
    "niiden",
    "niihin",
    "niiksi",
    "niille",
    "niillä",
    "niiltä",
    "niin",
    "niinä",
    "niissä",
    "niistä",
    "niitä",
    "noiden",
    "noihin",
    "noiksi",
    "noilla",
    "noille",
    "noilta",
    "noin",
    "noina",
    "noissa",
    "noista",
    "noita",
    "nopeammin",
    "nopeasti",
    "nopeiten",
    "nro",
    "nuo",
    "nyt",
    "näiden",
    "näihin",
    "näiksi",
    "näille",
    "näillä",
    "näiltä",
    "näin",
    "näinä",
    "näissä",
    "näissähin",
    "näissälle",
    "näissältä",
    "näissästä",
    "näistä",
    "näitä",
    "nämä",
    "ohi",
    "oikea",
    "oikealla",
    "oikein",
    "ole",
    "olemme",
    "olen",
    "olet",
    "olette",
    "oleva",
    "olevan",
    "olevat",
    "oli",
    "olimme",
    "olin",
    "olisi",
    "olisimme",
    "olisin",
    "olisit",
    "olisitte",
    "olisivat",
    "olit",
    "olitte",
    "olivat",
    "olla",
    "olleet",
    "olli",
    "ollut",
    "oma",
    "omaa",
    "omaan",
    "omaksi",
    "omalle",
    "omalta",
    "oman",
    "omassa",
    "omat",
    "omia",
    "omien",
    "omiin",
    "omiksi",
    "omille",
    "omilta",
    "omissa",
    "omista",
    "on",
    "onkin",
    "onko",
    "ovat",
    "paikoittain",
    "paitsi",
    "pakosti",
    "paljon",
    "paremmin",
    "parempi",
    "parhaillaan",
    "parhaiten",
    "perusteella",
    "peräti",
    "pian",
    "pieneen",
    "pieneksi",
    "pienelle",
    "pienellä",
    "pieneltä",
    "pienempi",
    "pienestä",
    "pieni",
    "pienin",
    "poikki",
    "puolesta",
    "puolestaan",
    "päälle",
    "runsaasti",
    "saakka",
    "sadam",
    "sama",
    "samaa",
    "samaan",
    "samalla",
    "samallalta",
    "samallassa",
    "samallasta",
    "saman",
    "samat",
    "samoin",
    "sata",
    "sataa",
    "satojen",
    "se",
    "seitsemän",
    "sekä",
    "sen",
    "seuraavat",
    "siellä",
    "sieltä",
    "siihen",
    "siinä",
    "siis",
    "siitä",
    "sijaan",
    "siksi",
    "sille",
    "silloin",
    "sillä",
    "silti",
    "siltä",
    "sinne",
    "sinua",
    "sinulla",
    "sinulle",
    "sinulta",
    "sinun",
    "sinussa",
    "sinusta",
    "sinut",
    "sinuun",
    "sinä",
    "sisäkkäin",
    "sisällä",
    "siten",
    "sitten",
    "sitä",
    "ssa",
    "sta",
    "suoraan",
    "suuntaan",
    "suuren",
    "suuret",
    "suuri",
    "suuria",
    "suurin",
    "suurten",
    "taa",
    "taas",
    "taemmas",
    "tahansa",
    "tai",
    "takaa",
    "takaisin",
    "takana",
    "takia",
    "tallä",
    "tapauksessa",
    "tarpeeksi",
    "tavalla",
    "tavoitteena",
    "te",
    "teidän",
    "teidät",
    "teihin",
    "teille",
    "teillä",
    "teiltä",
    "teissä",
    "teistä",
    "teitä",
    "tietysti",
    "todella",
    "toinen",
    "toisaalla",
    "toisaalle",
    "toisaalta",
    "toiseen",
    "toiseksi",
    "toisella",
    "toiselle",
    "toiselta",
    "toisemme",
    "toisen",
    "toisensa",
    "toisessa",
    "toisesta",
    "toista",
    "toistaiseksi",
    "toki",
    "tosin",
    "tuhannen",
    "tuhat",
    "tule",
    "tulee",
    "tulemme",
    "tulen",
    "tulet",
    "tulette",
    "tulevat",
    "tulimme",
    "tulin",
    "tulisi",
    "tulisimme",
    "tulisin",
    "tulisit",
    "tulisitte",
    "tulisivat",
    "tulit",
    "tulitte",
    "tulivat",
    "tulla",
    "tulleet",
    "tullut",
    "tuntuu",
    "tuo",
    "tuohon",
    "tuoksi",
    "tuolla",
    "tuolle",
    "tuolloin",
    "tuolta",
    "tuon",
    "tuona",
    "tuonne",
    "tuossa",
    "tuosta",
    "tuota",
    "tuotä",
    "tuskin",
    "tykö",
    "tähän",
    "täksi",
    "tälle",
    "tällä",
    "tällöin",
    "tältä",
    "tämä",
    "tämän",
    "tänne",
    "tänä",
    "tänään",
    "tässä",
    "tästä",
    "täten",
    "tätä",
    "täysin",
    "täytyvät",
    "täytyy",
    "täällä",
    "täältä",
    "ulkopuolella",
    "usea",
    "useasti",
    "useimmiten",
    "usein",
    "useita",
    "uudeksi",
    "uudelleen",
    "uuden",
    "uudet",
    "uusi",
    "uusia",
    "uusien",
    "uusinta",
    "uuteen",
    "uutta",
    "vaan",
    "vahemmän",
    "vai",
    "vaiheessa",
    "vaikea",
    "vaikean",
    "vaikeat",
    "vaikeilla",
    "vaikeille",
    "vaikeilta",
    "vaikeissa",
    "vaikeista",
    "vaikka",
    "vain",
    "varmasti",
    "varsin",
    "varsinkin",
    "varten",
    "vasen",
    "vasenmalla",
    "vasta",
    "vastaan",
    "vastakkain",
    "vastan",
    "verran",
    "vielä",
    "vierekkäin",
    "vieressä",
    "vieri",
    "viiden",
    "viime",
    "viimeinen",
    "viimeisen",
    "viimeksi",
    "viisi",
    "voi",
    "voidaan",
    "voimme",
    "voin",
    "voisi",
    "voit",
    "voitte",
    "voivat",
    "vuoden",
    "vuoksi",
    "vuosi",
    "vuosien",
    "vuosina",
    "vuotta",
    "vähemmän",
    "vähintään",
    "vähiten",
    "vähän",
    "välillä",
    "yhdeksän",
    "yhden",
    "yhdessä",
    "yhteen",
    "yhteensä",
    "yhteydessä",
    "yhteyteen",
    "yhtä",
    "yhtäälle",
    "yhtäällä",
    "yhtäältä",
    "yhtään",
    "yhä",
    "yksi",
    "yksin",
    "yksittäin",
    "yleensä",
    "ylemmäs",
    "yli",
    "ylös",
    "ympäri",
    "älköön",
    "älä"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_fr.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_fr.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "abord",
    "absolument",
    "afin",
    "ah",
    "ai",
    "aie",
    "aient",
    "aies",
    "ailleurs",
    "ainsi",
    "ait",
    "allaient",
    "allo",
    "allons",
    "allô",
    "alors",
    "anterieur",
    "anterieure",
    "anterieures",
    "apres",
    "après",
    "as",
    "assez",
    "attendu",
    "au",
    "aucun",
    "aucune",
    "aucuns",
    "aujourd",
    "aujourd'hui",
    "aupres",
    "auquel",
    "aura",
    "aurai",
    "auraient",
    "aurais",
    "aurait",
    "auras",
    "aurez",
    "auriez",
    "aurions",
    "aurons",
    "auront",
    "aussi",
    "autant",
    "autre",
    "autrefois",
    "autrement",
    "autres",
    "autrui",
    "aux",
    "auxquelles",
    "auxquels",
    "avaient",
    "avais",
    "avait",
    "avant",
    "avec",
    "avez",
    "aviez",
    "avions",
    "avoir",
    "avons",
    "ayant",
    "ayez",
    "ayons",
    "b",
    "bah",
    "bas",
    "basee",
    "bat",
    "beau",
    "beaucoup",
    "bien",
    "bigre",
    "bon",
    "boum",
    "bravo",
    "brrr",
    "c",
    "car",
    "ce",
    "ceci",
    "cela",
    "celle",
    "celle-ci",
    "celle-là",
    "celles",
    "celles-ci",
    "celles-là",
    "celui",
    "celui-ci",
    "celui-là",
    "celà",
    "cent",
    "cependant",
    "certain",
    "certaine",
    "certaines",
    "certains",
    "certes",
    "ces",
    "cet",
    "cette",
    "ceux",
    "ceux-ci",
    "ceux-là",
    "chacun",
    "chacune",
    "chaque",
    "cher",
    "chers",
    "chez",
    "chiche",
    "chut",
    "chère",
    "chères",
    "ci",
    "cinq",
    "cinquantaine",
    "cinquante",
    "cinquantième",
    "cinquième",
    "clac",
    "clic",
    "combien",
    "comme",
    "comment",
    "comparable",
    "comparables",
    "compris",
    "concernant",
    "contre",
    "couic",
    "crac",
    "d",
    "da",
    "dans",
    "de",
    "debout",
    "dedans",
    "dehors",
    "deja",
    "delà",
    "depuis",
    "dernier",
    "derniere",
    "derriere",
    "derrière",
    "des",
    "desormais",
    "desquelles",
    "desquels",
    "dessous",
    "dessus",
    "deux",
    "deuxième",
    "deuxièmement",
    "devant",
    "devers",
    "devra",
    "devrait",
    "different",
    "differentes",
    "differents",
    "différent",
    "différente",
    "différentes",
    "différents",
    "dire",
    "directe",
    "directement",
    "dit",
    "dite",
    "dits",
    "divers",
    "diverse",
    "diverses",
    "dix",
    "dix-huit",
    "dix-neuf",
    "dix-sept",
    "dixième",
    "doit",
    "doivent",
    "donc",
    "dont",
    "dos",
    "douze",
    "douzième",
    "dring",
    "droite",
    "du",
    "duquel",
    "durant",
    "dès",
    "début",
    "désormais",
    "e",
    "effet",
    "egale",
    "egalement",
    "egales",
    "eh",
    "elle",
    "elle-même",
    "elles",
    "elles-mêmes",
    "en",
    "encore",
    "enfin",
    "entre",
    "envers",
    "environ",
    "es",
    "essai",
    "est",
    "et",
    "etant",
    "etc",
    "etre",
    "eu",
    "eue",
    "eues",
    "euh",
    "eurent",
    "eus",
    "eusse",
    "eussent",
    "eusses",
    "eussiez",
    "eussions",
    "eut",
    "eux",
    "eux-mêmes",
    "exactement",
    "excepté",
    "extenso",
    "exterieur",
    "eûmes",
    "eût",
    "eûtes",
    "f",
    "fais",
    "faisaient",
    "faisant",
    "fait",
    "faites",
    "façon",
    "feront",
    "fi",
    "flac",
    "floc",
    "fois",
    "font",
    "force",
    "furent",
    "fus",
    "fusse",
    "fussent",
    "fusses",
    "fussiez",
    "fussions",
    "fut",
    "fûmes",
    "fût",
    "fûtes",
    "g",
    "gens",
    "h",
    "ha",
    "haut",
    "hein",
    "hem",
    "hep",
    "hi",
    "ho",
    "holà",
    "hop",
    "hormis",
    "hors",
    "hou",
    "houp",
    "hue",
    "hui",
    "huit",
    "huitième",
    "hum",
    "hurrah",
    "hé",
    "hélas",
    "i",
    "ici",
    "il",
    "ils",
    "importe",
    "j",
    "je",
    "jusqu",
    "jusque",
    "juste",
    "k",
    "l",
    "la",
    "laisser",
    "laquelle",
    "las",
    "le",
    "lequel",
    "les",
    "lesquelles",
    "lesquels",
    "leur",
    "leurs",
    "longtemps",
    "lors",
    "lorsque",
    "lui",
    "lui-meme",
    "lui-même",
    "là",
    "lès",
    "m",
    "ma",
    "maint",
    "maintenant",
    "mais",
    "malgre",
    "malgré",
    "maximale",
    "me",
    "meme",
    "memes",
    "merci",
    "mes",
    "mien",
    "mienne",
    "miennes",
    "miens",
    "mille",
    "mince",
    "mine",
    "minimale",
    "moi",
    "moi-meme",
    "moi-même",
    "moindres",
    "moins",
    "mon",
    "mot",
    "moyennant",
    "multiple",
    "multiples",
    "même",
    "mêmes",
    "n",
    "na",
    "naturel",
    "naturelle",
    "naturelles",
    "ne",
    "neanmoins",
    "necessaire",
    "necessairement",
    "neuf",
    "neuvième",
    "ni",
    "nombreuses",
    "nombreux",
    "nommés",
    "non",
    "nos",
    "notamment",
    "notre",
    "nous",
    "nous-mêmes",
    "nouveau",
    "nouveaux",
    "nul",
    "néanmoins",
    "nôtre",
    "nôtres",
    "o",
    "oh",
    "ohé",
    "ollé",
    "olé",
    "on",
    "ont",
    "onze",
    "onzième",
    "ore",
    "ou",
    "ouf",
    "ouias",
    "oust",
    "ouste",
    "outre",
    "ouvert",
    "ouverte",
    "ouverts",
    "o|",
    "où",
    "p",
    "paf",
    "pan",
    "par",
    "parce",
    "parfois",
    "parle",
    "parlent",
    "parler",
    "parmi",
    "parole",
    "parseme",
    "partant",
    "particulier",
    "particulière",
    "particulièrement",
    "pas",
    "passé",
    "pendant",
    "pense",
    "permet",
    "personne",
    "personnes",
    "peu",
    "peut",
    "peuvent",
    "peux",
    "pff",
    "pfft",
    "pfut",
    "pif",
    "pire",
    "pièce",
    "plein",
    "plouf",
    "plupart",
    "plus",
    "plusieurs",
    "plutôt",
    "possessif",
    "possessifs",
    "possible",
    "possibles",
    "pouah",
    "pour",
    "pourquoi",
    "pourrais",
    "pourrait",
    "pouvait",
    "prealable",
    "precisement",
    "premier",
    "première",
    "premièrement",
    "pres",
    "probable",
    "probante",
    "procedant",
    "proche",
    "près",
    "psitt",
    "pu",
    "puis",
    "puisque",
    "pur",
    "pure",
    "q",
    "qu",
    "quand",
    "quant",
    "quant-à-soi",
    "quanta",
    "quarante",
    "quatorze",
    "quatre",
    "quatre-vingt",
    "quatrième",
    "quatrièmement",
    "que",
    "quel",
    "quelconque",
    "quelle",
    "quelles",
    "quelqu'un",
    "quelque",
    "quelques",
    "quels",
    "qui",
    "quiconque",
    "quinze",
    "quoi",
    "quoique",
    "r",
    "rare",
    "rarement",
    "rares",
    "relative",
    "relativement",
    "remarquable",
    "rend",
    "rendre",
    "restant",
    "reste",
    "restent",
    "restrictif",
    "retour",
    "revoici",
    "revoilà",
    "rien",
    "s",
    "sa",
    "sacrebleu",
    "sait",
    "sans",
    "sapristi",
    "sauf",
    "se",
    "sein",
    "seize",
    "selon",
    "semblable",
    "semblaient",
    "semble",
    "semblent",
    "sent",
    "sept",
    "septième",
    "sera",
    "serai",
    "seraient",
    "serais",
    "serait",
    "seras",
    "serez",
    "seriez",
    "serions",
    "serons",
    "seront",
    "ses",
    "seul",
    "seule",
    "seulement",
    "si",
    "sien",
    "sienne",
    "siennes",
    "siens",
    "sinon",
    "six",
    "sixième",
    "soi",
    "soi-même",
    "soient",
    "sois",
    "soit",
    "soixante",
    "sommes",
    "son",
    "sont",
    "sous",
    "souvent",
    "soyez",
    "soyons",
    "specifique",
    "specifiques",
    "speculatif",
    "stop",
    "strictement",
    "subtiles",
    "suffisant",
    "suffisante",
    "suffit",
    "suis",
    "suit",
    "suivant",
    "suivante",
    "suivantes",
    "suivants",
    "suivre",
    "sujet",
    "superpose",
    "sur",
    "surtout",
    "t",
    "ta",
    "tac",
    "tandis",
    "tant",
    "tardive",
    "te",
    "tel",
    "telle",
    "tellement",
    "telles",
    "tels",
    "tenant",
    "tend",
    "tenir",
    "tente",
    "tes",
    "tic",
    "tien",
    "tienne",
    "tiennes",
    "tiens",
    "toc",
    "toi",
    "toi-même",
    "ton",
    "touchant",
    "toujours",
    "tous",
    "tout",
    "toute",
    "toutefois",
    "toutes",
    "treize",
    "trente",
    "tres",
    "trois",
    "troisième",
    "troisièmement",
    "trop",
    "très",
    "tsoin",
    "tsouin",
    "tu",
    "té",
    "u",
    "un",
    "une",
    "unes",
    "uniformement",
    "unique",
    "uniques",
    "uns",
    "v",
    "va",
    "vais",
    "valeur",
    "vas",
    "vers",
    "via",
    "vif",
    "vifs",
    "vingt",
    "vivat",
    "vive",
    "vives",
    "vlan",
    "voici",
    "voie",
    "voient",
    "voilà",
    "voire",
    "vont",
    "vos",
    "votre",
    "vous",
    "vous-mêmes",
    "vu",
    "vé",
    "vôtre",
    "vôtres",
    "w",
    "x",
    "y",
    "z",
    "zut",
    "à",
    "â",
    "ça",
    "ès",
    "étaient",
    "étais",
    "était",
    "étant",
    "état",
    "étiez",
    "étions",
    "été",
    "étée",
    "étées",
    "étés",
    "êtes",
    "être",
    "ô"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ga.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ga.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "ach",
    "ag",
    "agus",
    "an",
    "aon",
    "ar",
    "arna",
    "as",
    "b'",
    "ba",
    "beirt",
    "bhúr",
    "caoga",
    "ceathair",
    "ceathrar",
    "chomh",
    "chtó",
    "chuig",
    "chun",
    "cois",
    "céad",
    "cúig",
    "cúigear",
    "d'",
    "daichead",
    "dar",
    "de",
    "deich",
    "deichniúr",
    "den",
    "dhá",
    "do",
    "don",
    "dtí",
    "dá",
    "dár",
    "dó",
    "faoi",
    "faoin",
    "faoina",
    "faoinár",
    "fara",
    "fiche",
    "gach",
    "gan",
    "go",
    "gur",
    "haon",
    "hocht",
    "i",
    "iad",
    "idir",
    "in",
    "ina",
    "ins",
    "inár",
    "is",
    "le",
    "leis",
    "lena",
    "lenár",
    "m'",
    "mar",
    "mo",
    "mé",
    "na",
    "nach",
    "naoi",
    "naonúr",
    "ná",
    "ní",
    "níor",
    "nó",
    "nócha",
    "ocht",
    "ochtar",
    "os",
    "roimh",
    "sa",
    "seacht",
    "seachtar",
    "seachtó",
    "seasca",
    "seisear",
    "siad",
    "sibh",
    "sinn",
    "sna",
    "sé",
    "sí",
    "tar",
    "thar",
    "thú",
    "triúr",
    "trí",
    "trína",
    "trínár",
    "tríocha",
    "tú",
    "um",
    "ár",
    "é",
    "éis",
    "í",
    "ó",
    "ón",
    "óna",
    "ónár"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_gl.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_gl.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "alí",
    "ao",
    "aos",
    "aquel",
    "aquela",
    "aquelas",
    "aqueles",
    "aquilo",
    "aquí",
    "as",
    "así",
    "aínda",
    "ben",
    "cando",
    "che",
    "co",
    "coa",
    "coas",
    "comigo",
    "con",
    "connosco",
    "contigo",
    "convosco",
    "cos",
    "cun",
    "cunha",
    "cunhas",
    "cuns",
    "da",
    "dalgunha",
    "dalgunhas",
    "dalgún",
    "dalgúns",
    "das",
    "de",
    "del",
    "dela",
    "delas",
    "deles",
    "desde",
    "deste",
    "do",
    "dos",
    "dun",
    "dunha",
    "dunhas",
    "duns",
    "e",
    "el",
    "ela",
    "elas",
    "eles",
    "en",
    "era",
    "eran",
    "esa",
    "esas",
    "ese",
    "eses",
    "esta",
    "estaba",
    "estar",
    "este",
    "estes",
    "estiven",
    "estou",
    "está",
    "están",
    "eu",
    "facer",
    "foi",
    "foron",
    "fun",
    "había",
    "hai",
    "iso",
    "isto",
    "la",
    "las",
    "lle",
    "lles",
    "lo",
    "los",
    "mais",
    "me",
    "meu",
    "meus",
    "min",
    "miña",
    "miñas",
    "moi",
    "na",
    "nas",
    "neste",
    "nin",
    "no",
    "non",
    "nos",
    "nosa",
    "nosas",
    "noso",
    "nosos",
    "nun",
    "nunha",
    "nunhas",
    "nuns",
    "nós",
    "o",
    "os",
    "ou",
    "para",
    "pero",
    "pode",
    "pois",
    "pola",
    "polas",
    "polo",
    "polos",
    "por",
    "que",
    "se",
    "senón",
    "ser",
    "seu",
    "seus",
    "sexa",
    "sido",
    "sobre",
    "súa",
    "súas",
    "tamén",
    "tan",
    "te",
    "ten",
    "ter",
    "teu",
    "teus",
    "teñen",
    "teño",
    "ti",
    "tido",
    "tiven",
    "tiña",
    "túa",
    "túas",
    "un",
    "unha",
    "unhas",
    "uns",
    "vos",
    "vosa",
    "vosas",
    "voso",
    "vosos",
    "vós",
    "á",
    "é",
    "ó",
    "ós"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_gu.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_gu.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "અંગે",
    "અંદર",
    "અથવા",
    "અને",
    "અમને",
    "અમારું",
    "અમે",
    "અહીં",
    "આ",
    "આગળ",
    "આથી",
    "આનું",
    "આને",
    "આપણને",
    "આપણું",
    "આપણે",
    "આપી",
    "આર",
    "આવી",
    "આવે",
    "ઉપર",
    "ઉભા",
    "ઊંચે",
    "ઊભું",
    "એ",
    "એક",
    "એન",
    "એના",
    "એનાં",
    "એની",
    "એનું",
    "એને",
    "એનો",
    "એમ",
    "એવા",
    "એવાં",
    "એવી",
    "એવું",
    "એવો",
    "ઓછું",
    "કંઈક",
    "કઈ",
    "કયું",
    "કયો",
    "કરતાં",
    "કરવું",
    "કરી",
    "કરીએ",
    "કરું",
    "કરે",
    "કરેલું",
    "કર્યા",
    "કર્યાં",
    "કર્યું",
    "કર્યો",
    "કાંઈ",
    "કે",
    "કેટલું",
    "કેમ",
    "કેવી",
    "કેવું",
    "કોઈ",
    "કોઈક",
    "કોણ",
    "કોણે",
    "કોને",
    "ક્યાં",
    "ક્યારે",
    "ખૂબ",
    "ગઈ",
    "ગયા",
    "ગયાં",
    "ગયું",
    "ગયો",
    "ઘણું",
    "છ",
    "છતાં",
    "છીએ",
    "છું",
    "છે",
    "છેક",
    "છો",
    "જ",
    "જાય",
    "જી",
    "જે",
    "જેટલું",
    "જેને",
    "જેમ",
    "જેવી",
    "જેવું",
    "જેવો",
    "જો",
    "જોઈએ",
    "જ્યાં",
    "જ્યારે",
    "ઝાઝું",
    "તને",
    "તમને",
    "તમારું",
    "તમે",
    "તા",
    "તારાથી",
    "તારામાં",
    "તારું",
    "તું",
    "તે",
    "તેં",
    "તેઓ",
    "તેણે",
    "તેથી",
    "તેના",
    "તેની",
    "તેનું",
    "તેને",
    "તેમ",
    "તેમનું",
    "તેમને",
    "તેવી",
    "તેવું",
    "તો",
    "ત્યાં",
    "ત્યારે",
    "થઇ",
    "થઈ",
    "થઈએ",
    "થતા",
    "થતાં",
    "થતી",
    "થતું",
    "થતો",
    "થયા",
    "થયાં",
    "થયું",
    "થયેલું",
    "થયો",
    "થવું",
    "થાઉં",
    "થાઓ",
    "થાય",
    "થી",
    "થોડું",
    "દરેક",
    "ન",
    "નં",
    "નં.",
    "નથી",
    "નહિ",
    "નહી",
    "નહીં",
    "ના",
    "ની",
    "નીચે",
    "નું",
    "ને",
    "નો",
    "પછી",
    "પણ",
    "પર",
    "પરંતુ",
    "પહેલાં",
    "પાછળ",
    "પાસે",
    "પોતાનું",
    "પ્રત્યેક",
    "ફક્ત",
    "ફરી",
    "ફરીથી",
    "બંને",
    "બધા",
    "બધું",
    "બની",
    "બહાર",
    "બહુ",
    "બાદ",
    "બે",
    "મને",
    "મા",
    "માં",
    "માટે",
    "માત્ર",
    "મારું",
    "મી",
    "મૂકવું",
    "મૂકી",
    "મૂક્યા",
    "મૂક્યાં",
    "મૂક્યું",
    "મેં",
    "રહી",
    "રહે",
    "રહેવું",
    "રહ્યા",
    "રહ્યાં",
    "રહ્યો",
    "રીતે",
    "રૂ.",
    "રૂા",
    "લેતા",
    "લેતું",
    "લેવા",
    "વગેરે",
    "વધુ",
    "શકે",
    "શા",
    "શું",
    "સરખું",
    "સામે",
    "સુધી",
    "હતા",
    "હતાં",
    "હતી",
    "હતું",
    "હવે",
    "હશે",
    "હશો",
    "હા",
    "હું",
    "હો",
    "હોઈ",
    "હોઈશ",
    "હોઈશું",
    "હોય",
    "હોવા"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ha.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ha.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "amma",
    "ba",
    "ban",
    "ce",
    "cikin",
    "da",
    "don",
    "ga",
    "in",
    "ina",
    "ita",
    "ji",
    "ka",
    "ko",
    "kuma",
    "lokacin",
    "ma",
    "mai",
    "na",
    "ne",
    "ni",
    "sai",
    "shi",
    "su",
    "suka",
    "sun",
    "ta",
    "tafi",
    "take",
    "tana",
    "wani",
    "wannan",
    "wata",
    "ya",
    "yake",
    "yana",
    "yi",
    "za"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_he.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_he.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "אבל",
    "או",
    "אולי",
    "אותה",
    "אותו",
    "אותי",
    "אותך",
    "אותם",
    "אותן",
    "אותנו",
    "אז",
    "אחר",
    "אחרות",
    "אחרי",
    "אחריכן",
    "אחרים",
    "אחרת",
    "אי",
    "איזה",
    "איך",
    "אין",
    "איפה",
    "איתה",
    "איתו",
    "איתי",
    "איתך",
    "איתכם",
    "איתכן",
    "איתם",
    "איתן",
    "איתנו",
    "אך",
    "אל",
    "אלה",
    "אלו",
    "אם",
    "אנחנו",
    "אני",
    "אס",
    "אף",
    "אצל",
    "אשר",
    "את",
    "אתה",
    "אתכם",
    "אתכן",
    "אתם",
    "אתן",
    "באיזומידה",
    "באמצע",
    "באמצעות",
    "בגלל",
    "בין",
    "בלי",
    "במידה",
    "במקוםשבו",
    "ברם",
    "בשביל",
    "בשעהש",
    "בתוך",
    "גם",
    "דרך",
    "הוא",
    "היא",
    "היה",
    "היכן",
    "היתה",
    "היתי",
    "הם",
    "הן",
    "הנה",
    "הסיבהשבגללה",
    "הרי",
    "ואילו",
    "ואת",
    "זאת",
    "זה",
    "זות",
    "יהיה",
    "יוכל",
    "יוכלו",
    "יותרמדי",
    "יכול",
    "יכולה",
    "יכולות",
    "יכולים",
    "יכל",
    "יכלה",
    "יכלו",
    "יש",
    "כאן",
    "כאשר",
    "כולם",
    "כולן",
    "כזה",
    "כי",
    "כיצד",
    "כך",
    "ככה",
    "כל",
    "כלל",
    "כמו",
    "כן",
    "כפי",
    "כש",
    "לא",
    "לאו",
    "לאיזותכלית",
    "לאן",
    "לבין",
    "לה",
    "להיות",
    "להם",
    "להן",
    "לו",
    "לי",
    "לכם",
    "לכן",
    "למה",
    "למטה",
    "למעלה",
    "למקוםשבו",
    "למרות",
    "לנו",
    "לעבר",
    "לעיכן",
    "לפיכך",
    "לפני",
    "מאד",
    "מאחורי",
    "מאיזוסיבה",
    "מאין",
    "מאיפה",
    "מבלי",
    "מבעד",
    "מדוע",
    "מה",
    "מהיכן",
    "מול",
    "מחוץ",
    "מי",
    "מכאן",
    "מכיוון",
    "מלבד",
    "מן",
    "מנין",
    "מסוגל",
    "מעט",
    "מעטים",
    "מעל",
    "מצד",
    "מקוםבו",
    "מתחת",
    "מתי",
    "נגד",
    "נגר",
    "נו",
    "עד",
    "עז",
    "על",
    "עלי",
    "עליה",
    "עליהם",
    "עליהן",
    "עליו",
    "עליך",
    "עליכם",
    "עלינו",
    "עם",
    "עצמה",
    "עצמהם",
    "עצמהן",
    "עצמו",
    "עצמי",
    "עצמם",
    "עצמן",
    "עצמנו",
    "פה",
    "רק",
    "שוב",
    "של",
    "שלה",
    "שלהם",
    "שלהן",
    "שלו",
    "שלי",
    "שלך",
    "שלכה",
    "שלכם",
    "שלכן",
    "שלנו",
    "שם",
    "תהיה",
    "תחת"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_hi.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_hi.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "अंदर",
    "अत",
    "अदि",
    "अप",
    "अपना",
    "अपनि",
    "अपनी",
    "अपने",
    "अभि",
    "अभी",
    "आदि",
    "आप",
    "इंहिं",
    "इंहें",
    "इंहों",
    "इतयादि",
    "इत्यादि",
    "इन",
    "इनका",
    "इन्हीं",
    "इन्हें",
    "इन्हों",
    "इस",
    "इसका",
    "इसकि",
    "इसकी",
    "इसके",
    "इसमें",
    "इसि",
    "इसी",
    "इसे",
    "उंहिं",
    "उंहें",
    "उंहों",
    "उन",
    "उनका",
    "उनकि",
    "उनकी",
    "उनके",
    "उनको",
    "उन्हीं",
    "उन्हें",
    "उन्हों",
    "उस",
    "उसके",
    "उसि",
    "उसी",
    "उसे",
    "एक",
    "एवं",
    "एस",
    "एसे",
    "ऐसे",
    "ओर",
    "और",
    "कइ",
    "कई",
    "कर",
    "करता",
    "करते",
    "करना",
    "करने",
    "करें",
    "कहते",
    "कहा",
    "का",
    "काफि",
    "काफ़ी",
    "कि",
    "किंहें",
    "किंहों",
    "कितना",
    "किन्हें",
    "किन्हों",
    "किया",
    "किर",
    "किस",
    "किसि",
    "किसी",
    "किसे",
    "की",
    "कुछ",
    "कुल",
    "के",
    "को",
    "कोइ",
    "कोई",
    "कोन",
    "कोनसा",
    "कौन",
    "कौनसा",
    "गया",
    "घर",
    "जब",
    "जहाँ",
    "जहां",
    "जा",
    "जिंहें",
    "जिंहों",
    "जितना",
    "जिधर",
    "जिन",
    "जिन्हें",
    "जिन्हों",
    "जिस",
    "जिसे",
    "जीधर",
    "जेसा",
    "जेसे",
    "जैसा",
    "जैसे",
    "जो",
    "तक",
    "तब",
    "तरह",
    "तिंहें",
    "तिंहों",
    "तिन",
    "तिन्हें",
    "तिन्हों",
    "तिस",
    "तिसे",
    "तो",
    "था",
    "थि",
    "थी",
    "थे",
    "दबारा",
    "दवारा",
    "दिया",
    "दुसरा",
    "दुसरे",
    "दूसरे",
    "दो",
    "द्वारा",
    "न",
    "नहिं",
    "नहीं",
    "ना",
    "निचे",
    "निहायत",
    "नीचे",
    "ने",
    "पर",
    "पहले",
    "पुरा",
    "पूरा",
    "पे",
    "फिर",
    "बनि",
    "बनी",
    "बहि",
    "बही",
    "बहुत",
    "बाद",
    "बाला",
    "बिलकुल",
    "भि",
    "भितर",
    "भी",
    "भीतर",
    "मगर",
    "मानो",
    "मे",
    "में",
    "यदि",
    "यह",
    "यहाँ",
    "यहां",
    "यहि",
    "यही",
    "या",
    "यिह",
    "ये",
    "रखें",
    "रवासा",
    "रहा",
    "रहे",
    "ऱ्वासा",
    "लिए",
    "लिये",
    "लेकिन",
    "व",
    "वगेरह",
    "वरग",
    "वर्ग",
    "वह",
    "वहाँ",
    "वहां",
    "वहिं",
    "वहीं",
    "वाले",
    "वुह",
    "वे",
    "वग़ैरह",
    "संग",
    "सकता",
    "सकते",
    "सबसे",
    "सभि",
    "सभी",
    "साथ",
    "साबुत",
    "साभ",
    "सारा",
    "से",
    "सो",
    "हि",
    "ही",
    "हुअ",
    "हुआ",
    "हुइ",
    "हुई",
    "हुए",
    "हे",
    "हें",
    "है",
    "हैं",
    "हो",
    "होता",
    "होति",
    "होती",
    "होते",
    "होना",
    "होने"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_hr.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_hr.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "ako",
    "ali",
    "bi",
    "bih",
    "bila",
    "bili",
    "bilo",
    "bio",
    "bismo",
    "biste",
    "biti",
    "bumo",
    "da",
    "do",
    "duž",
    "ga",
    "hoće",
    "hoćemo",
    "hoćete",
    "hoćeš",
    "hoću",
    "i",
    "iako",
    "ih",
    "ili",
    "iz",
    "ja",
    "je",
    "jedna",
    "jedne",
    "jedno",
    "jer",
    "jesam",
    "jesi",
    "jesmo",
    "jest",
    "jeste",
    "jesu",
    "jim",
    "joj",
    "još",
    "ju",
    "kada",
    "kako",
    "kao",
    "koja",
    "koje",
    "koji",
    "kojima",
    "koju",
    "kroz",
    "li",
    "me",
    "mene",
    "meni",
    "mi",
    "mimo",
    "moj",
    "moja",
    "moje",
    "mu",
    "na",
    "nad",
    "nakon",
    "nam",
    "nama",
    "nas",
    "naš",
    "naša",
    "naše",
    "našeg",
    "ne",
    "nego",
    "neka",
    "neki",
    "nekog",
    "neku",
    "nema",
    "netko",
    "neće",
    "nećemo",
    "nećete",
    "nećeš",
    "neću",
    "nešto",
    "ni",
    "nije",
    "nikoga",
    "nikoje",
    "nikoju",
    "nisam",
    "nisi",
    "nismo",
    "niste",
    "nisu",
    "njega",
    "njegov",
    "njegova",
    "njegovo",
    "njemu",
    "njezin",
    "njezina",
    "njezino",
    "njih",
    "njihov",
    "njihova",
    "njihovo",
    "njim",
    "njima",
    "njoj",
    "nju",
    "no",
    "o",
    "od",
    "odmah",
    "on",
    "ona",
    "oni",
    "ono",
    "ova",
    "pa",
    "pak",
    "po",
    "pod",
    "pored",
    "prije",
    "s",
    "sa",
    "sam",
    "samo",
    "se",
    "sebe",
    "sebi",
    "si",
    "smo",
    "ste",
    "su",
    "sve",
    "svi",
    "svog",
    "svoj",
    "svoja",
    "svoje",
    "svom",
    "ta",
    "tada",
    "taj",
    "tako",
    "te",
    "tebe",
    "tebi",
    "ti",
    "to",
    "toj",
    "tome",
    "tu",
    "tvoj",
    "tvoja",
    "tvoje",
    "u",
    "uz",
    "vam",
    "vama",
    "vas",
    "vaš",
    "vaša",
    "vaše",
    "već",
    "vi",
    "vrlo",
    "za",
    "zar",
    "će",
    "ćemo",
    "ćete",
    "ćeš",
    "ću",
    "što"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_hu.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_hu.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "abba",
    "abban",
    "abból",
    "addig",
    "ahhoz",
    "ahogy",
    "ahol",
    "aki",
    "akik",
    "akkor",
    "akár",
    "alapján",
    "alatt",
    "alatta",
    "alattad",
    "alattam",
    "alattatok",
    "alattuk",
    "alattunk",
    "alá",
    "alád",
    "alájuk",
    "alám",
    "alánk",
    "alátok",
    "alól",
    "alóla",
    "alólad",
    "alólam",
    "alólatok",
    "alóluk",
    "alólunk",
    "amely",
    "amelybol",
    "amelyek",
    "amelyekben",
    "amelyeket",
    "amelyet",
    "amelyik",
    "amelynek",
    "ami",
    "amikor",
    "amit",
    "amolyan",
    "amott",
    "amíg",
    "annak",
    "annál",
    "arra",
    "arról",
    "attól",
    "az",
    "aznap",
    "azok",
    "azokat",
    "azokba",
    "azokban",
    "azokból",
    "azokhoz",
    "azokig",
    "azokkal",
    "azokká",
    "azoknak",
    "azoknál",
    "azokon",
    "azokra",
    "azokról",
    "azoktól",
    "azokért",
    "azon",
    "azonban",
    "azonnal",
    "azt",
    "aztán",
    "azután",
    "azzal",
    "azzá",
    "azért",
    "bal",
    "balra",
    "ban",
    "be",
    "belé",
    "beléd",
    "beléjük",
    "belém",
    "belénk",
    "belétek",
    "belül",
    "belőle",
    "belőled",
    "belőlem",
    "belőletek",
    "belőlük",
    "belőlünk",
    "ben",
    "benne",
    "benned",
    "bennem",
    "bennetek",
    "bennük",
    "bennünk",
    "bár",
    "bárcsak",
    "bármilyen",
    "búcsú",
    "cikk",
    "cikkek",
    "cikkeket",
    "csak",
    "csakhogy",
    "csupán",
    "de",
    "dehogy",
    "e",
    "ebbe",
    "ebben",
    "ebből",
    "eddig",
    "egy",
    "egyebek",
    "egyebet",
    "egyedül",
    "egyelőre",
    "egyes",
    "egyet",
    "egyetlen",
    "egyik",
    "egymás",
    "egyre",
    "egyszerre",
    "egyéb",
    "együtt",
    "egész",
    "egészen",
    "ehhez",
    "ekkor",
    "el",
    "eleinte",
    "ellen",
    "ellenes",
    "elleni",
    "ellenére",
    "elmondta",
    "elsõ",
    "első",
    "elsők",
    "elsősorban",
    "elsőt",
    "elé",
    "eléd",
    "elég",
    "eléjük",
    "elém",
    "elénk",
    "elétek",
    "elõ",
    "elõször",
    "elõtt",
    "elő",
    "előbb",
    "elől",
    "előle",
    "előled",
    "előlem",
    "előletek",
    "előlük",
    "előlünk",
    "először",
    "előtt",
    "előtte",
    "előtted",
    "előttem",
    "előttetek",
    "előttük",
    "előttünk",
    "előző",
    "emilyen",
    "engem",
    "ennek",
    "ennyi",
    "ennél",
    "enyém",
    "erre",
    "erről",
    "esetben",
    "ettől",
    "ez",
    "ezek",
    "ezekbe",
    "ezekben",
    "ezekből",
    "ezeken",
    "ezeket",
    "ezekhez",
    "ezekig",
    "ezekkel",
    "ezekké",
    "ezeknek",
    "ezeknél",
    "ezekre",
    "ezekről",
    "ezektől",
    "ezekért",
    "ezen",
    "ezentúl",
    "ezer",
    "ezret",
    "ezt",
    "ezután",
    "ezzel",
    "ezzé",
    "ezért",
    "fel",
    "fele",
    "felek",
    "felet",
    "felett",
    "felé",
    "fent",
    "fenti",
    "fél",
    "fölé",
    "gyakran",
    "ha",
    "halló",
    "hamar",
    "hanem",
    "harmadik",
    "harmadikat",
    "harminc",
    "hat",
    "hatodik",
    "hatodikat",
    "hatot",
    "hatvan",
    "helyett",
    "hetedik",
    "hetediket",
    "hetet",
    "hetven",
    "hirtelen",
    "hiszen",
    "hiába",
    "hogy",
    "hogyan",
    "hol",
    "holnap",
    "holnapot",
    "honnan",
    "hova",
    "hozzá",
    "hozzád",
    "hozzájuk",
    "hozzám",
    "hozzánk",
    "hozzátok",
    "hurrá",
    "huszadik",
    "hány",
    "hányszor",
    "hármat",
    "három",
    "hát",
    "hátha",
    "hátulsó",
    "hét",
    "húsz",
    "ide",
    "ide-оda",
    "idén",
    "igazán",
    "igen",
    "ill",
    "ill.",
    "illetve",
    "ilyen",
    "ilyenkor",
    "immár",
    "inkább",
    "is",
    "ismét",
    "ison",
    "itt",
    "jelenleg",
    "jobban",
    "jobbra",
    "jó",
    "jól",
    "jólesik",
    "jóval",
    "jövőre",
    "kell",
    "kellene",
    "kellett",
    "kelljen",
    "keressünk",
    "keresztül",
    "ketten",
    "kettő",
    "kettőt",
    "kevés",
    "ki",
    "kiben",
    "kiből",
    "kicsit",
    "kicsoda",
    "kihez",
    "kik",
    "kikbe",
    "kikben",
    "kikből",
    "kiken",
    "kiket",
    "kikhez",
    "kikkel",
    "kikké",
    "kiknek",
    "kiknél",
    "kikre",
    "kikről",
    "kiktől",
    "kikért",
    "kilenc",
    "kilencedik",
    "kilencediket",
    "kilencet",
    "kilencven",
    "kin",
    "kinek",
    "kinél",
    "kire",
    "kiről",
    "kit",
    "kitől",
    "kivel",
    "kivé",
    "kié",
    "kiért",
    "korábban",
    "képest",
    "kérem",
    "kérlek",
    "kész",
    "késő",
    "később",
    "későn",
    "két",
    "kétszer",
    "kívül",
    "körül",
    "köszönhetően",
    "köszönöm",
    "közben",
    "közel",
    "közepesen",
    "közepén",
    "közé",
    "között",
    "közül",
    "külön",
    "különben",
    "különböző",
    "különbözőbb",
    "különbözőek",
    "lassan",
    "le",
    "legalább",
    "legyen",
    "lehet",
    "lehetetlen",
    "lehetett",
    "lehetőleg",
    "lehetőség",
    "lenne",
    "lenni",
    "lennék",
    "lennének",
    "lesz",
    "leszek",
    "lesznek",
    "leszünk",
    "lett",
    "lettek",
    "lettem",
    "lettünk",
    "lévő",
    "ma",
    "maga",
    "magad",
    "magam",
    "magatokat",
    "magukat",
    "magunkat",
    "magát",
    "mai",
    "majd",
    "majdnem",
    "manapság",
    "meg",
    "megcsinál",
    "megcsinálnak",
    "megint",
    "megvan",
    "mellett",
    "mellette",
    "melletted",
    "mellettem",
    "mellettetek",
    "mellettük",
    "mellettünk",
    "mellé",
    "melléd",
    "melléjük",
    "mellém",
    "mellénk",
    "mellétek",
    "mellől",
    "mellőle",
    "mellőled",
    "mellőlem",
    "mellőletek",
    "mellőlük",
    "mellőlünk",
    "mely",
    "melyek",
    "melyik",
    "mennyi",
    "mert",
    "mi",
    "miatt",
    "miatta",
    "miattad",
    "miattam",
    "miattatok",
    "miattuk",
    "miattunk",
    "mibe",
    "miben",
    "miből",
    "mihez",
    "mik",
    "mikbe",
    "mikben",
    "mikből",
    "miken",
    "miket",
    "mikhez",
    "mikkel",
    "mikké",
    "miknek",
    "miknél",
    "mikor",
    "mikre",
    "mikről",
    "miktől",
    "mikért",
    "milyen",
    "min",
    "mind",
    "mindegyik",
    "mindegyiket",
    "minden",
    "mindenesetre",
    "mindenki",
    "mindent",
    "mindenütt",
    "mindig",
    "mindketten",
    "minek",
    "minket",
    "mint",
    "mintha",
    "minél",
    "mire",
    "miről",
    "mit",
    "mitől",
    "mivel",
    "mivé",
    "miért",
    "mondta",
    "most",
    "mostanáig",
    "már",
    "más",
    "másik",
    "másikat",
    "másnap",
    "második",
    "másodszor",
    "mások",
    "másokat",
    "mást",
    "még",
    "mégis",
    "míg",
    "mögé",
    "mögéd",
    "mögéjük",
    "mögém",
    "mögénk",
    "mögétek",
    "mögött",
    "mögötte",
    "mögötted",
    "mögöttem",
    "mögöttetek",
    "mögöttük",
    "mögöttünk",
    "mögül",
    "mögüle",
    "mögüled",
    "mögülem",
    "mögületek",
    "mögülük",
    "mögülünk",
    "múltkor",
    "múlva",
    "na",
    "nagy",
    "nagyobb",
    "nagyon",
    "naponta",
    "napot",
    "ne",
    "negyedik",
    "negyediket",
    "negyven",
    "neked",
    "nekem",
    "neki",
    "nekik",
    "nektek",
    "nekünk",
    "nem",
    "nemcsak",
    "nemrég",
    "nincs",
    "nyolc",
    "nyolcadik",
    "nyolcadikat",
    "nyolcat",
    "nyolcvan",
    "nála",
    "nálad",
    "nálam",
    "nálatok",
    "náluk",
    "nálunk",
    "négy",
    "négyet",
    "néha",
    "néhány",
    "nélkül",
    "o",
    "oda",
    "ok",
    "olyan",
    "onnan",
    "ott",
    "pedig",
    "persze",
    "pár",
    "például",
    "rajta",
    "rajtad",
    "rajtam",
    "rajtatok",
    "rajtuk",
    "rajtunk",
    "rendben",
    "rosszul",
    "rá",
    "rád",
    "rájuk",
    "rám",
    "ránk",
    "rátok",
    "régen",
    "régóta",
    "részére",
    "róla",
    "rólad",
    "rólam",
    "rólatok",
    "róluk",
    "rólunk",
    "rögtön",
    "s",
    "saját",
    "se",
    "sem",
    "semmi",
    "semmilyen",
    "semmiség",
    "senki",
    "soha",
    "sok",
    "sokan",
    "sokat",
    "sokkal",
    "sokszor",
    "sokáig",
    "során",
    "stb.",
    "szemben",
    "szerbusz",
    "szerint",
    "szerinte",
    "szerinted",
    "szerintem",
    "szerintetek",
    "szerintük",
    "szerintünk",
    "szervusz",
    "szinte",
    "számára",
    "száz",
    "századik",
    "százat",
    "szépen",
    "szét",
    "szíves",
    "szívesen",
    "szíveskedjék",
    "sőt",
    "talán",
    "tavaly",
    "te",
    "tegnap",
    "tegnapelőtt",
    "tehát",
    "tele",
    "teljes",
    "tessék",
    "ti",
    "tied",
    "titeket",
    "tizedik",
    "tizediket",
    "tizenegy",
    "tizenegyedik",
    "tizenhat",
    "tizenhárom",
    "tizenhét",
    "tizenkettedik",
    "tizenkettő",
    "tizenkilenc",
    "tizenkét",
    "tizennyolc",
    "tizennégy",
    "tizenöt",
    "tizet",
    "tovább",
    "további",
    "továbbá",
    "távol",
    "téged",
    "tényleg",
    "tíz",
    "több",
    "többi",
    "többször",
    "túl",
    "tőle",
    "tőled",
    "tőlem",
    "tőletek",
    "tőlük",
    "tőlünk",
    "ugyanakkor",
    "ugyanez",
    "ugyanis",
    "ugye",
    "urak",
    "uram",
    "urat",
    "utoljára",
    "utolsó",
    "után",
    "utána",
    "vagy",
    "vagyis",
    "vagyok",
    "vagytok",
    "vagyunk",
    "vajon",
    "valahol",
    "valaki",
    "valakit",
    "valamelyik",
    "valami",
    "valamint",
    "való",
    "van",
    "vannak",
    "vele",
    "veled",
    "velem",
    "veletek",
    "velük",
    "velünk",
    "vissza",
    "viszlát",
    "viszont",
    "viszontlátásra",
    "volna",
    "volnának",
    "volnék",
    "volt",
    "voltak",
    "voltam",
    "voltunk",
    "végre",
    "végén",
    "végül",
    "által",
    "általában",
    "ám",
    "át",
    "éljen",
    "én",
    "éppen",
    "érte",
    "érted",
    "értem",
    "értetek",
    "értük",
    "értünk",
    "és",
    "év",
    "évben",
    "éve",
    "évek",
    "éves",
    "évi",
    "évvel",
    "így",
    "óta",
    "õ",
    "õk",
    "õket",
    "ön",
    "önbe",
    "önben",
    "önből",
    "önhöz",
    "önnek",
    "önnel",
    "önnél",
    "önre",
    "önről",
    "önt",
    "öntől",
    "önért",
    "önök",
    "önökbe",
    "önökben",
    "önökből",
    "önöket",
    "önökhöz",
    "önökkel",
    "önöknek",
    "önöknél",
    "önökre",
    "önökről",
    "önöktől",
    "önökért",
    "önökön",
    "önön",
    "össze",
    "öt",
    "ötven",
    "ötödik",
    "ötödiket",
    "ötöt",
    "úgy",
    "úgyis",
    "úgynevezett",
    "új",
    "újabb",
    "újra",
    "úr",
    "ő",
    "ők",
    "őket",
    "őt"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_hy.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_hy.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "այդ",
    "այլ",
    "այն",
    "այս",
    "դու",
    "դուք",
    "եմ",
    "են",
    "ենք",
    "ես",
    "եք",
    "է",
    "էի",
    "էին",
    "էինք",
    "էիր",
    "էիք",
    "էր",
    "ըստ",
    "թ",
    "ի",
    "ին",
    "իսկ",
    "իր",
    "կամ",
    "համար",
    "հետ",
    "հետո",
    "մենք",
    "մեջ",
    "մի",
    "ն",
    "նա",
    "նաև",
    "նրա",
    "նրանք",
    "որ",
    "որը",
    "որոնք",
    "որպես",
    "ու",
    "ում",
    "պիտի",
    "վրա",
    "և"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_id.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_id.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "ada",
    "adalah",
    "adanya",
    "adapun",
    "agak",
    "agaknya",
    "agar",
    "akan",
    "akankah",
    "akhir",
    "akhiri",
    "akhirnya",
    "aku",
    "akulah",
    "amat",
    "amatlah",
    "anda",
    "andalah",
    "antar",
    "antara",
    "antaranya",
    "apa",
    "apaan",
    "apabila",
    "apakah",
    "apalagi",
    "apatah",
    "artinya",
    "asal",
    "asalkan",
    "atas",
    "atau",
    "ataukah",
    "ataupun",
    "awal",
    "awalnya",
    "bagai",
    "bagaikan",
    "bagaimana",
    "bagaimanakah",
    "bagaimanapun",
    "bagi",
    "bagian",
    "bahkan",
    "bahwa",
    "bahwasanya",
    "baik",
    "bakal",
    "bakalan",
    "balik",
    "banyak",
    "bapak",
    "baru",
    "bawah",
    "beberapa",
    "begini",
    "beginian",
    "beginikah",
    "beginilah",
    "begitu",
    "begitukah",
    "begitulah",
    "begitupun",
    "bekerja",
    "belakang",
    "belakangan",
    "belum",
    "belumlah",
    "benar",
    "benarkah",
    "benarlah",
    "berada",
    "berakhir",
    "berakhirlah",
    "berakhirnya",
    "berapa",
    "berapakah",
    "berapalah",
    "berapapun",
    "berarti",
    "berawal",
    "berbagai",
    "berdatangan",
    "beri",
    "berikan",
    "berikut",
    "berikutnya",
    "berjumlah",
    "berkali-kali",
    "berkata",
    "berkehendak",
    "berkeinginan",
    "berkenaan",
    "berlainan",
    "berlalu",
    "berlangsung",
    "berlebihan",
    "bermacam",
    "bermacam-macam",
    "bermaksud",
    "bermula",
    "bersama",
    "bersama-sama",
    "bersiap",
    "bersiap-siap",
    "bertanya",
    "bertanya-tanya",
    "berturut",
    "berturut-turut",
    "bertutur",
    "berujar",
    "berupa",
    "besar",
    "betul",
    "betulkah",
    "biasa",
    "biasanya",
    "bila",
    "bilakah",
    "bisa",
    "bisakah",
    "boleh",
    "bolehkah",
    "bolehlah",
    "buat",
    "bukan",
    "bukankah",
    "bukanlah",
    "bukannya",
    "bulan",
    "bung",
    "cara",
    "caranya",
    "cukup",
    "cukupkah",
    "cukuplah",
    "cuma",
    "dahulu",
    "dalam",
    "dan",
    "dapat",
    "dari",
    "daripada",
    "datang",
    "dekat",
    "demi",
    "demikian",
    "demikianlah",
    "dengan",
    "depan",
    "di",
    "dia",
    "diakhiri",
    "diakhirinya",
    "dialah",
    "diantara",
    "diantaranya",
    "diberi",
    "diberikan",
    "diberikannya",
    "dibuat",
    "dibuatnya",
    "didapat",
    "didatangkan",
    "digunakan",
    "diibaratkan",
    "diibaratkannya",
    "diingat",
    "diingatkan",
    "diinginkan",
    "dijawab",
    "dijelaskan",
    "dijelaskannya",
    "dikarenakan",
    "dikatakan",
    "dikatakannya",
    "dikerjakan",
    "diketahui",
    "diketahuinya",
    "dikira",
    "dilakukan",
    "dilalui",
    "dilihat",
    "dimaksud",
    "dimaksudkan",
    "dimaksudkannya",
    "dimaksudnya",
    "diminta",
    "dimintai",
    "dimisalkan",
    "dimulai",
    "dimulailah",
    "dimulainya",
    "dimungkinkan",
    "dini",
    "dipastikan",
    "diperbuat",
    "diperbuatnya",
    "dipergunakan",
    "diperkirakan",
    "diperlihatkan",
    "diperlukan",
    "diperlukannya",
    "dipersoalkan",
    "dipertanyakan",
    "dipunyai",
    "diri",
    "dirinya",
    "disampaikan",
    "disebut",
    "disebutkan",
    "disebutkannya",
    "disini",
    "disinilah",
    "ditambahkan",
    "ditandaskan",
    "ditanya",
    "ditanyai",
    "ditanyakan",
    "ditegaskan",
    "ditujukan",
    "ditunjuk",
    "ditunjuki",
    "ditunjukkan",
    "ditunjukkannya",
    "ditunjuknya",
    "dituturkan",
    "dituturkannya",
    "diucapkan",
    "diucapkannya",
    "diungkapkan",
    "dong",
    "dua",
    "dulu",
    "empat",
    "enggak",
    "enggaknya",
    "entah",
    "entahlah",
    "guna",
    "gunakan",
    "hal",
    "hampir",
    "hanya",
    "hanyalah",
    "hari",
    "harus",
    "haruslah",
    "harusnya",
    "hendak",
    "hendaklah",
    "hendaknya",
    "hingga",
    "ia",
    "ialah",
    "ibarat",
    "ibaratkan",
    "ibaratnya",
    "ibu",
    "ikut",
    "ingat",
    "ingat-ingat",
    "ingin",
    "inginkah",
    "inginkan",
    "ini",
    "inikah",
    "inilah",
    "itu",
    "itukah",
    "itulah",
    "jadi",
    "jadilah",
    "jadinya",
    "jangan",
    "jangankan",
    "janganlah",
    "jauh",
    "jawab",
    "jawaban",
    "jawabnya",
    "jelas",
    "jelaskan",
    "jelaslah",
    "jelasnya",
    "jika",
    "jikalau",
    "juga",
    "jumlah",
    "jumlahnya",
    "justru",
    "kala",
    "kalau",
    "kalaulah",
    "kalaupun",
    "kalian",
    "kami",
    "kamilah",
    "kamu",
    "kamulah",
    "kan",
    "kapan",
    "kapankah",
    "kapanpun",
    "karena",
    "karenanya",
    "kasus",
    "kata",
    "katakan",
    "katakanlah",
    "katanya",
    "ke",
    "keadaan",
    "kebetulan",
    "kecil",
    "kedua",
    "keduanya",
    "keinginan",
    "kelamaan",
    "kelihatan",
    "kelihatannya",
    "kelima",
    "keluar",
    "kembali",
    "kemudian",
    "kemungkinan",
    "kemungkinannya",
    "kenapa",
    "kepada",
    "kepadanya",
    "kesampaian",
    "keseluruhan",
    "keseluruhannya",
    "keterlaluan",
    "ketika",
    "khususnya",
    "kini",
    "kinilah",
    "kira",
    "kira-kira",
    "kiranya",
    "kita",
    "kitalah",
    "kok",
    "kurang",
    "lagi",
    "lagian",
    "lah",
    "lain",
    "lainnya",
    "lalu",
    "lama",
    "lamanya",
    "lanjut",
    "lanjutnya",
    "lebih",
    "lewat",
    "lima",
    "luar",
    "macam",
    "maka",
    "makanya",
    "makin",
    "malah",
    "malahan",
    "mampu",
    "mampukah",
    "mana",
    "manakala",
    "manalagi",
    "masa",
    "masalah",
    "masalahnya",
    "masih",
    "masihkah",
    "masing",
    "masing-masing",
    "mau",
    "maupun",
    "melainkan",
    "melakukan",
    "melalui",
    "melihat",
    "melihatnya",
    "memang",
    "memastikan",
    "memberi",
    "memberikan",
    "membuat",
    "memerlukan",
    "memihak",
    "meminta",
    "memintakan",
    "memisalkan",
    "memperbuat",
    "mempergunakan",
    "memperkirakan",
    "memperlihatkan",
    "mempersiapkan",
    "mempersoalkan",
    "mempertanyakan",
    "mempunyai",
    "memulai",
    "memungkinkan",
    "menaiki",
    "menambahkan",
    "menandaskan",
    "menanti",
    "menanti-nanti",
    "menantikan",
    "menanya",
    "menanyai",
    "menanyakan",
    "mendapat",
    "mendapatkan",
    "mendatang",
    "mendatangi",
    "mendatangkan",
    "menegaskan",
    "mengakhiri",
    "mengapa",
    "mengatakan",
    "mengatakannya",
    "mengenai",
    "mengerjakan",
    "mengetahui",
    "menggunakan",
    "menghendaki",
    "mengibaratkan",
    "mengibaratkannya",
    "mengingat",
    "mengingatkan",
    "menginginkan",
    "mengira",
    "mengucapkan",
    "mengucapkannya",
    "mengungkapkan",
    "menjadi",
    "menjawab",
    "menjelaskan",
    "menuju",
    "menunjuk",
    "menunjuki",
    "menunjukkan",
    "menunjuknya",
    "menurut",
    "menuturkan",
    "menyampaikan",
    "menyangkut",
    "menyatakan",
    "menyebutkan",
    "menyeluruh",
    "menyiapkan",
    "merasa",
    "mereka",
    "merekalah",
    "merupakan",
    "meski",
    "meskipun",
    "meyakini",
    "meyakinkan",
    "minta",
    "mirip",
    "misal",
    "misalkan",
    "misalnya",
    "mula",
    "mulai",
    "mulailah",
    "mulanya",
    "mungkin",
    "mungkinkah",
    "nah",
    "naik",
    "namun",
    "nanti",
    "nantinya",
    "nyaris",
    "nyatanya",
    "oleh",
    "olehnya",
    "pada",
    "padahal",
    "padanya",
    "pak",
    "paling",
    "panjang",
    "pantas",
    "para",
    "pasti",
    "pastilah",
    "penting",
    "pentingnya",
    "per",
    "percuma",
    "perlu",
    "perlukah",
    "perlunya",
    "pernah",
    "persoalan",
    "pertama",
    "pertama-tama",
    "pertanyaan",
    "pertanyakan",
    "pihak",
    "pihaknya",
    "pukul",
    "pula",
    "pun",
    "punya",
    "rasa",
    "rasanya",
    "rata",
    "rupanya",
    "saat",
    "saatnya",
    "saja",
    "sajalah",
    "saling",
    "sama",
    "sama-sama",
    "sambil",
    "sampai",
    "sampai-sampai",
    "sampaikan",
    "sana",
    "sangat",
    "sangatlah",
    "satu",
    "saya",
    "sayalah",
    "se",
    "sebab",
    "sebabnya",
    "sebagai",
    "sebagaimana",
    "sebagainya",
    "sebagian",
    "sebaik",
    "sebaik-baiknya",
    "sebaiknya",
    "sebaliknya",
    "sebanyak",
    "sebegini",
    "sebegitu",
    "sebelum",
    "sebelumnya",
    "sebenarnya",
    "seberapa",
    "sebesar",
    "sebetulnya",
    "sebisanya",
    "sebuah",
    "sebut",
    "sebutlah",
    "sebutnya",
    "secara",
    "secukupnya",
    "sedang",
    "sedangkan",
    "sedemikian",
    "sedikit",
    "sedikitnya",
    "seenaknya",
    "segala",
    "segalanya",
    "segera",
    "seharusnya",
    "sehingga",
    "seingat",
    "sejak",
    "sejauh",
    "sejenak",
    "sejumlah",
    "sekadar",
    "sekadarnya",
    "sekali",
    "sekali-kali",
    "sekalian",
    "sekaligus",
    "sekalipun",
    "sekarang",
    "sekecil",
    "seketika",
    "sekiranya",
    "sekitar",
    "sekitarnya",
    "sekurang-kurangnya",
    "sekurangnya",
    "sela",
    "selagi",
    "selain",
    "selaku",
    "selalu",
    "selama",
    "selama-lamanya",
    "selamanya",
    "selanjutnya",
    "seluruh",
    "seluruhnya",
    "semacam",
    "semakin",
    "semampu",
    "semampunya",
    "semasa",
    "semasih",
    "semata",
    "semata-mata",
    "semaunya",
    "sementara",
    "semisal",
    "semisalnya",
    "sempat",
    "semua",
    "semuanya",
    "semula",
    "sendiri",
    "sendirian",
    "sendirinya",
    "seolah",
    "seolah-olah",
    "seorang",
    "sepanjang",
    "sepantasnya",
    "sepantasnyalah",
    "seperlunya",
    "seperti",
    "sepertinya",
    "sepihak",
    "sering",
    "seringnya",
    "serta",
    "serupa",
    "sesaat",
    "sesama",
    "sesampai",
    "sesegera",
    "sesekali",
    "seseorang",
    "sesuatu",
    "sesuatunya",
    "sesudah",
    "sesudahnya",
    "setelah",
    "setempat",
    "setengah",
    "seterusnya",
    "setiap",
    "setiba",
    "setibanya",
    "setidak-tidaknya",
    "setidaknya",
    "setinggi",
    "seusai",
    "sewaktu",
    "siap",
    "siapa",
    "siapakah",
    "siapapun",
    "sini",
    "sinilah",
    "soal",
    "soalnya",
    "suatu",
    "sudah",
    "sudahkah",
    "sudahlah",
    "supaya",
    "tadi",
    "tadinya",
    "tahu",
    "tahun",
    "tak",
    "tambah",
    "tambahnya",
    "tampak",
    "tampaknya",
    "tandas",
    "tandasnya",
    "tanpa",
    "tanya",
    "tanyakan",
    "tanyanya",
    "tapi",
    "tegas",
    "tegasnya",
    "telah",
    "tempat",
    "tengah",
    "tentang",
    "tentu",
    "tentulah",
    "tentunya",
    "tepat",
    "terakhir",
    "terasa",
    "terbanyak",
    "terdahulu",
    "terdapat",
    "terdiri",
    "terhadap",
    "terhadapnya",
    "teringat",
    "teringat-ingat",
    "terjadi",
    "terjadilah",
    "terjadinya",
    "terkira",
    "terlalu",
    "terlebih",
    "terlihat",
    "termasuk",
    "ternyata",
    "tersampaikan",
    "tersebut",
    "tersebutlah",
    "tertentu",
    "tertuju",
    "terus",
    "terutama",
    "tetap",
    "tetapi",
    "tiap",
    "tiba",
    "tiba-tiba",
    "tidak",
    "tidakkah",
    "tidaklah",
    "tiga",
    "tinggi",
    "toh",
    "tunjuk",
    "turut",
    "tutur",
    "tuturnya",
    "ucap",
    "ucapnya",
    "ujar",
    "ujarnya",
    "umum",
    "umumnya",
    "ungkap",
    "ungkapnya",
    "untuk",
    "usah",
    "usai",
    "waduh",
    "wah",
    "wahai",
    "waktu",
    "waktunya",
    "walau",
    "walaupun",
    "wong",
    "yaitu",
    "yakin",
    "yakni",
    "yang"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_it.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_it.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "abbastanza",
    "abbia",
    "abbiamo",
    "abbiano",
    "abbiate",
    "accidenti",
    "ad",
    "adesso",
    "affinché",
    "agl",
    "agli",
    "ahime",
    "ahimè",
    "ai",
    "al",
    "alcuna",
    "alcuni",
    "alcuno",
    "all",
    "alla",
    "alle",
    "allo",
    "allora",
    "altre",
    "altri",
    "altrimenti",
    "altro",
    "altrove",
    "altrui",
    "anche",
    "ancora",
    "anni",
    "anno",
    "ansa",
    "anticipo",
    "assai",
    "attesa",
    "attraverso",
    "avanti",
    "avemmo",
    "avendo",
    "avente",
    "aver",
    "avere",
    "averlo",
    "avesse",
    "avessero",
    "avessi",
    "avessimo",
    "aveste",
    "avesti",
    "avete",
    "aveva",
    "avevamo",
    "avevano",
    "avevate",
    "avevi",
    "avevo",
    "avrai",
    "avranno",
    "avrebbe",
    "avrebbero",
    "avrei",
    "avremmo",
    "avremo",
    "avreste",
    "avresti",
    "avrete",
    "avrà",
    "avrò",
    "avuta",
    "avute",
    "avuti",
    "avuto",
    "basta",
    "ben",
    "bene",
    "benissimo",
    "brava",
    "bravo",
    "buono",
    "c",
    "caso",
    "cento",
    "certa",
    "certe",
    "certi",
    "certo",
    "che",
    "chi",
    "chicchessia",
    "chiunque",
    "ci",
    "ciascuna",
    "ciascuno",
    "cima",
    "cinque",
    "cio",
    "cioe",
    "cioè",
    "circa",
    "citta",
    "città",
    "ciò",
    "co",
    "codesta",
    "codesti",
    "codesto",
    "cogli",
    "coi",
    "col",
    "colei",
    "coll",
    "coloro",
    "colui",
    "come",
    "cominci",
    "comprare",
    "comunque",
    "con",
    "concernente",
    "conclusione",
    "consecutivi",
    "consecutivo",
    "consiglio",
    "contro",
    "cortesia",
    "cos",
    "cosa",
    "cosi",
    "così",
    "cui",
    "d",
    "da",
    "dagl",
    "dagli",
    "dai",
    "dal",
    "dall",
    "dalla",
    "dalle",
    "dallo",
    "dappertutto",
    "davanti",
    "degl",
    "degli",
    "dei",
    "del",
    "dell",
    "della",
    "delle",
    "dello",
    "dentro",
    "detto",
    "deve",
    "devo",
    "di",
    "dice",
    "dietro",
    "dire",
    "dirimpetto",
    "diventa",
    "diventare",
    "diventato",
    "dopo",
    "doppio",
    "dov",
    "dove",
    "dovra",
    "dovrà",
    "dovunque",
    "due",
    "dunque",
    "durante",
    "e",
    "ebbe",
    "ebbero",
    "ebbi",
    "ecc",
    "ecco",
    "ed",
    "effettivamente",
    "egli",
    "ella",
    "entrambi",
    "eppure",
    "era",
    "erano",
    "eravamo",
    "eravate",
    "eri",
    "ero",
    "esempio",
    "esse",
    "essendo",
    "esser",
    "essere",
    "essi",
    "ex",
    "fa",
    "faccia",
    "facciamo",
    "facciano",
    "facciate",
    "faccio",
    "facemmo",
    "facendo",
    "facesse",
    "facessero",
    "facessi",
    "facessimo",
    "faceste",
    "facesti",
    "faceva",
    "facevamo",
    "facevano",
    "facevate",
    "facevi",
    "facevo",
    "fai",
    "fanno",
    "farai",
    "faranno",
    "fare",
    "farebbe",
    "farebbero",
    "farei",
    "faremmo",
    "faremo",
    "fareste",
    "faresti",
    "farete",
    "farà",
    "farò",
    "fatto",
    "favore",
    "fece",
    "fecero",
    "feci",
    "fin",
    "finalmente",
    "finche",
    "fine",
    "fino",
    "forse",
    "forza",
    "fosse",
    "fossero",
    "fossi",
    "fossimo",
    "foste",
    "fosti",
    "fra",
    "frattempo",
    "fu",
    "fui",
    "fummo",
    "fuori",
    "furono",
    "futuro",
    "generale",
    "gente",
    "gia",
    "giacche",
    "giorni",
    "giorno",
    "giu",
    "già",
    "gli",
    "gliela",
    "gliele",
    "glieli",
    "glielo",
    "gliene",
    "grande",
    "grazie",
    "gruppo",
    "ha",
    "haha",
    "hai",
    "hanno",
    "ho",
    "i",
    "ie",
    "ieri",
    "il",
    "improvviso",
    "in",
    "inc",
    "indietro",
    "infatti",
    "inoltre",
    "insieme",
    "intanto",
    "intorno",
    "invece",
    "io",
    "l",
    "la",
    "lasciato",
    "lato",
    "le",
    "lei",
    "li",
    "lo",
    "lontano",
    "loro",
    "lui",
    "lungo",
    "luogo",
    "là",
    "ma",
    "macche",
    "magari",
    "maggior",
    "mai",
    "male",
    "malgrado",
    "malissimo",
    "me",
    "medesimo",
    "mediante",
    "meglio",
    "meno",
    "mentre",
    "mesi",
    "mezzo",
    "mi",
    "mia",
    "mie",
    "miei",
    "mila",
    "miliardi",
    "milioni",
    "minimi",
    "mio",
    "modo",
    "molta",
    "molti",
    "moltissimo",
    "molto",
    "momento",
    "mondo",
    "ne",
    "negl",
    "negli",
    "nei",
    "nel",
    "nell",
    "nella",
    "nelle",
    "nello",
    "nemmeno",
    "neppure",
    "nessun",
    "nessuna",
    "nessuno",
    "niente",
    "no",
    "noi",
    "nome",
    "non",
    "nondimeno",
    "nonostante",
    "nonsia",
    "nostra",
    "nostre",
    "nostri",
    "nostro",
    "novanta",
    "nove",
    "nulla",
    "nuovi",
    "nuovo",
    "o",
    "od",
    "oggi",
    "ogni",
    "ognuna",
    "ognuno",
    "oltre",
    "oppure",
    "ora",
    "ore",
    "osi",
    "ossia",
    "ottanta",
    "otto",
    "paese",
    "parecchi",
    "parecchie",
    "parecchio",
    "parte",
    "partendo",
    "peccato",
    "peggio",
    "per",
    "perche",
    "perchè",
    "perché",
    "percio",
    "perciò",
    "perfino",
    "pero",
    "persino",
    "persone",
    "però",
    "piedi",
    "pieno",
    "piglia",
    "piu",
    "piuttosto",
    "più",
    "po",
    "pochissimo",
    "poco",
    "poi",
    "poiche",
    "possa",
    "possedere",
    "posteriore",
    "posto",
    "potrebbe",
    "preferibilmente",
    "presa",
    "press",
    "prima",
    "primo",
    "principalmente",
    "probabilmente",
    "promesso",
    "proprio",
    "puo",
    "pure",
    "purtroppo",
    "può",
    "qua",
    "qualche",
    "qualcosa",
    "qualcuna",
    "qualcuno",
    "quale",
    "quali",
    "qualunque",
    "quando",
    "quanta",
    "quante",
    "quanti",
    "quanto",
    "quantunque",
    "quarto",
    "quasi",
    "quattro",
    "quel",
    "quella",
    "quelle",
    "quelli",
    "quello",
    "quest",
    "questa",
    "queste",
    "questi",
    "questo",
    "qui",
    "quindi",
    "quinto",
    "realmente",
    "recente",
    "recentemente",
    "registrazione",
    "relativo",
    "riecco",
    "rispetto",
    "salvo",
    "sara",
    "sarai",
    "saranno",
    "sarebbe",
    "sarebbero",
    "sarei",
    "saremmo",
    "saremo",
    "sareste",
    "saresti",
    "sarete",
    "sarà",
    "sarò",
    "scola",
    "scopo",
    "scorso",
    "se",
    "secondo",
    "seguente",
    "seguito",
    "sei",
    "sembra",
    "sembrare",
    "sembrato",
    "sembrava",
    "sembri",
    "sempre",
    "senza",
    "sette",
    "si",
    "sia",
    "siamo",
    "siano",
    "siate",
    "siete",
    "sig",
    "solito",
    "solo",
    "soltanto",
    "sono",
    "sopra",
    "soprattutto",
    "sotto",
    "spesso",
    "sta",
    "stai",
    "stando",
    "stanno",
    "starai",
    "staranno",
    "starebbe",
    "starebbero",
    "starei",
    "staremmo",
    "staremo",
    "stareste",
    "staresti",
    "starete",
    "starà",
    "starò",
    "stata",
    "state",
    "stati",
    "stato",
    "stava",
    "stavamo",
    "stavano",
    "stavate",
    "stavi",
    "stavo",
    "stemmo",
    "stessa",
    "stesse",
    "stessero",
    "stessi",
    "stessimo",
    "stesso",
    "steste",
    "stesti",
    "stette",
    "stettero",
    "stetti",
    "stia",
    "stiamo",
    "stiano",
    "stiate",
    "sto",
    "su",
    "sua",
    "subito",
    "successivamente",
    "successivo",
    "sue",
    "sugl",
    "sugli",
    "sui",
    "sul",
    "sull",
    "sulla",
    "sulle",
    "sullo",
    "suo",
    "suoi",
    "tale",
    "tali",
    "talvolta",
    "tanto",
    "te",
    "tempo",
    "terzo",
    "th",
    "ti",
    "titolo",
    "tra",
    "tranne",
    "tre",
    "trenta",
    "triplo",
    "troppo",
    "trovato",
    "tu",
    "tua",
    "tue",
    "tuo",
    "tuoi",
    "tutta",
    "tuttavia",
    "tutte",
    "tutti",
    "tutto",
    "uguali",
    "ulteriore",
    "ultimo",
    "un",
    "una",
    "uno",
    "uomo",
    "va",
    "vai",
    "vale",
    "vari",
    "varia",
    "varie",
    "vario",
    "verso",
    "vi",
    "vicino",
    "visto",
    "vita",
    "voi",
    "volta",
    "volte",
    "vostra",
    "vostre",
    "vostri",
    "vostro",
    "è"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ja.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ja.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "あそこ",
    "あっ",
    "あの",
    "あのかた",
    "あの人",
    "あり",
    "あります",
    "ある",
    "あれ",
    "い",
    "いう",
    "います",
    "いる",
    "う",
    "うち",
    "え",
    "お",
    "および",
    "おり",
    "おります",
    "か",
    "かつて",
    "から",
    "が",
    "き",
    "ここ",
    "こちら",
    "こと",
    "この",
    "これ",
    "これら",
    "さ",
    "さらに",
    "し",
    "しかし",
    "する",
    "ず",
    "せ",
    "せる",
    "そこ",
    "そして",
    "その",
    "その他",
    "その後",
    "それ",
    "それぞれ",
    "それで",
    "た",
    "ただし",
    "たち",
    "ため",
    "たり",
    "だ",
    "だっ",
    "だれ",
    "つ",
    "て",
    "で",
    "でき",
    "できる",
    "です",
    "では",
    "でも",
    "と",
    "という",
    "といった",
    "とき",
    "ところ",
    "として",
    "とともに",
    "とも",
    "と共に",
    "どこ",
    "どの",
    "な",
    "ない",
    "なお",
    "なかっ",
    "ながら",
    "なく",
    "なっ",
    "など",
    "なに",
    "なら",
    "なり",
    "なる",
    "なん",
    "に",
    "において",
    "における",
    "について",
    "にて",
    "によって",
    "により",
    "による",
    "に対して",
    "に対する",
    "に関する",
    "の",
    "ので",
    "のみ",
    "は",
    "ば",
    "へ",
    "ほか",
    "ほとんど",
    "ほど",
    "ます",
    "また",
    "または",
    "まで",
    "も",
    "もの",
    "ものの",
    "や",
    "よう",
    "より",
    "ら",
    "られ",
    "られる",
    "れ",
    "れる",
    "を",
    "ん",
    "何",
    "及び",
    "彼",
    "彼女",
    "我々",
    "特に",
    "私",
    "私達",
    "貴方",
    "貴方方"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ko.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ko.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "!",
    "\"",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "...",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "\\",
    "^",
    "_",
    "`",
    "|",
    "~",
    "·",
    "—",
    "——",
    "‘",
    "’",
    "“",
    "”",
    "…",
    "、",
    "。",
    "〈",
    "〉",
    "《",
    "》",
    "가",
    "가까스로",
    "가령",
    "각",
    "각각",
    "각자",
    "각종",
    "갖고말하자면",
    "같다",
    "같이",
    "개의치않고",
    "거니와",
    "거바",
    "거의",
    "것",
    "것과 같이",
    "것들",
    "게다가",
    "게우다",
    "겨우",
    "견지에서",
    "결과에 이르다",
    "결국",
    "결론을 낼 수 있다",
    "겸사겸사",
    "고려하면",
    "고로",
    "곧",
    "공동으로",
    "과",
    "과연",
    "관계가 있다",
    "관계없이",
    "관련이 있다",
    "관하여",
    "관한",
    "관해서는",
    "구",
    "구체적으로",
    "구토하다",
    "그",
    "그들",
    "그때",
    "그래",
    "그래도",
    "그래서",
    "그러나",
    "그러니",
    "그러니까",
    "그러면",
    "그러므로",
    "그러한즉",
    "그런 까닭에",
    "그런데",
    "그런즉",
    "그럼",
    "그럼에도 불구하고",
    "그렇게 함으로써",
    "그렇지",
    "그렇지 않다면",
    "그렇지 않으면",
    "그렇지만",
    "그렇지않으면",
    "그리고",
    "그리하여",
    "그만이다",
    "그에 따르는",
    "그위에",
    "그저",
    "그중에서",
    "그치지 않다",
    "근거로",
    "근거하여",
    "기대여",
    "기점으로",
    "기준으로",
    "기타",
    "까닭으로",
    "까악",
    "까지",
    "까지 미치다",
    "까지도",
    "꽈당",
    "끙끙",
    "끼익",
    "나",
    "나머지는",
    "남들",
    "남짓",
    "너",
    "너희",
    "너희들",
    "네",
    "넷",
    "년",
    "논하지 않다",
    "놀라다",
    "누가 알겠는가",
    "누구",
    "다른",
    "다른 방면으로",
    "다만",
    "다섯",
    "다소",
    "다수",
    "다시 말하자면",
    "다시말하면",
    "다음",
    "다음에",
    "다음으로",
    "단지",
    "답다",
    "당신",
    "당장",
    "대로 하다",
    "대하면",
    "대하여",
    "대해 말하자면",
    "대해서",
    "댕그",
    "더구나",
    "더군다나",
    "더라도",
    "더불어",
    "더욱더",
    "더욱이는",
    "도달하다",
    "도착하다",
    "동시에",
    "동안",
    "된바에야",
    "된이상",
    "두번째로",
    "둘",
    "둥둥",
    "뒤따라",
    "뒤이어",
    "든간에",
    "들",
    "등",
    "등등",
    "딩동",
    "따라",
    "따라서",
    "따위",
    "따지지 않다",
    "딱",
    "때",
    "때가 되어",
    "때문에",
    "또",
    "또한",
    "뚝뚝",
    "라 해도",
    "령",
    "로",
    "로 인하여",
    "로부터",
    "로써",
    "륙",
    "를",
    "마음대로",
    "마저",
    "마저도",
    "마치",
    "막론하고",
    "만 못하다",
    "만약",
    "만약에",
    "만은 아니다",
    "만이 아니다",
    "만일",
    "만큼",
    "말하자면",
    "말할것도 없고",
    "매",
    "매번",
    "메쓰겁다",
    "몇",
    "모",
    "모두",
    "무렵",
    "무릎쓰고",
    "무슨",
    "무엇",
    "무엇때문에",
    "물론",
    "및",
    "바꾸어말하면",
    "바꾸어말하자면",
    "바꾸어서 말하면",
    "바꾸어서 한다면",
    "바꿔 말하면",
    "바로",
    "바와같이",
    "밖에 안된다",
    "반대로",
    "반대로 말하자면",
    "반드시",
    "버금",
    "보는데서",
    "보다더",
    "보드득",
    "본대로",
    "봐",
    "봐라",
    "부류의 사람들",
    "부터",
    "불구하고",
    "불문하고",
    "붕붕",
    "비걱거리다",
    "비교적",
    "비길수 없다",
    "비로소",
    "비록",
    "비슷하다",
    "비추어 보아",
    "비하면",
    "뿐만 아니라",
    "뿐만아니라",
    "뿐이다",
    "삐걱",
    "삐걱거리다",
    "사",
    "삼",
    "상대적으로 말하자면",
    "생각한대로",
    "설령",
    "설마",
    "설사",
    "셋",
    "소생",
    "소인",
    "솨",
    "쉿",
    "습니까",
    "습니다",
    "시각",
    "시간",
    "시작하여",
    "시초에",
    "시키다",
    "실로",
    "심지어",
    "아",
    "아니",
    "아니나다를가",
    "아니라면",
    "아니면",
    "아니었다면",
    "아래윗",
    "아무거나",
    "아무도",
    "아야",
    "아울러",
    "아이",
    "아이고",
    "아이구",
    "아이야",
    "아이쿠",
    "아하",
    "아홉",
    "안 그러면",
    "않기 위하여",
    "않기 위해서",
    "알 수 있다",
    "알았어",
    "앗",
    "앞에서",
    "앞의것",
    "야",
    "약간",
    "양자",
    "어",
    "어기여차",
    "어느",
    "어느 년도",
    "어느것",
    "어느곳",
    "어느때",
    "어느쪽",
    "어느해",
    "어디",
    "어때",
    "어떠한",
    "어떤",
    "어떤것",
    "어떤것들",
    "어떻게",
    "어떻해",
    "어이",
    "어째서",
    "어쨋든",
    "어쩔수 없다",
    "어찌",
    "어찌됏든",
    "어찌됏어",
    "어찌하든지",
    "어찌하여",
    "언제",
    "언젠가",
    "얼마",
    "얼마 안 되는 것",
    "얼마간",
    "얼마나",
    "얼마든지",
    "얼마만큼",
    "얼마큼",
    "엉엉",
    "에",
    "에 가서",
    "에 달려 있다",
    "에 대해",
    "에 있다",
    "에 한하다",
    "에게",
    "에서",
    "여",
    "여기",
    "여덟",
    "여러분",
    "여보시오",
    "여부",
    "여섯",
    "여전히",
    "여차",
    "연관되다",
    "연이서",
    "영",
    "영차",
    "옆사람",
    "예",
    "예를 들면",
    "예를 들자면",
    "예컨대",
    "예하면",
    "오",
    "오로지",
    "오르다",
    "오자마자",
    "오직",
    "오호",
    "오히려",
    "와",
    "와 같은 사람들",
    "와르르",
    "와아",
    "왜",
    "왜냐하면",
    "외에도",
    "요만큼",
    "요만한 것",
    "요만한걸",
    "요컨대",
    "우르르",
    "우리",
    "우리들",
    "우선",
    "우에 종합한것과같이",
    "운운",
    "월",
    "위에서 서술한바와같이",
    "위하여",
    "위해서",
    "윙윙",
    "육",
    "으로",
    "으로 인하여",
    "으로서",
    "으로써",
    "을",
    "응",
    "응당",
    "의",
    "의거하여",
    "의지하여",
    "의해",
    "의해되다",
    "의해서",
    "이",
    "이 되다",
    "이 때문에",
    "이 밖에",
    "이 외에",
    "이 정도의",
    "이것",
    "이곳",
    "이때",
    "이라면",
    "이래",
    "이러이러하다",
    "이러한",
    "이런",
    "이럴정도로",
    "이렇게 많은 것",
    "이렇게되면",
    "이렇게말하자면",
    "이렇구나",
    "이로 인하여",
    "이르기까지",
    "이리하여",
    "이만큼",
    "이번",
    "이봐",
    "이상",
    "이어서",
    "이었다",
    "이와 같다",
    "이와 같은",
    "이와 반대로",
    "이와같다면",
    "이외에도",
    "이용하여",
    "이유만으로",
    "이젠",
    "이지만",
    "이쪽",
    "이천구",
    "이천육",
    "이천칠",
    "이천팔",
    "인 듯하다",
    "인젠",
    "일",
    "일것이다",
    "일곱",
    "일단",
    "일때",
    "일반적으로",
    "일지라도",
    "임에 틀림없다",
    "입각하여",
    "입장에서",
    "잇따라",
    "있다",
    "자",
    "자기",
    "자기집",
    "자마자",
    "자신",
    "잠깐",
    "잠시",
    "저",
    "저것",
    "저것만큼",
    "저기",
    "저쪽",
    "저희",
    "전부",
    "전자",
    "전후",
    "점에서 보아",
    "정도에 이르다",
    "제",
    "제각기",
    "제외하고",
    "조금",
    "조차",
    "조차도",
    "졸졸",
    "좀",
    "좋아",
    "좍좍",
    "주룩주룩",
    "주저하지 않고",
    "줄은 몰랏다",
    "줄은모른다",
    "중에서",
    "중의하나",
    "즈음하여",
    "즉",
    "즉시",
    "지든지",
    "지만",
    "지말고",
    "진짜로",
    "쪽으로",
    "차라리",
    "참",
    "참나",
    "첫번째로",
    "쳇",
    "총적으로",
    "총적으로 말하면",
    "총적으로 보면",
    "칠",
    "콸콸",
    "쾅쾅",
    "쿵",
    "타다",
    "타인",
    "탕탕",
    "토하다",
    "통하여",
    "툭",
    "퉤",
    "틈타",
    "팍",
    "팔",
    "퍽",
    "펄렁",
    "하",
    "하게될것이다",
    "하게하다",
    "하겠는가",
    "하고 있다",
    "하고있었다",
    "하곤하였다",
    "하구나",
    "하기 때문에",
    "하기 위하여",
    "하기는한데",
    "하기만 하면",
    "하기보다는",
    "하기에",
    "하나",
    "하느니",
    "하는 김에",
    "하는 편이 낫다",
    "하는것도",
    "하는것만 못하다",
    "하는것이 낫다",
    "하는바",
    "하더라도",
    "하도다",
    "하도록시키다",
    "하도록하다",
    "하든지",
    "하려고하다",
    "하마터면",
    "하면 할수록",
    "하면된다",
    "하면서",
    "하물며",
    "하여금",
    "하여야",
    "하자마자",
    "하지 않는다면",
    "하지 않도록",
    "하지마",
    "하지마라",
    "하지만",
    "하하",
    "한 까닭에",
    "한 이유는",
    "한 후",
    "한다면",
    "한다면 몰라도",
    "한데",
    "한마디",
    "한적이있다",
    "한켠으로는",
    "한항목",
    "할 따름이다",
    "할 생각이다",
    "할 줄 안다",
    "할 지경이다",
    "할 힘이 있다",
    "할때",
    "할만하다",
    "할망정",
    "할뿐",
    "할수있다",
    "할수있어",
    "할줄알다",
    "할지라도",
    "할지언정",
    "함께",
    "해도된다",
    "해도좋다",
    "해봐요",
    "해서는 안된다",
    "해야한다",
    "해요",
    "했어요",
    "향하다",
    "향하여",
    "향해서",
    "허",
    "허걱",
    "허허",
    "헉",
    "헉헉",
    "헐떡헐떡",
    "형식으로 쓰여",
    "혹시",
    "혹은",
    "혼자",
    "훨씬",
    "휘익",
    "휴",
    "흐흐",
    "흥",
    "힘입어",
    "︿",
    "！",
    "＃",
    "＄",
    "％",
    "＆",
    "（",
    "）",
    "＊",
    "＋",
    "，",
    "０",
    "１",
    "２",
    "３",
    "４",
    "５",
    "６",
    "７",
    "８",
    "９",
    "：",
    "；",
    "＜",
    "＞",
    "？",
    "＠",
    "［",
    "］",
    "｛",
    "｜",
    "｝",
    "～",
    "￥"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ku.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ku.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "ئێمە",
    "ئێوە",
    "ئەم",
    "ئەو",
    "ئەوان",
    "ئەوەی",
    "بۆ",
    "بێ",
    "بێجگە",
    "بە",
    "بەبێ",
    "بەدەم",
    "بەردەم",
    "بەرلە",
    "بەرەوی",
    "بەرەوە",
    "بەلای",
    "بەپێی",
    "تۆ",
    "تێ",
    "جگە",
    "دوای",
    "دوو",
    "دە",
    "دەکات",
    "دەگەڵ",
    "سەر",
    "لێ",
    "لە",
    "لەبابەت",
    "لەباتی",
    "لەبارەی",
    "لەبرێتی",
    "لەبن",
    "لەبەر",
    "لەبەینی",
    "لەدەم",
    "لەرێ",
    "لەرێگا",
    "لەرەوی",
    "لەسەر",
    "لەلایەن",
    "لەناو",
    "لەنێو",
    "لەو",
    "لەپێناوی",
    "لەژێر",
    "لەگەڵ",
    "من",
    "ناو",
    "نێوان",
    "هەر",
    "هەروەها",
    "و",
    "وەک",
    "پاش",
    "پێ",
    "پێش",
    "چەند",
    "کرد",
    "کە",
    "ی"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_la.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_la.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "ab",
    "ac",
    "ad",
    "at",
    "atque",
    "aut",
    "autem",
    "cum",
    "de",
    "dum",
    "e",
    "erant",
    "erat",
    "est",
    "et",
    "etiam",
    "ex",
    "haec",
    "hic",
    "hoc",
    "in",
    "ita",
    "me",
    "nec",
    "neque",
    "non",
    "per",
    "qua",
    "quae",
    "quam",
    "qui",
    "quibus",
    "quidem",
    "quo",
    "quod",
    "re",
    "rebus",
    "rem",
    "res",
    "sed",
    "si",
    "sic",
    "sunt",
    "tamen",
    "tandem",
    "te",
    "ut",
    "vel"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_lt.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_lt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "abi",
    "abidvi",
    "abiejose",
    "abiejuose",
    "abiejø",
    "abiem",
    "abigaliai",
    "abipus",
    "abu",
    "abudu",
    "ai",
    "ana",
    "anaiptol",
    "anaisiais",
    "anajai",
    "anajam",
    "anajame",
    "anapus",
    "anas",
    "anasai",
    "anasis",
    "anei",
    "aniedvi",
    "anieji",
    "aniesiems",
    "anoji",
    "anojo",
    "anojoje",
    "anokia",
    "anoks",
    "anosiomis",
    "anosioms",
    "anosios",
    "anosiose",
    "anot",
    "ant",
    "antai",
    "anuodu",
    "anuoju",
    "anuosiuose",
    "anuosius",
    "anàja",
    "anàjà",
    "anàjá",
    "anàsias",
    "anøjø",
    "apie",
    "aplink",
    "ar",
    "arba",
    "argi",
    "arti",
    "aukðèiau",
    "að",
    "be",
    "bei",
    "beje",
    "bemaþ",
    "bent",
    "bet",
    "betgi",
    "beveik",
    "dar",
    "dargi",
    "daugmaþ",
    "deja",
    "dëka",
    "dël",
    "dëlei",
    "dëlto",
    "ech",
    "et",
    "gal",
    "galbût",
    "galgi",
    "gan",
    "gana",
    "gi",
    "greta",
    "idant",
    "iki",
    "ir",
    "irgi",
    "it",
    "itin",
    "ið",
    "iðilgai",
    "iðvis",
    "jaisiais",
    "jajai",
    "jajam",
    "jajame",
    "jei",
    "jeigu",
    "ji",
    "jiedu",
    "jiedvi",
    "jieji",
    "jiesiems",
    "jinai",
    "jis",
    "jisai",
    "jog",
    "joji",
    "jojo",
    "jojoje",
    "jokia",
    "joks",
    "josiomis",
    "josioms",
    "josios",
    "josiose",
    "judu",
    "judvi",
    "juk",
    "jumis",
    "jums",
    "jumyse",
    "juodu",
    "juoju",
    "juosiuose",
    "juosius",
    "jus",
    "jàja",
    "jàjà",
    "jàsias",
    "jájá",
    "jøjø",
    "jûs",
    "jûsiðkis",
    "jûsiðkë",
    "jûsø",
    "kad",
    "kada",
    "kadangi",
    "kai",
    "kaip",
    "kaipgi",
    "kas",
    "katra",
    "katras",
    "katriedvi",
    "katruodu",
    "kaþin",
    "kaþkas",
    "kaþkatra",
    "kaþkatras",
    "kaþkokia",
    "kaþkoks",
    "kaþkuri",
    "kaþkuris",
    "kiaurai",
    "kiek",
    "kiekvienas",
    "kieno",
    "kita",
    "kitas",
    "kitokia",
    "kitoks",
    "kodël",
    "kokia",
    "koks",
    "kol",
    "kolei",
    "kone",
    "kuomet",
    "kur",
    "kurgi",
    "kuri",
    "kuriedvi",
    "kuris",
    "kuriuodu",
    "lai",
    "lig",
    "ligi",
    "link",
    "lyg",
    "man",
    "manaisiais",
    "manajai",
    "manajam",
    "manajame",
    "manas",
    "manasai",
    "manasis",
    "mane",
    "manieji",
    "maniesiems",
    "manim",
    "manimi",
    "maniðkis",
    "maniðkë",
    "mano",
    "manoji",
    "manojo",
    "manojoje",
    "manosiomis",
    "manosioms",
    "manosios",
    "manosiose",
    "manuoju",
    "manuosiuose",
    "manuosius",
    "manyje",
    "manàja",
    "manàjà",
    "manàjá",
    "manàsias",
    "manæs",
    "manøjø",
    "mat",
    "maþdaug",
    "maþne",
    "mes",
    "mudu",
    "mudvi",
    "mumis",
    "mums",
    "mumyse",
    "mus",
    "mûsiðkis",
    "mûsiðkë",
    "mûsø",
    "na",
    "nagi",
    "ne",
    "nebe",
    "nebent",
    "negi",
    "negu",
    "nei",
    "nejau",
    "nejaugi",
    "nekaip",
    "nelyginant",
    "nes",
    "net",
    "netgi",
    "netoli",
    "neva",
    "nors",
    "nuo",
    "në",
    "o",
    "ogi",
    "oi",
    "paeiliui",
    "pagal",
    "pakeliui",
    "palaipsniui",
    "palei",
    "pas",
    "pasak",
    "paskos",
    "paskui",
    "paskum",
    "pat",
    "pati",
    "patiems",
    "paties",
    "pats",
    "patys",
    "patá",
    "paèiais",
    "paèiam",
    "paèiame",
    "paèiu",
    "paèiuose",
    "paèius",
    "paèiø",
    "per",
    "pernelyg",
    "pirm",
    "pirma",
    "pirmiau",
    "po",
    "prie",
    "prieð",
    "prieðais",
    "pro",
    "pusiau",
    "rasi",
    "rodos",
    "sau",
    "savaisiais",
    "savajai",
    "savajam",
    "savajame",
    "savas",
    "savasai",
    "savasis",
    "save",
    "savieji",
    "saviesiems",
    "savimi",
    "saviðkis",
    "saviðkë",
    "savo",
    "savoji",
    "savojo",
    "savojoje",
    "savosiomis",
    "savosioms",
    "savosios",
    "savosiose",
    "savuoju",
    "savuosiuose",
    "savuosius",
    "savyje",
    "savàja",
    "savàjà",
    "savàjá",
    "savàsias",
    "savæs",
    "savøjø",
    "skersai",
    "skradþiai",
    "staèiai",
    "su",
    "sulig",
    "ta",
    "tad",
    "tai",
    "taigi",
    "taip",
    "taipogi",
    "taisiais",
    "tajai",
    "tajam",
    "tajame",
    "tamsta",
    "tarp",
    "tarsi",
    "tartum",
    "tarytum",
    "tas",
    "tasai",
    "tau",
    "tavaisiais",
    "tavajai",
    "tavajam",
    "tavajame",
    "tavas",
    "tavasai",
    "tavasis",
    "tave",
    "tavieji",
    "taviesiems",
    "tavimi",
    "taviðkis",
    "taviðkë",
    "tavo",
    "tavoji",
    "tavojo",
    "tavojoje",
    "tavosiomis",
    "tavosioms",
    "tavosios",
    "tavosiose",
    "tavuoju",
    "tavuosiuose",
    "tavuosius",
    "tavyje",
    "tavàja",
    "tavàjà",
    "tavàjá",
    "tavàsias",
    "tavæs",
    "tavøjø",
    "taèiau",
    "te",
    "tegu",
    "tegul",
    "tiedvi",
    "tieji",
    "ties",
    "tiesiems",
    "tiesiog",
    "tik",
    "tikriausiai",
    "tiktai",
    "toji",
    "tojo",
    "tojoje",
    "tokia",
    "toks",
    "tol",
    "tolei",
    "toliau",
    "tosiomis",
    "tosioms",
    "tosios",
    "tosiose",
    "tu",
    "tuodu",
    "tuoju",
    "tuosiuose",
    "tuosius",
    "turbût",
    "tàja",
    "tàjà",
    "tàjá",
    "tàsias",
    "tøjø",
    "tûlas",
    "uþ",
    "uþtat",
    "uþvis",
    "va",
    "vai",
    "viduj",
    "vidury",
    "vien",
    "vienas",
    "vienokia",
    "vienoks",
    "vietoj",
    "virð",
    "virðuj",
    "virðum",
    "vis",
    "vis dëlto",
    "visa",
    "visas",
    "visgi",
    "visokia",
    "visoks",
    "vos",
    "vël",
    "vëlgi",
    "ypaè",
    "á",
    "ákypai",
    "ástriþai",
    "ðalia",
    "ðe",
    "ði",
    "ðiaisiais",
    "ðiajai",
    "ðiajam",
    "ðiajame",
    "ðiapus",
    "ðiedvi",
    "ðieji",
    "ðiesiems",
    "ðioji",
    "ðiojo",
    "ðiojoje",
    "ðiokia",
    "ðioks",
    "ðiosiomis",
    "ðiosioms",
    "ðiosios",
    "ðiosiose",
    "ðis",
    "ðisai",
    "ðit",
    "ðita",
    "ðitas",
    "ðitiedvi",
    "ðitokia",
    "ðitoks",
    "ðituodu",
    "ðiuodu",
    "ðiuoju",
    "ðiuosiuose",
    "ðiuosius",
    "ðiàja",
    "ðiàjà",
    "ðiàsias",
    "ðiøjø",
    "ðtai",
    "ðájá",
    "þemiau"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_lv.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_lv.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "aiz",
    "ap",
    "apakš",
    "apakšpus",
    "ar",
    "arī",
    "augšpus",
    "bet",
    "bez",
    "bija",
    "biji",
    "biju",
    "bijām",
    "bijāt",
    "būs",
    "būsi",
    "būsiet",
    "būsim",
    "būt",
    "būšu",
    "caur",
    "diemžēl",
    "diezin",
    "droši",
    "dēļ",
    "esam",
    "esat",
    "esi",
    "esmu",
    "gan",
    "gar",
    "iekam",
    "iekams",
    "iekām",
    "iekāms",
    "iekš",
    "iekšpus",
    "ik",
    "ir",
    "it",
    "itin",
    "iz",
    "ja",
    "jau",
    "jeb",
    "jebšu",
    "jel",
    "jo",
    "jā",
    "ka",
    "kamēr",
    "kaut",
    "kolīdz",
    "kopš",
    "kā",
    "kļuva",
    "kļuvi",
    "kļuvu",
    "kļuvām",
    "kļuvāt",
    "kļūs",
    "kļūsi",
    "kļūsiet",
    "kļūsim",
    "kļūst",
    "kļūstam",
    "kļūstat",
    "kļūsti",
    "kļūstu",
    "kļūt",
    "kļūšu",
    "labad",
    "lai",
    "lejpus",
    "līdz",
    "līdzko",
    "ne",
    "nebūt",
    "nedz",
    "nekā",
    "nevis",
    "nezin",
    "no",
    "nu",
    "nē",
    "otrpus",
    "pa",
    "par",
    "pat",
    "pie",
    "pirms",
    "pret",
    "priekš",
    "pār",
    "pēc",
    "starp",
    "tad",
    "tak",
    "tapi",
    "taps",
    "tapsi",
    "tapsiet",
    "tapsim",
    "tapt",
    "tapāt",
    "tapšu",
    "taču",
    "te",
    "tiec",
    "tiek",
    "tiekam",
    "tiekat",
    "tieku",
    "tik",
    "tika",
    "tikai",
    "tiki",
    "tikko",
    "tiklab",
    "tiklīdz",
    "tiks",
    "tiksiet",
    "tiksim",
    "tikt",
    "tiku",
    "tikvien",
    "tikām",
    "tikāt",
    "tikšu",
    "tomēr",
    "topat",
    "turpretim",
    "turpretī",
    "tā",
    "tādēļ",
    "tālab",
    "tāpēc",
    "un",
    "uz",
    "vai",
    "var",
    "varat",
    "varēja",
    "varēji",
    "varēju",
    "varējām",
    "varējāt",
    "varēs",
    "varēsi",
    "varēsiet",
    "varēsim",
    "varēt",
    "varēšu",
    "vien",
    "virs",
    "virspus",
    "vis",
    "viņpus",
    "zem",
    "ārpus",
    "šaipus"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_mr.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_mr.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "अधिक",
    "अनेक",
    "अशी",
    "असलयाचे",
    "असलेल्या",
    "असा",
    "असून",
    "असे",
    "आज",
    "आणि",
    "आता",
    "आपल्या",
    "आला",
    "आली",
    "आले",
    "आहे",
    "आहेत",
    "एक",
    "एका",
    "कमी",
    "करणयात",
    "करून",
    "का",
    "काम",
    "काय",
    "काही",
    "किवा",
    "की",
    "केला",
    "केली",
    "केले",
    "कोटी",
    "गेल्या",
    "घेऊन",
    "जात",
    "झाला",
    "झाली",
    "झाले",
    "झालेल्या",
    "टा",
    "डॉ",
    "तर",
    "तरी",
    "तसेच",
    "ता",
    "ती",
    "तीन",
    "ते",
    "तो",
    "त्या",
    "त्याचा",
    "त्याची",
    "त्याच्या",
    "त्याना",
    "त्यानी",
    "त्यामुळे",
    "त्री",
    "दिली",
    "दोन",
    "न",
    "नाही",
    "निर्ण्य",
    "पण",
    "पम",
    "परयतन",
    "पाटील",
    "म",
    "मात्र",
    "माहिती",
    "मी",
    "मुबी",
    "म्हणजे",
    "म्हणाले",
    "म्हणून",
    "या",
    "याचा",
    "याची",
    "याच्या",
    "याना",
    "यानी",
    "येणार",
    "येत",
    "येथील",
    "येथे",
    "लाख",
    "व",
    "व्यकत",
    "सर्व",
    "सागित्ले",
    "सुरू",
    "हजार",
    "हा",
    "ही",
    "हे",
    "होणार",
    "होत",
    "होता",
    "होती",
    "होते"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ms.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ms.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "abdul",
    "abdullah",
    "acara",
    "ada",
    "adalah",
    "ahmad",
    "air",
    "akan",
    "akhbar",
    "akhir",
    "aktiviti",
    "alam",
    "amat",
    "amerika",
    "anak",
    "anggota",
    "antara",
    "antarabangsa",
    "apa",
    "apabila",
    "april",
    "as",
    "asas",
    "asean",
    "asia",
    "asing",
    "atas",
    "atau",
    "australia",
    "awal",
    "awam",
    "bagaimanapun",
    "bagi",
    "bahagian",
    "bahan",
    "baharu",
    "bahawa",
    "baik",
    "bandar",
    "bank",
    "banyak",
    "barangan",
    "baru",
    "baru-baru",
    "bawah",
    "beberapa",
    "bekas",
    "beliau",
    "belum",
    "berada",
    "berakhir",
    "berbanding",
    "berdasarkan",
    "berharap",
    "berikutan",
    "berjaya",
    "berjumlah",
    "berkaitan",
    "berkata",
    "berkenaan",
    "berlaku",
    "bermula",
    "bernama",
    "bernilai",
    "bersama",
    "berubah",
    "besar",
    "bhd",
    "bidang",
    "bilion",
    "bn",
    "boleh",
    "bukan",
    "bulan",
    "bursa",
    "cadangan",
    "china",
    "dagangan",
    "dalam",
    "dan",
    "dana",
    "dapat",
    "dari",
    "daripada",
    "dasar",
    "datang",
    "datuk",
    "demikian",
    "dengan",
    "depan",
    "derivatives",
    "dewan",
    "di",
    "diadakan",
    "dibuka",
    "dicatatkan",
    "dijangka",
    "diniagakan",
    "dis",
    "disember",
    "ditutup",
    "dolar",
    "dr",
    "dua",
    "dunia",
    "ekonomi",
    "eksekutif",
    "eksport",
    "empat",
    "enam",
    "faedah",
    "feb",
    "global",
    "hadapan",
    "hanya",
    "harga",
    "hari",
    "hasil",
    "hingga",
    "hubungan",
    "ia",
    "iaitu",
    "ialah",
    "indeks",
    "india",
    "indonesia",
    "industri",
    "ini",
    "islam",
    "isnin",
    "isu",
    "itu",
    "jabatan",
    "jalan",
    "jan",
    "jawatan",
    "jawatankuasa",
    "jepun",
    "jika",
    "jualan",
    "juga",
    "julai",
    "jumaat",
    "jumlah",
    "jun",
    "juta",
    "kadar",
    "kalangan",
    "kali",
    "kami",
    "kata",
    "katanya",
    "kaunter",
    "kawasan",
    "ke",
    "keadaan",
    "kecil",
    "kedua",
    "kedua-dua",
    "kedudukan",
    "kekal",
    "kementerian",
    "kemudahan",
    "kenaikan",
    "kenyataan",
    "kepada",
    "kepentingan",
    "keputusan",
    "kerajaan",
    "kerana",
    "kereta",
    "kerja",
    "kerjasama",
    "kes",
    "keselamatan",
    "keseluruhan",
    "kesihatan",
    "ketika",
    "ketua",
    "keuntungan",
    "kewangan",
    "khamis",
    "kini",
    "kira-kira",
    "kita",
    "klci",
    "klibor",
    "komposit",
    "kontrak",
    "kos",
    "kuala",
    "kuasa",
    "kukuh",
    "kumpulan",
    "lagi",
    "lain",
    "langkah",
    "laporan",
    "lebih",
    "lepas",
    "lima",
    "lot",
    "luar",
    "lumpur",
    "mac",
    "mahkamah",
    "mahu",
    "majlis",
    "makanan",
    "maklumat",
    "malam",
    "malaysia",
    "mana",
    "manakala",
    "masa",
    "masalah",
    "masih",
    "masing-masing",
    "masyarakat",
    "mata",
    "media",
    "mei",
    "melalui",
    "melihat",
    "memandangkan",
    "memastikan",
    "membantu",
    "membawa",
    "memberi",
    "memberikan",
    "membolehkan",
    "membuat",
    "mempunyai",
    "menambah",
    "menarik",
    "menawarkan",
    "mencapai",
    "mencatatkan",
    "mendapat",
    "mendapatkan",
    "menerima",
    "menerusi",
    "mengadakan",
    "mengambil",
    "mengenai",
    "menggalakkan",
    "menggunakan",
    "mengikut",
    "mengumumkan",
    "mengurangkan",
    "meningkat",
    "meningkatkan",
    "menjadi",
    "menjelang",
    "menokok",
    "menteri",
    "menunjukkan",
    "menurut",
    "menyaksikan",
    "menyediakan",
    "mereka",
    "merosot",
    "merupakan",
    "mesyuarat",
    "minat",
    "minggu",
    "minyak",
    "modal",
    "mohd",
    "mudah",
    "mungkin",
    "naik",
    "najib",
    "nasional",
    "negara",
    "negara-negara",
    "negeri",
    "niaga",
    "nilai",
    "nov",
    "ogos",
    "okt",
    "oleh",
    "operasi",
    "orang",
    "pada",
    "pagi",
    "paling",
    "pameran",
    "papan",
    "para",
    "paras",
    "parlimen",
    "parti",
    "pasaran",
    "pasukan",
    "pegawai",
    "pejabat",
    "pekerja",
    "pelabur",
    "pelaburan",
    "pelancongan",
    "pelanggan",
    "pelbagai",
    "peluang",
    "pembangunan",
    "pemberita",
    "pembinaan",
    "pemimpin",
    "pendapatan",
    "pendidikan",
    "penduduk",
    "penerbangan",
    "pengarah",
    "pengeluaran",
    "pengerusi",
    "pengguna",
    "pengurusan",
    "peniaga",
    "peningkatan",
    "penting",
    "peratus",
    "perdagangan",
    "perdana",
    "peringkat",
    "perjanjian",
    "perkara",
    "perkhidmatan",
    "perladangan",
    "perlu",
    "permintaan",
    "perniagaan",
    "persekutuan",
    "persidangan",
    "pertama",
    "pertubuhan",
    "pertumbuhan",
    "perusahaan",
    "peserta",
    "petang",
    "pihak",
    "pilihan",
    "pinjaman",
    "polis",
    "politik",
    "presiden",
    "prestasi",
    "produk",
    "program",
    "projek",
    "proses",
    "proton",
    "pukul",
    "pula",
    "pusat",
    "rabu",
    "rakan",
    "rakyat",
    "ramai",
    "rantau",
    "raya",
    "rendah",
    "ringgit",
    "rumah",
    "sabah",
    "sahaja",
    "saham",
    "sama",
    "sarawak",
    "satu",
    "sawit",
    "saya",
    "sdn",
    "sebagai",
    "sebahagian",
    "sebanyak",
    "sebarang",
    "sebelum",
    "sebelumnya",
    "sebuah",
    "secara",
    "sedang",
    "segi",
    "sehingga",
    "sejak",
    "sekarang",
    "sektor",
    "sekuriti",
    "selain",
    "selama",
    "selasa",
    "selatan",
    "selepas",
    "seluruh",
    "semakin",
    "semalam",
    "semasa",
    "sementara",
    "semua",
    "semula",
    "sen",
    "sendiri",
    "seorang",
    "sepanjang",
    "seperti",
    "sept",
    "september",
    "serantau",
    "seri",
    "serta",
    "sesi",
    "setiap",
    "setiausaha",
    "sidang",
    "singapura",
    "sini",
    "sistem",
    "sokongan",
    "sri",
    "sudah",
    "sukan",
    "suku",
    "sumber",
    "supaya",
    "susut",
    "syarikat",
    "syed",
    "tahap",
    "tahun",
    "tan",
    "tanah",
    "tanpa",
    "tawaran",
    "teknologi",
    "telah",
    "tempat",
    "tempatan",
    "tempoh",
    "tenaga",
    "tengah",
    "tentang",
    "terbaik",
    "terbang",
    "terbesar",
    "terbuka",
    "terdapat",
    "terhadap",
    "termasuk",
    "tersebut",
    "terus",
    "tetapi",
    "thailand",
    "tiada",
    "tidak",
    "tiga",
    "timbalan",
    "timur",
    "tindakan",
    "tinggi",
    "tun",
    "tunai",
    "turun",
    "turut",
    "umno",
    "unit",
    "untuk",
    "untung",
    "urus",
    "usaha",
    "utama",
    "walaupun",
    "wang",
    "wanita",
    "wilayah",
    "yang"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_no.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_no.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "alle",
    "andre",
    "arbeid",
    "at",
    "av",
    "bare",
    "begge",
    "ble",
    "blei",
    "bli",
    "blir",
    "blitt",
    "bort",
    "bra",
    "bruke",
    "både",
    "båe",
    "da",
    "de",
    "deg",
    "dei",
    "deim",
    "deira",
    "deires",
    "dem",
    "den",
    "denne",
    "der",
    "dere",
    "deres",
    "det",
    "dette",
    "di",
    "din",
    "disse",
    "ditt",
    "du",
    "dykk",
    "dykkar",
    "då",
    "eg",
    "ein",
    "eit",
    "eitt",
    "eller",
    "elles",
    "en",
    "ene",
    "eneste",
    "enhver",
    "enn",
    "er",
    "et",
    "ett",
    "etter",
    "folk",
    "for",
    "fordi",
    "forsûke",
    "fra",
    "få",
    "før",
    "fûr",
    "fûrst",
    "gjorde",
    "gjûre",
    "god",
    "gå",
    "ha",
    "hadde",
    "han",
    "hans",
    "har",
    "hennar",
    "henne",
    "hennes",
    "her",
    "hjå",
    "ho",
    "hoe",
    "honom",
    "hoss",
    "hossen",
    "hun",
    "hva",
    "hvem",
    "hver",
    "hvilke",
    "hvilken",
    "hvis",
    "hvor",
    "hvordan",
    "hvorfor",
    "i",
    "ikke",
    "ikkje",
    "ingen",
    "ingi",
    "inkje",
    "inn",
    "innen",
    "inni",
    "ja",
    "jeg",
    "kan",
    "kom",
    "korleis",
    "korso",
    "kun",
    "kunne",
    "kva",
    "kvar",
    "kvarhelst",
    "kven",
    "kvi",
    "kvifor",
    "lage",
    "lang",
    "lik",
    "like",
    "makt",
    "man",
    "mange",
    "me",
    "med",
    "medan",
    "meg",
    "meget",
    "mellom",
    "men",
    "mens",
    "mer",
    "mest",
    "mi",
    "min",
    "mine",
    "mitt",
    "mot",
    "mye",
    "mykje",
    "må",
    "måte",
    "navn",
    "ned",
    "nei",
    "no",
    "noe",
    "noen",
    "noka",
    "noko",
    "nokon",
    "nokor",
    "nokre",
    "ny",
    "nå",
    "når",
    "og",
    "også",
    "om",
    "opp",
    "oss",
    "over",
    "part",
    "punkt",
    "på",
    "rett",
    "riktig",
    "samme",
    "sant",
    "seg",
    "selv",
    "si",
    "sia",
    "sidan",
    "siden",
    "sin",
    "sine",
    "sist",
    "sitt",
    "sjøl",
    "skal",
    "skulle",
    "slik",
    "slutt",
    "so",
    "som",
    "somme",
    "somt",
    "start",
    "stille",
    "så",
    "sånn",
    "tid",
    "til",
    "tilbake",
    "tilstand",
    "um",
    "under",
    "upp",
    "ut",
    "uten",
    "var",
    "vart",
    "varte",
    "ved",
    "verdi",
    "vere",
    "verte",
    "vi",
    "vil",
    "ville",
    "vite",
    "vore",
    "vors",
    "vort",
    "vår",
    "være",
    "vært",
    "vöre",
    "vört",
    "å"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_pl.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_pl.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "aby",
    "ach",
    "acz",
    "aczkolwiek",
    "aj",
    "albo",
    "ale",
    "ależ",
    "ani",
    "aż",
    "bardziej",
    "bardzo",
    "bez",
    "bo",
    "bowiem",
    "by",
    "byli",
    "bym",
    "bynajmniej",
    "być",
    "był",
    "była",
    "było",
    "były",
    "będzie",
    "będą",
    "cali",
    "cała",
    "cały",
    "chce",
    "choć",
    "ci",
    "ciebie",
    "cię",
    "co",
    "cokolwiek",
    "coraz",
    "coś",
    "czasami",
    "czasem",
    "czemu",
    "czy",
    "czyli",
    "często",
    "daleko",
    "dla",
    "dlaczego",
    "dlatego",
    "do",
    "dobrze",
    "dokąd",
    "dość",
    "dr",
    "dużo",
    "dwa",
    "dwaj",
    "dwie",
    "dwoje",
    "dzisiaj",
    "dziś",
    "gdy",
    "gdyby",
    "gdyż",
    "gdzie",
    "gdziekolwiek",
    "gdzieś",
    "go",
    "godz",
    "hab",
    "i",
    "ich",
    "ii",
    "iii",
    "ile",
    "im",
    "inna",
    "inne",
    "inny",
    "innych",
    "inż",
    "iv",
    "ix",
    "iż",
    "ja",
    "jak",
    "jakaś",
    "jakby",
    "jaki",
    "jakichś",
    "jakie",
    "jakiś",
    "jakiż",
    "jakkolwiek",
    "jako",
    "jakoś",
    "je",
    "jeden",
    "jedna",
    "jednak",
    "jednakże",
    "jedno",
    "jednym",
    "jedynie",
    "jego",
    "jej",
    "jemu",
    "jest",
    "jestem",
    "jeszcze",
    "jeśli",
    "jeżeli",
    "już",
    "ją",
    "każdy",
    "kiedy",
    "kierunku",
    "kilka",
    "kilku",
    "kimś",
    "kto",
    "ktokolwiek",
    "ktoś",
    "która",
    "które",
    "którego",
    "której",
    "który",
    "których",
    "którym",
    "którzy",
    "ku",
    "lat",
    "lecz",
    "lub",
    "ma",
    "mają",
    "mam",
    "mamy",
    "mało",
    "mgr",
    "mi",
    "miał",
    "mimo",
    "między",
    "mnie",
    "mną",
    "mogą",
    "moi",
    "moim",
    "moja",
    "moje",
    "może",
    "możliwe",
    "można",
    "mu",
    "musi",
    "my",
    "mój",
    "na",
    "nad",
    "nam",
    "nami",
    "nas",
    "nasi",
    "nasz",
    "nasza",
    "nasze",
    "naszego",
    "naszych",
    "natomiast",
    "natychmiast",
    "nawet",
    "nic",
    "nich",
    "nie",
    "niech",
    "niego",
    "niej",
    "niemu",
    "nigdy",
    "nim",
    "nimi",
    "nią",
    "niż",
    "no",
    "nowe",
    "np",
    "nr",
    "o",
    "o.o.",
    "obok",
    "od",
    "ok",
    "około",
    "on",
    "ona",
    "one",
    "oni",
    "ono",
    "oraz",
    "oto",
    "owszem",
    "pan",
    "pana",
    "pani",
    "pl",
    "po",
    "pod",
    "podczas",
    "pomimo",
    "ponad",
    "ponieważ",
    "powinien",
    "powinna",
    "powinni",
    "powinno",
    "poza",
    "prawie",
    "prof",
    "przecież",
    "przed",
    "przede",
    "przedtem",
    "przez",
    "przy",
    "raz",
    "razie",
    "roku",
    "również",
    "sam",
    "sama",
    "się",
    "skąd",
    "sobie",
    "sobą",
    "sposób",
    "swoje",
    "są",
    "ta",
    "tak",
    "taka",
    "taki",
    "takich",
    "takie",
    "także",
    "tam",
    "te",
    "tego",
    "tej",
    "tel",
    "temu",
    "ten",
    "teraz",
    "też",
    "to",
    "tobie",
    "tobą",
    "toteż",
    "totobą",
    "trzeba",
    "tu",
    "tutaj",
    "twoi",
    "twoim",
    "twoja",
    "twoje",
    "twym",
    "twój",
    "ty",
    "tych",
    "tylko",
    "tym",
    "tys",
    "tzw",
    "tę",
    "u",
    "ul",
    "vi",
    "vii",
    "viii",
    "vol",
    "w",
    "wam",
    "wami",
    "was",
    "wasi",
    "wasz",
    "wasza",
    "wasze",
    "we",
    "według",
    "wie",
    "wiele",
    "wielu",
    "więc",
    "więcej",
    "wszyscy",
    "wszystkich",
    "wszystkie",
    "wszystkim",
    "wszystko",
    "wtedy",
    "www",
    "wy",
    "właśnie",
    "wśród",
    "xi",
    "xii",
    "xiii",
    "xiv",
    "xv",
    "z",
    "za",
    "zapewne",
    "zawsze",
    "zaś",
    "ze",
    "zeznowu",
    "znowu",
    "znów",
    "został",
    "zł",
    "żaden",
    "żadna",
    "żadne",
    "żadnych",
    "że",
    "żeby"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_pt.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_pt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "acerca",
    "adeus",
    "agora",
    "ainda",
    "alem",
    "algmas",
    "algo",
    "algumas",
    "alguns",
    "ali",
    "além",
    "ambas",
    "ambos",
    "ano",
    "anos",
    "antes",
    "ao",
    "aonde",
    "aos",
    "apenas",
    "apoio",
    "apontar",
    "apos",
    "após",
    "aquela",
    "aquelas",
    "aquele",
    "aqueles",
    "aqui",
    "aquilo",
    "as",
    "assim",
    "através",
    "atrás",
    "até",
    "aí",
    "baixo",
    "bastante",
    "bem",
    "boa",
    "boas",
    "bom",
    "bons",
    "breve",
    "cada",
    "caminho",
    "catorze",
    "cedo",
    "cento",
    "certamente",
    "certeza",
    "cima",
    "cinco",
    "coisa",
    "com",
    "como",
    "comprido",
    "conhecido",
    "conselho",
    "contra",
    "contudo",
    "corrente",
    "cuja",
    "cujas",
    "cujo",
    "cujos",
    "custa",
    "cá",
    "da",
    "daquela",
    "daquelas",
    "daquele",
    "daqueles",
    "dar",
    "das",
    "de",
    "debaixo",
    "dela",
    "delas",
    "dele",
    "deles",
    "demais",
    "dentro",
    "depois",
    "desde",
    "desligado",
    "dessa",
    "dessas",
    "desse",
    "desses",
    "desta",
    "destas",
    "deste",
    "destes",
    "deve",
    "devem",
    "deverá",
    "dez",
    "dezanove",
    "dezasseis",
    "dezassete",
    "dezoito",
    "dia",
    "diante",
    "direita",
    "dispoe",
    "dispoem",
    "diversa",
    "diversas",
    "diversos",
    "diz",
    "dizem",
    "dizer",
    "do",
    "dois",
    "dos",
    "doze",
    "duas",
    "durante",
    "dá",
    "dão",
    "dúvida",
    "e",
    "ela",
    "elas",
    "ele",
    "eles",
    "em",
    "embora",
    "enquanto",
    "entao",
    "entre",
    "então",
    "era",
    "eram",
    "essa",
    "essas",
    "esse",
    "esses",
    "esta",
    "estado",
    "estamos",
    "estar",
    "estará",
    "estas",
    "estava",
    "estavam",
    "este",
    "esteja",
    "estejam",
    "estejamos",
    "estes",
    "esteve",
    "estive",
    "estivemos",
    "estiver",
    "estivera",
    "estiveram",
    "estiverem",
    "estivermos",
    "estivesse",
    "estivessem",
    "estiveste",
    "estivestes",
    "estivéramos",
    "estivéssemos",
    "estou",
    "está",
    "estás",
    "estávamos",
    "estão",
    "eu",
    "exemplo",
    "falta",
    "fará",
    "favor",
    "faz",
    "fazeis",
    "fazem",
    "fazemos",
    "fazer",
    "fazes",
    "fazia",
    "faço",
    "fez",
    "fim",
    "final",
    "foi",
    "fomos",
    "for",
    "fora",
    "foram",
    "forem",
    "forma",
    "formos",
    "fosse",
    "fossem",
    "foste",
    "fostes",
    "fui",
    "fôramos",
    "fôssemos",
    "geral",
    "grande",
    "grandes",
    "grupo",
    "ha",
    "haja",
    "hajam",
    "hajamos",
    "havemos",
    "havia",
    "hei",
    "hoje",
    "hora",
    "horas",
    "houve",
    "houvemos",
    "houver",
    "houvera",
    "houveram",
    "houverei",
    "houverem",
    "houveremos",
    "houveria",
    "houveriam",
    "houvermos",
    "houverá",
    "houverão",
    "houveríamos",
    "houvesse",
    "houvessem",
    "houvéramos",
    "houvéssemos",
    "há",
    "hão",
    "iniciar",
    "inicio",
    "ir",
    "irá",
    "isso",
    "ista",
    "iste",
    "isto",
    "já",
    "lado",
    "lhe",
    "lhes",
    "ligado",
    "local",
    "logo",
    "longe",
    "lugar",
    "lá",
    "maior",
    "maioria",
    "maiorias",
    "mais",
    "mal",
    "mas",
    "me",
    "mediante",
    "meio",
    "menor",
    "menos",
    "meses",
    "mesma",
    "mesmas",
    "mesmo",
    "mesmos",
    "meu",
    "meus",
    "mil",
    "minha",
    "minhas",
    "momento",
    "muito",
    "muitos",
    "máximo",
    "mês",
    "na",
    "nada",
    "nao",
    "naquela",
    "naquelas",
    "naquele",
    "naqueles",
    "nas",
    "nem",
    "nenhuma",
    "nessa",
    "nessas",
    "nesse",
    "nesses",
    "nesta",
    "nestas",
    "neste",
    "nestes",
    "no",
    "noite",
    "nome",
    "nos",
    "nossa",
    "nossas",
    "nosso",
    "nossos",
    "nova",
    "novas",
    "nove",
    "novo",
    "novos",
    "num",
    "numa",
    "numas",
    "nunca",
    "nuns",
    "não",
    "nível",
    "nós",
    "número",
    "o",
    "obra",
    "obrigada",
    "obrigado",
    "oitava",
    "oitavo",
    "oito",
    "onde",
    "ontem",
    "onze",
    "os",
    "ou",
    "outra",
    "outras",
    "outro",
    "outros",
    "para",
    "parece",
    "parte",
    "partir",
    "paucas",
    "pegar",
    "pela",
    "pelas",
    "pelo",
    "pelos",
    "perante",
    "perto",
    "pessoas",
    "pode",
    "podem",
    "poder",
    "poderá",
    "podia",
    "pois",
    "ponto",
    "pontos",
    "por",
    "porque",
    "porquê",
    "portanto",
    "posição",
    "possivelmente",
    "posso",
    "possível",
    "pouca",
    "pouco",
    "poucos",
    "povo",
    "primeira",
    "primeiras",
    "primeiro",
    "primeiros",
    "promeiro",
    "propios",
    "proprio",
    "própria",
    "próprias",
    "próprio",
    "próprios",
    "próxima",
    "próximas",
    "próximo",
    "próximos",
    "puderam",
    "pôde",
    "põe",
    "põem",
    "quais",
    "qual",
    "qualquer",
    "quando",
    "quanto",
    "quarta",
    "quarto",
    "quatro",
    "que",
    "quem",
    "quer",
    "quereis",
    "querem",
    "queremas",
    "queres",
    "quero",
    "questão",
    "quieto",
    "quinta",
    "quinto",
    "quinze",
    "quáis",
    "quê",
    "relação",
    "sabe",
    "sabem",
    "saber",
    "se",
    "segunda",
    "segundo",
    "sei",
    "seis",
    "seja",
    "sejam",
    "sejamos",
    "sem",
    "sempre",
    "sendo",
    "ser",
    "serei",
    "seremos",
    "seria",
    "seriam",
    "será",
    "serão",
    "seríamos",
    "sete",
    "seu",
    "seus",
    "sexta",
    "sexto",
    "sim",
    "sistema",
    "sob",
    "sobre",
    "sois",
    "somente",
    "somos",
    "sou",
    "sua",
    "suas",
    "são",
    "sétima",
    "sétimo",
    "só",
    "tal",
    "talvez",
    "tambem",
    "também",
    "tanta",
    "tantas",
    "tanto",
    "tarde",
    "te",
    "tem",
    "temos",
    "tempo",
    "tendes",
    "tenha",
    "tenham",
    "tenhamos",
    "tenho",
    "tens",
    "tentar",
    "tentaram",
    "tente",
    "tentei",
    "ter",
    "terceira",
    "terceiro",
    "terei",
    "teremos",
    "teria",
    "teriam",
    "terá",
    "terão",
    "teríamos",
    "teu",
    "teus",
    "teve",
    "tinha",
    "tinham",
    "tipo",
    "tive",
    "tivemos",
    "tiver",
    "tivera",
    "tiveram",
    "tiverem",
    "tivermos",
    "tivesse",
    "tivessem",
    "tiveste",
    "tivestes",
    "tivéramos",
    "tivéssemos",
    "toda",
    "todas",
    "todo",
    "todos",
    "trabalhar",
    "trabalho",
    "treze",
    "três",
    "tu",
    "tua",
    "tuas",
    "tudo",
    "tão",
    "tém",
    "têm",
    "tínhamos",
    "um",
    "uma",
    "umas",
    "uns",
    "usa",
    "usar",
    "vai",
    "vais",
    "valor",
    "veja",
    "vem",
    "vens",
    "ver",
    "verdade",
    "verdadeiro",
    "vez",
    "vezes",
    "viagem",
    "vindo",
    "vinte",
    "você",
    "vocês",
    "vos",
    "vossa",
    "vossas",
    "vosso",
    "vossos",
    "vários",
    "vão",
    "vêm",
    "vós",
    "zero",
    "à",
    "às",
    "área",
    "é",
    "éramos",
    "és",
    "último"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ro.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ro.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "abia",
    "acea",
    "aceasta",
    "această",
    "aceea",
    "aceeasi",
    "acei",
    "aceia",
    "acel",
    "acela",
    "acelasi",
    "acele",
    "acelea",
    "acest",
    "acesta",
    "aceste",
    "acestea",
    "acestei",
    "acestia",
    "acestui",
    "aceşti",
    "aceştia",
    "acolo",
    "acord",
    "acum",
    "adica",
    "ai",
    "aia",
    "aibă",
    "aici",
    "aiurea",
    "al",
    "ala",
    "alaturi",
    "ale",
    "alea",
    "alt",
    "alta",
    "altceva",
    "altcineva",
    "alte",
    "altfel",
    "alti",
    "altii",
    "altul",
    "am",
    "anume",
    "apoi",
    "ar",
    "are",
    "as",
    "asa",
    "asemenea",
    "asta",
    "astazi",
    "astea",
    "astfel",
    "astăzi",
    "asupra",
    "atare",
    "atat",
    "atata",
    "atatea",
    "atatia",
    "ati",
    "atit",
    "atita",
    "atitea",
    "atitia",
    "atunci",
    "au",
    "avea",
    "avem",
    "aveţi",
    "avut",
    "azi",
    "aş",
    "aşadar",
    "aţi",
    "b",
    "ba",
    "bine",
    "bucur",
    "bună",
    "c",
    "ca",
    "cam",
    "cand",
    "capat",
    "care",
    "careia",
    "carora",
    "caruia",
    "cat",
    "catre",
    "caut",
    "ce",
    "cea",
    "ceea",
    "cei",
    "ceilalti",
    "cel",
    "cele",
    "celor",
    "ceva",
    "chiar",
    "ci",
    "cinci",
    "cind",
    "cine",
    "cineva",
    "cit",
    "cita",
    "cite",
    "citeva",
    "citi",
    "citiva",
    "conform",
    "contra",
    "cu",
    "cui",
    "cum",
    "cumva",
    "curând",
    "curînd",
    "când",
    "cât",
    "câte",
    "câtva",
    "câţi",
    "cînd",
    "cît",
    "cîte",
    "cîtva",
    "cîţi",
    "că",
    "căci",
    "cărei",
    "căror",
    "cărui",
    "către",
    "d",
    "da",
    "daca",
    "dacă",
    "dar",
    "dat",
    "datorită",
    "dată",
    "dau",
    "de",
    "deasupra",
    "deci",
    "decit",
    "degraba",
    "deja",
    "deoarece",
    "departe",
    "desi",
    "despre",
    "deşi",
    "din",
    "dinaintea",
    "dintr",
    "dintr-",
    "dintre",
    "doar",
    "doi",
    "doilea",
    "două",
    "drept",
    "dupa",
    "după",
    "dă",
    "e",
    "ea",
    "ei",
    "el",
    "ele",
    "era",
    "eram",
    "este",
    "eu",
    "exact",
    "eşti",
    "f",
    "face",
    "fara",
    "fata",
    "fel",
    "fi",
    "fie",
    "fiecare",
    "fii",
    "fim",
    "fiu",
    "fiţi",
    "foarte",
    "fost",
    "frumos",
    "fără",
    "g",
    "geaba",
    "graţie",
    "h",
    "halbă",
    "i",
    "ia",
    "iar",
    "ieri",
    "ii",
    "il",
    "imi",
    "in",
    "inainte",
    "inapoi",
    "inca",
    "incit",
    "insa",
    "intr",
    "intre",
    "isi",
    "iti",
    "j",
    "k",
    "l",
    "la",
    "le",
    "li",
    "lor",
    "lui",
    "lângă",
    "lîngă",
    "m",
    "ma",
    "mai",
    "mare",
    "mea",
    "mei",
    "mele",
    "mereu",
    "meu",
    "mi",
    "mie",
    "mine",
    "mod",
    "mult",
    "multa",
    "multe",
    "multi",
    "multă",
    "mulţi",
    "mulţumesc",
    "mâine",
    "mîine",
    "mă",
    "n",
    "ne",
    "nevoie",
    "ni",
    "nici",
    "niciodata",
    "nicăieri",
    "nimeni",
    "nimeri",
    "nimic",
    "niste",
    "nişte",
    "noastre",
    "noastră",
    "noi",
    "noroc",
    "nostri",
    "nostru",
    "nou",
    "noua",
    "nouă",
    "noştri",
    "nu",
    "numai",
    "o",
    "opt",
    "or",
    "ori",
    "oricare",
    "orice",
    "oricine",
    "oricum",
    "oricând",
    "oricât",
    "oricînd",
    "oricît",
    "oriunde",
    "p",
    "pai",
    "parca",
    "patra",
    "patru",
    "patrulea",
    "pe",
    "pentru",
    "peste",
    "pic",
    "pina",
    "plus",
    "poate",
    "pot",
    "prea",
    "prima",
    "primul",
    "prin",
    "printr-",
    "putini",
    "puţin",
    "puţina",
    "puţină",
    "până",
    "pînă",
    "r",
    "rog",
    "s",
    "sa",
    "sa-mi",
    "sa-ti",
    "sai",
    "sale",
    "sau",
    "se",
    "si",
    "sint",
    "sintem",
    "spate",
    "spre",
    "sub",
    "sunt",
    "suntem",
    "sunteţi",
    "sus",
    "sută",
    "sînt",
    "sîntem",
    "sînteţi",
    "să",
    "săi",
    "său",
    "t",
    "ta",
    "tale",
    "te",
    "ti",
    "timp",
    "tine",
    "toata",
    "toate",
    "toată",
    "tocmai",
    "tot",
    "toti",
    "totul",
    "totusi",
    "totuşi",
    "toţi",
    "trei",
    "treia",
    "treilea",
    "tu",
    "tuturor",
    "tăi",
    "tău",
    "u",
    "ul",
    "ului",
    "un",
    "una",
    "unde",
    "undeva",
    "unei",
    "uneia",
    "unele",
    "uneori",
    "unii",
    "unor",
    "unora",
    "unu",
    "unui",
    "unuia",
    "unul",
    "v",
    "va",
    "vi",
    "voastre",
    "voastră",
    "voi",
    "vom",
    "vor",
    "vostru",
    "vouă",
    "voştri",
    "vreme",
    "vreo",
    "vreun",
    "vă",
    "x",
    "z",
    "zece",
    "zero",
    "zi",
    "zice",
    "îi",
    "îl",
    "îmi",
    "împotriva",
    "în",
    "înainte",
    "înaintea",
    "încotro",
    "încât",
    "încît",
    "între",
    "întrucât",
    "întrucît",
    "îţi",
    "ăla",
    "ălea",
    "ăsta",
    "ăstea",
    "ăştia",
    "şapte",
    "şase",
    "şi",
    "ştiu",
    "ţi",
    "ţie"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ru.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ru.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "c",
    "а",
    "алло",
    "без",
    "белый",
    "близко",
    "более",
    "больше",
    "большой",
    "будем",
    "будет",
    "будете",
    "будешь",
    "будто",
    "буду",
    "будут",
    "будь",
    "бы",
    "бывает",
    "бывь",
    "был",
    "была",
    "были",
    "было",
    "быть",
    "в",
    "важная",
    "важное",
    "важные",
    "важный",
    "вам",
    "вами",
    "вас",
    "ваш",
    "ваша",
    "ваше",
    "ваши",
    "вверх",
    "вдали",
    "вдруг",
    "ведь",
    "везде",
    "вернуться",
    "весь",
    "вечер",
    "взгляд",
    "взять",
    "вид",
    "видел",
    "видеть",
    "вместе",
    "вне",
    "вниз",
    "внизу",
    "во",
    "вода",
    "война",
    "вокруг",
    "вон",
    "вообще",
    "вопрос",
    "восемнадцатый",
    "восемнадцать",
    "восемь",
    "восьмой",
    "вот",
    "впрочем",
    "времени",
    "время",
    "все",
    "все еще",
    "всегда",
    "всего",
    "всем",
    "всеми",
    "всему",
    "всех",
    "всею",
    "всю",
    "всюду",
    "вся",
    "всё",
    "второй",
    "вы",
    "выйти",
    "г",
    "где",
    "главный",
    "глаз",
    "говорил",
    "говорит",
    "говорить",
    "год",
    "года",
    "году",
    "голова",
    "голос",
    "город",
    "да",
    "давать",
    "давно",
    "даже",
    "далекий",
    "далеко",
    "дальше",
    "даром",
    "дать",
    "два",
    "двадцатый",
    "двадцать",
    "две",
    "двенадцатый",
    "двенадцать",
    "дверь",
    "двух",
    "девятнадцатый",
    "девятнадцать",
    "девятый",
    "девять",
    "действительно",
    "дел",
    "делал",
    "делать",
    "делаю",
    "дело",
    "день",
    "деньги",
    "десятый",
    "десять",
    "для",
    "до",
    "довольно",
    "долго",
    "должен",
    "должно",
    "должный",
    "дом",
    "дорога",
    "друг",
    "другая",
    "другие",
    "других",
    "друго",
    "другое",
    "другой",
    "думать",
    "душа",
    "е",
    "его",
    "ее",
    "ей",
    "ему",
    "если",
    "есть",
    "еще",
    "ещё",
    "ею",
    "её",
    "ж",
    "ждать",
    "же",
    "жена",
    "женщина",
    "жизнь",
    "жить",
    "за",
    "занят",
    "занята",
    "занято",
    "заняты",
    "затем",
    "зато",
    "зачем",
    "здесь",
    "земля",
    "знать",
    "значит",
    "значить",
    "и",
    "иди",
    "идти",
    "из",
    "или",
    "им",
    "имеет",
    "имел",
    "именно",
    "иметь",
    "ими",
    "имя",
    "иногда",
    "их",
    "к",
    "каждая",
    "каждое",
    "каждые",
    "каждый",
    "кажется",
    "казаться",
    "как",
    "какая",
    "какой",
    "кем",
    "книга",
    "когда",
    "кого",
    "ком",
    "комната",
    "кому",
    "конец",
    "конечно",
    "которая",
    "которого",
    "которой",
    "которые",
    "который",
    "которых",
    "кроме",
    "кругом",
    "кто",
    "куда",
    "лежать",
    "лет",
    "ли",
    "лицо",
    "лишь",
    "лучше",
    "любить",
    "люди",
    "м",
    "маленький",
    "мало",
    "мать",
    "машина",
    "между",
    "меля",
    "менее",
    "меньше",
    "меня",
    "место",
    "миллионов",
    "мимо",
    "минута",
    "мир",
    "мира",
    "мне",
    "много",
    "многочисленная",
    "многочисленное",
    "многочисленные",
    "многочисленный",
    "мной",
    "мною",
    "мог",
    "могу",
    "могут",
    "мож",
    "может",
    "может быть",
    "можно",
    "можхо",
    "мои",
    "мой",
    "мор",
    "москва",
    "мочь",
    "моя",
    "моё",
    "мы",
    "на",
    "наверху",
    "над",
    "надо",
    "назад",
    "наиболее",
    "найти",
    "наконец",
    "нам",
    "нами",
    "народ",
    "нас",
    "начала",
    "начать",
    "наш",
    "наша",
    "наше",
    "наши",
    "не",
    "него",
    "недавно",
    "недалеко",
    "нее",
    "ней",
    "некоторый",
    "нельзя",
    "нем",
    "немного",
    "нему",
    "непрерывно",
    "нередко",
    "несколько",
    "нет",
    "нею",
    "неё",
    "ни",
    "нибудь",
    "ниже",
    "низко",
    "никакой",
    "никогда",
    "никто",
    "никуда",
    "ним",
    "ними",
    "них",
    "ничего",
    "ничто",
    "но",
    "новый",
    "нога",
    "ночь",
    "ну",
    "нужно",
    "нужный",
    "нх",
    "о",
    "об",
    "оба",
    "обычно",
    "один",
    "одиннадцатый",
    "одиннадцать",
    "однажды",
    "однако",
    "одного",
    "одной",
    "оказаться",
    "окно",
    "около",
    "он",
    "она",
    "они",
    "оно",
    "опять",
    "особенно",
    "остаться",
    "от",
    "ответить",
    "отец",
    "откуда",
    "отовсюду",
    "отсюда",
    "очень",
    "первый",
    "перед",
    "писать",
    "плечо",
    "по",
    "под",
    "подойди",
    "подумать",
    "пожалуйста",
    "позже",
    "пойти",
    "пока",
    "пол",
    "получить",
    "помнить",
    "понимать",
    "понять",
    "пор",
    "пора",
    "после",
    "последний",
    "посмотреть",
    "посреди",
    "потом",
    "потому",
    "почему",
    "почти",
    "правда",
    "прекрасно",
    "при",
    "про",
    "просто",
    "против",
    "процентов",
    "путь",
    "пятнадцатый",
    "пятнадцать",
    "пятый",
    "пять",
    "работа",
    "работать",
    "раз",
    "разве",
    "рано",
    "раньше",
    "ребенок",
    "решить",
    "россия",
    "рука",
    "русский",
    "ряд",
    "рядом",
    "с",
    "с кем",
    "сам",
    "сама",
    "сами",
    "самим",
    "самими",
    "самих",
    "само",
    "самого",
    "самой",
    "самом",
    "самому",
    "саму",
    "самый",
    "свет",
    "свое",
    "своего",
    "своей",
    "свои",
    "своих",
    "свой",
    "свою",
    "сделать",
    "сеаой",
    "себе",
    "себя",
    "сегодня",
    "седьмой",
    "сейчас",
    "семнадцатый",
    "семнадцать",
    "семь",
    "сидеть",
    "сила",
    "сих",
    "сказал",
    "сказала",
    "сказать",
    "сколько",
    "слишком",
    "слово",
    "случай",
    "смотреть",
    "сначала",
    "снова",
    "со",
    "собой",
    "собою",
    "советский",
    "совсем",
    "спасибо",
    "спросить",
    "сразу",
    "стал",
    "старый",
    "стать",
    "стол",
    "сторона",
    "стоять",
    "страна",
    "суть",
    "считать",
    "т",
    "та",
    "так",
    "такая",
    "также",
    "таки",
    "такие",
    "такое",
    "такой",
    "там",
    "твои",
    "твой",
    "твоя",
    "твоё",
    "те",
    "тебе",
    "тебя",
    "тем",
    "теми",
    "теперь",
    "тех",
    "то",
    "тобой",
    "тобою",
    "товарищ",
    "тогда",
    "того",
    "тоже",
    "только",
    "том",
    "тому",
    "тот",
    "тою",
    "третий",
    "три",
    "тринадцатый",
    "тринадцать",
    "ту",
    "туда",
    "тут",
    "ты",
    "тысяч",
    "у",
    "увидеть",
    "уж",
    "уже",
    "улица",
    "уметь",
    "утро",
    "хороший",
    "хорошо",
    "хотел бы",
    "хотеть",
    "хоть",
    "хотя",
    "хочешь",
    "час",
    "часто",
    "часть",
    "чаще",
    "чего",
    "человек",
    "чем",
    "чему",
    "через",
    "четвертый",
    "четыре",
    "четырнадцатый",
    "четырнадцать",
    "что",
    "чтоб",
    "чтобы",
    "чуть",
    "шестнадцатый",
    "шестнадцать",
    "шестой",
    "шесть",
    "эта",
    "эти",
    "этим",
    "этими",
    "этих",
    "это",
    "этого",
    "этой",
    "этом",
    "этому",
    "этот",
    "эту",
    "я",
    "являюсь"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_sk.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_sk.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "aby",
    "aj",
    "ak",
    "akej",
    "akejže",
    "ako",
    "akom",
    "akomže",
    "akou",
    "akouže",
    "akože",
    "aká",
    "akáže",
    "aké",
    "akého",
    "akéhože",
    "akému",
    "akémuže",
    "akéže",
    "akú",
    "akúže",
    "aký",
    "akých",
    "akýchže",
    "akým",
    "akými",
    "akýmiže",
    "akýmže",
    "akýže",
    "ale",
    "alebo",
    "ani",
    "asi",
    "avšak",
    "až",
    "ba",
    "bez",
    "bezo",
    "bol",
    "bola",
    "boli",
    "bolo",
    "bude",
    "budem",
    "budeme",
    "budete",
    "budeš",
    "budú",
    "buď",
    "by",
    "byť",
    "cez",
    "cezo",
    "dnes",
    "do",
    "ešte",
    "ho",
    "hoci",
    "i",
    "iba",
    "ich",
    "im",
    "inej",
    "inom",
    "iná",
    "iné",
    "iného",
    "inému",
    "iní",
    "inú",
    "iný",
    "iných",
    "iným",
    "inými",
    "ja",
    "je",
    "jeho",
    "jej",
    "jemu",
    "ju",
    "k",
    "kam",
    "kamže",
    "každou",
    "každá",
    "každé",
    "každého",
    "každému",
    "každí",
    "každú",
    "každý",
    "každých",
    "každým",
    "každými",
    "kde",
    "kej",
    "kejže",
    "keď",
    "keďže",
    "kie",
    "kieho",
    "kiehože",
    "kiemu",
    "kiemuže",
    "kieže",
    "koho",
    "kom",
    "komu",
    "kou",
    "kouže",
    "kto",
    "ktorej",
    "ktorou",
    "ktorá",
    "ktoré",
    "ktorí",
    "ktorú",
    "ktorý",
    "ktorých",
    "ktorým",
    "ktorými",
    "ku",
    "ká",
    "káže",
    "ké",
    "kéže",
    "kú",
    "kúže",
    "ký",
    "kýho",
    "kýhože",
    "kým",
    "kýmu",
    "kýmuže",
    "kýže",
    "lebo",
    "leda",
    "ledaže",
    "len",
    "ma",
    "majú",
    "mal",
    "mala",
    "mali",
    "mať",
    "medzi",
    "mi",
    "mne",
    "mnou",
    "moja",
    "moje",
    "mojej",
    "mojich",
    "mojim",
    "mojimi",
    "mojou",
    "moju",
    "možno",
    "mu",
    "musia",
    "musieť",
    "musí",
    "musím",
    "musíme",
    "musíte",
    "musíš",
    "my",
    "má",
    "mám",
    "máme",
    "máte",
    "máš",
    "môcť",
    "môj",
    "môjho",
    "môže",
    "môžem",
    "môžeme",
    "môžete",
    "môžeš",
    "môžu",
    "mňa",
    "na",
    "nad",
    "nado",
    "najmä",
    "nami",
    "naša",
    "naše",
    "našej",
    "naši",
    "našich",
    "našim",
    "našimi",
    "našou",
    "ne",
    "nech",
    "neho",
    "nej",
    "nejakej",
    "nejakom",
    "nejakou",
    "nejaká",
    "nejaké",
    "nejakého",
    "nejakému",
    "nejakú",
    "nejaký",
    "nejakých",
    "nejakým",
    "nejakými",
    "nemu",
    "než",
    "nich",
    "nie",
    "niektorej",
    "niektorom",
    "niektorou",
    "niektorá",
    "niektoré",
    "niektorého",
    "niektorému",
    "niektorú",
    "niektorý",
    "niektorých",
    "niektorým",
    "niektorými",
    "nielen",
    "niečo",
    "nim",
    "nimi",
    "nič",
    "ničoho",
    "ničom",
    "ničomu",
    "ničím",
    "no",
    "nám",
    "nás",
    "náš",
    "nášho",
    "ním",
    "o",
    "od",
    "odo",
    "on",
    "ona",
    "oni",
    "ono",
    "ony",
    "oň",
    "oňho",
    "po",
    "pod",
    "podo",
    "podľa",
    "pokiaľ",
    "popod",
    "popri",
    "potom",
    "poza",
    "pre",
    "pred",
    "predo",
    "preto",
    "pretože",
    "prečo",
    "pri",
    "práve",
    "s",
    "sa",
    "seba",
    "sebe",
    "sebou",
    "sem",
    "si",
    "sme",
    "so",
    "som",
    "ste",
    "svoj",
    "svoja",
    "svoje",
    "svojho",
    "svojich",
    "svojim",
    "svojimi",
    "svojou",
    "svoju",
    "svojím",
    "sú",
    "ta",
    "tak",
    "takej",
    "takejto",
    "taká",
    "takáto",
    "také",
    "takého",
    "takéhoto",
    "takému",
    "takémuto",
    "takéto",
    "takí",
    "takú",
    "takúto",
    "taký",
    "takýto",
    "takže",
    "tam",
    "teba",
    "tebe",
    "tebou",
    "teda",
    "tej",
    "tejto",
    "ten",
    "tento",
    "ti",
    "tie",
    "tieto",
    "tiež",
    "to",
    "toho",
    "tohoto",
    "tohto",
    "tom",
    "tomto",
    "tomu",
    "tomuto",
    "toto",
    "tou",
    "touto",
    "tu",
    "tvoj",
    "tvoja",
    "tvoje",
    "tvojej",
    "tvojho",
    "tvoji",
    "tvojich",
    "tvojim",
    "tvojimi",
    "tvojím",
    "ty",
    "tá",
    "táto",
    "tí",
    "títo",
    "tú",
    "túto",
    "tých",
    "tým",
    "tými",
    "týmto",
    "u",
    "už",
    "v",
    "vami",
    "vaša",
    "vaše",
    "vašej",
    "vaši",
    "vašich",
    "vašim",
    "vaším",
    "veď",
    "viac",
    "vo",
    "vy",
    "vám",
    "vás",
    "váš",
    "vášho",
    "však",
    "všetci",
    "všetka",
    "všetko",
    "všetky",
    "všetok",
    "z",
    "za",
    "začo",
    "začože",
    "zo",
    "áno",
    "čej",
    "či",
    "čia",
    "čie",
    "čieho",
    "čiemu",
    "čiu",
    "čo",
    "čoho",
    "čom",
    "čomu",
    "čou",
    "čože",
    "čí",
    "čím",
    "čími",
    "ďalšia",
    "ďalšie",
    "ďalšieho",
    "ďalšiemu",
    "ďalšiu",
    "ďalšom",
    "ďalšou",
    "ďalší",
    "ďalších",
    "ďalším",
    "ďalšími",
    "ňom",
    "ňou",
    "ňu",
    "že"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_sl.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_sl.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "ali",
    "april",
    "avgust",
    "b",
    "bi",
    "bil",
    "bila",
    "bile",
    "bili",
    "bilo",
    "biti",
    "blizu",
    "bo",
    "bodo",
    "bojo",
    "bolj",
    "bom",
    "bomo",
    "boste",
    "bova",
    "boš",
    "brez",
    "c",
    "cel",
    "cela",
    "celi",
    "celo",
    "d",
    "da",
    "daleč",
    "dan",
    "danes",
    "datum",
    "december",
    "deset",
    "deseta",
    "deseti",
    "deseto",
    "devet",
    "deveta",
    "deveti",
    "deveto",
    "do",
    "dober",
    "dobra",
    "dobri",
    "dobro",
    "dokler",
    "dol",
    "dolg",
    "dolga",
    "dolgi",
    "dovolj",
    "drug",
    "druga",
    "drugi",
    "drugo",
    "dva",
    "dve",
    "e",
    "eden",
    "en",
    "ena",
    "ene",
    "eni",
    "enkrat",
    "eno",
    "etc.",
    "f",
    "februar",
    "g",
    "g.",
    "ga",
    "ga.",
    "gor",
    "gospa",
    "gospod",
    "h",
    "halo",
    "i",
    "idr.",
    "ii",
    "iii",
    "in",
    "iv",
    "ix",
    "iz",
    "j",
    "januar",
    "jaz",
    "je",
    "ji",
    "jih",
    "jim",
    "jo",
    "julij",
    "junij",
    "jutri",
    "k",
    "kadarkoli",
    "kaj",
    "kajti",
    "kako",
    "kakor",
    "kamor",
    "kamorkoli",
    "kar",
    "karkoli",
    "katerikoli",
    "kdaj",
    "kdo",
    "kdorkoli",
    "ker",
    "ki",
    "kje",
    "kjer",
    "kjerkoli",
    "ko",
    "koder",
    "koderkoli",
    "koga",
    "komu",
    "kot",
    "kratek",
    "kratka",
    "kratke",
    "kratki",
    "l",
    "lahka",
    "lahke",
    "lahki",
    "lahko",
    "le",
    "lep",
    "lepa",
    "lepe",
    "lepi",
    "lepo",
    "leto",
    "m",
    "maj",
    "majhen",
    "majhna",
    "majhni",
    "malce",
    "malo",
    "manj",
    "marec",
    "me",
    "med",
    "medtem",
    "mene",
    "mesec",
    "mi",
    "midva",
    "midve",
    "mnogo",
    "moj",
    "moja",
    "moje",
    "mora",
    "morajo",
    "moram",
    "moramo",
    "morate",
    "moraš",
    "morem",
    "mu",
    "n",
    "na",
    "nad",
    "naj",
    "najina",
    "najino",
    "najmanj",
    "naju",
    "največ",
    "nam",
    "narobe",
    "nas",
    "nato",
    "nazaj",
    "naš",
    "naša",
    "naše",
    "ne",
    "nedavno",
    "nedelja",
    "nek",
    "neka",
    "nekaj",
    "nekatere",
    "nekateri",
    "nekatero",
    "nekdo",
    "neke",
    "nekega",
    "neki",
    "nekje",
    "neko",
    "nekoga",
    "nekoč",
    "ni",
    "nikamor",
    "nikdar",
    "nikjer",
    "nikoli",
    "nič",
    "nje",
    "njega",
    "njegov",
    "njegova",
    "njegovo",
    "njej",
    "njemu",
    "njen",
    "njena",
    "njeno",
    "nji",
    "njih",
    "njihov",
    "njihova",
    "njihovo",
    "njiju",
    "njim",
    "njo",
    "njun",
    "njuna",
    "njuno",
    "no",
    "nocoj",
    "november",
    "npr.",
    "o",
    "ob",
    "oba",
    "obe",
    "oboje",
    "od",
    "odprt",
    "odprta",
    "odprti",
    "okoli",
    "oktober",
    "on",
    "onadva",
    "one",
    "oni",
    "onidve",
    "osem",
    "osma",
    "osmi",
    "osmo",
    "oz.",
    "p",
    "pa",
    "pet",
    "peta",
    "petek",
    "peti",
    "peto",
    "po",
    "pod",
    "pogosto",
    "poleg",
    "poln",
    "polna",
    "polni",
    "polno",
    "ponavadi",
    "ponedeljek",
    "ponovno",
    "potem",
    "povsod",
    "pozdravljen",
    "pozdravljeni",
    "prav",
    "prava",
    "prave",
    "pravi",
    "pravo",
    "prazen",
    "prazna",
    "prazno",
    "prbl.",
    "precej",
    "pred",
    "prej",
    "preko",
    "pri",
    "pribl.",
    "približno",
    "primer",
    "pripravljen",
    "pripravljena",
    "pripravljeni",
    "proti",
    "prva",
    "prvi",
    "prvo",
    "r",
    "ravno",
    "redko",
    "res",
    "reč",
    "s",
    "saj",
    "sam",
    "sama",
    "same",
    "sami",
    "samo",
    "se",
    "sebe",
    "sebi",
    "sedaj",
    "sedem",
    "sedma",
    "sedmi",
    "sedmo",
    "sem",
    "september",
    "seveda",
    "si",
    "sicer",
    "skoraj",
    "skozi",
    "slab",
    "smo",
    "so",
    "sobota",
    "spet",
    "sreda",
    "srednja",
    "srednji",
    "sta",
    "ste",
    "stran",
    "stvar",
    "sva",
    "t",
    "ta",
    "tak",
    "taka",
    "take",
    "taki",
    "tako",
    "takoj",
    "tam",
    "te",
    "tebe",
    "tebi",
    "tega",
    "težak",
    "težka",
    "težki",
    "težko",
    "ti",
    "tista",
    "tiste",
    "tisti",
    "tisto",
    "tj.",
    "tja",
    "to",
    "toda",
    "torek",
    "tretja",
    "tretje",
    "tretji",
    "tri",
    "tu",
    "tudi",
    "tukaj",
    "tvoj",
    "tvoja",
    "tvoje",
    "u",
    "v",
    "vaju",
    "vam",
    "vas",
    "vaš",
    "vaša",
    "vaše",
    "ve",
    "vedno",
    "velik",
    "velika",
    "veliki",
    "veliko",
    "vendar",
    "ves",
    "več",
    "vi",
    "vidva",
    "vii",
    "viii",
    "visok",
    "visoka",
    "visoke",
    "visoki",
    "vsa",
    "vsaj",
    "vsak",
    "vsaka",
    "vsakdo",
    "vsake",
    "vsaki",
    "vsakomur",
    "vse",
    "vsega",
    "vsi",
    "vso",
    "včasih",
    "včeraj",
    "x",
    "z",
    "za",
    "zadaj",
    "zadnji",
    "zakaj",
    "zaprta",
    "zaprti",
    "zaprto",
    "zdaj",
    "zelo",
    "zunaj",
    "č",
    "če",
    "često",
    "četrta",
    "četrtek",
    "četrti",
    "četrto",
    "čez",
    "čigav",
    "š",
    "šest",
    "šesta",
    "šesti",
    "šesto",
    "štiri",
    "ž",
    "že"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_so.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_so.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "aad",
    "albaabkii",
    "atabo",
    "ay",
    "ayaa",
    "ayee",
    "ayuu",
    "dhan",
    "hadana",
    "in",
    "inuu",
    "isku",
    "jiray",
    "jirtay",
    "ka",
    "kale",
    "kasoo",
    "ku",
    "kuu",
    "lakin",
    "markii",
    "oo",
    "si",
    "soo",
    "uga",
    "ugu",
    "uu",
    "waa",
    "waxa",
    "waxuu"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_st.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_st.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "ba",
    "bane",
    "bona",
    "e",
    "ea",
    "eaba",
    "empa",
    "ena",
    "ha",
    "hae",
    "hape",
    "ho",
    "hore",
    "ka",
    "ke",
    "la",
    "le",
    "li",
    "me",
    "mo",
    "moo",
    "ne",
    "o",
    "oa",
    "re",
    "sa",
    "se",
    "tloha",
    "tsa",
    "tse"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_sv.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_sv.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "aderton",
    "adertonde",
    "adjö",
    "aldrig",
    "alla",
    "allas",
    "allt",
    "alltid",
    "alltså",
    "andra",
    "andras",
    "annan",
    "annat",
    "artonde",
    "artonn",
    "att",
    "av",
    "bakom",
    "bara",
    "behöva",
    "behövas",
    "behövde",
    "behövt",
    "beslut",
    "beslutat",
    "beslutit",
    "bland",
    "blev",
    "bli",
    "blir",
    "blivit",
    "bort",
    "borta",
    "bra",
    "bäst",
    "bättre",
    "båda",
    "bådas",
    "dag",
    "dagar",
    "dagarna",
    "dagen",
    "de",
    "del",
    "delen",
    "dem",
    "den",
    "denna",
    "deras",
    "dess",
    "dessa",
    "det",
    "detta",
    "dig",
    "din",
    "dina",
    "dit",
    "ditt",
    "dock",
    "dom",
    "du",
    "där",
    "därför",
    "då",
    "e",
    "efter",
    "eftersom",
    "ej",
    "elfte",
    "eller",
    "elva",
    "emot",
    "en",
    "enkel",
    "enkelt",
    "enkla",
    "enligt",
    "ens",
    "er",
    "era",
    "ers",
    "ert",
    "ett",
    "ettusen",
    "fanns",
    "fem",
    "femte",
    "femtio",
    "femtionde",
    "femton",
    "femtonde",
    "fick",
    "fin",
    "finnas",
    "finns",
    "fjorton",
    "fjortonde",
    "fjärde",
    "fler",
    "flera",
    "flesta",
    "fram",
    "framför",
    "från",
    "fyra",
    "fyrtio",
    "fyrtionde",
    "få",
    "får",
    "fått",
    "följande",
    "för",
    "före",
    "förlåt",
    "förra",
    "första",
    "genast",
    "genom",
    "gick",
    "gjorde",
    "gjort",
    "god",
    "goda",
    "godare",
    "godast",
    "gott",
    "gälla",
    "gäller",
    "gällt",
    "gärna",
    "gå",
    "går",
    "gått",
    "gör",
    "göra",
    "ha",
    "hade",
    "haft",
    "han",
    "hans",
    "har",
    "heller",
    "hellre",
    "helst",
    "helt",
    "henne",
    "hennes",
    "hit",
    "hon",
    "honom",
    "hundra",
    "hundraen",
    "hundraett",
    "hur",
    "här",
    "hög",
    "höger",
    "högre",
    "högst",
    "i",
    "ibland",
    "icke",
    "idag",
    "igen",
    "igår",
    "imorgon",
    "in",
    "inför",
    "inga",
    "ingen",
    "ingenting",
    "inget",
    "innan",
    "inne",
    "inom",
    "inte",
    "inuti",
    "ja",
    "jag",
    "jo",
    "ju",
    "just",
    "jämfört",
    "kan",
    "kanske",
    "knappast",
    "kom",
    "komma",
    "kommer",
    "kommit",
    "kr",
    "kunde",
    "kunna",
    "kunnat",
    "kvar",
    "legat",
    "ligga",
    "ligger",
    "lika",
    "likställd",
    "likställda",
    "lilla",
    "lite",
    "liten",
    "litet",
    "länge",
    "längre",
    "längst",
    "lätt",
    "lättare",
    "lättast",
    "långsam",
    "långsammare",
    "långsammast",
    "långsamt",
    "långt",
    "låt",
    "man",
    "med",
    "mej",
    "mellan",
    "men",
    "mer",
    "mera",
    "mest",
    "mig",
    "min",
    "mina",
    "mindre",
    "minst",
    "mitt",
    "mittemot",
    "mot",
    "mycket",
    "många",
    "måste",
    "möjlig",
    "möjligen",
    "möjligt",
    "möjligtvis",
    "ned",
    "nederst",
    "nedersta",
    "nedre",
    "nej",
    "ner",
    "ni",
    "nio",
    "nionde",
    "nittio",
    "nittionde",
    "nitton",
    "nittonde",
    "nog",
    "noll",
    "nr",
    "nu",
    "nummer",
    "när",
    "nästa",
    "någon",
    "någonting",
    "något",
    "några",
    "nån",
    "nånting",
    "nåt",
    "nödvändig",
    "nödvändiga",
    "nödvändigt",
    "nödvändigtvis",
    "och",
    "också",
    "ofta",
    "oftast",
    "olika",
    "olikt",
    "om",
    "oss",
    "på",
    "rakt",
    "redan",
    "rätt",
    "sa",
    "sade",
    "sagt",
    "samma",
    "sedan",
    "senare",
    "senast",
    "sent",
    "sex",
    "sextio",
    "sextionde",
    "sexton",
    "sextonde",
    "sig",
    "sin",
    "sina",
    "sist",
    "sista",
    "siste",
    "sitt",
    "sitta",
    "sju",
    "sjunde",
    "sjuttio",
    "sjuttionde",
    "sjutton",
    "sjuttonde",
    "själv",
    "sjätte",
    "ska",
    "skall",
    "skulle",
    "slutligen",
    "små",
    "smått",
    "snart",
    "som",
    "stor",
    "stora",
    "stort",
    "större",
    "störst",
    "säga",
    "säger",
    "sämre",
    "sämst",
    "så",
    "sådan",
    "sådana",
    "sådant",
    "ta",
    "tack",
    "tar",
    "tidig",
    "tidigare",
    "tidigast",
    "tidigt",
    "till",
    "tills",
    "tillsammans",
    "tio",
    "tionde",
    "tjugo",
    "tjugoen",
    "tjugoett",
    "tjugonde",
    "tjugotre",
    "tjugotvå",
    "tjungo",
    "tolfte",
    "tolv",
    "tre",
    "tredje",
    "trettio",
    "trettionde",
    "tretton",
    "trettonde",
    "två",
    "tvåhundra",
    "under",
    "upp",
    "ur",
    "ursäkt",
    "ut",
    "utan",
    "utanför",
    "ute",
    "va",
    "vad",
    "var",
    "vara",
    "varför",
    "varifrån",
    "varit",
    "varje",
    "varken",
    "vars",
    "varsågod",
    "vart",
    "vem",
    "vems",
    "verkligen",
    "vi",
    "vid",
    "vidare",
    "viktig",
    "viktigare",
    "viktigast",
    "viktigt",
    "vilka",
    "vilkas",
    "vilken",
    "vilket",
    "vill",
    "väl",
    "vänster",
    "vänstra",
    "värre",
    "vår",
    "våra",
    "vårt",
    "än",
    "ännu",
    "är",
    "även",
    "åt",
    "åtminstone",
    "åtta",
    "åttio",
    "åttionde",
    "åttonde",
    "över",
    "övermorgon",
    "överst",
    "övre"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_sw.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_sw.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "akasema",
    "alikuwa",
    "alisema",
    "baada",
    "basi",
    "bila",
    "cha",
    "chini",
    "hadi",
    "hapo",
    "hata",
    "hivyo",
    "hiyo",
    "huku",
    "huo",
    "ili",
    "ilikuwa",
    "juu",
    "kama",
    "karibu",
    "katika",
    "kila",
    "kima",
    "kisha",
    "kubwa",
    "kutoka",
    "kuwa",
    "kwa",
    "kwamba",
    "kwenda",
    "kwenye",
    "la",
    "lakini",
    "mara",
    "mdogo",
    "mimi",
    "mkubwa",
    "mmoja",
    "moja",
    "muda",
    "mwenye",
    "na",
    "naye",
    "ndani",
    "ng",
    "ni",
    "nini",
    "nonkungu",
    "pamoja",
    "pia",
    "sana",
    "sasa",
    "sauti",
    "tafadhali",
    "tena",
    "tu",
    "vile",
    "wa",
    "wakati",
    "wake",
    "walikuwa",
    "wao",
    "watu",
    "wengine",
    "wote",
    "ya",
    "yake",
    "yangu",
    "yao",
    "yeye",
    "yule",
    "za",
    "zaidi",
    "zake"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_th.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_th.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "กล่าว",
    "กว่า",
    "กัน",
    "กับ",
    "การ",
    "ก็",
    "ก่อน",
    "ขณะ",
    "ขอ",
    "ของ",
    "ขึ้น",
    "คง",
    "ครั้ง",
    "ความ",
    "คือ",
    "จะ",
    "จัด",
    "จาก",
    "จึง",
    "ช่วง",
    "ซึ่ง",
    "ดัง",
    "ด้วย",
    "ด้าน",
    "ตั้ง",
    "ตั้งแต่",
    "ตาม",
    "ต่อ",
    "ต่าง",
    "ต่างๆ",
    "ต้อง",
    "ถึง",
    "ถูก",
    "ถ้า",
    "ทั้ง",
    "ทั้งนี้",
    "ทาง",
    "ที่",
    "ที่สุด",
    "ทุก",
    "ทํา",
    "ทําให้",
    "นอกจาก",
    "นัก",
    "นั้น",
    "นี้",
    "น่า",
    "นํา",
    "บาง",
    "ผล",
    "ผ่าน",
    "พบ",
    "พร้อม",
    "มา",
    "มาก",
    "มี",
    "ยัง",
    "รวม",
    "ระหว่าง",
    "รับ",
    "ราย",
    "ร่วม",
    "ลง",
    "วัน",
    "ว่า",
    "สุด",
    "ส่ง",
    "ส่วน",
    "สําหรับ",
    "หนึ่ง",
    "หรือ",
    "หลัง",
    "หลังจาก",
    "หลาย",
    "หาก",
    "อยาก",
    "อยู่",
    "อย่าง",
    "ออก",
    "อะไร",
    "อาจ",
    "อีก",
    "เขา",
    "เข้า",
    "เคย",
    "เฉพาะ",
    "เช่น",
    "เดียว",
    "เดียวกัน",
    "เนื่องจาก",
    "เปิด",
    "เปิดเผย",
    "เป็น",
    "เป็นการ",
    "เพราะ",
    "เพื่อ",
    "เมื่อ",
    "เรา",
    "เริ่ม",
    "เลย",
    "เห็น",
    "เอง",
    "แต่",
    "แบบ",
    "แรก",
    "และ",
    "แล้ว",
    "แห่ง",
    "โดย",
    "ใน",
    "ให้",
    "ได้",
    "ไป",
    "ไม่",
    "ไว้",
    "้ง"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_tl.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_tl.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "akin",
    "aking",
    "ako",
    "alin",
    "am",
    "amin",
    "aming",
    "ang",
    "ano",
    "anumang",
    "apat",
    "at",
    "atin",
    "ating",
    "ay",
    "bababa",
    "bago",
    "bakit",
    "bawat",
    "bilang",
    "dahil",
    "dalawa",
    "dapat",
    "din",
    "dito",
    "doon",
    "gagawin",
    "gayunman",
    "ginagawa",
    "ginawa",
    "ginawang",
    "gumawa",
    "gusto",
    "habang",
    "hanggang",
    "hindi",
    "huwag",
    "iba",
    "ibaba",
    "ibabaw",
    "ibig",
    "ikaw",
    "ilagay",
    "ilalim",
    "ilan",
    "inyong",
    "isa",
    "isang",
    "itaas",
    "ito",
    "iyo",
    "iyon",
    "iyong",
    "ka",
    "kahit",
    "kailangan",
    "kailanman",
    "kami",
    "kanila",
    "kanilang",
    "kanino",
    "kanya",
    "kanyang",
    "kapag",
    "kapwa",
    "karamihan",
    "katiyakan",
    "katulad",
    "kaya",
    "kaysa",
    "ko",
    "kong",
    "kulang",
    "kumuha",
    "kung",
    "laban",
    "lahat",
    "lamang",
    "likod",
    "lima",
    "maaari",
    "maaaring",
    "maging",
    "mahusay",
    "makita",
    "marami",
    "marapat",
    "masyado",
    "may",
    "mayroon",
    "mga",
    "minsan",
    "mismo",
    "mula",
    "muli",
    "na",
    "nabanggit",
    "naging",
    "nagkaroon",
    "nais",
    "nakita",
    "namin",
    "napaka",
    "narito",
    "nasaan",
    "ng",
    "ngayon",
    "ni",
    "nila",
    "nilang",
    "nito",
    "niya",
    "niyang",
    "noon",
    "o",
    "pa",
    "paano",
    "pababa",
    "paggawa",
    "pagitan",
    "pagkakaroon",
    "pagkatapos",
    "palabas",
    "pamamagitan",
    "panahon",
    "pangalawa",
    "para",
    "paraan",
    "pareho",
    "pataas",
    "pero",
    "pumunta",
    "pumupunta",
    "sa",
    "saan",
    "sabi",
    "sabihin",
    "sarili",
    "sila",
    "sino",
    "siya",
    "tatlo",
    "tayo",
    "tulad",
    "tungkol",
    "una",
    "walang"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_tr.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_tr.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "acaba",
    "acep",
    "adamakıllı",
    "adeta",
    "ait",
    "altmýþ",
    "altmış",
    "altý",
    "altı",
    "ama",
    "amma",
    "anca",
    "ancak",
    "arada",
    "artýk",
    "aslında",
    "aynen",
    "ayrıca",
    "az",
    "açıkça",
    "açıkçası",
    "bana",
    "bari",
    "bazen",
    "bazý",
    "bazı",
    "başkası",
    "baţka",
    "belki",
    "ben",
    "benden",
    "beni",
    "benim",
    "beri",
    "beriki",
    "beþ",
    "beş",
    "beţ",
    "bilcümle",
    "bile",
    "bin",
    "binaen",
    "binaenaleyh",
    "bir",
    "biraz",
    "birazdan",
    "birbiri",
    "birden",
    "birdenbire",
    "biri",
    "birice",
    "birileri",
    "birisi",
    "birkaç",
    "birkaçı",
    "birkez",
    "birlikte",
    "birçok",
    "birçoğu",
    "birþey",
    "birþeyi",
    "birşey",
    "birşeyi",
    "birţey",
    "bitevi",
    "biteviye",
    "bittabi",
    "biz",
    "bizatihi",
    "bizce",
    "bizcileyin",
    "bizden",
    "bize",
    "bizi",
    "bizim",
    "bizimki",
    "bizzat",
    "boşuna",
    "bu",
    "buna",
    "bunda",
    "bundan",
    "bunlar",
    "bunları",
    "bunların",
    "bunu",
    "bunun",
    "buracıkta",
    "burada",
    "buradan",
    "burası",
    "böyle",
    "böylece",
    "böylecene",
    "böylelikle",
    "böylemesine",
    "böylesine",
    "büsbütün",
    "bütün",
    "cuk",
    "cümlesi",
    "da",
    "daha",
    "dahi",
    "dahil",
    "dahilen",
    "daima",
    "dair",
    "dayanarak",
    "de",
    "defa",
    "dek",
    "demin",
    "demincek",
    "deminden",
    "denli",
    "derakap",
    "derhal",
    "derken",
    "deđil",
    "değil",
    "değin",
    "diye",
    "diđer",
    "diğer",
    "diğeri",
    "doksan",
    "dokuz",
    "dolayı",
    "dolayısıyla",
    "doğru",
    "dört",
    "edecek",
    "eden",
    "ederek",
    "edilecek",
    "ediliyor",
    "edilmesi",
    "ediyor",
    "elbet",
    "elbette",
    "elli",
    "emme",
    "en",
    "enikonu",
    "epey",
    "epeyce",
    "epeyi",
    "esasen",
    "esnasında",
    "etmesi",
    "etraflı",
    "etraflıca",
    "etti",
    "ettiği",
    "ettiğini",
    "evleviyetle",
    "evvel",
    "evvela",
    "evvelce",
    "evvelden",
    "evvelemirde",
    "evveli",
    "eđer",
    "eğer",
    "fakat",
    "filanca",
    "gah",
    "gayet",
    "gayetle",
    "gayri",
    "gayrı",
    "gelgelelim",
    "gene",
    "gerek",
    "gerçi",
    "geçende",
    "geçenlerde",
    "gibi",
    "gibilerden",
    "gibisinden",
    "gine",
    "göre",
    "gırla",
    "hakeza",
    "halbuki",
    "halen",
    "halihazırda",
    "haliyle",
    "handiyse",
    "hangi",
    "hangisi",
    "hani",
    "hariç",
    "hasebiyle",
    "hasılı",
    "hatta",
    "hele",
    "hem",
    "henüz",
    "hep",
    "hepsi",
    "her",
    "herhangi",
    "herkes",
    "herkesin",
    "hiç",
    "hiçbir",
    "hiçbiri",
    "hoş",
    "hulasaten",
    "iken",
    "iki",
    "ila",
    "ile",
    "ilen",
    "ilgili",
    "ilk",
    "illa",
    "illaki",
    "imdi",
    "indinde",
    "inen",
    "insermi",
    "ise",
    "ister",
    "itibaren",
    "itibariyle",
    "itibarıyla",
    "iyi",
    "iyice",
    "iyicene",
    "için",
    "iş",
    "işte",
    "iţte",
    "kadar",
    "kaffesi",
    "kah",
    "kala",
    "kanýmca",
    "karşın",
    "katrilyon",
    "kaynak",
    "kaçı",
    "kelli",
    "kendi",
    "kendilerine",
    "kendini",
    "kendisi",
    "kendisine",
    "kendisini",
    "kere",
    "kez",
    "keza",
    "kezalik",
    "keşke",
    "keţke",
    "ki",
    "kim",
    "kimden",
    "kime",
    "kimi",
    "kimisi",
    "kimse",
    "kimsecik",
    "kimsecikler",
    "külliyen",
    "kýrk",
    "kýsaca",
    "kırk",
    "kısaca",
    "lakin",
    "leh",
    "lütfen",
    "maada",
    "madem",
    "mademki",
    "mamafih",
    "mebni",
    "međer",
    "meğer",
    "meğerki",
    "meğerse",
    "milyar",
    "milyon",
    "mu",
    "mü",
    "mý",
    "mı",
    "nasýl",
    "nasıl",
    "nasılsa",
    "nazaran",
    "naşi",
    "ne",
    "neden",
    "nedeniyle",
    "nedenle",
    "nedense",
    "nerde",
    "nerden",
    "nerdeyse",
    "nere",
    "nerede",
    "nereden",
    "neredeyse",
    "neresi",
    "nereye",
    "netekim",
    "neye",
    "neyi",
    "neyse",
    "nice",
    "nihayet",
    "nihayetinde",
    "nitekim",
    "niye",
    "niçin",
    "o",
    "olan",
    "olarak",
    "oldu",
    "olduklarını",
    "oldukça",
    "olduğu",
    "olduğunu",
    "olmadı",
    "olmadığı",
    "olmak",
    "olması",
    "olmayan",
    "olmaz",
    "olsa",
    "olsun",
    "olup",
    "olur",
    "olursa",
    "oluyor",
    "on",
    "ona",
    "onca",
    "onculayın",
    "onda",
    "ondan",
    "onlar",
    "onlardan",
    "onlari",
    "onlarýn",
    "onları",
    "onların",
    "onu",
    "onun",
    "oracık",
    "oracıkta",
    "orada",
    "oradan",
    "oranca",
    "oranla",
    "oraya",
    "otuz",
    "oysa",
    "oysaki",
    "pek",
    "pekala",
    "peki",
    "pekçe",
    "peyderpey",
    "rağmen",
    "sadece",
    "sahi",
    "sahiden",
    "sana",
    "sanki",
    "sekiz",
    "seksen",
    "sen",
    "senden",
    "seni",
    "senin",
    "siz",
    "sizden",
    "sizi",
    "sizin",
    "sonra",
    "sonradan",
    "sonraları",
    "sonunda",
    "tabii",
    "tam",
    "tamam",
    "tamamen",
    "tamamıyla",
    "tarafından",
    "tek",
    "trilyon",
    "tüm",
    "var",
    "vardı",
    "vasıtasıyla",
    "ve",
    "velev",
    "velhasıl",
    "velhasılıkelam",
    "veya",
    "veyahut",
    "ya",
    "yahut",
    "yakinen",
    "yakında",
    "yakından",
    "yakınlarda",
    "yalnız",
    "yalnızca",
    "yani",
    "yapacak",
    "yapmak",
    "yaptı",
    "yaptıkları",
    "yaptığı",
    "yaptığını",
    "yapılan",
    "yapılması",
    "yapıyor",
    "yedi",
    "yeniden",
    "yenilerde",
    "yerine",
    "yetmiþ",
    "yetmiş",
    "yetmiţ",
    "yine",
    "yirmi",
    "yok",
    "yoksa",
    "yoluyla",
    "yüz",
    "yüzünden",
    "zarfında",
    "zaten",
    "zati",
    "zira",
    "çabuk",
    "çabukça",
    "çeşitli",
    "çok",
    "çokları",
    "çoklarınca",
    "çokluk",
    "çoklukla",
    "çokça",
    "çoğu",
    "çoğun",
    "çoğunca",
    "çoğunlukla",
    "çünkü",
    "öbür",
    "öbürkü",
    "öbürü",
    "önce",
    "önceden",
    "önceleri",
    "öncelikle",
    "öteki",
    "ötekisi",
    "öyle",
    "öylece",
    "öylelikle",
    "öylemesine",
    "öz",
    "üzere",
    "üç",
    "þey",
    "þeyden",
    "þeyi",
    "þeyler",
    "þu",
    "þuna",
    "þunda",
    "þundan",
    "þunu",
    "şayet",
    "şey",
    "şeyden",
    "şeyi",
    "şeyler",
    "şu",
    "şuna",
    "şuncacık",
    "şunda",
    "şundan",
    "şunlar",
    "şunları",
    "şunu",
    "şunun",
    "şura",
    "şuracık",
    "şuracıkta",
    "şurası",
    "şöyle",
    "ţayet",
    "ţimdi",
    "ţu",
    "ţöyle"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_uk.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_uk.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "авжеж",
    "адже",
    "але",
    "б",
    "без",
    "був",
    "була",
    "були",
    "було",
    "бути",
    "більш",
    "вам",
    "вас",
    "весь",
    "вздовж",
    "ви",
    "вниз",
    "внизу",
    "вона",
    "вони",
    "воно",
    "все",
    "всередині",
    "всіх",
    "від",
    "він",
    "да",
    "давай",
    "давати",
    "де",
    "дещо",
    "для",
    "до",
    "з",
    "завжди",
    "замість",
    "й",
    "коли",
    "ледве",
    "майже",
    "ми",
    "навколо",
    "навіть",
    "нам",
    "от",
    "отже",
    "отож",
    "поза",
    "про",
    "під",
    "та",
    "так",
    "такий",
    "також",
    "те",
    "ти",
    "тобто",
    "тож",
    "тощо",
    "хоча",
    "це",
    "цей",
    "чи",
    "чого",
    "що",
    "як",
    "який",
    "якої",
    "є",
    "із",
    "інших",
    "їх",
    "її"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_ur.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_ur.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "آئی",
    "آئے",
    "آج",
    "آخر",
    "آخرکبر",
    "آدهی",
    "آًب",
    "آٹھ",
    "آیب",
    "اة",
    "اخبزت",
    "اختتبم",
    "ادھر",
    "ارد",
    "اردگرد",
    "ارکبى",
    "اش",
    "اضتعوبل",
    "اضتعوبلات",
    "اضطرذ",
    "اضکب",
    "اضکی",
    "اضکے",
    "اطراف",
    "اغیب",
    "افراد",
    "الگ",
    "اور",
    "اوًچب",
    "اوًچبئی",
    "اوًچی",
    "اوًچے",
    "اى",
    "اً",
    "اًذر",
    "اًہیں",
    "اٹھبًب",
    "اپٌب",
    "اپٌے",
    "اچھب",
    "اچھی",
    "اچھے",
    "اکثر",
    "اکٹھب",
    "اکٹھی",
    "اکٹھے",
    "اکیلا",
    "اکیلی",
    "اکیلے",
    "اگرچہ",
    "اہن",
    "ایطے",
    "ایک",
    "ب",
    "ت",
    "تبزٍ",
    "تت",
    "تر",
    "ترتیت",
    "تریي",
    "تعذاد",
    "تن",
    "تو",
    "توبم",
    "توہی",
    "توہیں",
    "تٌہب",
    "تک",
    "تھب",
    "تھوڑا",
    "تھوڑی",
    "تھوڑے",
    "تھی",
    "تھے",
    "تیي",
    "ثب",
    "ثبئیں",
    "ثبترتیت",
    "ثبری",
    "ثبرے",
    "ثبعث",
    "ثبلا",
    "ثبلترتیت",
    "ثبہر",
    "ثدبئے",
    "ثرآں",
    "ثراں",
    "ثرش",
    "ثعذ",
    "ثغیر",
    "ثلٌذ",
    "ثلٌذوثبلا",
    "ثلکہ",
    "ثي",
    "ثٌب",
    "ثٌبرہب",
    "ثٌبرہی",
    "ثٌبرہے",
    "ثٌبًب",
    "ثٌذ",
    "ثٌذکرو",
    "ثٌذکرًب",
    "ثٌذی",
    "ثڑا",
    "ثڑوں",
    "ثڑی",
    "ثڑے",
    "ثھر",
    "ثھرا",
    "ثھراہوا",
    "ثھرپور",
    "ثھی",
    "ثہت",
    "ثہتر",
    "ثہتری",
    "ثہتریي",
    "ثیچ",
    "ج",
    "خب",
    "خبرہب",
    "خبرہی",
    "خبرہے",
    "خبهوظ",
    "خبًب",
    "خبًتب",
    "خبًتی",
    "خبًتے",
    "خبًٌب",
    "خت",
    "ختن",
    "خجکہ",
    "خص",
    "خططرذ",
    "خلذی",
    "خو",
    "خواى",
    "خوًہی",
    "خوکہ",
    "خٌبة",
    "خگہ",
    "خگہوں",
    "خگہیں",
    "خیطب",
    "خیطبکہ",
    "در",
    "درخبت",
    "درخہ",
    "درخے",
    "درزقیقت",
    "درضت",
    "دش",
    "دفعہ",
    "دلچطپ",
    "دلچطپی",
    "دلچطپیبں",
    "دو",
    "دور",
    "دوراى",
    "دوضرا",
    "دوضروں",
    "دوضری",
    "دوضرے",
    "دوًوں",
    "دکھبئیں",
    "دکھبتب",
    "دکھبتی",
    "دکھبتے",
    "دکھبو",
    "دکھبًب",
    "دکھبیب",
    "دی",
    "دیب",
    "دیتب",
    "دیتی",
    "دیتے",
    "دیر",
    "دیٌب",
    "دیکھو",
    "دیکھٌب",
    "دیکھی",
    "دیکھیں",
    "دے",
    "ر",
    "راضتوں",
    "راضتہ",
    "راضتے",
    "رریعہ",
    "رریعے",
    "رکي",
    "رکھ",
    "رکھب",
    "رکھتب",
    "رکھتبہوں",
    "رکھتی",
    "رکھتے",
    "رکھی",
    "رکھے",
    "رہب",
    "رہی",
    "رہے",
    "ز",
    "زبصل",
    "زبضر",
    "زبل",
    "زبلات",
    "زبلیہ",
    "زصوں",
    "زصہ",
    "زصے",
    "زقبئق",
    "زقیتیں",
    "زقیقت",
    "زکن",
    "زکویہ",
    "زیبدٍ",
    "صبف",
    "صسیر",
    "صفر",
    "صورت",
    "صورتسبل",
    "صورتوں",
    "صورتیں",
    "ض",
    "ضبت",
    "ضبتھ",
    "ضبدٍ",
    "ضبرا",
    "ضبرے",
    "ضبل",
    "ضبلوں",
    "ضت",
    "ضرور",
    "ضرورت",
    "ضروری",
    "ضلطلہ",
    "ضوچ",
    "ضوچب",
    "ضوچتب",
    "ضوچتی",
    "ضوچتے",
    "ضوچو",
    "ضوچٌب",
    "ضوچی",
    "ضوچیں",
    "ضکب",
    "ضکتب",
    "ضکتی",
    "ضکتے",
    "ضکٌب",
    "ضکی",
    "ضکے",
    "ضیذھب",
    "ضیذھی",
    "ضیذھے",
    "ضیکٌڈ",
    "ضے",
    "طرف",
    "طریق",
    "طریقوں",
    "طریقہ",
    "طریقے",
    "طور",
    "طورپر",
    "ظبہر",
    "ع",
    "عذد",
    "عظین",
    "علاقوں",
    "علاقہ",
    "علاقے",
    "علاوٍ",
    "عووهی",
    "غبیذ",
    "غخص",
    "غذ",
    "غروع",
    "غروعبت",
    "غے",
    "فرد",
    "فی",
    "ق",
    "قجل",
    "قجیلہ",
    "قطن",
    "لئے",
    "لا",
    "لازهی",
    "لو",
    "لوجب",
    "لوجی",
    "لوجے",
    "لوسبت",
    "لوسہ",
    "لوگ",
    "لوگوں",
    "لڑکپي",
    "لگتب",
    "لگتی",
    "لگتے",
    "لگٌب",
    "لگی",
    "لگیں",
    "لگے",
    "لی",
    "لیب",
    "لیٌب",
    "لیں",
    "لے",
    "ه",
    "هتعلق",
    "هختلف",
    "هسترم",
    "هسترهہ",
    "هسطوش",
    "هسیذ",
    "هطئلہ",
    "هطئلے",
    "هطبئل",
    "هطتعول",
    "هطلق",
    "هعلوم",
    "هػتول",
    "هلا",
    "هوکي",
    "هوکٌبت",
    "هوکٌہ",
    "هٌبضت",
    "هڑا",
    "هڑًب",
    "هڑے",
    "هکول",
    "هگر",
    "هہرثبى",
    "هیرا",
    "هیری",
    "هیرے",
    "هیں",
    "و",
    "وار",
    "والے",
    "وٍ",
    "ًئی",
    "ًئے",
    "ًب",
    "ًبپطٌذ",
    "ًبگسیر",
    "ًطجت",
    "ًقطہ",
    "ًو",
    "ًوخواى",
    "ًکبلٌب",
    "ًکتہ",
    "ًہ",
    "ًہیں",
    "ًیب",
    "ًے",
    "ٓ آش",
    "ٹھیک",
    "پبئے",
    "پبش",
    "پبًب",
    "پبًچ",
    "پر",
    "پراًب",
    "پطٌذ",
    "پل",
    "پورا",
    "پوچھب",
    "پوچھتب",
    "پوچھتی",
    "پوچھتے",
    "پوچھو",
    "پوچھوں",
    "پوچھٌب",
    "پوچھیں",
    "پچھلا",
    "پھر",
    "پہلا",
    "پہلی",
    "پہلےضی",
    "پہلےضے",
    "پہلےضےہی",
    "پیع",
    "چبر",
    "چبہب",
    "چبہٌب",
    "چبہے",
    "چلا",
    "چلو",
    "چلیں",
    "چلے",
    "چکب",
    "چکی",
    "چکیں",
    "چکے",
    "چھوٹب",
    "چھوٹوں",
    "چھوٹی",
    "چھوٹے",
    "چھہ",
    "چیسیں",
    "ڈھوًڈا",
    "ڈھوًڈلیب",
    "ڈھوًڈو",
    "ڈھوًڈًب",
    "ڈھوًڈی",
    "ڈھوًڈیں",
    "ک",
    "کئی",
    "کئے",
    "کب",
    "کبفی",
    "کبم",
    "کت",
    "کجھی",
    "کرا",
    "کرتب",
    "کرتبہوں",
    "کرتی",
    "کرتے",
    "کرتےہو",
    "کررہب",
    "کررہی",
    "کررہے",
    "کرو",
    "کرًب",
    "کریں",
    "کرے",
    "کطی",
    "کل",
    "کن",
    "کوئی",
    "کوتر",
    "کورا",
    "کوروں",
    "کورٍ",
    "کورے",
    "کوطي",
    "کوى",
    "کوًطب",
    "کوًطی",
    "کوًطے",
    "کھولا",
    "کھولو",
    "کھولٌب",
    "کھولی",
    "کھولیں",
    "کھولے",
    "کہ",
    "کہب",
    "کہتب",
    "کہتی",
    "کہتے",
    "کہو",
    "کہوں",
    "کہٌب",
    "کہی",
    "کہیں",
    "کہے",
    "کی",
    "کیب",
    "کیطب",
    "کیطرف",
    "کیطے",
    "کیلئے",
    "کیوًکہ",
    "کیوں",
    "کیے",
    "کے",
    "کےثعذ",
    "کےرریعے",
    "گئی",
    "گئے",
    "گب",
    "گرد",
    "گروٍ",
    "گروپ",
    "گروہوں",
    "گٌتی",
    "گی",
    "گیب",
    "گے",
    "ہر",
    "ہن",
    "ہو",
    "ہوئی",
    "ہوئے",
    "ہوا",
    "ہوبرا",
    "ہوبری",
    "ہوبرے",
    "ہوتب",
    "ہوتی",
    "ہوتے",
    "ہورہب",
    "ہورہی",
    "ہورہے",
    "ہوضکتب",
    "ہوضکتی",
    "ہوضکتے",
    "ہوًب",
    "ہوًی",
    "ہوًے",
    "ہوچکب",
    "ہوچکی",
    "ہوچکے",
    "ہوگئی",
    "ہوگئے",
    "ہوگیب",
    "ہوں",
    "ہی",
    "ہیں",
    "ہے",
    "ی",
    "یقیٌی",
    "یہ",
    "یہبں"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_vi.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_vi.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a ha",
    "a-lô",
    "ai",
    "ai ai",
    "ai nấy",
    "alô",
    "amen",
    "anh",
    "bao giờ",
    "bao lâu",
    "bao nhiêu",
    "bao nả",
    "bay biến",
    "biết",
    "biết bao",
    "biết bao nhiêu",
    "biết chừng nào",
    "biết mấy",
    "biết đâu",
    "biết đâu chừng",
    "biết đâu đấy",
    "bà",
    "bài",
    "bác",
    "bây bẩy",
    "bây chừ",
    "bây giờ",
    "bây nhiêu",
    "bèn",
    "béng",
    "bông",
    "bạn",
    "bản",
    "bất chợt",
    "bất cứ",
    "bất giác",
    "bất kì",
    "bất kể",
    "bất kỳ",
    "bất luận",
    "bất nhược",
    "bất quá",
    "bất thình lình",
    "bất tử",
    "bất đồ",
    "bấy",
    "bấy chầy",
    "bấy chừ",
    "bấy giờ",
    "bấy lâu",
    "bấy lâu nay",
    "bấy nay",
    "bấy nhiêu",
    "bập bà bập bõm",
    "bập bõm",
    "bắt đầu từ",
    "bằng",
    "bằng không",
    "bằng nấy",
    "bằng ấy",
    "bển",
    "bệt",
    "bị",
    "bỏ mẹ",
    "bỗng",
    "bỗng chốc",
    "bỗng dưng",
    "bỗng không",
    "bỗng nhiên",
    "bỗng đâu",
    "bộ",
    "bội phần",
    "bớ",
    "bởi",
    "bởi chưng",
    "bởi nhưng",
    "bởi thế",
    "bởi vì",
    "bởi vậy",
    "bức",
    "cao",
    "cha",
    "cha chả",
    "chao ôi",
    "chiếc",
    "cho",
    "cho nên",
    "cho tới",
    "cho tới khi",
    "cho đến",
    "cho đến khi",
    "choa",
    "chu cha",
    "chui cha",
    "chung cục",
    "chung qui",
    "chung quy",
    "chung quy lại",
    "chuyện",
    "chành chạnh",
    "chí chết",
    "chính",
    "chính là",
    "chính thị",
    "chùn chùn",
    "chùn chũn",
    "chú",
    "chú mày",
    "chú mình",
    "chúng mình",
    "chúng ta",
    "chúng tôi",
    "chăn chắn",
    "chăng",
    "chưa",
    "chầm chập",
    "chậc",
    "chắc",
    "chắc hẳn",
    "chẳng lẽ",
    "chẳng những",
    "chẳng nữa",
    "chẳng phải",
    "chết nỗi",
    "chết thật",
    "chết tiệt",
    "chỉ",
    "chỉn",
    "chốc chốc",
    "chớ",
    "chớ chi",
    "chợt",
    "chủn",
    "chứ",
    "chứ lị",
    "coi bộ",
    "coi mòi",
    "con",
    "cu cậu",
    "cuốn",
    "cuộc",
    "càng",
    "các",
    "cái",
    "cây",
    "còn",
    "có",
    "có chăng là",
    "có dễ",
    "có thể",
    "có vẻ",
    "cóc khô",
    "cô",
    "cô mình",
    "công nhiên",
    "cùng",
    "cùng cực",
    "cùng nhau",
    "cùng với",
    "căn",
    "căn cắt",
    "cũng",
    "cũng như",
    "cũng vậy",
    "cũng vậy thôi",
    "cơ",
    "cơ chừng",
    "cơ hồ",
    "cơ mà",
    "cơn",
    "cả",
    "cả thảy",
    "cả thể",
    "cảm ơn",
    "cần",
    "cật lực",
    "cật sức",
    "cậu",
    "cổ lai",
    "của",
    "cứ",
    "cứ việc",
    "cực lực",
    "do",
    "do vì",
    "do vậy",
    "do đó",
    "duy",
    "dào",
    "dì",
    "dù cho",
    "dù rằng",
    "dưới",
    "dạ",
    "dần dà",
    "dần dần",
    "dầu sao",
    "dẫu",
    "dẫu sao",
    "dễ sợ",
    "dễ thường",
    "dở chừng",
    "dữ",
    "em",
    "giữa",
    "gì",
    "hay",
    "hoàn toàn",
    "hoặc",
    "hơn",
    "hầu hết",
    "họ",
    "hỏi",
    "khi",
    "khác",
    "không",
    "luôn",
    "là",
    "làm",
    "lên",
    "lúc",
    "lại",
    "lần",
    "lớn",
    "muốn",
    "mà",
    "mình",
    "mỗi",
    "một",
    "một cách",
    "mới",
    "mợ",
    "ngay",
    "ngay cả",
    "ngay khi",
    "ngay lúc",
    "ngay lập tức",
    "ngay tức khắc",
    "ngay từ",
    "nghe chừng",
    "nghe đâu",
    "nghen",
    "nghiễm nhiên",
    "nghỉm",
    "ngoài",
    "ngoài ra",
    "ngoải",
    "ngày",
    "ngày càng",
    "ngày ngày",
    "ngày xưa",
    "ngày xửa",
    "ngôi",
    "ngõ hầu",
    "ngăn ngắt",
    "ngươi",
    "người",
    "ngọn",
    "ngọt",
    "ngộ nhỡ",
    "nh",
    "nhau",
    "nhiên hậu",
    "nhiều",
    "nhiệt liệt",
    "nhung nhăng",
    "nhà",
    "nhân dịp",
    "nhân tiện",
    "nhé",
    "nhón nhén",
    "như",
    "như chơi",
    "như không",
    "như quả",
    "như thể",
    "như tuồng",
    "như vậy",
    "nhưng",
    "nhưng mà",
    "nhược bằng",
    "nhất",
    "nhất loạt",
    "nhất luật",
    "nhất mực",
    "nhất nhất",
    "nhất quyết",
    "nhất sinh",
    "nhất thiết",
    "nhất tâm",
    "nhất tề",
    "nhất đán",
    "nhất định",
    "nhận",
    "nhỉ",
    "nhỡ ra",
    "những",
    "những ai",
    "những như",
    "nào",
    "này",
    "nên",
    "nên chi",
    "nó",
    "nóc",
    "nói",
    "năm",
    "nơi",
    "nấy",
    "nếu",
    "nếu như",
    "nền",
    "nọ",
    "nớ",
    "nức nở",
    "nữa",
    "oai oái",
    "oái",
    "pho",
    "phè",
    "phóc",
    "phót",
    "phăn phắt",
    "phương chi",
    "phải",
    "phải chi",
    "phải chăng",
    "phắt",
    "phỉ phui",
    "phỏng",
    "phỏng như",
    "phốc",
    "phụt",
    "phứt",
    "qua",
    "qua quít",
    "qua quýt",
    "quyết",
    "quyết nhiên",
    "quyển",
    "quá",
    "quá chừng",
    "quá lắm",
    "quá sá",
    "quá thể",
    "quá trời",
    "quá xá",
    "quá đỗi",
    "quá độ",
    "quá ư",
    "quý hồ",
    "quả",
    "quả là",
    "quả tang",
    "quả thật",
    "quả tình",
    "quả vậy",
    "quả đúng",
    "ra",
    "ra phết",
    "ra sao",
    "ra trò",
    "ren rén",
    "riu ríu",
    "riêng",
    "riệt",
    "rày",
    "ráo",
    "ráo trọi",
    "rén",
    "rích",
    "rón rén",
    "rút cục",
    "răng",
    "rất",
    "rằng",
    "rằng là",
    "rốt cuộc",
    "rốt cục",
    "rồi",
    "rứa",
    "sa sả",
    "sao",
    "sau",
    "sau chót",
    "sau cuối",
    "sau cùng",
    "sau đó",
    "so",
    "song le",
    "suýt",
    "sì",
    "sạch",
    "sất",
    "sắp",
    "sẽ",
    "số",
    "số là",
    "sốt sột",
    "sở dĩ",
    "sự",
    "tanh",
    "tha hồ",
    "than ôi",
    "thanh",
    "theo",
    "thi thoảng",
    "thoạt",
    "thoạt nhiên",
    "thoắt",
    "thuần",
    "thà",
    "thà là",
    "thà rằng",
    "thành ra",
    "thành thử",
    "thái quá",
    "tháng",
    "thì",
    "thì thôi",
    "thình lình",
    "thím",
    "thôi",
    "thúng thắng",
    "thương ôi",
    "thường",
    "thảo hèn",
    "thảo nào",
    "thấy",
    "thẩy",
    "thậm",
    "thậm chí",
    "thật lực",
    "thật ra",
    "thật vậy",
    "thế",
    "thế là",
    "thế mà",
    "thế nào",
    "thế nên",
    "thế ra",
    "thế thì",
    "thế à",
    "thếch",
    "thỉnh thoảng",
    "thỏm",
    "thốc",
    "thốc tháo",
    "thốt",
    "thốt nhiên",
    "thộc",
    "thời gian",
    "thục mạng",
    "thửa",
    "thực ra",
    "thực sự",
    "thực vậy",
    "tiếp theo",
    "tiếp đó",
    "tiện thể",
    "toà",
    "toé khói",
    "toẹt",
    "trong",
    "trên",
    "trước",
    "trước kia",
    "trước nay",
    "trước tiên",
    "trước đây",
    "trước đó",
    "trếu tráo",
    "trển",
    "trệt",
    "trệu trạo",
    "trỏng",
    "trời đất ơi",
    "trừ phi",
    "tuy",
    "tuy nhiên",
    "tuy rằng",
    "tuy thế",
    "tuy vậy",
    "tuyệt nhiên",
    "tuần tự",
    "tuốt luốt",
    "tuốt tuồn tuột",
    "tuốt tuột",
    "tà tà",
    "tênh",
    "tít mù",
    "tò te",
    "tôi",
    "tông tốc",
    "tù tì",
    "tăm tắp",
    "tại",
    "tại vì",
    "tấm",
    "tấn",
    "tất cả",
    "tất thảy",
    "tất tần tật",
    "tất tật",
    "tắp",
    "tắp lự",
    "tọt",
    "tỏ ra",
    "tỏ vẻ",
    "tốc tả",
    "tối ư",
    "tột",
    "tớ",
    "tới",
    "tức thì",
    "tức tốc",
    "từ",
    "từng",
    "tự vì",
    "tựu trung",
    "veo",
    "veo veo",
    "việc",
    "vung thiên địa",
    "vung tàn tán",
    "vung tán tàn",
    "và",
    "vào",
    "vâng",
    "vèo",
    "vì",
    "vì chưng",
    "vì thế",
    "vì vậy",
    "ví bằng",
    "ví dù",
    "ví phỏng",
    "ví thử",
    "vô hình trung",
    "vô kể",
    "vô luận",
    "vô vàn",
    "văng tê",
    "vạn nhất",
    "vả chăng",
    "vả lại",
    "vẫn",
    "vậy",
    "vậy là",
    "vậy thì",
    "về",
    "vị tất",
    "vốn dĩ",
    "với",
    "với lại",
    "vở",
    "vụt",
    "vừa",
    "vừa mới",
    "xa xả",
    "xiết bao",
    "xon xón",
    "xoành xoạch",
    "xoét",
    "xoẳn",
    "xoẹt",
    "xuất kì bất ý",
    "xuất kỳ bất ý",
    "xuể",
    "xuống",
    "xăm xúi",
    "xăm xăm",
    "xăm xắm",
    "xềnh xệch",
    "xệp",
    "à",
    "à ơi",
    "ào",
    "á",
    "á à",
    "ái",
    "ái chà",
    "ái dà",
    "áng",
    "âu là",
    "ô hay",
    "ô hô",
    "ô kê",
    "ô kìa",
    "ôi chao",
    "ôi thôi",
    "ông",
    "úi",
    "úi chà",
    "úi dào",
    "ý",
    "ý chừng",
    "ý da",
    "đang",
    "đi",
    "điều",
    "đành đạch",
    "đáng lí",
    "đáng lý",
    "đáng lẽ",
    "đánh đùng",
    "đáo để",
    "đây",
    "đã",
    "đó",
    "được",
    "đại loại",
    "đại nhân",
    "đại phàm",
    "đại để",
    "đến",
    "đến nỗi",
    "đều",
    "để",
    "ơ",
    "ơ hay",
    "ơ kìa",
    "ơi",
    "ư",
    "ạ",
    "ạ ơi",
    "ấy",
    "ầu ơ",
    "ắt",
    "ắt hẳn",
    "ắt là",
    "ối dào",
    "ối giời",
    "ối giời ơi",
    "ồ",
    "ổng",
    "ớ",
    "ờ",
    "ở",
    "ở trên",
    "ủa",
    "ứ hự",
    "ứ ừ",
    "ừ",
    "ử"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_yo.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_yo.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "a",
    "an",
    "bá",
    "bí",
    "bẹ̀rẹ̀",
    "fún",
    "fẹ́",
    "gbogbo",
    "inú",
    "jù",
    "jẹ",
    "jẹ́",
    "kan",
    "kì",
    "kí",
    "kò",
    "láti",
    "lè",
    "lọ",
    "mi",
    "mo",
    "máa",
    "mọ̀",
    "ni",
    "náà",
    "ní",
    "nígbà",
    "nítorí",
    "nǹkan",
    "o",
    "padà",
    "pé",
    "púpọ̀",
    "pẹ̀lú",
    "rẹ̀",
    "sì",
    "sí",
    "sínú",
    "ṣ",
    "ti",
    "tí",
    "wà",
    "wá",
    "wọn",
    "wọ́n",
    "yìí",
    "àti",
    "àwọn",
    "é",
    "í",
    "òun",
    "ó",
    "ń",
    "ńlá",
    "ṣe",
    "ṣé",
    "ṣùgbọ́n",
    "ẹmọ́",
    "ọjọ́",
    "ọ̀pọ̀lọpọ̀"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_zh.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_zh.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "、",
    "。",
    "〈",
    "〉",
    "《",
    "》",
    "一",
    "一个",
    "一些",
    "一何",
    "一切",
    "一则",
    "一方面",
    "一旦",
    "一来",
    "一样",
    "一种",
    "一般",
    "一转眼",
    "七",
    "万一",
    "三",
    "上",
    "上下",
    "下",
    "不",
    "不仅",
    "不但",
    "不光",
    "不单",
    "不只",
    "不外乎",
    "不如",
    "不妨",
    "不尽",
    "不尽然",
    "不得",
    "不怕",
    "不惟",
    "不成",
    "不拘",
    "不料",
    "不是",
    "不比",
    "不然",
    "不特",
    "不独",
    "不管",
    "不至于",
    "不若",
    "不论",
    "不过",
    "不问",
    "与",
    "与其",
    "与其说",
    "与否",
    "与此同时",
    "且",
    "且不说",
    "且说",
    "两者",
    "个",
    "个别",
    "中",
    "临",
    "为",
    "为了",
    "为什么",
    "为何",
    "为止",
    "为此",
    "为着",
    "乃",
    "乃至",
    "乃至于",
    "么",
    "之",
    "之一",
    "之所以",
    "之类",
    "乌乎",
    "乎",
    "乘",
    "九",
    "也",
    "也好",
    "也罢",
    "了",
    "二",
    "二来",
    "于",
    "于是",
    "于是乎",
    "云云",
    "云尔",
    "五",
    "些",
    "亦",
    "人",
    "人们",
    "人家",
    "什",
    "什么",
    "什么样",
    "今",
    "介于",
    "仍",
    "仍旧",
    "从",
    "从此",
    "从而",
    "他",
    "他人",
    "他们",
    "他们们",
    "以",
    "以上",
    "以为",
    "以便",
    "以免",
    "以及",
    "以故",
    "以期",
    "以来",
    "以至",
    "以至于",
    "以致",
    "们",
    "任",
    "任何",
    "任凭",
    "会",
    "似的",
    "但",
    "但凡",
    "但是",
    "何",
    "何以",
    "何况",
    "何处",
    "何时",
    "余外",
    "作为",
    "你",
    "你们",
    "使",
    "使得",
    "例如",
    "依",
    "依据",
    "依照",
    "便于",
    "俺",
    "俺们",
    "倘",
    "倘使",
    "倘或",
    "倘然",
    "倘若",
    "借",
    "借傥然",
    "假使",
    "假如",
    "假若",
    "做",
    "像",
    "儿",
    "先不先",
    "光",
    "光是",
    "全体",
    "全部",
    "八",
    "六",
    "兮",
    "共",
    "关于",
    "关于具体地说",
    "其",
    "其一",
    "其中",
    "其二",
    "其他",
    "其余",
    "其它",
    "其次",
    "具体地说",
    "具体说来",
    "兼之",
    "内",
    "再",
    "再其次",
    "再则",
    "再有",
    "再者",
    "再者说",
    "再说",
    "冒",
    "冲",
    "况且",
    "几",
    "几时",
    "凡",
    "凡是",
    "凭",
    "凭借",
    "出于",
    "出来",
    "分",
    "分别",
    "则",
    "则甚",
    "别",
    "别人",
    "别处",
    "别是",
    "别的",
    "别管",
    "别说",
    "到",
    "前后",
    "前此",
    "前者",
    "加之",
    "加以",
    "区",
    "即",
    "即令",
    "即使",
    "即便",
    "即如",
    "即或",
    "即若",
    "却",
    "去",
    "又",
    "又及",
    "及",
    "及其",
    "及至",
    "反之",
    "反而",
    "反过来",
    "反过来说",
    "受到",
    "另",
    "另一方面",
    "另外",
    "另悉",
    "只",
    "只当",
    "只怕",
    "只是",
    "只有",
    "只消",
    "只要",
    "只限",
    "叫",
    "叮咚",
    "可",
    "可以",
    "可是",
    "可见",
    "各",
    "各个",
    "各位",
    "各种",
    "各自",
    "同",
    "同时",
    "后",
    "后者",
    "向",
    "向使",
    "向着",
    "吓",
    "吗",
    "否则",
    "吧",
    "吧哒",
    "含",
    "吱",
    "呀",
    "呃",
    "呕",
    "呗",
    "呜",
    "呜呼",
    "呢",
    "呵",
    "呵呵",
    "呸",
    "呼哧",
    "咋",
    "和",
    "咚",
    "咦",
    "咧",
    "咱",
    "咱们",
    "咳",
    "哇",
    "哈",
    "哈哈",
    "哉",
    "哎",
    "哎呀",
    "哎哟",
    "哗",
    "哟",
    "哦",
    "哩",
    "哪",
    "哪个",
    "哪些",
    "哪儿",
    "哪天",
    "哪年",
    "哪怕",
    "哪样",
    "哪边",
    "哪里",
    "哼",
    "哼唷",
    "唉",
    "唯有",
    "啊",
    "啐",
    "啥",
    "啦",
    "啪达",
    "啷当",
    "喂",
    "喏",
    "喔唷",
    "喽",
    "嗡",
    "嗡嗡",
    "嗬",
    "嗯",
    "嗳",
    "嘎",
    "嘎登",
    "嘘",
    "嘛",
    "嘻",
    "嘿",
    "嘿嘿",
    "四",
    "因",
    "因为",
    "因了",
    "因此",
    "因着",
    "因而",
    "固然",
    "在",
    "在下",
    "在于",
    "地",
    "基于",
    "处在",
    "多",
    "多么",
    "多少",
    "大",
    "大家",
    "她",
    "她们",
    "好",
    "如",
    "如上",
    "如上所述",
    "如下",
    "如何",
    "如其",
    "如同",
    "如是",
    "如果",
    "如此",
    "如若",
    "始而",
    "孰料",
    "孰知",
    "宁",
    "宁可",
    "宁愿",
    "宁肯",
    "它",
    "它们",
    "对",
    "对于",
    "对待",
    "对方",
    "对比",
    "将",
    "小",
    "尔",
    "尔后",
    "尔尔",
    "尚且",
    "就",
    "就是",
    "就是了",
    "就是说",
    "就算",
    "就要",
    "尽",
    "尽管",
    "尽管如此",
    "岂但",
    "己",
    "已",
    "已矣",
    "巴",
    "巴巴",
    "年",
    "并",
    "并且",
    "庶乎",
    "庶几",
    "开外",
    "开始",
    "归",
    "归齐",
    "当",
    "当地",
    "当然",
    "当着",
    "彼",
    "彼时",
    "彼此",
    "往",
    "待",
    "很",
    "得",
    "得了",
    "怎",
    "怎么",
    "怎么办",
    "怎么样",
    "怎奈",
    "怎样",
    "总之",
    "总的来看",
    "总的来说",
    "总的说来",
    "总而言之",
    "恰恰相反",
    "您",
    "惟其",
    "慢说",
    "我",
    "我们",
    "或",
    "或则",
    "或是",
    "或曰",
    "或者",
    "截至",
    "所",
    "所以",
    "所在",
    "所幸",
    "所有",
    "才",
    "才能",
    "打",
    "打从",
    "把",
    "抑或",
    "拿",
    "按",
    "按照",
    "换句话说",
    "换言之",
    "据",
    "据此",
    "接着",
    "故",
    "故此",
    "故而",
    "旁人",
    "无",
    "无宁",
    "无论",
    "既",
    "既往",
    "既是",
    "既然",
    "日",
    "时",
    "时候",
    "是",
    "是以",
    "是的",
    "更",
    "曾",
    "替",
    "替代",
    "最",
    "月",
    "有",
    "有些",
    "有关",
    "有及",
    "有时",
    "有的",
    "望",
    "朝",
    "朝着",
    "本",
    "本人",
    "本地",
    "本着",
    "本身",
    "来",
    "来着",
    "来自",
    "来说",
    "极了",
    "果然",
    "果真",
    "某",
    "某个",
    "某些",
    "某某",
    "根据",
    "欤",
    "正值",
    "正如",
    "正巧",
    "正是",
    "此",
    "此地",
    "此处",
    "此外",
    "此时",
    "此次",
    "此间",
    "毋宁",
    "每",
    "每当",
    "比",
    "比及",
    "比如",
    "比方",
    "没奈何",
    "沿",
    "沿着",
    "漫说",
    "点",
    "焉",
    "然则",
    "然后",
    "然而",
    "照",
    "照着",
    "犹且",
    "犹自",
    "甚且",
    "甚么",
    "甚或",
    "甚而",
    "甚至",
    "甚至于",
    "用",
    "用来",
    "由",
    "由于",
    "由是",
    "由此",
    "由此可见",
    "的",
    "的确",
    "的话",
    "直到",
    "相对而言",
    "省得",
    "看",
    "眨眼",
    "着",
    "着呢",
    "矣",
    "矣乎",
    "矣哉",
    "离",
    "秒",
    "称",
    "竟而",
    "第",
    "等",
    "等到",
    "等等",
    "简言之",
    "管",
    "类如",
    "紧接着",
    "纵",
    "纵令",
    "纵使",
    "纵然",
    "经",
    "经过",
    "结果",
    "给",
    "继之",
    "继后",
    "继而",
    "综上所述",
    "罢了",
    "者",
    "而",
    "而且",
    "而况",
    "而后",
    "而外",
    "而已",
    "而是",
    "而言",
    "能",
    "能否",
    "腾",
    "自",
    "自个儿",
    "自从",
    "自各儿",
    "自后",
    "自家",
    "自己",
    "自打",
    "自身",
    "至",
    "至于",
    "至今",
    "至若",
    "致",
    "般的",
    "若",
    "若夫",
    "若是",
    "若果",
    "若非",
    "莫不然",
    "莫如",
    "莫若",
    "虽",
    "虽则",
    "虽然",
    "虽说",
    "被",
    "要",
    "要不",
    "要不是",
    "要不然",
    "要么",
    "要是",
    "譬喻",
    "譬如",
    "让",
    "许多",
    "论",
    "设使",
    "设或",
    "设若",
    "诚如",
    "诚然",
    "该",
    "说",
    "说来",
    "请",
    "诸",
    "诸位",
    "诸如",
    "谁",
    "谁人",
    "谁料",
    "谁知",
    "贼死",
    "赖以",
    "赶",
    "起",
    "起见",
    "趁",
    "趁着",
    "越是",
    "距",
    "跟",
    "较",
    "较之",
    "边",
    "过",
    "还",
    "还是",
    "还有",
    "还要",
    "这",
    "这一来",
    "这个",
    "这么",
    "这么些",
    "这么样",
    "这么点儿",
    "这些",
    "这会儿",
    "这儿",
    "这就是说",
    "这时",
    "这样",
    "这次",
    "这般",
    "这边",
    "这里",
    "进而",
    "连",
    "连同",
    "逐步",
    "通过",
    "遵循",
    "遵照",
    "那",
    "那个",
    "那么",
    "那么些",
    "那么样",
    "那些",
    "那会儿",
    "那儿",
    "那时",
    "那样",
    "那般",
    "那边",
    "那里",
    "都",
    "鄙人",
    "鉴于",
    "针对",
    "阿",
    "除",
    "除了",
    "除外",
    "除开",
    "除此之外",
    "除非",
    "随",
    "随后",
    "随时",
    "随着",
    "难道说",
    "零",
    "非",
    "非但",
    "非徒",
    "非特",
    "非独",
    "靠",
    "顺",
    "顺着",
    "首先",
    "︿",
    "！",
    "＃",
    "＄",
    "％",
    "＆",
    "（",
    "）",
    "＊",
    "＋",
    "，",
    "０",
    "１",
    "２",
    "３",
    "４",
    "５",
    "６",
    "７",
    "８",
    "９",
    "：",
    "；",
    "＜",
    "＞",
    "？",
    "＠",
    "［",
    "］",
    "｛",
    "｜",
    "｝",
    "～",
    "￥"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib/stopwords_zu.js":
/*!***************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/stopwords_zu.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.stop_words = [
    "futhi",
    "kahle",
    "kakhulu",
    "kanye",
    "khona",
    "kodwa",
    "kungani",
    "kusho",
    "la",
    "lakhe",
    "lapho",
    "mina",
    "ngesikhathi",
    "nje",
    "phansi",
    "phezulu",
    "u",
    "ukuba",
    "ukuthi",
    "ukuze",
    "uma",
    "wahamba",
    "wakhe",
    "wami",
    "wase",
    "wathi",
    "yakhe",
    "zakhe",
    "zonke"
];


/***/ }),

/***/ "./node_modules/ldawithmorelanguages/lib sync recursive ^\\.\\/stopwords_.*\\.js$":
/*!****************************************************************************!*\
  !*** ./node_modules/ldawithmorelanguages/lib/ sync ^\.\/stopwords_.*\.js$ ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./stopwords_af.js": "./node_modules/ldawithmorelanguages/lib/stopwords_af.js",
	"./stopwords_ar.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ar.js",
	"./stopwords_bg.js": "./node_modules/ldawithmorelanguages/lib/stopwords_bg.js",
	"./stopwords_bn.js": "./node_modules/ldawithmorelanguages/lib/stopwords_bn.js",
	"./stopwords_br.js": "./node_modules/ldawithmorelanguages/lib/stopwords_br.js",
	"./stopwords_ca.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ca.js",
	"./stopwords_cs.js": "./node_modules/ldawithmorelanguages/lib/stopwords_cs.js",
	"./stopwords_da.js": "./node_modules/ldawithmorelanguages/lib/stopwords_da.js",
	"./stopwords_de.js": "./node_modules/ldawithmorelanguages/lib/stopwords_de.js",
	"./stopwords_el.js": "./node_modules/ldawithmorelanguages/lib/stopwords_el.js",
	"./stopwords_en.js": "./node_modules/ldawithmorelanguages/lib/stopwords_en.js",
	"./stopwords_eo.js": "./node_modules/ldawithmorelanguages/lib/stopwords_eo.js",
	"./stopwords_es.js": "./node_modules/ldawithmorelanguages/lib/stopwords_es.js",
	"./stopwords_et.js": "./node_modules/ldawithmorelanguages/lib/stopwords_et.js",
	"./stopwords_eu.js": "./node_modules/ldawithmorelanguages/lib/stopwords_eu.js",
	"./stopwords_fa.js": "./node_modules/ldawithmorelanguages/lib/stopwords_fa.js",
	"./stopwords_fi.js": "./node_modules/ldawithmorelanguages/lib/stopwords_fi.js",
	"./stopwords_fr.js": "./node_modules/ldawithmorelanguages/lib/stopwords_fr.js",
	"./stopwords_ga.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ga.js",
	"./stopwords_gl.js": "./node_modules/ldawithmorelanguages/lib/stopwords_gl.js",
	"./stopwords_gu.js": "./node_modules/ldawithmorelanguages/lib/stopwords_gu.js",
	"./stopwords_ha.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ha.js",
	"./stopwords_he.js": "./node_modules/ldawithmorelanguages/lib/stopwords_he.js",
	"./stopwords_hi.js": "./node_modules/ldawithmorelanguages/lib/stopwords_hi.js",
	"./stopwords_hr.js": "./node_modules/ldawithmorelanguages/lib/stopwords_hr.js",
	"./stopwords_hu.js": "./node_modules/ldawithmorelanguages/lib/stopwords_hu.js",
	"./stopwords_hy.js": "./node_modules/ldawithmorelanguages/lib/stopwords_hy.js",
	"./stopwords_id.js": "./node_modules/ldawithmorelanguages/lib/stopwords_id.js",
	"./stopwords_it.js": "./node_modules/ldawithmorelanguages/lib/stopwords_it.js",
	"./stopwords_ja.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ja.js",
	"./stopwords_ko.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ko.js",
	"./stopwords_ku.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ku.js",
	"./stopwords_la.js": "./node_modules/ldawithmorelanguages/lib/stopwords_la.js",
	"./stopwords_lt.js": "./node_modules/ldawithmorelanguages/lib/stopwords_lt.js",
	"./stopwords_lv.js": "./node_modules/ldawithmorelanguages/lib/stopwords_lv.js",
	"./stopwords_mr.js": "./node_modules/ldawithmorelanguages/lib/stopwords_mr.js",
	"./stopwords_ms.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ms.js",
	"./stopwords_no.js": "./node_modules/ldawithmorelanguages/lib/stopwords_no.js",
	"./stopwords_pl.js": "./node_modules/ldawithmorelanguages/lib/stopwords_pl.js",
	"./stopwords_pt.js": "./node_modules/ldawithmorelanguages/lib/stopwords_pt.js",
	"./stopwords_ro.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ro.js",
	"./stopwords_ru.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ru.js",
	"./stopwords_sk.js": "./node_modules/ldawithmorelanguages/lib/stopwords_sk.js",
	"./stopwords_sl.js": "./node_modules/ldawithmorelanguages/lib/stopwords_sl.js",
	"./stopwords_so.js": "./node_modules/ldawithmorelanguages/lib/stopwords_so.js",
	"./stopwords_st.js": "./node_modules/ldawithmorelanguages/lib/stopwords_st.js",
	"./stopwords_sv.js": "./node_modules/ldawithmorelanguages/lib/stopwords_sv.js",
	"./stopwords_sw.js": "./node_modules/ldawithmorelanguages/lib/stopwords_sw.js",
	"./stopwords_th.js": "./node_modules/ldawithmorelanguages/lib/stopwords_th.js",
	"./stopwords_tl.js": "./node_modules/ldawithmorelanguages/lib/stopwords_tl.js",
	"./stopwords_tr.js": "./node_modules/ldawithmorelanguages/lib/stopwords_tr.js",
	"./stopwords_uk.js": "./node_modules/ldawithmorelanguages/lib/stopwords_uk.js",
	"./stopwords_ur.js": "./node_modules/ldawithmorelanguages/lib/stopwords_ur.js",
	"./stopwords_vi.js": "./node_modules/ldawithmorelanguages/lib/stopwords_vi.js",
	"./stopwords_yo.js": "./node_modules/ldawithmorelanguages/lib/stopwords_yo.js",
	"./stopwords_zh.js": "./node_modules/ldawithmorelanguages/lib/stopwords_zh.js",
	"./stopwords_zu.js": "./node_modules/ldawithmorelanguages/lib/stopwords_zu.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/ldawithmorelanguages/lib sync recursive ^\\.\\/stopwords_.*\\.js$";

/***/ }),

/***/ "./node_modules/stem-porter/index.js":
/*!*******************************************!*\
  !*** ./node_modules/stem-porter/index.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var stemmer = __webpack_require__(/*! ./stemmer */ "./node_modules/stem-porter/stemmer.js")

exports = module.exports = __webpack_require__(/*! ./langs/english */ "./node_modules/stem-porter/langs/english.js")

exports.among = stemmer.among
exports.except = stemmer.except


/***/ }),

/***/ "./node_modules/stem-porter/langs/english.js":
/*!***************************************************!*\
  !*** ./node_modules/stem-porter/langs/english.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var stemmer = __webpack_require__(/*! ../stemmer */ "./node_modules/stem-porter/stemmer.js")
  , alphabet = "abcdefghijklmnopqrstuvwxyz"
  , vowels = "aeiouy"
  , consonants = alphabet.replace(RegExp("[" + vowels + "]", "g"), "") + "Y"
  , v_wxy = vowels + "wxY"
  , valid_li = "cdeghkmnrt"
  , r1_re = RegExp("^.*?([" + vowels + "][^" + vowels + "]|$)")
  , r1_spec = /^(gener|commun|arsen)/
  , doubles = /(bb|dd|ff|gg|mm|nn|pp|rr|tt)$/
  , y_cons = RegExp("([" + vowels + "])y", "g")
  , y_suff = RegExp("(.[^" + vowels + "])[yY]$")
  , exceptions1 =
    { skis: "ski"
    , skies: "sky"
    , dying: "die"
    , lying: "lie"
    , tying: "tie"

    , idly: "idl"
    , gently: "gentl"
    , ugly: "ugli"
    , early: "earli"
    , only: "onli"
    , singly: "singl"

    , sky: "sky"
    , news: "news"
    , howe: "howe"
    
    , atlas: "atlas"
    , cosmos: "cosmos"
    , bias: "bias"
    , andes: "andes"
    }
  , exceptions2 =
    [ "inning", "outing", "canning", "herring", "earring"
    , "proceed", "exceed", "succeed"
    ]


module.exports = function(word) {
  // Exceptions 1
  var stop = stemmer.except(word, exceptions1)
  if (stop) return stop

  // No stemming for short words.
  if (word.length < 3) return word

  // Y = "y" as a consonant.
  if (word[0] === "y") word = "Y" + word.substr(1)
  word = word.replace(y_cons, "$1Y")

  // Identify the regions of the word.
  var r1, m
  if (m = r1_spec.exec(word)) {
    r1 = m[0].length
  } else {
    r1 = r1_re.exec(word)[0].length
  }

  var r2 = r1 + r1_re.exec(word.substr(r1))[0].length

  // Step 0
  word = word.replace(/^'/, "")
  word = word.replace(/'(s'?)?$/, "")

  // Step 1a
  word = stemmer.among(word,
    [ "sses", "ss"
    , "(ied|ies)", function(match, _, offset) {
        return (offset > 1) ? "i" : "ie"
      }
    , "([" + vowels + "].*?[^us])s", function(match, m1) { return m1 }
    ])

  stop = stemmer.except(word, exceptions2)
  if (stop) return stop

  // Step 1b
  word = stemmer.among(word,
    [ "(eed|eedly)", function(match, _, offset) {
        return (offset >= r1) ? "ee" : match + " "
      }
    , ("([" + vowels + "].*?)(ed|edly|ing|ingly)"), function(match, prefix, suffix, off) {
        if (/(?:at|bl|iz)$/.test(prefix)) {
          return prefix + "e"
        } else if (doubles.test(prefix)) {
          return prefix.substr(0, prefix.length - 1)
        } else if (shortv(word.substr(0, off + prefix.length)) && off + prefix.length <= r1) {
          return prefix + "e"
        } else {
          return prefix
        }
      }
    ])

  // Step 1c
  word = word.replace(y_suff, "$1i")

  // Step 2
  word = stemmer.among(word, r1,
    [ "(izer|ization)", "ize"
    , "(ational|ation|ator)", "ate"
    , "enci", "ence"
    , "anci", "ance"
    , "abli", "able"
    , "entli", "ent"
    , "tional", "tion"
    , "(alism|aliti|alli)", "al"
    , "fulness", "ful"
    , "(ousli|ousness)", "ous"
    , "(iveness|iviti)", "ive"
    , "(biliti|bli)", "ble"
    , "ogi", function(m, off) {
        return (word[off - 1] === "l") ? "og" : "ogi"
      }
    , "fulli", "ful"
    , "lessli", "less"
    , "li", function(m, off) {
        return ~valid_li.indexOf(word[off - 1]) ? "" : "li"
      }
    ])

  // Step 3
  word = stemmer.among(word, r1,
    [ "ational", "ate"
    , "tional", "tion"
    , "alize", "al"
    , "(icate|iciti|ical)", "ic"
    , "(ful|ness)", ""
    , "ative", function(m, off) {
        return (off >= r2) ? "" : "ative"
      }
    ])

  // Step 4
  word = stemmer.among(word, r2,
    [ "(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ism|ate|iti|ous|ive|ize)", ""
    , "ion", function(m, off) {
        return ~"st".indexOf(word[off - 1]) ? "" : m
      }
    ])

  // Step 5
  word = stemmer.among(word, r1,
    [ "e", function(m, off) {
        return (off >= r2 || !shortv(word, off - 2)) ? "" : "e"
      }
    , "l", function(m, off) {
        return (word[off - 1] === "l" && off >= r2) ? "" : "l"
      }
    ])

  word = word.replace(/Y/g, "y")

  return word
}


// Check for a short syllable at the given index.
// Examples:
//
//   rap
//   trap
//   entrap
//
// NOT short
//
//   uproot
//   bestow
//   disturb
//
function shortv(word, i) {
  if (i == null) i = word.length - 2
  if (word.length < 3) i = 0//return true
  return !!((!~vowels.indexOf(word[i - 1]) &&
              ~vowels.indexOf(word[i]) &&
             !~v_wxy.indexOf(word[i + 1]))
         || (i === 0 &&
              ~vowels.indexOf(word[i]) &&
             !~vowels.indexOf(word[i + 1])))
}

// Check if the word is short.
function short(word, r1) {
  var l = word.length
  return r1 >= l && shortv(word, l - 2)
}


/***/ }),

/***/ "./node_modules/stem-porter/stemmer.js":
/*!*********************************************!*\
  !*** ./node_modules/stem-porter/stemmer.js ***!
  \*********************************************/
/***/ ((module) => {

var stemmer = {}
  , cache = {}

module.exports = stemmer

stemmer.except = function(word, exceptions) {
  if (exceptions instanceof Array) {
    if (~exceptions.indexOf(word)) return word
  } else {
    for (var k in exceptions) {
      if (k === word) return exceptions[k]
    }
  }
  return false
}


// word - String
// offset - Integer (optional)
// replace - Key/Value Array of pattern, string, and function.
stemmer.among = function among(word, offset, replace) {
  if (replace == null) return among(word, 0, offset)

  // Store the intial value of the word.
  var initial = word.slice()
    , pattern, replacement

  for (var i = 0; i < replace.length; i+=2) {
    pattern = replace[i]
    pattern = cache[pattern] || (cache[pattern] = new RegExp(replace[i] + "$"))
    replacement = replace[i + 1]

    if (typeof replacement === "function") {
      word = word.replace(pattern, function(m) {
        var off = arguments["" + (arguments.length - 2)]
        if (off >= offset) {
          return replacement.apply(null, arguments)
        } else {
          return m + " "
        }
      })
    } else {
      word = word.replace(pattern, function(m) {
        var off = arguments["" + (arguments.length - 2)]
        return (off >= offset) ? replacement : m + " "
      })
    }

    if (word !== initial) break
  }

  return word.replace(/ /g, "")
}


/***/ }),

/***/ "./node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.cjs":
/*!***********************************************************************!*\
  !*** ./node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.cjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var domhandler = __webpack_require__(/*! domhandler */ "./node_modules/domhandler/lib/index.js");
var selderee = __webpack_require__(/*! selderee */ "./node_modules/selderee/lib/selderee.cjs");

function hp2Builder(nodes) {
    return new selderee.Picker(handleArray(nodes));
}
function handleArray(nodes) {
    const matchers = nodes.map(handleNode);
    return (el, ...tail) => matchers.flatMap(m => m(el, ...tail));
}
function handleNode(node) {
    switch (node.type) {
        case 'terminal': {
            const result = [node.valueContainer];
            return (el, ...tail) => result;
        }
        case 'tagName':
            return handleTagName(node);
        case 'attrValue':
            return handleAttrValueName(node);
        case 'attrPresence':
            return handleAttrPresenceName(node);
        case 'pushElement':
            return handlePushElementNode(node);
        case 'popElement':
            return handlePopElementNode(node);
    }
}
function handleTagName(node) {
    const variants = {};
    for (const variant of node.variants) {
        variants[variant.value] = handleArray(variant.cont);
    }
    return (el, ...tail) => {
        const continuation = variants[el.name];
        return (continuation) ? continuation(el, ...tail) : [];
    };
}
function handleAttrPresenceName(node) {
    const attrName = node.name;
    const continuation = handleArray(node.cont);
    return (el, ...tail) => (Object.prototype.hasOwnProperty.call(el.attribs, attrName))
        ? continuation(el, ...tail)
        : [];
}
function handleAttrValueName(node) {
    const callbacks = [];
    for (const matcher of node.matchers) {
        const predicate = matcher.predicate;
        const continuation = handleArray(matcher.cont);
        callbacks.push((attr, el, ...tail) => (predicate(attr) ? continuation(el, ...tail) : []));
    }
    const attrName = node.name;
    return (el, ...tail) => {
        const attr = el.attribs[attrName];
        return (attr || attr === '')
            ? callbacks.flatMap(cb => cb(attr, el, ...tail))
            : [];
    };
}
function handlePushElementNode(node) {
    const continuation = handleArray(node.cont);
    const leftElementGetter = (node.combinator === '+')
        ? getPrecedingElement
        : getParentElement;
    return (el, ...tail) => {
        const next = leftElementGetter(el);
        if (next === null) {
            return [];
        }
        return continuation(next, el, ...tail);
    };
}
const getPrecedingElement = (el) => {
    const prev = el.prev;
    if (prev === null) {
        return null;
    }
    return (domhandler.isTag(prev)) ? prev : getPrecedingElement(prev);
};
const getParentElement = (el) => {
    const parent = el.parent;
    return (parent && domhandler.isTag(parent)) ? parent : null;
};
function handlePopElementNode(node) {
    const continuation = handleArray(node.cont);
    return (el, next, ...tail) => continuation(next, ...tail);
}

exports.hp2Builder = hp2Builder;


/***/ }),

/***/ "./node_modules/html-to-text/lib/html-to-text.cjs":
/*!********************************************************!*\
  !*** ./node_modules/html-to-text/lib/html-to-text.cjs ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var pluginHtmlparser2 = __webpack_require__(/*! @selderee/plugin-htmlparser2 */ "./node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.cjs");
var htmlparser2 = __webpack_require__(/*! htmlparser2 */ "./node_modules/htmlparser2/lib/index.js");
var selderee = __webpack_require__(/*! selderee */ "./node_modules/selderee/lib/selderee.cjs");
var merge = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
var domSerializer = __webpack_require__(/*! dom-serializer */ "./node_modules/dom-serializer/lib/index.js");

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);

/**
 * Make a recursive function that will only run to a given depth
 * and switches to an alternative function at that depth. \
 * No limitation if `n` is `undefined` (Just wraps `f` in that case).
 *
 * @param   { number | undefined } n   Allowed depth of recursion. `undefined` for no limitation.
 * @param   { Function }           f   Function that accepts recursive callback as the first argument.
 * @param   { Function }           [g] Function to run instead, when maximum depth was reached. Do nothing by default.
 * @returns { Function }
 */
function limitedDepthRecursive (n, f, g = () => undefined) {
  if (n === undefined) {
    const f1 = function (...args) { return f(f1, ...args); };
    return f1;
  }
  if (n >= 0) {
    return function (...args) { return f(limitedDepthRecursive(n - 1, f, g), ...args); };
  }
  return g;
}

/**
 * Return the same string or a substring with
 * the given character occurrences removed from each side.
 *
 * @param   { string } str  A string to trim.
 * @param   { string } char A character to be trimmed.
 * @returns { string }
 */
function trimCharacter (str, char) {
  let start = 0;
  let end = str.length;
  while (start < end && str[start] === char) { ++start; }
  while (end > start && str[end - 1] === char) { --end; }
  return (start > 0 || end < str.length)
    ? str.substring(start, end)
    : str;
}

/**
 * Return the same string or a substring with
 * the given character occurrences removed from the end only.
 *
 * @param   { string } str  A string to trim.
 * @param   { string } char A character to be trimmed.
 * @returns { string }
 */
function trimCharacterEnd (str, char) {
  let end = str.length;
  while (end > 0 && str[end - 1] === char) { --end; }
  return (end < str.length)
    ? str.substring(0, end)
    : str;
}

/**
 * Return a new string will all characters replaced with unicode escape sequences.
 * This extreme kind of escaping can used to be safely compose regular expressions.
 *
 * @param { string } str A string to escape.
 * @returns { string } A string of unicode escape sequences.
 */
function unicodeEscape (str) {
  return str.replace(/[\s\S]/g, c => '\\u' + c.charCodeAt().toString(16).padStart(4, '0'));
}

/**
 * Deduplicate an array by a given key callback.
 * Item properties are merged recursively and with the preference for last defined values.
 * Of items with the same key, merged item takes the place of the last item,
 * others are omitted.
 *
 * @param { any[] } items An array to deduplicate.
 * @param { (x: any) => string } getKey Callback to get a value that distinguishes unique items.
 * @returns { any[] }
 */
function mergeDuplicatesPreferLast (items, getKey) {
  const map = new Map();
  for (let i = items.length; i-- > 0;) {
    const item = items[i];
    const key = getKey(item);
    map.set(
      key,
      (map.has(key))
        ? merge__default["default"](item, map.get(key), { arrayMerge: overwriteMerge$1 })
        : item
    );
  }
  return [...map.values()].reverse();
}

const overwriteMerge$1 = (acc, src, options) => [...src];

/**
 * Get a nested property from an object.
 *
 * @param   { object }   obj  The object to query for the value.
 * @param   { string[] } path The path to the property.
 * @returns { any }
 */
function get (obj, path) {
  for (const key of path) {
    if (!obj) { return undefined; }
    obj = obj[key];
  }
  return obj;
}

/**
 * Convert a number into alphabetic sequence representation (Sequence without zeroes).
 *
 * For example: `a, ..., z, aa, ..., zz, aaa, ...`.
 *
 * @param   { number } num              Number to convert. Must be >= 1.
 * @param   { string } [baseChar = 'a'] Character for 1 in the sequence.
 * @param   { number } [base = 26]      Number of characters in the sequence.
 * @returns { string }
 */
function numberToLetterSequence (num, baseChar = 'a', base = 26) {
  const digits = [];
  do {
    num -= 1;
    digits.push(num % base);
    num = (num / base) >> 0; // quick `floor`
  } while (num > 0);
  const baseCode = baseChar.charCodeAt(0);
  return digits
    .reverse()
    .map(n => String.fromCharCode(baseCode + n))
    .join('');
}

const I = ['I', 'X', 'C', 'M'];
const V = ['V', 'L', 'D'];

/**
 * Convert a number to it's Roman representation. No large numbers extension.
 *
 * @param   { number } num Number to convert. `0 < num <= 3999`.
 * @returns { string }
 */
function numberToRoman (num) {
  return [...(num) + '']
    .map(n => +n)
    .reverse()
    .map((v, i) => ((v % 5 < 4)
      ? (v < 5 ? '' : V[i]) + I[i].repeat(v % 5)
      : I[i] + (v < 5 ? V[i] : I[i + 1])))
    .reverse()
    .join('');
}

/**
 * Helps to build text from words.
 */
class InlineTextBuilder {
  /**
   * Creates an instance of InlineTextBuilder.
   *
   * If `maxLineLength` is not provided then it is either `options.wordwrap` or unlimited.
   *
   * @param { Options } options           HtmlToText options.
   * @param { number }  [ maxLineLength ] This builder will try to wrap text to fit this line length.
   */
  constructor (options, maxLineLength = undefined) {
    /** @type { string[][] } */
    this.lines = [];
    /** @type { string[] }   */
    this.nextLineWords = [];
    this.maxLineLength = maxLineLength || options.wordwrap || Number.MAX_VALUE;
    this.nextLineAvailableChars = this.maxLineLength;
    this.wrapCharacters = get(options, ['longWordSplit', 'wrapCharacters']) || [];
    this.forceWrapOnLimit = get(options, ['longWordSplit', 'forceWrapOnLimit']) || false;

    this.stashedSpace = false;
    this.wordBreakOpportunity = false;
  }

  /**
   * Add a new word.
   *
   * @param { string } word A word to add.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */
  pushWord (word, noWrap = false) {
    if (this.nextLineAvailableChars <= 0 && !noWrap) {
      this.startNewLine();
    }
    const isLineStart = this.nextLineWords.length === 0;
    const cost = word.length + (isLineStart ? 0 : 1);
    if ((cost <= this.nextLineAvailableChars) || noWrap) { // Fits into available budget

      this.nextLineWords.push(word);
      this.nextLineAvailableChars -= cost;

    } else { // Does not fit - try to split the word

      // The word is moved to a new line - prefer to wrap between words.
      const [first, ...rest] = this.splitLongWord(word);
      if (!isLineStart) { this.startNewLine(); }
      this.nextLineWords.push(first);
      this.nextLineAvailableChars -= first.length;
      for (const part of rest) {
        this.startNewLine();
        this.nextLineWords.push(part);
        this.nextLineAvailableChars -= part.length;
      }

    }
  }

  /**
   * Pop a word from the currently built line.
   * This doesn't affect completed lines.
   *
   * @returns { string }
   */
  popWord () {
    const lastWord = this.nextLineWords.pop();
    if (lastWord !== undefined) {
      const isLineStart = this.nextLineWords.length === 0;
      const cost = lastWord.length + (isLineStart ? 0 : 1);
      this.nextLineAvailableChars += cost;
    }
    return lastWord;
  }

  /**
   * Concat a word to the last word already in the builder.
   * Adds a new word in case there are no words yet in the last line.
   *
   * @param { string } word A word to be concatenated.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */
  concatWord (word, noWrap = false) {
    if (this.wordBreakOpportunity && word.length > this.nextLineAvailableChars) {
      this.pushWord(word, noWrap);
      this.wordBreakOpportunity = false;
    } else {
      const lastWord = this.popWord();
      this.pushWord((lastWord) ? lastWord.concat(word) : word, noWrap);
    }
  }

  /**
   * Add current line (and more empty lines if provided argument > 1) to the list of complete lines and start a new one.
   *
   * @param { number } n Number of line breaks that will be added to the resulting string.
   */
  startNewLine (n = 1) {
    this.lines.push(this.nextLineWords);
    if (n > 1) {
      this.lines.push(...Array.from({ length: n - 1 }, () => []));
    }
    this.nextLineWords = [];
    this.nextLineAvailableChars = this.maxLineLength;
  }

  /**
   * No words in this builder.
   *
   * @returns { boolean }
   */
  isEmpty () {
    return this.lines.length === 0
        && this.nextLineWords.length === 0;
  }

  clear () {
    this.lines.length = 0;
    this.nextLineWords.length = 0;
    this.nextLineAvailableChars = this.maxLineLength;
  }

  /**
   * Join all lines of words inside the InlineTextBuilder into a complete string.
   *
   * @returns { string }
   */
  toString () {
    return [...this.lines, this.nextLineWords]
      .map(words => words.join(' '))
      .join('\n');
  }

  /**
   * Split a long word up to fit within the word wrap limit.
   * Use either a character to split looking back from the word wrap limit,
   * or truncate to the word wrap limit.
   *
   * @param   { string }   word Input word.
   * @returns { string[] }      Parts of the word.
   */
  splitLongWord (word) {
    const parts = [];
    let idx = 0;
    while (word.length > this.maxLineLength) {

      const firstLine = word.substring(0, this.maxLineLength);
      const remainingChars = word.substring(this.maxLineLength);

      const splitIndex = firstLine.lastIndexOf(this.wrapCharacters[idx]);

      if (splitIndex > -1) { // Found a character to split on

        word = firstLine.substring(splitIndex + 1) + remainingChars;
        parts.push(firstLine.substring(0, splitIndex + 1));

      } else { // Not found a character to split on

        idx++;
        if (idx < this.wrapCharacters.length) { // There is next character to try

          word = firstLine + remainingChars;

        } else { // No more characters to try

          if (this.forceWrapOnLimit) {
            parts.push(firstLine);
            word = remainingChars;
            if (word.length > this.maxLineLength) {
              continue;
            }
          } else {
            word = firstLine + remainingChars;
          }
          break;

        }

      }

    }
    parts.push(word); // Add remaining part to array
    return parts;
  }
}

/* eslint-disable max-classes-per-file */


class StackItem {
  constructor (next = null) { this.next = next; }

  getRoot () { return (this.next) ? this.next : this; }
}

class BlockStackItem extends StackItem {
  constructor (options, next = null, leadingLineBreaks = 1, maxLineLength = undefined) {
    super(next);
    this.leadingLineBreaks = leadingLineBreaks;
    this.inlineTextBuilder = new InlineTextBuilder(options, maxLineLength);
    this.rawText = '';
    this.stashedLineBreaks = 0;
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
}

class ListStackItem extends BlockStackItem {
  constructor (
    options,
    next = null,
    {
      interRowLineBreaks = 1,
      leadingLineBreaks = 2,
      maxLineLength = undefined,
      maxPrefixLength = 0,
      prefixAlign = 'left',
    } = {}
  ) {
    super(options, next, leadingLineBreaks, maxLineLength);
    this.maxPrefixLength = maxPrefixLength;
    this.prefixAlign = prefixAlign;
    this.interRowLineBreaks = interRowLineBreaks;
  }
}

class ListItemStackItem extends BlockStackItem {
  constructor (
    options,
    next = null,
    {
      leadingLineBreaks = 1,
      maxLineLength = undefined,
      prefix = '',
    } = {}
  ) {
    super(options, next, leadingLineBreaks, maxLineLength);
    this.prefix = prefix;
  }
}

class TableStackItem extends StackItem {
  constructor (next = null) {
    super(next);
    this.rows = [];
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
}

class TableRowStackItem extends StackItem {
  constructor (next = null) {
    super(next);
    this.cells = [];
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
}

class TableCellStackItem extends StackItem {
  constructor (options, next = null, maxColumnWidth = undefined) {
    super(next);
    this.inlineTextBuilder = new InlineTextBuilder(options, maxColumnWidth);
    this.rawText = '';
    this.stashedLineBreaks = 0;
    this.isPre = next && next.isPre;
    this.isNoWrap = next && next.isNoWrap;
  }
}

class TransformerStackItem extends StackItem {
  constructor (next = null, transform) {
    super(next);
    this.transform = transform;
  }
}

function charactersToCodes (str) {
  return [...str]
    .map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))
    .join('');
}

/**
 * Helps to handle HTML whitespaces.
 *
 * @class WhitespaceProcessor
 */
class WhitespaceProcessor {

  /**
   * Creates an instance of WhitespaceProcessor.
   *
   * @param { Options } options    HtmlToText options.
   * @memberof WhitespaceProcessor
   */
  constructor (options) {
    this.whitespaceChars = (options.preserveNewlines)
      ? options.whitespaceCharacters.replace(/\n/g, '')
      : options.whitespaceCharacters;
    const whitespaceCodes = charactersToCodes(this.whitespaceChars);
    this.leadingWhitespaceRe = new RegExp(`^[${whitespaceCodes}]`);
    this.trailingWhitespaceRe = new RegExp(`[${whitespaceCodes}]$`);
    this.allWhitespaceOrEmptyRe = new RegExp(`^[${whitespaceCodes}]*$`);
    this.newlineOrNonWhitespaceRe = new RegExp(`(\\n|[^\\n${whitespaceCodes}])`, 'g');
    this.newlineOrNonNewlineStringRe = new RegExp(`(\\n|[^\\n]+)`, 'g');

    if (options.preserveNewlines) {

      const wordOrNewlineRe = new RegExp(`\\n|[^\\n${whitespaceCodes}]+`, 'gm');

      /**
       * Shrink whitespaces and wrap text, add to the builder.
       *
       * @param { string }                  text              Input text.
       * @param { InlineTextBuilder }       inlineTextBuilder A builder to receive processed text.
       * @param { (str: string) => string } [ transform ]     A transform to be applied to words.
       * @param { boolean }                 [noWrap] Don't wrap text even if the line is too long.
       */
      this.shrinkWrapAdd = function (text, inlineTextBuilder, transform = (str => str), noWrap = false) {
        if (!text) { return; }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m = wordOrNewlineRe.exec(text);
        if (m) {
          anyMatch = true;
          if (m[0] === '\n') {
            inlineTextBuilder.startNewLine();
          } else if (previouslyStashedSpace || this.testLeadingWhitespace(text)) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          } else {
            inlineTextBuilder.concatWord(transform(m[0]), noWrap);
          }
          while ((m = wordOrNewlineRe.exec(text)) !== null) {
            if (m[0] === '\n') {
              inlineTextBuilder.startNewLine();
            } else {
              inlineTextBuilder.pushWord(transform(m[0]), noWrap);
            }
          }
        }
        inlineTextBuilder.stashedSpace = (previouslyStashedSpace && !anyMatch) || (this.testTrailingWhitespace(text));
        // No need to stash a space in case last added item was a new line,
        // but that won't affect anything later anyway.
      };

    } else {

      const wordRe = new RegExp(`[^${whitespaceCodes}]+`, 'g');

      this.shrinkWrapAdd = function (text, inlineTextBuilder, transform = (str => str), noWrap = false) {
        if (!text) { return; }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m = wordRe.exec(text);
        if (m) {
          anyMatch = true;
          if (previouslyStashedSpace || this.testLeadingWhitespace(text)) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          } else {
            inlineTextBuilder.concatWord(transform(m[0]), noWrap);
          }
          while ((m = wordRe.exec(text)) !== null) {
            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
          }
        }
        inlineTextBuilder.stashedSpace = (previouslyStashedSpace && !anyMatch) || this.testTrailingWhitespace(text);
      };

    }
  }

  /**
   * Add text with only minimal processing.
   * Everything between newlines considered a single word.
   * No whitespace is trimmed.
   * Not affected by preserveNewlines option - `\n` always starts a new line.
   *
   * `noWrap` argument is `true` by default - this won't start a new line
   * even if there is not enough space left in the current line.
   *
   * @param { string }            text              Input text.
   * @param { InlineTextBuilder } inlineTextBuilder A builder to receive processed text.
   * @param { boolean }           [noWrap] Don't wrap text even if the line is too long.
   */
  addLiteral (text, inlineTextBuilder, noWrap = true) {
    if (!text) { return; }
    const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
    let anyMatch = false;
    let m = this.newlineOrNonNewlineStringRe.exec(text);
    if (m) {
      anyMatch = true;
      if (m[0] === '\n') {
        inlineTextBuilder.startNewLine();
      } else if (previouslyStashedSpace) {
        inlineTextBuilder.pushWord(m[0], noWrap);
      } else {
        inlineTextBuilder.concatWord(m[0], noWrap);
      }
      while ((m = this.newlineOrNonNewlineStringRe.exec(text)) !== null) {
        if (m[0] === '\n') {
          inlineTextBuilder.startNewLine();
        } else {
          inlineTextBuilder.pushWord(m[0], noWrap);
        }
      }
    }
    inlineTextBuilder.stashedSpace = (previouslyStashedSpace && !anyMatch);
  }

  /**
   * Test whether the given text starts with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testLeadingWhitespace (text) {
    return this.leadingWhitespaceRe.test(text);
  }

  /**
   * Test whether the given text ends with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testTrailingWhitespace (text) {
    return this.trailingWhitespaceRe.test(text);
  }

  /**
   * Test whether the given text contains any non-whitespace characters.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testContainsWords (text) {
    return !this.allWhitespaceOrEmptyRe.test(text);
  }

  /**
   * Return the number of newlines if there are no words.
   *
   * If any word is found then return zero regardless of the actual number of newlines.
   *
   * @param   { string }  text  Input string.
   * @returns { number }
   */
  countNewlinesNoWords (text) {
    this.newlineOrNonWhitespaceRe.lastIndex = 0;
    let counter = 0;
    let match;
    while ((match = this.newlineOrNonWhitespaceRe.exec(text)) !== null) {
      if (match[0] === '\n') {
        counter++;
      } else {
        return 0;
      }
    }
    return counter;
  }

}

/**
 * Helps to build text from inline and block elements.
 *
 * @class BlockTextBuilder
 */
class BlockTextBuilder {

  /**
   * Creates an instance of BlockTextBuilder.
   *
   * @param { Options } options HtmlToText options.
   * @param { import('selderee').Picker<DomNode, TagDefinition> } picker Selectors decision tree picker.
   * @param { any} [metadata] Optional metadata for HTML document, for use in formatters.
   */
  constructor (options, picker, metadata = undefined) {
    this.options = options;
    this.picker = picker;
    this.metadata = metadata;
    this.whitespaceProcessor = new WhitespaceProcessor(options);
    /** @type { StackItem } */
    this._stackItem = new BlockStackItem(options);
    /** @type { TransformerStackItem } */
    this._wordTransformer = undefined;
  }

  /**
   * Put a word-by-word transform function onto the transformations stack.
   *
   * Mainly used for uppercasing. Can be bypassed to add unformatted text such as URLs.
   *
   * Word transformations applied before wrapping.
   *
   * @param { (str: string) => string } wordTransform Word transformation function.
   */
  pushWordTransform (wordTransform) {
    this._wordTransformer = new TransformerStackItem(this._wordTransformer, wordTransform);
  }

  /**
   * Remove a function from the word transformations stack.
   *
   * @returns { (str: string) => string } A function that was removed.
   */
  popWordTransform () {
    if (!this._wordTransformer) { return undefined; }
    const transform = this._wordTransformer.transform;
    this._wordTransformer = this._wordTransformer.next;
    return transform;
  }

  /**
   * Ignore wordwrap option in followup inline additions and disable automatic wrapping.
   */
  startNoWrap () {
    this._stackItem.isNoWrap = true;
  }

  /**
   * Return automatic wrapping to behavior defined by options.
   */
  stopNoWrap () {
    this._stackItem.isNoWrap = false;
  }

  /** @returns { (str: string) => string } */
  _getCombinedWordTransformer () {
    const wt = (this._wordTransformer)
      ? ((str) => applyTransformer(str, this._wordTransformer))
      : undefined;
    const ce = this.options.encodeCharacters;
    return (wt)
      ? ((ce) ? (str) => ce(wt(str)) : wt)
      : ce;
  }

  _popStackItem () {
    const item = this._stackItem;
    this._stackItem = item.next;
    return item;
  }

  /**
   * Add a line break into currently built block.
   */
  addLineBreak () {
    if (!(
      this._stackItem instanceof BlockStackItem
      || this._stackItem instanceof ListItemStackItem
      || this._stackItem instanceof TableCellStackItem
    )) { return; }
    if (this._stackItem.isPre) {
      this._stackItem.rawText += '\n';
    } else {
      this._stackItem.inlineTextBuilder.startNewLine();
    }
  }

  /**
   * Allow to break line in case directly following text will not fit.
   */
  addWordBreakOpportunity () {
    if (
      this._stackItem instanceof BlockStackItem
      || this._stackItem instanceof ListItemStackItem
      || this._stackItem instanceof TableCellStackItem
    ) {
      this._stackItem.inlineTextBuilder.wordBreakOpportunity = true;
    }
  }

  /**
   * Add a node inline into the currently built block.
   *
   * @param { string } str
   * Text content of a node to add.
   *
   * @param { object } [param1]
   * Object holding the parameters of the operation.
   *
   * @param { boolean } [param1.noWordTransform]
   * Ignore word transformers if there are any.
   * Don't encode characters as well.
   * (Use this for things like URL addresses).
   */
  addInline (str, { noWordTransform = false } = {}) {
    if (!(
      this._stackItem instanceof BlockStackItem
      || this._stackItem instanceof ListItemStackItem
      || this._stackItem instanceof TableCellStackItem
    )) { return; }

    if (this._stackItem.isPre) {
      this._stackItem.rawText += str;
      return;
    }

    if (
      str.length === 0 || // empty string
      (
        this._stackItem.stashedLineBreaks && // stashed linebreaks make whitespace irrelevant
        !this.whitespaceProcessor.testContainsWords(str) // no words to add
      )
    ) { return; }

    if (this.options.preserveNewlines) {
      const newlinesNumber = this.whitespaceProcessor.countNewlinesNoWords(str);
      if (newlinesNumber > 0) {
        this._stackItem.inlineTextBuilder.startNewLine(newlinesNumber);
        // keep stashedLineBreaks unchanged
        return;
      }
    }

    if (this._stackItem.stashedLineBreaks) {
      this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
    }
    this.whitespaceProcessor.shrinkWrapAdd(
      str,
      this._stackItem.inlineTextBuilder,
      (noWordTransform) ? undefined : this._getCombinedWordTransformer(),
      this._stackItem.isNoWrap
    );
    this._stackItem.stashedLineBreaks = 0; // inline text doesn't introduce line breaks
  }

  /**
   * Add a string inline into the currently built block.
   *
   * Use this for markup elements that don't have to adhere
   * to text layout rules.
   *
   * @param { string } str Text to add.
   */
  addLiteral (str) {
    if (!(
      this._stackItem instanceof BlockStackItem
      || this._stackItem instanceof ListItemStackItem
      || this._stackItem instanceof TableCellStackItem
    )) { return; }

    if (str.length === 0) { return; }

    if (this._stackItem.isPre) {
      this._stackItem.rawText += str;
      return;
    }

    if (this._stackItem.stashedLineBreaks) {
      this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
    }
    this.whitespaceProcessor.addLiteral(
      str,
      this._stackItem.inlineTextBuilder,
      this._stackItem.isNoWrap
    );
    this._stackItem.stashedLineBreaks = 0;
  }

  /**
   * Start building a new block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any preceding block.
   *
   * @param { number }  [param0.reservedLineLength]
   * Reserve this number of characters on each line for block markup.
   *
   * @param { boolean } [param0.isPre]
   * Should HTML whitespace be preserved inside this block.
   */
  openBlock ({ leadingLineBreaks = 1, reservedLineLength = 0, isPre = false } = {}) {
    const maxLineLength = Math.max(20, this._stackItem.inlineTextBuilder.maxLineLength - reservedLineLength);
    this._stackItem = new BlockStackItem(
      this.options,
      this._stackItem,
      leadingLineBreaks,
      maxLineLength
    );
    if (isPre) { this._stackItem.isPre = true; }
  }

  /**
   * Finalize currently built block, add it's content to the parent block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any following block.
   *
   * @param { (str: string) => string } [param0.blockTransform]
   * A function to transform the block text before adding to the parent block.
   * This happens after word wrap and should be used in combination with reserved line length
   * in order to keep line lengths correct.
   * Used for whole block markup.
   */
  closeBlock ({ trailingLineBreaks = 1, blockTransform = undefined } = {}) {
    const block = this._popStackItem();
    const blockText = (blockTransform) ? blockTransform(getText(block)) : getText(block);
    addText(this._stackItem, blockText, block.leadingLineBreaks, Math.max(block.stashedLineBreaks, trailingLineBreaks));
  }

  /**
   * Start building a new list.
   *
   * @param { object } [param0]
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.maxPrefixLength]
   * Length of the longest list item prefix.
   * If not supplied or too small then list items won't be aligned properly.
   *
   * @param { 'left' | 'right' } [param0.prefixAlign]
   * Specify how prefixes of different lengths have to be aligned
   * within a column.
   *
   * @param { number } [param0.interRowLineBreaks]
   * Minimum number of line breaks between list items.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any preceding block.
   */
  openList ({ maxPrefixLength = 0, prefixAlign = 'left', interRowLineBreaks = 1, leadingLineBreaks = 2 } = {}) {
    this._stackItem = new ListStackItem(this.options, this._stackItem, {
      interRowLineBreaks: interRowLineBreaks,
      leadingLineBreaks: leadingLineBreaks,
      maxLineLength: this._stackItem.inlineTextBuilder.maxLineLength,
      maxPrefixLength: maxPrefixLength,
      prefixAlign: prefixAlign
    });
  }

  /**
   * Start building a new list item.
   *
   * @param {object} param0
   * Object holding the parameters of the list item.
   *
   * @param { string } [param0.prefix]
   * Prefix for this list item (item number, bullet point, etc).
   */
  openListItem ({ prefix = '' } = {}) {
    if (!(this._stackItem instanceof ListStackItem)) {
      throw new Error('Can\'t add a list item to something that is not a list! Check the formatter.');
    }
    const list = this._stackItem;
    const prefixLength = Math.max(prefix.length, list.maxPrefixLength);
    const maxLineLength = Math.max(20, list.inlineTextBuilder.maxLineLength - prefixLength);
    this._stackItem = new ListItemStackItem(this.options, list, {
      prefix: prefix,
      maxLineLength: maxLineLength,
      leadingLineBreaks: list.interRowLineBreaks
    });
  }

  /**
   * Finalize currently built list item, add it's content to the parent list.
   */
  closeListItem () {
    const listItem = this._popStackItem();
    const list = listItem.next;

    const prefixLength = Math.max(listItem.prefix.length, list.maxPrefixLength);
    const spacing = '\n' + ' '.repeat(prefixLength);
    const prefix = (list.prefixAlign === 'right')
      ? listItem.prefix.padStart(prefixLength)
      : listItem.prefix.padEnd(prefixLength);
    const text = prefix + getText(listItem).replace(/\n/g, spacing);

    addText(
      list,
      text,
      listItem.leadingLineBreaks,
      Math.max(listItem.stashedLineBreaks, list.interRowLineBreaks)
    );
  }

  /**
   * Finalize currently built list, add it's content to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any following block.
   */
  closeList ({ trailingLineBreaks = 2 } = {}) {
    const list = this._popStackItem();
    const text = getText(list);
    if (text) {
      addText(this._stackItem, text, list.leadingLineBreaks, trailingLineBreaks);
    }
  }

  /**
   * Start building a table.
   */
  openTable () {
    this._stackItem = new TableStackItem(this._stackItem);
  }

  /**
   * Start building a table row.
   */
  openTableRow () {
    if (!(this._stackItem instanceof TableStackItem)) {
      throw new Error('Can\'t add a table row to something that is not a table! Check the formatter.');
    }
    this._stackItem = new TableRowStackItem(this._stackItem);
  }

  /**
   * Start building a table cell.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.maxColumnWidth]
   * Wrap cell content to this width. Fall back to global wordwrap value if undefined.
   */
  openTableCell ({ maxColumnWidth = undefined } = {}) {
    if (!(this._stackItem instanceof TableRowStackItem)) {
      throw new Error('Can\'t add a table cell to something that is not a table row! Check the formatter.');
    }
    this._stackItem = new TableCellStackItem(this.options, this._stackItem, maxColumnWidth);
  }

  /**
   * Finalize currently built table cell and add it to parent table row's cells.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.colspan] How many columns this cell should occupy.
   * @param { number } [param0.rowspan] How many rows this cell should occupy.
   */
  closeTableCell ({ colspan = 1, rowspan = 1 } = {}) {
    const cell = this._popStackItem();
    const text = trimCharacter(getText(cell), '\n');
    cell.next.cells.push({ colspan: colspan, rowspan: rowspan, text: text });
  }

  /**
   * Finalize currently built table row and add it to parent table's rows.
   */
  closeTableRow () {
    const row = this._popStackItem();
    row.next.rows.push(row.cells);
  }

  /**
   * Finalize currently built table and add the rendered text to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the table.
   *
   * @param { TablePrinter } param0.tableToString
   * A function to convert a table of stringified cells into a complete table.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This table should have at least this number of line breaks to separate if from any preceding block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This table should have at least this number of line breaks to separate it from any following block.
   */
  closeTable ({ tableToString, leadingLineBreaks = 2, trailingLineBreaks = 2 }) {
    const table = this._popStackItem();
    const output = tableToString(table.rows);
    if (output) {
      addText(this._stackItem, output, leadingLineBreaks, trailingLineBreaks);
    }
  }

  /**
   * Return the rendered text content of this builder.
   *
   * @returns { string }
   */
  toString () {
    return getText(this._stackItem.getRoot());
    // There should only be the root item if everything is closed properly.
  }

}

function getText (stackItem) {
  if (!(
    stackItem instanceof BlockStackItem
    || stackItem instanceof ListItemStackItem
    || stackItem instanceof TableCellStackItem
  )) {
    throw new Error('Only blocks, list items and table cells can be requested for text contents.');
  }
  return (stackItem.inlineTextBuilder.isEmpty())
    ? stackItem.rawText
    : stackItem.rawText + stackItem.inlineTextBuilder.toString();
}

function addText (stackItem, text, leadingLineBreaks, trailingLineBreaks) {
  if (!(
    stackItem instanceof BlockStackItem
    || stackItem instanceof ListItemStackItem
    || stackItem instanceof TableCellStackItem
  )) {
    throw new Error('Only blocks, list items and table cells can contain text.');
  }
  const parentText = getText(stackItem);
  const lineBreaks = Math.max(stackItem.stashedLineBreaks, leadingLineBreaks);
  stackItem.inlineTextBuilder.clear();
  if (parentText) {
    stackItem.rawText = parentText + '\n'.repeat(lineBreaks) + text;
  } else {
    stackItem.rawText = text;
    stackItem.leadingLineBreaks = lineBreaks;
  }
  stackItem.stashedLineBreaks = trailingLineBreaks;
}

/**
 * @param { string } str A string to transform.
 * @param { TransformerStackItem } transformer A transformer item (with possible continuation).
 * @returns { string }
 */
function applyTransformer (str, transformer) {
  return ((transformer) ? applyTransformer(transformer.transform(str), transformer.next) : str);
}

/**
 * Compile selectors into a decision tree,
 * return a function intended for batch processing.
 *
 * @param   { Options } [options = {}]   HtmlToText options (defaults, formatters, user options merged, deduplicated).
 * @returns { (html: string, metadata?: any) => string } Pre-configured converter function.
 * @static
 */
function compile$1 (options = {}) {
  const selectorsWithoutFormat = options.selectors.filter(s => !s.format);
  if (selectorsWithoutFormat.length) {
    throw new Error(
      'Following selectors have no specified format: ' +
      selectorsWithoutFormat.map(s => `\`${s.selector}\``).join(', ')
    );
  }
  const picker = new selderee.DecisionTree(
    options.selectors.map(s => [s.selector, s])
  ).build(pluginHtmlparser2.hp2Builder);

  if (typeof options.encodeCharacters !== 'function') {
    options.encodeCharacters = makeReplacerFromDict(options.encodeCharacters);
  }

  const baseSelectorsPicker = new selderee.DecisionTree(
    options.baseElements.selectors.map((s, i) => [s, i + 1])
  ).build(pluginHtmlparser2.hp2Builder);
  function findBaseElements (dom) {
    return findBases(dom, options, baseSelectorsPicker);
  }

  const limitedWalk = limitedDepthRecursive(
    options.limits.maxDepth,
    recursiveWalk,
    function (dom, builder) {
      builder.addInline(options.limits.ellipsis || '');
    }
  );

  return function (html, metadata = undefined) {
    return process(html, metadata, options, picker, findBaseElements, limitedWalk);
  };
}


/**
 * Convert given HTML according to preprocessed options.
 *
 * @param { string } html HTML content to convert.
 * @param { any } metadata Optional metadata for HTML document, for use in formatters.
 * @param { Options } options HtmlToText options (preprocessed).
 * @param { import('selderee').Picker<DomNode, TagDefinition> } picker
 * Tag definition picker for DOM nodes processing.
 * @param { (dom: DomNode[]) => DomNode[] } findBaseElements
 * Function to extract elements from HTML DOM
 * that will only be present in the output text.
 * @param { RecursiveCallback } walk Recursive callback.
 * @returns { string }
 */
function process (html, metadata, options, picker, findBaseElements, walk) {
  const maxInputLength = options.limits.maxInputLength;
  if (maxInputLength && html && html.length > maxInputLength) {
    console.warn(
      `Input length ${html.length} is above allowed limit of ${maxInputLength}. Truncating without ellipsis.`
    );
    html = html.substring(0, maxInputLength);
  }

  const document = htmlparser2.parseDocument(html, { decodeEntities: options.decodeEntities });
  const bases = findBaseElements(document.children);
  const builder = new BlockTextBuilder(options, picker, metadata);
  walk(bases, builder);
  return builder.toString();
}


function findBases (dom, options, baseSelectorsPicker) {
  const results = [];

  function recursiveWalk (walk, /** @type { DomNode[] } */ dom) {
    dom = dom.slice(0, options.limits.maxChildNodes);
    for (const elem of dom) {
      if (elem.type !== 'tag') {
        continue;
      }
      const pickedSelectorIndex = baseSelectorsPicker.pick1(elem);
      if (pickedSelectorIndex > 0) {
        results.push({ selectorIndex: pickedSelectorIndex, element: elem });
      } else if (elem.children) {
        walk(elem.children);
      }
      if (results.length >= options.limits.maxBaseElements) {
        return;
      }
    }
  }

  const limitedWalk = limitedDepthRecursive(
    options.limits.maxDepth,
    recursiveWalk
  );
  limitedWalk(dom);

  if (options.baseElements.orderBy !== 'occurrence') { // 'selectors'
    results.sort((a, b) => a.selectorIndex - b.selectorIndex);
  }
  return (options.baseElements.returnDomByDefault && results.length === 0)
    ? dom
    : results.map(x => x.element);
}

/**
 * Function to walk through DOM nodes and accumulate their string representations.
 *
 * @param   { RecursiveCallback } walk    Recursive callback.
 * @param   { DomNode[] }         [dom]   Nodes array to process.
 * @param   { BlockTextBuilder }  builder Passed around to accumulate output text.
 * @private
 */
function recursiveWalk (walk, dom, builder) {
  if (!dom) { return; }

  const options = builder.options;

  const tooManyChildNodes = dom.length > options.limits.maxChildNodes;
  if (tooManyChildNodes) {
    dom = dom.slice(0, options.limits.maxChildNodes);
    dom.push({
      data: options.limits.ellipsis,
      type: 'text'
    });
  }

  for (const elem of dom) {
    switch (elem.type) {
      case 'text': {
        builder.addInline(elem.data);
        break;
      }
      case 'tag': {
        const tagDefinition = builder.picker.pick1(elem);
        const format = options.formatters[tagDefinition.format];
        format(elem, walk, builder, tagDefinition.options || {});
        break;
      }
    }
  }

  return;
}

/**
 * @param { Object<string,string | false> } dict
 * A dictionary where keys are characters to replace
 * and values are replacement strings.
 *
 * First code point from dict keys is used.
 * Compound emojis with ZWJ are not supported (not until Node 16).
 *
 * @returns { ((str: string) => string) | undefined }
 */
function makeReplacerFromDict (dict) {
  if (!dict || Object.keys(dict).length === 0) {
    return undefined;
  }
  /** @type { [string, string][] } */
  const entries = Object.entries(dict).filter(([, v]) => v !== false);
  const regex = new RegExp(
    entries
      .map(([c]) => `(${unicodeEscape([...c][0])})`)
      .join('|'),
    'g'
  );
  const values = entries.map(([, v]) => v);
  const replacer = (m, ...cgs) => values[cgs.findIndex(cg => cg)];
  return (str) => str.replace(regex, replacer);
}

/**
 * Dummy formatter that discards the input and does nothing.
 *
 * @type { FormatCallback }
 */
function formatSkip (elem, walk, builder, formatOptions) {
  /* do nothing */
}

/**
 * Insert the given string literal inline instead of a tag.
 *
 * @type { FormatCallback }
 */
function formatInlineString (elem, walk, builder, formatOptions) {
  builder.addLiteral(formatOptions.string || '');
}

/**
 * Insert a block with the given string literal instead of a tag.
 *
 * @type { FormatCallback }
 */
function formatBlockString (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.addLiteral(formatOptions.string || '');
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process an inline-level element.
 *
 * @type { FormatCallback }
 */
function formatInline (elem, walk, builder, formatOptions) {
  walk(elem.children, builder);
}

/**
 * Process a block-level container.
 *
 * @type { FormatCallback }
 */
function formatBlock$1 (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

function renderOpenTag (elem) {
  const attrs = (elem.attribs && elem.attribs.length)
    ? ' ' + Object.entries(elem.attribs)
      .map(([k, v]) => ((v === '') ? k : `${k}=${v.replace(/"/g, '&quot;')}`))
      .join(' ')
    : '';
  return `<${elem.name}${attrs}>`;
}

function renderCloseTag (elem) {
  return `</${elem.name}>`;
}

/**
 * Render an element as inline HTML tag, walk through it's children.
 *
 * @type { FormatCallback }
 */
function formatInlineTag (elem, walk, builder, formatOptions) {
  builder.startNoWrap();
  builder.addLiteral(renderOpenTag(elem));
  builder.stopNoWrap();
  walk(elem.children, builder);
  builder.startNoWrap();
  builder.addLiteral(renderCloseTag(elem));
  builder.stopNoWrap();
}

/**
 * Render an element as HTML block bag, walk through it's children.
 *
 * @type { FormatCallback }
 */
function formatBlockTag (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.startNoWrap();
  builder.addLiteral(renderOpenTag(elem));
  builder.stopNoWrap();
  walk(elem.children, builder);
  builder.startNoWrap();
  builder.addLiteral(renderCloseTag(elem));
  builder.stopNoWrap();
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Render an element with all it's children as inline HTML.
 *
 * @type { FormatCallback }
 */
function formatInlineHtml (elem, walk, builder, formatOptions) {
  builder.startNoWrap();
  builder.addLiteral(
    domSerializer.render(elem, { decodeEntities: builder.options.decodeEntities })
  );
  builder.stopNoWrap();
}

/**
 * Render an element with all it's children as HTML block.
 *
 * @type { FormatCallback }
 */
function formatBlockHtml (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.startNoWrap();
  builder.addLiteral(
    domSerializer.render(elem, { decodeEntities: builder.options.decodeEntities })
  );
  builder.stopNoWrap();
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Render inline element wrapped with given strings.
 *
 * @type { FormatCallback }
 */
function formatInlineSurround (elem, walk, builder, formatOptions) {
  builder.addLiteral(formatOptions.prefix || '');
  walk(elem.children, builder);
  builder.addLiteral(formatOptions.suffix || '');
}

var genericFormatters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  block: formatBlock$1,
  blockHtml: formatBlockHtml,
  blockString: formatBlockString,
  blockTag: formatBlockTag,
  inline: formatInline,
  inlineHtml: formatInlineHtml,
  inlineString: formatInlineString,
  inlineSurround: formatInlineSurround,
  inlineTag: formatInlineTag,
  skip: formatSkip
});

function getRow (matrix, j) {
  if (!matrix[j]) { matrix[j] = []; }
  return matrix[j];
}

function findFirstVacantIndex (row, x = 0) {
  while (row[x]) { x++; }
  return x;
}

function transposeInPlace (matrix, maxSize) {
  for (let i = 0; i < maxSize; i++) {
    const rowI = getRow(matrix, i);
    for (let j = 0; j < i; j++) {
      const rowJ = getRow(matrix, j);
      if (rowI[j] || rowJ[i]) {
        const temp = rowI[j];
        rowI[j] = rowJ[i];
        rowJ[i] = temp;
      }
    }
  }
}

function putCellIntoLayout (cell, layout, baseRow, baseCol) {
  for (let r = 0; r < cell.rowspan; r++) {
    const layoutRow = getRow(layout, baseRow + r);
    for (let c = 0; c < cell.colspan; c++) {
      layoutRow[baseCol + c] = cell;
    }
  }
}

function getOrInitOffset (offsets, index) {
  if (offsets[index] === undefined) {
    offsets[index] = (index === 0) ? 0 : 1 + getOrInitOffset(offsets, index - 1);
  }
  return offsets[index];
}

function updateOffset (offsets, base, span, value) {
  offsets[base + span] = Math.max(
    getOrInitOffset(offsets, base + span),
    getOrInitOffset(offsets, base) + value
  );
}

/**
 * Render a table into a string.
 * Cells can contain multiline text and span across multiple rows and columns.
 *
 * Modifies cells to add lines array.
 *
 * @param { TablePrinterCell[][] } tableRows Table to render.
 * @param { number } rowSpacing Number of spaces between columns.
 * @param { number } colSpacing Number of empty lines between rows.
 * @returns { string }
 */
function tableToString (tableRows, rowSpacing, colSpacing) {
  const layout = [];
  let colNumber = 0;
  const rowNumber = tableRows.length;
  const rowOffsets = [0];
  // Fill the layout table and row offsets row-by-row.
  for (let j = 0; j < rowNumber; j++) {
    const layoutRow = getRow(layout, j);
    const cells = tableRows[j];
    let x = 0;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      x = findFirstVacantIndex(layoutRow, x);
      putCellIntoLayout(cell, layout, j, x);
      x += cell.colspan;
      cell.lines = cell.text.split('\n');
      const cellHeight = cell.lines.length;
      updateOffset(rowOffsets, j, cell.rowspan, cellHeight + rowSpacing);
    }
    colNumber = (layoutRow.length > colNumber) ? layoutRow.length : colNumber;
  }

  transposeInPlace(layout, (rowNumber > colNumber) ? rowNumber : colNumber);

  const outputLines = [];
  const colOffsets = [0];
  // Fill column offsets and output lines column-by-column.
  for (let x = 0; x < colNumber; x++) {
    let y = 0;
    let cell;
    const rowsInThisColumn = Math.min(rowNumber, layout[x].length);
    while (y < rowsInThisColumn) {
      cell = layout[x][y];
      if (cell) {
        if (!cell.rendered) {
          let cellWidth = 0;
          for (let j = 0; j < cell.lines.length; j++) {
            const line = cell.lines[j];
            const lineOffset = rowOffsets[y] + j;
            outputLines[lineOffset] = (outputLines[lineOffset] || '').padEnd(colOffsets[x]) + line;
            cellWidth = (line.length > cellWidth) ? line.length : cellWidth;
          }
          updateOffset(colOffsets, x, cell.colspan, cellWidth + colSpacing);
          cell.rendered = true;
        }
        y += cell.rowspan;
      } else {
        const lineOffset = rowOffsets[y];
        outputLines[lineOffset] = (outputLines[lineOffset] || '');
        y++;
      }
    }
  }

  return outputLines.join('\n');
}

/**
 * Process a line-break.
 *
 * @type { FormatCallback }
 */
function formatLineBreak (elem, walk, builder, formatOptions) {
  builder.addLineBreak();
}

/**
 * Process a `wbr` tag (word break opportunity).
 *
 * @type { FormatCallback }
 */
function formatWbr (elem, walk, builder, formatOptions) {
  builder.addWordBreakOpportunity();
}

/**
 * Process a horizontal line.
 *
 * @type { FormatCallback }
 */
function formatHorizontalLine (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.addInline('-'.repeat(formatOptions.length || builder.options.wordwrap || 40));
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process a paragraph.
 *
 * @type { FormatCallback }
 */
function formatParagraph (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process a preformatted content.
 *
 * @type { FormatCallback }
 */
function formatPre (elem, walk, builder, formatOptions) {
  builder.openBlock({
    isPre: true,
    leadingLineBreaks: formatOptions.leadingLineBreaks || 2
  });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process a heading.
 *
 * @type { FormatCallback }
 */
function formatHeading (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  if (formatOptions.uppercase !== false) {
    builder.pushWordTransform(str => str.toUpperCase());
    walk(elem.children, builder);
    builder.popWordTransform();
  } else {
    walk(elem.children, builder);
  }
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}

/**
 * Process a blockquote.
 *
 * @type { FormatCallback }
 */
function formatBlockquote (elem, walk, builder, formatOptions) {
  builder.openBlock({
    leadingLineBreaks: formatOptions.leadingLineBreaks || 2,
    reservedLineLength: 2
  });
  walk(elem.children, builder);
  builder.closeBlock({
    trailingLineBreaks: formatOptions.trailingLineBreaks || 2,
    blockTransform: str => ((formatOptions.trimEmptyLines !== false) ? trimCharacter(str, '\n') : str)
      .split('\n')
      .map(line => '> ' + line)
      .join('\n')
  });
}

function withBrackets (str, brackets) {
  if (!brackets) { return str; }

  const lbr = (typeof brackets[0] === 'string')
    ? brackets[0]
    : '[';
  const rbr = (typeof brackets[1] === 'string')
    ? brackets[1]
    : ']';
  return lbr + str + rbr;
}

function pathRewrite (path, rewriter, baseUrl, metadata, elem) {
  const modifiedPath = (typeof rewriter === 'function')
    ? rewriter(path, metadata, elem)
    : path;
  return (modifiedPath[0] === '/' && baseUrl)
    ? trimCharacterEnd(baseUrl, '/') + modifiedPath
    : modifiedPath;
}

/**
 * Process an image.
 *
 * @type { FormatCallback }
 */
function formatImage (elem, walk, builder, formatOptions) {
  const attribs = elem.attribs || {};
  const alt = (attribs.alt)
    ? attribs.alt
    : '';
  const src = (!attribs.src)
    ? ''
    : pathRewrite(attribs.src, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
  const text = (!src)
    ? alt
    : (!alt)
      ? withBrackets(src, formatOptions.linkBrackets)
      : alt + ' ' + withBrackets(src, formatOptions.linkBrackets);

  builder.addInline(text, { noWordTransform: true });
}

// a img baseUrl
// a img pathRewrite
// a img linkBrackets

// a     ignoreHref: false
//            ignoreText ?
// a     noAnchorUrl: true
//            can be replaced with selector
// a     hideLinkHrefIfSameAsText: false
//            how to compare, what to show (text, href, normalized) ?
// a     mailto protocol removed without options

// a     protocols: mailto, tel, ...
//            can be matched with selector?

// anchors, protocols - only if no pathRewrite fn is provided

// normalize-url ?

// a
// a[href^="#"] - format:skip by default
// a[href^="mailto:"] - ?

/**
 * Process an anchor.
 *
 * @type { FormatCallback }
 */
function formatAnchor (elem, walk, builder, formatOptions) {
  function getHref () {
    if (formatOptions.ignoreHref) { return ''; }
    if (!elem.attribs || !elem.attribs.href) { return ''; }
    let href = elem.attribs.href.replace(/^mailto:/, '');
    if (formatOptions.noAnchorUrl && href[0] === '#') { return ''; }
    href = pathRewrite(href, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
    return href;
  }
  const href = getHref();
  if (!href) {
    walk(elem.children, builder);
  } else {
    let text = '';
    builder.pushWordTransform(
      str => {
        if (str) { text += str; }
        return str;
      }
    );
    walk(elem.children, builder);
    builder.popWordTransform();

    const hideSameLink = formatOptions.hideLinkHrefIfSameAsText && href === text;
    if (!hideSameLink) {
      builder.addInline(
        (!text)
          ? href
          : ' ' + withBrackets(href, formatOptions.linkBrackets),
        { noWordTransform: true }
      );
    }
  }
}

/**
 * @param { DomNode }           elem               List items with their prefixes.
 * @param { RecursiveCallback } walk               Recursive callback to process child nodes.
 * @param { BlockTextBuilder }  builder            Passed around to accumulate output text.
 * @param { FormatOptions }     formatOptions      Options specific to a formatter.
 * @param { () => string }      nextPrefixCallback Function that returns increasing index each time it is called.
 */
function formatList (elem, walk, builder, formatOptions, nextPrefixCallback) {
  const isNestedList = get(elem, ['parent', 'name']) === 'li';

  // With Roman numbers, index length is not as straightforward as with Arabic numbers or letters,
  // so the dumb length comparison is the most robust way to get the correct value.
  let maxPrefixLength = 0;
  const listItems = (elem.children || [])
    // it might be more accurate to check only for html spaces here, but no significant benefit
    .filter(child => child.type !== 'text' || !/^\s*$/.test(child.data))
    .map(function (child) {
      if (child.name !== 'li') {
        return { node: child, prefix: '' };
      }
      const prefix = (isNestedList)
        ? nextPrefixCallback().trimStart()
        : nextPrefixCallback();
      if (prefix.length > maxPrefixLength) { maxPrefixLength = prefix.length; }
      return { node: child, prefix: prefix };
    });
  if (!listItems.length) { return; }

  builder.openList({
    interRowLineBreaks: 1,
    leadingLineBreaks: isNestedList ? 1 : (formatOptions.leadingLineBreaks || 2),
    maxPrefixLength: maxPrefixLength,
    prefixAlign: 'left'
  });

  for (const { node, prefix } of listItems) {
    builder.openListItem({ prefix: prefix });
    walk([node], builder);
    builder.closeListItem();
  }

  builder.closeList({ trailingLineBreaks: isNestedList ? 1 : (formatOptions.trailingLineBreaks || 2) });
}

/**
 * Process an unordered list.
 *
 * @type { FormatCallback }
 */
function formatUnorderedList (elem, walk, builder, formatOptions) {
  const prefix = formatOptions.itemPrefix || ' * ';
  return formatList(elem, walk, builder, formatOptions, () => prefix);
}

/**
 * Process an ordered list.
 *
 * @type { FormatCallback }
 */
function formatOrderedList (elem, walk, builder, formatOptions) {
  let nextIndex = Number(elem.attribs.start || '1');
  const indexFunction = getOrderedListIndexFunction(elem.attribs.type);
  const nextPrefixCallback = () => ' ' + indexFunction(nextIndex++) + '. ';
  return formatList(elem, walk, builder, formatOptions, nextPrefixCallback);
}

/**
 * Return a function that can be used to generate index markers of a specified format.
 *
 * @param   { string } [olType='1'] Marker type.
 * @returns { (i: number) => string }
 */
function getOrderedListIndexFunction (olType = '1') {
  switch (olType) {
    case 'a': return (i) => numberToLetterSequence(i, 'a');
    case 'A': return (i) => numberToLetterSequence(i, 'A');
    case 'i': return (i) => numberToRoman(i).toLowerCase();
    case 'I': return (i) => numberToRoman(i);
    case '1':
    default: return (i) => (i).toString();
  }
}

/**
 * Given a list of class and ID selectors (prefixed with '.' and '#'),
 * return them as separate lists of names without prefixes.
 *
 * @param { string[] } selectors Class and ID selectors (`[".class", "#id"]` etc).
 * @returns { { classes: string[], ids: string[] } }
 */
function splitClassesAndIds (selectors) {
  const classes = [];
  const ids = [];
  for (const selector of selectors) {
    if (selector.startsWith('.')) {
      classes.push(selector.substring(1));
    } else if (selector.startsWith('#')) {
      ids.push(selector.substring(1));
    }
  }
  return { classes: classes, ids: ids };
}

function isDataTable (attr, tables) {
  if (tables === true) { return true; }
  if (!attr) { return false; }

  const { classes, ids } = splitClassesAndIds(tables);
  const attrClasses = (attr['class'] || '').split(' ');
  const attrIds = (attr['id'] || '').split(' ');

  return attrClasses.some(x => classes.includes(x)) || attrIds.some(x => ids.includes(x));
}

/**
 * Process a table (either as a container or as a data table, depending on options).
 *
 * @type { FormatCallback }
 */
function formatTable (elem, walk, builder, formatOptions) {
  return isDataTable(elem.attribs, builder.options.tables)
    ? formatDataTable(elem, walk, builder, formatOptions)
    : formatBlock(elem, walk, builder, formatOptions);
}

function formatBlock (elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks });
}

/**
 * Process a data table.
 *
 * @type { FormatCallback }
 */
function formatDataTable (elem, walk, builder, formatOptions) {
  builder.openTable();
  elem.children.forEach(walkTable);
  builder.closeTable({
    tableToString: (rows) => tableToString(rows, formatOptions.rowSpacing ?? 0, formatOptions.colSpacing ?? 3),
    leadingLineBreaks: formatOptions.leadingLineBreaks,
    trailingLineBreaks: formatOptions.trailingLineBreaks
  });

  function formatCell (cellNode) {
    const colspan = +get(cellNode, ['attribs', 'colspan']) || 1;
    const rowspan = +get(cellNode, ['attribs', 'rowspan']) || 1;
    builder.openTableCell({ maxColumnWidth: formatOptions.maxColumnWidth });
    walk(cellNode.children, builder);
    builder.closeTableCell({ colspan: colspan, rowspan: rowspan });
  }

  function walkTable (elem) {
    if (elem.type !== 'tag') { return; }

    const formatHeaderCell = (formatOptions.uppercaseHeaderCells !== false)
      ? (cellNode) => {
        builder.pushWordTransform(str => str.toUpperCase());
        formatCell(cellNode);
        builder.popWordTransform();
      }
      : formatCell;

    switch (elem.name) {
      case 'thead':
      case 'tbody':
      case 'tfoot':
      case 'center':
        elem.children.forEach(walkTable);
        return;

      case 'tr': {
        builder.openTableRow();
        for (const childOfTr of elem.children) {
          if (childOfTr.type !== 'tag') { continue; }
          switch (childOfTr.name) {
            case 'th': {
              formatHeaderCell(childOfTr);
              break;
            }
            case 'td': {
              formatCell(childOfTr);
              break;
            }
              // do nothing
          }
        }
        builder.closeTableRow();
        break;
      }
        // do nothing
    }
  }
}

var textFormatters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  anchor: formatAnchor,
  blockquote: formatBlockquote,
  dataTable: formatDataTable,
  heading: formatHeading,
  horizontalLine: formatHorizontalLine,
  image: formatImage,
  lineBreak: formatLineBreak,
  orderedList: formatOrderedList,
  paragraph: formatParagraph,
  pre: formatPre,
  table: formatTable,
  unorderedList: formatUnorderedList,
  wbr: formatWbr
});

/**
 * Default options.
 *
 * @constant
 * @type { Options }
 * @default
 * @private
 */
const DEFAULT_OPTIONS = {
  baseElements: {
    selectors: [ 'body' ],
    orderBy: 'selectors', // 'selectors' | 'occurrence'
    returnDomByDefault: true
  },
  decodeEntities: true,
  encodeCharacters: {},
  formatters: {},
  limits: {
    ellipsis: '...',
    maxBaseElements: undefined,
    maxChildNodes: undefined,
    maxDepth: undefined,
    maxInputLength: (1 << 24) // 16_777_216
  },
  longWordSplit: {
    forceWrapOnLimit: false,
    wrapCharacters: []
  },
  preserveNewlines: false,
  selectors: [
    { selector: '*', format: 'inline' },
    {
      selector: 'a',
      format: 'anchor',
      options: {
        baseUrl: null,
        hideLinkHrefIfSameAsText: false,
        ignoreHref: false,
        linkBrackets: ['[', ']'],
        noAnchorUrl: true
      }
    },
    { selector: 'article', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'aside', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: 'blockquote',
      format: 'blockquote',
      options: { leadingLineBreaks: 2, trailingLineBreaks: 2, trimEmptyLines: true }
    },
    { selector: 'br', format: 'lineBreak' },
    { selector: 'div', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'footer', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'form', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'h1', format: 'heading', options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h2', format: 'heading', options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h3', format: 'heading', options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h4', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h5', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'h6', format: 'heading', options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: 'header', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: 'hr',
      format: 'horizontalLine',
      options: { leadingLineBreaks: 2, length: undefined, trailingLineBreaks: 2 }
    },
    {
      selector: 'img',
      format: 'image',
      options: { baseUrl: null, linkBrackets: ['[', ']'] }
    },
    { selector: 'main', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: 'nav', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: 'ol',
      format: 'orderedList',
      options: { leadingLineBreaks: 2, trailingLineBreaks: 2 }
    },
    { selector: 'p', format: 'paragraph', options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
    { selector: 'pre', format: 'pre', options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
    { selector: 'section', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: 'table',
      format: 'table',
      options: {
        colSpacing: 3,
        leadingLineBreaks: 2,
        maxColumnWidth: 60,
        rowSpacing: 0,
        trailingLineBreaks: 2,
        uppercaseHeaderCells: true
      }
    },
    {
      selector: 'ul',
      format: 'unorderedList',
      options: { itemPrefix: ' * ', leadingLineBreaks: 2, trailingLineBreaks: 2 }
    },
    { selector: 'wbr', format: 'wbr' },
  ],
  tables: [], // deprecated
  whitespaceCharacters: ' \t\r\n\f\u200b',
  wordwrap: 80
};

const concatMerge = (acc, src, options) => [...acc, ...src];
const overwriteMerge = (acc, src, options) => [...src];
const selectorsMerge = (acc, src, options) => (
  (acc.some(s => typeof s === 'object'))
    ? concatMerge(acc, src) // selectors
    : overwriteMerge(acc, src) // baseElements.selectors
);

/**
 * Preprocess options, compile selectors into a decision tree,
 * return a function intended for batch processing.
 *
 * @param   { Options } [options = {}]   HtmlToText options.
 * @returns { (html: string, metadata?: any) => string } Pre-configured converter function.
 * @static
 */
function compile (options = {}) {
  options = merge__default["default"](
    DEFAULT_OPTIONS,
    options,
    {
      arrayMerge: overwriteMerge,
      customMerge: (key) => ((key === 'selectors') ? selectorsMerge : undefined)
    }
  );
  options.formatters = Object.assign({}, genericFormatters, textFormatters, options.formatters);
  options.selectors = mergeDuplicatesPreferLast(options.selectors, (s => s.selector));

  handleDeprecatedOptions(options);

  return compile$1(options);
}

/**
 * Convert given HTML content to plain text string.
 *
 * @param   { string }  html           HTML content to convert.
 * @param   { Options } [options = {}] HtmlToText options.
 * @param   { any }     [metadata]     Optional metadata for HTML document, for use in formatters.
 * @returns { string }                 Plain text string.
 * @static
 *
 * @example
 * const { convert } = require('html-to-text');
 * const text = convert('<h1>Hello World</h1>', {
 *   wordwrap: 130
 * });
 * console.log(text); // HELLO WORLD
 */
function convert (html, options = {}, metadata = undefined) {
  return compile(options)(html, metadata);
}

/**
 * Map previously existing and now deprecated options to the new options layout.
 * This is a subject for cleanup in major releases.
 *
 * @param { Options } options HtmlToText options.
 */
function handleDeprecatedOptions (options) {
  if (options.tags) {
    const tagDefinitions = Object.entries(options.tags).map(
      ([selector, definition]) => ({ ...definition, selector: selector || '*' })
    );
    options.selectors.push(...tagDefinitions);
    options.selectors = mergeDuplicatesPreferLast(options.selectors, (s => s.selector));
  }

  function set (obj, path, value) {
    const valueKey = path.pop();
    for (const key of path) {
      let nested = obj[key];
      if (!nested) {
        nested = {};
        obj[key] = nested;
      }
      obj = nested;
    }
    obj[valueKey] = value;
  }

  if (options['baseElement']) {
    const baseElement = options['baseElement'];
    set(
      options,
      ['baseElements', 'selectors'],
      (Array.isArray(baseElement) ? baseElement : [baseElement])
    );
  }
  if (options['returnDomByDefault'] !== undefined) {
    set(options, ['baseElements', 'returnDomByDefault'], options['returnDomByDefault']);
  }

  for (const definition of options.selectors) {
    if (definition.format === 'anchor' && get(definition, ['options', 'noLinkBrackets'])) {
      set(definition, ['options', 'linkBrackets'], false);
    }
  }
}

exports.compile = compile;
exports.convert = convert;
exports.htmlToText = convert;


/***/ }),

/***/ "./node_modules/leac/lib/leac.cjs":
/*!****************************************!*\
  !*** ./node_modules/leac/lib/leac.cjs ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));const e=/\n/g;function t(t){const o=[...t.matchAll(e)].map((e=>e.index||0));o.unshift(-1);const s=n(o,0,o.length);return e=>r(s,e)}function n(e,t,r){if(r-t==1)return{offset:e[t],index:t+1};const o=Math.ceil((t+r)/2),s=n(e,t,o),l=n(e,o,r);return{offset:s.offset,low:s,high:l}}function r(e,t){return function(e){return Object.prototype.hasOwnProperty.call(e,"index")}(e)?{line:e.index,column:t-e.offset}:r(e.high.offset<t?e.high:e.low,t)}function o(e,t){return{...e,regex:s(e,t)}}function s(e,t){if(0===e.name.length)throw new Error(`Rule #${t} has empty name, which is not allowed.`);if(function(e){return Object.prototype.hasOwnProperty.call(e,"regex")}(e))return function(e){if(e.global)throw new Error(`Regular expression /${e.source}/${e.flags} contains the global flag, which is not allowed.`);return e.sticky?e:new RegExp(e.source,e.flags+"y")}(e.regex);if(function(e){return Object.prototype.hasOwnProperty.call(e,"str")}(e)){if(0===e.str.length)throw new Error(`Rule #${t} ("${e.name}") has empty "str" property, which is not allowed.`);return new RegExp(l(e.str),"y")}return new RegExp(l(e.name),"y")}function l(e){return e.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g,"\\$&")}exports.createLexer=function(e,n="",r={}){const s="string"!=typeof n?n:r,l="string"==typeof n?n:"",c=e.map(o),i=!!s.lineNumbers;return function(e,n=0){const r=i?t(e):()=>({line:0,column:0});let o=n;const s=[];e:for(;o<e.length;){let t=!1;for(const n of c){n.regex.lastIndex=o;const c=n.regex.exec(e);if(c&&c[0].length>0){if(!n.discard){const e=r(o),t="string"==typeof n.replace?c[0].replace(new RegExp(n.regex.source,n.regex.flags),n.replace):c[0];s.push({state:l,name:n.name,text:t,offset:o,len:c[0].length,line:e.line,column:e.column})}if(o=n.regex.lastIndex,t=!0,n.push){const t=n.push(e,o);s.push(...t.tokens),o=t.offset}if(n.pop)break e;break}}if(!t)break}return{tokens:s,offset:o,complete:e.length<=o}}};


/***/ }),

/***/ "./node_modules/parseley/lib/parseley.cjs":
/*!************************************************!*\
  !*** ./node_modules/parseley/lib/parseley.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var leac = __webpack_require__(/*! leac */ "./node_modules/leac/lib/leac.cjs");
var p = __webpack_require__(/*! peberminta */ "./node_modules/peberminta/lib/core.cjs");

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var p__namespace = /*#__PURE__*/_interopNamespace(p);

var ast = /*#__PURE__*/Object.freeze({
    __proto__: null
});

const ws = `(?:[ \\t\\r\\n\\f]*)`;
const nl = `(?:\\n|\\r\\n|\\r|\\f)`;
const nonascii = `[^\\x00-\\x7F]`;
const unicode = `(?:\\\\[0-9a-f]{1,6}(?:\\r\\n|[ \\n\\r\\t\\f])?)`;
const escape = `(?:\\\\[^\\n\\r\\f0-9a-f])`;
const nmstart = `(?:[_a-z]|${nonascii}|${unicode}|${escape})`;
const nmchar = `(?:[_a-z0-9-]|${nonascii}|${unicode}|${escape})`;
const name = `(?:${nmchar}+)`;
const ident = `(?:[-]?${nmstart}${nmchar}*)`;
const string1 = `'([^\\n\\r\\f\\\\']|\\\\${nl}|${nonascii}|${unicode}|${escape})*'`;
const string2 = `"([^\\n\\r\\f\\\\"]|\\\\${nl}|${nonascii}|${unicode}|${escape})*"`;
const lexSelector = leac.createLexer([
    { name: 'ws', regex: new RegExp(ws) },
    { name: 'hash', regex: new RegExp(`#${name}`, 'i') },
    { name: 'ident', regex: new RegExp(ident, 'i') },
    { name: 'str1', regex: new RegExp(string1, 'i') },
    { name: 'str2', regex: new RegExp(string2, 'i') },
    { name: '*' },
    { name: '.' },
    { name: ',' },
    { name: '[' },
    { name: ']' },
    { name: '=' },
    { name: '>' },
    { name: '|' },
    { name: '+' },
    { name: '~' },
    { name: '^' },
    { name: '$' },
]);
const lexEscapedString = leac.createLexer([
    { name: 'unicode', regex: new RegExp(unicode, 'i') },
    { name: 'escape', regex: new RegExp(escape, 'i') },
    { name: 'any', regex: new RegExp('[\\s\\S]', 'i') }
]);
function sumSpec([a0, a1, a2], [b0, b1, b2]) {
    return [a0 + b0, a1 + b1, a2 + b2];
}
function sumAllSpec(ss) {
    return ss.reduce(sumSpec, [0, 0, 0]);
}
const unicodeEscapedSequence_ = p__namespace.token((t) => t.name === 'unicode' ? String.fromCodePoint(parseInt(t.text.slice(1), 16)) : undefined);
const escapedSequence_ = p__namespace.token((t) => t.name === 'escape' ? t.text.slice(1) : undefined);
const anyChar_ = p__namespace.token((t) => t.name === 'any' ? t.text : undefined);
const escapedString_ = p__namespace.map(p__namespace.many(p__namespace.or(unicodeEscapedSequence_, escapedSequence_, anyChar_)), (cs) => cs.join(''));
function unescape(escapedString) {
    const lexerResult = lexEscapedString(escapedString);
    const result = escapedString_({ tokens: lexerResult.tokens, options: undefined }, 0);
    return result.value;
}
function literal(name) {
    return p__namespace.token((t) => t.name === name ? true : undefined);
}
const whitespace_ = p__namespace.token((t) => t.name === 'ws' ? null : undefined);
const optionalWhitespace_ = p__namespace.option(whitespace_, null);
function optionallySpaced(parser) {
    return p__namespace.middle(optionalWhitespace_, parser, optionalWhitespace_);
}
const identifier_ = p__namespace.token((t) => t.name === 'ident' ? unescape(t.text) : undefined);
const hashId_ = p__namespace.token((t) => t.name === 'hash' ? unescape(t.text.slice(1)) : undefined);
const string_ = p__namespace.token((t) => t.name.startsWith('str') ? unescape(t.text.slice(1, -1)) : undefined);
const namespace_ = p__namespace.left(p__namespace.option(identifier_, ''), literal('|'));
const qualifiedName_ = p__namespace.eitherOr(p__namespace.ab(namespace_, identifier_, (ns, name) => ({ name: name, namespace: ns })), p__namespace.map(identifier_, (name) => ({ name: name, namespace: null })));
const uniSelector_ = p__namespace.eitherOr(p__namespace.ab(namespace_, literal('*'), (ns) => ({ type: 'universal', namespace: ns, specificity: [0, 0, 0] })), p__namespace.map(literal('*'), () => ({ type: 'universal', namespace: null, specificity: [0, 0, 0] })));
const tagSelector_ = p__namespace.map(qualifiedName_, ({ name, namespace }) => ({
    type: 'tag',
    name: name,
    namespace: namespace,
    specificity: [0, 0, 1]
}));
const classSelector_ = p__namespace.ab(literal('.'), identifier_, (fullstop, name) => ({
    type: 'class',
    name: name,
    specificity: [0, 1, 0]
}));
const idSelector_ = p__namespace.map(hashId_, (name) => ({
    type: 'id',
    name: name,
    specificity: [1, 0, 0]
}));
const attrModifier_ = p__namespace.token((t) => {
    if (t.name === 'ident') {
        if (t.text === 'i' || t.text === 'I') {
            return 'i';
        }
        if (t.text === 's' || t.text === 'S') {
            return 's';
        }
    }
    return undefined;
});
const attrValue_ = p__namespace.eitherOr(p__namespace.ab(string_, p__namespace.option(p__namespace.right(optionalWhitespace_, attrModifier_), null), (v, mod) => ({ value: v, modifier: mod })), p__namespace.ab(identifier_, p__namespace.option(p__namespace.right(whitespace_, attrModifier_), null), (v, mod) => ({ value: v, modifier: mod })));
const attrMatcher_ = p__namespace.choice(p__namespace.map(literal('='), () => '='), p__namespace.ab(literal('~'), literal('='), () => '~='), p__namespace.ab(literal('|'), literal('='), () => '|='), p__namespace.ab(literal('^'), literal('='), () => '^='), p__namespace.ab(literal('$'), literal('='), () => '$='), p__namespace.ab(literal('*'), literal('='), () => '*='));
const attrPresenceSelector_ = p__namespace.abc(literal('['), optionallySpaced(qualifiedName_), literal(']'), (lbr, { name, namespace }) => ({
    type: 'attrPresence',
    name: name,
    namespace: namespace,
    specificity: [0, 1, 0]
}));
const attrValueSelector_ = p__namespace.middle(literal('['), p__namespace.abc(optionallySpaced(qualifiedName_), attrMatcher_, optionallySpaced(attrValue_), ({ name, namespace }, matcher, { value, modifier }) => ({
    type: 'attrValue',
    name: name,
    namespace: namespace,
    matcher: matcher,
    value: value,
    modifier: modifier,
    specificity: [0, 1, 0]
})), literal(']'));
const attrSelector_ = p__namespace.eitherOr(attrPresenceSelector_, attrValueSelector_);
const typeSelector_ = p__namespace.eitherOr(uniSelector_, tagSelector_);
const subclassSelector_ = p__namespace.choice(idSelector_, classSelector_, attrSelector_);
const compoundSelector_ = p__namespace.map(p__namespace.eitherOr(p__namespace.flatten(typeSelector_, p__namespace.many(subclassSelector_)), p__namespace.many1(subclassSelector_)), (ss) => {
    return {
        type: 'compound',
        list: ss,
        specificity: sumAllSpec(ss.map(s => s.specificity))
    };
});
const combinator_ = p__namespace.choice(p__namespace.map(literal('>'), () => '>'), p__namespace.map(literal('+'), () => '+'), p__namespace.map(literal('~'), () => '~'), p__namespace.ab(literal('|'), literal('|'), () => '||'));
const combinatorSeparator_ = p__namespace.eitherOr(optionallySpaced(combinator_), p__namespace.map(whitespace_, () => ' '));
const complexSelector_ = p__namespace.leftAssoc2(compoundSelector_, p__namespace.map(combinatorSeparator_, (c) => (left, right) => ({
    type: 'compound',
    list: [...right.list, { type: 'combinator', combinator: c, left: left, specificity: left.specificity }],
    specificity: sumSpec(left.specificity, right.specificity)
})), compoundSelector_);
const listSelector_ = p__namespace.leftAssoc2(p__namespace.map(complexSelector_, (s) => ({ type: 'list', list: [s] })), p__namespace.map(optionallySpaced(literal(',')), () => (acc, next) => ({ type: 'list', list: [...acc.list, next] })), complexSelector_);
function parse_(parser, str) {
    if (!(typeof str === 'string' || str instanceof String)) {
        throw new Error('Expected a selector string. Actual input is not a string!');
    }
    const lexerResult = lexSelector(str);
    if (!lexerResult.complete) {
        throw new Error(`The input "${str}" was only partially tokenized, stopped at offset ${lexerResult.offset}!\n` +
            prettyPrintPosition(str, lexerResult.offset));
    }
    const result = optionallySpaced(parser)({ tokens: lexerResult.tokens, options: undefined }, 0);
    if (!result.matched) {
        throw new Error(`No match for "${str}" input!`);
    }
    if (result.position < lexerResult.tokens.length) {
        const token = lexerResult.tokens[result.position];
        throw new Error(`The input "${str}" was only partially parsed, stopped at offset ${token.offset}!\n` +
            prettyPrintPosition(str, token.offset, token.len));
    }
    return result.value;
}
function prettyPrintPosition(str, offset, len = 1) {
    return `${str.replace(/(\t)|(\r)|(\n)/g, (m, t, r) => t ? '\u2409' : r ? '\u240d' : '\u240a')}\n${''.padEnd(offset)}${'^'.repeat(len)}`;
}
function parse(str) {
    return parse_(listSelector_, str);
}
function parse1(str) {
    return parse_(complexSelector_, str);
}

function serialize(selector) {
    if (!selector.type) {
        throw new Error('This is not an AST node.');
    }
    switch (selector.type) {
        case 'universal':
            return _serNs(selector.namespace) + '*';
        case 'tag':
            return _serNs(selector.namespace) + _serIdent(selector.name);
        case 'class':
            return '.' + _serIdent(selector.name);
        case 'id':
            return '#' + _serIdent(selector.name);
        case 'attrPresence':
            return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}]`;
        case 'attrValue':
            return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}${selector.matcher}"${_serStr(selector.value)}"${(selector.modifier ? selector.modifier : '')}]`;
        case 'combinator':
            return serialize(selector.left) + selector.combinator;
        case 'compound':
            return selector.list.reduce((acc, node) => {
                if (node.type === 'combinator') {
                    return serialize(node) + acc;
                }
                else {
                    return acc + serialize(node);
                }
            }, '');
        case 'list':
            return selector.list.map(serialize).join(',');
    }
}
function _serNs(ns) {
    return (ns || ns === '')
        ? _serIdent(ns) + '|'
        : '';
}
function _codePoint(char) {
    return `\\${char.codePointAt(0).toString(16)} `;
}
function _serIdent(str) {
    return str.replace(
    /(^[0-9])|(^-[0-9])|(^-$)|([-0-9a-zA-Z_]|[^\x00-\x7F])|(\x00)|([\x01-\x1f]|\x7f)|([\s\S])/g, (m, d1, d2, hy, safe, nl, ctrl, other) => d1 ? _codePoint(d1) :
        d2 ? '-' + _codePoint(d2.slice(1)) :
            hy ? '\\-' :
                safe ? safe :
                    nl ? '\ufffd' :
                        ctrl ? _codePoint(ctrl) :
                            '\\' + other);
}
function _serStr(str) {
    return str.replace(
    /(")|(\\)|(\x00)|([\x01-\x1f]|\x7f)/g, (m, dq, bs, nl, ctrl) => dq ? '\\"' :
        bs ? '\\\\' :
            nl ? '\ufffd' :
                _codePoint(ctrl));
}
function normalize(selector) {
    if (!selector.type) {
        throw new Error('This is not an AST node.');
    }
    switch (selector.type) {
        case 'compound': {
            selector.list.forEach(normalize);
            selector.list.sort((a, b) => _compareArrays(_getSelectorPriority(a), _getSelectorPriority(b)));
            break;
        }
        case 'combinator': {
            normalize(selector.left);
            break;
        }
        case 'list': {
            selector.list.forEach(normalize);
            selector.list.sort((a, b) => (serialize(a) < serialize(b)) ? -1 : 1);
            break;
        }
    }
    return selector;
}
function _getSelectorPriority(selector) {
    switch (selector.type) {
        case 'universal':
            return [1];
        case 'tag':
            return [1];
        case 'id':
            return [2];
        case 'class':
            return [3, selector.name];
        case 'attrPresence':
            return [4, serialize(selector)];
        case 'attrValue':
            return [5, serialize(selector)];
        case 'combinator':
            return [15, serialize(selector)];
    }
}
function compareSelectors(a, b) {
    return _compareArrays(a.specificity, b.specificity);
}
function compareSpecificity(a, b) {
    return _compareArrays(a, b);
}
function _compareArrays(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        throw new Error('Arguments must be arrays.');
    }
    const shorter = (a.length < b.length) ? a.length : b.length;
    for (let i = 0; i < shorter; i++) {
        if (a[i] === b[i]) {
            continue;
        }
        return (a[i] < b[i]) ? -1 : 1;
    }
    return a.length - b.length;
}

exports.Ast = ast;
exports.compareSelectors = compareSelectors;
exports.compareSpecificity = compareSpecificity;
exports.normalize = normalize;
exports.parse = parse;
exports.parse1 = parse1;
exports.serialize = serialize;


/***/ }),

/***/ "./node_modules/peberminta/lib/core.cjs":
/*!**********************************************!*\
  !*** ./node_modules/peberminta/lib/core.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var util = __webpack_require__(/*! ./util.cjs */ "./node_modules/peberminta/lib/util.cjs");

function emit(value) {
    return (data, i) => ({
        matched: true,
        position: i,
        value: value
    });
}
function make(
f) {
    return (data, i) => ({
        matched: true,
        position: i,
        value: f(data, i)
    });
}
function action(
f) {
    return (data, i) => {
        f(data, i);
        return {
            matched: true,
            position: i,
            value: null
        };
    };
}
function fail(
data, i) {
    return { matched: false };
}
function error(message) {
    return (data, i) => {
        throw new Error((message instanceof Function) ? message(data, i) : message);
    };
}
function token(
onToken,
onEnd) {
    return (data, i) => {
        let position = i;
        let value = undefined;
        if (i < data.tokens.length) {
            value = onToken(data.tokens[i], data, i);
            if (value !== undefined) {
                position++;
            }
        }
        else {
            onEnd?.(data, i);
        }
        return (value === undefined)
            ? { matched: false }
            : {
                matched: true,
                position: position,
                value: value
            };
    };
}
function any(data, i) {
    return (i < data.tokens.length)
        ? {
            matched: true,
            position: i + 1,
            value: data.tokens[i]
        }
        : { matched: false };
}
function satisfy(
test) {
    return (data, i) => (i < data.tokens.length && test(data.tokens[i], data, i))
        ? {
            matched: true,
            position: i + 1,
            value: data.tokens[i]
        }
        : { matched: false };
}
function mapInner(r, f) {
    return (r.matched) ? ({
        matched: true,
        position: r.position,
        value: f(r.value, r.position)
    }) : r;
}
function mapOuter(r, f) {
    return (r.matched) ? f(r) : r;
}
function map(p, mapper) {
    return (data, i) => mapInner(p(data, i), (v, j) => mapper(v, data, i, j));
}
function map1(p,
mapper) {
    return (data, i) => mapOuter(p(data, i), (m) => mapper(m, data, i));
}
function peek(p, f) {
    return (data, i) => {
        const r = p(data, i);
        f(r, data, i);
        return r;
    };
}
function option(p, def) {
    return (data, i) => {
        const r = p(data, i);
        return (r.matched)
            ? r
            : {
                matched: true,
                position: i,
                value: def
            };
    };
}
function not(p) {
    return (data, i) => {
        const r = p(data, i);
        return (r.matched)
            ? { matched: false }
            : {
                matched: true,
                position: i,
                value: true
            };
    };
}
function choice(...ps) {
    return (data, i) => {
        for (const p of ps) {
            const result = p(data, i);
            if (result.matched) {
                return result;
            }
        }
        return { matched: false };
    };
}
function otherwise(pa, pb) {
    return (data, i) => {
        const r1 = pa(data, i);
        return (r1.matched)
            ? r1
            : pb(data, i);
    };
}
function longest(...ps) {
    return (data, i) => {
        let match = undefined;
        for (const p of ps) {
            const result = p(data, i);
            if (result.matched && (!match || match.position < result.position)) {
                match = result;
            }
        }
        return match || { matched: false };
    };
}
function takeWhile(p,
test) {
    return (data, i) => {
        const values = [];
        let success = true;
        do {
            const r = p(data, i);
            if (r.matched && test(r.value, values.length + 1, data, i, r.position)) {
                values.push(r.value);
                i = r.position;
            }
            else {
                success = false;
            }
        } while (success);
        return {
            matched: true,
            position: i,
            value: values
        };
    };
}
function takeUntil(p,
test) {
    return takeWhile(p, (value, n, data, i, j) => !test(value, n, data, i, j));
}
function takeWhileP(pValue, pTest) {
    return takeWhile(pValue, (value, n, data, i) => pTest(data, i).matched);
}
function takeUntilP(pValue, pTest) {
    return takeWhile(pValue, (value, n, data, i) => !pTest(data, i).matched);
}
function many(p) {
    return takeWhile(p, () => true);
}
function many1(p) {
    return ab(p, many(p), (head, tail) => [head, ...tail]);
}
function ab(pa, pb, join) {
    return (data, i) => mapOuter(pa(data, i), (ma) => mapInner(pb(data, ma.position), (vb, j) => join(ma.value, vb, data, i, j)));
}
function left(pa, pb) {
    return ab(pa, pb, (va) => va);
}
function right(pa, pb) {
    return ab(pa, pb, (va, vb) => vb);
}
function abc(pa, pb, pc, join) {
    return (data, i) => mapOuter(pa(data, i), (ma) => mapOuter(pb(data, ma.position), (mb) => mapInner(pc(data, mb.position), (vc, j) => join(ma.value, mb.value, vc, data, i, j))));
}
function middle(pa, pb, pc) {
    return abc(pa, pb, pc, (ra, rb) => rb);
}
function all(...ps) {
    return (data, i) => {
        const result = [];
        let position = i;
        for (const p of ps) {
            const r1 = p(data, position);
            if (r1.matched) {
                result.push(r1.value);
                position = r1.position;
            }
            else {
                return { matched: false };
            }
        }
        return {
            matched: true,
            position: position,
            value: result
        };
    };
}
function skip(...ps) {
    return map(all(...ps), () => null);
}
function flatten(...ps) {
    return flatten1(all(...ps));
}
function flatten1(p) {
    return map(p, (vs) => vs.flatMap((v) => v));
}
function sepBy1(pValue, pSep) {
    return ab(pValue, many(right(pSep, pValue)), (head, tail) => [head, ...tail]);
}
function sepBy(pValue, pSep) {
    return otherwise(sepBy1(pValue, pSep), emit([]));
}
function chainReduce(acc,
f) {
    return (data, i) => {
        let loop = true;
        let acc1 = acc;
        let pos = i;
        do {
            const r = f(acc1, data, pos)(data, pos);
            if (r.matched) {
                acc1 = r.value;
                pos = r.position;
            }
            else {
                loop = false;
            }
        } while (loop);
        return {
            matched: true,
            position: pos,
            value: acc1
        };
    };
}
function reduceLeft(acc, p,
reducer) {
    return chainReduce(acc, (acc) => map(p, (v, data, i, j) => reducer(acc, v, data, i, j)));
}
function reduceRight(p, acc,
reducer) {
    return map(many(p), (vs, data, i, j) => vs.reduceRight((acc, v) => reducer(v, acc, data, i, j), acc));
}
function leftAssoc1(pLeft, pOper) {
    return chain(pLeft, (v0) => reduceLeft(v0, pOper, (acc, f) => f(acc)));
}
function rightAssoc1(pOper, pRight) {
    return ab(reduceRight(pOper, (y) => y, (f, acc) => (y) => f(acc(y))), pRight, (f, v) => f(v));
}
function leftAssoc2(pLeft, pOper, pRight) {
    return chain(pLeft, (v0) => reduceLeft(v0, ab(pOper, pRight, (f, y) => [f, y]), (acc, [f, y]) => f(acc, y)));
}
function rightAssoc2(pLeft, pOper, pRight) {
    return ab(reduceRight(ab(pLeft, pOper, (x, f) => [x, f]), (y) => y, ([x, f], acc) => (y) => f(x, acc(y))), pRight, (f, v) => f(v));
}
function condition(cond, pTrue, pFalse) {
    return (data, i) => (cond(data, i))
        ? pTrue(data, i)
        : pFalse(data, i);
}
function decide(p) {
    return (data, i) => mapOuter(p(data, i), (m1) => m1.value(data, m1.position));
}
function chain(p,
f) {
    return (data, i) => mapOuter(p(data, i), (m1) => f(m1.value, data, i, m1.position)(data, m1.position));
}
function ahead(p) {
    return (data, i) => mapOuter(p(data, i), (m1) => ({
        matched: true,
        position: i,
        value: m1.value
    }));
}
function recursive(f) {
    return function (data, i) {
        return f()(data, i);
    };
}
function start(data, i) {
    return (i !== 0)
        ? { matched: false }
        : {
            matched: true,
            position: i,
            value: true
        };
}
function end(data, i) {
    return (i < data.tokens.length)
        ? { matched: false }
        : {
            matched: true,
            position: i,
            value: true
        };
}
function remainingTokensNumber(data, i) {
    return data.tokens.length - i;
}
function parserPosition(data, i, formatToken, contextTokens = 3) {
    const len = data.tokens.length;
    const lowIndex = util.clamp(0, i - contextTokens, len - contextTokens);
    const highIndex = util.clamp(contextTokens, i + 1 + contextTokens, len);
    const tokensSlice = data.tokens.slice(lowIndex, highIndex);
    const lines = [];
    const indexWidth = String(highIndex - 1).length + 1;
    if (i < 0) {
        lines.push(`${String(i).padStart(indexWidth)} >>`);
    }
    if (0 < lowIndex) {
        lines.push('...'.padStart(indexWidth + 6));
    }
    for (let j = 0; j < tokensSlice.length; j++) {
        const index = lowIndex + j;
        lines.push(`${String(index).padStart(indexWidth)} ${(index === i ? '>' : ' ')} ${util.escapeWhitespace(formatToken(tokensSlice[j]))}`);
    }
    if (highIndex < len) {
        lines.push('...'.padStart(indexWidth + 6));
    }
    if (len <= i) {
        lines.push(`${String(i).padStart(indexWidth)} >>`);
    }
    return lines.join('\n');
}
function parse(parser, tokens, options, formatToken = JSON.stringify) {
    const data = { tokens: tokens, options: options };
    const result = parser(data, 0);
    if (!result.matched) {
        throw new Error('No match');
    }
    if (result.position < data.tokens.length) {
        throw new Error(`Partial match. Parsing stopped at:\n${parserPosition(data, result.position, formatToken)}`);
    }
    return result.value;
}
function tryParse(parser, tokens, options) {
    const result = parser({ tokens: tokens, options: options }, 0);
    return (result.matched)
        ? result.value
        : undefined;
}
function match(matcher, tokens, options) {
    const result = matcher({ tokens: tokens, options: options }, 0);
    return result.value;
}

exports.ab = ab;
exports.abc = abc;
exports.action = action;
exports.ahead = ahead;
exports.all = all;
exports.and = all;
exports.any = any;
exports.chain = chain;
exports.chainReduce = chainReduce;
exports.choice = choice;
exports.condition = condition;
exports.decide = decide;
exports.discard = skip;
exports.eitherOr = otherwise;
exports.emit = emit;
exports.end = end;
exports.eof = end;
exports.error = error;
exports.fail = fail;
exports.flatten = flatten;
exports.flatten1 = flatten1;
exports.left = left;
exports.leftAssoc1 = leftAssoc1;
exports.leftAssoc2 = leftAssoc2;
exports.longest = longest;
exports.lookAhead = ahead;
exports.make = make;
exports.many = many;
exports.many1 = many1;
exports.map = map;
exports.map1 = map1;
exports.match = match;
exports.middle = middle;
exports.not = not;
exports.of = emit;
exports.option = option;
exports.or = choice;
exports.otherwise = otherwise;
exports.parse = parse;
exports.parserPosition = parserPosition;
exports.peek = peek;
exports.recursive = recursive;
exports.reduceLeft = reduceLeft;
exports.reduceRight = reduceRight;
exports.remainingTokensNumber = remainingTokensNumber;
exports.right = right;
exports.rightAssoc1 = rightAssoc1;
exports.rightAssoc2 = rightAssoc2;
exports.satisfy = satisfy;
exports.sepBy = sepBy;
exports.sepBy1 = sepBy1;
exports.skip = skip;
exports.some = many1;
exports.start = start;
exports.takeUntil = takeUntil;
exports.takeUntilP = takeUntilP;
exports.takeWhile = takeWhile;
exports.takeWhileP = takeWhileP;
exports.token = token;
exports.tryParse = tryParse;


/***/ }),

/***/ "./node_modules/peberminta/lib/util.cjs":
/*!**********************************************!*\
  !*** ./node_modules/peberminta/lib/util.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function clamp(left, x, right) {
    return Math.max(left, Math.min(x, right));
}
function escapeWhitespace(str) {
    return str.replace(/(\t)|(\r)|(\n)/g, (m, t, r) => t ? '\\t' : r ? '\\r' : '\\n');
}

exports.clamp = clamp;
exports.escapeWhitespace = escapeWhitespace;


/***/ }),

/***/ "./node_modules/selderee/lib/selderee.cjs":
/*!************************************************!*\
  !*** ./node_modules/selderee/lib/selderee.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var parseley = __webpack_require__(/*! parseley */ "./node_modules/parseley/lib/parseley.cjs");

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var parseley__namespace = /*#__PURE__*/_interopNamespace(parseley);

var Ast = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var Types = /*#__PURE__*/Object.freeze({
    __proto__: null
});

const treeify = (nodes) => '▽\n' + treeifyArray(nodes, thinLines);
const thinLines = [['├─', '│ '], ['└─', '  ']];
const heavyLines = [['┠─', '┃ '], ['┖─', '  ']];
const doubleLines = [['╟─', '║ '], ['╙─', '  ']];
function treeifyArray(nodes, tpl = heavyLines) {
    return prefixItems(tpl, nodes.map(n => treeifyNode(n)));
}
function treeifyNode(node) {
    switch (node.type) {
        case 'terminal': {
            const vctr = node.valueContainer;
            return `◁ #${vctr.index} ${JSON.stringify(vctr.specificity)} ${vctr.value}`;
        }
        case 'tagName':
            return `◻ Tag name\n${treeifyArray(node.variants, doubleLines)}`;
        case 'attrValue':
            return `▣ Attr value: ${node.name}\n${treeifyArray(node.matchers, doubleLines)}`;
        case 'attrPresence':
            return `◨ Attr presence: ${node.name}\n${treeifyArray(node.cont)}`;
        case 'pushElement':
            return `◉ Push element: ${node.combinator}\n${treeifyArray(node.cont, thinLines)}`;
        case 'popElement':
            return `◌ Pop element\n${treeifyArray(node.cont, thinLines)}`;
        case 'variant':
            return `◇ = ${node.value}\n${treeifyArray(node.cont)}`;
        case 'matcher':
            return `◈ ${node.matcher} "${node.value}"${node.modifier || ''}\n${treeifyArray(node.cont)}`;
    }
}
function prefixItems(tpl, items) {
    return items
        .map((item, i, { length }) => prefixItem(tpl, item, i === length - 1))
        .join('\n');
}
function prefixItem(tpl, item, tail = true) {
    const tpl1 = tpl[tail ? 1 : 0];
    return tpl1[0] + item.split('\n').join('\n' + tpl1[1]);
}

var TreeifyBuilder = /*#__PURE__*/Object.freeze({
    __proto__: null,
    treeify: treeify
});

class DecisionTree {
    constructor(input) {
        this.branches = weave(toAstTerminalPairs(input));
    }
    build(builder) {
        return builder(this.branches);
    }
}
function toAstTerminalPairs(array) {
    const len = array.length;
    const results = new Array(len);
    for (let i = 0; i < len; i++) {
        const [selectorString, val] = array[i];
        const ast = preprocess(parseley__namespace.parse1(selectorString));
        results[i] = {
            ast: ast,
            terminal: {
                type: 'terminal',
                valueContainer: { index: i, value: val, specificity: ast.specificity }
            }
        };
    }
    return results;
}
function preprocess(ast) {
    reduceSelectorVariants(ast);
    parseley__namespace.normalize(ast);
    return ast;
}
function reduceSelectorVariants(ast) {
    const newList = [];
    ast.list.forEach(sel => {
        switch (sel.type) {
            case 'class':
                newList.push({
                    matcher: '~=',
                    modifier: null,
                    name: 'class',
                    namespace: null,
                    specificity: sel.specificity,
                    type: 'attrValue',
                    value: sel.name,
                });
                break;
            case 'id':
                newList.push({
                    matcher: '=',
                    modifier: null,
                    name: 'id',
                    namespace: null,
                    specificity: sel.specificity,
                    type: 'attrValue',
                    value: sel.name,
                });
                break;
            case 'combinator':
                reduceSelectorVariants(sel.left);
                newList.push(sel);
                break;
            case 'universal':
                break;
            default:
                newList.push(sel);
                break;
        }
    });
    ast.list = newList;
}
function weave(items) {
    const branches = [];
    while (items.length) {
        const topKind = findTopKey(items, (sel) => true, getSelectorKind);
        const { matches, nonmatches, empty } = breakByKind(items, topKind);
        items = nonmatches;
        if (matches.length) {
            branches.push(branchOfKind(topKind, matches));
        }
        if (empty.length) {
            branches.push(...terminate(empty));
        }
    }
    return branches;
}
function terminate(items) {
    const results = [];
    for (const item of items) {
        const terminal = item.terminal;
        if (terminal.type === 'terminal') {
            results.push(terminal);
        }
        else {
            const { matches, rest } = partition(terminal.cont, (node) => node.type === 'terminal');
            matches.forEach((node) => results.push(node));
            if (rest.length) {
                terminal.cont = rest;
                results.push(terminal);
            }
        }
    }
    return results;
}
function breakByKind(items, selectedKind) {
    const matches = [];
    const nonmatches = [];
    const empty = [];
    for (const item of items) {
        const simpsels = item.ast.list;
        if (simpsels.length) {
            const isMatch = simpsels.some(node => getSelectorKind(node) === selectedKind);
            (isMatch ? matches : nonmatches).push(item);
        }
        else {
            empty.push(item);
        }
    }
    return { matches, nonmatches, empty };
}
function getSelectorKind(sel) {
    switch (sel.type) {
        case 'attrPresence':
            return `attrPresence ${sel.name}`;
        case 'attrValue':
            return `attrValue ${sel.name}`;
        case 'combinator':
            return `combinator ${sel.combinator}`;
        default:
            return sel.type;
    }
}
function branchOfKind(kind, items) {
    if (kind === 'tag') {
        return tagNameBranch(items);
    }
    if (kind.startsWith('attrValue ')) {
        return attrValueBranch(kind.substring(10), items);
    }
    if (kind.startsWith('attrPresence ')) {
        return attrPresenceBranch(kind.substring(13), items);
    }
    if (kind === 'combinator >') {
        return combinatorBranch('>', items);
    }
    if (kind === 'combinator +') {
        return combinatorBranch('+', items);
    }
    throw new Error(`Unsupported selector kind: ${kind}`);
}
function tagNameBranch(items) {
    const groups = spliceAndGroup(items, (x) => x.type === 'tag', (x) => x.name);
    const variants = Object.entries(groups).map(([name, group]) => ({
        type: 'variant',
        value: name,
        cont: weave(group.items)
    }));
    return {
        type: 'tagName',
        variants: variants
    };
}
function attrPresenceBranch(name, items) {
    for (const item of items) {
        spliceSimpleSelector(item, (x) => (x.type === 'attrPresence') && (x.name === name));
    }
    return {
        type: 'attrPresence',
        name: name,
        cont: weave(items)
    };
}
function attrValueBranch(name, items) {
    const groups = spliceAndGroup(items, (x) => (x.type === 'attrValue') && (x.name === name), (x) => `${x.matcher} ${x.modifier || ''} ${x.value}`);
    const matchers = [];
    for (const group of Object.values(groups)) {
        const sel = group.oneSimpleSelector;
        const predicate = getAttrPredicate(sel);
        const continuation = weave(group.items);
        matchers.push({
            type: 'matcher',
            matcher: sel.matcher,
            modifier: sel.modifier,
            value: sel.value,
            predicate: predicate,
            cont: continuation
        });
    }
    return {
        type: 'attrValue',
        name: name,
        matchers: matchers
    };
}
function getAttrPredicate(sel) {
    if (sel.modifier === 'i') {
        const expected = sel.value.toLowerCase();
        switch (sel.matcher) {
            case '=':
                return (actual) => expected === actual.toLowerCase();
            case '~=':
                return (actual) => actual.toLowerCase().split(/[ \t]+/).includes(expected);
            case '^=':
                return (actual) => actual.toLowerCase().startsWith(expected);
            case '$=':
                return (actual) => actual.toLowerCase().endsWith(expected);
            case '*=':
                return (actual) => actual.toLowerCase().includes(expected);
            case '|=':
                return (actual) => {
                    const lower = actual.toLowerCase();
                    return (expected === lower) || (lower.startsWith(expected) && lower[expected.length] === '-');
                };
        }
    }
    else {
        const expected = sel.value;
        switch (sel.matcher) {
            case '=':
                return (actual) => expected === actual;
            case '~=':
                return (actual) => actual.split(/[ \t]+/).includes(expected);
            case '^=':
                return (actual) => actual.startsWith(expected);
            case '$=':
                return (actual) => actual.endsWith(expected);
            case '*=':
                return (actual) => actual.includes(expected);
            case '|=':
                return (actual) => (expected === actual) || (actual.startsWith(expected) && actual[expected.length] === '-');
        }
    }
}
function combinatorBranch(combinator, items) {
    const groups = spliceAndGroup(items, (x) => (x.type === 'combinator') && (x.combinator === combinator), (x) => parseley__namespace.serialize(x.left));
    const leftItems = [];
    for (const group of Object.values(groups)) {
        const rightCont = weave(group.items);
        const leftAst = group.oneSimpleSelector.left;
        leftItems.push({
            ast: leftAst,
            terminal: { type: 'popElement', cont: rightCont }
        });
    }
    return {
        type: 'pushElement',
        combinator: combinator,
        cont: weave(leftItems)
    };
}
function spliceAndGroup(items, predicate, keyCallback) {
    const groups = {};
    while (items.length) {
        const bestKey = findTopKey(items, predicate, keyCallback);
        const bestKeyPredicate = (sel) => predicate(sel) && keyCallback(sel) === bestKey;
        const hasBestKeyPredicate = (item) => item.ast.list.some(bestKeyPredicate);
        const { matches, rest } = partition1(items, hasBestKeyPredicate);
        let oneSimpleSelector = null;
        for (const item of matches) {
            const splicedNode = spliceSimpleSelector(item, bestKeyPredicate);
            if (!oneSimpleSelector) {
                oneSimpleSelector = splicedNode;
            }
        }
        if (oneSimpleSelector == null) {
            throw new Error('No simple selector is found.');
        }
        groups[bestKey] = { oneSimpleSelector: oneSimpleSelector, items: matches };
        items = rest;
    }
    return groups;
}
function spliceSimpleSelector(item, predicate) {
    const simpsels = item.ast.list;
    const matches = new Array(simpsels.length);
    let firstIndex = -1;
    for (let i = simpsels.length; i-- > 0;) {
        if (predicate(simpsels[i])) {
            matches[i] = true;
            firstIndex = i;
        }
    }
    if (firstIndex == -1) {
        throw new Error(`Couldn't find the required simple selector.`);
    }
    const result = simpsels[firstIndex];
    item.ast.list = simpsels.filter((sel, i) => !matches[i]);
    return result;
}
function findTopKey(items, predicate, keyCallback) {
    const candidates = {};
    for (const item of items) {
        const candidates1 = {};
        for (const node of item.ast.list.filter(predicate)) {
            candidates1[keyCallback(node)] = true;
        }
        for (const key of Object.keys(candidates1)) {
            if (candidates[key]) {
                candidates[key]++;
            }
            else {
                candidates[key] = 1;
            }
        }
    }
    let topKind = '';
    let topCounter = 0;
    for (const entry of Object.entries(candidates)) {
        if (entry[1] > topCounter) {
            topKind = entry[0];
            topCounter = entry[1];
        }
    }
    return topKind;
}
function partition(src, predicate) {
    const matches = [];
    const rest = [];
    for (const x of src) {
        if (predicate(x)) {
            matches.push(x);
        }
        else {
            rest.push(x);
        }
    }
    return { matches, rest };
}
function partition1(src, predicate) {
    const matches = [];
    const rest = [];
    for (const x of src) {
        if (predicate(x)) {
            matches.push(x);
        }
        else {
            rest.push(x);
        }
    }
    return { matches, rest };
}

class Picker {
    constructor(f) {
        this.f = f;
    }
    pickAll(el) {
        return this.f(el);
    }
    pick1(el, preferFirst = false) {
        const results = this.f(el);
        const len = results.length;
        if (len === 0) {
            return null;
        }
        if (len === 1) {
            return results[0].value;
        }
        const comparator = (preferFirst)
            ? comparatorPreferFirst
            : comparatorPreferLast;
        let result = results[0];
        for (let i = 1; i < len; i++) {
            const next = results[i];
            if (comparator(result, next)) {
                result = next;
            }
        }
        return result.value;
    }
}
function comparatorPreferFirst(acc, next) {
    const diff = parseley.compareSpecificity(next.specificity, acc.specificity);
    return diff > 0 || (diff === 0 && next.index < acc.index);
}
function comparatorPreferLast(acc, next) {
    const diff = parseley.compareSpecificity(next.specificity, acc.specificity);
    return diff > 0 || (diff === 0 && next.index > acc.index);
}

exports.Ast = Ast;
exports.DecisionTree = DecisionTree;
exports.Picker = Picker;
exports.Treeify = TreeifyBuilder;
exports.Types = Types;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
const lda = __webpack_require__(/*! ldawithmorelanguages */ "./node_modules/ldawithmorelanguages/lib/index.js")
const {
    convert
} = __webpack_require__(/*! html-to-text */ "./node_modules/html-to-text/lib/html-to-text.cjs");
const {
    splitIntoLines
} = __webpack_require__(/*! ./extract */ "./extract.js");
// const { extract } = require('./extract');

function preprocessText(text) {
    return text
        .toLowerCase() // Convert to lowercase
        .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '') // Remove emails
        .replace(/[^a-z\s]/g, '') // Remove special characters, numbers, and punctuation
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Trim leading and trailing spaces
}

function removeLongNonEnglishWords(text, maxWordLength = 15) {
    return text
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z\s]/g, '') // Remove special characters and numbers
        .replace(new RegExp(`\\b[a-z]{${maxWordLength},}\\b`, 'g'), '') // Remove very long words
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim(); // Trim leading/trailing spaces
}

function containsAIRegex(text) {
    const aiRegex = /\b(artificial intelligence|ai|machine learning|neural networks|deep learning|nlp|computer vision|robotics|data science|intelligence)\b/i;
    return aiRegex.test(text);
}

const options = {
    wordwrap: 130,
    // ...
};

const body = convert(document.body.innerHTML, options);
const clean = (str) => removeLongNonEnglishWords(preprocessText(str));
const text = clean(body);

// Extract sentences.
const documents = splitIntoLines(text, 100);

// Run LDA to get terms for 2 topics (5 terms each).
const numOfTopics = 3
const ldaResult = lda(documents, 3, 5);

const scores = ldaResult.map((topic) => {
    const scores = topic.map((term) => containsAIRegex(term.term) ? term.probability : 0);
    const sum = scores.reduce(
        (acc, current) => acc + current,
        0,
    );
    return sum;
})

const sum = scores.reduce(
    (acc, current) => acc + current,
    0,
);

if (sum > 0.1 * (numOfTopics - 1)) {
    document.open('text/html');
    document.write('<!DOCTYPE HTML><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><title>HAI</title></head><body><h1>Too much fucking AI on the net these days !!! Too much lies too !!!</h1></body></html>');
    document.close();
}
})();

/******/ })()
;
//# sourceMappingURL=lib.js.map