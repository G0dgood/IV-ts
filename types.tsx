/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  AppStack: NavigatorScreenParams<RootTabParamList> | undefined;
  AuthStack: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Notification: undefined;
  Accounts: undefined;
  AboutUs: undefined;
  PasswordReset: undefined;
  SplashScreen: undefined;
  Login: undefined;
  PasswordEmail: undefined;
  Reports: undefined;
  PersonalInformation: undefined;
  PasswordSecurity: undefined;
  Support: undefined;
  Verification: undefined;
  ReportStatus: undefined;
  Schedule: undefined;
  HomeD: undefined;
  SuccessConfirmed: undefined;
  Location: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Reports: undefined;
  Schedule: undefined;
  Accounts: undefined;
  Location: undefined;
  ImageUpload: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
