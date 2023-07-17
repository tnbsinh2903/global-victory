import { EndPointUtil } from '../../utils';

const prefixNewsModule = 'news';

const extendEndpoint = {};

export const NewsEndpoints = {
  ...EndPointUtil.generateCRUD(prefixNewsModule),
  ...extendEndpoint,
};
