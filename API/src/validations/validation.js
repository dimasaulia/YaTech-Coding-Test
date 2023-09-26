const validate = (schemaToValidate, req) => {
    const result = schemaToValidate.validate(req);
    if (result.error) {
        throw result.error;
    } else {
        return result.value;
    }
};

module.exports = { validate };
