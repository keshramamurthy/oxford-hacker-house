'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Link from 'next/link'

export function BlockPage() {
  const [btcUsdPrice, setBtcUsdPrice] = useState<string>("No data found")
  const [eurUsdPrice, setEurUsdPrice] = useState<string>("No data found")

  useEffect(() => {
    const fetchPrices = async () => {
      // This is a placeholder for the actual contract interaction
      // You'll need to replace this with the actual contract address and ABI
      const contractAddress = "0x22A2Ede8D01F9F9A9Fdd977a112B7a12880bF924"
      const contractABI = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "feedAddress",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "dataFeedStore",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint32",
              "name": "key",
              "type": "uint32"
            }
          ],
          "name": "getDataById",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "timestamp",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint32",
              "name": "key",
              "type": "uint32"
            },
            {
              "internalType": "uint32",
              "name": "counter",
              "type": "uint32"
            }
          ],
          "name": "getFeedAtCounter",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "timestamp",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint32",
              "name": "key",
              "type": "uint32"
            }
          ],
          "name": "getLatestCounter",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "counter",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint32",
              "name": "key",
              "type": "uint32"
            }
          ],
          "name": "getLatestRoundData",
          "outputs": [
            {
              "internalType": "int256",
              "name": "value",
              "type": "int256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "uint80",
              "name": "counter",
              "type": "uint80"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]

      try {
        // Connect to the Manta Sepolia testnet
        const provider = new ethers.JsonRpcProvider("https://pacific-rpc.sepolia-testnet.manta.network/http", 3441006);
        const contract = new ethers.Contract(contractAddress, contractABI, provider)

        // Call the contract function to get prices
        const btcPrice = (await contract.getLatestRoundData(31))
        const eurPrice = (await contract.getLatestRoundData(47))

        console.log(btcPrice[0])

        // Format prices to 2 decimal places
        setBtcUsdPrice(parseFloat(ethers.formatUnits(btcPrice[0], 18)).toFixed(2))
        setEurUsdPrice(parseFloat(ethers.formatUnits(eurPrice[0], 18)).toFixed(2))
      } catch (error) {
        console.error("Error fetching prices:", error)
      }
    }

    fetchPrices()
    // Set up an interval to fetch prices every 60 seconds
    const interval = setInterval(fetchPrices, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold">Reading Blocksense Data from Manta Sepolia Testnet</h1>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <div className="flex justify-center space-x-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">BTC/USD</h2>
            <p className="text-2xl">{btcUsdPrice}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">ETH/USD</h2>
            <p className="text-2xl">{eurUsdPrice}</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/agents" className="text-blue-400 hover:text-blue-300">
            Go to AI Agents Page
          </Link>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-gray-400">
        Created by Keshav Ramamurthy, Eren Onder and Dev Udata for the Oxford Blockchain Society hackathon
      </footer>
    </div>
  )
}