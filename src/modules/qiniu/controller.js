import qiniu from 'qiniu'

export function generateUploadToken (ctx) {
    const accessKey = 'V9V8kOZnoE4jIadlzLfOuhfZ9IgxtBjNr3tQbf7B'
    const secretKey = '0ZBLFa9uaCUXEfrpgcQPQM9tW-9Ij2R4peSaBNuY'
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

    const options = {
        scope: 'yychong',
        expires: 3153600
    }

    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)

    ctx.body = {
        token: uploadToken,
        domain: 'p8lwkpir3.bkt.clouddn.com'
    }
}

