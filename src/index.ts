import { server } from "./server/Server";

server.listen(3333, () =>
  console.log("🚀 Server is running on http://localhost:3333")
);
