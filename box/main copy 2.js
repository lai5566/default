var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAttacker = require('role.attacker');
var roleRepairer = require('role.repairer');
var roleTruck = require('role.truck');

module.exports.loop = function () 
{

    var tower = Game.getObjectById('TOWER_ID');
    if(tower) 
    {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, 
        {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) 
        {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) 
        {
            tower.attack(closestHostile);
        }
    }
     for(var name in Memory.creeps) 
    {
        if(!Game.creeps[name]) 
        {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

   //引入creep_n檔案，reep_n的內容但不要在這裡寫
    var creep_n = require('creep_n');
    //creep_n的內容寫在這裡
    creep_n.run();
   

    if(Game.spawns['Spawn1'].spawning) 
    {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text
        (
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8}
            
        );
    }

    
    
    for(var name in Game.rooms) 
    {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

function findStructureToRepair(room) {
    let structures = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.hits < structure.hitsMax) &&
               (structure.structureType !== STRUCTURE_WALL) &&
               (structure.structureType !== STRUCTURE_RAMPART) &&
               (structure.structureType !== STRUCTURE_ROAD) && 
               (structure.structureType !== STRUCTURE_CONTAINER);
      }
    });
  
    if (structures.length > 0) {
      // 根据需要进行筛选和排序，选择一个需要修复的建筑物作为目标
      // 这里只选择第一个建筑物，你可以根据需要进行修改
      return structures[0];
    }
  
    return null;
  }


}