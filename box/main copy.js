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
/*
//建立一個變數來計算房間內再施工的建築物數量
var constructionSite = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
//如果房間內有再施工的建築物，就在 console 中顯示出來   
    if(constructionSite.length > 0)console.log('constructionSite: ' + constructionSite.length);    
//每10個constructionSiten數量+1，直到n的數量達到3個為止，constructionSite=0,n=0;
    var n = 0;
    for(var i in constructionSite)
    {
        n++;

        if(n == 3)
        {
            constructionSite = 0;
            n = 0;
        }
    }
    console.log('build:'+n);
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('upgrader: ' + upgrader.length);

    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('builder: ' + builder.length);

    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    console.log('attacker: ' + attacker.length);
    
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('repairer: ' + repairer.length);

    var truck = _.filter(Game.creeps, (creep) => creep.memory.role == 'truck');
    console.log('truck: ' + truck.length);

    if(harvesters.length < 2) 
    {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    if(truck.length < 2) 
    {
        
        var newName = 'truck' + Game.time;
        console.log('Spawning new truck: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE], newName, 
            {memory: { role: 'truck' }});
    }
    if(repairer.length < 1) 
    {
        
        var newName = 'repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: { role: 'repairer' }});
    }
    if(builder.length < n) 
    {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    if(upgrader.length < 1) 
    {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    if(attacker.length < 0) 
    {
        // 生成新的攻击单位
        var newName = 'Attacker' + Game.time;
        console.log('Spawning new attacker: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([ATTACK, MOVE], newName, 
            {memory: { role: 'attacker', task: 'attack', target: 'enemyRoom1' } });
    }
    
    */
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