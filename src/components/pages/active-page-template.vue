<template>
  <div class="about_content_header">
    <div class="about_content_header_color">
      <p>{{ page }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['page']
}
</script>

<style>
.products_content_header {
  width: 100%;
  height: 255px;
}

.products_content_header_color {
  width: 100%;
  height: 100%;
  opacity: 0.8;
  color: white;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  padding: 80px 4%;
}


</style>