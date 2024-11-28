<template>
  <div class="pomodoro-timer">
    <h2>Pomodoro Timer</h2>
    <div class="settings">
      <label>Hours:</label>
      <input type="range" min="0" max="23" v-model.number="inputHours" @input="updateTime" />
      <span>{{ inputHours }} h</span>

      <label>Minutes:</label>
      <input type="range" min="0" max="59" v-model.number="inputMinutes" @input="updateTime" />
      <span>{{ inputMinutes }} m</span>

      <label>Seconds:</label>
      <input type="range" min="0" max="59" v-model.number="inputSeconds" @input="updateTime" />
      <span>{{ inputSeconds }} s</span>
    </div>
    <div class="timer-display">{{ formattedTime }}</div>
    <div class="controls">
      <button @click="startTimer">Start</button>
      <button @click="pauseTimer">Pause</button>
      <button @click="resetTimer">Reset</button>
    </div>
    <audio ref="alarmSound" :src="alarmSoundSrc" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputHours: 0,
      inputMinutes: 25,
      inputSeconds: 0,
      time: 25 * 60,
      timer: null,
      isRunning: false,
      alarmSoundSrc: "/music/kibunissin1.mp3",
    };
  },
  computed: {
    formattedTime() {
      const hours = Math.floor(this.time / 3600);
      const minutes = Math.floor((this.time % 3600) / 60);
      const seconds = this.time % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    },
  },
  methods: {
    updateTime() {
      if (!this.isRunning) {
        this.time = this.inputHours * 3600 + this.inputMinutes * 60 + this.inputSeconds;
      }
    },
    startTimer() {
      if (this.timer) clearInterval(this.timer);
      this.isRunning = true;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else {
          this.stopTimer();
          this.$refs.alarmSound.play();
        }
      }, 1000);
    },
    pauseTimer() {
      clearInterval(this.timer);
      this.isRunning = false;
    },
    resetTimer() {
      this.pauseTimer();
      this.updateTime();
    },
    stopTimer() {
      this.pauseTimer();
      this.$refs.alarmSound.pause();
      this.$refs.alarmSound.currentTime = 0;
    },
  },
};
</script>

<style scoped>
.pomodoro-timer {
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
}
.settings {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.settings label {
  margin-top: 10px;
  font-weight: bold;
}
.settings input[type="range"] {
  width: 80%;
  margin: 5px 0;
}
.timer-display {
  font-size: 48px;
  margin: 20px 0;
  color: #ff5722;
}
.controls button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #ff5722;
  color: #fff;
  cursor: pointer;
}
.controls button:hover {
  background-color: #e64a19;
}
@media (max-width: 600px) {
  .settings input[type="range"] {
    width: 90%;
  }
  .timer-display {
    font-size: 36px;
  }
  .controls button {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>
