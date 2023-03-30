type Action<T extends string = string, P = any> = {
  type: T;
  payload?: P;
};
interface Reducer<S = any, A extends string = string> {
  (state: S | undefined, action: Action<A, S>): S;
}

export function createMiniStore<
  StateType = any,
  ActionType extends string = string
>(reducer: Reducer<StateType, ActionType>) {
  let $state: StateType = reducer(undefined, {
    type: "@@INIT@@" as ActionType,
  });
  let $listeners: (Function | null)[] = [];
  const getState = () => $state;

  $state;
  const dispatch = (action: Action<ActionType, StateType>) => {
    // 更新数据
    $state = reducer($state, action);

    // 派发通知
    $listeners.forEach((listener) => {
      if (typeof listener === "function") {
        listener();
      }
    });
  };
  const subscribe = (listener: Function): number | undefined => {
    if (typeof listener !== "function") return;

    if ($listeners.indexOf(listener) > -1) {
      return $listeners.indexOf(listener);
    }
    return $listeners.push(listener) - 1;
  };
  const unSubscribe = (index?: number) => {
    if (index === undefined || !$listeners[index]) return;
    $listeners[index] = null;
  };

  return { getState, dispatch, subscribe, unSubscribe };
}

/**
 * 使用示例:

const initState = 1;

const ACTION_TYPE_ADD_ANY = "+?";
const ACTION_TYPE_DEC_ANY = "-?";

function createActionAdd(payload = 1) {
    return { type: ACTION_TYPE_ADD_ANY, payload };
}
function createActionDec(payload = 1) {
    return { type: ACTION_TYPE_DEC_ANY, payload };
}

type MyActionType = typeof ACTION_TYPE_ADD_ANY | typeof ACTION_TYPE_DEC_ANY;
const reducer: Reducer<number, MyActionType> = (state = initState, action) => {
    switch (action.type) {
        case ACTION_TYPE_ADD_ANY:
            return state + action.payload!;
        case ACTION_TYPE_DEC_ANY:
            return state - action.payload!;
        default:
            return state;
    }
};

const demoStore = createMiniStore<
    number,
    typeof ACTION_TYPE_ADD_ANY | typeof ACTION_TYPE_DEC_ANY
>(reducer);

demoStore.dispatch({ type: "+?", payload: 2 });
const demo = demoStore.getState();
const id = demoStore.subscribe(() => {});
demoStore.unSubscribe(id);
 */

// export function useMiniStore(miniStore) {
//   const [state, setState] = useState(miniStore.getState());
//   const indexRef = useRef();
//   useEffect(() => {
//     const id = miniStore.subscribe(() => {
//       setState(miniStore.getState());
//     });
//     indexRef.current = id;

//     return () => {
//       miniStore.unSubscribe(id);
//     };
//   }, [miniStore]);
//   const unSubscribe = useCallback(() => {
//     miniStore.unSubscribe(indexRef.current);
//   }, [miniStore]);

//   return [state, {dispatch: miniStore.dispatch, unSubscribe}];
// }
