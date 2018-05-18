import { ensureUser } from '../../middleware/validators'
import * as tags from './controller'

export const baseUrl = '/tags'

export default [
    {
        method: 'POST',
        route: '/create',
        handlers: [
            ensureUser,
            tags.createTag
        ]
    },
    {
        method: 'GET',
        route: '/list',
        handlers: [
            tags.listTags
        ]
    },
    {
        method: 'GET',
        route: '/read/:id',
        handlers: [
            tags.readTag
        ]
    },
    {
        method: 'PUT',
        route: '/update/:id',
        handlers: [
            ensureUser,
            tags.readTag,
            tags.updateTag
        ]
    },
    {
        method: 'POST',
        route: '/update/multi',
        handlers: [
            ensureUser,
            tags.updateMultiTags
        ]
    },
    {
        method: 'DELETE',
        route: '/delete/:id',
        handlers: [
            ensureUser,
            tags.deleteTag
        ]
    },
    {
        method: 'POST',
        route: '/delete/multi',
        handlers: [
            ensureUser,
            tags.deleteMultiTags
        ]
    }
]
