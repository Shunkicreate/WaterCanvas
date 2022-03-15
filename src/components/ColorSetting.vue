<template>
  <div class="colorSection" id="colorSection">
    <div class="style colors">
      <div class="picker">
        <div class="colorBox random" @click="generate(1)">
          <img class="color sample" src="../assets/random.jpeg" />
          <div class="color text">
            <p>mix</p>
          </div>
        </div>
        <div class="colorBox red" @click="generate(2)">
          <img class="color sample" src="../assets/red.jpeg" />
          <div class="color text">
            <p>red</p>
          </div>
        </div>
        <div class="colorBox orange" @click="generate(3)">
          <img class="color sample" src="../assets/orange.jpeg" />
          <div class="color text">
            <p>orange</p>
          </div>
        </div>
        <div class="colorBox yellow" @click="generate(4)">
          <img class="color sample" src="../assets/yellow.jpeg" />
          <div class="color text">
            <p>yellow</p>
          </div>
        </div>
        <div class="colorBox green" @click="generate(5)">
          <img class="color sample" src="../assets/green.jpeg" />
          <div class="color text">
            <p>green</p>
          </div>
        </div>
        <div class="colorBox lightblue" @click="generate(6)">
          <img class="color sample" src="../assets/lightblue.jpeg" />
          <div class="color text">
            <p>lightblue</p>
          </div>
        </div>
        <div class="colorBox blue" @click="generate(7)">
          <img class="color sample" src="../assets/blue.jpeg" />
          <div class="color text">
            <p>blue</p>
          </div>
        </div>
        <div class="colorBox purple" @click="generate(8)">
          <img class="color sample" src="../assets/purple.jpeg" />
          <div class="color text">
            <p>purple</p>
          </div>
        </div>
        <div class="colorBox pink" @click="generate(9)">
          <img class="color sample" src="../assets/pink.jpeg" />
          <div class="color text">
            <p>pink</p>
          </div>
        </div>
      </div>
      <div class="toolBar">
        <div class="bar blur">
          <input class="blurChange" type="range" id="blur" min="0" max="100" step="1" value="50" />
          <p>Blur</p>
        </div>
        <span id="currentValue"></span>
        <!-- <div class="bar opacity">
          <p>Opacity</p>
        </div> -->
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
        <div class="action btn candraw" @click="ChangeCanDraw()">
          <p>Can Draw: {{ CanDraw }}</p>
        </div>
        <div class="action btn what">
          <a @click="WhatIsThis">
            <p>What is this?</p>
          </a>
        </div>
        <div class="action btn save">
          <a @click="SaveImage">
            <p>Save Image<img src="../assets/download.png" class="download"></p>  
          </a>
        </div>
        <div class="action btn watch" @click="Watch()">
          <p>watch</p>
        </div>
      </div>
      <div class="SNS">
        <div class="post">
          <p>Post to SNS</p>
        </div>
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
import GetFromDB from '../tsfiles/getFromDb'


export default defineComponent({
  name: "ColorSetting",
  setup() {
    const childColorSelector = inject('ColorData') as colorSelector
    const mode = inject('mode') as Ref
    // let childDrawCircles = inject('CircleData') as drawCircles[]
    const demoData = new drawCircles(0, 0, 0, 0, 0, 0, 0,)
    const childDrawCircles = inject(ProductKey, [demoData]);
    const canvasReset = inject('canvasReset') as Ref
    const childWindowWidth = inject('WindowWidth') as Ref
    const childWindowHeight = inject('WindowHeight') as Ref
    // const childWindowColor= inject('WindowColor') as number
    const autoDraw = inject('autoDraw') as Ref
    const SavedImageJudge = inject('SavedImageJudge') as Ref
    const blurValue = inject('blurValue') as Ref
    const isLoading = inject('isLoading') as Ref
    const drawAnotherPicture = inject('drawAnotherPicture') as Ref
    const CanDraw = inject('CanDraw') as Ref

    function generate(color: number) {
      console.log('watch')
      ResetCanvas()
      generatePicture(childWindowWidth.value, childWindowHeight.value, color).forEach((element) => {
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
      canvasReset.value = true
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
      console.log('watch')
      CanDraw.value = false
      ResetCanvas()
      isLoading.value = true  //load circle and disable display
      // const axiosBase = require('axios');
      // const axios = axiosBase.create({
      //   baseURL: 'https://watercanvas.herokuapp.com', // バックエンドB のURL:port を指定する
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   responseType: 'json'
      // });
      axios
        .get<GetFromDB>(`https://watercanvas.herokuapp.com/randomgets`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        // .get<drawCircles[]>('https://watercanvas.herokuapp.com/randomget')
        .then((res: AxiosResponse<GetFromDB>) => {
          console.log("data", typeof (res.data.data), res.data.data)
          var newData: drawCircles[] = res.data.data
          // if (typeof res.data == 'string') {
          //   // const newData = res.data<drawCircles[]>
          //   // newData = res.data.replace()
          // }
          // else {
          //   newData = res.data
          // }
          // console.log(res)
          newData.forEach((element) => {

            childDrawCircles.push(element)

          })
          console.log(childDrawCircles)
          isLoading.value = false
          drawAnotherPicture.value = true
          // generate(2)
        })
        .catch(
          error => {
            console.log(error)

            // generate(2)
            drawAnotherPicture.value = true
            isLoading.value = false
          }
        )
      // generate(1)
      // drawAnotherPicture.value = true
      // isLoading.value = false
    }

    function ChangeCanDraw() {
      ResetCanvas()
      CanDraw.value = !CanDraw.value
    }

    function blurChange() {
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
      drawAnotherPicture,
      mode,
      CanDraw,
      ChangeCanDraw,
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
.colorSection {
  display: inline-flex;
  /* max-width: ; */
}

.style {
  background: #f5f5f5;
  box-shadow: 0.5rem 0.5rem 1.5rem #cccccc,
             -0.5rem -0.5rem 1.5rem #ffffff;
}

.colors {
  height: auto;
  width: 80%;
  border-radius: 3.125rem;
  margin: 0 10%;
  /* padding-top: 2.8rem; */
  user-select: none;
}

.picker {
  height: 10rem;
  margin: 2rem 15% 2rem 15%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-around;
  border-radius: 1.25rem;
  
}

.colorBox {
  flex: 1 0 33%;
  border-radius: .5rem;
}

.sample {
  width: 2.8rem;
  height: 1.8rem;
  object-fit: cover;
  margin-top: .5rem;
  border-radius: .5rem;
  box-shadow: 0.2rem 0.2rem .5rem #ccc,
            -0.2rem -0.2rem .5rem #ffffff;
}

.color p {
  font-size: 0.8rem;
  text-shadow: .2rem .2rem .5rem #cccccc,
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
  background-color: #f5f5f5;
  box-shadow: inset 0.2rem 0.2rem 1rem #cccccc,
             inset -0.2rem -0.2rem 1rem #ffffff;
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
  background-color: #f5f5f5;
}

.change:hover {
  box-shadow: inset 0.5rem 0.5rem 1.5rem #cccccc,
             inset -0.5rem -0.5rem 1.5rem #ffffff;
  background-color: #fff;
}

.actions {
  margin: 0.5rem 15%;
}

.action {
  width: 100%;
  background-color: #f5f5f5;
}

.btn {
  height: auto;
  line-height: 2rem;
  margin-bottom: 0.625rem;
  box-shadow: 0.5rem 0.5rem 1.5rem #cccccc,
             -0.5rem -0.5rem 1.5rem #ffffff;
  text-align: center;
  border-radius: 1.875rem;
}

.btn:hover {
  cursor: pointer;
}

.download {
  width: 1rem;
  height: auto;
  margin-left: .5rem;
}

.SNS {
  width: 80%;
  text-align: center;
  margin: 5% auto;
}

.SNS p {
  font-size: 0.5rem;
}

.logos {
  margin: 0.625rem auto;
  width: 80%;
  display: flex;
}

.logoFolder {
  width: 30%;
  margin: auto;
}

.logo {
  height: 2.8rem;
  width: 2.8rem;
  box-shadow: 0.5rem 0.5rem 1.5rem #cccccc,
             -0.5rem -0.5rem 1.5rem #ffffff;
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
  box-shadow: 0.5rem 0.5rem 1.5rem #cccccc,
             -0.5rem -0.5rem 1.5rem #ffffff;
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
  background: #f5f5f5;
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
  background: #aaaab3;
  -webkit-transition: 0.2s ease-out;
  transition: 0.2s ease-out;
  text-align: center;
  padding: 0.15rem 0 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #f5f5f5;
  box-sizing: border-box;
}
.toggle.checked:before {
  background: #f5f5f5;
}
.toggle.checked:after {
  content: "WATER";
  left: 37%;
  color: #f5f5f5;
  background: #98bbd9;
  padding: 0.15rem 0 0;
}

input[type="range"] {
  -webkit-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: red;
  height: 2.125rem;
  width: 5px;
}

@media only screen and (max-width: 599px) {
  .colorSection {
    display: none;
  }
}
</style>
