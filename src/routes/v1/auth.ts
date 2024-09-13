import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import AuthController from "../../controllers/auth";
import { apiKeyAuthMiddleware, isAdmin, protect } from "../../middlewares/authenticate";
import { loginSchema, registerAccountSchema, updateClientSchema } from "../../utils/validation-schema";

const authRoutes: Router = Router();
const authController = new AuthController();

authRoutes.post(
  "/login",
  apiKeyAuthMiddleware,
  celebrate({ body: loginSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const loginData = request.body;
    const data = await authController.loginUser(loginData);
    response.status(200).json(data).end();
  })
);

authRoutes.post(
  "/register",
  apiKeyAuthMiddleware,
  celebrate({ body: registerAccountSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const userData = request.body;
    const data = await authController.registerUser(userData);
    response.status(201).json(data).end();
  })
);

// Admin routes
authRoutes.get(
  "/admin/clients",
  protect,
  isAdmin,
  asyncHandler(async (_request: Request, response: Response) => {
    const data = await authController.listClients();
    response.status(200).json(data).end();
  })
);

authRoutes.put(
  "/admin/clients/:id",
  protect,
  isAdmin,
  celebrate({ body: updateClientSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const { id } = request.params;
    const updateData = request.body;
    const data = await authController.updateClient(id, updateData);
    response.status(200).json(data).end();
  })
);

authRoutes.delete(
  "/admin/clients/:id",
  protect,
  isAdmin,
  asyncHandler(async (request: Request, response: Response) => {
    const { id } = request.params;
    const data = await authController.deleteClient(id);
    response.status(200).json(data).end();
  })
);

export { authRoutes };
