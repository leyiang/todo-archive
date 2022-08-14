<script setup lang="ts">
import Label from "@/core/model/Label";
import AInput from "@/components/common/AInput.vue";
import GhostInput from "@/components/common/GhostInput.vue";
import IconButton from "@/components/common/IconButton.vue";
import {adapter, useTodoStore} from "@/stores/TodoStore";

const todoStore = useTodoStore();
const props = defineProps<{
   label: Label,
}>();

function removeLabel() {
    adapter.removeLabel( props.label.id ).then(() => {
        todoStore.removeLabel( props.label );
    });
}

function updateLabelColor(e: Event) {
    const target = e.target as HTMLInputElement;
    const bgColor = target.value;
    const textColor = Label.getTextColor( bgColor );

    if( textColor !== null ) {
        adapter.setLabelProps( props.label.id, { bgColor, textColor }).then(() => {
            props.label.bgColor = bgColor;
            props.label.textColor = textColor;
        });
    }
}

function updateLabelName(e: Event) {
    const target = e.target as HTMLInputElement;
    const name = target.value.toString().trim();

    adapter.setLabelProps( props.label.id, { name }).then(() => {
        props.label.name = name;
    });
}
</script>

<template>
    <div data-test="label-item" class="flex">
        <a-input
            type="color"
            :value="label.bgColor"
            style="padding: 0"
            @change="updateLabelColor"
        />

        <GhostInput
            :value="label.name"
            class="flex-1 ml-.5rem mr-2 px-2"
            @change="updateLabelName"
        />

        <IconButton
            icon="ic:baseline-close"
            @click="removeLabel"
        />
    </div>
</template>