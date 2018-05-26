import Album from '../../models/album'

export async function listAlbums (ctx) {
    try {
        const albums = await Album.find({})
                                .populate('tags')
                                .populate('songs')
                                .sort('-_id')
                                .deepPopulate(['songs.lyrics', 'songs.tags'])
                                    .then(ret => {
                                        ctx.status = 200
                                        ctx.body = {
                                            results: ret
                                        }
                                    })
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function createAlbum (ctx) {
    const album = new Album(ctx.request.body)
    try {
        await album.save()
    } catch (err) {
        ctx.throw(422, err.message)
    }

    const response = album.toJSON()

    ctx.status = 201
    ctx.body = {
        result: response
    }
}

export async function readAlbum (ctx, next) {
    try {
        const result = await Album.findById(ctx.params.id)
        if (!result) {
            ctx.throw(404)
        }

        ctx.status = 200
        ctx.body = {
            result
        }
    } catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404)
        }

        ctx.throw(500)
    }

    if (next) { return next() }
}

export async function updateAlbum (ctx) {
    const result = ctx.body.result

    Object.assign(result, ctx.request.body)

    await result.save()

    ctx.status = 201
    ctx.body = {
        result
    }
}

export async function updateMultiAlbums (ctx) {
    const { ids, attrs } = ctx.request.body
    try {
        await Album.update({_id: {$in: ids}}, attrs, {multi: true})
        ctx.status = 201
        ctx.body = {
            message: 'Update Multiple Albums Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function deleteAlbum (ctx) {
    const { id } = ctx.params
    try {
        await Album.remove({ _id: id })
        ctx.body = {
            message: 'Delete Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function deleteMultiAlbums (ctx) {
    const { ids } = ctx.request.body
    try {
        await Album.remove({_id: {$in: ids}})
        ctx.body = {
            message: 'Delete Multiple Albums Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}
