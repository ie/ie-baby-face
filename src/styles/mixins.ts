import { css, CSSObject, RuleSet } from 'styled-components'

export const media = {
  xxl: 1600,
  xl: 1420,
  lg: 1200,
  md: 840,
  sm: 600,
  xs: 360,
}

type MediaQueryFunction = (
  first: TemplateStringsArray | CSSObject,
  ...interpolations: any[]
) => RuleSet<object>

type MediaQueries = {
  [K in keyof typeof media]: MediaQueryFunction
}

export const above: MediaQueries = Object.keys(media).reduce((accumulator, label) => {
  const key = label as keyof typeof media
  accumulator[key] = (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: any[]
  ) => css`
    @media (min-width: ${media[key]}px) {
      ${css(first, ...interpolations)};
    }
  `
  return accumulator
}, {} as MediaQueries)

export const below: MediaQueries = Object.keys(media).reduce((accumulator, label) => {
  const key = label as keyof typeof media
  accumulator[key] = (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: any[]
  ) => css`
    @media (max-width: ${media[key]}px) {
      ${css(first, ...interpolations)};
    }
  `
  return accumulator
}, {} as MediaQueries)
