module.exports = {
    ENV        : process.env.NODE || 'development',
    PORT       : process.env.PORT || 8080,
    JWT_SECRET : process.env.JWT_SECRET  || 'supersecretkey',
    URL        : process.env.BASE_URL || 'http: //localhost: 8080',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://rodrigoeddie:5-7ae9FBEVKfb2q@cluster0-bduo3.mongodb.net/test?retryWrites=true&w=majority'
}