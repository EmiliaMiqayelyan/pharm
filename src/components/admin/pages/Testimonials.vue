<template>
  <div class="testimonials_page_content container mt-4">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card admin_testimonials_content">
          <div class="card-body admin_testimonials">

            <input type="file"  class="form-control mb-3" :disabled="testimonial.avatar" @change="previewFiles" :key="fileInputKey">

            <div class="mt-2">
              <div>EN</div>
              <input v-model="testimonial.position" class="form-control" type="text" placeholder="Position">
            </div>

            <div class="mt-2">
              <div>RU</div>
              <input v-model="testimonial.position_ru" class="form-control" type="text" placeholder="Position">
            </div>

            <div class="mt-2">
              <div>AM</div>
              <input v-model="testimonial.position_am" class="form-control" type="text" placeholder="Position">
            </div>

            <div class="form-group testimonials_text">
              <div class="mt-2">
                <div>EN</div>
                <textarea v-model="testimonial.comment" class="form-control testimonial_message" placeholder="Comment"></textarea>
              </div>
              <div class="mt-2">
                <div>RU</div>
                <textarea v-model="testimonial.comment_ru" class="form-control testimonial_message" placeholder="Comment"></textarea>
              </div>

              <div class="mt-2">
                <div>AM</div>
                <textarea v-model="testimonial.comment_am" class="form-control testimonial_message" placeholder="Comment"></textarea>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button  v-if="!testimonial.id" class="btn btn-primary add_testimonials" @click="createTestimonial()">Add Testimonial</button>
            <button  v-if="testimonial.id" class="btn btn-primary add_testimonials" @click="updateTestimonial()">Update Testimonial</button>
          </div>
        </div>
      </div>
    </div>

    <div class="testimonials">
      <div class="testimonials_content">
        <div class="testimonials_desc" v-for="item in testimonials" :key="item.id">
          <div class="d-flex justify-content-end gap-2">
            <button class="icon_btn" @click="deleteTestimonials(item.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="icon_btn" @click="chooseTestimonial(item)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
          <div class="testimonial_img_name">
            <img class="testimonial_img" :src="item.avatar" alt=""/>
            <h5>{{ item.position}}</h5>
          </div>
          <p>{{ item.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TestimonialsService from "../../../services/TestimonialsService";
import {generateFormData} from "../../../../helper/generateFormData";

export default {
  name: "AdminTestimonialsPage",

  data() {
    return {
      fileInputKey: 0,
      testimonial: {
        avatar: null,
        position: '',
        position_ru: '',
        position_am: '',
        comment: '',
        comment_ru: '',
        comment_am: ''
      },
      testimonials: []
    }
  },

  mounted() {
    this.getTestimonials()
  },

  methods: {
    async getTestimonials() {
      const {data} = await new TestimonialsService().get()

      this.testimonials = data.testimonials
    },

    async createTestimonial() {
      if (!this.testimonial.position) return

      const formData = generateFormData(this.testimonial)
      await new TestimonialsService().post(formData)

      this.testimonial = {
        avatar: null,
        position: '',
        position_ru: '',
        position_am: '',
        comment: '',
        comment_ru: '',
        comment_am: ''
      }

      this.fileInputKey++

      await this.getTestimonials()
    },

    async deleteTestimonials(id) {
      if (!id) return

      await new TestimonialsService().delete(id)

      await this.getTestimonials()
    },

    chooseTestimonial(testimonial) {
      this.testimonial = {...testimonial}
    },

    previewFiles(event) {
      this.testimonial.avatar = event.target.files[0];
    },

    async updateTestimonial() {
      if (!this.testimonial.id) return

      if (!this.testimonial.position) return

      const formData = generateFormData(this.testimonial)
      await new TestimonialsService().put(formData)

      this.testimonial = {
        avatar: null,
        position: '',
        position_ru: '',
        position_am: '',
        comment: '',
        comment_ru: '',
        comment_am: ''
      }

      this.fileInputKey++

      await this.getTestimonials()
    }

  }
};
</script>

<style scoped>

.btn-primary{
  background-color: var(--main-color) !important;
  border: none;
}

.admin_testimonials_content {
  padding: 2%;
}

.admin_testimonials {
  border: 2px solid var(--main-color);
  border-radius: 7px;
  padding: 2%;
}

.testimonial_message {
  width: 100%;
}

.add_testimonials {
  margin-top: 3%;
  border: none;
  border-radius: 5px;
  padding: 8px 10px;
  font-size: 18px;
}

.testimonials_desc {
  background-color: #F4F6F9;
  width: 480px;
  font-size: 15px;
  padding: 3%;
  color: #5A6268;
}

.testimonials_content {
  display: flex;
  justify-content: space-around;
  margin-top: 3%;
}

.testimonial_img {
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;
}

.testimonial_img_name {
  overflow-x: auto;
  display: flex;
  gap: 20px;
  margin-bottom: 4%;
}

.icon_btn{
  border: none;
  background: none;
}
</style>
