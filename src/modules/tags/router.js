import { ensureUser } from '../../middleware/validators'
import * as tags from './controller'

export const baseUrl = '/tags'

export default [
  {
    method: 'POST',
    route: '/create',
    handlers: [
      tags.createTag
    ]
  },
  {
    method: 'GET',
    route: '/list',
    handlers: [
      // ensureUser,
      tags.listTags
    ]
  },
  {
    method: 'GET',
    route: '/read/:id',
    handlers: [
      ensureUser,
      tags.readTag
    ]
  },
  {
    method: 'PUT',
    route: '/update/:id',
    handlers: [
      tags.readTag,
      tags.updateTag
    ]
  },
  {
    method: 'POST',
    route: '/update/multi',
    handlers: [
      tags.updateMultiTags
    ]
  },
  {
    method: 'DELETE',
    route: '/delete/:id',
    handlers: [
      // ensureUser,
      tags.deleteTag
    ]
  },
  {
    method: 'POST',
    route: '/delete/multi',
    handlers: [
      tags.deleteMultiTags
    ]
  }
]
