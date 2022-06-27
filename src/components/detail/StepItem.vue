<template>
    <div
        class="step-item"
        ref="el"
    >
        <StepWrap
            class="flex py-4"
            :finish="step.finish"
            ref="root"
        >
            <IconColumn>
                <FinishButton
                    class="text-xl"
                    :finish="step.finish"
                    @click="toggleStepStatus"
                />
            </IconColumn>

            <GhostInput
                class="flex-1"
                :value="step.name"
                @change="updateStepName"
            />
        </StepWrap>
    </div>
</template>

<script setup>
    import IconColumn from "@/components/IconColumn.vue"
    import FinishButton from "@/components/FinishButton.vue"
    import GhostInput from "@/components/GhostInput.vue"
    import StepWrap from "@/components/StepWrap.vue"
    import { ref, onMounted } from "vue";
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

    const el = ref(null);
    const todo = useTodoStore();

    onMounted(() => {
        registerMenu(el.value, {
            items: [
                {
                    name: "Set as today",
                    action: () => {

                    }
                },

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

    function updateStepName(e) {
        const name = e.target.value;

        accessor.updateStepProp(props.step.id, "name", name).then( r => {
        });
    }

    function toggleStepStatus() {
        const status = ! props.step.finish;

        accessor.setStepStatus( props.step.id, status).then( r => {
            props.step.finish = status;
        });
    }
</script>
