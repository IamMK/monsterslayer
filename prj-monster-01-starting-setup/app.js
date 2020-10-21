// Naprawić logi!!!

const app = Vue.createApp({
    data() {
        return {
            pHealth: 100,
            mHealth: 100,
            round: 1,
            gameOver: false,
            matchResult: '',
            logs: []
        }
    },
    methods: {
        addLog(who, what, howMuch){
            this.logs.push({
                who,
                what,
                howMuch
            });
        },
        restart(){
            this.pHealth = 100;
            this.mHealth = 100;
            this.round = 1;
            this.gameOver = false;
            this.matchResult = '';
            this.logs = [];
        },
        pAttack() {
            const attackValue = Math.floor(Math.random() * (7 - 2) + 2); //2-6
            this.mHealth -= attackValue;
            this.addLog("player", "attack", attackValue);
            this.mAttack();
        },
        mAttack() {
            const attackValue = Math.floor(Math.random() * (11 - 4) + 4); // 4-10
            this.pHealth -= attackValue;
            this.addLog("monster", "attack", attackValue);
            this.round++;
        },
        pSpecialAttack() {
            const attackValue = Math.floor(Math.random() * (12 - 6) + 6); //6-11
            if (this.mHealth > 0) this.mHealth -= attackValue;
            this.addLog("player", "special attack", attackValue);
            this.mAttack();
        },
        pHeal() {
            let healValue = Math.floor(Math.random() * (17 - 13) + 13); //13-16
            if (this.pHealth + healValue > 100) {
                healValue = 100 - this.pHealth;
                this.pHealth = 100;
            }
            else this.pHealth += healValue;
            this.addLog("player", "heal", healValue);
            this.mAttack();
        },
        pSurrender() {
            this.gameOver = true;
            this.matchResult = 'monster';
            this.addLog("player", "has given", "up");
        }
    },
    computed: {
        mHealthBar() {
            return 'width:' + this.mHealth + '%';
        },
        pHealthBar() {
            return 'width:' + this.pHealth + '%';
        },
        specialMoveCounter() {
            return this.round % 3 !== 0
        },
    },
    watch: {
        pHealth(value) {
            if (value <= 0 && this.mHealth <= 0) {
                this.pHealth = 0;
                this.mHealth = 0;
                this.gameOver = true;
                this.matchResult = 'draw';
            }
            else if(value <= 0){
                this.pHealth = 0;
                this.gameOver = true;
                this.matchResult = "monster";
            }
        },
        mHealth(value) {
            if (value <= 0 && this.pHealth <= 0) {
                this.pHealth = 0;
                this.mHealth = 0;
                this.gameOver = true;
                this.matchResult = 'draw';
            }
            else if(value <= 0){
                this.mHealth = 0;
                this.gameOver = true;
                this.matchResult = "player";
            }
        }
    },
});

app.mount("#game");