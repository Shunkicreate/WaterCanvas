<template>
  <div class="colorSection">
    <div class="style color">
      <div class="picker"></div>
      <div class="toolBar">
        <div class="bar blur">
          <p>Blur</p>
        </div>
        <div class="bar opacity">
          <p>Opacity</p>
        </div>
      </div>
      <div class="changeArea">
        <div class="mode btn reset" @click="ResetCanvas()">
          <p>Reset</p>
        </div>
        <div class="mode btn change" @click="changeMode()">
          <p>Mode: {{ mode }}</p>
        </div>
      </div>
      <div class="actions">
        <div class="toggle">
          <input type="checkbox" name="checked" placeholder="aaaaa" />
        </div>
        <div class="action btn generate" @click="generate()">
          <p>Generate canvas</p>
        </div>
        <div class="action btn what">
          <p>What is this?</p>
        </div>
        <div class="action btn save">
          <a @click="SaveImage"><p>Save Image</p></a>
        </div>
        <div class="action btn watch">
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
            <img src="../assets/Twitter.png" class="logo twitter" />
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
import axios from 'axios'


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
    const pyDataJudge = inject('pyDataJudge') as Ref

    function generate() {
      ResetCanvas()
      // console.log('in generate picture', childDrawCircles.length)
      generatePicture(childWindowWidth, childWindowHeight).forEach((element) => {
        childDrawCircles.push(element)
      })
      // console.log('aaaa generate picture', childDrawCircles.length)
      if(autoDraw.value == false){
        autoDraw.value = true
      }
    }

    function changeMode() {
      if(autoDraw.value == true){
        autoDraw.value = false
      }
      if (mode.value == 'canvas') mode.value = 'water'
      else if (mode.value == 'water') mode.value = 'canvas'
      canvasReset.value = !canvasReset.value
      childDrawCircles.length = 0;
    }
    function ResetCanvas() {
      canvasReset.value = !canvasReset.value
      console.log('reset')
      childDrawCircles.length = 0;
        // console.log('in generate picture', childDrawCircles.length, childDrawCircles)
    }

    function SaveImage (){
      SavedImageJudge.value = !SavedImageJudge.value
      pyDataJudge.value = !pyDataJudge.value
      console.log(SavedImageJudge.value)
      axios
      .post('https://watercanvas.herokuapp.com/post',childDrawCircles)
      .catch(function (error) {
        console.log(error);
        });
    }

    return {
      childColorSelector,
      changeMode,
      ResetCanvas,
      generate,
      SaveImage,
      mode
    }
  },

  mounted(){
    $(".toggle").on("click", function() {
      $(".toggle").toggleClass("checked");
      if(!$('input[name="check"]').prop("checked")) {
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

.color {
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
  width: 47%;
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
}

.instagram {
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


.toggle {
  position: relative;
  width: 50%;
  height: 48px;
  border-radius: 50px;
  overflow: hidden;
  cursor: pointer;
}
.toggle input[type=checkbox] {
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
  background: #f45e55;
  -webkit-transition: 0.2s ease-out;
  transition: 0.2s ease-out;
}
.toggle:after {
  content: "CANVAS";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 50%;
  height: 42px;
  display: block;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0 9px 28px -6px rgba(0, 0, 0, 0.3);
  -webkit-transition: 0.2s ease-out;
  transition: 0.2s ease-out;
  text-align: center;
  padding: 14px 0 0;
  line-height: 1;
  font-size: 14px;
  font-weight: bold;
  color: #df4c43;
  letter-spacing: .5px;
  box-sizing: border-box;
}
.toggle.checked:before {
  background: #24e89c;
}
.toggle.checked:after {
  content: "WATER";
  left: 50%;
  box-shadow: 0 9px 28px -6px rgba(0, 0, 0, 0.5);
  color: #16d088;
  padding: 14px 0 0 1px;
}

</style>
