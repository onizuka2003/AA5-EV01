function ensureAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }

  return res.status(401).json({
    ok: false,
    message: "Sesión no válida. Debe iniciar sesión."
  });
}

module.exports = { ensureAuth };
