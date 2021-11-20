import { MissingRequiredParametersError } from '@common/common/errors/common/missing-required-parameters.error';
import { InvalidGqlSortOperationError } from '@common/common/errors/filters/invalid-gql-sort-operation.error';
import {
  GraphqlSortOperation,
  GraphqlSortOperationEnum,
} from '../enum/graphql-sort-operation.enum';

export const getGraphqlSortOperation = (
  operation: string,
): GraphqlSortOperation => {
  if (!operation) {
    throw new MissingRequiredParametersError('getGraphqlSortOperation');
  }

  const check = Object.values(GraphqlSortOperationEnum).includes(
    <GraphqlSortOperation>operation,
  );

  if (!check) {
    throw new InvalidGqlSortOperationError(operation);
  }

  return <GraphqlSortOperation>operation;
};
