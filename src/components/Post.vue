<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style=" { backgroundImage: `url(${postings.userImage})` } "></div>
      <span class="profile-name">{{postings.name}}</span>
    </div>
    <div @click="$store.commit('likesCnt', likesFlag); likesFlag = $store.state.updownFlag" :class="postings.filter" class="post-body" :style=" { backgroundImage: `url(${postings.postImage})` } "></div>
    <div class="post-content">
      <p @click="$store.commit('likesCnt', likesFlag); likesFlag = $store.state.updownFlag">💗{{ $store.state.likes }} likes</p> 
      <!-- <p @click="$state.commit('likesCnt', likesFlag);">💗{{postings.likes}} likes</p> -->
      <p><strong>{{postings.name}}</strong> <span class="korFont">{{postings.content}}</span></p>
      <p class="date">{{postings.date}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      likesFlag: false, // like o,x
    };
  },
  props: {
    postings: Object,
  },
  methods: {
  },  
};
</script>

<style>

.korFont {
  font-family: "AppleSDGothicNeoM00";
}

.post {
  width: 100%;
}
.profile {
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  /* background-image: url({{postings.postImage}}); */
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>