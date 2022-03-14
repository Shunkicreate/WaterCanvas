<template>
  <div class="colorSection">
    <div class="style colors">
      <div class="picker">
        <div class="colorBox random">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>random</p>
          </div>
        </div>
        <div class="colorBox red">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>red</p>
          </div>
        </div>
        <div class="colorBox orange">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>orange</p>
          </div>
        </div>
        <div class="colorBox yellow">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>yellow</p>
          </div>
        </div>
        <div class="colorBox green">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>green</p>
          </div>
        </div>
        <div class="colorBox lightblue">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>lightblue</p>
          </div>
        </div>
        <div class="colorBox blue">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>blue</p>
          </div>
        </div>
        <div class="colorBox purple">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>purple</p>
          </div>
        </div>
        <div class="colorBox pink">
          <img class="color sample" src="../assets/WaterCanvas (1).jpg">
          <div class="color text">
            <p>pink</p>
          </div>
        </div>
      </div>
      <div class="toolBar">
        <div class="bar blur">
          <input type="range" id = "blur" min="0" max="100" step="1" value="50" >
          <p>Blur</p>
        </div>
        <span id="currentValue"></span>
        <div class="bar opacity">
          <p>Opacity</p>
        </div>
      </div>
      <div class="changeArea">
        <div class="toggle" @click="ChangeMode()">
          <input type="checkbox" name="checked" />
        </div>
        <div class="mode btn reset" @click="ResetCanvas()">
          <p>Reset</p>
        </div>
      </div>
      <div class="actions">
        <div class="action btn generate" @click="generate()">
          <p>Generate canvas</p>
        </div>
        <div class="action btn what">
          <a @click="WhatIsThis">
            <p>What is this?</p>
          </a>
        </div>
        <div class="action btn save">
          <a @click="SaveImage">
            <p>Save Image</p>
          </a>
        </div>
        <div class="action btn watch" @click="Watch()">
          <p>watch</p>
        </div>
      </div>
      <div class="SNS">
        <p>Post to SNS</p>
        <div class="logos">
          <div class="logoFolder">
            <img src="../assets/Instagram.png" class="logo instagram" />
          </div>
          <div class="logoFolder">
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" target="_blank" rel="noopener">
              <img src="../assets/Twitter.png" class="logo twitter" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from "vue";
import colorSelector from "../tsfiles/colorSelector";
import drawCircles from "../tsfiles/drawCirclesClass";
import { generatePicture } from "../tsfiles/generatePicture";
import { ProductKey } from '../tsfiles/symbols'
import $ from 'jquery';
import axios, { AxiosResponse } from 'axios'


export default defineComponent({
  name: "ColorSetting",
  setup() {
    const childColorSelector = inject('ColorData') as colorSelector
    const mode = inject('mode') as Ref
    // let childDrawCircles = inject('CircleData') as drawCircles[]
    const demoData = new drawCircles(0, 0, 0, 0, 0, 0, 0,)
    const childDrawCircles = inject(ProductKey, [demoData]);
    const canvasReset = inject('canvasReset') as Ref
    const childWindowWidth = inject('WindowWidth') as number
    const childWindowHeight = inject('WindowHeight') as number
    const autoDraw = inject('autoDraw') as Ref
    const SavedImageJudge = inject('SavedImageJudge') as Ref
    const blurValue = inject('blurValue') as Ref
    const isLoading = inject('isLoading') as Ref

    function generate() {
      ResetCanvas()
      generatePicture(childWindowWidth, childWindowHeight).forEach((element) => {
        childDrawCircles.push(element)
      })
      if (autoDraw.value == false) {
        autoDraw.value = true
      }
    }

    function ChangeMode() {
      console.log("water")
      if (autoDraw.value == true) {
        autoDraw.value = false
      }
      if (mode.value == 'canvas') {
        mode.value = 'water'
      }
      else if (mode.value == 'water') {
        mode.value = 'canvas'
      }
      canvasReset.value = !canvasReset.value
      childDrawCircles.length = 0;
    }

    function ResetCanvas() {
      canvasReset.value = !canvasReset.value
      console.log('reset')
      childDrawCircles.length = 0;
    }

    function SaveImage() {
      SavedImageJudge.value = !SavedImageJudge.value
      // pyDataJudge.value = !pyDataJudge.value
      console.log(SavedImageJudge.value)
      axios
        .post('https://watercanvas.herokuapp.com/post', childDrawCircles)
        .catch(function (error) {
          console.log(error);
        });
    }

    function WhatIsThis() {
      axios
        .get('https://watercanvas.herokuapp.com/randomget')
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    function Watch() {
      isLoading.value = true
      ResetCanvas()
      axios
        .get('https://watercanvas.herokuapp.com/randomget')
        .then((res: AxiosResponse<drawCircles[]>) => {
          console.log("data",res.data)
          res.data.forEach((element) => {
            childDrawCircles.push(element)
            isLoading.value = false
          })
        })
        .catch(
          error => {
            console.log(error)
            isLoading.value = false
          }
        )
      generate()
    }

    function blurChange(){
      // const blurValue.value = blurNum
    }

    return {
      childColorSelector,
      ChangeMode,
      ResetCanvas,
      generate,
      SaveImage,
      WhatIsThis,
      Watch,
      mode
    }
  },

  mounted() {
    $(".toggle").on("click", function () {
      $(".toggle").toggleClass("checked");
      if (!$('input[name="check"]').prop("checked")) {
        $(".toggle input").prop("checked", true);
      } else {
        $(".toggle input").prop("checked", false);
      }
    });
  }

});
</script>

<style>
.style {
  background: #fafaf7;
  box-shadow: 0.9rem 0.9rem 1.25rem #d9d7d4, -0.9rem -0.9rem 1.25rem #fff;
}

.colorSection {
  width: 32%;
  float: left;
}

.colors {
  height: 94%;
  width: 80%;
  border-radius: 3.125rem;
  margin: 0 10%;
  padding-top: 2.75rem;
  user-select: none;
}

.picker {
  width: 75%;
  height: 15rem;
  margin: auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-around;
}

.colorBox {
  flex:1 0 30%;
  border: black solid;
}

.sample {
  width: 2.8rem;
  height: 1rem;
  object-fit: cover;
}

.color p {
  font-size: 0.5rem;
}

.toolBar {
  margin: 0.5rem 15% 0.5rem 15%;
}

.bar {
  width: 80%;
  height: auto;
  line-height: 2.125rem;
  padding-left: 1.25rem;
  margin-bottom: 1.25rem;
  background-color: #fafaf7;
  box-shadow: inset 0.5rem 0.5rem 0.625rem #d9d7d4,
    inset -0.5rem -0.5rem 0.625rem #fff;
  text-align: left;
  border-radius: 1.25rem;
}

.changeArea {
  margin: 0.5rem 15% 0.5rem 15%;
  display: flex;
  justify-content: space-between;
}

.mode {
  width: 40%;
  background-color: #ffefbf;
}

.change:hover {
  box-shadow: inset 0.5rem 0.5rem 0.625rem #d9d7d4,
    inset -0.5rem -0.5rem 0.625rem #fff;
  background-color: #fff;
}

.actions {
  margin: 0.5rem 15%;
}

.action {
  width: 100%;
  background-color: #ffefbf;
}

.btn {
  height: auto;
  line-height: 2rem;
  margin-bottom: 0.625rem;
  box-shadow: 0.25rem 0.25rem 0.625rem #d9d7d4, -0.25rem -0.25rem 0.625rem #fff;
  text-align: center;
  border-radius: 1.875rem;
}

.btn:hover {
  cursor: pointer;
}

.SNS {
  width: 80%;
  /* margin: 1.875rem 15%; */
  text-align: center;
  margin: 5% auto;
}

.SNS p {
  font-size: 0.75rem;
}

.logos {
  margin: 0.625rem auto;
  width: 80%;
  display: flex;
}

.logoFolder {
  width: 40%;
  /* height: 10em; */
  margin: auto;
}

.logo {
  height: 3.125rem;
  width: 3.125rem;
  /* float: left; */
  box-shadow: 0.5rem 0.5rem 0.625rem #d9d7d4, -0.5rem -0.5rem 0.625rem #fff;
  padding: 0.625rem;
  border-radius: 1.25rem;
  margin: auto;
  justify-content: center;
}

p {
  font-size: 1rem;
  font-weight: 700;
  color: #858585;
  margin: 0;
}

.toggle {
  position: relative;
  width: 50%;
  height: 2rem;
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0.5rem 0.5rem 0.625rem #d9d7d4, -0.5rem -0.5rem 0.625rem #fff;
}
.toggle input[type="checkbox"] {
  display: none;
}
.toggle:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: #f2b6c5;
  -webkit-transition: 0.2s ease-out;
  transition: 0.2s ease-out;
}
.toggle:after {
  content: "CANVAS";
  position: absolute;
  top: 0.2rem;
  left: 0.18rem;
  width: 60%;
  height: 80%;
  display: block;
  border-radius: 1.25rem;
  background: #fff;
  -webkit-transition: 0.2s ease-out;
  transition: 0.2s ease-out;
  text-align: center;
  padding: 0.15rem 0 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #f2b6c5;
  box-sizing: border-box;
}
.toggle.checked:before {
  background: #9ed5ff;
}
.toggle.checked:after {
  content: "WATER";
  left: 37%;
  color: #9ed5ff;
  padding: 0.15rem 0 0;
}
</style>
