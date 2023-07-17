import { EndPointUtil } from '../../utils';

const prefixRolesModule = 'roles';

const extendEndpoint = {};

export const RoleEndpoints = {
  ...EndPointUtil.generateCRUD(prefixRolesModule),
  ...extendEndpoint,
};
