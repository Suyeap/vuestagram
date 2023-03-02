<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step != 2" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish" class="publishText">Publish📤</li>
    </ul>
    <img
      src="./assets/logo.png"
      class="logo"
      @click="step = 0"
      style="cursor: pointer"
    />
    <!-- <p> {{ $store.state.name }} <span @click="$store.commit('followersPlus', 100)">followers++ {{ $store.state.followers }}</span> </p> -->
    <!-- <button @click="$store.commit('changeName')"> 버튼</button> -->
    <p> {{ $store.state.age }} </p>
    <button @click="$store.dispatch('getData')">더보기</button>
  </div>

  <button
    @click="step = 0"
    :class="[step == 0 ? 'clickedTextBold' : 'unclickedTextBold']"
  >
    posts
  </button>
  <button
    @click="step = 1"
    :class="[step == 1 ? 'clickedTextBold' : 'unclickedTextBold']"
  >
    select filters
  </button>
  <button
    @click="step = 2"
    :class="[step == 2 ? 'clickedTextBold' : 'unclickedTextBold']"
  >
    write posts
  </button>

  <Container
    :postings="postings"
    :step="step"
    :imgFile="imgFile"
    @sendMyText="myText = $event"
  />

  <!-- 더보기버튼 -->
  <button v-if="step == 0" @click="more" class="seeMoreBtn">더보기</button>

  <!-- 파일업로드 -->
  <div class="footer" v-if="step != 2">
    <ul class="footer-button-plus">
      <input
        @change="upload"
        accept="image/*"
        type="file"
        id="file"
        class="inputfile"
      />
      <!-- multiple: 다중 파일 열기, accept="image/*" => 이미지만 보여주기 -->
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>


<script>
import Container from "./components/Container.vue";
import postdata from "./assets/postdata.js";
import axios from "axios";

export default {
  name: "App",
  components: {
    Container,
  },
  data() {
    return {
      postings: postdata,
      clickToSeeMore: 0,
      seeMore: 0,
      step: 0, // tab 변수
      // fileList: [],
      imgFile: "",
      myText: "",
      isBold: false, // 볼드처리 변수
      selectedFilter: "", // 선택한 필터 변수
    };
  },
  mounted() {
    this.emitter.on("sendFilters", (filter) => {
      // param: 받아온 데이터
      console.log("filter: ", filter);
      this.selectedFilter = filter;
    });
  },
  methods: {
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.seeMore}.json`)
        .then((result) => {
          // then(): 요청 성공시
          this.postings.push(result.data); // push(): array에 데이터 추가
          this.seeMore++;
        });
    },
    upload(e) {
      // 모든 파일
      let file = e.target.files;
      this.imgFile = URL.createObjectURL(file[0]);
      console.log("imgFile: ", this.imgFile);
      this.step++;
    },
    publish() {
      var myPost = {
        name: "suyeahh",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imgFile,
        likes: 0,
        date: "Feb 15",
        liked: false,
        content: this.myText,
        filter: this.selectedFilter,
      };
      this.postings.unshift(myPost); // unshift(): 배열의 맨 앞에 추가
      console.log("event val: ", this.$event);
      console.log("myPost: ", myPost);
      this.step = 0;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}

button {
  color: skyblue;
  /* width: 100px; */
  cursor: pointer;
  margin-top: 10px;
  border: #eee;
  font-family: "consolas";
  font-size: 10px;
  left: 5%;
  float: unset;
  position: relative;
}

/* 클릭텍스트볼드처리 */
.clickedTextBold {
  font-weight: bolder;
  color: lightgrey;
}

.unclickedTextBold {
  font-weight: inherit;
  color: skyblue;
}

/* 'publish'위치조정 */
.publishText {
  margin-left: -85%;
}

/* 더보기버튼 */
.seeMoreBtn {
  margin: auto;
  float: unset;
  position: relative;
  left: 40%;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
