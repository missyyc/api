import { ensureUser } from '../../middleware/validators'
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
      songs.listsongs
    ]
  },
  {
    method: 'GET',
    route: '/read/:id',
    handlers: [
      ensureUser,
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
      songs.updateMultisongs
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
