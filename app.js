function setValue(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

const initialValues = () => ({
        pHealth: 100,
        mHealth: 100,
        round: 1,
        gameOver: false,
        matchResult: '',
        logs: [],
})

const app = Vue.createApp({
    data() {
        return initialValues();
    },
    methods: {
        addLog(who, what, howMuch) {
            this.logs.push({
                who,
                what,
                howMuch
            });
        },
        restart() {
            Object.assign(this.$data, initialValues());
        },
        pAttack() {
            const attackValue = setValue(2, 6);
            this.mHealth -= attackValue;
            this.addLog("player", "attack", attackValue);
            this.mAttack();
        },
        mAttack() {
            const attackValue = setValue(4, 10);
            this.pHealth -= attackValue;
            this.addLog("monster", "attack", attackValue);
            this.round++;
        },
        pSpecialAttack() {
            const attackValue = setValue(6, 11);
            if (this.mHealth > 0) this.mHealth -= attackValue;
            this.addLog("player", "special attack", attackValue);
            this.mAttack();
        },
        pHeal() {
            let healValue = setValue(13, 16);
            console.log(healValue);
            if (this.pHealth + healValue >= 100) {
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
            else if (value <= 0) {
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
            else if (value <= 0) {
                this.mHealth = 0;
                this.gameOver = true;
                this.matchResult = "player";
            }
        }
    },
});

app.mount("#game");