<template>
  <div class="dashboard_page container-fluid d-flex justify-content-center flex-wrap mt-5">
    <div class="dashboard_content" v-for="item in dashItems" :key="item.id">
        <div class="dashboard_items">
          <div class="dashboard_img_text">
            <div class="dashboard_img">
              <i :class="['fas', item.src]"></i>
            </div>
            <div>
              <p class="dashboard_items_name">{{ item.name }}</p>
              <p class="dashboard_items_count">{{item.count}}</p>
            </div>
          </div>
          <hr />
        </div>
    </div>
  </div>
</template>

<script>

import AdminService from "../../services/AdminService";

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      dashItems: [
        {
          name: "Users",
          count: 0,
          src: "fa-users"
        },
        {
          name: "Products",
          count: 0,
          src: "fa-store"
        },
        {
          name: "Testimonials",
          count: 0,
          src: "fa-address-card"
        },

        {
          name: "Partners",
          count: 0,
          src: "fa-handshake"
        },

        {
          name: "Categories",
          count: 0,
          src: "fa-layer-group"
        },
      ]
    }
  },

  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser;
    }
  },

  mounted() {
    this.getStatics()
  },

  methods: {
    async getStatics() {
      const { data } = await new AdminService().statics()


      this.dashItems.forEach(item => {
        if (item.name === 'Products') {
          item.count = data.products
        }

        if (item.name === 'Categories') {
          item.count = data.categories
        }

        if (item.name === 'Testimonials') {
          item.count = data.testimonials
        }

        if (item.name === 'Partners') {
          item.count = data.partners
        }

        if (item.name === 'Products') {
          item.count = data.products
        }

        if (item.name === 'Users') {
          item.count = data.users
        }
      })
    }
  }
}
</script>

<style scoped>

.dashboard_page {
  padding: 5% 2%;
  gap: 30px;
  row-gap: 60px;
}

.dashboard_content {
  width: 400px;
}

.dashboard_items {
  box-shadow: 0 8px 24px 0 rgba(140, 149, 159, 0.2);
  padding: 10% 2%;
  width: 400px;
}

.dashboard_img {
  background-color: var(--main-color);
  width: 70px;
  height: 70px;
  border-radius: 5px;
  margin-top: -55px;
  margin-left: 10px;
  text-align: center;
  padding-top: 5.5%;
  color: white;
  font-size: 23px;
}

.dashboard_img_text{
  display: flex;
  justify-content: space-between;
}

.dashboard_items_count{
  text-align: end;
  font-size: 20px;
  font-weight: 600;
}

.dashboard_items_name{
  font-size: 24px;
  font-weight: 600;
}

@media (max-width: 450px) {
  .dashboard_content {
    width:300px;
  }

  .dashboard_items {
    width: 300px;
  }
}
</style>