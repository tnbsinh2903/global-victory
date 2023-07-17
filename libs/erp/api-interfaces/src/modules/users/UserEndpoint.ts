import { EndPointUtil } from '../../utils';

const prefixUsersModule = 'users';

const extendEndpoint = {};

export const UserEndpoints = {
  ...EndPointUtil.generateCRUD(prefixUsersModule),
  ...extendEndpoint,
};

