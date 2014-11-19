
// Create a grid, from two lists (rows and columns).
// The grid is returned in row-order. If supplied, the 'transform'
// function will be used to transform the row and column items into
// a grid cell.
//
// grid(['a', 'b', 'c'], ['1', '2']) ->
// [
//   [ ['a','1'], ['a','2'] ]
//   [ ['b','1'], ['b','2'] ]
//   [ ['c','1'], ['c','2'] ]
// ]
//
// TEST: JSON.stringify(grid(['a', 'b', 'c'], ['1', '2']))
//
function grid(rows, columns, transform) {
    transform = typeof transform == 'undefined' ? toList : transform;

    function toList(itemA, itemB) {
        return [itemA, itemB];
    }

    return _.map(rows, function (itemA) {
        return _.map(columns, function(itemB) {
            return transform(itemA, itemB);
        });
    });
}

// Return the cross-product of two sets.
//
// crossProduct([1, 2], [3, 4]) ->
// [ [1, 3] [1, 4] [2, 3] [2, 4] ]
//
// TEST: JSON.stringify(crossProduct(['a', 'b', 'c'], ['1', '2']))
//
function crossProduct(setA, setB) {
    return _.flatten(grid(setA, setB), true);
}

