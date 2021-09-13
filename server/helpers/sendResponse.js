const sendResponse = (response, result) => {
    response.send({
        result
    });
}

module.exports = sendResponse;
