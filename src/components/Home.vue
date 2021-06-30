<template>
  <v-container fluid style="min-height: 100vh">
    <v-row v-for="item in randomedList" :key="item.id">
      <v-card
        width="100%"
        class="my-2"
        @click="toInfo(item.id)"
        v-if="item.catalog == catalog || catalog == 0"
      >
        <v-img
          :src="item.photos[0]"
          class="white--text light-blue lighten-3 align-end"
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
          <v-card-title v-text="item.name"></v-card-title>
        </v-img>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import data from "../assets/data.json";
export default {
  name: "MainPage",
  props: ["catalog"],
  data: () => ({
    active_tab: "",
    DB: data,
  }),
  beforeMount() {
    this.changeTitle();
    this.shuffle(this.DB);
  },
  methods: {
    toInfo(itemid) {
      this.$router.push({
        name: "Info",
        params: { id: itemid },
      });
    },
    changeTitle() {
      this.$emit("changeTitle", this.catalog);
    },
    shuffle(list) {
      list.forEach((element) => {
        element.randomnum = Math.random();
      });
    },
  },
  computed: {
    randomedList: function () {
      return [...this.DB].sort(function (a, b) {
        return a.randomnum - b.randomnum;
      });
    },
  },
};
</script>
