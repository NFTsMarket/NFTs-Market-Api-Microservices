import { CommonEnvKey } from "@shared/config/common-env-key.enum";
import { Env } from "@shared/config/env.enum";
import { ConfigService } from "@nestjs/config";
import { IPubSubClientModuleAsyncOptions } from "../interfaces/pub-sub-client-module-async-options.interface";
import { PubSubClientOptions } from "../interfaces/pub-sub-client-options.interface";

export const getPubSubModuleAsyncConfig = (
  serviceName: string
): IPubSubClientModuleAsyncOptions => {
  return {
    isGlobal: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService): PubSubClientOptions => {
      const projectId = configService.get(CommonEnvKey.PUB_SUB_PROJECT_ID);
      const apiEndpoint = configService.get(CommonEnvKey.PUB_SUB_API_ENDPOINT);
      const env = configService.get(CommonEnvKey.NODE_ENV) ?? Env.DEVELOP;

      const credential = configService.get(
        CommonEnvKey.GOOGLE_PUB_SUB_CREDENTIAL
      );

      const topicSeeds = [env];

      if (credential) {
        const parsedCredentials = JSON.parse(credential);

        return {
          clientId: serviceName,
          topicSeeds,
          pubSubConfig: {
            projectId: projectId,
            credentials: parsedCredentials,
          },
        };
      }

      return {
        clientId: serviceName,
        topicSeeds,
        pubSubConfig: {
          projectId: projectId,
          apiEndpoint,
        },
      };
    },
  };
};
