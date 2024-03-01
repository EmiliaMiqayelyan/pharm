<template>
  <header class="header">
    <router-link to="/" class="menu_item">
      <img style="width: 100px" src="../../../assets/logos/pharm-logo.png" alt="Logo"/>
    </router-link>
    <div class="menu_items">
      <div class="menu_tabs">
        <div>
          <div v-for="tab in tabs" :key="tab.value">
            <router-link :to="tab.path" class="menu_item">
              {{ $t('tabs.' + tab.name) }}
            </router-link>
          </div>
        </div>
        <LanguageComponent />
      </div>
    </div>

    <div class="menu_burger">
      <div class="burger" @click="toggleMenu">
        <i v-if="!showMenu" class="fa-solid fa-bars"></i>
      </div>

      <MobileHeader ref="mobileHeaderRef" class="admin_mobile_header" :tabs="tabs" :isAdmin="false"/>
    </div>
  </header>
</template>

<script>


import MobileHeader from "@/components/MobileHeader.vue";
import LanguageComponent from "@/components/language/LanguageComponent.vue";

const tabs = [
  {
    label: 'Home',
    path: '/',
    class: 'fa-house',
    name: 'home'
  },
  {
    label: 'Products',
    path: '/products',
    class: 'fa-store',
    name: 'products'
  },
  {
    label: 'About us',
    path: '/about-us',
    class: 'fa-address-card',
    name: 'about-us'
  },
  {
    label: 'Contacts',
    path: '/contacts',
    class: 'fa-id-card-clip',
    name: 'contacts'
  }
]

export default {
  components: {LanguageComponent, MobileHeader},
  data() {
    return {
      showMenu: false,
      tabs: tabs
    };
  },

  methods: {
    toggleMenu() {
      this.$refs.mobileHeaderRef.isMenuVisible = true
    }
  }
};
</script>

<style scoped>

.admin_mobile_header {
  display: none;
}

.header {
  height: 70px;
  width: 100%;
  position: fixed;
  z-index: 9999999;
  padding: 1% 2%;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu_items {
  display: flex;
  gap: 30px;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.menu_item {
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
}

.menu_tabs{
  display: flex;
  align-items: center;
  gap: 30px;
  width: 63%;
  justify-content: space-between;
}

.fa-bars::before {
  font-size: 20px;
}

.menu_item:hover {
  color: var(--main-color);
}

.burger {
  display: none;
}

.menu_burger {
  cursor: pointer;
  display: none;
}

@media (max-width: 910px) {
  .admin_mobile_header {
    display: block;
  }
}

@media screen and (max-width: 768px) {
  .menu_items {
    display: none;
  }

  .burger {
    display: block;
    margin-right: 10px;
  }

  .menu_burger {
    display: block;
  }
}
</style>