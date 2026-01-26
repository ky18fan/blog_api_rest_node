const validator = require("validator");

const validateArticle = (parameters) => {
    let validateTitle = !validator.isEmpty(parameters.title) &&
                        validator.isLength(parameters.title, {min: 5, max: undefined});
    let validateContent = !validator.isEmpty(parameters.content);
    if(!validateTitle || !validateContent) {
        throw new Error("Data hasn't been validated!")
    };
};

module.exports = {
    validateArticle
}