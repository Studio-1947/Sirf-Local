import { Router } from "express";
import {
  createOrder,
  verifyPayment,
  getKeyId,
} from "../controllers/payment.controller";

const router = Router();

router.post("/orders", createOrder);
router.post("/verify", verifyPayment);
router.get("/key-id", getKeyId);

export default router;
