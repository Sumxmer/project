<script setup>
// ไม่ต้อง import Home แล้ว เพราะ Router จะจัดการเอง
</script>

<template>
  <!-- ตรงนี้คือจุดที่ Router จะ render หน้าแต่ละหน้าตาม path -->
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
