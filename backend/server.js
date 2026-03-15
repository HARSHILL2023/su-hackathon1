const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("/", (req, res) => res.json({ status: "SmartFactory API Running", time: new Date() }));

app.get("/test", (req, res) => res.json({ message: "Server is alive" }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/factory", require("./routes/factoryRoutes"));
app.use("/api/machine", require("./routes/machineRoutes"));
app.use("/api/production", require("./routes/productionRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/whatsapp", require("./routes/whatsapp"));
app.use("/api/owner", require("./routes/ownerRoutes"));
app.use("/api/fyp", require("./routes/fypRoutes"));
app.use("/api/govassist", require("./routes/govassist"));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Owner Server running on port ${PORT}`));