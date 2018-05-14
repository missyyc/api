import { ensureUser } from '../../middleware/validators'
import * as qiniu from './controller'

export const baseUrl = '/qiniu'

export default [
    {
        method: 'POST',
        route: '/create',
        handlers: [
            qiniu.createQiniu
        ]
    },
    {
        method: 'GET',
        route: '/token',
        handlers: [
            // ensureUser,
            qiniu.generateUploadToken
        ]
    }
]
