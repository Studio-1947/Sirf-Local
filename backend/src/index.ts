import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payment.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Root route - Stylish landing page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sirf-Local Backend</title>
        <style>
            body { 
                margin: 0; 
                padding: 0; 
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                background: radial-gradient(circle at top right, #1a1a2e, #16213e);
                color: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                overflow: hidden;
            }
            .container {
                text-align: center;
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(10px);
                padding: 3rem;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                transform: translateY(0);
                transition: transform 0.3s ease;
            }
            .container:hover {
                transform: translateY(-5px);
            }
            h1 {
                font-size: 3.5rem;
                margin-bottom: 1rem;
                background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: -1px;
            }
            p {
                font-size: 1.2rem;
                color: #94a3b8;
                margin-bottom: 2rem;
            }
            .status {
                display: inline-flex;
                align-items: center;
                background: rgba(34, 197, 94, 0.1);
                color: #4ade80;
                padding: 0.5rem 1rem;
                border-radius: 9999px;
                font-weight: 500;
                font-size: 0.9rem;
            }
            .status::before {
                content: '';
                width: 8px;
                height: 8px;
                background: #4ade80;
                border-radius: 50%;
                margin-right: 10px;
                box-shadow: 0 0 10px #4ade80;
            }
            .links {
                margin-top: 2rem;
            }
            .btn {
                text-decoration: none;
                background: #3b82f6;
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 10px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .btn:hover {
                background: #2563eb;
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="status">System Active</div>
            <h1>Sirf-Local Backend</h1>
            <p>Your premium API bridge is running smoothly.</p>
            <div class="links">
                <a href="/api-docs" class="btn">Explore API Docs</a>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Routes
app.use("/api/payment", paymentRoutes);

// Health check
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Sirf-Local Backend is running" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res
      .status(500)
      .json({ message: "Something went wrong!", error: err.message });
  },
);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
