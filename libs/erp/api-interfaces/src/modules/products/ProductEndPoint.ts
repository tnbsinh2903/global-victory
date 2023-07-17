import { EndPointUtil } from '../../utils';

const prefixProductModule = 'products';

const extendEndpoint = {};

export const ProductEndpoints = {
    ...EndPointUtil.generateCRUD(prefixProductModule),
    ...extendEndpoint,
};