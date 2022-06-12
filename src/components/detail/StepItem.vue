<template>
    <StepWrap
        class="flex py-4"
        :finish="step.finish"
        ref="root"
    >
        <IconColumn>
            <FinishButton
                class="text-xl"
                :finish="step.finish"
                @click="$emit('toggleStatus')"
            />
        </IconColumn>

        <GhostInput
            :value="step.name"
        />
    </StepWrap>
</template>

<script setup>
    import IconColumn from "@/components/IconColumn.vue"
    import FinishButton from "@/components/FinishButton.vue"
    import GhostInput from "@/components/GhostInput.vue"
    import StepWrap from "@/components/StepWrap.vue"
    import { defineProps, ref, onMounted } from "vue";
    import Step from "@/core/model/Step";
    import accessor from "@/core/accessor/AccessorInstance"
    import {useTodoStore} from "@/stores/todo";
    import {registerMenu} from "@/components/context_menu/data";

    const props = defineProps({
        step: {
            type: Step,
            required: true
        }
    });

    const root = ref(null);
    const todo = useTodoStore();

    onMounted(() => {
        const el = root.value.el;
        registerMenu(el, {
            items: [
                {
                    name: "Remove Step",
                    action: () => {
                        accessor.removeStep( props.step.id ).then( r => {
                            todo.removeStep( props.step );
                        });
                    }
                }
            ]
        })
    });
</script>