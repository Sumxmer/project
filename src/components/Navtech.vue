<template>
  <nav class="navbar-vertical">
    <div class="logo">
      <h2>ช่าง</h2>
    </div>
    <ul class="nav-links">
      <li><router-link to="/dashboard">หน้าแรก</router-link></li>
      <li><router-link to="/job-list">งานที่ได้รับมอบหมาย</router-link></li>
      <li><router-link to="/history">ประวัติการซ่อม</router-link></li>
      <li><router-link to="/profile">โปรไฟล์</router-link></li>
      <li><router-link to="/login">ออกจากระบบ</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navtech",
};
</script>

<style scoped>
.navbar-vertical {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: #007bff;
  color: white;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  z-index: 1000;
}

.logo h2 {
  margin: 0 0 30px 0;
  font-size: 1.5em;
}

.nav-links {
  list-style: none;
  padding: 0;
  width: 100%;
}

.nav-links li {
  margin-bottom: 20px;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  display: block;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s, color 0.3s;
}

.nav-links li a:hover {
  background-color: #0056b3;
  color: #ffd700;
}

/* ทำให้ content เว้น left 200px */
body {
  margin-left: 200px;
}

@media (max-width: 600px) {
  .navbar-vertical {
    position: relative;
    width: 100%;
    height: auto;
    flex-direction: row;
    padding: 10px;
  }
  .logo {
    margin-right: 20px;
  }
  .nav-links {
    display: flex;
    gap: 10px;
  }
  body {
    margin-left: 0;
  }
}
</style>
