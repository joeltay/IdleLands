
import _ from 'lodash';

import { Spell, SpellType } from '../spell';

import { LitanyOfPain as LitanyOfPainEffect } from '../effects/LitanyOfPain';

export class LitanyOfPain extends Spell {
  static element = SpellType.DEBUFF;
  static tiers = [
    { name: 'Litany of Pain',        spellPower: 1, weight: 25, cost: 200,   profession: 'Bard', level: 1 },
    { name: 'Hymn of Torment',       spellPower: 2, weight: 25, cost: 2000,  profession: 'Bard', level: 50 },
    { name: 'Chant of Obliteration', spellPower: 3, weight: 25, cost: 7500,  profession: 'Bard', level: 100 }
  ];

  static shouldCast(caster) {
    return this.$canTarget.enemyWithoutEffect(caster, 'LitanyOfPain');
  }

  determineTargets() {
    return this.$targetting.allEnemies;
  }

  calcDuration() {
    return 2 + this.spellPower;
  }

  calcPotency() {
    const min = this.caster.liveStats.int / 7;
    const max = this.caster.liveStats.int / 5;
    return this.minMax(min, max) * this.spellPower;
  }

  cast() {
    const message = '%player begins singing %spellName at %targetName!';
    const targets = this.determineTargets();

    _.each(targets, target => {

      super.cast({
        damage: 0,
        message,
        applyEffect: LitanyOfPainEffect,
        targets: [target]
      });

    });
  }
}