<script setup lang="ts">
import Modal from "@/components/common/Modal.vue";
import AInput from "@/components/common/AInput.vue";
import IconButton from "@/components/common/IconButton.vue";
import { ref } from "vue";
import Label from "@/core/model/Label";
import {adapter, useTodoStore} from "@/stores/TodoStore";
import EditLabelItem from "./EditLabelItem.vue";

const showSetting = ref(false);
const todoStore = useTodoStore();

function createLabel(e: SubmitEvent) {
    const data = new FormData(e.target as HTMLFormElement);
    const value = data.get("name")?.toString().trim() as string;
    const color = data.get("color")?.toString() as string;
    const textColor = Label.getTextColor( color );

    if( textColor !== null ) {
        adapter.addLabel(value, color, textColor).then((raw) => {
            todoStore.addLabel( raw );
        });
    }
}
</script>

<template>
    <div class="p-1rem pb-0">
        <IconButton
            icon="ic:baseline-settings" ml-auto
            @click="showSetting = true"
        />
    </div>

    <Modal
        v-if="showSetting"
        @close="showSetting = false"
        width="600"
    >
        <template #header>
            <h4 class="m0">Edit Labels</h4>
        </template>

        <div class="flex flex-col gap-2">
            <EditLabelItem
                v-for="label in todoStore.labels"
                :label="label"
            ></EditLabelItem>
        </div>

        <form class="flex gap-2 mt-1rem" @submit.prevent="createLabel">
            <a-input type="color" name="color" style="padding: 0"/>
            <a-input flex-1 required name="name" />
            <IconButton icon="ic:outline-plus"></IconButton>
        </form>
    </Modal>
</template>