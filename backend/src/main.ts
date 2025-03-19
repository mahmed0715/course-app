import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("LMS Platform API")
    .setDescription("API documentation for the LMS Platform")
    .setVersion("1.0")
    .addBearerAuth() // Enable JWT authentication in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors();
  app.useStaticAssets(join(__dirname, "..", "uploads"));
  await app.listen(5000);
}
bootstrap();
