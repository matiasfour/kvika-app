export enum GeneralText {
  NoThanks = 'Nei takk',
  Yes = 'Já',
  Ok = 'Ok',
  Cancel = 'Hætta við',
  Confirm = 'Staðfesta',
  Forward = 'Áfram',
  Back = 'Til baka',
  SinceNewYears = 'Frá áramótum',
  Other = 'Annað',
  DisruptionModeText = 'Vegna tæknilegra örðugleika gætu komið upp villuskilaboð. Við erum að vinna í málinu.',
}

export enum LoginScreenText {
  Login = 'Innskráning',
  LoginWithEID = 'Skráðu þig inn með rafrænum skilríkjum eða Auðkennisappinu',
  TroubleLoggingIn = 'Erfiðleikar með innskráningu?',
  PhoneNumber = 'Símanúmer',
  UserNotFound = 'Notandi finnst ekki',
  NoUserWithThisPhoneNumber = 'Enginn notandi er skráður með þetta símanúmer',
  ElectronicID = 'Rafræn skilríki',
  NoUserStagingDescription = 'Í prófunarumhverfinu er hægt að búa til gervigögn til að halda áfram',
  Expired = 'Auðkenning er útrunnin, skráðu þig inn aftur',
  ElectronicSim = 'Auðkennisappið',
  SocialSecurityNumber = 'Kennitala',
  OpenApp = 'Opnaðu auðkennisappið til að klára innskráningu',
  VerificationNumber = 'Öryggisnúmer',
  IdentificationFailed = 'Auðkenning tókst ekki',
  UserCancelation = 'Auðkenning mistókst, notandi hætti við',
}

export enum TermsAndConditionsScreenText {
  Terms = 'Skilmálar',
  AcceptTerms = 'Nauðsynlegt er að samþykkja eftirfarandi skilmála til að nota Kviku appið.',
  Approve = 'Ég samþykki',
  KvikaTerms = 'skilmála Kviku appsins',
}

export enum SelectPortfoliosScreenText {
  Portfolios = 'Eignasöfn',
  ChoosePortfoliosForApp = 'Veldu þau eignasöfn sem þú vilt sýna í appinu. Þú getur alltaf breytt hvaða eignasöfn eru sýnd.',
  MyPortfolios = 'Eignasöfnin mín',
  ShowAllPortfolios = 'Sýna öll söfn',
  NoPortfoliosFound = 'Engin eignasöfn fundust.',
  ChoosePortfolios = 'Veldu eignasöfn',
}

export enum HomeScreenText {
  Overview = 'Yfirlit',
  Assets = 'Eignir',
  Transactions = 'Hreyfingar',
}

export enum ErrorStrings {
  ErrorHeadline = 'Villa kom upp',
  ErrorMessage = 'Eitthvað fór úrskeiðis',
  ExpoReloadError = 'Expo reloadAsync error',
  ExpoCheckForUpdatesError = 'Expo checkForUpdateAsync error',
  ExpoFetchUpdateError = 'Expo fetchUpdateAsync error',
}

export enum ProfileDrawerText {
  Email = 'Netfang',
  LoginWithBiometrics = 'Innskrá með lífkenni',
  SetSecurityNumber = 'Stilla öryggisnúmer',
  SendATip = 'Senda ábendingu um appið',
  TermsAndConditions = 'Skilmálar og persónuvernd',
  LogOut = 'Útskrá',
  SwitchProfile = 'Skipta um notanda',
  Version = 'Útgáfa',
}

export enum OverviewScreenText {
  MarketTrading = 'Markaðsviðskipti',
  MarketValue = 'Markaðsvirði',
  Interests = 'Ávöxtun',
  Composition = 'Samsetning eignasafns',
  TotalAssets = 'Allar eignir',
}

export enum SummaryScreenText {
  Summary = 'Samantekt',
  StartMarketValue = 'Markaðsvirði í byrjun tímabils',
  Inflow = 'Innborgun',
  Outflow = 'Útborgun',
  RealisedProfit = 'Innleystur hagnaður',
  UnrealisedProfit = 'Óinnleystur hagnaður',
  CapitalYieldTax = 'Fjármagnstekjuskattur',
  EndMarketValue = 'Markaðsvirði í lok tímabils',
  PortfolioYield = 'Ávöxtun safns',
}

export enum TransactionsScreenText {
  Buy = 'Kaup',
  CashDividends = 'Arðgreiðslur',
  BuyOrSell = 'Kaup/sala',
  AllTransactions = 'Allar hreyfingar',
  Installments = 'Afborganir',
  Unprocessed = 'Óafgreitt',
  NoTransactionsFound = 'Engar hreyfingar fundust á þessu tímabili',
  ChooseAnotherPeriod = 'Prófaðu að velja annað tímabil',
  UnprocessedTransactions = 'Óafgreidd viðskipti',
  Other = 'Annað',
  Fee = 'Þóknun',
  InstallmentAndInterests = 'Afborgun og vextir',
  Unconfirmed = 'Óstaðfest',
  UnconfirmedTransactions = 'Óstaðfestar pantanir',
  Tax = 'Skattur',
}

export enum TransactionTypesText {
  ASSET_CHANGE_FREE = 'Framsal/Eignabreyting án viðskipta',
  ASSET_CHANGE_VS_PAYM = 'Framsal/Eignabreyting með greiðslu',
  CALLING = 'Útdráttur húsbréfa',
  CASH_DIVIDEND = 'Arðgreiðsla',
  DELIVER_FREE = 'Afhending',
  FEE = 'Þóknun',
  INDEXATION = 'Verðbætur',
  INSTALLMENT = 'Afborgun',
  INTEREST = 'Vextir',
  LIQU = 'Upplausn',
  MERGE_SECURITIES = 'Samruni',
  PERFORMANCE_FEE = 'Árangurstengd þóknun',
  PORTFOLIO_ASSET_FEE = 'Eignastýringaþóknun',
  PROXY_TRADE = 'Umboðsviðskipti',
  RECEIVE_FREE = 'Móttaka',
  REDEMPTION = 'Innlausn',
  SAFEKEEPING_FEE = 'Vörsluþóknun',
  SELL = 'Sala',
  SOFF = 'Spinoff',
  STOCK_DIVIDEND = 'Arðgreiðsla með bréfi',
  STOCK_SPLIT = 'Jöfnun',
  TRADING_FEE = 'Þóknun/Viðskiptaþóknun',
  BUY = 'Kaup',
  CAPITALTAX = 'Fjármagnstekjuskattur',
  CUSTODIAN_TRANSFER = 'Vörsluaðilamillifærsla',
  INVENTORY_TRANSFER = 'Birgðamillifærsla',
  BUY_PENDING = 'Kaup',
  SELL_PENDING = 'Sala',
  PORTFOLIO_TRANSFER_OUT = 'Millifærsla út af safni',
  PORTFOLIO_TRANSFER_IN = 'Millifærsla inn á safn',
}

export enum AssetScreenText {
  AllAssets = 'Allar eignir',
  Equity = 'Hlutabréf',
  Fund = 'Blandaðir sjóðir',
  Bond = 'Skuldabréf',
  Other = 'Annað',
  NoAssetsFound = 'Engar eignir fundust í þessu eignasafni fyrir valið tímabil',
  Total = 'samtals',
  Deposit = 'Innlán',
}

export enum MonthsText {
  January = 'janúar',
  February = 'febrúar',
  March = 'mars',
  April = 'apríl',
  May = 'maí',
  June = 'júní',
  July = 'júlí',
  August = 'ágúst',
  September = 'september',
  October = 'október',
  November = 'nóvember',
  December = 'desember',
}

export enum TransactionDrawerText {
  TradeDate = 'Dagsetning',
  SettlementDate = 'Greiðsludagur',
  Commission = 'Kostnaður',
  Tax = 'Skattur',
  Rate = 'Gengi',
  DividendPerShare = 'Arður á hlut',
  TransactionDate = 'Dagsetning pöntunar',
  Quantity = 'Nafnverð',
  CurrencyPrice = 'Gengi myntar',
  TransactionYield = 'Ávöxtunarkrafa',
  TradeFee = 'Þóknun',
  Payment = 'Upphæð',
  Comment = 'Skýring',
  CurrencyCode = 'Mynt',
}

export enum AssetDrawerText {
  MyAsset = 'Mín eign',
  UnrealisedProfitOrLoss = 'Óinnleystur hagnaður/tap',
  RealisedProfitOrLoss = 'Innleystur hagnaður/tap',
  Quantity = 'Nafnverð',
  InstrumentReturn = 'Ávöxtun',
  Contribution = 'Ávöxtunarframlag',
  ValueWeight = 'Hlutfall af eignasafni',
  LargestPublishers = 'Stærstu útgefendur',
  AssetComposition = 'Eignasamsetning',
  CouldNotGetDataForGraph = 'Ekki tókst að ná í gögn fyrir valið tímabil.',
}

export enum UserScreenText {
  ChooseUser = 'Veldu notanda',
  LoginWithFollowingUsers = 'Þú getur skráð þig inn með eftirfarandi notendum.',
  Login = 'Innskrá',
}

export enum PeriodText {
  ThisYear = 'Frá áramótum',
  OneWeek = '1 vika',
  OneWeekShort = '1V',
  OneMonth = '1 mán',
  OneMonthShort = '1M',
  SixMonths = '6 mán',
  SixMonthsShort = '6M',
  OneYear = '1 ár',
  OneYearShort = '1Á',
  FiveYears = '5 ár',
  FiveYearsShort = '5Á',
  Max = 'Allt',
}

export enum HeaderText {
  ExpoUpdateAvailable = 'Ný uppfærsla í boði',
  RestartToUpdate = 'Til að sjá nýjustu breytingar þarf að endurræsa appið',
  RestartApp = 'Endurræsa',
  NotNow = 'Ekki núna',
  NoThanks = 'Nei takk',
}
