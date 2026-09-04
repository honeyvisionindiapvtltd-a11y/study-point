import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(port, "0.0.0.0", () => console.log(`Study Point API running on port ${port}`)))
  .catch(err => { console.error(err); process.exit(1); });
