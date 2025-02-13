import app from "./config/server.js";
import { PORT } from "./config/env.js";

app.listen(PORT, () => {
  console.log(`Servidor funcioando sobre el puerto : ${PORT}`);
});
