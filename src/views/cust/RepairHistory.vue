<template>
  <Navcust />
  <div class="wrapper">
    <header class="header">
      <h1>ประวัติการซ่อม</h1>
      <p>ตรวจสอบสถานะงานซ่อมของคุณ</p>
    </header>
    <div>
      l;tlkdsvml;ไห่พอืวฎฆ์ดน่ฟไืดอน่ฟไืพอดนฟื้่พอนฟี้พนอดีฟไ้ืนฟ้ืไอนฟไ้ืดน
    </div>

    
  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';

export default {
  name: 'RepairHistory',
  components: { Navcust },
  
}
</script>

<style scoped>
/* Wrapper เต็มหน้า */
.wrapper {
  margin-left: 220px; /* เว้นพื้นที่ Navcust */
  width: calc(100% - 220px); /* ขยายเต็มแนวนอน ยกเว้นพื้นที่ navbar */
  padding: 20px;
  min-height: 100vh;
  background-color: #f0f4f8;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2em;
  margin-bottom: 5px;
  color: #333;
}

.header p {
  color: #555;
}

/* Repairs Container */
.repairs-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Card */
.repair-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.repair-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
}

.repair-card h2 {
  margin: 0 0 10px 0;
  color: #007bff;
}

/* Status */
.status-done {
  color: green;
  font-weight: bold;
}

.status-pending {
  color: orange;
  font-weight: bold;
}
</style>
