//
// Helpers
// -------------------------------------------------------------------------------------------------

function bound(minValue, value, maxValue) {
  return Math.max(minValue, Math.min(value, maxValue));
}

//
// Strategy
// -------------------------------------------------------------------------------------------------

class Strategy {
  /**
   * Name of the strategy.
   */
  get strategyName() {
    return "None";
  }

  /**
   * Amount of tokens the bet should be at.
   */
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

//
// Kelly bet strategy
// -------------------------------------------------------------------------------------------------

/**
 * Kelly bet, or Kelly criterion, is a strategy of finding the optimal sized bet.
 *
 * See https://en.wikipedia.org/wiki/Kelly_criterion.
 */
export class KellyBetStrategy extends Strategy {
  _bet = 0;

  constructor({ tokenAmount, tokenGoal }) {
    super();

    if (tokenAmount === 1) {
      this._bet = 1;
    } else {
      this._bet = bound(
        0,
        Math.floor(tokenAmount / 2),
        tokenGoal - tokenAmount
      );
    }
  }

  get strategyName() {
    return "Kelly Bet";
  }

  get bet() {
    return this._bet;
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

//
// Martingale strategy
// -------------------------------------------------------------------------------------------------

/**
 * In the martingale betting strategy the player doubles their bet each loss in order to eventually
 * win it back with a profit.
 *
 * See https://en.wikipedia.org/wiki/Martingale_(betting_system).
 */
export class MartingaleStrategy extends Strategy {
  _bet = 0;

  constructor({ tokenAmount, tokenGoal }) {
    super();
    this._bet = bound(0, Math.ceil(tokenAmount / 32), tokenGoal - tokenAmount);
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
      this._bet = bound(0, bet * 2, tokenGoal - tokenAmount);
    }
  }
}

class MartingaleModifiedStrategy extends MartingaleStrategy {
  constructor(payload) {
    super(payload);

    const { tokenAmount, tokenGoal, bet } = payload;

    if (bet < tokenAmount) {
      this._bet = bound(0, Math.max(this._bet, bet), tokenGoal - tokenAmount);
    }
  }
}
