import Tag from '../../models/tag'

export async function listTags (ctx) {
  try {
    const tags = await Tag.find({}).sort('-created')

    ctx.status = 200
    ctx.body = {
      results: tags
    }
  } catch (err) {
    ctx.throw(422, err.message)
  }
}

export async function createTag (ctx) {
  const tag = new Tag(ctx.request.body)
  try {
    await tag.save()
  } catch (err) {
    ctx.throw(422, err.message)
  }

  const response = tag.toJSON()

  ctx.status = 201
  ctx.body = {
    result: response
  }
}

export async function readTag (ctx, next) {
  try {
    const result = await Tag.findById(ctx.params.id)
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

export async function updateTag (ctx) {
  const result = ctx.body.result

  Object.assign(result, ctx.request.body)

  await result.save()

  ctx.status = 201
  ctx.body = {
    result
  }
}

export async function updateMultiTags (ctx) {
  const { ids, attrs } = ctx.request.body
  try {
    await Tag.update({_id: {$in: ids}}, attrs, {multi: true})
    ctx.status = 201
    ctx.body = 'Update Multiple Tags Success!'
  } catch (err) {
    ctx.throw(422, err.message)
  }
}

export async function deleteTag (ctx) {
  const { id } = ctx.params
  try {
    await Tag.remove({ _id: id })
    ctx.body = 'Delete Success!'
  } catch (err) {
    ctx.throw(422, err.message)
  }
}

export async function deleteMultiTags (ctx) {
  const { ids } = ctx.request.body
  try {
    await Tag.remove({_id: {$in: ids}})
    ctx.body = 'Delete Multiple Tags Success!'
  } catch (err) {
    ctx.throw(422, err.message)
  }
}
