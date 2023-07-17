import { EndPointUtil } from '../../utils';

const prefixUsersModule = 'upload';

const extendEndpoint = {};

export const UploadEndpoints = {
    ...EndPointUtil.generateCRUD(prefixUsersModule),
    ...extendEndpoint,
};

