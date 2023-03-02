import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      name: 'suyeah',
      followers: 0,
      likes: 0, 
      updownFlag: false,
      more: {}, // 더보기
    }
  },
  mutations: { // 데이터 변경 요청받을 메소드 정의
    changeName(state){ 
        state.name = '수에'
    },
    followersPlus(state, payload){
        state.followers += payload
    },
    likesCnt(state, updown){ // state, 클릭취소플래그
        if(updown == false){
            state.likes++
            updown = true
           
        }else if(updown == true){
            state.likes--
            updown = false
        }
        state.updownFlag = updown
    }
  },
  actions: {  // ajax 요청하는 곳 & 오래걸리는 작업
    getData(){
      axios.get(`https://codingapple1.github.io/vue/more0.json`).then(a => {
        console.log(a.data);
      })
    },
  },
})

export default store