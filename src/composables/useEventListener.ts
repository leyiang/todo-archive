import {onMounted, onScopeDispose, onUnmounted, unref, watch} from "vue";
import {list} from "postcss";
export type Fn = () => void;

interface iEventTarget<Events> {
    addEventListener(event: Events, fn?: any, options?: any ): any;
    removeEventListener(event: Events, fn?: any, options?: any): any;
}

export interface GeneralEventListener<E = Event> {
    (evt: E): void;
}

export function useEventListener<Names extends string, EventType = Event>(
    target: iEventTarget<Names>,
    event: Names,
    listener: GeneralEventListener<EventType>,
    options?: boolean | AddEventListenerOptions
): Fn {
    onMounted(() => {
        target.addEventListener( event, listener, options );
    });

    let cleanup = () => {}

    /**
     * Handle target is ref condition
     */
    const stopWatch = watch(
        () => unref( target ),
        (el) => {
            // Target Element Being Updated
            cleanup();
            if( ! el ) return;

            el.addEventListener( event, listener, options );
            cleanup = () => {
                el.removeEventListener( event, listener, options );
                cleanup = () => {};
            }
        },
        { immediate: true, flush: "post" }
    )

    const stop = () => {
        stopWatch();
        cleanup();
    }

    onScopeDispose( stop );

    return stop;
}