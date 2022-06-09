<template>
    <div class="flex py-4">
        <IconColumn>
            <FinishButton
                class="text-xl"
            />
        </IconColumn>

        <GhostInput
            value="This is a step"
        />
    </div>
</template>

<script setup>
    import IconColumn from "@/components/IconColumn.vue"
    import FinishButton from "@/components/FinishButton.vue"
    import GhostInput from "@/components/GhostInput.vue"
</script>