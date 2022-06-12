<template>
    <StepWrap
        class="task-item flex bg-white rounded text-lg py-5"
        :finish="task.finish"
        tabindex="0"
        ref="root"
    >
        <IconColumn>
            <FinishButton
                class="text-2xl"
                @click.stop="$emit('toggleStatus', task)"
                :finish="task.finish"
            />
        </IconColumn>

        <span>{{ task.name }}</span>

        <IconColumn class="ml-auto">
            <button class="text-2xl">
                <Icon icon="ic:round-star-border" />
            </button>
        </IconColumn>
    </StepWrap>
</template>

<script setup>
import FinishButton from "@/components/FinishButton.vue";
import { Icon } from "@iconify/vue";
import IconColumn from "@/components/IconColumn.vue";
import StepWrap from "@/components/StepWrap.vue";
import Task from "@/core/model/Task";
import {registerMenu} from "@/components/context_menu/data";
import {ref, onMounted} from "vue";
import accessor from "@/core/accessor/AccessorInstance";
import {useTodoStore} from "@/stores/todo";

const props = defineProps({
    task: {
        type: Task,
        require: true
    }
});

const root = ref(null);
const todo = useTodoStore();

onMounted(() => {
    const el = root.value.el;

    registerMenu(el, {
        items: [
            {
                name: "Remove Task",
                args: {
                    el,
                    task: props.task
                },

                action: (args) => {
                    console.log( props.task, el );

                    accessor.removeTask( props.task.id ).then( r => {
                        todo.removeTask( props.task );
                    });
                }
            }
        ]
    });

});

</script>