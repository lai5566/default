//把creep_n.js變成一個function，並且把creep_n.js裡面的內容全部放進去
module.exports.run = function creep_n()

{
    var roleHarvester = require('role.harvester');
    var roleUpgrader = require('role.upgrader');
    var roleBuilder = require('role.builder');
    var roleAttacker = require('role.attacker');
    var roleRepairer = require('role.repairer');
    var roleTruck = require('role.truck');
    var roleEnergyMover = require('role.EnergyMover');


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
    console.log('n:'+n);
//建立一個變數來計算房間內再修理的建築物數量
var repairSite = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES,
    {
        filter: (structure) =>
        {
            return (structure.hits < structure.hitsMax);
        }
    });
//如果房間內有再修理的建築物，就在 console 中顯示出來

    if(repairSite.length > 0)console.log('repairSite: ' + repairSite.length);
//每10個repairSite數量+1，直到m的數量達到3個為止，repairSite=0,m=0;
    var m = 0;
    for(var i in repairSite)
    {
        m++;

        if(m == 3)
        {
            repairSite = 0;
            m = 0;
        }
    }
    console.log('m:'+m);
//建立一個變數來計算房間內再攻擊的敵人數量
var enemy = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
//如果房間內有再攻擊的敵人，就在 console 中顯示出來
    if(enemy.length > 0)console.log('enemy: ' + enemy.length);
//每10個enemy數量+1，直到k的數量達到3個為止，enemy=0,k=0;
    var k = 0;
    for(var i in enemy)
    {
        k++;

        if(k == 3)
        {
            enemy = 0;
            k = 0;
        }
    }
    console.log('k:'+k);
//建立一個變數來計算房間內再能量不足的建築物數量

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

    var energymover = _.filter(Game.creeps, (creep) => creep.memory.role == 'energymover');
    console.log('energymover: ' + energymover.length);

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
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], newName, 
            {memory: { role: 'truck' }});
    }
    if(repairer.length < m) 
    {
        
        var newName = 'repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE], newName, 
            {memory: { role: 'repairer' }});
    }
    if(builder.length < n) 
    {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    if(upgrader.length < 2) 
    {        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    if(attacker.length < k) 
    {
        // 生成新的攻击单位
        var newName = 'Attacker' + Game.time;
        console.log('Spawning new attacker: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([ATTACK, MOVE], newName, 
            {memory: { role: 'attacker', task: 'attack', target: 'enemyRoom1' } });
    }
   
    if( energymover.length <0) 
    {
        // 生成新的攻击单位
        var newName = ' energymover' + Game.time;
        console.log('Spawning new  energymover: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE], newName, 
            {memory: {role: 'energymover'}});
    }
    for(var name in Game.creeps) 
    {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') 
        {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') 
        {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') 
        {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'attacker') 
        {
            roleAttacker.run(creep);
        }
        if(creep.memory.role == 'repairer') 
        {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'truck') 
        {
            roleTruck.run(creep);
        }
        if(creep.memory.role == 'energymover') 
        {
            roleEnergyMover.run(creep);
        }
    }
}