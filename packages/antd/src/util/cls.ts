type ClsToken = string | number | boolean | undefined | null | Record<string, boolean>;

export default function cls(...clsTokens: ClsToken[]): string {
  return clsTokens
    .flatMap(clsToken =>
      typeof clsToken === 'object' && clsToken !== null
        ? Object.entries(clsToken)
            .filter(([key, value]) => value)
            .map(([key, value]) => key)
        : clsToken
    )
    .filter(Boolean)
    .join(' ');
}
