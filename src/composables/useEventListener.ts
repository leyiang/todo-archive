import {onMounted, onUnmounted} from "vue";

export function useEventListener<E extends keyof WindowEventMap>( event: E, callback: ( e: WindowEventMap[E] ) => void ) {
    onMounted(() => {
        window.addEventListener(event, callback);
    });

    onUnmounted(() => {
        window.removeEventListener(event, callback);
    });
}