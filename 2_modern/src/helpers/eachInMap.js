module.exports = function( map, block ) {
    let out = '';
    Object.keys(map).map((key) => {
        out += block.fn( {key: key, value: map.get(key)} );
    });
    return out;
};
