<template>
  <div class="categories_page mt-4">
      <div class="col-md-6">
        <categories-tree-select  v-if="refresh" class="w-75" ref="categoriesRef" @onChangeValue="onChangeValue" />
      </div>
      <div class="mt-3">

        <div class="my-2">
          CREATE/UPDATE Category
        </div>

        <div>
          <div>EN</div>
          <input v-model="category.name" class="form-control mb-2" type="text" placeholder="Name">

          <div>RU</div>
          <input v-model="category.name_ru" class="form-control mb-2" type="text" placeholder="Name">

          <div>AM</div>
          <input v-model="category.name_am" class="form-control" type="text" placeholder="Name">

          <div class="form-group testimonials_text mt-2">
            <div>EN</div>
            <textarea  v-model="category.description" class="form-control testimonial_message" placeholder="Description"></textarea>
          </div>

          <div class="form-group testimonials_text mt-2">
            <div>RU</div>
            <textarea  v-model="category.description_ru" class="form-control testimonial_message" placeholder="Description"></textarea>
          </div>

          <div class="form-group testimonials_text mt-2">
            <div>AM</div>
            <textarea  v-model="category.description_am" class="form-control testimonial_message" placeholder="Description"></textarea>
          </div>
        </div>

          <div class="mt-3 gap-2 d-flex justify-content-end">
            <button v-if="!category.id" type="button" class="btn btn-primary" @click="createCategory()">Save</button>
            <button v-if="category.id" type="button" class="btn btn-primary" @click="updateCategory()">Update</button>
            <button v-if="category.id" type="button" class="btn btn-danger" @click="deleteCategory">Delete</button>
          </div>
      </div>
    </div>
</template>

<script>
import CategoriesTreeSelect from "../../categories-tree-select.vue";
import CategoriesService from "../../../services/CategoriesService";

export default {
  name: "AdminCategoriesPage",
  components: { CategoriesTreeSelect },

  data() {
    return {
      selectedCategory: '',
      refresh: true,
      category: {
        name: '',
        name_ru: '',
        name_am: '',
        description: '',
        description_ru: '',
        description_am: ''
      }
    }
  },

  methods: {
    onChangeValue(category) {
      if (!category) {
        this.category = {
          name: '',
          name_ru: '',
          name_am: '',
          description: '',
          description_ru: '',
          description_am: ''
        }
      } else {
        this.category = {...category.data}
      }
    },

    async updateCategory() {
      this.refresh = false

      if (!this.category.name) return
      await new CategoriesService().put(this.category)

      this.category = {
        name: '',
        name_ru: '',
        name_am: '',
        description: '',
        description_ru: '',
        description_am: ''
      }

      this.refresh = true
    },

    async deleteCategory() {
      this.refresh = false

      if (!this.category.id) return

      await new CategoriesService().delete(this.category.id)

      this.category = {
        name: '',
        name_ru: '',
        name_am: '',
        description: '',
        description_ru: '',
        description_am: ''
      }

      this.refresh = true
    },

    async createCategory() {
      this.refresh = false

      if (!this.category.name) return
      await new CategoriesService().post(this.category)

      this.category = {
        name: '',
        name_ru: '',
        name_am: '',
        description: '',
        description_ru: '',
        description_am: ''
      }

      this.refresh = true
    }
  }
};
</script>

<style>
.btn-primary{
  background-color: var(--main-color) !important;
  border: none;
}

.categories_page{
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #DFDFDF;
  border-radius: 5px;
  width: 50%;
}

@media (max-width: 910px) {
  .categories_page{
    width: 85%;
  }
}
</style>
