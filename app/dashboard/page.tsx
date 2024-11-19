'use client'

import * as React from "react"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip } from "recharts"
import {
  LayoutDashboard,
  FileText,
  Package,
  Users,
  Settings,
  Search,
  ChevronLeft,
  LogOut,
  HelpCircle,
  Bell,
  ChevronRight,
  FileBarChart,
  Wallet,
  CircleDollarSign,
  ArrowRightLeft,
  FileStack,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const barChartData = [
  { name: "Cost of Advertising", value: 2000 },
  { name: "FBA Inbound Pickup Service", value: 2500 },
  { name: "FBA Inventory Storage Fee", value: 3500 },
]

const pieChartData = [
  { name: "Customer Return", value: 23188.40 },
  { name: "Customer Service Issue", value: 14868.69 },
  { name: "Damaged:Warehouse", value: 2197.21 },
  { name: "Lost:Inbound", value: 28073.20 },
  { name: "Fee Correction", value: 1357.91 },
]

const COLORS = ['#333333', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

const tableData = [
  { orderId: "171-0359154-XXXXXX", netAmount: 1052, invoiceAmount: 1335, orderDate: "July 18, 2024", description: "Product A" },
  { orderId: "171-0828577-XXXXXX", netAmount: 1030, invoiceAmount: 1320, orderDate: "July 18, 2024", description: "Product A" },
  { orderId: "171-0862578-XXXXXX", netAmount: 1030, invoiceAmount: 1320, orderDate: "July 18, 2024", description: "Product A" },
  { orderId: "171-1021405-XXXXXX", netAmount: 240, invoiceAmount: 347, orderDate: "July 18, 2024", description: "Product A" },
  { orderId: "171-1056871-XXXXXX", netAmount: 1847, invoiceAmount: 2290, orderDate: "July 18, 2024", description: "Product A" },
]

type Page = 'dashboard' | 'orders' | 'returns' | 'payments' | 'tolerance' | 'negative' | 'documents' | 'products' | 'customers' | 'settings' | 'previous-month' | 'analytics' | 'revenue' | 'transactions' | 'reports' | 'notifications' | 'help' | 'logout'

export default function Dashboard() {
  const [currentPage, setCurrentPage] = React.useState<Page>('dashboard')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  const metrics = [
    { title: "Previous Month Order", value: "3,458", page: 'previous-month' },
    { title: "Order & Payment Received", value: "153", page: 'orders' },
    { title: "Payment Pending", value: "229", page: 'payments' },
    { title: "Tolerance rate breached", value: "3", page: 'tolerance' },
    { title: "Return", value: "277", page: 'returns' },
    { title: "Negative Payout", value: "666", page: 'negative' },
  ]

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", page: 'dashboard' },
    { icon: FileBarChart, label: "Analytics", page: 'analytics' },
    { icon: Wallet, label: "Payments", page: 'payments' },
    { icon: CircleDollarSign, label: "Revenue", page: 'revenue' },
    { icon: ArrowRightLeft, label: "Transactions", page: 'transactions' },
    { icon: FileStack, label: "Reports", page: 'reports' },
    { icon: FileText, label: "Documents", page: 'documents' },
    { icon: Package, label: "Products", page: 'products' },
    { icon: Users, label: "Customers", page: 'customers' },
    { icon: Settings, label: "Settings", page: 'settings' },
  ]

  const handleRowSelect = (orderId: string) => {
    setSelectedRows(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === tableData.length
        ? []
        : tableData.map(row => row.orderId)
    )
  }

  const filteredTableData = tableData.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const getPageTitle = (page: Page) => {
    const titles: Record<Page, string> = {
      dashboard: 'Dashboard',
      orders: 'Order & Payment Received',
      returns: 'Returns',
      payments: 'Payment Pending',
      tolerance: 'Tolerance Rate Breached',
      negative: 'Negative Payout',
      documents: 'Documents',
      products: 'Products',
      customers: 'Customers',
      settings: 'Settings',
      'previous-month': 'Previous Month Orders',
      analytics: 'Analytics',
      revenue: 'Revenue',
      transactions: 'Transactions',
      reports: 'Reports',
      notifications: 'Notifications',
      help: 'Help',
      logout: 'Logout'
    }
    return titles[page]
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r transition-all duration-300",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="w-8 h-8 bg-purple-600 rounded-lg" />
          {!isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex flex-col h-[calc(100%-4rem)] justify-between">
          <nav className="p-2 pt-8">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(item.page)}
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 mb-1",
                  "md:px-4 md:py-2",
                  currentPage === item.page ? "text-purple-600 bg-purple-50" : "text-gray-600"
                )}
              >
                <item.icon className={cn("w-5 h-5", currentPage === item.page && "fill-purple-600")} />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-2 border-t">
            {[
              { icon: Bell, label: "Notifications", page: 'notifications' },
              { icon: HelpCircle, label: "Help", page: 'help' },
              { icon: LogOut, label: "Logout", page: 'logout' },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(item.page)}
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-100",
                  "md:px-4 md:py-2",
                  currentPage === item.page && "text-purple-600 bg-purple-50"
                )}
              >
                <item.icon className={cn("w-5 h-5", currentPage === item.page && "fill-purple-600")} />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4">
          {isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5 rotate-180" />
            </button>
          )}
          {currentPage === 'dashboard' && (
            <div className="flex-1 flex justify-center max-w-xl mx-auto">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                prefix={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>
          )}
          {currentPage !== 'dashboard' && <div />}
        </header>

        {/* Breadcrumb */}
        <div className="bg-white border-b px-4 py-2">
          <div className={cn("w-full", currentPage === 'dashboard' && "text-center text-purple-600")}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => setCurrentPage('dashboard')} className="cursor-pointer">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentPage !== 'dashboard' && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{getPageTitle(currentPage)}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4">
          {currentPage === 'dashboard' ? (
            <div className="space-y-4">
              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setCurrentPage(metric.page)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                      <ChevronRight className="w-6 h-6" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Reimbursements by Dispute Type - last 30 days
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value/1000}K`} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8b5cf6" barSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      % Reimbursements by Dispute Type - this year
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center">
                      <ResponsiveContainer width="60%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex-1">
                        {pieChartData.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                            <span className="text-sm">{entry.name}</span>
                            <span className="text-sm ml-auto">{entry.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : currentPage === 'orders' ? (
            <Card>
              <CardHeader>
                <CardTitle>Order & Payment Received</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectedRows.length === tableData.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Net Amount</TableHead>
                      <TableHead>Invoice Amount</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>P_Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTableData.map((row) => (
                      <TableRow key={row.orderId}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(row.orderId)}
                            onCheckedChange={() => handleRowSelect(row.orderId)}
                          />
                        </TableCell>
                        <TableCell>{row.orderId}</TableCell>
                        <TableCell>{row.netAmount}</TableCell>
                        <TableCell>{row.invoiceAmount}</TableCell>
                        <TableCell>{row.orderDate}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl font-bold">{getPageTitle(currentPage)}</h1>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}