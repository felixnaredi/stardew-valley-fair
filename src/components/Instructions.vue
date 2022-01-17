<template>
  <div
    class="m-2"
    data-bs-toggle="collapse"
    data-bs-target="#instruction-list"
    aria-expanded="false"
    aria-controls="instruction-list"
    role="button"
    @click="hideInstructions = !hideInstructions"
  >
    <span>Instructions</span>
    <span class="ms-2">{{ hideInstructions ? "▶" : "▼" }}</span>
  </div>
  <div id="instruction-list" class="collapse">
    <ol class="list-group list-group-numbered">
      <li class="list-group-item">
        Click on the number after <b>Tokens</b> to enter the current amount of
        tokens you own.
      </li>
      <li class="list-group-item">
        Select token goal from dropdown menu or click the square to the left to
        enter custom amount.
      </li>
      <p class="m-2 mt-3">
        Repeat these steps until the token goal is aquired:
      </p>
      <li class="list-group-item">
        Place a bet with the same amount of tokens as the value next to
        <b>Bet</b>. Currently at {{ $store.state.displayedBet }} tokens.
      </li>
      <li class="list-group-item">
        Always bet on <span class="bg-green text-white ps-1 pe-1">GREEN</span>.
        The wheel has a 3/4 chance of ending up on it.
      </li>
      <li class="list-group-item">
        If the wheel ended on green, click on the green box (
        <div
          class="d-inline-block bg-green highlight-active small-square"
          role="button"
          @click="$store.dispatch('winBet')"
        />
        ). If the wheel ended on orange, click on the orange box (
        <div
          class="d-inline-block bg-orange highlight-active small-square"
          role="button"
          @click="$store.dispatch('loseBet')"
        />
        ).
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hideInstructions: true,
    };
  },
};
</script>

<style scoped>
.small-square {
  width: 1em;
  height: 1em;
}
</style>