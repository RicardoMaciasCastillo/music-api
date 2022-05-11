import { JwtAuthGuard } from "@/auth/auth.guard";
import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "src/service/user.service";

@Controller({
    path: '/users'
})
export class UserController {
    
    @Inject(UserService)
    private readonly userService: UserService;

    @Get('/info')
    @UseGuards(JwtAuthGuard)
    public getUserInfo(@Req() req: any) {
        return this.userService.getUserInfo(req);
    }

}