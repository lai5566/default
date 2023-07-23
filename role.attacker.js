var roleAttacker = {
  run: function(creep) {
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (target) {
      if (creep.attack(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: "#ff0000" } });
      }
    } else {
      // 没有找到敌人，执行巡逻任务
      const patrolPos = findPatrolPosition(creep);
      creep.moveTo(patrolPos);
    }
  }
};

function findPatrolPosition(creep) {
  // 这里假设你希望在单位周围的指定范围内进行巡逻
  const patrolRange = 3;
  const room = creep.room;
  const pos = creep.pos;

  // 找到离单位最近的可用位置作为巡逻点
  for (let i = 1; i <= patrolRange; i++) {
    for (let x = -i; x <= i; x++) {
      for (let y = -i; y <= i; y++) {
        if (Math.abs(x) !== i && Math.abs(y) !== i) {
          continue;
        }
        const newX = pos.x + x;
        const newY = pos.y + y;
        const objectsAtPos = room.lookForAt(LOOK_TERRAIN, newX, newY);
        if (objectsAtPos.length > 0 && objectsAtPos[0] !== 'wall') {
          return new RoomPosition(newX, newY, room.name);
        }
      }
    }
  }

  
  return creep.pos;
}

module.exports = roleAttacker;
