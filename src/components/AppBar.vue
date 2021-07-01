<template>
  <v-card color="light-blue lighten-4">
    <v-app-bar color="light-blue" dark app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>SkyBlue的 LoveLive! 收藏</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="refresh">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs grow v-model="active_tab">
          <v-tab @click="toCatalog('all')"> All </v-tab>
          <v-tab @click="toCatalog('muse')"> μ's </v-tab>
          <v-tab @click="toCatalog('aqours')"> Aqours </v-tab>
          <v-tab @click="toCatalog('other')"> Other </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-blue--text text--accent-4">
          <v-text-field
            class="mx-2 mb-2"
            v-model="searchtext"
            placeholder="輸入物品上的編號"
            append-icon="mdi-magnify"
            append-outer-icon="mdi-window-close"
            @click:append="search"
            @submit="search"
            @keydown.enter="search"
            @click:append-outer="searchtext = ''"
            single-line
          ></v-text-field>
          <v-list-item
            href="https://github.com/IamSkyBlue/ll_collection_web"
            target="_blank"
          >
            <v-list-item-icon>
              <v-icon>mdi-github</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Github</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view @changeTitle="changeTitle" />
    </v-main>
  </v-card>
</template>

<script>
export default {
  props: {},
  mounted() {},
  data: () => ({
    drawer: false,
    active_tab: 0,
    searchtext: "",
  }),
  methods: {
    toCatalog(catalog) {
      this.$router.push("/" + catalog);
    },
    changeTitle(index) {
      this.active_tab = index;
      console.log("this.active_tab", this.active_tab);
    },
    search() {
      this.$router.push({
        name: "Info",
        params: { id: this.searchtext },
      });
    },
    refresh() {
      this.$router.go();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: white;
  }
}
html,
body {
  overscroll-behavior: none;
}
.v-tab {
  text-transform: none !important;
}
</style>