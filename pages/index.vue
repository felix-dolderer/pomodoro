<script setup lang="ts">
import { nanoid } from "nanoid"

definePageMeta({ middleware: "hanko-logged-in" })

const allTimers = ref<{ id: string; startTimer?: boolean }[]>([
  { id: nanoid(), startTimer: false },
])

function addTimer() {
  allTimers.value.push({ id: nanoid() })
}

function removeTimer(id: string) {
  allTimers.value = allTimers.value.filter((timer) => timer.id !== id)
}

function timerStarted(id: string) {
  const timerIdx = allTimers.value.findIndex((timer) => timer.id === id)
  if (timerIdx === -1 || !allTimers.value[timerIdx]) return

  delete allTimers.value[timerIdx].startTimer
  const timer = allTimers.value[timerIdx]
  removeTimer(id)
  allTimers.value.unshift(timer)
}

function timerFinished(id: string) {
  const finishedTimer = allTimers.value.find((timer) => timer.id === id)
  if (!finishedTimer) return

  removeTimer(id)

  allTimers.value.push(finishedTimer)

  if (
    !useAutoPlay().value ||
    !allTimers.value[0] ||
    allTimers.value[0].id === finishedTimer.id
  ) {
    return
  }

  allTimers.value[0].startTimer = true
}
</script>

<template>
  <div
    id="pomodoro-timers"
    class="h-screen -mt-20 overscroll-y-none place-content-center grid gap-4"
  >
    <ClientOnly>
      <PomodoroTimer
        v-for="timer in allTimers"
        :key="timer.id"
        :start-timer="timer.startTimer"
        @remove-timer="removeTimer(timer.id)"
        @timer-started="timerStarted(timer.id)"
        @timer-finished="timerFinished(timer.id)"
      />
    </ClientOnly>
    <UButton
      @click="addTimer"
      color="black"
      class="mx-auto w-40"
    >
      <span class="w-full text-center">
        {{ allTimers.length === 0 ? "Add First Timer" : "Add Timer" }}
      </span>
    </UButton>
  </div>
</template>
