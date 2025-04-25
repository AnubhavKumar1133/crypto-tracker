"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { selectAllCryptos } from "@/lib/features/crypto/cryptoSlice"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils"
import { Star, InfoIcon as InfoCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import MiniChart from "@/components/mini-chart"
import { toast } from "@/hooks/use-toast"
export default function CryptoTable() {
  const cryptos = useSelector(selectAllCryptos)
  const [sortColumn, setSortColumn] = useState<string>("rank")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedCryptos = [...cryptos].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center cursor-default" onClick={() => handleSort("rank")}>
              #
            </TableHead>
            <TableHead className="cursor-default" onClick={() => handleSort("name")}>
              Name
            </TableHead>
            <TableHead className="text-right cursor-default" onClick={() => handleSort("price")}>
              Price
            </TableHead>
            <TableHead className="text-right cursor-default" onClick={() => handleSort("percent1h")}>
              1h %
            </TableHead>
            <TableHead className="text-right cursor-default" onClick={() => handleSort("percent24h")}>
              24h %
            </TableHead>
            <TableHead className="text-right cursor-default" onClick={() => handleSort("percent7d")}>
              7d %
            </TableHead>
            <TableHead className="text-right cursor-default" onClick={() => handleSort("marketCap")}>
              Market Cap
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircle className="h-4 w-4 inline ml-1" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64">Market Cap = Current Price x Circulating Supply</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
            <TableHead className="text-right cursor-default" onClick={() => handleSort("volume24h")}>
              Volume(24h)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircle className="h-4 w-4 inline ml-1" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64">A measure of how much of a cryptocurrency was traded in the last 24 hours.</p>
                  </TooltipContent>
                </Tooltip>  
              </TooltipProvider>
            </TableHead>
            <TableHead className="text-right cursor-default" onClick={() => handleSort("circulatingSupply")}>
              Circulating Supply
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircle className="h-4 w-4 inline ml-1" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-64">
                      The amount of coins that are circulating in the market and are in public hands.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableHead>
            <TableHead className="text-right">Last 7 Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCryptos.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Star 
                    className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-yellow-500"
                    onClick={() => {
                      toast({
                        title: "Added to favorites",
                        description: `${crypto.name} has been added to your favorites.`,
                        
                      })
                    }}
                  />
                  {crypto.rank}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={crypto.image}
                    alt={crypto.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div className="flex gap-2 items-center">
                    <span className="font-medium hover:cursor-pointer">{crypto.name}</span>
                    <span className="text-muted-foreground">{crypto.symbol}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">{formatCurrency(crypto.price)}</TableCell>
              <TableCell className={`text-right ${crypto.percent1h >= 0 ? "text-green-500" : "text-red-500"}`}>
                <div className="flex items-center justify-end gap-1">
                  {crypto.percent1h >= 0 ? "▲" : "▼"}
                  {formatPercent(Math.abs(crypto.percent1h))}
                </div>
              </TableCell>
              <TableCell className={`text-right ${crypto.percent24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                <div className="flex items-center justify-end gap-1">
                  {crypto.percent24h >= 0 ? "▲" : "▼"}
                  {formatPercent(Math.abs(crypto.percent24h))}
                </div>
              </TableCell>
              <TableCell className={`text-right ${crypto.percent7d >= 0 ? "text-green-500" : "text-red-500"}`}>
                <div className="flex items-center justify-end gap-1">
                  {crypto.percent7d >= 0 ? "▲" : "▼"}
                  {formatPercent(Math.abs(crypto.percent7d))}
                </div>
              </TableCell>
              <TableCell className="text-right">{formatCurrency(crypto.marketCap)}</TableCell>
              <TableCell className="text-right">
                <div>
                  {formatCurrency(crypto.volume24h)}
                  <div className="text-xs text-muted-foreground">
                    {formatNumber(crypto.volumeInCrypto)} {crypto.symbol}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div>
                  {formatNumber(crypto.circulatingSupply)} {crypto.symbol}
                  {crypto.maxSupply && (
                    <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${(crypto.circulatingSupply / crypto.maxSupply) * 100}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <MiniChart data={crypto.sparkline7d} trend={crypto.percent7d >= 0 ? "up" : "down"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
