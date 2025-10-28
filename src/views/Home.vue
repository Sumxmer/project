<template>
  <nav class="navbar">
    <!-- ซ้าย: ชื่อเว็บ -->
    <div class="logo">
      <h2>testtt</h2>
    </div>

    <!-- ขวา: เมนู -->
    <ul class="nav-links">
      <li><router-link to="/about">เกี่ยวกับฉัน</router-link></li>
      <li><router-link to="/description">คำอธิบาย</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavHome",
};
</script>

<style scoped>
.navbar {
  background-color: #007bff;
  color: white;
  padding: 12px 40px; /* เพิ่ม padding ให้ดูโปร */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between; /* ซ้าย-ขวาสุด */
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.logo h2 {
  margin: 0;
  font-size: 1.6em;
  font-weight: bold;
  cursor: pointer;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 1em;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links li a:hover {
  color: #ffeb3b;
}

/* Responsive */
@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
}
</style>
