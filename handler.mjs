import serverlessExpress from "@vendia/serverless-express";
import { service } from "./src/service.mjs";

const listen = () => {
  const PORT = process.env.SVC_PORT ?? 3000;
  service.listen(PORT, () =>
    console.log(`Service at: http://localhost:${PORT}`)
  );
};

const lambda = serverlessExpress({ app: service });

export { listen, lambda };