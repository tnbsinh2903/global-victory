import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Upload, UploadSchema } from './UploadSchema';
import { UploadController } from './UploadController';
import { UploadService } from './UploadService';

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Upload.name, schema: UploadSchema }],
        ),
    ],
    controllers: [UploadController],
    providers: [UploadModule, UploadService],
    exports: [UploadService, UploadModule],
})

export class UploadModule { }