var roleHarvester2 = {

    /** @param {Creep} creep **/
    
        run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
};

module.exports = roleHarvester2;