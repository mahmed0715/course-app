import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  instructor: string;

  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => {
    return Number(value);
  })
  price: number;
}
