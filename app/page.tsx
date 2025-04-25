"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchCryptoData, updateCryptoPrices } from "@/lib/features/crypto/cryptoSlice"
import CryptoTable from "@/components/crypto-table"
import { InfoIcon as InfoCircle } from "lucide-react"

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { status, error } = useSelector((state: RootState) => state.crypto)

  useEffect(() => {
    dispatch(fetchCryptoData())

    // Simulate WebSocket updates every 1.5 seconds
    const interval = setInterval(() => {
      dispatch(updateCryptoPrices())
    }, 1500)

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Cryptocurrency Tracker</h1>

      {status === "loading" && <p className="text-center py-8">Loading cryptocurrency data...</p>}
      {status === "failed" && <p className="text-center py-8 text-red-500">Error: {error}</p>}
      {status === "succeeded" && <CryptoTable />}

      <div className="mt-8 text-sm text-muted-foreground">
        <p className="flex items-center gap-1">
          <InfoCircle className="h-4 w-4" />
          Data updates every 1.5 seconds (simulated real-time)
        </p>
      </div>
    </main>
  )
}
