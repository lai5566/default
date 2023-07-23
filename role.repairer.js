var roleRepairer = {
    run: function(creep) {
        // 如果 repairer 的能量用尽，就去补充能量
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            // 假设你有一个 Spawn 或 Extension 命名为 "Spawn1"
            const spawn = Game.spawns["Spawn1"];
            creep.moveTo(spawn, { visualizePathStyle: { stroke: "#ffffff" } });
            creep.withdraw(spawn, RESOURCE_ENERGY);
        } else {
            // 搜索基地内需要修复的建筑物
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.hits < structure.hitsMax &&
                        structure.structureType !== STRUCTURE_WALL
                    );
                }
            });

            // 如果有需要修复的建筑物，就前往修复
            if (targets.length > 0) {
                if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
                }
            } else {
                // 如果没有需要修复的建筑物，repairer 可以执行其他任务或待命
                // 这里我们添加自我修复的逻辑
                if (creep.hits < creep.hitsMax) {
                    creep.heal(creep);
                }
            }
        }
    }
};

module.exports = roleRepairer;
