class Strategy {
  get strategyName() {
    return "None";
  }

  get bet() {
    return 0;
  }

  /**
   * Next strategy for a winning bet.
   */
  nextStrategyForWin() {
    return new Strategy();
  }

  /**
   * Next strategy for a losing bet.
   */
  nextStrategyForLose() {
    return new Strategy();
  }

  /**
   * Next strategy for when the token amount changes.
   */
  nextStrategyForTokenAmountChanged() {
    return new Strategy();
  }

  /**
   * Next strategy for when the token goal changes.
   */
  nextStrategyForTokenGoalChanged() {
    return new Strategy();
  }
}

export class KellyBetStrategy extends Strategy {
  _bet = 0;

  constructor({ tokenAmount, tokenGoal }) {
    super();
    this._bet = KellyBetStrategy.#evaluateBet(tokenAmount, tokenGoal);
  }

  get strategyName() {
    return "Kelly Bet";
  }

  get bet() {
    return this._bet;
  }

  static #evaluateBet(tokenAmount, tokenGoal) {
    const maxBet = tokenGoal - tokenAmount;
    if (tokenAmount === 1) {
      return 1;
    } else {
      return Math.max(0, Math.min(maxBet, Math.floor(tokenAmount / 2)));
    }
  }

  nextStrategyForWin(payload) {
    return new KellyBetStrategy(payload);
  }

  nextStrategyForLose(payload) {
    return new KellyBetStrategy(payload);
  }

  nextStrategyForTokenAmountChanged(payload) {
    return new KellyBetStrategy(payload);
  }

  nextStrategyForTokenGoalChanged(payload) {
    return new KellyBetStrategy(payload);
  }
}
