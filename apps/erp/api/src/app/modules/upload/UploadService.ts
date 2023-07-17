import { Injectable, Logger, UploadedFile } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Upload, } from "./UploadSchema";
import { Upload_DetailDTO } from "@global-victory/erp/api-interfaces";

@Injectable()

export class UploadService {

    constructor(@InjectModel(Upload.name) private uploadModel: Model<Upload>) { }

    async findAll(): Promise<Upload_DetailDTO[]> {
        try {
            const upload: Upload[] = await this.uploadModel.find();
            const uploadFile: Upload_DetailDTO[] = upload.map((fileUpload: Upload) => ({
                original_name: fileUpload.OriginalName,
                new_name: fileUpload.NewName,
                created_at: fileUpload.CreatedAt,
                type_file: fileUpload.TypeFile
            }));
            return uploadFile;
        } catch (error) {
            Logger.error(error)
        }
    }

    async upload(@UploadedFile() file: Express.Multer.File): Promise<Object> {
        try {
            const entity: Upload = {
                _id: new Types.ObjectId(),
                OriginalName: file.originalname,
                NewName: file.filename,
                CreatedAt: new Date(),
                TypeFile: file.mimetype
            }
            await new this.uploadModel(entity).save();
            return ({ imageFileName: file.filename });
        } catch (error) {
            Logger.error(error)
        }
    }
}