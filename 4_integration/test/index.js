
global.ita=function(description, callback) {
    return it(description,
        async (done) => {
            try {
                await callback();
                done();
            } catch (err) {
                done(err);
            }
        }
    )
};
let context = require.context('.', true, /.+\.test\.js?$/);
context.keys().forEach(context);
module.exports = context;
