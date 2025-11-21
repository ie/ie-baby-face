declare module '*.eot' {
  const content: string
  export default content
}

declare module '*.woff' {
  const content: string
  export default content
}

declare module '*.woff2' {
  const content: string
  export default content
}

declare module '*.ttf' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module 'react-obfuscate' {
  import { ReactNode } from 'react'
  
  interface ObfuscateProps {
    email?: string
    tel?: string
    sms?: string
    facetime?: string
    href?: string
    headers?: {
      subject?: string
      body?: string
      [key: string]: string | undefined
    }
    obfuscate?: boolean
    obfuscateChildren?: boolean
    element?: string
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    children?: ReactNode
    style?: React.CSSProperties
    className?: string
  }

  const Obfuscate: React.FC<ObfuscateProps>
  export default Obfuscate
}
