export enum Action {
    View = 'view',
    Create = 'create',
    Update = 'update',
    Delete = 'delete',
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

export enum Permission {
    USER_VIEW = '@Permission/User/View',
    USER_CREATE = '@Permission/User/Create',
    USER_UPDATE = '@Permission/User/Update',
    USER_DELETE = '@Permission/User/Delete',
    NEWS_VIEW = '@Permission/News/View',
    NEWS_CREATE = '@Permission/News/Create',
    NEWS_UPDATE = '@Permission/News/Update',
    NEWS_DELETE = '@Permission/News/Delete',
    BANNER_VIEW = '@Permission/Banner/View',
    BANNER_CREATE = '@Permission/Banner/Create',
    BANNER_UPDATE = '@Permission/Banner/Update',
    BANNER_DELETE = '@Permission/Banner/Delete',
    ROLE_VIEW = '@Permission/Role/View',
    ROLE_CREATE = '@Permission/Role/Create',
    ROLE_UPDATE = '@Permission/Role/Update',
    ROLE_DELETE = '@Permission/Role/Delete',
    PRODUCT_VIEW = '@Permission/Product/View',
    PRODUCT_CREATE = '@Permission/Product/Create',
    PRODUCT_UPDATE = '@Permission/Product/Update',
    PRODUCT_DELETE = '@Permission/Product/Delete',
}