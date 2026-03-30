const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const variantRoutes = require("./routes/variantRoutes");

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));

app.use(session({
  secret: "sportvar_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}));

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API de SportVar funcionando correctamente."
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/variants", variantRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
