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
        <!--<div class="bar blur">
          <input class="blurChange" type="range" id="blur" min="0" max="60" step="0.1" :value="blurValue" />
          <p>Blur</p>
        </div>
        <span id="currentValue"></span>-->
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
        <div class="action btn save">
          <a @click="SaveImage">
            <p>Save Image<img src="../assets/download.png" class="download"></p>
          </a>
        </div>
        <div class="action btn watch" @click="Watch()">
          <p>watch</p>
        </div>
        <div class="action btn candraw" @click="ChangeCanDraw()">
          <img :src="changeTwoPic" alt="" />
          <!--<p>Can Draw: {{ CanDraw }}</p>-->
        </div>
        <!--<div class="action btn what">
          <a @click="WhatIsThis">
            <p>What is this?</p>
          </a>
        </div>-->
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
import { defineComponent, inject, Ref, ref } from "vue";
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
    const demoData = new drawCircles(0, 0, 0, 0, 0, 0, 0,)
    const childDrawCircles = inject(ProductKey, [demoData]);
    const canvasReset = inject('canvasReset') as Ref
    const childWindowWidth = inject('WindowWidth') as Ref
    const childWindowHeight = inject('WindowHeight') as Ref
    const autoDraw = inject('autoDraw') as Ref
    const SavedImageJudge = inject('SavedImageJudge') as Ref
    const blurValue = inject('blurValue') as Ref
    const isLoading = inject('isLoading') as Ref
    const drawAnotherPicture = inject('drawAnotherPicture') as Ref
    const CanDraw = inject('CanDraw') as Ref
    const changeTwoPic = inject('changeTwoPic') as Ref

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
      axios
        .get<GetFromDB>(`https://watercanvas.herokuapp.com/randomgets`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res: AxiosResponse<GetFromDB>) => {
          console.log("data", typeof (res.data.data), res.data.data)
          const newData: drawCircles[] = res.data.data
          newData.forEach((element) => {

            childDrawCircles.push(element)

          })
          isLoading.value = false
          drawAnotherPicture.value = true
          generate(Math.floor(Math.random()*9))
        })
        .catch(
          error => {
            console.log(error)
            generate(Math.floor(Math.random()*9))
            drawAnotherPicture.value = true
            isLoading.value = false
          }
        )
    }

    function ChangeCanDraw() {
      ResetCanvas()
      CanDraw.value = !CanDraw.value
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
      changeTwoPic,
      blurValue,
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