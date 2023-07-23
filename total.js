module.exports.run = function total() 
{
    var containers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES,
    {
        filter: (structure) => 
        {
            return (structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 0;
        }
    });
    var storages = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES,
    {
        filter: (structure) => 
        {
            return (structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 0;
        }
    });

    var total = 0;
    for(var i in containers)
    {
        total += containers[i].store[RESOURCE_ENERGY];
    }
    for(var i in storages)
    {
        total += storages[i].store[RESOURCE_ENERGY];
    }
    console.log('total:'+total);
   
   
    
}