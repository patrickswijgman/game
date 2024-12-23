export type Action = {
  name: string;
  description: string;
  enter?: () => void;
  update?: () => boolean;
  exit?: () => void;
};

const actions: Record<string, Action> = {};

export function newAction(): Action {
  return {
    name: "",
    description: "",
  };
}

export function addAction(id: string, action: Action) {
  actions[id] = action;
}
