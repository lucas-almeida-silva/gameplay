export type RootStackParamList  = {
  SignIn: undefined;
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList  {}
  }
}