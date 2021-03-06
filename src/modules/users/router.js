import { ensureUser } from '../../middleware/validators'
import * as user from './controller'

export const baseUrl = '/users'

export default [
    {
        method: 'POST',
        route: '/',
        handlers: [
            ensureUser,
            user.createUser
        ]
    },
    {
        method: 'GET',
        route: '/',
        handlers: [
            user.getUsers
        ]
    },
    {
        method: 'GET',
        route: '/current',
        handlers: [
            user.getCurrentUser
        ]
    },
    {
        method: 'GET',
        route: '/:id',
        handlers: [
            user.getUser
        ]
    },
    {
        method: 'PUT',
        route: '/:id',
        handlers: [
            ensureUser,
            user.getUser,
            user.updateUser
        ]
    },
    {
        method: 'DELETE',
        route: '/:id',
        handlers: [
            ensureUser,
            user.getUser,
            user.deleteUser
        ]
    }
]
