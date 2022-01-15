export type RootStackParamList  = {
  Home: undefined;
  AppointmentDetails: undefined;
  AppointmentCreate: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList  {}
  }
}