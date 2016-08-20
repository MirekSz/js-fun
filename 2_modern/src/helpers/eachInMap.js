/**
 *
 * @param {Map} map
 * @param block
 * @returns {string}
 */
module.exports = function( map, block ) {
    var out = '';
    for (var [key, value] of map) {
        out += block.fn( {key, value} )
    }
    return out;
};
