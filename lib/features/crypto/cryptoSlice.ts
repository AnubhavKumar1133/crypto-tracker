import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import type { CryptoData, CryptoState } from "@/lib/types"
import { generateRandomPriceChange } from "@/lib/utils"

// Sample data for the cryptocurrencies
const initialCryptoData: CryptoData[] = [
  {
    id: "bitcoin",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    image: "/bitcoin-btc-logo.png?height=24&width=24",
    price: 93759.48,
    percent1h: 0.43,
    percent24h: 0.93,
    percent7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    volumeInCrypto: 467.81,
    circulatingSupply: 19.85,
    maxSupply: 21,
    sparkline7d: [
      90000, 90500, 91000, 90800, 91500, 92000, 91800, 92500, 93000, 92800, 93500, 94000, 93800, 94500, 95000, 94800,
      95500, 96000, 95800, 96500, 97000,
    ],
  },
  {
    id: "ethereum",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    image: "/ethereum-eth-logo.png?height=24&width=24",
    price: 1802.46,
    percent1h: 0.6,
    percent24h: 3.21,
    percent7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    volumeInCrypto: 13.05,
    circulatingSupply: 120.71,
    maxSupply: null,
    sparkline7d: [
      1700, 1710, 1720, 1715, 1730, 1740, 1735, 1750, 1760, 1755, 1770, 1780, 1775, 1790, 1800, 1795, 1810, 1820, 1815,
      1830, 1840,
    ],
  },
  {
    id: "tether",
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    image: "/tether-usdt-logo.png?height=24&width=24",
    price: 1.0,
    percent1h: -0.0,
    percent24h: -0.0,
    percent7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    volumeInCrypto: 92.25,
    circulatingSupply: 145.27,
    maxSupply: null,
    sparkline7d: [
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    ],
  },
  {
    id: "xrp",
    rank: 4,
    name: "XRP",
    symbol: "XRP",
    image: "/xrp-xrp-logo.png?height=24&width=24",
    price: 2.22,
    percent1h: 0.46,
    percent24h: 0.54,
    percent7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    volumeInCrypto: 2.3,
    circulatingSupply: 58.39,
    maxSupply: 100,
    sparkline7d: [
      2.1, 2.12, 2.14, 2.13, 2.15, 2.17, 2.16, 2.18, 2.2, 2.19, 2.21, 2.23, 2.22, 2.24, 2.26, 2.25, 2.27, 2.29, 2.28,
      2.3, 2.32,
    ],
  },
  {
    id: "bnb",
    rank: 5,
    name: "BNB",
    symbol: "BNB",
    image: "/bnb-bnb-logo.png?height=24&width=24",
    price: 606.65,
    percent1h: 0.09,
    percent24h: -1.2,
    percent7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    volumeInCrypto: 3.08,
    circulatingSupply: 140.89,
    maxSupply: 200,
    sparkline7d: [
      580, 585, 590, 588, 595, 600, 598, 605, 610, 608, 615, 620, 618, 625, 630, 628, 635, 640, 638, 645, 650,
    ],
  },
  {
    id: "solana",
    rank: 6,
    name: "Solana",
    symbol: "SOL",
    image: "/solana-sol-logo.png?height=24&width=24",
    price: 151.51,
    percent1h: 0.53,
    percent24h: 1.26,
    percent7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    volumeInCrypto: 32.25,
    circulatingSupply: 517.31,
    maxSupply: null,
    sparkline7d: [
      140, 142, 144, 143, 145, 147, 146, 148, 150, 149, 151, 153, 152, 154, 156, 155, 157, 159, 158, 160, 162,
    ],
  },
]

const initialState: CryptoState = {
  data: [],
  status: "idle",
  error: null,
}

// Async thunk for fetching crypto data (simulated)
export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData", async () => {
  // Simulating the API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return initialCryptoData
})

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrices: (state) => {
      state.data = state.data.map((crypto) => {
        // Generating random price changes
        const priceChange = generateRandomPriceChange(crypto.price)
        const newPrice = crypto.price + priceChange

        // Updating percentages
        const percent1h = crypto.percent1h + generateRandomPriceChange(1, 0.1)
        const percent24h = crypto.percent24h + generateRandomPriceChange(1, 0.1)
        const percent7d = crypto.percent7d + generateRandomPriceChange(1, 0.05)

        // Updating volume
        const volumeChange = generateRandomPriceChange(crypto.volume24h * 0.01)
        const newVolume = crypto.volume24h + volumeChange

        // Updating market cap based on new price
        const newMarketCap = newPrice * crypto.circulatingSupply * 1000000

        // Updating sparkline data by removing first element and adding new price at the end
        const newSparkline = [...crypto.sparkline7d.slice(1), newPrice]

        return {
          ...crypto,
          price: newPrice,
          percent1h,
          percent24h,
          percent7d,
          marketCap: newMarketCap,
          volume24h: newVolume,
          volumeInCrypto: newVolume / newPrice,
          sparkline7d: newSparkline,
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<CryptoData[]>) => {
        state.status = "succeeded"
        state.data = action.payload
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch crypto data"
      })
  },
})

// Export actions
export const { updateCryptoPrices } = cryptoSlice.actions

// Export selectors
export const selectAllCryptos = (state: RootState) => state.crypto.data
export const selectCryptoById = (state: RootState, id: string) => state.crypto.data.find((crypto) => crypto.id === id)

// Export reducer
export default cryptoSlice.reducer
