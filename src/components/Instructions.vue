<template>
  <div class="m-3 ms-0">
    <div
      class="m-2 d-inline p-3 ps-0"
      data-bs-toggle="collapse"
      data-bs-target="#instruction-list"
      :aria-expanded="showInstructions"
      aria-controls="instruction-list"
      role="button"
      @click="showInstructions = !showInstructions"
    >
      <span>Instructions</span>
      <span class="ms-2">{{ showInstructions ? "▼" : "▶" }}</span>
    </div>
  </div>
  <div id="instruction-list" class="collapse show">
    <ol class="list-group list-group-numbered">
      <li class="list-group-item">
        <span
          >Click on the number after <i>Tokens</i> to enter the amount of tokens
          you own. Currently at </span
        ><span
          id="instructions-token-amount-input"
          contenteditable="true"
          class="d-inline"
          @change="customSetTokenAmount"
          aria-label="enter current token amount"
          >{{ $store.state.displayedTokenAmount }}</span
        ><span> tokens.</span>
      </li>
      <li class="list-group-item">
        Select a token goal from the dropdown menu next to <i>Goal</i> or click
        the square to the left to enter a custom amount.
      </li>
      <p class="m-2 mt-3">
        Repeat these steps until the token goal is aquired:
      </p>
      <li class="list-group-item">
        <span>Always bet on </span
        ><span class="bg-green text-white ps-1 pe-1">GREEN</span
        ><span>. The wheel has a 3/4 chance of ending up on it.</span>
      </li>
      <li class="list-group-item">
        <span
          >Place a bet with the same amount of tokens as the value next to
          <i>Bet</i>. Currently at
        </span>
        <div class="d-inline-block">
          <span>{{ $store.state.displayedBet }} tokens.</span>
        </div>
      </li>
      <li class="list-group-item">
        <span>If the wheel ended on green, click on the green box </span>
        <div class="d-inline-flex">
          <span>(</span>
          <div
            class="bg-green highlight-active small-square align-self-center"
            role="button"
            @click="$store.dispatch('winBet')"
          />
          <span>)</span>
        </div>
        <span>. If the wheel ended on orange, click on the orange box </span>
        <div class="d-inline-flex">
          <span>(</span>
          <div
            class="bg-orange highlight-active small-square align-self-center"
            role="button"
            @click="$store.dispatch('loseBet')"
          />
          <span>)</span>
        </div>
        <span>.</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInstructions: true,
    };
  },
  mounted() {
    const _this = this;
    const tokenAmountInput = document.getElementById(
      "instructions-token-amount-input"
    );

    tokenAmountInput.addEventListener("beforeinput", (event) => {
      if (event.inputType === "insertParagraph") {
        event.preventDefault();
        event.target.blur();
      }
    });

    tokenAmountInput.addEventListener("focusout", (event) => {
      _this.customSetTokenAmount(Number(event.target.innerHTML));
    });
  },
  methods: {
    customSetTokenAmount(value) {
      this.$store.dispatch("setCustomTokenAmount", value);
    },
  },
};
</script>

<style scoped>
.small-square {
  width: 1em;
  height: 1em;
  margin: 0.15em;
}
</style>
