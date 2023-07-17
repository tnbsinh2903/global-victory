export type Permission = {
    id: string;
    name:string;
}

export const APP_CONSTANT_PERMISSIONS = [
    {
        id: '@Permission/User/View',
        name: 'View a users list'
    },
    {
        id: '@Permission/User/Create',
        name: 'Create user'
    },
    {
        id: '@Permission/User/Update',
        name: 'Update user'
    },
    {
        id: '@Permission/User/Delete',
        name: 'Delete user'
    },
    {
        id: '@Permission/Role/View',
        name: 'View a roles list'
    },
    {
        id: '@Permission/Role/Create',
        name: 'Create role'
    },
    {
        id: '@Permission/Role/Update',
        name: 'Update role'
    },
    {
        id: '@Permission/Role/Delete',
        name: 'Delete role'
    },
    {
        id: '@Permission/News/View',
        name: 'View a news list'
    },
    {
        id: '@Permission/News/Create',
        name: 'Create news'
    },
    {
        id: '@Permission/News/Update',
        name: 'Update news'
    },
    {
        id: '@Permission/News/Delete',
        name: 'Delete news'
    },
    {
        id: '@Permission/Banner/View',
        name: 'View a banners list'
    },
    {
        id: '@Permission/Banner/Create',
        name: 'Create banner'
    },
    {
        id: '@Permission/Banner/Update',
        name: 'Update Banner'
    },
    {
        id: '@Permission/Banner/Delete',
        name: 'Delete Banner'
    },
    {
        id: '@Permission/Product/View',
        name: 'View a products list'
    },
    {
        id: '@Permission/Product/Create',
        name: 'Create product'
    },
    {
        id: '@Permission/Product/Update',
        name: 'Update product'
    },
    {
        id: '@Permission/Product/Delete',
        name: 'Delete product'
    }
];