module.exports.run = function findStructureToRepair(room) 
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
    //findStructureToRepair引入
    var FTR = require('findStructureToRepair');
    //findStructureToRepair的內容寫在這裡
    FTR.run();
    //TypeError: Cannot read property 'find' of undefined,解決方法是在main.js中引入findStructureToRepair.js
}