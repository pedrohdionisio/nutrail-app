export type AuthRoutesParamList = {
  Welcome: undefined;
  Onboarding: undefined;
};

export type AppRoutesParamList = {
  Home: undefined;
  Goals: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthRoutesParamList, AppRoutesParamList {}
  }
}
