<template>
  <div class="outer">
    <!-- <p>{{html}}</p>
    <div v-if="loading">
    <p v-html="html"></p>
  </div>
    <div v-else class="outer">-->
    <iframe :src="html" frameborder="0" scrolling id="show-iframe"></iframe>
  </div>
</template>


<script>
export default {
  // 使用时请使用 :url.sync=""传值

  props: {
    url: {
      required: true
    },
    isHtml: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,

      html: ""
    };
  },

  watch: {
    url(value) {
      this.load(value);
    }
  },

  mounted() {
    this.load(this.url);
  },

  methods: {
    load(url) {
      this.html = url;
      //   if (url && url.length > 0) {
      //     console.log(url);
      //     // 加载中
      //     this.loading = true;
      //     let param = {
      //       accept: "text/html, text/plain"
      //     };
      //     this.$http
      //       .get(url, param)
      //       .then(response => {
      //         console.log(response);
      //         this.loading = false;
      //         // 处理HTML显示
      //         this.html = response.data;
      //         console.log(this.html);
      //       })
      //       .catch(() => {
      //         this.loading = false;
      //         this.html = url;
      //         console.log(this.html);
      //       });
      //   }
    }
  }
};
</script>
<style scoped lang="scss">
.linkPage {
  height: 100%;
}
.outer {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  top: (90/75) + rem;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
#show-iframe {
  width: 100%;
  height: 100%;
}
</style>