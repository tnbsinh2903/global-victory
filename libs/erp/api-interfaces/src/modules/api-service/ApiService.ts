const SERVER = 'http://localhost:3333/api';
export const CLIENT = 'http://localhost:4200';
export const HOST_API = 'http://localhost:3333';

export const GET_ALL_USER = SERVER + '/users';
export const GET_USER_BY_EMAIL = SERVER + '/users/id/';
export const REGISTER_USER = SERVER + '/users';
export const UPDATE_USER = SERVER + '/users/id/';
export const DELETE_USER = SERVER + '/users/id/';
export const UPLOAD_AVATAR_USER = SERVER + '/users/upload';

export const GET_ALL_NEWS = SERVER + '/news';
export const SORT_AND_FILTER = SERVER + '/news/sort'
export const GET_NEWS_DETAILS_BY_ID = SERVER + '/news/id';
export const CREATE_NEWS = SERVER + '/news';
export const UPDATE_NEWS = SERVER + '/news/id';
export const DELETE_NEWS = SERVER + '/news/id';
export const UPLOAD_IMAGE_NEWS = SERVER + '/news/upload';