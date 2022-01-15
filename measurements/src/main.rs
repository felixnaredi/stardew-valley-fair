use rand::Rng;

fn roll(tokens: &mut i32, bet: i32)
{
    let mut rng = rand::thread_rng();

    if rng.gen_range(0.0..1.0) > 0.25 {
        *tokens += bet;
    } else {
        *tokens -= bet;
    }
}

fn kelly(tokens: i32, goal: i32) -> (bool, u32)
{
    let mut count = 0;
    let mut tokens = tokens;

    while tokens > 1 && tokens < goal {
        count += 1;

        let bet = if tokens == 1 { 1 } else { tokens / 2 };
        let bet = bet.min(goal - tokens);
        roll(&mut tokens, bet);

        println!("tokens: {}, count: {}", tokens, count)
    }

    (tokens != 0, count)
}

fn main()
{
    let n = 10000;

    let initial = 1000;
    let goal = 4900;

    let mut success_count = 0;
    let mut total_bets = 0;

    for i in 0..n {
        println!("---- GAME {} ----", i);

        let (success, count) = kelly(initial, goal);

        total_bets += count;

        if success {
            success_count += 1;
        }
    }

    println!("initial tokens: {}", initial);
    println!("goal: {}", goal);
    println!("successes: {}", success_count);
    println!("fails: {}", n - success_count);
    println!("probability: {}", success_count as f32 / n as f32);
    println!("avrage bets: {}", total_bets as f32 / n as f32);
}
