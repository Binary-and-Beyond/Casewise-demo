"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface DashboardProps {
  onLogout: () => void
}

interface Chat {
  id: number
  name: string
  uploadedFile?: File | null
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<
    | "main"
    | "admin-analytics"
    | "generate-cases"
    | "case-selection"
    | "generate-mcqs"
    | "explore-cases"
    | "identify-concepts"
  >("main")
  const [selectedCase, setSelectedCase] = useState<string>("")
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [activeChat, setActiveChat] = useState<number>(1)
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])
  const [chatMessage, setChatMessage] = useState("")

  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: "Chat 01", uploadedFile: null },
    { id: 2, name: "Chat 02 lorem", uploadedFile: null },
    { id: 3, name: "Chat lorem 03", uploadedFile: null },
    { id: 4, name: "Lorem Chat 04", uploadedFile: null },
    { id: 5, name: "Chat 05 lorem", uploadedFile: null },
  ])

  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const cases = [
    {
      title: "Chest Pain in a Middle-Aged Man",
      difficulty: "Moderate",
      description: "patient has chest pain since yesterday night...",
    },
    {
      title: "Persistent Cough in a smoker",
      difficulty: "Easy",
      description: "patient has chest pain since yesterday night...",
    },
    {
      title: "Shortness of breath in pregnancy",
      difficulty: "Easy",
      description: "patient has chest pain since yesterday night...",
    },
    {
      title: "Diabetes Management in an elderly patient",
      difficulty: "Moderate",
      description: "patient has chest pain since yesterday night...",
    },
    {
      title: "Chest Pain in a young man",
      difficulty: "Hard",
      description: "patient has chest pain since yesterday night...",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setChats((prevChats) =>
        prevChats.map((chat) => (chat.id === activeChat ? { ...chat, uploadedFile: file } : chat)),
      )
      console.log("[v0] File uploaded to chat", activeChat, ":", file.name)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setChats((prevChats) =>
        prevChats.map((chat) => (chat.id === activeChat ? { ...chat, uploadedFile: file } : chat)),
      )
      console.log("[v0] File dropped to chat", activeChat, ":", file.name)
    }
  }

  const handleChatSelect = (chatId: number) => {
    setActiveChat(chatId)
    setCurrentView("main")
    console.log("[v0] Chat selected:", chatId)
  }

  const getCurrentChatFile = () => {
    return chats.find((chat) => chat.id === activeChat)?.uploadedFile || null
  }

  const analyticsData = [
    { user: "Student A", timeSpent: "10 mins", casesUploaded: 10, mcqAttempted: 2, mostQuestionsType: "Easy" },
    { user: "Student B", timeSpent: "20mins", casesUploaded: 1, mcqAttempted: 5, mostQuestionsType: "Hard" },
    { user: "Student C", timeSpent: "50 mins", casesUploaded: 12, mcqAttempted: 10, mostQuestionsType: "Easy" },
    { user: "Student D", timeSpent: "2 hours", casesUploaded: 12, mcqAttempted: 20, mostQuestionsType: "Hard" },
    { user: "Student E", timeSpent: "10 mins", casesUploaded: 4, mcqAttempted: 10, mostQuestionsType: "Hard" },
  ]

  const renderAdminAnalytics = () => (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Analytics</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cases Uploaded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MCQ Attempted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Most Questions Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analyticsData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.timeSpent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.casesUploaded}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.mcqAttempted}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.mostQuestionsType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 mt-6">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">Export</Button>
        <Button variant="outline" className="px-6 py-2 bg-transparent">
          Manage Users
        </Button>
      </div>
    </div>
  )

  const renderMainDashboard = () => {
    const currentFile = getCurrentChatFile()

    return (
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back, Mon!</h1>
        </div>

        {!currentFile ? (
          // Show upload area when no file is uploaded
          <div
            className="bg-blue-500 rounded-lg p-12 text-center text-white mb-8"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="mb-4">
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-lg mb-4">Drag and Drop here</p>
            <p className="text-sm mb-4">or</p>
            <label htmlFor="file-upload">
              <Button variant="secondary" className="bg-white text-blue-500 hover:bg-gray-100" asChild>
                <span>select a file</span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        ) : (
          // Show Generate Cases when file is uploaded
          <div>
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                <strong>Uploaded:</strong> {currentFile.name}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Cases</h2>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-700">Select a case to work on:</p>
                <Button variant="outline" className="text-sm bg-transparent">
                  Select Difficulty ⌄
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {cases.map((case_, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer"
                  onClick={() => {
                    setSelectedCase(case_.title)
                    setCurrentView("case-selection")
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{case_.title}</h3>
                      <p className="text-sm text-gray-600">{case_.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(case_.difficulty)}`}>
                      {case_.difficulty} ⌄
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!currentFile && (
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">RECENT</p>
              <p className="text-lg font-medium text-gray-900">Chat {activeChat.toString().padStart(2, "0")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">ANALYTICS</p>
              <div className="flex items-center">
                <p className="text-lg font-medium text-gray-900 mr-2">Questions Answered</p>
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">99+</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderCaseSelection = () => (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-4">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("main")}>
            home
          </span>
          /
          <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("main")}>
            cases.pdf
          </span>
          /Chest Pain in a Middle-Aged Man
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-900 mr-3">{selectedCase}</h1>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Moderate ⌄</span>
          </div>
          <div className="text-right">
            <p
              className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
              onClick={() => setCurrentView("main")}
            >
              Cases
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-8">How would you like to proceed?</p>
      </div>

      <div className="space-y-4">
        <div
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer"
          onClick={() => setCurrentView("generate-mcqs")}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">A) Generate MCQs</span>
            <span className="text-gray-400">⌄</span>
          </div>
        </div>
        <div
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer"
          onClick={() => setCurrentView("identify-concepts")}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">B) Identify Concepts</span>
            <span className="text-gray-400">⌄</span>
          </div>
        </div>
        <div
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer"
          onClick={() => setCurrentView("explore-cases")}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">C) Explore Case</span>
            <span className="text-gray-400">⌄</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderGenerateMCQs = () => {
    const questions = [
      "Most specific marker of myocardial infarction?",
      "First-line management for STEMI?",
      "ECG finding in pericarditis vs MI?",
      "ECG status in pericarditis vs MI?",
      "First-line management for STEMI?",
      "ECG finding in pericarditis vs MI?",
      "First-line management for STEMI?",
      "Most specific marker of myocardial infarction?",
    ]

    const toggleQuestion = (index: number) => {
      setExpandedQuestions((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    return (
      <div className="flex-1 p-8">
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-4">
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("main")}>
              home
            </span>
            /
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("main")}>
              cases.pdf
            </span>
            /
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("case-selection")}>
              Chest Pain in a Middle-Aged Man
            </span>
            /Generate MCQs
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 mr-3">Chest Pain in a Middle-Aged Man</h1>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Moderate ⌄</span>
            </div>
            <div className="text-right">
              <p
                className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => setCurrentView("case-selection")}
              >
                Options
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-8">Pick a question to proceed?</p>
        </div>

        <div className="space-y-3">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  {index + 1}) {question}
                </span>
                <span
                  className={`text-gray-400 transition-transform ${expandedQuestions.includes(index) ? "rotate-180" : ""}`}
                >
                  ⌄
                </span>
              </div>
              {expandedQuestions.includes(index) && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">Question details and options would appear here...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderExploreCases = () => {
    return (
      <div className="flex-1 p-8 flex flex-col">
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-4">
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("main")}>
              home
            </span>
            /
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("main")}>
              cases.pdf
            </span>
            /
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("case-selection")}>
              Chest Pain in a Middle-Aged Man
            </span>
            /Explore Cases
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 mr-3">Chest Pain in a Middle-Aged Man</h1>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Moderate ⌄</span>
            </div>
            <div className="text-right">
              <p
                className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => setCurrentView("case-selection")}
              >
                Options
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-8">Chat With the AI</p>
        </div>

        <div className="flex-1 flex flex-col justify-end">
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <input
                type="text"
                placeholder="Type something here!"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 p-3 border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-3 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentView("generate-mcqs")}>
              Generate MCQs
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => setCurrentView("identify-concepts")}
            >
              Identify Concepts
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderIdentifyConcepts = () => {
    const concepts = [
      "Pathophysiology of myocardial infarction.",
      "Differential diagnosis of chest pain.",
      "ST elevation vs non-ST elevation. Get to know more about the here.",
    ]

    return (
      <div className="flex-1 p-8 flex flex-col">
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-4">
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("main")}>
              home
            </span>
            /
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("main")}>
              cases.pdf
            </span>
            /
            <span className="cursor-pointer hover:text-blue-600" onClick={() => setCurrentView("case-selection")}>
              Chest Pain in a Middle-Aged Man
            </span>
            /Identify Concepts
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 mr-3">Chest Pain in a Middle-Aged Man</h1>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Moderate ⌄</span>
            </div>
            <div className="text-right">
              <p
                className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                onClick={() => setCurrentView("case-selection")}
              >
                Options
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-8">Pick a topic to proceed.</p>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="space-y-4 mb-8">
            {concepts.map((concept, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer"
              >
                <span className="font-medium text-gray-900">
                  {index + 1}) {concept}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <input
                type="text"
                placeholder="Type something here!"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 p-3 border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-3 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center mb-8">
            <Image src="/casewise-logo.png" alt="CaseWise" width={24} height={24} className="mr-2" />
            <span className="text-lg font-medium text-gray-700">CaseWise</span>
          </div>

          <div className="space-y-6">
            <div>
              <button
                onClick={() => setCurrentView("admin-analytics")}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                Admin Analytics
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Recent Chats</span>
                <button
                  onClick={() => setSidebarExpanded(!sidebarExpanded)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  +
                </button>
              </div>

              {(sidebarExpanded || currentView !== "main") && (
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatSelect(chat.id)}
                      className={`flex items-center p-2 rounded-lg cursor-pointer ${
                        activeChat === chat.id ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="w-6 h-6 rounded bg-gray-300 mr-3 flex items-center justify-center">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-8 0h2v2H9V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{chat.name}</span>
                      {chat.uploadedFile && <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">Mon</p>
                <p className="text-xs text-gray-500">mon@example.com</p>
              </div>
              <div className="relative">
                <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1"></div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center justify-between">
                    Notifications
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {currentView === "main" && renderMainDashboard()}
      {currentView === "admin-analytics" && renderAdminAnalytics()}
      {currentView === "case-selection" && renderCaseSelection()}
      {currentView === "generate-mcqs" && renderGenerateMCQs()}
      {currentView === "explore-cases" && renderExploreCases()}
      {currentView === "identify-concepts" && renderIdentifyConcepts()}
    </div>
  )
}
