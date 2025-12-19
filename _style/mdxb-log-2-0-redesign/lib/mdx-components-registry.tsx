/**
 * MDX Component Registry
 *
 * This file exports all available MDX components that can be used
 * in your MDX files. Import and register custom components here.
 */

import { Callout } from "@/components/mdx/callout"
import { Steps, Step } from "@/components/mdx/steps"
import { CardGrid, Card } from "@/components/mdx/card"

export const mdxComponents = {
  // Layout Components
  Callout,
  Steps,
  Step,
  CardGrid,
  Card,

  // Add your custom components here
  // Example:
  // CustomButton: () => <button>Custom Button</button>,
}

export type MDXComponentName = keyof typeof mdxComponents

/**
 * Usage in MDX files:
 *
 * <Callout type="info">
 *   This is an informational callout
 * </Callout>
 *
 * <Steps>
 *   <Step title="First Step">
 *     Description of first step
 *   </Step>
 *   <Step title="Second Step">
 *     Description of second step
 *   </Step>
 * </Steps>
 *
 * <CardGrid>
 *   <Card title="Card Title" href="/link">
 *     Card description
 *   </Card>
 * </CardGrid>
 */
