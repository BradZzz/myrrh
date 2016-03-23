module.exports = function (app) {
    app.use('/stock', require('./routes/stock'))
}
