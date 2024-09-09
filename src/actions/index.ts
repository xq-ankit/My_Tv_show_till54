export type ActionCreator<T = undefined> = (...args: any[]) => {
    type: string;
    payload?: T;
  };
  
  export type Action<T=any>={
    type:String;
    payload?: T;
  }