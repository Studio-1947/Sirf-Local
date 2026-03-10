import swaggerJsdoc from "swagger-jsdoc";

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
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
