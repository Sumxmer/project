<template>
  <nav class="navbar">
    <div class="logo">
      <h2>testtt</h2>
    </div>

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
  /* ***แก้ไข: เปลี่ยนพื้นหลังเป็นสีเทา (เช่น #333333) *** */
  background-color: #333333; 
  color: white; /* คงสีข้อความหลักเป็นสีขาว */
  padding: 12px 40px; 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4); /* ปรับเงาเล็กน้อย */
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
  color: white; /* ให้ลิงก์เป็นสีขาวเพื่อให้ตัดกับพื้นหลังเทาเข้ม */
  text-decoration: none;
  font-size: 1em;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links li a:hover {
  color: #ffeb3b; /* คงสี Hover เป็นสีเหลือง */
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