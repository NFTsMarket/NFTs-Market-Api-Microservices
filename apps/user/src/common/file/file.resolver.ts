import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQlFieldNames } from '@user/graphql/enums/graphql-label-types.enum';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared/auth/guards/jwt-auth.guard';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { UploadSelfProfilePictureInput } from './graphql/inputs/upload-self-profile-picture.input';
import { FileService } from './file.service';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(_returns => Boolean)
  public async uploadSelfProfilePicture(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    uploadSelfProfilePictureInput: UploadSelfProfilePictureInput,
  ): Promise<boolean> {
    try {
      uploadSelfProfilePictureInput.email = jwtPayload.email;

      await this.fileService.uploadPicture(uploadSelfProfilePictureInput);

      return true;
    } catch (error) {
      return false;
    }
  }

  //   public async createUser(
  //     @Args(GraphQlFieldNames.INPUT_FIELD)
  //     createUserInput: CreateUserInput,
  //   ): Promise<User> {
  //     const internalCreateUserInput: CreateUserInput = {
  //       ...createUserInput,
  //       authType: AuthType.PASSWORD,
  //       socialProvider: AuthProviders.Local,
  //     };

  //     return await this.userService.createEntity(internalCreateUserInput);
  //   }
}
