import mongoose from 'mongoose'

// 品牌分类model
const Lyric = new mongoose.Schema({
    song_name: { type: String },
    singer: { type: String },
    lyrics: { type: String } // 歌词
})

export default mongoose.model('lyric', Lyric)
