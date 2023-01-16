/**
 * Middleware to log hello
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const middleware = (request, response, next) => {
  console.log("Hello from middleware!");
  next();
};

export { middleware };
