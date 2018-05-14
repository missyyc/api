import { ensureUser } from '../../middleware/validators'

import * as lyrics from '../lyrics/controller'
import * as songs from './controller'

export const baseUrl = '/songs'

export default [
    {
        method: 'POST',
        route: '/create',
        handlers: [
            songs.createSong
        ]
    },
    {
        method: 'GET',
        route: '/list',
        handlers: [
            // ensureUser,
            songs.listSongs
        ]
    },
    {
        method: 'GET',
        route: '/read/:id',
        handlers: [
            // ensureUser,
            lyrics.ensureLyric,
            songs.readSong
        ]
    },
    {
        method: 'PUT',
        route: '/update/:id',
        handlers: [
            songs.readSong,
            songs.updateSong
        ]
    },
    {
        method: 'POST',
        route: '/update/multi',
        handlers: [
            songs.updateMultiSongs
        ]
    },
    {
        method: 'DELETE',
        route: '/delete/:id',
        handlers: [
            // ensureUser,
            songs.deleteSong
        ]
    },
    {
        method: 'POST',
        route: '/delete/multi',
        handlers: [
            songs.deleteMultiSongs
        ]
    }
]
