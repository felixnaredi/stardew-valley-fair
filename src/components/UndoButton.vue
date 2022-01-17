<template>
  <div
    id="undo-button"
    class="d-flex flex-column align-items-center p-1 pt-2 border rounded"
    :class="{
      active: !historyIsEmpty,
      'text-secondary': historyIsEmpty,
      'border-dark': !historyIsEmpty,
    }"
    @click="$store.dispatch('undo')"
  >
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 423.754 423.754"
      style="enable-background: new 0 0 423.754 423.754"
      xml:space="preserve"
      width="18px"
      height="18px"
    >
      <path
        d="M354.24,47.4l39.879-39.879H272.196v121.924l60.801-60.801c56,50.066,77.251,132.004,46.918,205.235
	c-18.585,44.869-53.531,79.815-98.4,98.4c-44.866,18.585-94.288,18.585-139.158,0c-44.869-18.585-79.815-53.531-98.4-98.4
	c-18.585-44.869-18.585-94.29,0-139.159l-27.717-11.48c-21.651,52.272-21.651,109.848,0,162.12
	c21.652,52.272,62.364,92.984,114.637,114.636c26.14,10.827,53.595,16.24,81.06,16.239c27.459-0.001,54.927-5.414,81.061-16.239
	c52.271-21.652,92.983-62.364,114.636-114.636C442.739,200.6,418.532,105.826,354.24,47.4z"
      />
    </svg>
    <label class="d-block user-select-none" for="#undo-button">undo</label>
  </div>
</template>

<script>
export default {
  name: "UndoButton",
  computed: {
    historyIsEmpty() {
      return this.$store.state.history.length === 0;
    },
  },
};
</script>

<style scoped>
.text-secondary svg {
  fill: rgb(110, 116, 125);
}

.active {
  cursor: pointer;
}

.active * {
  cursor: pointer;
}
</style>