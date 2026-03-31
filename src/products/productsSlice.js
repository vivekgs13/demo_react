import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    { id: 1, name: 'Wireless Headphones', price: '$29.99', description: 'High quality product' },
    { id: 2, name: 'USB-C Cable', price: '$49.99', description: 'Premium quality' },
    { id: 3, name: 'Phone Case', price: '$39.99', description: 'Best seller' },
    { id: 4, name: 'Screen Protector', price: '$12.99', description: 'Crystal clear protection' },
    { id: 5, name: 'Power Bank', price: '$34.99', description: 'Fast charging 20000mAh' },
    { id: 6, name: 'Laptop Stand', price: '$44.99', description: 'Adjustable ergonomic design' },
    { id: 7, name: 'Webcam 1080p', price: '$59.99', description: 'Professional streaming camera' },
    { id: 8, name: 'Mechanical Keyboard', price: '$89.99', description: 'RGB backlit gaming keyboard' },
    { id: 9, name: 'Wireless Mouse', price: '$24.99', description: 'Precision tracking mouse' },
    { id: 10, name: 'USB Hub', price: '$19.99', description: '7-port USB 3.0 hub' },
    { id: 11, name: 'HDMI Cable', price: '$14.99', description: '4K ultra HD support' },
    { id: 12, name: 'Monitor Light Bar', price: '$79.99', description: 'Auto-dimming desk lamp' },
    { id: 13, name: 'Bluetooth Speaker', price: '$54.99', description: '360-degree sound quality' },
    { id: 14, name: 'Phone Holder', price: '$9.99', description: 'Adjustable mount stand' },
    { id: 15, name: 'Cooling Pad', price: '$39.99', description: 'Laptop cooling with USB' },
    { id: 16, name: 'Microphone', price: '$69.99', description: 'Studio-grade recording mic' },
    { id: 17, name: 'SD Card Reader', price: '$16.99', description: 'Super fast card reader' },
    { id: 18, name: 'Cable Organizer', price: '$11.99', description: 'Desk cable management kit' },
    { id: 19, name: 'Desk Lamp', price: '$49.99', description: 'LED eye-care lamp' },
    { id: 20, name: 'External SSD', price: '$129.99', description: '1TB portable storage' },
    { id: 21, name: 'Surge Protector', price: '$22.99', description: '6-outlet power strip' },
    { id: 22, name: 'Keyboard Wrist Rest', price: '$18.99', description: 'Memory foam support' },
    { id: 23, name: 'Air Purifier', price: '$99.99', description: 'HEPA filter air cleaner' },
    { id: 24, name: 'Wireless Charger', price: '$35.99', description: 'Fast qi charging pad' },
    { id: 25, name: 'Phone Tripod', price: '$27.99', description: 'Flexible phone mount' },
    { id: 26, name: 'USB Splitter', price: '$13.99', description: '4-port USB hub' },
    { id: 27, name: 'Desk Organizer', price: '$21.99', description: 'Multi-compartment storage' },
    { id: 28, name: 'Monitor Stand', price: '$55.99', description: 'Adjustable height stand' },
    { id: 29, name: 'Gaming Mouse Pad', price: '$19.99', description: 'XL extended mousepad' },
    { id: 30, name: 'USB Flash Drive', price: '$15.99', description: '64GB portable storage' },
    { id: 31, name: 'Phone Screen Cleaner', price: '$8.99', description: 'Safe cleaning solution' },
    { id: 32, name: 'Cable Clips', price: '$9.99', description: 'Adhesive cable organizer' },
    { id: 33, name: 'Portable Charger', price: '$42.99', description: '10000mAh mini power bank' },
    { id: 34, name: 'Screen Glare Filter', price: '$24.99', description: 'Anti-glare filter' },
    { id: 35, name: 'Webcam Cover', price: '$6.99', description: 'Privacy webcam shutter' },
    { id: 36, name: 'USB Light Strip', price: '$18.99', description: 'LED bias lighting' },
    { id: 37, name: 'Keyboard Cleaner', price: '$12.99', description: 'Compressed air duster' },
    { id: 38, name: 'Monitor Arm', price: '$79.99', description: 'Full motion desk mount' },
    { id: 39, name: 'Phone Stand', price: '$14.99', description: 'Foldable phone holder' },
    { id: 40, name: 'Laptop Bag', price: '$64.99', description: 'Water-resistant backpack' },
  ]
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Can add more reducers as needed
  }
})

export default productsSlice.reducer
