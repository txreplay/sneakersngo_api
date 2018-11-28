const sendBodyError = (res) => {
    return res.json({
        message: 'No body data provided',
        name: 'bodyError',
        err: null,
        data: null,
    });
};

const sendFieldsError = (res, extra, miss) => {
    return res.json({
        message: 'Bad fields provided',
        name: 'fieldsError',
        err: { miss, extra },
        data: null,
    });
};

const sendApiSuccess = (res, data, successMessage) => {
    return res.send({
        message: successMessage,
        err: null,
        data: data,
    })
};

const sendApiError = (res, error, errorMessage) => {
    return res.json({
        message: errorMessage,
        err: true,
        data: error,
    });
};

module.exports = {
    sendBodyError,
    sendFieldsError,
    sendApiSuccess,
    sendApiError
};