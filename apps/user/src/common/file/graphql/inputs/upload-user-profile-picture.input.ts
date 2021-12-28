import { InputType, Field } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';

@InputType()
export class UploadUserProfilePictureInput {
  @Field()
  file: FileUpload;

  @Field()
  email: string;
}
