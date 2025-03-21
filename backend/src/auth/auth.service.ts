import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    console.log("Login payload", payload, user);
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
