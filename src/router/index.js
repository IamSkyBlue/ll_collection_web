import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import AppBar from "../components/AppBar.vue";
import Info from "../components/Info.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: AppBar,
        children: [
            {
                path: ":catalog",
                component: Home,
                props: (route) => {
                    switch (route.params.catalog) {
                        case "all":
                            return { catalog: 0 };
                        case "muse":
                            return { catalog: 1 };
                        case "aqours":
                            return { catalog: 2 };
                        case "other":
                            return { catalog: 3 };
                        default:
                            return { catalog: 0 };
                    }
                },
            },
            {
                path: "/Info/:id",
                name: "Info",
                component: Info,
                props: true,
            },
            {
                path: "",
                name: "Home",
                component: Home,
                props: { catalog: 0 },
            },
        ],
    },
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

export default router;
