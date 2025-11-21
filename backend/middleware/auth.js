export const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized access" });

  const base64 = authHeader.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString();
  const [user, pass] = decoded.split(':');

  if (user === "admin" && pass === "password123") return next();

  return res.status(401).json({ error: "Unauthorized access" });
};
