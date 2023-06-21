import app from "./app.js";
import config from "./config.js";

app.listen(config.port, () => {
  console.log(`listen at http://localhost:${config.port}`);
});
