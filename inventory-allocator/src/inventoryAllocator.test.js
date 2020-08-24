const InventoryAllocator = require('./inventoryAllocator.js')

test('Exact Match', () => {
    var items = { "apple": 1 }
    var warehouses = [{ "name": "owd", "inventory": { "apple": 1 } }]
    var expected = [{ "owd": { "apple": 1 }}]
    expect(InventoryAllocator.getCheapestShipment(items, warehouses)).toStrictEqual(expected);
});

test('No items', () => {
    var items = {}
    var warehouses = [{ "name": "owd", "inventory": { "apple": 1 } }]
    var expected = [{"owd": {}}]
    expect(InventoryAllocator.getCheapestShipment(items, warehouses)).toStrictEqual(expected);
});

test('Match, no volume', () => {
    var items = {"apple": 0}
    var warehouses = [{ "name": "owd", "inventory": { "apple": 1 } }]
    var expected = [{"owd": {}}]
    expect(InventoryAllocator.getCheapestShipment(items, warehouses)).toStrictEqual(expected);
});

test('No Match', () => {
    var items = { "apple": 1 }
    var warehouses = [{ "name": "owd", "inventory": { "apple": 0 } }]
    var expected = []
    expect(InventoryAllocator.getCheapestShipment(items, warehouses)).toStrictEqual(expected);
});

test('No Match, some items unfilled', () => {
    var items = { "apple": 5, "banana": 6, "orange": 5 }
    var warehouses = [ { "name": "owd", "inventory": { "apple": 5, "orange": 10 } }, { "name": "dm", "inventory": { "banana": 5, "orange": 10 } } ]
    var expected = []
    expect(InventoryAllocator.getCheapestShipment(items, warehouses)).toStrictEqual(expected);
});

test('Splits between warehouses', () => {
    var items = { "apple": 10 }
    var warehouses = [{ "name": "owd", "inventory": { "apple": 5 } }, { "name": "dm", "inventory": { "apple": 5 }}]
    var expected = [{ "owd": { "apple": 5 }}, { "dm": { "apple": 5 } }]
    expect(InventoryAllocator.getCheapestShipment(items, warehouses)).toStrictEqual(expected);
});

test('Splits between warehouses for multiple items', () => {
    var items = { "apple": 5, "banana": 5, "orange": 5 }
    var warehouses = [ { "name": "owd", "inventory": { "apple": 5, "orange": 10 } }, { "name": "dm", "inventory": { "banana": 5, "orange": 10 } } ]
    var expected = [{ "owd": { "apple": 5, "orange": 5 }}, { "dm": { "banana": 5 } }]
    expect(InventoryAllocator.getCheapestShipment(items, warehouses)).toStrictEqual(expected);
});

test('Splits between warehouses for multiple items, ignores other warehouses', () => {
    var items = { "apple": 5, "banana": 5, "orange": 5 }
    var warehouses = [ { "name": "owd", "inventory": { "apple": 5, "orange": 10 } }, {"name": "cw", "inventory": {}}, { "name": "dm", "inventory": { "banana": 5, "orange": 10 } } ]
    var expected = [{ "owd": { "apple": 5, "orange": 5 }}, { "cw": {}}, { "dm": { "banana": 5 } }]
    expect(InventoryAllocator.getCheapestShipment(items, warehouses)).toStrictEqual(expected);
});

