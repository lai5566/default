var roleTruck = {
    run: function(creep) {
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            // 采集掉落的能量资源
            const energyDeposits = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (resource) => {
                    return resource.resourceType === RESOURCE_ENERGY;
                }
            });

            if (energyDeposits.length > 0) {
                const closestDeposit = creep.pos.findClosestByRange(energyDeposits);
                if (creep.pickup(closestDeposit) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDeposit, { visualizePathStyle: { stroke: "#ffff00" } });
                }
            }
        } else {
            // 存储能量到 extension、spawn、tower 和 container
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER ||
                            (structure.structureType === STRUCTURE_CONTAINER && structure.id !== '64b95a494ba95400341b81a2')
                        ) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
                }
            });

            if (targets.length > 0) {
                const closestTarget = creep.pos.findClosestByRange(targets);
                if (creep.transfer(closestTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, { visualizePathStyle: { stroke: "#ffffff" } });
                }
            } else {
                // 存储能量到 Link
                const link = Game.getObjectById('64b95a494ba95400341b81a2');
                if (link && link.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    if (creep.transfer(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(link, { visualizePathStyle: { stroke: "#ffffff" } });
                    }
                }
            }
        }
    }
};

module.exports = roleTruck;
