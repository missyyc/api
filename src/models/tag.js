import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Tag model
const Tag = new mongoose.Schema({
  name: { type: String },
  created: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
  status: { type: String } // 状态: active: 可用, inactive: 废弃
})

export default mongoose.model('song', Tag)
