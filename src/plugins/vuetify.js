import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#7f9cdc",
        secondary: "#ee8688",
        accent: "#99d1c2",
        woodsmoke: "#040505",
        halfbaked: "#8ebccd",
        deepblush: "#eb838b",
        congobrown: "#6f3f3f",
        smaltblue: "#5a7385",
        eastbay: "#445477",
        bluebayoux: "#4f5c80",
        moodyblue: "#7790cc",
        coraltree: "#b26d6c",
      },
    },
  },
});
