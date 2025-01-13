"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "exceptionValidation", {
    enumerable: true,
    get: function() {
        return exceptionValidation;
    }
});
const _shared = require("../shared");
const _zod = require("zod");
const _axios = require("axios");
const error = async (err)=>{
    if (typeof err.message === 'string') {
        return [
            await (0, _shared.translateText)(err.message)
        ];
    }
    if (err.message instanceof Array) {
        const translatedErrors = await Promise.all(err.message.map((error)=>(0, _shared.translateText)(error)));
        return translatedErrors;
    }
    if (err.message instanceof Object) {
        const translatedErrors = await Promise.all(Object.values(err.message).map((error)=>(0, _shared.translateText)(error)));
        return translatedErrors;
    }
    return err;
};
const exceptionValidation = async (err, req, res, next)=>{
    if (err instanceof _zod.ZodError) {
        return res.status(400).json({
            errors: err.errors.map((error)=>`${error.path} ${error.message}`)
        });
    }
    if (err instanceof _axios.AxiosError) {
        return res.status(err.response?.status || 500).json({
            errors: await error(err.response?.data)
        });
    }
    return res.status(500).json({
        errors: await error(err)
    });
};

//# sourceMappingURL=exceptionValidation.js.map