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

Vue.prototype.$NotificationSuccess = function(text, obj) {
  /* "OBJ" - not required */
  this.$notify({
    type: "success",
    group: "group-default",
    duration: 2800,
    text: '<i class="material-icons fix-icon-pos">done</i>' + text
  });
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
  } else {
    this.$notify({
      group: "group-default",
      type: "error",
      duration: 3000,
      text: "Erro desconhecido"
    });
  }
};

Vue.prototype.$NotificationInfo = function(text, obj) {
  /* "OBJ" - not required */
  this.$notify({
    type: "info",
    group: "group-default",
    duration: 2800,
    text: '<i class="material-icons fix-icon-pos"> error_outline</i>' + text
  });
};
Vue.prototype.$NotificationWarn = function(text, obj) {
  /* "OBJ" - not required */
  this.$notify({
    title: "////////  console.log()",
    type: "warn",
    group: "group-default",
    duration: 3800,
    text:
      '<i class="material-icons fix-icon-pos">timer</i>' +
      text +
      "<br />" +
      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small><strong>" +
      obj +
      "</strong></small>"
  });
};

// Kill LocalStorage
Vue.prototype.$KillLocalStorageTraining = function(training_id) {
  let key_storage = training_id;
  window.onbeforeunload = function() {
    localStorage.removeItem(training_id);
    return "";
  };
};
