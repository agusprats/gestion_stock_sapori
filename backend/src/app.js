require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001,https://gestion-stock-sapori-frontend.vercel.app").split(",");
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === "null" || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: origin not allowed"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Servir archivos estáticos desde la carpeta public/
app.use(express.static(path.join(__dirname, "../public")));

// Para rutas SPA, devolver index.html cuando no sea una ruta API
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.join(__dirname, "../public/index.html"));
  }
  next();
});

// Manejo centralizado de errores (debe ir después de rutas y static)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Sapori di Casa backend corriendo en http://localhost:${PORT}`);
});

module.exports = app;
