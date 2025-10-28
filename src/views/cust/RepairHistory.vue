<template>
  <div>
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1>ประวัติการซ่อม</h1>
        <p>รายการแจ้งซ่อมทั้งหมดของคุณ</p>
      </header>

      <div class="history-list">
        <div v-if="repairs.length === 0" class="empty">
          ยังไม่มีรายการแจ้งซ่อม
        </div>

        <div v-for="repair in repairs" :key="repair.id" class="card">
          <h3>{{ repair.category }}</h3>
          <p><strong>รายละเอียด:</strong> {{ repair.description }}</p>
          <p><strong>ที่อยู่:</strong> {{ repair.address }}</p>
          <p><strong>สถานะ:</strong> <span :class="repair.status.toLowerCase()">{{ repair.status }}</span></p>
          <p><strong>วันที่แจ้งซ่อม:</strong> {{ repair.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';

export default {
  name: 'RepairHistory',
  components: { Navcust },
  data() {
    return {
      repairs: [
        {
          id: 1,
          category: 'ไฟฟ้า',
          description: 'ไฟในห้องน้ำไม่ติด',
          address: 'ซอยสุขุมวิท 10',
          status: 'รอดำเนินการ',
          date: '2025-10-28'
        },
        {
          id: 2,
          category: 'ประปา',
          description: 'น้ำไม่ไหล',
          address: 'ซอยสุขุมวิท 15',
          status: 'เสร็จแล้ว',
          date: '2025-10-20'
        }
      ]
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  margin-left: 200px; /* เว้นพื้นที่ navbar */
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2em;
  margin-bottom: 5px;
}

.header p {
  color: #555;
}

/* History list */
.history-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.card h3 {
  margin-top: 0;
  color: #007bff;
}

/* Status */
.rอดำเนินการ {
  color: #ff9800;
  font-weight: bold;
}

.เสร็จแล้ว {
  color: #4caf50;
  font-weight: bold;
}

/* Empty state */
.empty {
  text-align: center;
  color: #777;
  font-style: italic;
}

/* Responsive */
@media (max-width: 600px) {
  .content-wrapper {
    margin-left: 0;
  }
}
</style>
