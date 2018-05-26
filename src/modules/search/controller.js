import Audio from '../../models/audio'

export async function searchKeyword (ctx) {

    const { keyword } = ctx.request.query

    const reg = new RegExp(keyword, 'i')

    const ret = await Audio.find(
        {
            $or : [ //多条件，数组
                {audio_name : {$regex : reg}},
                {cover_singer : {$regex : reg}}
            ]
        }
    )
    .sort('-_id')
    .populate('tags lyrics')

    ctx.body = {
        results: ret
    }
}