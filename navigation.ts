import type { StackScreenProps } from "@react-navigation/stack";

// Navigators typing
export type RootStackParamList = {
  Login: undefined;
  NewUser: undefined;
  Home: { idUser: string };
};


// Screens typings
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T, "RootStack">;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}