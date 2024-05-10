module.exports = function () {
    process.on('uncaughtException', err => {
        console.error(err);
        process.exit(1);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error(reason);
    });
}