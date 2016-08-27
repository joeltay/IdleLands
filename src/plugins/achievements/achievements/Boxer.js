
import { Achievement, AchievementTypes } from '../achievement';

export class Boxer extends Achievement {
  static achievementData(player) {

    const value = player.$statistics.countChild('Character.Treasure');
    const baseValue = 15;

    let tier = 1;
    while(value >= baseValue * tier) {
      tier++;
    }

    tier--;

    if(tier === 0) return [];

    const rewards = [{
      dex: tier*10,
      agi: tier*10
    }];

    if(tier >= 5) {
      rewards.push({ type: 'title', title: 'Boxer' });
    }

    return [{
      tier,
      name: 'Boxer',
      desc: '+10 DEX/AGI every 15 chests opened.',
      type: AchievementTypes.EXPLORE,
      rewards
    }];
  }
}