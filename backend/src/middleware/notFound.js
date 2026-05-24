import { errorResponse } from "../utils/apiResponse.js";

export function notFound(req, res) {
  return errorResponse(res, `Route not found: ${req.originalUrl}`, 404);
}
