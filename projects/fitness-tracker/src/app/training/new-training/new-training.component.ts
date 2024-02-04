import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UiService } from '../../share/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises!: Exercise[];
  exercisesSubscription = new Subscription();
  isLoading = false;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {}

  ngOnDestroy(): void {
    if (this.exercisesSubscription) this.exercisesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();
    this.exercisesSubscription = this.trainingService.exercises$.subscribe(
      (exercises) => {
        this.exercises = exercises;
        this.uiService.isLoading.next(false);
      }
    );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
