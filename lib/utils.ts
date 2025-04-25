import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`
  }

  if (value >= 100) {
    return `$${value.toFixed(2)}`
  }
  if (value >= 1) {
    return `$${value.toFixed(2)}`
  }

  return `$${value.toFixed(value < 0.01 ? 6 : 2)}`
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`
  }

  return value.toFixed(2)
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`
}

export function generateRandomPriceChange(basePrice: number, maxPercentChange = 0.005): number {
  const randomChange = (Math.random() * 2 - 1) * maxPercentChange
  return basePrice * randomChange
}
