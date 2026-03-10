import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sirf-Local API Documentation",
      version: "1.0.0",
      description:
        "API documentation for Sirf-Local backend service including Razorpay integration.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/*.ts"),
    path.join(__dirname, "../controllers/*.ts"),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
