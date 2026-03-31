import React, { useState } from 'react'

const Orders = () => {
  const initialOrders = [
    { id: 1, orderNumber: 'ORD-001', total: 99.99, date: '2024-03-25', status: 'Delivered' },
    { id: 2, orderNumber: 'ORD-002', total: 149.99, date: '2024-03-26', status: 'Pending' },
    { id: 3, orderNumber: 'ORD-003', total: 79.99, date: '2024-03-27', status: 'Processing' },
    { id: 4, orderNumber: 'ORD-004', total: 199.99, date: '2024-03-24', status: 'Delivered' },
    { id: 5, orderNumber: 'ORD-005', total: 59.99, date: '2024-03-28', status: 'Pending' },
  ]

  const [sortKey, setSortKey] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = (key) => {
    if (sortKey === key) {
      // Toggle sort order if same column is clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new sort key with ascending order
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  const getSortedOrders = () => {
    if (!sortKey) return initialOrders

    const sorted = [...initialOrders].sort((a, b) => {
      let aValue = a[sortKey]
      let bValue = b[sortKey]

      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
      }

      // Handle string values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return sortOrder === 'asc' ? comparison : -comparison
      }

      return 0
    })

    return sorted
  }

  const getSortIndicator = (key) => {
    if (sortKey !== key) return ' ⇅'
    return sortOrder === 'asc' ? ' ↑' : ' ↓'
  }

  const sortedOrders = getSortedOrders()

  return (
    <div className="content-section">
      <h1>Orders</h1>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('orderNumber')}
                className={`sortable-header ${sortKey === 'orderNumber' ? 'active' : ''}`}
              >
                Order Number{getSortIndicator('orderNumber')}
              </th>
              <th 
                onClick={() => handleSort('total')}
                className={`sortable-header ${sortKey === 'total' ? 'active' : ''}`}
              >
                Total{getSortIndicator('total')}
              </th>
              <th 
                onClick={() => handleSort('date')}
                className={`sortable-header ${sortKey === 'date' ? 'active' : ''}`}
              >
                Date{getSortIndicator('date')}
              </th>
              <th 
                onClick={() => handleSort('status')}
                className={`sortable-header ${sortKey === 'status' ? 'active' : ''}`}
              >
                Status{getSortIndicator('status')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.date}</td>
                <td>
                  <span className={`status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
