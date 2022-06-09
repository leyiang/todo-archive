import { defineStore } from "pinia";
import type List from "@/core/model/List";

export const useListStore = defineStore("list", {
    state: () => {
        const data : {
            focusing: List | null
        } = {
            focusing: null,
        }

        return data;
    },

    actions: {
        focus( list : List ) {
            this.focusing = list;
        }
    }
});