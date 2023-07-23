module.exports.loop = function () 
{
    //引入  
    var creep_n = require('creep_n');
    
    //執行
    creep_n.run();
    var roleLink = require('role.link');    
    roleLink.run();

   

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

    //顯示能量
    for(var name in Game.rooms) 
    {
        
       console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy'); 
       //console.log('total_energy:'+total_energy);
    }
   
    var total =require('total');
    total.run();
    //顯示room controller等級，和內部能量
    for(var name in Game.rooms)
    {
        console.log('Room "'+name+'" has '+Game.rooms[name].controller.level+' level');
        console.log('Room "'+name+'" has '+Game.rooms[name].controller.progress+' progress');
        console.log('Room "'+name+'" has '+Game.rooms[name].controller.progressTotal+' progressTotal');
    }


//不知道幹嘛的
    function findStructureToRepair(room) 
    {
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