import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "your-secret-key", // Replace with your actual secret key
    });
  }

  async validate(payload: any) {
    // The payload contains the decoded JWT token
    return this.usersService.findOne(payload.sub); // Fetch user from the database
  }
}
