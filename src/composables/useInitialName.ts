import { ref } from "vue";

export default function useInitialName() {
  function getInitial(name: string): string {
    const arrayName = name.split(" ");
    const parts = ref<string[]>([]);

    for (let i = 0; i < arrayName.length; i++) {
      parts.value.push(arrayName[i].slice(0, 1));
    }
    if (parts.value.length >= 3) {
      parts.value.splice(2);
    }
    return parts.value.join("").toLocaleUpperCase();
  }
  return {
    getInitial,
  };
}
