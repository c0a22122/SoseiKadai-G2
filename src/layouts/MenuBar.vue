<template>
    <nav class="menu-bar">
      <router-link to="/">📅 カレンダー</router-link>
      <router-link to="/pomodoro">⏲️ ポモドーロ</router-link>
      <router-link to="/todo">📝 ToDoリスト</router-link>
      <router-link to="/finance">💰 家計簿</router-link>
      <router-link to="/team-tasks">👥 チームタスク</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'MenuBar',
  };
  </script>
  
  <style>
  .menu-bar {
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #ddd;
    padding: 10px 0;
  }
  
  .menu-bar a {
    text-decoration: none;
    color: #333;
    font-size: 1.2rem;
  }
  
  .menu-bar a.router-link-active {
    color: #007bff; /* アクティブなリンクの色 */
  }
  </style>
  