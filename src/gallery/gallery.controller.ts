import { Controller, Post, UseInterceptors } from '@nestjs/common';

@Controller('gallery')
export class GalleryController {
  constructor() {}

  // @Post('/')
  // @UseInterceptors(FileInterceptor('file'))
  // async upload(@UploadedFile() file: Express.Multer.File){
  //     console.log(file)
  // }
}

// multer 써서 파일 업로드해가지고 속성 까서 업로드 이미지의 찍힌 시간 순으로 정렬 가능한지 가늠하기
