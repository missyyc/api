import { ensureUser } from '../../middleware/validators'

import { findLyricByKugou } from '../lyrics/controller'
import * as audios from './controller'

export const baseUrl = '/audios'

export default [
    {
        method: 'POST',
        route: '/create',
        handlers: [
            ensureUser,
            findLyricByKugou,
            audios.createAudio
        ]
    },
    {
        method: 'GET',
        route: '/list',
        handlers: [
            audios.listAudios
        ]
    },
    {
        method: 'GET',
        route: '/read/:id',
        handlers: [
            // ensureUser,
            audios.readAudio
        ]
    },
    {
        method: 'PUT',
        route: '/update/:id',
        handlers: [
            ensureUser,
            audios.readAudio,
            audios.updateAudio
        ]
    },
    {
        method: 'POST',
        route: '/update/multi',
        handlers: [
            ensureUser,
            audios.updateMultiAudios
        ]
    },
    {
        method: 'DELETE',
        route: '/delete/:id',
        handlers: [
            ensureUser,
            audios.deleteAudio
        ]
    },
    {
        method: 'POST',
        route: '/delete/multi',
        handlers: [
            ensureUser,
            audios.deleteMultiAudios
        ]
    }
]
