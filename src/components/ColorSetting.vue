<template>
  <div class="colorSection" id="colorSection">
    <div class="style colors">
      <div class="picker">
        <div class="colorBox random" @click="Generate(1)">
          <img class="color sample" src="../assets/random.jpg" />
          <div class="color text">
            <p>mix</p>
          </div>
        </div>
        <div class="colorBox red" @click="Generate(2)">
          <img class="color sample" src="../assets/red.jpg" />
          <div class="color text">
            <p>red</p>
          </div>
        </div>
        <div class="colorBox orange" @click="Generate(3)">
          <img class="color sample" src="../assets/orange.jpg" />

          <div class="color text">
            <p>orange</p>
          </div>
        </div>
        <div class="colorBox yellow" @click="Generate(4)">
          <img class="color sample" src="../assets/yellow.jpg" />
          <div class="color text">
            <p>yellow</p>
          </div>
        </div>
        <div class="colorBox green" @click="Generate(5)">
          <img class="color sample" src="../assets/green.jpg" />
          <div class="color text">
            <p>green</p>
          </div>
        </div>
        <div class="colorBox lightblue" @click="Generate(6)">
          <img class="color sample" src="../assets/lightblue.jpg" />
          <div class="color text">
            <p>lightblue</p>
          </div>
        </div>
        <div class="colorBox blue" @click="Generate(7)">
          <img class="color sample" src="../assets/blue.jpg" />
          <div class="color text">
            <p>blue</p>
          </div>
        </div>
        <div class="colorBox purple" @click="Generate(8)">
          <img class="color sample" src="../assets/purple.jpg" />
          <div class="color text">
            <p>purple</p>
          </div>
        </div>
        <div class="colorBox pink" @click="Generate(9)">
          <img class="color sample" src="../assets/pink.jpg" />
          <div class="color text">
            <p>pink</p>
          </div>
        </div>
      </div>
      <div class="toolBar">
        <!--<div class="bar blur">
          <input class="blurChange" type="range" id="blur" min="0" max="60" step="0.1" :value="BlurValue" />
          <p>Blur</p>
        </div>
        <span id="currentValue"></span>-->
        <!-- <div class="bar opacity">
          <p>Opacity</p>
        </div>-->
      </div>
      <div class="changeArea">
        <div class="toggle" @click="ChangeMode()">
          <input type="checkbox" name="checked" />
        </div>
        <div class="Mode btn reset" @click="ResetCanvas()">
          <p>Reset</p>
        </div>
      </div>
      <div class="actions">
        <div class="action btn save">
          <a @click="SaveImage">
            <p>
              Save Image
              <img src="../assets/download.png" class="download" />
            </p>
          </a>
        </div>
        <div class="action btn watch" @click="Watch()">
          <p>watch</p>
        </div>
        <div class="action btn candraw" @click="ChangeCanDraw()">
          <img :src="ChangeTwoPic"/>
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
            <a href="https://www.instagram.com/" target="_blank" rel="noopener">
              <img src="../assets/Instagram.png" class="logo instagram" />
            </a>
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
import { DrawCirclesKey } from '../tsfiles/symbols'
import $ from 'jquery';
import axios, { AxiosResponse } from 'axios'
import GetFromDB from '../tsfiles/getFromDb'

export default defineComponent({
  name: "ColorSetting",
  setup() {
    const childColorSelector = inject('ColorData') as colorSelector
    const Mode = inject('Mode') as Ref
    const demoData = new drawCircles(0, 0, 0, 0, 0, 0, 0,)
    const childDrawCircles = inject(DrawCirclesKey, [demoData]);
    const CanvasReset = inject('CanvasReset') as Ref
    const childWindowWidth = inject('WindowWidth') as Ref
    const childWindowHeight = inject('WindowHeight') as Ref
    const AutoDraw = inject('AutoDraw') as Ref
    const SavedImageJudge = inject('SavedImageJudge') as Ref
    const BlurValue = inject('BlurValue') as Ref
    const IsLoading = inject('IsLoading') as Ref
    const DrawAnotherPicture = inject('DrawAnotherPicture') as Ref
    const CanDraw = inject('CanDraw') as Ref
    const ChangeTwoPic = inject('ChangeTwoPic') as Ref
    const childgenerate = inject('Generate') as Ref
    const ColorMode = inject('ColorMode') as Ref

    function Generate(color: number) {
      console.log('watch')
      childgenerate.value == true
      ColorMode.value = color
      ResetCanvas()
      generatePicture(childWindowWidth.value, childWindowHeight.value, color).forEach((element) => {
        childDrawCircles.push(element)
      })
      if (AutoDraw.value == false) {
        AutoDraw.value = true
      }

    }

    function ChangeMode() {
      console.log("Water")
      if (AutoDraw.value == true) {
        AutoDraw.value = false
      }
      if (Mode.value == 'Canvas') {
        Mode.value = 'Water'
      }
      else if (Mode.value == 'Water') {
        Mode.value = 'Canvas'
      }
      CanvasReset.value = !CanvasReset.value
      childDrawCircles.length = 0;
    }

    function ResetCanvas() {
      CanvasReset.value = true
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
      IsLoading.value = true  //load circle and disable display
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
          IsLoading.value = false
          DrawAnotherPicture.value = true
          Generate(Math.floor(Math.random() * 9))
        })
        .catch(
          error => {
            console.log(error)
            Generate(Math.floor(Math.random() * 9))
            DrawAnotherPicture.value = true
            IsLoading.value = false
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
      Generate,
      SaveImage,
      WhatIsThis,
      Watch,
      DrawAnotherPicture,
      Mode,
      CanDraw,
      ChangeCanDraw,
      ChangeTwoPic,
      BlurValue,
      ColorMode,
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