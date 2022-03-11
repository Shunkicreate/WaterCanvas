<template>
  <body>
      <div class="colorSection">
        <div class="style color">
          <div class="picker">
            <!-- うんち -->
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
  height: 42.5rem;
  margin: 0;
  background: #fafaf7;
}

.style {
  background: #fafaf7;
  box-shadow: 0.9rem 0.9rem 1.25rem #d9d7d4,
              -0.9rem -0.9rem 1.25rem #fff;
}

.colorSection {
  height: 38.75rem;
  width: 35%;
  float: left;
}

.color {
  height: 100%;
  width: 80%;
  border-radius: 3.125rem;
  margin: 0 10%;
  padding-top: 3.125rem;
}

.picker {
  width: 70%;
  height: 15rem;
  margin: 0 15%;
}

.toolBar {
  margin: 2.5rem 15% 1.875rem 15%;
}

.bar {
  width: 80%;
  height: auto;
  line-height: 2.125rem;
  padding-left: 1.25rem;
  margin-bottom: 1.25rem;
  background-color:#fafaf7;
  box-shadow: inset 0.5rem 0.5rem 0.625rem #d9d7d4,
              inset -0.5rem -0.5rem 0.625rem #fff;
  text-align: left;
  border-radius: 1.25rem;
}

.actions {
  margin: 0.625rem 15%;
}

.action {
  width: 100%;
  height: auto;
  line-height: 2rem;
  margin-bottom: 0.625rem;
  background-color:#ffefbf;
  box-shadow: 0.25rem 0.25rem 0.625rem #d9d7d4,
              -0.25rem -0.25rem 0.625rem #fff;
  text-align: center;
  border-radius: 1.875rem;
}

.SNS {
  margin: 1.875rem 15%;
}

.SNS p {
  font-size: 0.75rem;
}

.logos {
  margin-top: 0.625rem;
}


.logo {
  height: 3.125rem;
  width: 3.125rem;
  float: left;
  box-shadow: 0.5rem 0.5rem 0.625rem #d9d7d4,
              -0.5rem -0.5rem 0.625rem #fff;
  padding: 0.625rem;
  border-radius: 1.25rem;
}

.insta {
  margin-left: 22%;
}

.twitter {
  margin-left: 10%;
}

p {
  font-size: 1rem;
  font-weight: 700;
  color: #858585;
  margin: 0;
}

</style>