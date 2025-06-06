export enum RoutePaths {
  BASE = "/",
  DASHBOARD = "dashboard",
  LOGIN = "login",
  ACTIVITY = "activity",
  CALCULATOR = "calculator",
  PROGRAM = "program/:name",
  REFERRAL = "referral",
  LEVEL_CARDS = "program/:name/level/:level",
  INVITE = "invitation",
}

export enum ApiEndpoints {
  USER = "/user",
  USER_LOGIN = "/user/login",
  USER_STATS = "/user/stats",
  USER_REFERRAL = "/user/referrals",
  PROGRAM = "/program",
  LEVEL = "/level",
  USER_LEVEL = "/user-level",
  TRANSACTION = "/transaction",
  TRANSACTION_CYCLE = "/transaction/cycle",
}
