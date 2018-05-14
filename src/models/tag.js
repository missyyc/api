import mongoose from 'mongoose'

// Tag model
const Tag = new mongoose.Schema({
    tag_name: { type: String, unique: true },
    love_times: { type: Number, default: 0 }, // 被赞的次数
    status: { type: String, default: 'active' } // 状态: active: 可用, inactive: 废弃
})

export default mongoose.model('tag', Tag)
