import { ensureUser } from '../../middleware/validators'
import * as albums from './controller'

export const baseUrl = '/albums'

export default [
    {
        method: 'POST',
        route: '/create',
        handlers: [
            ensureUser,
            albums.createAlbum
        ]
    },
    {
        method: 'GET',
        route: '/list',
        handlers: [
            albums.listAlbums
        ]
    },
    {
        method: 'GET',
        route: '/read/:id',
        handlers: [
            ensureUser,
            albums.readAlbum
        ]
    },
    {
        method: 'PUT',
        route: '/update/:id',
        handlers: [
            ensureUser,
            albums.readAlbum,
            albums.updateAlbum
        ]
    },
    {
        method: 'POST',
        route: '/update/multi',
        handlers: [
            ensureUser,
            albums.updateMultiAlbums
        ]
    },
    {
        method: 'DELETE',
        route: '/delete/:id',
        handlers: [
            ensureUser,
            albums.deleteAlbum
        ]
    },
    {
        method: 'POST',
        route: '/delete/multi',
        handlers: [
            ensureUser,
            albums.deleteMultiAlbums
        ]
    }
]
