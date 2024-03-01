<template>
  <div>
    <div class="landing_content">
      <p class="landing_content_text">At Pharm, your health is our priority.</p>
    </div>

    <div class="products">
      <h1 class="products_heading">{{ $t('landing.products') }}</h1>

      <div v-if="products.length" class="card-carousel-wrapper">
        <div>
          <div class="products-cards">
            <div class="products-card-child">
              <div class="product-card mt-2" v-for="product in products" :key="product.id">
                <single-product :product="product"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        {{ $t('landing.no_data') }}
      </div>
    </div>

    <div class="contact-wrapper">
      <p class="contact-heading">{{ $t('landing.contact_us') }}</p>
      <div class="contact-content">
        <div class="contact-icon-text">
          <i class="fa-solid fa-phone"></i>
          <div class="contact-phones">
            <span>{{ contacts.phone_1 }}</span>
          </div>
        </div>
        <div class="contact-icon-text">
          <i class="fa-solid fa-envelope"></i>
          <div class="contact-phones">
            <span>info@linare.am</span>
          </div>
        </div>
        <div class="contact-icon-text">
          <i class="fa-solid fa-location-dot"></i>
          <div class="contact-phones">
            <span>Yerevan, 7/43 Nansen str.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import ContactsService from "../../../services/ContactsService";
import CollaboratorsService from "../../../services/CollaboratorsService";
import ProductsService from "../../../services/ProductsService";
import SingleProduct from "../product/single-product.vue";

const introCarousel = [
  {
    title: 'landing.carousel_text2'
  },
  {
    title: 'landing.carousel_text3'
  },
  {
    title: 'landing.carousel_text1'
  }
]

const about = [
  {
    class: "fa-hotel",
    text1: "landing.helpline"
  },
  {
    class: "fa-truck-fast",
    text1: "landing.free_shipping"
  },
  {
    class: "fa-percent",
    text2: "landing.save_big"
  }
]

export default {
  name: "LandingPage",
  components: {SingleProduct},
  metaInfo: {
    title: 'Pharm',
    titleTemplate: '%s | Home',
  },
  data() {
    return {
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
      collaborators: [],
      introCarousel,
      about,
      products: [],
      contacts: {
        phone_1: '',
        phone_2: '',
        email: '',
        address: '',
        facebook: '',
        instagram: '',
      }
    }
  },

  computed: {
    locale() {
      return this.$i18n.locale
    }
  },

  mounted() {
    this.getContacts()
    this.getCollaborators()
    this.getProducts()
  },

  methods: {
    async getProducts() {
      const products = await new ProductsService().getFavouriteProducts()
      this.products = products.data.products
    },

    async getContacts() {
      const contacts = await new ContactsService().get()
      if (contacts.data?.contacts) {
        this.contacts = contacts.data.contacts
      }
    },

    async getCollaborators() {
      const collaborators = await new CollaboratorsService().get()
      this.collaborators = collaborators.data.collaborators
    }
  }
}
</script>

<style scoped>
.landing_content{
  background-image: url("https://img.freepik.com/premium-vector/abstract-geometric-background-with-green-gradient-color-banner-poster-website-design_626143-460.jpg");
  background-size: 100%;
  height: 500px;
  background-repeat: no-repeat;
}

.landing_content_text{
  color: white;
  font-size: 40px;
  font-weight: 700;
  width: 35%;
  text-align: center;
  padding-top: 9%;
  padding-left: 6%;
}

.contact-wrapper {
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
  border-top: 2px solid var(--main-color);
}

.contact-heading{
  font-size: 40px;
  font-weight: 700;
  color: var(--main-color);
}

.contact-icon-text{
  display: flex;
  align-items: center;
  gap: 13px;
  color: var(--main-color);
  justify-content: center;
  margin-top: 25px;
}

.contact-phones{
  display: flex;
  flex-direction: column;
}

.contact-content{
  display: flex;
  gap: 70px;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 0;
}

.products {
  padding: 3% 3% 0;
  text-align: center;
}

.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  color: #666a73;
}

.products-cards {
  overflow: hidden;
}

.products-card-child {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
}

.products-card-child .product-card {
  cursor: pointer;
  width: 350px;
  box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06), 0 2px 2px 0 rgba(40, 44, 53, 0.08);
  background-color: #fff;
  border-radius: 4px;
  z-index: 3;
  margin: 10px;
}

.products-card-child .product-card img:hover {
  opacity: 0.5;
}

.products-card-child .product-card--footer {
  height: 125px;
  padding: 10px;
  background-color: var(--main-color);
  border-top: 0;
}

.products-card-child .product-card--footer p {
  padding: 3px 0;
  margin: 0 0 2px;
  font-size: 19px;
  font-weight: 500;
  color: #FFFFFF;
  user-select: none;
}

.products-card-child .product-card--footer p.price {
  font-size: 15px;
  font-weight: 500;
  padding: 4px;
  color: #FFFFFF;
}

.products_heading {
  color: var(--main-color);
  font-size: 40px;
  padding-bottom: 2%;
}

.icons_part > div > p {
  margin: 0;
}

.info_text > div > div > p {
  margin: 0;
}

.product-card {
  position: relative;
}

.fa-phone-volume::before {
  font-size: 25px;
}

@media only screen and (max-width: 1300px) {
  .landing_content_text{
    width: 60%;
  }
}

@media only screen and (max-width: 750px) {
  .landing_content_text{
    width: 60%;
  }

  .landing_content{
    height: 400px;
  }
}

@media only screen and (max-width: 655px) {
  .slide-left > p {
    font-size: 25px;
    margin-top: 8%;
  }
}

@media only screen and (max-width: 570px) {
  .landing_content_text{
    width: 95%;
    font-size: 30px;
  }

  .landing_content{
    height: 220px;
  }
}

@media only screen and (max-width: 495px) {
  .slide-left > p {
    font-size: 22px;
    max-height: 20%;
  }

  .products_heading {
    font-size: 25px;
  }
}

@media only screen and (max-width: 400px) {
  .products-card-child .product-card {
    width: 100%;
    object-fit: contain;
  }
}

@media only screen and (max-width: 330px) {
  .landing_content_text{
    font-size: 25px;
  }

  .landing_content{
    height: 180px;
  }
}
</style>