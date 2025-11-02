<template>
  <div class="dashboard-page">
    <!-- Navbar -->
    <nav class="admin-navbar">
      <div class="navbar-brand">
        <div class="logo">🛠️</div>
        <span class="brand-name">Admin Panel</span>
      </div>
      <div class="navbar-menu">
        <span class="admin-name">👤 {{ user?.name || 'Admin' }}</span>
        <button @click="handleLogout" class="logout-btn">ออกจากระบบ</button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>ภาพรวมระบบ Fix ถึงใจ</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <p>❌ {{ error }}</p>
        <button @click="fetchAllData" class="retry-btn">ลองใหม่</button>
      </div>

      <!-- Dashboard Content -->
      <div v-else>
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card card-blue">
            <div class="stat-icon">👨‍🔧</div>
            <div class="stat-info">
              <h3>{{ stats.TOTAL_TECHNICIANS || 0 }}</h3>
              <p>ช่างทั้งหมด</p>
            </div>
          </div>

          <div class="stat-card card-green">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>{{ stats.TOTAL_CUSTOMERS || 0 }}</h3>
              <p>ลูกค้าทั้งหมด</p>
            </div>
          </div>

          <div class="stat-card card-orange">
            <div class="stat-icon">📋</div>
            <div class="stat-info">
              <h3>{{ stats.TOTAL_JOBS || 0 }}</h3>
              <p>งานทั้งหมด</p>
            </div>
          </div>

          <div class="stat-card card-red">
            <div class="stat-icon">⏳</div>
            <div class="stat-info">
              <h3>{{ stats.PENDING_JOBS || 0 }}</h3>
              <p>งานรอดำเนินการ</p>
            </div>
          </div>
        </div>

        <!-- Monthly Revenue Section -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">💰 รายได้รายเดือน (6 เดือนล่าสุด)</h2>
            <button @click="exportMonthlyRevenue" class="export-btn">📥 ส่งออก CSV</button>
          </div>
          
          <div v-if="monthlyRevenue.length === 0" class="no-data">
            ไม่มีข้อมูลรายได้
          </div>
          
          <div v-else>
            <div class="table-wrapper">
              <table class="data-table revenue-table">
                <thead>
                  <tr>
                    <th>เดือน/ปี</th>
                    <th>จำนวนงาน</th>
                    <th>รายได้รวม (฿)</th>
                    <th>ค่าเฉลี่ย/งาน (฿)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in monthlyRevenue" :key="row.MONTH_TEXT" :class="{ 'highlight-row': index === 0 }">
                    <td>
                      <div class="month-display">
                        <strong class="month-thai">{{ row.MONTH_THAI }}</strong>
                        <span class="month-text">{{ row.MONTH_TEXT }}</span>
                      </div>
                    </td>
                    <td>
                      <span class="badge badge-blue">{{ row.TOTAL_COMPLETED_JOBS }} งาน</span>
                    </td>
                    <td class="revenue-amount">฿{{ formatNumber(row.TOTAL_REVENUE) }}</td>
                    <td class="avg-price">฿{{ formatNumber(row.AVG_JOB_PRICE) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td><strong>รวมทั้งหมด</strong></td>
                    <td><strong class="badge badge-blue">{{ totalJobs }} งาน</strong></td>
                    <td class="revenue-amount"><strong>฿{{ formatNumber(totalRevenue) }}</strong></td>
                    <td class="avg-price"><strong>฿{{ formatNumber(overallAverage) }}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- Summary Cards -->
            <div class="revenue-summary">
              <div class="summary-card">
                <div class="summary-icon">📊</div>
                <div class="summary-info">
                  <p class="summary-label">รายได้รวม 6 เดือน</p>
                  <h3 class="summary-value">฿{{ formatNumber(totalRevenue) }}</h3>
                </div>
              </div>
              <div class="summary-card">
                <div class="summary-icon">📈</div>
                <div class="summary-info">
                  <p class="summary-label">งานสำเร็จทั้งหมด</p>
                  <h3 class="summary-value">{{ totalJobs }} งาน</h3>
                </div>
              </div>
              <div class="summary-card">
                <div class="summary-icon">💵</div>
                <div class="summary-info">
                  <p class="summary-label">ค่าเฉลี่ยต่องาน</p>
                  <h3 class="summary-value">฿{{ formatNumber(overallAverage) }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ⭐⭐⭐ Customer LTV Report Section ⭐⭐⭐ -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">💎 รายงานมูลค่าลูกค้า (Customer LTV)</h2>
            <button @click="exportCustomerLTV" class="export-btn">📥 ส่งออก CSV</button>
          </div>

          <!-- Loading -->
          <div v-if="loadingLTV" class="loading-inline">
            <div class="spinner-small"></div>
            <p>กำลังโหลดข้อมูล...</p>
          </div>

          <!-- Table -->
          <div v-else-if="customerLTV.length > 0">
            <div class="table-wrapper">
              <table class="data-table ltv-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>รหัสลูกค้า</th>
                    <th>ชื่อลูกค้า</th>
                    <th>เบอร์โทร</th>
                    <th>อีเมล</th>
                    <th>จำนวนงานจอง</th>
                    <th class="highlight-col">ยอดใช้จ่าย (฿)</th>
                    <th>งานแรก</th>
                    <th>งานล่าสุด</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(customer, index) in customerLTV" 
                    :key="customer.USER_ID"
                    :class="{ 'top-customer': index < 3 }"
                  >
                    <td>
                      <span v-if="index === 0" class="rank-medal">🥇</span>
                      <span v-else-if="index === 1" class="rank-medal">🥈</span>
                      <span v-else-if="index === 2" class="rank-medal">🥉</span>
                      <span v-else>{{ index + 1 }}</span>
                    </td>
                    <td><strong>{{ customer.USER_ID }}</strong></td>
                    <td class="customer-name">{{ customer.CUSTOMER_NAME }}</td>
                    <td>{{ customer.PHONE || '-' }}</td>
                    <td class="email">{{ customer.EMAIL || '-' }}</td>
                    <td>
                      <span class="badge badge-blue">{{ customer.TOTAL_JOBS_BOOKED }} งาน</span>
                    </td>
                    <td class="spending-amount">฿{{ formatNumber(customer.TOTAL_SPENDING) }}</td>
                    <td>{{ formatDate(customer.FIRST_JOB_DATE) }}</td>
                    <td>{{ formatDate(customer.LATEST_JOB_DATE) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Summary Stats -->
            <div class="ltv-summary">
              <div class="ltv-stat-card">
                <div class="ltv-stat-icon">👥</div>
                <div class="ltv-stat-info">
                  <p class="ltv-stat-label">ลูกค้าทั้งหมด</p>
                  <h3 class="ltv-stat-value">{{ customerLTV.length }} คน</h3>
                </div>
              </div>
              <div class="ltv-stat-card highlight">
                <div class="ltv-stat-icon">💰</div>
                <div class="ltv-stat-info">
                  <p class="ltv-stat-label">รายได้รวมจากลูกค้า</p>
                  <h3 class="ltv-stat-value">฿{{ formatNumber(totalCustomerRevenue) }}</h3>
                </div>
              </div>
              <div class="ltv-stat-card">
                <div class="ltv-stat-icon">📊</div>
                <div class="ltv-stat-info">
                  <p class="ltv-stat-label">ค่าเฉลี่ยต่อลูกค้า</p>
                  <h3 class="ltv-stat-value">฿{{ formatNumber(averageCustomerSpending) }}</h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="no-data">
            ❌ ไม่พบข้อมูลลูกค้า
          </div>
        </div>

        <!-- ⭐⭐⭐ User Assignment History Section ⭐⭐⭐ -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">📜 ประวัติการใช้บริการของลูกค้าทั้งหมด</h2>
            <button @click="exportUserHistory" class="export-btn">📥 ส่งออก CSV</button>
          </div>

          <!-- Loading -->
          <div v-if="loadingHistory" class="loading-inline">
            <div class="spinner-small"></div>
            <p>กำลังโหลดข้อมูล...</p>
          </div>

          <!-- Table -->
          <div v-else-if="userHistory.length > 0">
            <div class="table-wrapper">
              <table class="data-table history-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>รหัสลูกค้า</th>
                    <th>ชื่อลูกค้า</th>
                    <th>รหัสงาน</th>
                    <th>วันที่</th>
                    <th>คำอธิบายงาน</th>
                    <th>สถานะ</th>
                    <th>ชื่อช่าง</th>
                    <th>ประเภทช่าง</th>
                    <th>คะแนน</th>
                    <th>ความคิดเห็น</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in userHistory.slice(0, 20)" :key="row.ASSIGNMENT_ID || index">
                    <td>{{ index + 1 }}</td>
                    <td><strong>{{ row.USER_ID }}</strong></td>
                    <td class="customer-name">{{ row.CUSTOMER_NAME || '-' }}</td>
                    <td><span class="job-id">{{ row.ASSIGNMENT_ID || '-' }}</span></td>
                    <td>{{ formatDate(row.JOB_DATE) }}</td>
                    <td class="job-desc">{{ row.JOB_DESCRIPTION || '-' }}</td>
                    <td>
                      <span class="status-badge" :class="getStatusClass(row.JOB_STATUS)">
                        {{ row.JOB_STATUS || '-' }}
                      </span>
                    </td>
                    <td>{{ row.TECHNICIAN_NAME || '-' }}</td>
                    <td>
                      <span v-if="row.TECHNICIAN_TYPE" class="type-badge">
                        {{ row.TECHNICIAN_TYPE }}
                      </span>
                      <span v-else>-</span>
                    </td>
                    <td>
                      <span v-if="row.SCORE" class="rating">⭐ {{ row.SCORE }}</span>
                      <span v-else class="no-rating">ยังไม่ได้ให้คะแนน</span>
                    </td>
                    <td class="comment-cell">
                      <span v-if="row.COMMENT" class="comment-text">{{ row.COMMENT }}</span>
                      <span v-else class="no-comment">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Summary -->
            <div class="history-summary">
              <p class="summary-text">
                📊 แสดง <strong>{{ Math.min(20, userHistory.length) }}</strong> รายการ จากทั้งหมด <strong>{{ userHistory.length }}</strong> รายการ
              </p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="no-data">
            ❌ ไม่พบข้อมูลประวัติการใช้บริการ
          </div>
        </div>

        <!-- ⭐⭐⭐ Technician Earnings Summary Section ⭐⭐⭐ -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">💰 สรุปรายได้ของช่าง (Technician Earnings)</h2>
            <button @click="exportTechnicianEarnings" class="export-btn">📥 ส่งออก CSV</button>
          </div>

          <!-- Loading -->
          <div v-if="loadingEarnings" class="loading-inline">
            <div class="spinner-small"></div>
            <p>กำลังโหลดข้อมูล...</p>
          </div>

          <!-- Table -->
          <div v-else-if="technicianEarnings.length > 0">
            <div class="table-wrapper">
              <table class="data-table earnings-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>รหัสช่าง</th>
                    <th>ชื่อช่าง</th>
                    <th>ประเภท</th>
                    <th>งานที่ทำเสร็จ</th>
                    <th class="highlight-col">รายได้รวม (฿)</th>
                    <th>ค่าเฉลี่ย/งาน (฿)</th>
                    <th>คะแนนเฉลี่ย</th>
                    <th>จำนวนรีวิว</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(tech, index) in technicianEarnings" 
                    :key="tech.TECHNICIAN_ID"
                    :class="{ 'top-earner': index === 0, 'high-earner': index < 3 }"
                  >
                    <td>
                      <span v-if="index === 0" class="rank-medal">🥇</span>
                      <span v-else-if="index === 1" class="rank-medal">🥈</span>
                      <span v-else-if="index === 2" class="rank-medal">🥉</span>
                      <span v-else>{{ index + 1 }}</span>
                    </td>
                    <td><strong>{{ tech.TECHNICIAN_ID }}</strong></td>
                    <td class="tech-name-col">
                      <div class="tech-name">
                        <span class="badge">👨‍🔧</span>
                        {{ tech.TE_NAME }}
                      </div>
                    </td>
                    <td><span class="type-badge">{{ tech.TE_TYPE }}</span></td>
                    <td>
                      <span class="badge badge-blue">{{ tech.TOTAL_COMPLETED_JOBS }} งาน</span>
                    </td>
                    <td class="earnings-amount">฿{{ formatNumber(tech.TOTAL_WAGES_EARNED) }}</td>
                    <td class="avg-wage">฿{{ formatNumber(tech.AVG_WAGE_PER_JOB) }}</td>
                    <td>
                      <span v-if="tech.AVG_RATING > 0" class="rating">⭐ {{ tech.AVG_RATING }}</span>
                      <span v-else class="no-rating">-</span>
                    </td>
                    <td>{{ tech.REVIEW_COUNT }} รีวิว</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Summary Stats -->
            <div class="earnings-summary">
              <div class="earnings-stat-card">
                <div class="earnings-stat-icon">👨‍🔧</div>
                <div class="earnings-stat-info">
                  <p class="earnings-stat-label">ช่างทั้งหมด</p>
                  <h3 class="earnings-stat-value">{{ technicianEarnings.length }} คน</h3>
                </div>
              </div>
              <div class="earnings-stat-card highlight">
                <div class="earnings-stat-icon">💰</div>
                <div class="earnings-stat-info">
                  <p class="earnings-stat-label">รายได้รวมทั้งหมด</p>
                  <h3 class="earnings-stat-value">฿{{ formatNumber(totalEarnings) }}</h3>
                </div>
              </div>
              <div class="earnings-stat-card">
                <div class="earnings-stat-icon">📊</div>
                <div class="earnings-stat-info">
                  <p class="earnings-stat-label">ค่าเฉลี่ยต่อช่าง</p>
                  <h3 class="earnings-stat-value">฿{{ formatNumber(averageEarningsPerTech) }}</h3>
                </div>
              </div>
              <div class="earnings-stat-card top">
                <div class="earnings-stat-icon">🏆</div>
                <div class="earnings-stat-info">
                  <p class="earnings-stat-label">ช่างรายได้สูงสุด</p>
                  <h3 class="earnings-stat-value" v-if="topEarner">
                    {{ topEarner.TE_NAME }}
                  </h3>
                  <p class="earnings-stat-detail" v-if="topEarner">
                    ฿{{ formatNumber(topEarner.TOTAL_WAGES_EARNED) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="no-data">
            ❌ ไม่พบข้อมูลรายได้ของช่าง
          </div>
        </div>

        <!-- ⭐⭐⭐ Customer Location Summary Section ⭐⭐⭐ -->
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">📍 สรุปสถานที่ของลูกค้า (Customer Locations)</h2>
            <button @click="exportCustomerLocations" class="export-btn">📥 ส่งออก CSV</button>
          </div>

          <!-- Loading -->
          <div v-if="loadingLocations" class="loading-inline">
            <div class="spinner-small"></div>
            <p>กำลังโหลดข้อมูล...</p>
          </div>

          <!-- Table -->
          <div v-else-if="customerLocations.length > 0">
            <div class="table-wrapper">
              <table class="data-table location-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>รหัสลูกค้า</th>
                    <th>ชื่อลูกค้า</th>
                    <th>เบอร์โทร</th>
                    <th>จำนวนสถานที่</th>
                    <th>รายชื่อสถานที่</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(customer, index) in customerLocations.slice(0, 20)" 
                    :key="customer.USER_ID"
                    :class="{ 'has-multiple': customer.TOTAL_LOCATIONS > 1, 'no-location': customer.TOTAL_LOCATIONS === 0 }"
                  >
                    <td>{{ index + 1 }}</td>
                    <td><strong>{{ customer.USER_ID }}</strong></td>
                    <td class="customer-name">{{ customer.NAME }}</td>
                    <td>{{ customer.PHONE || '-' }}</td>
                    <td>
                      <span 
                        class="location-count-badge" 
                        :class="{
                          'badge-grey': customer.TOTAL_LOCATIONS === 0,
                          'badge-blue': customer.TOTAL_LOCATIONS === 1,
                          'badge-green': customer.TOTAL_LOCATIONS === 2,
                          'badge-gold': customer.TOTAL_LOCATIONS >= 3
                        }"
                      >
                        {{ customer.TOTAL_LOCATIONS }} สถานที่
                      </span>
                    </td>
                    <td class="location-names">
                      <span v-if="customer.LOCATION_NAMES" class="location-list">
                        {{ customer.LOCATION_NAMES }}
                      </span>
                      <span v-else class="no-location-text">ยังไม่มีสถานที่</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Summary Stats -->
            <div class="location-summary">
              <div class="location-stat-card">
                <div class="location-stat-icon">👥</div>
                <div class="location-stat-info">
                  <p class="location-stat-label">ลูกค้าทั้งหมด</p>
                  <h3 class="location-stat-value">{{ customerLocations.length }} คน</h3>
                </div>
              </div>
              <div class="location-stat-card highlight">
                <div class="location-stat-icon">📍</div>
                <div class="location-stat-info">
                  <p class="location-stat-label">สถานที่ทั้งหมด</p>
                  <h3 class="location-stat-value">{{ totalLocations }}</h3>
                </div>
              </div>
              <div class="location-stat-card">
                <div class="location-stat-icon">🏠</div>
                <div class="location-stat-info">
                  <p class="location-stat-label">ลูกค้าที่มีหลายสถานที่</p>
                  <h3 class="location-stat-value">{{ customersWithMultipleLocations }} คน</h3>
                </div>
              </div>
              <div class="location-stat-card warning">
                <div class="location-stat-icon">⚠️</div>
                <div class="location-stat-info">
                  <p class="location-stat-label">ยังไม่มีสถานที่</p>
                  <h3 class="location-stat-value">{{ customersWithoutLocations }} คน</h3>
                </div>
              </div>
            </div>

            <!-- History Summary -->
            <div class="history-summary">
              <p class="summary-text">
                📊 แสดง <strong>{{ Math.min(20, customerLocations.length) }}</strong> รายการ จากทั้งหมด <strong>{{ customerLocations.length }}</strong> รายการ
              </p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="no-data">
            ❌ ไม่พบข้อมูลสถานที่ของลูกค้า
          </div>
        </div>

        <!-- Top Technicians -->
        <div class="section-card">
          <h2 class="section-title">🏆 Top 10 ช่างที่ดีที่สุด (คะแนน 4 ขึ้นไป)</h2>
          <div v-if="topTechnicians.length === 0" class="no-data">
            ไม่มีข้อมูลช่าง
          </div>
          <div v-else class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ชื่อช่าง</th>
                  <th>ประเภท</th>
                  <th>งานทั้งหมด</th>
                  <th>งานสำเร็จ</th>
                  <th>คะแนนเฉลี่ย</th>
                  <th>จำนวนรีวิว</th>
                  <th>ค่าบริการเฉลี่ย</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tech, index) in topTechnicians" :key="tech.TECHNICIAN_ID">
                  <td>
                    <span v-if="index === 0" class="rank-medal">🥇</span>
                    <span v-else-if="index === 1" class="rank-medal">🥈</span>
                    <span v-else-if="index === 2" class="rank-medal">🥉</span>
                    <span v-else>{{ index + 1 }}</span>
                  </td>
                  <td>
                    <div class="tech-name">
                      <span class="badge">👨‍🔧</span>
                      {{ tech.TE_NAME }}
                    </div>
                  </td>
                  <td><span class="type-badge">{{ tech.TE_TYPE }}</span></td>
                  <td><span class="badge badge-blue">{{ tech.TOTAL_JOBS }}</span></td>
                  <td><span class="badge badge-green">{{ tech.COMPLETED_JOBS }}</span></td>
                  <td>
                    <span class="rating">⭐ {{ tech.AVG_RATING }}</span>
                  </td>
                  <td>{{ tech.REVIEW_COUNT }} รีวิว</td>
                  <td class="price">฿{{ formatNumber(tech.AVG_SERVICE_PRICE) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Current Jobs -->
        <div class="section-card">
          <h2 class="section-title">📋 งานที่กำลังดำเนินการ</h2>
          <div v-if="currentJobs.length === 0" class="no-data">
            ไม่มีงานที่กำลังดำเนินการ
          </div>
          <div v-else class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>รหัสงาน</th>
                  <th>วันที่</th>
                  <th>ลูกค้า</th>
                  <th>เบอร์โทร</th>
                  <th>ช่าง</th>
                  <th>บริการ</th>
                  <th>สถานะ</th>
                  <th>ราคา</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="job in currentJobs" :key="job.ASSIGNMENT_ID">
                  <td><strong>{{ job.ASSIGNMENT_ID }}</strong></td>
                  <td>{{ job.JOB_DATE }}</td>
                  <td>{{ job.CUSTOMER_NAME }}</td>
                  <td>{{ job.CUSTOMER_PHONE }}</td>
                  <td>{{ job.TECH_NAME }}</td>
                  <td>{{ job.SERVICE_NAME || job.SERVICE_TYPE }}</td>
                  <td>
                    <span class="status-badge" :class="getStatusClass(job.ASTATUS)">
                      {{ job.STATUS_TH }}
                    </span>
                  </td>
                  <td class="price">฿{{ formatNumber(job.TOTAL_PRICE) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Success Rate -->
        <div class="section-card">
          <h2 class="section-title">📈 อัตราความสำเร็จของช่าง</h2>
          <div v-if="successRate.length === 0" class="no-data">
            ไม่มีข้อมูลอัตราความสำเร็จ
          </div>
          <div v-else class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ชื่อช่าง</th>
                  <th>ประเภท</th>
                  <th>งานทั้งหมด</th>
                  <th>งานสำเร็จ</th>
                  <th>อัตราความสำเร็จ</th>
                  <th>คะแนนเฉลี่ย</th>
                  <th>จำนวนรีวิว</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tech, index) in successRate" :key="tech.TECHNICIAN_ID">
                  <td>{{ index + 1 }}</td>
                  <td>{{ tech.TE_NAME }}</td>
                  <td><span class="type-badge">{{ tech.TE_TYPE }}</span></td>
                  <td>{{ tech.TOTAL_JOBS }}</td>
                  <td>{{ tech.COMPLETED_JOBS }}</td>
                  <td>
                    <div class="progress-bar">
                      <div class="progress-fill" :style="{ width: tech.SUCCESS_RATE_PERCENT + '%' }"></div>
                      <span class="progress-text">{{ tech.SUCCESS_RATE_PERCENT }}%</span>
                    </div>
                  </td>
                  <td>
                    <span class="rating">⭐ {{ tech.AVG_RATING }}</span>
                  </td>
                  <td>{{ tech.REVIEW_COUNT }} รีวิว</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const user = ref(null);
const stats = ref({});
const topTechnicians = ref([]);
const currentJobs = ref([]);
const successRate = ref([]);
const monthlyRevenue = ref([]);
const customerLTV = ref([]);
const userHistory = ref([]);
const technicianEarnings = ref([]);
const customerLocations = ref([]);

const loading = ref(true);
const loadingLTV = ref(true);
const loadingHistory = ref(true);
const loadingEarnings = ref(true);
const loadingLocations = ref(true);
const error = ref('');

// Computed Properties สำหรับ Monthly Revenue
const totalJobs = computed(() => {
  return monthlyRevenue.value.reduce((sum, row) => sum + (row.TOTAL_COMPLETED_JOBS || 0), 0);
});

const totalRevenue = computed(() => {
  return monthlyRevenue.value.reduce((sum, row) => sum + (row.TOTAL_REVENUE || 0), 0);
});

const overallAverage = computed(() => {
  if (totalJobs.value === 0) return 0;
  return totalRevenue.value / totalJobs.value;
});

// Computed Properties สำหรับ Customer LTV
const totalCustomerRevenue = computed(() => {
  return customerLTV.value.reduce((sum, customer) => sum + (customer.TOTAL_SPENDING || 0), 0);
});

const averageCustomerSpending = computed(() => {
  if (customerLTV.value.length === 0) return 0;
  return totalCustomerRevenue.value / customerLTV.value.length;
});

// Computed Properties สำหรับ Technician Earnings
const totalEarnings = computed(() => {
  return technicianEarnings.value.reduce((sum, tech) => sum + (tech.TOTAL_WAGES_EARNED || 0), 0);
});

const averageEarningsPerTech = computed(() => {
  if (technicianEarnings.value.length === 0) return 0;
  return totalEarnings.value / technicianEarnings.value.length;
});

const topEarner = computed(() => {
  if (technicianEarnings.value.length === 0) return null;
  return technicianEarnings.value[0];
});

// Computed Properties สำหรับ Customer Locations
const totalCustomersWithLocations = computed(() => {
  return customerLocations.value.filter(c => c.TOTAL_LOCATIONS > 0).length;
});

const totalLocations = computed(() => {
  return customerLocations.value.reduce((sum, c) => sum + (c.TOTAL_LOCATIONS || 0), 0);
});

const customersWithMultipleLocations = computed(() => {
  return customerLocations.value.filter(c => c.TOTAL_LOCATIONS > 1).length;
});

const customersWithoutLocations = computed(() => {
  return customerLocations.value.filter(c => c.TOTAL_LOCATIONS === 0).length;
});

onMounted(async () => {
  console.log('🚀 Dashboard mounted');
  
  const storedUser = localStorage.getItem('user');
  
  if (!storedUser) {
    console.warn('❌ No user found');
    router.push('/admin/login');
    return;
  }

  user.value = JSON.parse(storedUser);
  
  if (user.value.role !== 'admin') {
    console.warn('❌ Not admin');
    alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
    router.push('/admin/login');
    return;
  }

  await fetchAllData();
  await fetchCustomerLTV();
  await fetchUserHistory();
  await fetchTechnicianEarnings();
  await fetchCustomerLocations();
});

async function fetchAllData() {
  loading.value = true;
  error.value = '';
  
  try {
    const [statsRes, topTechRes, jobsRes, rateRes, revenueRes] = await Promise.all([
      axios.get('http://localhost:3000/api/admin/dashboard/stats', { withCredentials: true }),
      axios.get('http://localhost:3000/api/admin/dashboard/top-technicians', { withCredentials: true }),
      axios.get('http://localhost:3000/api/admin/dashboard/current-jobs', { withCredentials: true }),
      axios.get('http://localhost:3000/api/admin/dashboard/success-rate', { withCredentials: true }),
      axios.get('http://localhost:3000/api/admin/monthly-revenue', { withCredentials: true })
    ]);
    
    stats.value = statsRes.data;
    topTechnicians.value = topTechRes.data;
    currentJobs.value = jobsRes.data;
    successRate.value = rateRes.data;
    monthlyRevenue.value = revenueRes.data;
    
    console.log('✅ All data loaded');
    
  } catch (err) {
    console.error('❌ Error loading data:', err);
    error.value = 'ไม่สามารถโหลดข้อมูลได้';
    
    if (err.response?.status === 403 || err.response?.status === 401) {
      alert('Session หมดอายุ กรุณาเข้าสู่ระบบใหม่');
      localStorage.removeItem('user');
      router.push('/admin/login');
    }
  } finally {
    loading.value = false;
  }
}

async function fetchCustomerLTV() {
  loadingLTV.value = true;
  try {
    const response = await axios.get('http://localhost:3000/api/admin/customer-ltv', {
      withCredentials: true
    });
    customerLTV.value = response.data;
    console.log('✅ Customer LTV loaded:', customerLTV.value.length, 'รายการ');
  } catch (error) {
    console.error('❌ Error loading Customer LTV:', error);
  } finally {
    loadingLTV.value = false;
  }
}

async function fetchUserHistory() {
  loadingHistory.value = true;
  try {
    const response = await axios.get('http://localhost:3000/api/admin/all-users-history', {
      withCredentials: true
    });
    userHistory.value = response.data;
    console.log('✅ User History loaded:', userHistory.value.length, 'รายการ');
  } catch (error) {
    console.error('❌ Error loading User History:', error);
  } finally {
    loadingHistory.value = false;
  }
}

async function fetchTechnicianEarnings() {
  loadingEarnings.value = true;
  try {
    const response = await axios.get('http://localhost:3000/api/admin/technician-earnings', {
      withCredentials: true
    });
    technicianEarnings.value = response.data;
    console.log('✅ Technician Earnings loaded:', technicianEarnings.value.length, 'รายการ');
  } catch (error) {
    console.error('❌ Error loading Technician Earnings:', error);
  } finally {
    loadingEarnings.value = false;
  }
}

async function fetchCustomerLocations() {
  loadingLocations.value = true;
  try {
    const response = await axios.get('http://localhost:3000/api/admin/customer-locations', {
      withCredentials: true
    });
    customerLocations.value = response.data;
    console.log('✅ Customer Locations loaded:', customerLocations.value.length, 'รายการ');
  } catch (error) {
    console.error('❌ Error loading Customer Locations:', error);
  } finally {
    loadingLocations.value = false;
  }
}

async function handleLogout() {
  try {
    await axios.post('http://localhost:3000/api/admin/logout', {}, { withCredentials: true });
  } catch (err) {
    console.error('Logout error:', err);
  } finally {
    localStorage.removeItem('user');
    router.push('/admin/login');
  }
}

function getStatusClass(status) {
  const statusMap = {
    'Pending': 'status-pending',
    'In Progress': 'status-progress',
    'Completed': 'status-completed',
    'Cancelled': 'status-cancelled'
  };
  return statusMap[status] || 'status-default';
}

function formatNumber(num) {
  if (!num) return '0.00';
  return Number(num).toLocaleString('th-TH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function exportMonthlyRevenue() {
  let csv = 'เดือน/ปี,จำนวนงาน,รายได้รวม,ค่าเฉลี่ย/งาน\n';
  
  monthlyRevenue.value.forEach(row => {
    csv += `"${row.MONTH_THAI} (${row.MONTH_TEXT})",`;
    csv += `${row.TOTAL_COMPLETED_JOBS},`;
    csv += `${row.TOTAL_REVENUE},`;
    csv += `${row.AVG_JOB_PRICE}\n`;
  });
  
  csv += `\nรวมทั้งหมด,${totalJobs.value},${totalRevenue.value},${overallAverage.value}`;
  
  const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Monthly_Revenue_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  console.log('✅ ส่งออก Monthly Revenue CSV สำเร็จ');
}

function exportCustomerLTV() {
  let csv = 'ลำดับ,รหัสลูกค้า,ชื่อ,เบอร์โทร,อีเมล,จำนวนงานจอง,ยอดใช้จ่าย,งานแรก,งานล่าสุด\n';
  
  customerLTV.value.forEach((customer, index) => {
    csv += `${index + 1},`;
    csv += `${customer.USER_ID},`;
    csv += `"${customer.CUSTOMER_NAME}",`;
    csv += `${customer.PHONE || '-'},`;
    csv += `${customer.EMAIL || '-'},`;
    csv += `${customer.TOTAL_JOBS_BOOKED},`;
    csv += `${customer.TOTAL_SPENDING},`;
    csv += `${formatDate(customer.FIRST_JOB_DATE)},`;
    csv += `${formatDate(customer.LATEST_JOB_DATE)}\n`;
  });
  
  csv += `\nสรุป,,,,,${customerLTV.value.length} คน,${totalCustomerRevenue.value},,`;
  
  const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Customer_LTV_Report_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  console.log('✅ ส่งออก Customer LTV CSV สำเร็จ');
}

function exportUserHistory() {
  let csv = 'รหัสลูกค้า,ชื่อลูกค้า,รหัสงาน,วันที่,คำอธิบาย,สถานะ,ชื่อช่าง,ประเภทช่าง,คะแนน,ความคิดเห็น\n';
  
  userHistory.value.forEach(row => {
    csv += `${row.USER_ID},`;
    csv += `"${row.CUSTOMER_NAME || '-'}",`;
    csv += `${row.ASSIGNMENT_ID || '-'},`;
    csv += `${formatDate(row.JOB_DATE)},`;
    csv += `"${(row.JOB_DESCRIPTION || '-').replace(/"/g, '""')}",`;
    csv += `${row.JOB_STATUS || '-'},`;
    csv += `"${row.TECHNICIAN_NAME || '-'}",`;
    csv += `${row.TECHNICIAN_TYPE || '-'},`;
    csv += `${row.SCORE || '-'},`;
    csv += `"${(row.COMMENT || '-').replace(/"/g, '""')}"\n`;
  });
  
  const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `User_History_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  console.log('✅ ส่งออก User History CSV สำเร็จ');
}

function exportTechnicianEarnings() {
  let csv = 'ลำดับ,รหัสช่าง,ชื่อช่าง,ประเภท,จำนวนงาน,รายได้รวม,ค่าเฉลี่ย/งาน,คะแนนเฉลี่ย,จำนวนรีวิว\n';
  
  technicianEarnings.value.forEach((tech, index) => {
    csv += `${index + 1},`;
    csv += `${tech.TECHNICIAN_ID},`;
    csv += `"${tech.TE_NAME}",`;
    csv += `${tech.TE_TYPE},`;
    csv += `${tech.TOTAL_COMPLETED_JOBS},`;
    csv += `${tech.TOTAL_WAGES_EARNED},`;
    csv += `${tech.AVG_WAGE_PER_JOB},`;
    csv += `${tech.AVG_RATING},`;
    csv += `${tech.REVIEW_COUNT}\n`;
  });
  
  csv += `\nสรุป,,,ช่างทั้งหมด: ${technicianEarnings.value.length} คน,งานทั้งหมด: ${technicianEarnings.value.reduce((sum, t) => sum + t.TOTAL_COMPLETED_JOBS, 0)},รายได้รวม: ${totalEarnings.value},,`;
  
  const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Technician_Earnings_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  console.log('✅ ส่งออก Technician Earnings CSV สำเร็จ');
}

function exportCustomerLocations() {
  let csv = 'ลำดับ,รหัสลูกค้า,ชื่อลูกค้า,เบอร์โทร,จำนวนสถานที่,รายชื่อสถานที่\n';
  
  customerLocations.value.forEach((customer, index) => {
    csv += `${index + 1},`;
    csv += `${customer.USER_ID},`;
    csv += `"${customer.NAME}",`;
    csv += `${customer.PHONE || '-'},`;
    csv += `${customer.TOTAL_LOCATIONS},`;
    csv += `"${customer.LOCATION_NAMES || '-'}"\n`;
  });
  
  csv += `\nสรุป,ลูกค้าทั้งหมด: ${customerLocations.value.length} คน,,,สถานที่ทั้งหมด: ${totalLocations.value},`;
  
  const blob = new Blob(["\ufeff" + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Customer_Locations_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  console.log('✅ ส่งออก Customer Locations CSV สำเร็จ');
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Sarabun', sans-serif;
}

.admin-navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.logo {
  font-size: 2rem;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.admin-name {
  font-weight: 600;
  color: #333;
}

.logout-btn {
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(245, 87, 108, 0.4);
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 0.5rem;
}

.dashboard-header p {
  color: #666;
  font-size: 1.1rem;
}

.loading {
  text-align: center;
  padding: 4rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #667eea;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.retry-btn {
  padding: 0.8rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 3rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.card-blue .stat-icon { background: rgba(102, 126, 234, 0.1); }
.card-green .stat-icon { background: rgba(46, 213, 115, 0.1); }
.card-orange .stat-icon { background: rgba(255, 159, 64, 0.1); }
.card-red .stat-icon { background: rgba(255, 107, 107, 0.1); }

.stat-info h3 {
  font-size: 2.5rem;
  margin: 0;
  color: #333;
  font-weight: 700;
}

.stat-info p {
  margin: 0.3rem 0 0;
  color: #666;
  font-size: 0.95rem;
}

.section-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.section-title {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.export-btn {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #2ed573, #1db954);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(46, 213, 115, 0.4);
}

.no-data {
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.1rem;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #f8f9fa;
}

.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
}

.data-table tbody tr:hover {
  background: #f8f9fa;
}

/* Revenue Table */
.revenue-table .highlight-row {
  background: rgba(46, 213, 115, 0.05);
  font-weight: 600;
}

.revenue-table tfoot {
  background: #f8f9fa;
  border-top: 3px solid #667eea;
}

.total-row td {
  padding: 1.2rem 1rem;
  font-size: 1.05rem;
}

.month-display {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.month-thai {
  color: #667eea;
  font-size: 1rem;
  font-weight: 700;
}

.month-text {
  color: #999;
  font-size: 0.85rem;
}

.revenue-amount {
  font-weight: 700;
  font-size: 1.15rem;
  color: #2ed573;
}

.avg-price {
  color: #666;
  font-weight: 600;
}

/* Revenue Summary Cards */
.revenue-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.summary-icon {
  font-size: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.summary-label {
  font-size: 0.85rem;
  opacity: 0.9;
  margin: 0 0 0.3rem;
}

.summary-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

/* Customer LTV Section */
.loading-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  color: #999;
}

.spinner-small {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.ltv-table .top-customer {
  background: rgba(255, 215, 0, 0.05);
}

.ltv-table .highlight-col {
  color: #2ed573;
  font-weight: 700;
}

.customer-name {
  font-weight: 600;
  color: #333;
}

.email {
  color: #999;
  font-size: 0.85rem;
}

.spending-amount {
  font-weight: 700;
  font-size: 1.15rem;
  color: #2ed573;
}

/* LTV Summary Stats */
.ltv-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.ltv-stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s;
}

.ltv-stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.ltv-stat-card.highlight {
  background: linear-gradient(135deg, #2ed573 0%, #1db954 100%);
  box-shadow: 0 4px 15px rgba(46, 213, 115, 0.3);
}

.ltv-stat-card.highlight:hover {
  box-shadow: 0 8px 25px rgba(46, 213, 115, 0.4);
}

.ltv-stat-icon {
  font-size: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.ltv-stat-label {
  font-size: 0.85rem;
  opacity: 0.9;
  margin: 0 0 0.3rem;
}

.ltv-stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

/* User Assignment History Section */
.history-table {
  font-size: 0.9rem;
}

.history-table th {
  white-space: nowrap;
  font-size: 0.85rem;
}

.history-table td {
  vertical-align: top;
}

.job-id {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
}

.job-desc {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
  font-size: 0.85rem;
}

.comment-cell {
  max-width: 180px;
}

.comment-text {
  display: block;
  color: #555;
  font-size: 0.85rem;
  line-height: 1.4;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.no-rating,
.no-comment {
  color: #ccc;
  font-size: 0.85rem;
  font-style: italic;
}

.history-summary {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: center;
}

.summary-text {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.summary-text strong {
  color: #667eea;
  font-weight: 700;
}

/* Technician Earnings Section */
.earnings-table .top-earner {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%);
  border-left: 4px solid #ffd700;
}

.earnings-table .high-earner {
  background: rgba(46, 213, 115, 0.03);
}

.earnings-table .highlight-col {
  color: #2ed573;
  font-weight: 700;
}

.tech-name-col {
  min-width: 180px;
}

.earnings-amount {
  font-weight: 700;
  font-size: 1.2rem;
  color: #2ed573;
}

.avg-wage {
  color: #667eea;
  font-weight: 600;
}

/* Earnings Summary Stats */
.earnings-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.earnings-stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s;
}

.earnings-stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.earnings-stat-card.highlight {
  background: linear-gradient(135deg, #2ed573 0%, #1db954 100%);
  box-shadow: 0 4px 15px rgba(46, 213, 115, 0.3);
}

.earnings-stat-card.highlight:hover {
  box-shadow: 0 8px 25px rgba(46, 213, 115, 0.4);
}

.earnings-stat-card.top {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.earnings-stat-card.top:hover {
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
}

.earnings-stat-card.top .earnings-stat-icon {
  background: rgba(0, 0, 0, 0.1);
}

.earnings-stat-icon {
  font-size: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.earnings-stat-label {
  font-size: 0.85rem;
  opacity: 0.9;
  margin: 0 0 0.3rem;
}

.earnings-stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.earnings-stat-detail {
  font-size: 0.9rem;
  margin: 0.3rem 0 0;
  opacity: 0.9;
}

/* Customer Location Summary Section */
.location-table .has-multiple {
  background: rgba(46, 213, 115, 0.03);
}

.location-table .no-location {
  background: rgba(255, 193, 7, 0.03);
}

.location-count-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
}

.location-count-badge.badge-grey {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
}

.location-count-badge.badge-blue {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.location-count-badge.badge-green {
  background: rgba(46, 213, 115, 0.1);
  color: #2ed573;
}

.location-count-badge.badge-gold {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.location-names {
  max-width: 400px;
}

.location-list {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.5;
  word-wrap: break-word;
}

.no-location-text {
  color: #999;
  font-style: italic;
  font-size: 0.85rem;
}

/* Location Summary Stats */
.location-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.location-stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s;
}

.location-stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.location-stat-card.highlight {
  background: linear-gradient(135deg, #2ed573 0%, #1db954 100%);
  box-shadow: 0 4px 15px rgba(46, 213, 115, 0.3);
}

.location-stat-card.highlight:hover {
  box-shadow: 0 8px 25px rgba(46, 213, 115, 0.4);
}

.location-stat-card.warning {
  background: linear-gradient(135deg, #ff9f43 0%, #ff6b6b 100%);
  box-shadow: 0 4px 15px rgba(255, 159, 67, 0.3);
}

.location-stat-card.warning:hover {
  box-shadow: 0 8px 25px rgba(255, 159, 67, 0.4);
}

.location-stat-icon {
  font-size: 2.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.location-stat-label {
  font-size: 0.85rem;
  opacity: 0.9;
  margin: 0 0 0.3rem;
}

.location-stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

/* Common Styles */
.badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.badge-blue {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.badge-green {
  background: rgba(46, 213, 115, 0.1);
  color: #2ed573;
}

.rank-medal {
  font-size: 1.5rem;
}

.tech-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #333;
}

.type-badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.price {
  font-weight: 700;
  color: #2ed573;
}

.status-badge {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-pending {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.status-progress {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.status-completed {
  background: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.status-cancelled {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.status-default {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 30px;
  background: #f0f0f0;
  border-radius: 15px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  color: #333;
  font-size: 0.85rem;
}

.rating {
  color: #ffc107;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .revenue-summary,
  .ltv-summary,
  .earnings-summary,
  .location-summary {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .revenue-summary,
  .ltv-summary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .admin-navbar {
    flex-direction: column;
    gap: 1rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .export-btn {
    width: 100%;
  }

  .table-wrapper {
    font-size: 0.85rem;
  }

  .data-table th,
  .data-table td {
    padding: 0.7rem 0.5rem;
  }
  
  .revenue-summary,
  .ltv-summary,
  .earnings-summary,
  .location-summary {
    grid-template-columns: 1fr;
  }

  .dashboard-header h1 {
    font-size: 2rem;
  }

  .stat-card {
    padding: 1.5rem;
  }

  .stat-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
  }

  .stat-info h3 {
    font-size: 2rem;
  }

  .location-names {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .dashboard-header h1 {
    font-size: 1.8rem;
  }

  .navbar-brand {
    flex-direction: column;
    gap: 0.5rem;
  }

  .brand-name {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .stat-info h3 {
    font-size: 1.8rem;
  }

  .summary-value,
  .ltv-stat-value,
  .earnings-stat-value,
  .location-stat-value {
    font-size: 1.5rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Print Styles */
@media print {
  .admin-navbar,
  .export-btn,
  .logout-btn {
    display: none;
  }

  .section-card {
    page-break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ddd;
  }

  .dashboard-page {
    background: white;
  }
}
</style>