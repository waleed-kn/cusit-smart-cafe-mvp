// Mock data for CUSIT Smart Café Pre-Ordering System

export const INITIAL_MENU_ITEMS = [
  {
    id: 1,
    name: "Espresso",
    category: "Coffee",
    price: 220,
    rating: 4.8,
    reviews: 124,
    description: "Rich, bold, and concentrated shot of premium roasted coffee beans.",
    image: "https://images.unsplash.com/photo-1510701114245-25a418863bc1?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "3 mins",
    options: {
      size: ["Single Shot", "Double Shot (+50)"],
      milk: ["None", "Almond Milk (+60)", "Oat Milk (+70)"],
      sweetness: ["None", "Medium", "Sweet"]
    }
  },
  {
    id: 2,
    name: "Caramel Macchiato",
    category: "Coffee",
    price: 380,
    rating: 4.9,
    reviews: 245,
    description: "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and drizzled with caramel.",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "5 mins",
    options: {
      size: ["Regular", "Large (+80)"],
      milk: ["Whole Milk", "Skimmed Milk", "Oat Milk (+70)"],
      sweetness: ["Regular", "Extra Caramel", "Less Sweet"]
    }
  },
  {
    id: 3,
    name: "Café Latte",
    category: "Coffee",
    price: 320,
    rating: 4.7,
    reviews: 189,
    description: "A shot of rich espresso topped with a generous amount of silky steamed milk and a thin layer of foam.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "4 mins",
    options: {
      size: ["Regular", "Large (+70)"],
      milk: ["Whole Milk", "Almond Milk (+60)", "Oat Milk (+70)"],
      sweetness: ["None", "Medium", "Sweet"]
    }
  },
  {
    id: 4,
    name: "Matcha Latte",
    category: "Tea",
    price: 340,
    rating: 4.6,
    reviews: 95,
    description: "Pure Japanese matcha green tea whisked with creamy steamed milk and lightly sweetened.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "4 mins",
    options: {
      size: ["Regular", "Large (+70)"],
      milk: ["Whole Milk", "Oat Milk (+70)", "Soy Milk (+60)"],
      sweetness: ["Medium", "No Sugar", "Extra Sweet"]
    }
  },
  {
    id: 5,
    name: "Cardamom Milk Tea (Karak)",
    category: "Tea",
    price: 120,
    rating: 4.9,
    reviews: 512,
    description: "Slow-brewed strong black tea infused with cardamom, saffron, and condensed milk. A campus favorite!",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "3 mins",
    options: {
      size: ["Standard Cup", "Large Mug (+50)"],
      sweetness: ["Regular Sweet", "Less Sweet", "Sugar Free"]
    }
  },
  {
    id: 6,
    name: "Butter Croissant",
    category: "Bakery",
    price: 180,
    rating: 4.5,
    reviews: 140,
    description: "Flaky, golden-brown French pastry made with pure butter and served warm.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "2 mins",
    options: {
      addons: ["Plain", "With Nutella (+60)", "With Cheese (+50)"]
    }
  },
  {
    id: 7,
    name: "Chocolate Fudge Muffin",
    category: "Bakery",
    price: 160,
    rating: 4.7,
    reviews: 88,
    description: "Moist chocolate muffin packed with chocolate chunks and a molten fudge center.",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "2 mins",
    options: {
      heating: ["Heated", "Room Temperature"]
    }
  },
  {
    id: 8,
    name: "CUSIT Club Sandwich",
    category: "Meals",
    price: 450,
    rating: 4.8,
    reviews: 320,
    description: "Triple-decker sandwich with grilled chicken breast, fried egg, cheese, lettuce, tomatoes, and house sauce, served with French fries.",
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "8 mins",
    options: {
      bread: ["White Bread", "Brown Bread"],
      sides: ["Fries", "Coleslaw", "Extra Fries (+40)"]
    }
  },
  {
    id: 9,
    name: "Spicy Crispy Zinger Burger",
    category: "Meals",
    price: 490,
    rating: 4.9,
    reviews: 410,
    description: "Juicy, crispy double-fried spicy chicken thigh fillet in a sesame bun with jalapeno mayo and crunchy lettuce.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "10 mins",
    options: {
      cheese: ["No Cheese", "Add Cheese Slice (+40)"],
      spiciness: ["Regular Spicy", "Fire Extreme!"]
    }
  },
  {
    id: 10,
    name: "Alfredo Pasta",
    category: "Meals",
    price: 550,
    rating: 4.7,
    reviews: 156,
    description: "Fettuccine tossed in a rich, creamy parmesan cheese sauce and topped with garlic herb grilled chicken.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "12 mins",
    options: {
      addons: ["Standard", "Extra Grilled Chicken (+120)", "Extra Mushrooms (+50)"]
    }
  },
  {
    id: 11,
    name: "Masala Fries",
    category: "Snacks",
    price: 150,
    rating: 4.6,
    reviews: 290,
    description: "Crispy golden potato fries tossed in a spicy, chatpatta Pakistani masala blend.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80",
    available: true,
    prepTime: "4 mins",
    options: {
      size: ["Regular", "Jumbo (+80)"],
      sauce: ["Garlic Mayo", "Chilli Garlic Sauce", "Both"]
    }
  }
];

export const MOCK_USERS = {
  student: {
    id: "S-10029",
    name: "Muhammad Waleed",
    email: "student@cusit.edu.pk",
    role: "student",
    walletBalance: 2450,
    loyaltyPoints: 340,
    department: "Software Engineering",
    semester: "6th",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Waleed"
  },
  staff: {
    id: "ST-8812",
    name: "Chef Asif Khan",
    email: "staff@cusit.edu.pk",
    role: "staff",
    department: "Cafeteria Operations",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Asif"
  },
  admin: {
    id: "A-5001",
    name: "Dr. Farooq Shah (Director)",
    email: "admin@cusit.edu.pk",
    role: "admin",
    department: "Campus Services",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Farooq"
  }
};

export const SEAT_CATEGORIES = [
  { id: "window", name: "Window View", desc: "Facing the beautiful green lawn" },
  { id: "hall", name: "Main Hall", desc: "Central high-energy dining zone" },
  { id: "quiet", name: "Quiet Zone", desc: "For students wanting to study/code" }
];

export const INITIAL_SEATS = [
  // Window area seats (Tables 1-6)
  { id: "W1", tableNo: 1, capacity: 2, category: "window", status: "available" },
  { id: "W2", tableNo: 2, capacity: 4, category: "window", status: "reserved", reservedBy: "S-10044", timeSlot: "12:00 PM - 01:00 PM" },
  { id: "W3", tableNo: 3, capacity: 2, category: "window", status: "available" },
  { id: "W4", tableNo: 4, capacity: 6, category: "window", status: "available" },
  { id: "W5", tableNo: 5, capacity: 4, category: "window", status: "reserved", reservedBy: "S-10221", timeSlot: "01:00 PM - 02:00 PM" },
  { id: "W6", tableNo: 6, capacity: 2, category: "window", status: "available" },
  
  // Main Hall seats (Tables 7-15)
  { id: "H1", tableNo: 7, capacity: 4, category: "hall", status: "available" },
  { id: "H2", tableNo: 8, capacity: 4, category: "hall", status: "available" },
  { id: "H3", tableNo: 9, capacity: 8, category: "hall", status: "reserved", reservedBy: "S-10088", timeSlot: "11:00 AM - 12:00 PM" },
  { id: "H4", tableNo: 10, capacity: 4, category: "hall", status: "available" },
  { id: "H5", tableNo: 11, capacity: 4, category: "hall", status: "available" },
  { id: "H6", tableNo: 12, capacity: 6, category: "hall", status: "available" },
  { id: "H7", tableNo: 13, capacity: 4, category: "hall", status: "reserved", reservedBy: "S-10115", timeSlot: "02:00 PM - 03:00 PM" },
  { id: "H8", tableNo: 14, capacity: 2, category: "hall", status: "available" },
  { id: "H9", tableNo: 15, capacity: 4, category: "hall", status: "available" },

  // Quiet corner seats (Tables 16-20)
  { id: "Q1", tableNo: 16, capacity: 1, category: "quiet", status: "available" },
  { id: "Q2", tableNo: 17, capacity: 1, category: "quiet", status: "reserved", reservedBy: "S-10029", timeSlot: "03:00 PM - 04:00 PM" },
  { id: "Q3", tableNo: 18, capacity: 2, category: "quiet", status: "available" },
  { id: "Q4", tableNo: 19, capacity: 2, category: "quiet", status: "available" },
  { id: "Q5", tableNo: 20, capacity: 4, category: "quiet", status: "available" }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-9921",
    userId: "S-10029",
    userName: "Muhammad Waleed",
    items: [
      { id: 5, name: "Cardamom Milk Tea (Karak)", price: 120, quantity: 2, selectedOptions: { size: "Standard Cup", sweetness: "Regular Sweet" } },
      { id: 8, name: "CUSIT Club Sandwich", price: 450, quantity: 1, selectedOptions: { bread: "White Bread", sides: "Fries" } }
    ],
    total: 690,
    paymentMethod: "Student Wallet",
    status: "preparing",
    timestamp: "2026-05-21T21:40:00+05:00",
    prepCountdown: 300, // seconds
    tableReserved: "Q2",
    notes: "Please make the Karak tea extra hot."
  },
  {
    id: "ORD-9918",
    userId: "S-10044",
    userName: "Ayesha Ahmed",
    items: [
      { id: 2, name: "Caramel Macchiato", price: 380, quantity: 1, selectedOptions: { size: "Regular", milk: "Whole Milk", sweetness: "Regular" } },
      { id: 6, name: "Butter Croissant", price: 180, quantity: 2, selectedOptions: { addons: "With Nutella (+60)" } }
    ],
    total: 680,
    paymentMethod: "Credit Card",
    status: "ready",
    timestamp: "2026-05-21T21:15:00+05:00",
    prepCountdown: 0,
    tableReserved: null,
    notes: "Warm the croissant."
  },
  {
    id: "ORD-9912",
    userId: "S-10115",
    userName: "Zeeshan Ali",
    items: [
      { id: 9, name: "Spicy Crispy Zinger Burger", price: 490, quantity: 1, selectedOptions: { cheese: "Add Cheese Slice (+40)", spiciness: "Fire Extreme!" } }
    ],
    total: 530,
    paymentMethod: "JazzCash",
    status: "completed",
    timestamp: "2026-05-21T20:30:00+05:00",
    prepCountdown: 0,
    tableReserved: "H7",
    notes: ""
  }
];

export const MOCK_REVIEWS = [
  { id: 1, name: "Hamza Shah", rating: 5, comment: "The Zinger burger is actually crispy and hot. Best part is not having to wait in line anymore!", date: "Yesterday" },
  { id: 2, name: "Sara Malik", rating: 5, comment: "Karak tea is outstanding! Pre-ordering it 5 mins before my lecture ends and picking it up on the way is a life saver.", date: "2 days ago" },
  { id: 3, name: "Bilal Afridi", rating: 4, comment: "Seat reservation system works really well. It's nice to lock down a quiet corner table for group study sessions.", date: "5 days ago" }
];
