import Lyric from '../../models/lyric'

export async function listLyrics (ctx) {
    try {
        const lyrics = await Lyric.find({}).sort('-created')

        ctx.status = 200
        ctx.body = {
            results: lyrics
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function createLyric (ctx) {
    const lyric = new Lyric(ctx.request.body)
    try {
        await lyric.save()
    } catch (err) {
        ctx.throw(422, err.message)
    }

    const response = lyric.toJSON()

    ctx.status = 201
    ctx.body = {
        result: response
    }
}

export async function readLyric (ctx, next) {
    try {
        const result = await Lyric.findById(ctx.params.id)
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

export async function updateLyric (ctx) {
    const result = ctx.body.result

    Object.assign(result, ctx.request.body)

    await result.save()

    ctx.status = 201
    ctx.body = {
        result
    }
}

export async function updateMultiLyrics (ctx) {
    const { ids, attrs } = ctx.request.body
    try {
        await Lyric.update({_id: {$in: ids}}, attrs, {multi: true})
        ctx.status = 201
        ctx.body = {
            message: 'Update Multiple Lyrics Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function deleteLyric (ctx) {
    const { id } = ctx.params
    try {
        await Lyric.remove({ _id: id })
        ctx.body = {
            message: 'Delete Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function deleteMultiLyrics (ctx) {
    const { ids } = ctx.request.body
    try {
        await Lyric.remove({_id: {$in: ids}})
        ctx.body = {
            message: 'Delete Multiple Lyrics Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}
