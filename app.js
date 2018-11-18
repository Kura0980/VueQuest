new Vue({
    el: '#app',
    data: {
        playerHP: 100,
        monsterHP: 150,
        playerHPColor: 'green',
        monsterHPColor: 'green',
        isRun: false,
        turns: [],
        mode: 'default'
    },
    computed: {
        monsterBarWidth: function() {
            return this.monsterHP / 150 * 100;
        }
    },
    methods: {
        startGame: function () {
            this.playerHP = 100;
            this.monsterHP = 150;
            this.playerHPColor = 'green';
            this.monsterHPColor = 'green';    
            this.isRun = true;
            this.turns = [];
            this.mode = 'default';
        },
        attack: function () {
            this.turns = [];
            var damage = this.calculateDamage(3, 10);
            this.monsterHP -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: '勇者のこうげき！ 魔王に' + damage + 'ダメージ'
            })
            if (this.checkWin()) {
                return;
            } 
            setTimeout(this.monsterAttack, 1000); 
        },
        specialAttack: function () {
            this.turns = [];
            var damage = this.calculateDamage(10, 20);
            this.monsterHP -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: '勇者のこうげき！ ダメージ' + damage + 'ダメージ'
            })
            setTimeout(this.monsterAttack, 1000);
        },
        heal: function() {
            this.turns = [];
            if (this.playerHP >= 90) {
                this.playerHP = 100;
            } else {
                this.playerHP += 10;
            }
            this.turns.unshift({
                isPlayer: true,
                text: '勇者はかいふくを唱えた！'
            })
            this.mode = 'default';
            setTimeout(this.monsterAttack, 1000);
        },
        giveUp: function() {
            this.isRun = false;
        },
        monsterAttack: function () {
            var damage = this.calculateDamage(3, 10);
            this.playerHP -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: '魔王のこうげき！ 勇者に' + damage + 'ダメージ'
            })
            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) +1, min);
        },
        checkWin: function() {
            if (this.monsterHP <= 0) {
                this.monsterHP = 0;
                if (confirm('倒した!もう一度たたかいますか？')) {
                    this.startGame();
                }else {
                    this.isRun = false;
                }
                return true;
            }else if (this.playerHP <= 0) {
                this.playerHP = 0; 
                if (confirm('負けてしまった。もう一度たたかいますか？')) {
                    this.startGame();
                }else {
                    this.isRun = false;
                }
                return true;
            }
            return false;
        }

    },
    watch: {
        playerHP: function(val) {
            if (val <= 20) {
                this.playerHPColor = 'red';
            }else if (val <= 50) {
                this.playerHPColor = 'orange';
            }else {
                this.playerHPColor = 'green';
            }
        },
        monsterHP: function(val) {
            var HPWhidth = this.monsterBarWidth;
            if (HPWhidth <= 20) {
                this.monsterHPColor = 'red';
            }else if (HPWhidth <= 50) {
                this.monsterHPColor = 'orange';
            }else {
                this.monsterHPColor = 'green';
            }
        }
    }
})