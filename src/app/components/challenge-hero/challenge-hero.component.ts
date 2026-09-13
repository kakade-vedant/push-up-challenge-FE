import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-challenge-hero',
  imports: [],
  templateUrl: './challenge-hero.component.html',
  styleUrl: './challenge-hero.component.scss'
})
export class ChallengeHeroComponent {
  GOAL = input(10000, {alias: 'goal'});
  total = input(0);

  percentComplete = computed(() => {
    return this.total() / this.GOAL() * 100;
  });
}
