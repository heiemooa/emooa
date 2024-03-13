export type TokenType = object;
export type DerivativeFunc<EuiToken extends TokenType, DerivativeToken extends TokenType> = (
  EuiToken: EuiToken,
  derivativeToken?: DerivativeToken,
) => DerivativeToken;
