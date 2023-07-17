import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "../users";
import { User, UserSchema } from "../users/UserSchema";
import { Product, ProductSchema } from "./ProductSchema";
import { ProductController } from "./ProductController";
import { ProductService } from "./ProductService";

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature(
            [{ name: Product.name, schema: ProductSchema }, { name: User.name, schema: UserSchema }],
        ),
    ],
    controllers: [ProductController],
    providers: [ProductService, JwtService],
    exports: [ProductService]
})
export class ProductModule { }