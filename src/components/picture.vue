
<style module>
  .wrap {
    width: 500px;
    position: relative;
    top: 50%;
    background: #fff;
    margin: 0 auto;
    transform: translateY(-60%);
  }
</style>

<template>
  <div class="ve-dialog" v-show="showPopup" @click.self="hideDialog">
    <div :class="$style.wrap">
      <div class="ve-dialog-header">{{lang.title}}<a href="javascript:;" class="ve-close" @click="hideDialog">&times;</a></div>
      <div class="ve-dialog-body">
        <p>{{realFIlezize(maxFileZise)}}</p>
      </div>
      <div class="ve-dialog-body">
        <form ref="form">
          <input type="file" name="image" @change="changeHandler" ref="file">
        </form>
        <div class="ve-preview" v-if="url">
            <a :href="url" target="_blank">{{veditorfilename(url)}}</a>
        </div>
      </div>
      <div class="ve-dialog-footer">
        <div class="ve-btn-box">
          <button class="ve-btn" @click="hideDialog">{{lang.cancel}}</button>
          <button class="ve-btn" @click="certainHandler">{{lang.ok}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getLang } from '../config/lang.js'
  import { getConfig } from '../config/'

  export default {
    data () {
      return {
        url: '',
        lang: getLang('picture'),
        uploadUrl: getConfig('uploadUrl'),
        maxFileZise:getConfig('maxFileZise'),
      }
    },
    computed: {
      showPopup: function () {
        return this.$store.state.toolbar.picture.showPopup
      }
    },
    watch: {
      'showPopup': function (val) {
        if (val) {
          document.body.classList.add('ve-fixed')
        } else {
          document.body.classList.remove('ve-fixed')
        }
      }
    },
    methods: {
      hideDialog () {
        this.$store.dispatch('updatePopupDisplay')
      },
      changeHandler () {
        let obj = this.$refs.file
        if (navigator.userAgent.indexOf('MSIE') >= 1) { // IE
          this.url = obj.value
        } else {
          // if (obj.files.length !== 0 && obj.files.item(0).type.indexOf('image') !== -1) {
          if (obj.files.length !== 0 && obj.files.item(0) !== -1) {
            this.url = window.URL.createObjectURL(obj.files.item(0))
          }
        }
      },
      certainHandler (event) {
        let obj = this.$refs.file
        let form = this.$refs.form
        let uploadUrl = this.uploadUrl

        if(f.size <= this.maxFileZise) {
          if (this.url) {
            if (this.$parent.upload) {
              this.$parent.upload(obj, function (href) {
                this.$store.dispatch('execCommand', {name: 'insertHTML', value: `<a href="${href}">${this.veditorfilename(href)}</a>`})
                this.hideDialog()
              }.bind(this))
            } else if (uploadUrl) {
              console.log('uploadUrl',uploadUrl);
              let formData = new window.FormData(form)
              let xhr = new window.XMLHttpRequest()
              xhr.open('POST', uploadUrl)
              xhr.send(formData)
              xhr.onload = function () {
                this.$store.dispatch('execCommand', {name: 'insertHTML', value:`<a href="${xhr.responseText}">${this.veditorfilename(xhr.responseText)}</a>`})
                this.hideDialog()
              }.bind(this)
              xhr.onerror = function (err) {
                window.alert(err)
              }
            } else {
              this.$store.dispatch('execCommand', {name: 'insertHTML', value: `<a href="${this.url}">${this.veditorfilename(this.url)}</a>`})
              this.hideDialog()
            }
          } else {
            window.alert(this.lang.invalidFile)
          }
        }else{
            window.alert(this.lang.maxFileZise+this.realFIlezize(this.maxFileZise) )
        }

      },
      veditorfilename(path){
        return path.split(/(\\|\/)/g).pop();
      },
      realFIlezize(size){
        return size/1024/1024;
      }
      
    }
  }
</script>