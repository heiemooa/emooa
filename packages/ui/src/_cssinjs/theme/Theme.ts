import { warning } from 'rc-util/lib/warning';
import type { DerivativeFunc, TokenType } from './interface';

let uuid = 0;

/**
 * Theme with algorithms to derive tokens from eui tokens.
 * Use `createTheme` first which will help to manage the theme instance cache.
 */
export default class Theme<EuiToken extends TokenType, DerivativeToken extends TokenType> {
  private derivatives: DerivativeFunc<EuiToken, DerivativeToken>[];
  public readonly id: number;

  constructor(derivatives: DerivativeFunc<EuiToken, DerivativeToken> | DerivativeFunc<EuiToken, DerivativeToken>[]) {
    this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
    this.id = uuid;

    if (derivatives.length === 0) {
      warning(derivatives.length > 0, '[Emooa UI CSS-in-JS] Theme should have at least one derivative function.');
    }

    uuid += 1;
  }

  getDerivativeToken(token: EuiToken): DerivativeToken {
    return this.derivatives.reduce<DerivativeToken>(
      (result, derivative) => derivative(token, result),
      undefined as any,
    );
  }
}
