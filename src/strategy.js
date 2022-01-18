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

export class MartingaleStrategy extends Strategy {
  _bet = 0;

  constructor({ tokenAmount, tokenGoal }) {
    super();

    const maxBet = tokenGoal - tokenAmount;
    this._bet = Math.max(0, Math.min(maxBet, Math.ceil(tokenAmount / 31)));
  }

  get strategyName() {
    return "Martingale";
  }

  get bet() {
    return this._bet;
  }

  nextStrategyForWin(payload) {
    return new MartingaleStrategy(payload);
  }

  nextStrategyForLose(payload) {
    console.log(payload);
    return new MartingaleLostStrategy({ ...payload, bet: this._bet });
  }

  nextStrategyForTokenAmountChanged(payload) {
    return new MartingaleModifiedStrategy({ ...payload, bet: this._bet });
  }

  nextStrategyForTokenGoalChanged(payload) {
    return new MartingaleModifiedStrategy({ ...payload, bet: this._bet });
  }
}

class MartingaleLostStrategy extends MartingaleStrategy {
  constructor(payload) {
    super(payload);

    const { tokenAmount, tokenGoal, bet } = payload;

    if (bet * 2 < tokenAmount) {
      const maxBet = tokenGoal - tokenAmount;
      this._bet = Math.max(0, Math.min(maxBet, Math.max(this._bet, bet * 2)));
    }
  }
}

class MartingaleModifiedStrategy extends MartingaleStrategy {
  constructor(payload) {
    super(payload);

    const { tokenAmount, tokenGoal, bet } = payload;

    if (bet < tokenAmount) {
      const maxBet = tokenGoal - tokenAmount;
      this._bet = Math.max(0, Math.min(maxBet, Math.max(this._bet, bet)));
    }
  }
}
