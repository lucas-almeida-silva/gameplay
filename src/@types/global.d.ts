import { AppointmentProps } from "../components/Appointment";
import { GuildProps } from "../components/Guild";

export type RootStackParamList  = {
  Home: undefined;
  AppointmentDetails: { guildSelected: AppointmentProps } | undefined;
  AppointmentCreate: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList  {}
  }
}