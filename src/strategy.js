class Strategy {
  get strategyName() {
    return "None";
  }

  getBetSize() {
    return 0;
  }

  undo() {}
}

export class KellyBetStrategy extends Strategy {
  get strategyName() {
    return "Kelly Bet";
  }

  getBetSize(tokens, tokenGoal) {
    const maxBet = tokenGoal - tokens;
    if (tokens === 1) {
      return 1;
    } else {
      return Math.max(0, Math.min(maxBet, Math.floor(tokens / 2)));
    }
  }
}
