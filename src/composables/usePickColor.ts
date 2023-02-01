import { ref } from "vue";

const colorsProfile = ref<string[]>(['#66999B', '#FE5D9F', '#647AA3', '#5A9367', '#E08E45', '#26408B', '#63372C', '#FF7D00', '#C3423F', '#912F56', '#17BEBB', '#A50104', '#6A6262', '#EC058E', '#3772FF', '#DF2935']);
function usePickColor(): string{
  const indexColor: number = Math.floor(Math.random() * colorsProfile.value.length);
  return colorsProfile.value[indexColor];
}

export default usePickColor;