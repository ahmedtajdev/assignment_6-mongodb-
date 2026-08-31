export const successResponse = ({
  res,
  message = "Done",
  status = 200,
  data = undefined,
  ...rest
} = {}) => {
  return res.status(status).json({ message, status, data, ...rest });
};
