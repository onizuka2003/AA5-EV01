const express = require("express");
const router = express.Router();

const demoUser = {
  usuario: "alejandro",
  clave: "sportvar123",
  rol: "investigador"
};

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { usuario, clave } = req.body;

  if (usuario === demoUser.usuario && clave === demoUser.clave) {
    req.session.user = {
      usuario: demoUser.usuario,
      rol: demoUser.rol
    };

    return res.json({
      ok: true,
      message: "Inicio de sesión exitoso.",
      user: req.session.user
    });
  }

  return res.status(401).json({
    ok: false,
    message: "Credenciales inválidas."
  });
});

// GET /api/auth/validate
router.get("/validate", (req, res) => {
  if (req.session && req.session.user) {
    return res.json({
      ok: true,
      authenticated: true,
      user: req.session.user
    });
  }

  return res.status(401).json({
    ok: false,
    authenticated: false,
    message: "No existe una sesión activa."
  });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    return res.json({
      ok: true,
      message: "Sesión cerrada correctamente."
    });
  });
});

module.exports = router;
