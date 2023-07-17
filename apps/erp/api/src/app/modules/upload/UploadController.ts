import { BannerEndpoints, NewsEndpoints, UserEndpoints } from '@global-victory/erp/api-interfaces';
import { BadRequestException, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { UploadService } from './UploadService';
import { v4 as uuidv4 } from 'uuid';
import { PATH_FILE_AVATAR_UPLOAD, PATH_FILE_BANNER_UPLOAD, PATH_FILE_NEWS_UPLOAD } from 'libs/erp/api-interfaces/src/_shared/pathFile';
import { Upload_DetailDTO, UploadEndpoints } from '@global-victory/erp/api-interfaces'

@Controller()
export class UploadController {

    constructor(private uploadService: UploadService) { }

    @Get(UploadEndpoints.Find)
    async findAllUpload(): Promise<Upload_DetailDTO[]> {
        return this.uploadService.findAll();
    }

    @Post(`${UserEndpoints.UploadFile}|${NewsEndpoints.UploadFile}|${BannerEndpoints.UploadFile}`)
    @UseInterceptors(FileInterceptor('upload', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                let endpoint = req.originalUrl.split('api/').pop();
                let uploadPath = '';
                if (endpoint === UserEndpoints.UploadFile) {
                    uploadPath = PATH_FILE_AVATAR_UPLOAD;
                } else if (endpoint === NewsEndpoints.UploadFile) {
                    uploadPath = PATH_FILE_NEWS_UPLOAD;
                }
                else if (endpoint === BannerEndpoints.UploadFile) {
                    uploadPath = PATH_FILE_BANNER_UPLOAD;
                }
                else {
                    return cb(new BadRequestException('Invalid endpoint'), null);
                }
                cb(null, uploadPath);
            },
            filename: (req, upload, callback) => {
                const generator_name = (uuidv4() + path.parse(upload.originalname).name.replace(/\s/g, '')).trim();
                const extension = path.parse(upload.originalname).ext;
                const name = (generator_name + extension).trim()
                callback(null, name)
            },
        }),
        limits: { fileSize: 1024 * 1024 * 2 },

        fileFilter(req, file, callback) {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new BadRequestException('Only image files are allowed!'), false);
            }
            callback(null, true)
        },
    }
    ))

    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Object> {
        return await this.uploadService.upload(file);
    }
}