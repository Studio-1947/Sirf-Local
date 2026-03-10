import apiClient from "../lib/api/api-client";
import {
  CreateOrderRequest,
  RazorpayOrder,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from "../types/api.types";

export const paymentService = {
  /**
   * Creates a new Razorpay order
   * @param data { amount: number (in Rupees), currency: string, receipt: string }
   */
  createOrder: async (data: CreateOrderRequest): Promise<RazorpayOrder> => {
    const response = await apiClient.post<RazorpayOrder>(
      "/payment/orders",
      data,
    );
    return response.data;
  },

  /**
   * Verifies the Razorpay payment signature
   * @param data { razorpay_order_id, razorpay_payment_id, razorpay_signature }
   */
  verifyPayment: async (
    data: VerifyPaymentRequest,
  ): Promise<VerifyPaymentResponse> => {
    const response = await apiClient.post<VerifyPaymentResponse>(
      "/payment/verify",
      data,
    );
    return response.data;
  },
};
