<template>
  <div>
    <div class="about_content">
      <div class="about_part">
        <div>
          <div>
            <p class="about_content_heading">{{ $t('about.who_we_are') }}</p>
            <p class="about_heading">{{ $t('about.about_heading') }}</p>
            <p class="about_content_text">{{ $t('about.create_technology') }}</p>
          </div>
          <div style="margin-top: 4%;">
            <div class="check_with_text" v-for="(item, index) in about" :key="index">
              <i class="check_icon" :class="['fas', item.class]"></i>
              <p class="check_text">{{ $t(item.text) }}</p>
            </div>
          </div>
        </div>
        <div>
          <img class="about_us_img" src="../../../assets/logos/IMG_4289.jpg" alt=""/>
        </div>
      </div>
    </div>

    <div v-if="testimonials.length" class="testimonials">
      <p class="testimonials_partners_heading">{{ $t('about.happy_to_say') }}</p>
      <div class="testimonials_content">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonials_desc">
          <div class="testimonial_img_name">
            <img class="testimonial_img" :src="testimonial.avatar" alt=""/>
            <h5 v-if="locale === 'en'">{{ testimonial.position }}</h5>
            <h5 v-if="locale === 'ru'">{{ testimonial.position_ru }}</h5>
            <h5 v-if="locale === 'am'">{{ testimonial.position_am }}</h5>
          </div>
          <p v-if="locale === 'en'">{{ testimonial.comment }}</p>
          <p v-if="locale === 'ru'">{{ testimonial.comment_ru }}</p>
          <p v-if="locale === 'am'">{{ testimonial.comment_am }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TestimonialsService from "../../../services/TestimonialsService";
import CollaboratorsService from "../../../services/CollaboratorsService";

export default {
  name: "AboutPage",
  metaInfo: {
    title: 'Pharm',
    titleTemplate: '%s | About us',
  },
  data() {
    return {
      testimonials: [],
      collaborators: [],
      about: [
        {
          class: "fa-check",
          text: "about.about_text1"
        },
        {
          class: "fa-check",
          text: "about.about_text2"
        },
        {
          class: "fa-check",
          text: "about.about_text3"
        },
        {
          class: "fa-check",
          text: "about.about_text4"
        },
        {
          class: "fa-check",
          text: "about.about_text5"
        },
        {
          class: "fa-check",
          text: "about.about_text6"
        },
        {
          class: "fa-check",
          text: "about.about_text7"
        },
      ]
    }
  },

  computed: {
    locale() {
      return this.$i18n.locale
    },
  },

  mounted() {
    this.getTestimonials()
    this.getCollaborators()
  },

  methods: {
    async getTestimonials() {
      const testimonials = await new TestimonialsService().get()
      this.testimonials = testimonials.data.testimonials
    },

    async getCollaborators() {
      const collaborators = await new CollaboratorsService().get()
      this.collaborators = collaborators.data.collaborators
    }
  }
}
</script>

<style>
.about_heading{
  font-size: 18px;
  margin-bottom: 45px;
  width: 85%;
}

.about_content, .testimonials {
  padding: 3% 7%;
}

.about_content_heading {
  color: #2490EB;
  font-size: 30px;
  font-weight: 700;
}

.about_content_text {
  color: #2490EB;
  font-weight: 500;
}

.check_icon {
  background-color: #E7F2F0;
  padding: 2%;
  border-radius: 3px;
}

.check_with_text {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 1.5%;
}

.check_text {
  color: #5A6268;
  width: 60%;
  margin: 0;
  font-size: 15px;
}

.testimonial_img_name {
  overflow-x: auto;
  display: flex;
  gap: 20px;
  margin-bottom: 4%;
}

.testimonials_desc {
  background-color: #F4F6F9;
  width: 30%;
  font-size: 15px;
  padding: 3%;
  color: #5A6268;
  margin-top: 5px;
}

.testimonials_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 3%;
}

.about_part {
  display: flex;
}

.about_us_img {
  height: 540px;
  object-fit: cover;
  width: 600px;
}

@media only screen and (max-width: 1155px) {
  .about_content {
    padding: 3% 7%;
  }


  .check_text {
    width: 72%;
  }

  .testimonials_desc {
    width: 38%;
  }
}

@media only screen and (max-width: 950px) {
  .about_part {
    flex-direction: column-reverse;
    row-gap: 25px;
  }

  .testimonials_desc {
    width: 300px;
  }

  .testimonials_content {
    flex-wrap: wrap;
    row-gap: 25px;
  }

  .about_us_img {
    width: 100%;
  }

  .check_text {
    width: 100%;
  }
}

@media only screen and (max-width: 495px) {
.about_content_heading {
    font-size: 25px;
  }
}

</style>