import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Observable, Subject } from 'rxjs';
import {} from 'rxjs/operators';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';
import { UiService } from '../share/ui.service';

const exerciseInitValue: Exercise = {
  id: '',
  name: '',
  duration: 0,
  calories: 0,
};

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();

  // private availableExercises: Exercise[] = [];

  constructor(private firestore: Firestore, private uiService: UiService) {}

  private runningExercise: Exercise = exerciseInitValue;
  exercises$!: Observable<Exercise[]>;
  finishedOrCancelledxercises$!: Observable<Exercise[]>;

  fetchAvailableExercises() {
    this.uiService.isLoading.next(true);
    const availableExerciseCollectionRef = collection(
      this.firestore,
      'availableExercises'
    );
    this.exercises$ = collectionData(
      availableExerciseCollectionRef
    ) as Observable<Exercise[]>;
  }

  fetchFinishedOrCancelledExercises() {
    const availableExerciseCollectionRef = collection(
      this.firestore,
      'finishedExercises'
    );
    this.finishedOrCancelledxercises$ = collectionData(
      availableExerciseCollectionRef
    ) as Observable<Exercise[]>;
  }

  startExercise(selectedExercise: Exercise) {
    this.runningExercise = selectedExercise;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDatatoDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });

    this.runningExercise = exerciseInitValue;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDatatoDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = exerciseInitValue;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  private addDatatoDatabase(exercise: Exercise) {
    if (exercise) {
      const finishedExerciseCollectionRef = collection(
        this.firestore,
        'finishedExercises'
      );
      addDoc(finishedExerciseCollectionRef, exercise)
        .then((response) => console.log(response))
        .catch((error) => console.log('error: ', error));
    }
  }
}
