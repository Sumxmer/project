<template>
  <nav class="navbar-vertical">
    <div class="logo">
      <h2>ลูกค้าที่แสนดี</h2>
    </div>
    <ul class="nav-links">
      <li><router-link to="/homecust">หน้าแรก</router-link></li>
      <li><router-link to="/request-repair">แจ้งซ่อม</router-link></li>
      <li><router-link to="/repair-history">ประวัติการซ่อม</router-link></li>
      <li><router-link to="/profile">โปรไฟล์</router-link></li>
      <li><router-link to="/Home">ออกจากระบบ</router-link></li>
        
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navcust",
};
</script>

<style scoped>
/* Vertical navbar */
.navbar-vertical {
  position: fixed; /* ติดซ้ายหน้าจอ */
  top: 0;
  left: 0;
  height: 100vh; /* สูงเต็มหน้าจอ */
  width: 200px; /* ปรับตามต้องการ */
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

/* ทำให้ content หลักเว้นพื้นที่ navbar */
body {
  margin-left: 200px; /* ต้องเท่ากับ width ของ navbar */
}

/* Responsive */
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
