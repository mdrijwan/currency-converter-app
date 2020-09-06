<template>
  <div class="about">
    <h5>
    <img alt="Vue logo" src="../assets/mdrijwan.png">
    <a href="https://www.linkedin.com/in/mdrijwan"> Created by Md Rijwan Razzaq Matin</a>
    </h5>
    <img alt="Vue logo" src="../assets/resume.png">
      <pdf src="../assets/mdrijwan.pdf"></pdf>

  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  }
}
</script>


<style scoped>
h5{
    text-align: left;
    font-family: American Typewriter, serif;
    font-variant: small-caps;
    padding: 5px;
    border-bottom: 3px solid #000;}
</style>