'use client'

import * as React from "react"
import { Upload, FileType, Loader2, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface FileUploadProps {
  onAnalysisComplete: () => void
}

export default function FileUpload({ onAnalysisComplete }: FileUploadProps) {
  const [file, setFile] = React.useState<File | null>(null)
  const [fileType, setFileType] = React.useState<"payment" | "mtr">("payment")
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [isComplete, setIsComplete] = React.useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile && (selectedFile.type === "application/pdf" || selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      setFile(selectedFile)
    } else {
      alert("Please upload a PDF or XLSX file.")
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setIsAnalyzing(true)

    // Simulating file analysis
    await new Promise(resolve => setTimeout(resolve, 3000))

    setIsAnalyzing(false)
    setIsComplete(true)

    // Simulating a delay before transitioning to the dashboard
    setTimeout(() => {
      onAnalysisComplete()
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-purple-600 text-white">
          <CardTitle className="text-2xl font-bold">Upload Report</CardTitle>
          <CardDescription className="text-purple-100">
            Upload your payment report or merchant tax report (MTR)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="file" className="text-sm font-medium text-gray-700">
                File
              </Label>
              <div className="relative">
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  onClick={() => document.getElementById('file')?.click()}
                  className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors duration-200"
                >
                  {file ? file.name : "Choose file"}
                </Button>
                {file && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <FileType className="text-green-500" />
                  </motion.div>
                )}
              </div>
            </div>
            <RadioGroup
              defaultValue="payment"
              onValueChange={(value) => setFileType(value as "payment" | "mtr")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="payment" id="payment" className="text-purple-600" />
                <Label htmlFor="payment" className="text-sm font-medium text-gray-700">Payment Report</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mtr" id="mtr" className="text-purple-600" />
                <Label htmlFor="mtr" className="text-sm font-medium text-gray-700">Merchant Tax Report (MTR)</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-4">
          <Button
            className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing || isComplete}
          >
            {isAnalyzing ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </motion.div>
            ) : isComplete ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Analysis Complete
              </motion.div>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Analyze
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              className="bg-white rounded-lg p-8 flex flex-col items-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <Loader2 className="h-16 w-16 text-purple-600 animate-spin" />
              <h2 className="mt-4 text-xl font-semibold text-gray-800">Analyzing your report...</h2>
              <p className="mt-2 text-sm text-gray-600">This may take a few moments</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}