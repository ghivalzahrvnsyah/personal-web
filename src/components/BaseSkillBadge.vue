<script setup lang="ts">
import { computed } from "vue";
import BrandIcon from "@/components/BrandIcon.vue";

interface Props {
  label: string;
  icon: string;
  color: string;
}

const props = defineProps<Props>();

const readableBackground = computed(() => {
  const normalized = props.color.trim();
  const match = normalized.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
  if (!match) return "#DCE8F5";

  const shortHex = match[1].length === 3;
  const hex = shortHex ? [...match[1]].map((digit) => `${digit}${digit}`).join("") : match[1];
  const channels = [0, 2, 4].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
  const luminance = channels.reduce((sum, channel) => {
    const linear = channel / 255 <= 0.04045
      ? channel / 255 / 12.92
      : ((channel / 255 + 0.055) / 1.055) ** 2.4;
    return sum + linear;
  }, 0) / 3;

  if (luminance >= 0.52) return normalized;

  const parchment = [247, 242, 235];
  const lightened = channels.map((channel, index) => Math.round(channel * 0.28 + parchment[index] * 0.72));
  return `#${lightened.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
});
</script>

<template>
  <span
    class="inline-flex min-h-12 max-w-full items-center gap-2 rounded-control border-retro px-4 py-2 font-display text-sm font-semibold text-space-indigo shadow-retro sm:text-base"
    :style="{ backgroundColor: readableBackground }"
  >
    <BrandIcon :icon="icon" :name="label" />
    <span>{{ label }}</span>
  </span>
</template>
