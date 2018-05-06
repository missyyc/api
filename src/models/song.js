import mongoose from 'mongoose'

const Schema = mongoose.Schema

// 品牌分类model
const Song = new mongoose.Schema({
  name: { type: String },
  created: { type: Date, default: Date.now },
  cover: { type: String },
  tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }]
})

export default mongoose.model('song', Song)
