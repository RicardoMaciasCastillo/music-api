import { JwtAuthGuard } from "@/auth/auth.guard";
import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { UserService } from "src/service/user.service";

@UseGuards(JwtAuthGuard)
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