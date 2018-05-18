import Lyric from '../../models/lyric'
import axios from 'axios';
import urlencode from 'urlencode';

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

export async function ensureLyric(ctx, next) {
    const { type, song_name, cover_singer } = ctx.request.body
    // const song_name = '想你的365天'
    // const cover_singer = '李玟'

    if (type === 'live_audio') {
        return next()
    }

    try {
        const result = await Lyric.find({song_name})
        
        if (result.length > 0) {
            return next()
        } else {
            // 如果没有歌词就从网易云下载，并存到本地
            const keyword = urlencode(`${song_name}-${cover_singer}`)
            const ret = await axios.get(`http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${keyword}&page=1&pagesize=20&showtype=1`)
            const song_ret = ret.data.data.info[0]
            const { hash, filename } = song_ret

            const songRet = await axios.get(`http://www.kugou.com/yy/index.php?r=play/getdata&hash=${hash}`)
            const { lyrics } = songRet.data.data

            const lyric = new Lyric({
                song_name,
                singer: cover_singer,
                lyrics
            })


            try {
                await lyric.save()
                ctx.state.lyricId = lyric._id
                return next()
            } catch (err) {
                ctx.throw(422, err.message)
            }

        }
    } catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404)
        }

        ctx.throw(500)
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
