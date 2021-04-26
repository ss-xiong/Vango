import {
  delay,
} from 'redux-saga/effects';

export function* appRootSages() {
  yield delay(1000);
}
