import { PortfolioTransactionTypeEnum } from '@kvika/api-types';
import { TransactionPill } from '../types/Types';
import { TransactionsScreenText } from './Text';

export const TRANSACTION_GROUPS: TransactionPill[] = [
  { types: [], text: TransactionsScreenText.AllTransactions },
  {
    types: [
      PortfolioTransactionTypeEnum.ASSET_CHANGE_FREE,
      PortfolioTransactionTypeEnum.ASSET_CHANGE_VS_PAYM,
      PortfolioTransactionTypeEnum.CALLING,
      PortfolioTransactionTypeEnum.LIQU,
      PortfolioTransactionTypeEnum.MERGE_SECURITIES,
      PortfolioTransactionTypeEnum.PORTFOLIO_TRANSFER_OUT,
      PortfolioTransactionTypeEnum.PORTFOLIO_TRANSFER_IN,
      PortfolioTransactionTypeEnum.PROXY_TRADE,
      PortfolioTransactionTypeEnum.SOFF,
      PortfolioTransactionTypeEnum.STOCK_SPLIT,
    ],
    text: TransactionsScreenText.Other,
  },
  {
    types: [
      PortfolioTransactionTypeEnum.BUY,
      PortfolioTransactionTypeEnum.DELIVER_FREE,
      PortfolioTransactionTypeEnum.RECEIVE_FREE,
      PortfolioTransactionTypeEnum.REDEMPTION,
      PortfolioTransactionTypeEnum.SELL,
      PortfolioTransactionTypeEnum.BUY_PENDING,
      PortfolioTransactionTypeEnum.SELL_PENDING,
    ],
    text: TransactionsScreenText.BuyOrSell,
  },
  {
    types: [PortfolioTransactionTypeEnum.CASH_DIVIDEND, PortfolioTransactionTypeEnum.STOCK_DIVIDEND],
    text: TransactionsScreenText.CashDividends,
  },
  {
    types: [
      PortfolioTransactionTypeEnum.FEE,
      PortfolioTransactionTypeEnum.PERFORMANCE_FEE,
      PortfolioTransactionTypeEnum.PORTFOLIO_ASSET_FEE,
      PortfolioTransactionTypeEnum.SAFEKEEPING_FEE,
      PortfolioTransactionTypeEnum.TRADING_FEE,
    ],
    text: TransactionsScreenText.Fee,
  },
  {
    types: [
      PortfolioTransactionTypeEnum.INDEXATION,
      PortfolioTransactionTypeEnum.INSTALLMENT,
      PortfolioTransactionTypeEnum.INTEREST,
    ],
    text: TransactionsScreenText.InstallmentAndInterests,
  },
  {
    types: [
      PortfolioTransactionTypeEnum.CAPITALTAX,
      PortfolioTransactionTypeEnum.CUSTODIAN_TRANSFER,
      PortfolioTransactionTypeEnum.INVENTORY_TRANSFER,
    ],
    text: TransactionsScreenText.Tax,
  },
];
