export interface CryptoData {
  id: string
  rank: number
  name: string
  symbol: string
  image: string
  price: number
  percent1h: number
  percent24h: number
  percent7d: number
  marketCap: number
  volume24h: number
  volumeInCrypto: number
  circulatingSupply: number
  maxSupply: number | null
  sparkline7d: number[]
}

export interface CryptoState {
  data: CryptoData[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}
