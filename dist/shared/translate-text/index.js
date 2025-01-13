"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "translateText", {
    enumerable: true,
    get: function() {
        return translateText;
    }
});
const _translatte = /*#__PURE__*/ _interop_require_default(require("translatte"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const translateText = async (message)=>{
    try {
        const text = await (0, _translatte.default)(message, {
            to: 'pt',
            from: 'en'
        }).then((data)=>data.text);
        return text;
    } catch (error) {
        return message;
    }
};

//# sourceMappingURL=index.js.map