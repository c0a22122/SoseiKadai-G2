<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">前月</button>
      <h2>{{ currentYear }}年 {{ currentMonth + 1 }}月</h2>
      <button @click="nextMonth">次月</button>
    </div>

    <!-- カレンダーのグリッド -->
    <div class="calendar-grid">
      <div v-for="(day, index) in daysOfWeek" :key="'day-' + index" class="day-header">{{ day }}</div>
      <div
        v-for="(date, index) in dates"
        :key="'date-' + index"
        class="calendar-date"
        :class="{ 'empty': !date, 'event-day': events[`${currentYear}-${currentMonth}-${date}`] }"
        @click="date && openEventModal(date)"
        :style="{ backgroundColor: events[`${currentYear}-${currentMonth}-${date}`]?.color || '' }"
      >
        <span v-if="date">{{ date }}</span>
        <div v-if="events[`${currentYear}-${currentMonth}-${date}`]" class="event-title">
          {{ events[`${currentYear}-${currentMonth}-${date}`]?.title }}
        </div>
      </div>
    </div>

    <!-- イベント追加用モーダル -->
    <div v-if="showEventModal" class="modal-overlay" @click="closeEventModal">
      <div class="modal" @click.stop>
        <h3>{{ currentYear }}年 {{ currentMonth + 1 }}月 {{ selectedDate }}日</h3>
        <input v-model="newEvent.title" placeholder="イベントタイトル" />
        <input v-model="newEvent.color" type="color" placeholder="色を選択" />
        
        <!-- メモと入力フィールド -->
        <textarea v-model="newEvent.note" placeholder="メモを追加"></textarea>
        
        <!-- Google Map リンク入力 -->
        <input v-model="newEvent.location" placeholder="Google Map リンク (例: https://goo.gl/maps/...)" />

        <!-- 地図埋め込み -->
        <EmbedMap :location="newEvent.location" />

        <div class="button-group">
          <button @click="saveEvent">保存</button>
          <button @click="closeEventModal">キャンセル</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmbedMap from './EmbedMap.vue'; // EmbedMapコンポーネントをインポート

export default {
  name: 'CalendarComponent',
  components: {
    EmbedMap, // コンポーネントとして登録
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      selectedDate: null,
      showEventModal: false,
      newEvent: {
        title: '',
        color: '#f0f0f0',
        note: '',
        location: ''
      },
      events: {},
      daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
    };
  },
  computed: {
    dates() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      return Array(firstDay).fill(null).concat([...Array(daysInMonth).keys()].map(day => day + 1));
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
    openEventModal(date) {
      this.selectedDate = date;
      const eventKey = `${this.currentYear}-${this.currentMonth}-${date}`;
      this.newEvent = this.events[eventKey] || { title: '', color: '#f0f0f0', note: '', location: '' };
      this.showEventModal = true;
    },
    closeEventModal() {
      this.showEventModal = false;
    },
    saveEvent() {
      const eventKey = `${this.currentYear}-${this.currentMonth}-${this.selectedDate}`;
      this.events[eventKey] = { ...this.newEvent };
      this.showEventModal = false;
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
  font-size: 16px;
  padding: 10px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  width: 100%;
}

.day-header {
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
}

.calendar-date {
  text-align: center;
  padding: 15px;
  cursor: pointer;
  position: relative;
  font-size: 1rem;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.calendar-date.empty {
  background-color: #f0f0f0;
}

.calendar-date.event-day {
  background-color: #ffeb3b;
}

.event-title {
  font-size: 12px;
  margin-top: 5px;
  font-weight: bold;
  text-align: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  width: 400px;
  box-sizing: border-box;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

input[type="color"] {
  width: 50px;
  padding: 0;
  border: none;
}

textarea {
  height: 100px;
  resize: none;
}

iframe {
  margin-top: 20px;
  width: 100%;
  border: none;
  max-width: 600px;
  height: 450px;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .calendar {
    padding: 5px;
    font-size: 14px;
  }

  .calendar-header button {
    padding: 8px;
    font-size: 14px;
  }

  .calendar-date {
    padding: 10px;
    font-size: 1rem;
  }

  .calendar-grid {
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }

  .modal {
    max-width: 90%;
  }
}
</style>
