import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
try {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
} catch (error) {
  console.error("Error starting the server:", error);
}
