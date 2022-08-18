import type {Plugin} from "vue";

export const loadDirectives : Plugin = {
    install(app) {
        app.directive("focus", {
            mounted(el) {
                el.focus();
            },
        })
    }
}