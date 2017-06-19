function BaseResult() {
  let operationalIssue = undefined;
  const validationIssues = [];

  function hasOperationalIssue() {
    return !!operationalIssue;
  }

  function hasValidationIssue() {
    return validationIssues.length > 0;
  }

  function hasError() {
    return hasOperationalIssue() || hasValidationIssue();
  }

  function addExceptionThrownIssue(exception) {
    console.error(exception);
    operationalIssue = exception;
  }

  return {
    hasError,
    addExceptionThrownIssue,
    get operationalIssue() {
      return operationalIssue;
    }
  };
}

const Result = function() {};
Result.prototype = BaseResult.prototype;
export default Result;
