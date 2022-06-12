<template>
    <StepWrap
        class="task-item flex bg-white rounded text-lg py-5"
        :finish="task.finish"
        tabindex="0"
        ref="el"
    >
        <IconColumn>
            <FinishButton
                class="text-2xl"
                @click="$emit('toggleStatus', task)"
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

const props = defineProps({
    task: {
        type: Task,
        require: true
    }
});

const el = ref(null);

onMounted(() => {
    registerMenu(el.value.el, {
        items: [
            {
                name: "Remove Task",
                args: {
                    el: el.value.el,
                    task: props.task
                },
                action: (args) => {
                    console.log( args.task );
                }
            }
        ]
    });

});

</script>