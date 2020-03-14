module.exports = {
    method: 'get',
    path: '/',
    name: 'home',
    useWrap: true,
    version: 'v1.0.0',
    handler: (req, res) => {
      return { ok: true }
    }
}