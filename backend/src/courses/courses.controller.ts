import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("courses") // Group endpoints under "courses" in Swagger
@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protect this route with JWT
  @ApiBearerAuth() // Indicate that this endpoint requires authentication
  @ApiOperation({ summary: "Create a new course" })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: "Course created successfully." })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  create(@Body() createCourseDto: CreateCourseDto, @Request() req) {
    return this.coursesService.create(createCourseDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: "Get all courses" })
  @ApiResponse({ status: 200, description: "List of courses." })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a course by ID" })
  @ApiParam({ name: "id", description: "Course ID", type: Number })
  @ApiResponse({ status: 200, description: "Course found." })
  @ApiResponse({ status: 404, description: "Course not found." })
  findOne(@Param("id") id: string) {
    return this.coursesService.findOne(+id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard) // Protect this route with JWT
  @ApiBearerAuth() // Indicate that this endpoint requires authentication
  @ApiOperation({ summary: "Update a course" })
  @ApiParam({ name: "id", description: "Course ID", type: Number })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: "Course updated successfully." })
  @ApiResponse({ status: 404, description: "Course not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard) // Protect this route with JWT
  @ApiBearerAuth() // Indicate that this endpoint requires authentication
  @ApiOperation({ summary: "Delete a course" })
  @ApiParam({ name: "id", description: "Course ID", type: Number })
  @ApiResponse({ status: 200, description: "Course deleted successfully." })
  @ApiResponse({ status: 404, description: "Course not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  remove(@Param("id") id: string) {
    return this.coursesService.remove(+id);
  }
}
