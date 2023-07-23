var roleLink = {
    run: function() {
        // 假设你有两个 Link 命名为 "Link1" 和 "Link2"
        const link1 = Game.getObjectById("64b95a494ba95400341b81a2");
        const link2 = Game.getObjectById("64b96c1220c77800363dff9b");

        if (link1 && link2) {
            // 将 Link1 中的能量传输到 Link2
            link1.transferEnergy(link2);
        }
    }
};

module.exports = roleLink;
