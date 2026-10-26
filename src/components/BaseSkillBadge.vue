<script setup lang="ts">
import { computed } from "vue";
import BrandIcon from "@/components/BrandIcon.vue";

interface Props {
  label: string;
  icon: string;
  color: string;
  compact?: boolean;
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
    class="inline-flex max-w-full items-center border-retro font-display font-semibold text-space-indigo shadow-retro"
    :class="compact ? 'min-h-8 gap-1 rounded-control px-2 py-1 text-xs' : 'min-h-12 gap-2 rounded-control px-4 py-2 text-sm sm:text-base'"
    :style="{ backgroundColor: readableBackground }"
  >
    <BrandIcon :icon="icon" :name="label" :compact="compact" />
    <span>{{ label }}</span>
  </span>
</template>
