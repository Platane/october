import type { Reducer } from 'redux'

type ChainReducer = {
  <S, A>(): Reducer<S, A>,

  <S, A>(r1: Reducer<S, A>): Reducer<S, A>,

  <S, A>(r1: Reducer<S, A>, r2: Reducer<S, A>): Reducer<S, A>,

  <S, A>(
    r1: Reducer<S, A>,
    r2: Reducer<S, A>,
    r3: Reducer<S, A>
  ): Reducer<S, A>,

  <S, A>(
    r1: Reducer<S, A>,
    r2: Reducer<S, A>,
    r3: Reducer<S, A>,
    r4: Reducer<S, A>
  ): Reducer<S, A>,

  <S, A>(
    r1: Reducer<S, A>,
    r2: Reducer<S, A>,
    r3: Reducer<S, A>,
    r4: Reducer<S, A>,
    r5: Reducer<S, A>
  ): Reducer<S, A>,
}

export const chainReducer: any = (...reducers) => (state0, action) =>
  reducers.reduce((state, reducer) => reducer(state, action), state0)
