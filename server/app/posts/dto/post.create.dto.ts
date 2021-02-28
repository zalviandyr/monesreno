import { IsNotEmpty } from 'class-validator';

export class PostCreateDto {
  @IsNotEmpty()
  post?: string;
}
