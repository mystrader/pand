import Vue from "vue";
import { BASE_URL } from "@/services";
/*
Vue.prototype.$myMethod = function(refChart) {
  return Object.getOwnPropertyNames(this.$refs)[refChart];
};*/

Vue.prototype.$resetGraph = function(refChart) {
  this.$refs[refChart]._data._chart.resetZoom();
};

Vue.prototype.$print = function(refChart) {
  var canvas = this.$refs[refChart].$el.lastChild;

  var href = canvas.toDataURL("image/png");

  var anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = "imagem.png";
  document.body.appendChild(anchor);
  anchor.click();
};
// Plugin Reset and Print Graph

Vue.prototype.$counter = function() {
  if (this.counter >= 1) {
    this.isShowing = true;
  }
};

Vue.prototype.$NotificationError = function(error) {
  if (error.response.status == 400) {
    this.$notify({
      group: "group-default",
      type: "error",
      duration: 3000,
      text: error.response.data.Error
    });
  } else if (error.response.status == 500) {
    window.location.href = `/_feedback/500`;
  }
};
Vue.prototype.$NotificationSuccess = function(text, obj) {
  /* "OBJ" - not required */

  this.$notify({
    type: "success",
    group: "group-default",
    duration: 2800,
    text: text
  });
};
