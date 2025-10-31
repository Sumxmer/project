<template>
  <div class="page">
    <header class="header">
      
      <nav class="back-btn">
          <router-link to="/home" class="nav-item">GO BACK</router-link>
        </nav>
      <div>
        <h1>ทีม Developer</h1>
      </div>
      <input v-model="q" placeholder="ค้นหาชื่อ หรือ ตำแหน่ง" class="search" />
    </header>

    <main>
      <section class="grid">
        <article
          v-for="dev in filtered"
          :key="dev.id"
          class="card"
          @click="open(dev)"
          role="button"
          tabindex="0"
        >
          <div class="avatar">
            <img :src="dev.avatar" :alt="dev.name" />
          </div>
          <div class="info">
            <h2>{{ dev.name }}</h2>
            <p class="role">{{ dev.role }}</p>
          </div>
          <div class="tags">
            <span v-for="tag in dev.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </section>
    </main>

    <div v-if="selected" class="modal-backdrop" @click.self="close">
      <div class="modal">
        <button class="close" @click="close">✕</button>
        <div class="modal-top">
          <img :src="selected.avatar" :alt="selected.name" class="modal-avatar" />
          <div>
            <h2>{{ selected.name }}</h2>
            <p class="role">{{ selected.role }}</p>
            <p class="contact">📧 {{ selected.email }} • 📱 {{ selected.phone }}</p>
          </div>
        </div>
        <div class="modal-body">
          <h3>About</h3>
          <p>{{ selected.bio }}</p>

          <h3>Skills</h3>
          <ul class="skills">
            <li v-for="s in selected.skills" :key="s">{{ s }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const q = ref('')
const selected = ref(null)

const developers = ref([
  { id: 1, name: 'ณภัทร (Summer)', role: 'FULL STACK/BACKEND', avatar: '/public/images/summer.png', email: 'napat.kun@kkumail.com', phone: '+66 960027602', tags: ['Vue', 'HTML', 'CSS'], skills: ['react', 'javascript'], bio: 'ชอบทำลายสิ่งที่ถูกสร้าง อย่าง งงงวย และถูกต้อง.' },
  { id: 2, name: 'ศุภวงศ์ (Suphawong)', role: 'Backend Engineer', avatar: '/public/images/palm.jpg', email: 'xxx@example.com', phone: '+66 8123 xxx79', tags: ['Node.js', 'Database'], skills: ['Node.js', 'Postgres', 'API Design'], bio: 'เชี่ยวชาญด้านออกแบบ API และฐานข้อมูล ปรับระบบให้รองรับการเติบโต.' },
  { id: 3, name: 'ชนะชัย  (Chanachai)', role: 'FRONTEND Engineer', avatar: '/public/images/boss.png', email: 'xxx@example.com', phone: '+66 8123 xxx70', tags: ['Vue', 'Node'], skills: ['Vue', 'Express', 'Docker'], bio: 'ชอบแก้ปัญหาเชิงระบบ ทำระบบให้ deploy ง่ายๆ ด้วย Docker.' },
  { id: 4, name: 'ชิดธรรม (Chitthum)', role: 'Dev/FRONTEND', avatar: '/public/images/chaina.png', email: 'xxx@example.com', phone: '+66 8123 xxx71', tags: ['Design', 'Figma'], skills: ['Figma', 'Prototyping', 'Design Systems'], bio: 'เน้นการออกแบบที่เรียบและใช้งานง่าย ทำระบบ design system ให้ทีม.' },
  { id: 5, name: 'วรากร (Warakron)', role: 'DevOps/BACKEND', avatar: '/public/images/hooto.png', email: 'xxx@example.com', phone: '+66 8123 xxx72', tags: ['CI/CD', 'AWS'], skills: ['Kubernetes', 'Terraform', 'CI/CD'], bio: 'ดูแลโครงสร้างพื้นฐานและ pipeline ให้ระบบเสถียร.' },
  { id: 6, name: 'กฤษณะ (Kritsana)', role: 'UX/UI/Tester', avatar: '/public/images/leo.png', email: 'xxx@example.com', phone: '+66 8123 xxx73', tags: ['Testing', 'Automation'], skills: ['E2E Testing', 'Cypress', 'Test Plans'], bio: 'ทำให้มั่นใจว่าฟีเจอร์ต่างๆ ทำงานได้ถูกต้องก่อนปล่อย.' },
  { id: 7, name: 'ปัณณวรรษ (Pannawat)', role: 'UX/UI/Dev', avatar: '/public/images/mix.png', email: 'xxx@example.com', phone: '+66 8123 xxx74', tags: ['Flutter', 'iOS'], skills: ['Flutter', 'Android', 'iOS'], bio: 'พัฒนาแอปที่เร็วและมี UX ดี สำหรับทั้ง iOS และ Android.' }
])

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  if (!term) return developers.value
  return developers.value.filter(d =>
    d.name.toLowerCase().includes(term) ||
    d.role.toLowerCase().includes(term) ||
    d.tags.join(' ').toLowerCase().includes(term)
  )
})

function open(dev) {
  selected.value = dev
}
function close() {
  selected.value = null
}
function goBack() {
  window.history.back()
}
</script>

<style scoped>
.page {
  margin: 24px auto;
  padding: 16px;
  font-family: 'Poppins', sans-serif;
  background: #000;
  color: #ff69b4;
  border-radius: 12px;
  position: relative;
  max-width: 1400px; /* ✅ จำกัดความกว้างไม่ให้กว้างเกิน */
}

.nav-item {
  text-decoration: none;
  color: inherit;
}

.header {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.header h1 {
  margin: 0;
  font-size: 26px;
  color: #ff69b4;
}
.subtitle {
  color: #ffb6c1;
  margin: 0;
}
.search {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ff69b4;
  background: transparent;
  color: #fff;
}

.back-btn {
  background: #ff69b4;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.back-btn:hover {
  background: #ff1493;
  color: #fff;
}

/* ✅ ปรับ grid ให้เต็มหน้าสวย */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); /* ปรับขนาดอัตโนมัติ */
  gap: 20px;
  margin-top: 20px;
}
.card {
  background: #111;
  border: 1px solid #ff69b4;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.2);
  cursor: pointer;
  transition: 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ จัดให้อยู่ตรงกลาง */
  justify-content: space-between;
  text-align: center;
  min-height: 200px; /* ✅ ให้ความสูงสม่ำเสมอ */
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.4);
}

.modal-body h3 {
  margin-top: 0;
  color: #ffb6c1;
;
}

/* 🔹 ปรับขนาดรูปภาพให้พอดีใน card */
.avatar img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 8px;
}
.modal-avatar {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
}

.info h2 {
  margin: 8px 0 4px;
  color: #ff69b4;
}
.role {
  color: #ffb6c1;
}
.tag {
  display: inline-block;
  background: #ff69b4;
  color: #000;
  padding: 5px 8px;
  border-radius: 999px;
  margin: 3px 4px 0 0;
  font-size: 12px;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.modal {
  background: #111;
  border: 1px solid #ff69b4;
  border-radius: 12px;
  padding: 18px;
  color: #ff69b4;
  max-width: 720px;
  width: 100%;
  box-shadow: 0 0 30px rgba(255, 105, 180, 0.3);
  position: relative;
  animation: fadeInUp 0.3s ease; /* ✅ เพิ่มแอนิเมชันเบาๆ */
}
.close {
  position: absolute;
  right: 12px;
  top: 12px;
  border: none;
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  color: #ff69b4;
}


.skills li {
  background: #ff69b4;
  color: #000;
  padding: 6px 10px;
  border-radius: 8px;
  margin: 3px;
}

/* ✅ แอนิเมชันเปิด modal */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 520px) {
  .modal {
    padding: 12px;
  }
  .search {
    min-width: 140px;
  }
}
</style>

