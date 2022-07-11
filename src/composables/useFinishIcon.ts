import type Step from "@/core/model/Step";
import type Task from "@/core/model/Task";
import { computed } from "vue";

export default function useFinishIcon( plan: Task | Step ) {
    return computed(() => {
        return plan.finished
            ? "ic:outline-check-circle-outline"
            : "ic:outline-circle";
    });
}