<template>
  <div class="calendar">
    <!-- Calendar Header with Year and Month Navigation -->
    <div class="calendar-header">
      <button @click="prevMonth">＜</button>
      <select v-model="currentYear" @change="updateCalendar">
        <option v-for="year in yearRange" :key="year" :value="year">{{ year }}年</option>
      </select>
      <select v-model="currentMonth" @change="updateCalendar">
        <option v-for="(month, index) in months" :key="index" :value="index">{{ month }}月</option>
      </select>
      <button @click="nextMonth">＞</button>
    </div>

    <!-- Calendar Grid -->
    <div class="calendar-grid" @touchstart="startSwipe" @touchend="endSwipe">
      <div v-for="(day, index) in daysOfWeek" :key="'day-' + index" class="day-header">{{ day }}</div>
      <div
        v-for="(date, index) in dates"
        :key="'date-' + index"
        class="calendar-date"
        :class="{ 'empty': !date, 'selected': date === selectedDate }"
        @click="date && openEventModal(date)"
      >
        <span v-if="date" class="date-number">{{ date }}</span>
        <div v-if="events[`${currentYear}-${currentMonth}-${date}`]" class="events-list">
          <div
            v-for="(event, idx) in events[`${currentYear}-${currentMonth}-${date}`]"
            :key="'event-' + idx"
            class="event-title"
            :style="{ backgroundColor: event.color }"
            @click.stop="editEvent(event, date)"
          >
            {{ event.title }}
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal for Adding/Editing Event -->
    <div v-if="showEventModal" class="modal-overlay" @click="closeEventModal">
      <div class="modal" @click.stop>
        <h3>{{ currentYear }}年 {{ currentMonth + 1 }}月 {{ selectedDate }}日</h3>
        <input v-model="newEvent.title" placeholder="イベントタイトル" class="event-input" />
        <div class="color-picker">
          <label for="color-input">色を選択:</label>
          <input id="color-input" v-model="newEvent.color" type="color" />
        </div>
        <textarea v-model="newEvent.note" placeholder="メモを追加" class="event-input"></textarea>
        <div class="button-group">
          <button @click="saveEvent">保存</button>
          <button @click="closeEventModal">キャンセル</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarComponent',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      selectedDate: null,
      showEventModal: false,
      newEvent: { title: '', color: '#f0f0f0', note: '' },
      events: {},
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
      months: Array.from({ length: 12 }, (_, i) => i + 1),
    };
  },
  computed: {
    dates() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      return Array(firstDay).fill(null).concat([...Array(daysInMonth).keys()].map(day => day + 1));
    },
    yearRange() {
      return Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
    },
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentYear -= 1;
        this.currentMonth = 11;
      } else {
        this.currentMonth -= 1;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentYear += 1;
        this.currentMonth = 0;
      } else {
        this.currentMonth += 1;
      }
    },
    updateCalendar() {
      // No additional logic needed; just binds directly to selected month/year
    },
    openEventModal(date) {
      this.selectedDate = date;
      this.newEvent = { title: '', color: '#f0f0f0', note: '' };
      this.showEventModal = true;
    },
    closeEventModal() {
      this.showEventModal = false;
    },
    saveEvent() {
      const eventKey = `${this.currentYear}-${this.currentMonth}-${this.selectedDate}`;
      if (!this.events[eventKey]) this.events[eventKey] = [];
      this.events[eventKey].push({ ...this.newEvent });
      this.showEventModal = false;
    },
    editEvent(event, date) {
      this.selectedDate = date;
      this.newEvent = { ...event }; // Set newEvent to the clicked event for editing
      this.showEventModal = true;
    },
    startSwipe(event) {
      this.touchStart = event.changedTouches[0].pageX;
    },
    endSwipe(event) {
      const touchEnd = event.changedTouches[0].pageX;
      const swipeDistance = touchEnd - this.touchStart;

      if (swipeDistance > 50) {
        this.prevMonth();
      } else if (swipeDistance < -50) {
        this.nextMonth();
      }
    },
  },
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  padding: 10px;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  color: #333333;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  animation: fadeIn 1s ease;
}

.calendar-header button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #282e39;
  border: none;
  color: #ffffff;
  transition: transform 0.2s;
}

.calendar-header button:hover {
  transform: scale(1.1);
}

.calendar-header select {
  margin: 0 10px;
  padding: 5px;
  font-size: 1rem;
  background-color: #282e39;
  color: #ffffff;
  border: none;
  transition: all 0.2s;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px; /* ギャップを少し小さくして、日付セルの間隔を詰める */
  width: 100%;
  max-width: 100%;
}

.calendar-date {
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  font-size: 25px; /* 日付のフォントサイズを大きく */
  padding: 30px; /* パディングを増やしてセルを大きく */
}

.calendar-header select {
  font-size: 1.2rem; /* セレクトボックスのフォントサイズを大きく */
}

.calendar-header button {
  font-size: 1.2rem; /* ボタンのフォントサイズも調整 */
}

.calendar-date .date-number {
  color: #333333;
  font-size: 1.5rem; /* 日付のフォントをさらに大きく */
}

.calendar-date:hover {
  background-color: #4b4b6d;
  transform: scale(1.05);
}

.calendar-date.selected {
  background-color: #e0e0e0;
}

.events-list .event-title {
  font-size: 10px;
  font-weight: bold;
  padding: 2px;
  border-radius: 4px;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.events-list .event-title:hover {
  background-color: #4b4b6d;
  transform: scale(1.1); /* Make the event title enlarge on hover */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  width: 300px;
}

.event-input {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.color-picker {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-group button {
  padding: 5px 10px;
  background-color: #282e39;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-group button:hover {
  background-color: #555;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
