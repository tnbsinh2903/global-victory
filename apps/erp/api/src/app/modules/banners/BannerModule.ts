import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BannerController } from "./BannerController";
import { Banner, BannerSchema } from "./bannerSchema";
import { BannerService } from "./BannerService";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "../users";
import { User, UserSchema } from "../users/UserSchema";

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature(
            [{ name: Banner.name, schema: BannerSchema }, { name: User.name, schema: UserSchema }],
        ),
    ],
    controllers: [BannerController],
    providers: [BannerService, JwtService],
    exports: [BannerService]
})
export class BannerModule { }