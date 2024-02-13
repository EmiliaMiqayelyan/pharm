<template>
  <div>
    <active-page-template :page="$t('products.product')"/>

    <div class="product_container">
      <div class="product_info">
        <div>
          <div class="slider">
            <div class="slides" :style="{ transform: 'translateX(' + -currentIndex * 100 + '%)' }">
              <div v-for="(image, index) in product.images" :key="index" class="slide">
                <img :src="image" alt="Slide" style="width: 100%;">
              </div>
            </div>
          </div>
          <div class="thumbnail-container">
            <img v-for="(image, index) in product.images" :key="index" :src="image" alt="Thumbnail"
                 @click="changeSlide(index)"
                 class="thumbnail" :class="{ active: index === currentIndex }">
          </div>
        </div>

        <div>
          <div class="product_content_info">
            <p v-if="locale === 'en'" class="product_img_name">{{ product.title }}</p>
            <p v-if="locale === 'ru'" class="product_img_name">{{ product.title_ru }}</p>
            <p v-if="locale === 'am'" class="product_img_name">{{ product.title_am }}</p>

            <p v-if="locale === 'en'" class="product_price">{{ product.price }}</p>
            <p v-if="locale === 'ru'" class="product_price">{{ product.price_ru }}</p>
            <p v-if="locale === 'am'" class="product_price">{{ product.price_am }}</p>

            <div style="display: flex; gap: 10px; align-items: center">
              {{ $t('products.categories') }}

              <div v-for="(category, index) in product.categories" :key="index" class="product_type_text">
                <span v-if="locale === 'en'">{{ category.name }}</span>
                <span v-if="locale === 'ru'">{{ category.name_ru }}</span>
                <span v-if="locale === 'am'">{{ category.name_am }}</span>
                <span v-if="index !== product.categories.length - 1">,</span>
              </div>
            </div>
          </div>
          <div v-if="product.video" class="mt-3">
            <iframe
                v-if="product.video  && product.video !== 'null'"
                width="300"
                height="200"
                :src="product.video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            >

            </iframe>
          </div>
        </div>

      </div>
      <div style="margin-top: 5%">
        <button class="desc_btn">{{ $t('products.description') }}</button>
          <div v-if="locale === 'en'" class="mt-2" v-html="product.description"></div>
          <div v-if="locale === 'ru'" class="mt-2" v-html="product.description_ru"></div>
          <div v-if="locale === 'am'" class="mt-2" v-html="product.description_am"></div>
      </div>
    </div>
  </div>
</template>

<script>

import ActivePageTemplate from "../active-page-template.vue";
import ProductsService from "../../../services/ProductsService";

export default {
  name: "ProductPage",
  components: {ActivePageTemplate},
  metaInfo: {
    title: 'Pharm',
    titleTemplate: '%s | Product',
  },
  data() {
    return {
      product: {
        title: "",
        title_ru: "",
        title_am: "",
        images: [],
        price: "",
        price_ru: "",
        price_am: "",
        description: "",
        description_ru: "",
        description_am: "",
        shortDescription: "",
        shortDescription_ru: "",
        shortDescription_am: "",
        categories: [],
        isFavourite: false
      },
      currentIndex: 0,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale
    }
  },

  mounted() {
    this.getProducts()
  },

  methods: {
    changeSlide(index) {
      this.currentIndex = index;
    },

    async getProducts() {
      const id = this.$route.params.id

      if (id) {
        const data = await new ProductsService().getProduct(id)
        this.product = data.data || {}
      }
    }
  },
}
</script>

<style>
.product_container {
  padding: 3% 13%;
}

.product_container img {
  margin-top: 3px;
}

.product_info {
  display: flex;
  gap: 20px;
}

.product_img_name {
  color: #33A95B;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10%;
}

.product_price {
  font-size: 22px;
  color: #33A95B;
  font-weight: 500;
}

.product_type_text {
  color: #33A95B;
  font-weight: 500;
  font-size: 17px;
}

.slider {
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  box-sizing: border-box;
}

.thumbnail-container {
  margin-top: 10px;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  margin: 0 5px;
  border: 2px solid #ddd;
  border-radius: 5px;
}

.thumbnail.active {
  border-color: #33A95B;
}

.desc_btn {
  background-color: #33A95B;
  border: none;
  color: white;
  padding: 0.7% 1.6%;
  border-radius: 5px 5px 0 0;
  font-weight: 500;
}

.product_content_info {
  margin-top: 7%;
}

@media only screen and (max-width: 1500px) {
  .product_container {
    padding: 3% 5%;
  }
}

@media only screen and (max-width: 1180px) {
  .product_info {
    flex-direction: column;
  }

  .product_content_info {
    width: 100%;
  }

  .product_img_name {
    margin-bottom: 5%;
    font-size: 30px;
  }
}
</style>