new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    starNewGame: function(){
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function() {
      //check options
      if(this.checkPlayerOptions()) {
        return;
      }
      // Monster
      damage = this.inputDamage(4, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        textLog: 'Player hit monster for ' + damage
      });
      //Player
      this.monsterAttacks();
    },
    specialAttack: function() {
      //check options
      if(this.checkPlayerOptions()) {
        return;
      }
      damage = this.inputDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        textLog: 'Player hit monster for ' + damage
      });
      // Monster

      //Player
      this.monsterAttacks();
    },
    health: function() {
      //Player
      if(this.playerHealth > 70)
      {
        return false;
      }else if (this.playerHealth<=60) {
        this.playerHealth += 10;
      }else{
        this.playerHealth = 70;
      }

      //Monster
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
      alert("You lost");
      this.monsterHealth = 100;
      this.playerHealth = 100;
    },
    monsterAttacks: function() {
      damage = this.inputDamage(5, 12);
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        textLog: 'Monster hit player for ' + damage
      });
      this.checkPlayerOptions();
    },
    inputDamage: function(minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) +1, minDamage);
    },
    checkPlayerOptions: function() {
      if(this.monsterHealth <=0 ) {
        if(confirm('You won! New game?'))
        {
          this.starNewGame();
          // this.gameIsRunning = true;
        }else {
          this.gameIsRunning = false;
        }
        return true;
      }else if(this.playerHealth <= 0) {
        if(confirm('You lost! New game?'))
        {
          this.starNewGame();
          // this.gameIsRunning = true;
        }else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return;
    }
  }
})
