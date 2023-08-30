const success = (statusCode, result) => {
  return {
    status: "ok",
    result,
    statusCode: statusCode,
  };
};
const error = (statusCode, message) => {
  return {
    status: "error",
    message,
    statusCode: statusCode,
  };
};
module.exports = {
  success,
  error,
};
