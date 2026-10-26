<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface Props {
  icon: string;
  name?: string;
  compact?: boolean;
}

const props = defineProps<Props>();
const customIconLoadFailed = ref(false);
const brandLogoLoadFailed = ref(false);

watch(() => [props.icon, props.name], () => {
  customIconLoadFailed.value = false;
  brandLogoLoadFailed.value = false;
});

const brandLogoSlugs: Record<string, string> = {
  android: "android",
  "android studio": "androidstudio",
  arduino: "arduino",
  angular: "angular",
  astro: "astro",
  "c sharp": "csharp",
  "c#": "csharp",
  css: "css3",
  dart: "dart",
  docker: "docker",
  figma: "figma",
  flutter: "flutter",
  go: "go",
  golang: "go",
  html: "html5",
  java: "java",
  javascript: "javascript",
  js: "javascript",
  kotlin: "kotlin",
  laravel: "laravel",
  linux: "linux",
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  n8n: "n8n",
  node: "nodedotjs",
  "node.js": "nodedotjs",
  nuxt: "nuxt",
  php: "php",
  postgresql: "postgresql",
  postman: "postman",
  python: "python",
  react: "react",
  rust: "rust",
  svelte: "svelte",
  supabase: "supabase",
  tailwind: "tailwindcss",
  "tailwind css": "tailwindcss",
  typescript: "typescript",
  ts: "typescript",
  vscode: "visualstudiocode",
  "visual studio code": "visualstudiocode",
  vue: "vuedotjs",
  "vue.js": "vuedotjs",
  wordpress: "wordpress",
};

const logoUrl = computed(() => {
  const iconUrl = props.icon.trim();
  if (/^https?:\/\//i.test(iconUrl) && !customIconLoadFailed.value) return iconUrl;

  const key = props.name?.trim().toLowerCase();
  if (key === "android") return "";
  const slug = key ? brandLogoSlugs[key] : undefined;
  return slug && !brandLogoLoadFailed.value ? `https://cdn.simpleicons.org/${slug}/1e2749` : "";
});

function handleLogoError() {
  if (/^https?:\/\//i.test(props.icon.trim()) && !customIconLoadFailed.value) {
    customIconLoadFailed.value = true;
    return;
  }

  brandLogoLoadFailed.value = true;
}

const iconPaths: Record<string, string[]> = {
  android: [
    "M7 9h10a2 2 0 0 1 2 2v5H5v-5a2 2 0 0 1 2-2Z",
    "m7 9-2-3m12 3 2-3M9 6l-1-2m7 2 1-2M5 11H3v4h2m14-4h2v4h-2M8 16v3m8-3v3",
  ],
  generic: ["M12 3 14.8 9.2 21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8L12 3Z"],
  code: ["m8 8-4 4 4 4", "m16 8 4 4-4 4", "m14 5-4 14"],
  design: ["M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.5 1.5 0 0 1 1.1-2.6H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z", "M7.5 10h.01", "M11 7h.01", "M15.5 8h.01"],
  tools: ["M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18l3 3 5.3-5.3a5 5 0 0 0 6.4-6.4L15 12l-3-3 2.7-2.7Z"],
};

const paths = computed(() => {
  if (props.name?.trim().toLowerCase() === "android") return iconPaths.android;
  return iconPaths[props.icon] ?? iconPaths.generic;
});
</script>

<template>
  <img
    v-if="logoUrl"
    :src="logoUrl"
    alt=""
    aria-hidden="true"
    class="shrink-0 object-contain"
    :class="compact ? 'h-4 w-4' : 'h-5 w-5'"
    loading="lazy"
    @error="handleLogoError"
  />
  <svg
    v-else
    aria-hidden="true"
    class="shrink-0 text-space-indigo"
    :class="compact ? 'h-4 w-4' : 'h-5 w-5'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path v-for="path in paths" :key="path" :d="path" />
  </svg>
</template>
