export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found/iska hubi chp`);
  error.statusCode = 404;
  next(error);
};
