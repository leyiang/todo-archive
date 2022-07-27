<script setup lang="ts">
import { computed } from "vue";
import Step from "@/core/model/Step";
import GhostInput from "@/components/common/GhostInput.vue";
import { Icon } from "@iconify/vue"
import useFinishIcon from "@/composables/useFinishIcon";
import {nextTick, onMounted, ref, type Ref} from "vue";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import { getTodayString, splice } from "@/shared/utils";
import Folder from "@/core/model/folder/Folder";

const todoStore = useTodoStore();
const props = defineProps({
    step: {
        type: Step,
        required: true
    }
});

const finishIcon = useFinishIcon(props.step);
const el: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
    if( el.value !== null ) {
        addNewMenu( el.value, [
            {
                name: computed(() => props.step.date === getTodayString() ? "Today's Part is done" : "Set as Today"),
                action: () => {
                    if( props.step.date === getTodayString() ) {
                        adapter.setStepProp( props.step.id, "date", null).then( affecting => {
                            props.step.date = null;

                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[id];

                                if( folder instanceof Folder ) {
                                    splice( folder.plans, props.step );
                                }
                            });
                        });
                    } else {
                        adapter.setStepProp( props.step.id, "date", getTodayString()).then( affecting => {
                            props.step.date = getTodayString();

                            affecting.forEach( id => {
                                const folder = todoStore.folderMap[ id ];

                                if( folder instanceof Folder ) {
                                    folder.plans.push(props.step);
                                }
                            });
                        });
                    }
                }
            },
            {
                name: "Remove Step",
                action: () => {
                    adapter.removeStep( props.step.id ).then( () => {
                        todoStore.removeStep( props.step );
                    });
                }
            }
        ]);
    }
});

function finishStep() {
    const currentFinishStatus = props.step.finished;
    const status = ! currentFinishStatus;

    adapter.setStepProp( props.step.id, "finished", status ).then( () => {
        props.step.finished = status;
    });
}

/**
 * Don't want right click to focus input
 * So when right click, set input to disabled
 * Mosueup to recover
 * TODO: get a better solution
 */
const inputDisabled = ref(false);
function preventInputFocusOnRightClick() {
    inputDisabled.value = true;

    nextTick(() => {
        inputDisabled.value = false;
    });
}

function renameStep(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();

    if( value.length !== 0 ) {
        adapter.setStepProp( props.step.id, "name", value ).then(() => {
            props.step.name = value;
        });
    }
}

// Component Ref
const input = ref<null | InstanceType<typeof GhostInput>>(null);
function focusInput() {
    input.value?.$el?.focus();
}
</script>

<template>
    <div
        data-test="step-item"
        data-context-trigger
        ref="el"
        @click.self="focusInput"

        class="step-item flex items-center text-1rem"
        p="y-3 x-10px"
        hover:bg-gray-200 rounded
        :class="{ 'line-through text-gray-500': step.finished }"
    >
        <button
            data-test="step-finish-button"
            class="flex justify-between items-between text-xl mr-2" btn-reset
            @click="finishStep"
        >
            <Icon :icon="finishIcon"></Icon>
        </button>

        <GhostInput
            data-test="step-item-input"
            :value="step.name"
            :disabled="inputDisabled"
            @contextmenu="preventInputFocusOnRightClick"
            @change="renameStep"
            ref="input"

            text-1rem flex-1
        />
    </div>
</template>