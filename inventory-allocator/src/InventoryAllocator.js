class InventoryAllocator {
    static getCheapestShipment(order, inventoryDistribution) {
        var shipments = []
        inventoryDistribution.forEach(warehouse => {
            let warehouseName = warehouse["name"]
            let warehouseInventory = warehouse["inventory"]
            let warehouseToBeAdded = {}
            warehouseToBeAdded[warehouseName] = {}
            let warehouseDistribution = warehouseToBeAdded[warehouseName]

            for (var item in order) {
                if (order[item] > 0 && item in warehouseInventory && warehouseInventory[item] > 0) {
                    let quantityFromWarehouse = Math.min(order[item], warehouseInventory[item])
                    order[item] -= quantityFromWarehouse
                    warehouseDistribution[item] = quantityFromWarehouse
                }
            }

            shipments.push(warehouseToBeAdded)
        })

        return (Object.values(order).some(item => item != 0) ? [] : shipments)
    }

}

module.exports = InventoryAllocator