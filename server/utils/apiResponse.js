
function failedResponse(res, message, httpStatusCode = 400, errorCode = null) {
  const resp = {
    message
  };

  if (errorCode) resp['error_code'] = errorCode;

  return res.status(httpStatusCode).json(resp);
}

function successfulResponse(res, responsePayload, httpStatusCode = 200) {
  return res.status(httpStatusCode).json(responsePayload);
}

export default {
  successfulResponse,
  failedResponse
}