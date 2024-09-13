import { Router } from "express";
import { authRoutes } from "./auth";
import swaggerSpec from "../../swaggerConfig";
import swaggerUi from "swagger-ui-express";

const v1Routes: Router = Router();

v1Routes.use("/", authRoutes);

v1Routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export { v1Routes };
