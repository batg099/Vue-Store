<template>
  <div class="vague">
    <div class="image">
      <img 
        src="../assets/onepunch.jpeg"  
        class="image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vague'
}
</script>

<style scoped>
.vague {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  -webkit-clip-path: path("M0,20 Q20,0 40,20 T80,20 T120,20 T160,20 T200,20 T240,20 T280,20 T320,20 T360,20 T400,20 T440,20 T480,20 T520,20 T560,20 T600,20 T640,20 T680,20 T720,20 T760,20 T800,20 T840,20 T880,20 T920,20 T960,20 T1000,20 T1040,20 T1080,20 T1120,20 T1160,20 T1200,20 T1240,20 T1280,20 T1320,20 T1360,20 T1400,20 T1440,20 L1440,500 L0,500 Z");
  clip-path: path("M0,20 Q20,0 40,20 T80,20 T120,20 T160,20 T200,20 T240,20 T280,20 T320,20 T360,20 T400,20 T440,20 T480,20 T520,20 T560,20 T600,20 T640,20 T680,20 T720,20 T760,20 T800,20 T840,20 T880,20 T920,20 T960,20 T1000,20 T1040,20 T1080,20 T1120,20 T1160,20 T1200,20 T1240,20 T1280,20 T1320,20 T1360,20 T1400,20 T1440,20 L1440,500 L0,500 Z");
}






</style>

