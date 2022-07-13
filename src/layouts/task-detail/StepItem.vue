<script setup lang="ts">
import Step from "@/core/model/Step";
import GhostInput from "@/components/common/GhostInput.vue";
import { Icon } from "@iconify/vue"
import useFinishIcon from "@/composables/useFinishIcon";
import {onMounted, ref, type Ref} from "vue";
import {addNewMenu} from "@/components/common/context-menu/ContextMenuData";
import {adapter, useTodoStore} from "@/stores/TodoStore";

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
</script>

<template>
    <div
        data-test="step-item"
        data-context-trigger
        class="step-item flex items-center text-1rem py-3"
        :class="{ 'line-through': step.finished }"
        ref="el"
    >
        <button
            data-test="step-finish-button"
            class="flex justify-between items-between text-xl mr-2"
            @click="finishStep"
        >
            <Icon :icon="finishIcon"></Icon>
        </button>

        <GhostInput
            :value="step.name"
        />
    </div>
</template>