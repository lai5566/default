var roleEnergyMover = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.moving && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.moving = false;
            creep.say('🔄 取能量');
        }
        if (!creep.memory.moving && creep.store.getFreeCapacity() === 0) {
            creep.memory.moving = true;
            creep.say('🚛 搬運');
        }

        if (creep.memory.moving) {
            const targetContainer = Game.getObjectById("64b8ac918ae6de0050e21823");
            if (targetContainer) {
                if (creep.transfer(targetContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetContainer, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        } else {
            const sourceStorage = Game.getObjectById("64ae75a314c3cb00553b4737");
            if (sourceStorage) {
                if (creep.withdraw(sourceStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceStorage, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }
};

module.exports = roleEnergyMover;
