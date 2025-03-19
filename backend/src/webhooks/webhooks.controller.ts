import { Controller, Post, RawBody, Req } from "@nestjs/common";
import { StripeService } from "../stripe/stripe.service";
import { Request } from "express";

@Controller("webhooks")
export class WebhooksController {
  constructor(private readonly stripeService: StripeService) {}

  @Post("stripe")
  async handleStripeWebhook(@Req() req: Request, @RawBody() body: Buffer) {
    const signature = req.headers["stripe-signature"];
    const event = this.stripeService.constructEvent(body, signature);

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true };
  }
}
