<template>
  <body>
      <div class="colorSection">
        <div class="style color">
          <div class="picker">

          </div>
          <div class="toolBar">
            <div class="bar blur">
              <p>Blur</p>
            </div>
            <div class="bar opacity">
              <p>Opacity</p>
            </div>
          </div>
          <div class="actions">
            <div class="action what">
              <p>What is this?</p>
            </div>
            <div class="action save">
              <p>Save Image</p>
            </div>
          </div>
          <div class="SNS">
            <p>Post to SNS</p>
            <div class="logos">
              <img src="../assets/Instagram.png" class="logo insta">
              <img src="../assets/Twitter.png" class="logo twitter">
            </div>            
          </div>          
        </div>
      </div>
    </body>
  
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import colorSelector from "../tsfiles/colorSelector";

export default defineComponent({
    name: "ColorSetting",
    setup(){
        const childColorSelector = inject('ColorData') as colorSelector
        return {
            childColorSelector
            }
    }

});
</script>

<style>
body {
  height: 1300px;
  margin: 0;
  background: #fafaf7;
}

.style {
  background: #fafaf7;
  box-shadow: 15px 15px 20px #d9d7d4,
              -15px -15px 20px #fff;
}

.colorSection {
  height: 620px;
  width: 35%;
  float: left;
}

.color {
  height: 100%;
  width: 80%;
  border-radius: 50px;
  margin: 0 10%;
  padding-top: 50px;
}

.picker {
  width: 70%;
  height: 240px;
  margin: 0 15%; 
}

.toolBar {
  margin: 40px 15% 30px 15%;
}

.bar {
  width: 80%;
  height: auto;
  line-height: 34px;
  padding-left: 12px;
  margin-bottom: 20px;
  background-color:#fafaf7;
  box-shadow: inset 8px 8px 10px #d9d7d4,
              inset -8px -8px 10px #fff;
  text-align: left;
  border-radius: 20px;
}

.actions {
  margin: 10px 15%;
}

.action {
  width: 100%;
  height: auto;
  line-height: 32px;
  margin-bottom: 10px;
  background-color:#ffefbf;
  box-shadow: 4px 4px 10px #d9d7d4,
              -4px -4px 10px #fff;
  text-align: center;
  border-radius: 30px;
}

.SNS {
  margin: 30px 15%;
}

.SNS p {
  font-size: 12px;
}

.logos {
  margin-top: 10px;
}


.logo {
  height: 50px;
  width: 50px;
  float: left;
  box-shadow: 8px 8px 10px #d9d7d4,
              -8px -8px 10px #fff;
  padding: 10px;
  border-radius: 20px;
}

.insta {
  margin-left: 22%;
}

.twitter {
  margin-left: 10%;
}

p {
  font-size: 16px;
  font-weight: 700;
  color: #858585;
  margin: 0;
}

</style>