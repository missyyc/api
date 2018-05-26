import mongoose from 'mongoose'
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const Schema = mongoose.Schema

// 品牌分类model
const Album = new mongoose.Schema({
    album_name: { type: String, unique: true }, // 专辑名
    img: {
        type: { type: String },
        name: { type: String },
        url: { type: String }, // 歌曲图片
        hash: { type: String },
        key: { type: String },
        uid: { type: String }
    },
    songs: [{ type: Schema.Types.ObjectId, ref: 'audio' }], // 专辑歌曲
    desc: { type: String }, // 对专辑的描述，ex：伤心五连，这个女人好狠！
    play_times: { type: Number, default: 0 },  // 播放次数
    love_times: { type: Number, default: 0 }, // 点赞次数
    tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }] // 专辑标签
})

Album.plugin(deepPopulate)

export default mongoose.model('album', Album)
