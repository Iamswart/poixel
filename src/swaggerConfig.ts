import { OpenAPIV3 } from "openapi-types";
import config from "./config";

const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for the backend system.",
  },
  servers: [
    {
      url: config.localServerUrl,
      description: "Local server"
    },
    {
      url: config.productionServerUrl,
      description: "Production server"
    }
  ],
  paths: {
    "/auth/login": {
      post: {
        summary: "Login a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid credentials",
          },
        },
      },
    },
    "/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Register",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid data",
          },
        },
      },
    },
    "/admin/clients": {
      get: {
        summary: "List all clients",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Clients retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Client",
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/admin/clients/{id}": {
      put: {
        summary: "Update a client's details",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateClient",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Client updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Client",
                },
              },
            },
          },
          400: {
            description: "Invalid data",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
      delete: {
        summary: "Delete a client",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Client deleted successfully",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "Client not found",
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Login: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
          },
        },
        required: ["email", "password"],
      },
      Register: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            minLength: 8,
          },
          businessType: {
            type: "string",
            description: "The type of business the client is associated with",
          },
        },
        required: ["name", "email", "password"],
      },
      LoginResponse: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              email: {
                type: "string",
              },
            },
          },
          accessToken: {
            type: "string",
          },
          refreshToken: {
            type: "string",
          },
        },
      },
      RegisterResponse: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              email: {
                type: "string",
              },
            },
          },
          accessToken: {
            type: "string",
          },
          refreshToken: {
            type: "string",
          },
        },
      },
      Client: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          businessType: {
            type: "string",
          },
        },
      },
      UpdateClient: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          businessType: {
            type: "string",
          },
        },
      },
    },
  },
};

export default swaggerDocument;
