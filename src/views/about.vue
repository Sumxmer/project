<template>
  <div class="about-page">
    <header class="header">
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
        </svg>
        Back
      </button>
      <h1>About Us - ทีม Dev Fixถึงใจ</h1>
      <p class="subtitle">พบกับทีมพัฒนาที่อยู่เบื้องหลังระบบ</p>
    </header>

    <div class="team-container">
      <div class="team-member" v-for="dev in devs" :key="dev.id">
        <div class="member-image-wrapper">
          <img :src="dev.image" :alt="dev.name" />
        </div>
        <h3>{{ dev.name }}</h3>
        <p class="role">{{ dev.role }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      devs: [
        { id: 1, name: "Boss", role: "Project Manager", image: "/devteam/boss.png" },
        { id: 2, name: "Chaina", role: "Frontend Developer", image: "/devteam/chaina.png" },
        { id: 3, name: "Hooto", role: "UI/UX Designer", image: "/devteam/hooto.png" },
        { id: 4, name: "Leo", role: "Frontend Developer", image: "/devteam/leo.png" },
        { id: 5, name: "Palm", role: "Developer", image: "/devteam/palm.jpg" },
        { id: 6, name: "Mix", role: "Developer", image: "/devteam/mix.png" },
        { id: 7, name: "Summer", role: "Backend/Full Stack", image: "/devteam/summer.png" }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router ? this.$router.back() : window.history.back();
    }
  }
}
</script>

<style scoped>
/* ปรับให้ about-page ครอบคลุมความสูงทั้งหมดของหน้าจอ */
.about-page {
  font-family: 'Sarabun', 'Prompt', sans-serif;
  min-height: 100vh; /* ความสูงขั้นต่ำเท่ากับหน้าจอ */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  box-sizing: border-box; /* รวม padding ในการคำนวณความสูง */
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  color: white;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-50%) translateX(-3px);
}

.back-btn:active {
  transform: translateY(-50%) scale(0.95);
}

/* Container สำหรับการ์ดทีม */
.team-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem; /* เพิ่มระยะห่างด้านล่าง */
}

/* การ์ดแต่ละคน */
.team-member {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-member:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

/* Wrapper สำหรับรูปภาพ เพื่อให้มี effect สวยงาม */
.member-image-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 4px solid #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.team-member:hover .member-image-wrapper {
  border-color: #764ba2;
  box-shadow: 0 6px 16px rgba(118, 75, 162, 0.4);
  transform: scale(1.05);
}

.member-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.team-member:hover .member-image-wrapper img {
  transform: scale(1.1);
}

/* ชื่อและตำแหน่ง */
.team-member h3 {
  margin: 0.5rem 0 0.3rem;
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 600;
}

.role {
  margin: 0;
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-page {
    padding: 1.5rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .team-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }

  .back-btn {
    position: static;
    transform: none;
    margin-bottom: 1.5rem;
    width: fit-content;
  }

  .back-btn:hover {
    transform: translateX(-3px);
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }

  .team-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .member-image-wrapper {
    width: 100px;
    height: 100px;
  }

  .team-member {
    padding: 1rem;
  }

  .team-member h3 {
    font-size: 1rem;
  }

  .role {
    font-size: 0.8rem;
  }
}
</style>
