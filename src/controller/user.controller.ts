import { JwtAuthGuard } from "@/auth/auth.guard";
import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/service/user.service";

@ApiResponse({ status: 403, description: 'Forbidden.' })

@ApiBearerAuth('JWT')
@ApiTags('UserController')
@UseGuards(JwtAuthGuard)
@Controller({
    path: '/users'
})
export class UserController {
    
    @Inject(UserService)
    private readonly userService: UserService;

    @ApiOperation({ summary: 'Get user information' })
    @ApiResponse({ status: 200, description: 'User info succesfully obtained.', })
    @Get('/info')
    @UseGuards(JwtAuthGuard)
    public getUserInfo(@Req() req: any) {
        return this.userService.getUserInfo(req);
    }

}