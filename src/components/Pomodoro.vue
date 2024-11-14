<template>
  <div class="timer-container">
    <h1>ポモドーロタイマー</h1>
    <div class="picker-container">
      <div class="picker">
        <span>作業時間 (分)</span>
        <select v-model="workTime" class="picker-select">
          <option v-for="n in 60" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="picker">
        <span>休憩時間 (分)</span>
        <select v-model="breakTime" class="picker-select">
          <option v-for="n in 30" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <button @click="setTimer">設定</button>
    </div>
    <div class="time">
      <span>{{ formattedMinutes }}</span>:<span>{{ formattedSeconds }}</span>
    </div>
    <div class="buttons">
      <button @click="startTimer">スタート</button>
      <button @click="resetTimer">リセット</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PomodoroTimer',
  data() {
    return {
      workTime: 25,
      breakTime: 5,
      timeLeft: 25 * 60,
      isRunning: false,
      isWorkSession: true,
      timer: null,
    };
  },
  computed: {
    formattedMinutes() {
      return Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    },
    formattedSeconds() {
      return (this.timeLeft % 60).toString().padStart(2, '0');
    },
  },
  methods: {
    setTimer() {
      this.timeLeft = this.workTime * 60;
      this.isWorkSession = true;
    },
    startTimer() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.timer = setInterval(() => {
        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.isWorkSession = !this.isWorkSession;
          this.timeLeft = this.isWorkSession ? this.workTime * 60 : this.breakTime * 60;
          alert(this.isWorkSession ? '作業時間です！' : '休憩時間です！');
          this.isRunning = false;
        } else {
          this.timeLeft--;
        }
      }, 1000);
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timeLeft = this.isWorkSession ? this.workTime * 60 : this.breakTime * 60;
      this.isRunning = false;
    },
  },
};
</script>

<style scoped>
.timer-container {
  text-align: center;
  font-family: Arial, sans-serif;
}
.picker-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.picker {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.picker-select {
  appearance: none;
  width: 60px;
  height: 120px;
  overflow: hidden;
  font-size: 24px;
  text-align: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 5px 0;
  margin-top: 5px;
}
.time {
  font-size: 48px;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  font-size: 18px;
}
</style>