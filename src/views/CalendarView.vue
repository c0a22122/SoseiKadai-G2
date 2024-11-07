<template>
  <div>
    <h1>カレンダー</h1>
    <CalendarComponent /> <!-- カレンダーコンポーネントの名前を変更 -->
  </div>
</template>

<script>
import CalendarComponent from '../components/Calendar.vue'; // インポート時の名前も変更

export default {
  name: 'CalendarView',
  components: {
    CalendarComponent,
  },
};
</script>

<style scoped>
/* ページ全体のスタイルをここに追加 */
</style>
