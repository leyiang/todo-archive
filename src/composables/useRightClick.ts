import {ref} from "vue";
import {useEventListener} from "@/composables/useEventListener";

export function useRightClick() {
    const pos = ref({
        x: 0,
        y: 0
    });

    useEventListener("contextmenu", (e) => {
        pos.value.x = e.clientX;
        pos.value.y = e.clientY;
    });

    return pos;
}
