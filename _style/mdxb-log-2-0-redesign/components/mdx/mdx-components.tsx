"use client"

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { useEffect, useState } from "react"
import { Callout } from "./callout"
import { Steps, Step } from "./steps"
import { CardGrid, Card } from "./card"

const components = {
  Callout,
  Steps,
  Step,
  CardGrid,
  Card,
}

interface MDXComponentsProps {
  source: string
}

export function MDXComponents({ source }: MDXComponentsProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)

  useEffect(() => {
    serialize(source).then(setMdxSource)
  }, [source])

  if (!mdxSource) {
    return <div className="animate-pulse">Loading...</div>
  }

  return <MDXRemote {...mdxSource} components={components} />
}
