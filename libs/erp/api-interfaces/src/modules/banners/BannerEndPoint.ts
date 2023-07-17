import { EndPointUtil } from '../../utils';

const prefixBannerModule = 'banners';

const extendEndpoint = {};

export const BannerEndpoints = {
    ...EndPointUtil.generateCRUD(prefixBannerModule),
    ...extendEndpoint,
};