<template>
    <div>
      <h1>ポモドーロ</h1>
      <!-- PomodoroTimerコンポーネントをここに追加 -->
      <PomodoroTimer />
    </div>
</template>

<script>
import PomodoroTimer from '../components/PomodoroTimer.vue';  // 正しいパスに修正

export default {
    name: 'PomodoroView',
    components: {  // スペル修正
      PomodoroTimer
    },
};
</script>

<style scoped>
/* スタイルをここに追加 */
</style>

  