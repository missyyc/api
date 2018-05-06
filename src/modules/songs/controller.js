import Song from '../../models/song'

export async function listSongs (ctx) {
  try {
    const songs = await Song.find({}).sort('-created')

    ctx.status = 200
    ctx.body = {
      results: songs
    }
  } catch (err) {
    ctx.throw(422, err.message)
  }
}

export async function createSong (ctx) {
  const song = new Song(ctx.request.body)
  try {
    await song.save()
  } catch (err) {
    ctx.throw(422, err.message)
  }

  const response = song.toJSON()

  ctx.status = 201
  ctx.body = {
    result: response
  }
}

export async function readSong (ctx, next) {
  try {
    const result = await Song.findById(ctx.params.id)
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

export async function updateSong (ctx) {
  const result = ctx.body.result

  Object.assign(result, ctx.request.body)

  await result.save()

  ctx.status = 201
  ctx.body = {
    result
  }
}

export async function updateMultiSongs (ctx) {
  const { ids, attrs } = ctx.request.body
  try {
    await Song.update({_id: {$in: ids}}, attrs, {multi: true})
    ctx.status = 201
    ctx.body = 'Update Multiple Songs Success!'
  } catch (err) {
    ctx.throw(422, err.message)
  }
}

export async function deleteSong (ctx) {
  const { id } = ctx.params
  try {
    await Song.remove({ _id: id })
    ctx.body = 'Delete Success!'
  } catch (err) {
    ctx.throw(422, err.message)
  }
}

export async function deleteMultiSongs (ctx) {
  const { ids } = ctx.request.body
  try {
    await Song.remove({_id: {$in: ids}})
    ctx.body = 'Delete Multiple Songs Success!'
  } catch (err) {
    ctx.throw(422, err.message)
  }
}
