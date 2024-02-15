<template>
  <div>
    <div class="landing_slide">
      <b-carousel
          id="carousel-fade"
          fade
          :interval="10000"
          controls
      >
        <b-carousel-slide v-for="(item, index) in introCarousel" :key="index">
          <template #img>
            <div class="slide-block-image">
              <img
                  v-if="index === 0"
                  class="d-block img-fluid w-100"
                  src="../../../assets/logos/bg1.jpg"
                  style="height: 100%; object-fit: cover"
              >
              <img
                  v-if="index === 1"
                  class="d-block img-fluid w-100"
                  src="../../../assets/logos/bg2.webp"
                  style="height: 100%; object-fit: cover"
              >
              <img
                  v-if="index === 2"
                  class="d-block img-fluid w-100"
                  src="../../../assets/logos/bg3.png"
                  style="height: 100%; object-fit: cover"
              >
            </div>

          </template>
          <div class="text_content">
            <div class="slide-left">
              <p class="slider-text">{{ $t(item.title) }}</p>
            </div>
          </div>
        </b-carousel-slide>
      </b-carousel>
    </div>

    <div class="about">
      <div class="icons_part" v-for="(item, index) in about" :key="index">
        <i class="fa_icons" :class="['fas', item.class]"></i>
        <div>
          <p>{{ $t(item.text1) }}</p>
          <p>{{ $t(item.text2) }}</p>
        </div>
      </div>
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

.contact-wrapper {
  background-color: var(--main-color);
  padding: 20px;
  text-align: center;
}

.contact-heading{
  font-size: 40px;
  font-weight: 700;
  color: white;
}

.contact-icon-text{
  display: flex;
  align-items: center;
  gap: 13px;
  color: white;
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
}

>>> .sr-only {
  display: none;
}

.text_content {
  width: 100%;
}

>>> .carousel-caption {
  position: absolute;
  right: unset !important;
  top: 22% !important;
  left: 15% !important;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  color: #fff;
  text-align: start !important;
  width: 50% !important;
}

.img-fluid {
  object-fit: cover;
  height: 700px;
}

.slide-block-image {
  display: flex;
  height: 95vh;
}

.slide-left {
  position: absolute;
  top: 40%;
  left: 35%;
  transform: translate(-70%, -50%);
}

.slide-left > p {
  display: block;
  text-align: center;
  text-transform: uppercase;
}

.slider-text {
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 0;
  animation: textBounceStretch 3s 1;
  position: relative;
}

@keyframes textBounceStretch {
  0% {
    color: white;
    margin-bottom: -40px;
  }
  30% {
    letter-spacing: 13px;
    margin-bottom: -40px;
  }
  85% {
    letter-spacing: 8px;
    margin-bottom: -40px;
  }
}

>>> .carousel-control-prev {
  opacity: 1 !important;
}

>>> .carousel-control-next {
  opacity: 1 !important;
}

>>> .carousel-control-prev-icon {
  background-color: var(--main-color);
  border-radius: 3px;
  height: 2.5rem !important;
  width: 2.5rem !important;
}

>>> .carousel-control-next-icon {
  background-color: var(--main-color);
  border-radius: 3px;
  height: 2.5rem !important;
  width: 2.5rem !important;
}

.fa_icons {
  font-size: 25px;
}

.products {
  padding: 3%;
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

.about {
  background-color: var(--main-color);
  padding: 2%;
  display: flex;
  flex-wrap: wrap;
  row-gap: 15px;
  justify-content: space-evenly;
}

.icons_part {
  display: flex;
  gap: 20px;
  color: #FFFFFF;
  font-weight: 500;
  align-items: center;
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

@media only screen and (max-width: 1635px) {
  .slide-left > p {
    font-size: 35px;
  }
}

@media only screen and (max-width: 1315px) {
  >>> .carousel-caption {
    width: 50% !important;
  }
}

@media only screen and (max-width: 885px) {
  .img-fluid {
    height: 550px !important;
  }
}

@media only screen and (max-width: 668px) {
  .about {
    row-gap: 20px;
    justify-content: flex-start;
    flex-direction: column;
    padding: 3% 3% 3% 10%;
  }
}

@media only screen and (max-width: 655px) {
  .slide-left > p {
    font-size: 25px;
    margin-top: 8%;
  }
}

@media only screen and (max-width: 495px) {
  .slide-left > p {
    font-size: 22px;
    max-height: 20%;
  }

  >>> .carousel-caption {
    width: 73% !important;
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
</style>