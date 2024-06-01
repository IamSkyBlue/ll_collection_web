<template>
  <v-container fluid style="min-height: 90vh">
    <v-carousel :show-arrows="false"
      ><v-carousel-item v-for="photo in item.photos" :key="photo.slice(-10)"
        ><v-img
          :src="getImgUrl(photo)"
          class="white--text align-end"
          color="light-blue lighten-3"
          height="500px"
          contain
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <v-card-title
            class="mb-9"
            v-text="item.name"
          ></v-card-title> </v-img></v-carousel-item
    ></v-carousel>
    <v-card class="my-3" v-nl2br color="light-blue lighten-3">
      {{ item.description }}
    </v-card>
  </v-container>
</template>

<script>
import data from "../assets/data.json";
export default {
  name: "Info",
  props: ["id"],
  data: () => ({
    DB: data,
    item: "",
  }),
  directives: {
    nl2br: {
      inserted(el) {
        el.innerHTML = el.textContent.replace(/\n/g, "<br />");
      },
    },
  },
  beforeMount() {
    this.finditem();
    console.log(this.item);
    this.changeTitle();
    this.shuffle(this.DB);
  },
  methods: {
    finditem() {
      var found = false;
      this.DB.forEach((element) => {
        if (element.id == this.id) {
          this.item = element;
          found = true;
        }
      });
      if (!found) {
        this.$router.push({
          name: "Home",
        });
      }
    },
    changeTitle() {
      this.$emit("changeTitle", this.item.catalog);
    },
    shuffle(list) {
      list.forEach((element) => {
        element.randomnum = Math.random();
      });
    },
    getImgUrl: function (img) {
      return require("@/assets/images/" + img);
    },
  },
  computed: {
    randomedList: function () {
      return [...this.DB].sort(function (a, b) {
        return a.randomnum - b.randomnum;
      });
    },
  },
  watch: {
    id: function () {
      this.$router.go();
    },
  },
};
</script>


