import Audio from '../../models/audio'

export async function listAudios (ctx) {
    let query = ctx.request.query
    try {
        const audios = await Audio.find(query)
                                .populate('tags')
                                .populate('lyrics')
                                .sort('-_id')

        ctx.status = 200
        ctx.body = {
            results: audios
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function createAudio (ctx) {
    let audio

    if (ctx.state.lyricId) {
        const newAudio = Object.assign(ctx.request.body, { lyrics: ctx.state.lyricId })
        audio = new Audio(newAudio)
    } else {
        audio = new Audio(ctx.request.body)
    }

    try {
        await audio.save()
    } catch (err) {
        ctx.throw(422, err.message)
    }

    const response = audio.toJSON()

    ctx.status = 201
    ctx.body = {
        result: response
    }
}

export async function readAudio (ctx, next) {
    try {
        const result = await Audio.findById(ctx.params.id).populate('tags')
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

export async function updateAudio (ctx) {
    const result = ctx.body.result

    Object.assign(result, ctx.request.body)

    await result.save()

    ctx.status = 201
    ctx.body = {
        result
    }
}

export async function updateMultiAudios (ctx) {
    const { ids, attrs } = ctx.request.body
    try {
        await Audio.update({_id: {$in: ids}}, attrs, {multi: true})
        ctx.status = 201
        ctx.body = {
            message: 'Update Multiple Audios Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function deleteAudio (ctx) {
    const { id } = ctx.params
    try {
        await Audio.remove({ _id: id })
        ctx.body = {
            message: 'Delete Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}

export async function deleteMultiAudios (ctx) {
    const { ids } = ctx.request.body
    try {
        await Audio.remove({_id: {$in: ids}})
        ctx.body = {
            message: 'Delete Multiple Audios Success!'
        }
    } catch (err) {
        ctx.throw(422, err.message)
    }
}
