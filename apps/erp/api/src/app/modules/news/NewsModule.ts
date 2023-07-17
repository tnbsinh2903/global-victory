import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { NewsController } from "./NewsController";
import { News, NewsSchema } from "./NewsSchema";
import { NewsService } from "./NewsService";
import { JwtService } from "@nestjs/jwt";
import { User, UserSchema } from "../users/UserSchema";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: News.name, schema: NewsSchema },{ name: User.name, schema: UserSchema }],
        ),
    ],
    controllers: [NewsController],
    providers: [NewsService,JwtService],
    exports: [NewsService],
})

export class NewsModule { }