import { Controller, Post, Body } from "@nestjs/common";
import { StripeService } from "../stripe/stripe.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post("create-payment-intent")
  async createPaymentIntent(@Body("amount") amount: number) {
    const paymentIntent = await this.stripeService.createPaymentIntent(
      amount,
      "usd" // Change currency as needed
    );
    return { clientSecret: paymentIntent.client_secret };
  }
}
