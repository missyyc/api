import * as search from './controller'

export const baseUrl = '/search'

export default [
    {
        method: 'GET',
        route: '/',
        handlers: [
            search.searchKeyword
        ]
    }
]
