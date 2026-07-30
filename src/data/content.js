export const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter, index) => ({
  id: letter,
  uppercase: letter,
  lowercase: letter.toLowerCase(),
  word: [
    "Apple", "Balloon", "Cat", "Duck", "Elephant", "Fish", "Guitar", "Hat", "Igloo",
    "Juice", "Kite", "Lion", "Moon", "Nest", "Orange", "Panda", "Queen", "Rocket",
    "Sun", "Tree", "Umbrella", "Van", "Whale", "Xylophone", "Yacht", "Zebra"
  ][index],
  emoji: [
    "🍎", "🎈", "🐱", "🦆", "🐘", "🐟", "🎸", "🎩", "🏠", "🧃", "🪁", "🦁",
    "🌙", "🪺", "🍊", "🐼", "👑", "🚀", "☀️", "🌳", "☂️", "🚐", "🐳", "🎼",
    "⛵", "🦓"
  ][index],
  color: [
    "#ef4444", "#f97316", "#f59e0b", "#0ea5e9", "#10b981", "#ec4899", "#2563eb",
    "#7c3aed", "#65a30d", "#22c55e", "#0284c7", "#4f46e5", "#9333ea", "#facc15",
    "#eab308", "#14b8a6", "#f97316", "#ef4444", "#ec4899", "#fb7185", "#f59e0b",
    "#ef4444", "#fb923c", "#f97316", "#eab308", "#f59e0b"
  ][index]
}));

export const letterExamples = {
  A: [
    { word: "Apple", emoji: "🍎" },
    { word: "Ant", emoji: "🐜" },
    { word: "Airplane", emoji: "✈️" },
    { word: "Alligator", emoji: "🐊" }
  ],
  B: [
    { word: "Balloon", emoji: "🎈" },
    { word: "Ball", emoji: "⚽" },
    { word: "Book", emoji: "📘" },
    { word: "Banana", emoji: "🍌" }
  ],
  C: [
    { word: "Cat", emoji: "🐱" },
    { word: "Car", emoji: "🚗" },
    { word: "Cake", emoji: "🎂" },
    { word: "Crown", emoji: "👑" }
  ],
  D: [
    { word: "Duck", emoji: "🦆" },
    { word: "Dog", emoji: "🐶" },
    { word: "Drum", emoji: "🥁" },
    { word: "Door", emoji: "🚪" }
  ],
  E: [
    { word: "Elephant", emoji: "🐘" },
    { word: "Egg", emoji: "🥚" },
    { word: "Envelope", emoji: "✉️" },
    { word: "Earth", emoji: "🌍" }
  ],
  F: [
    { word: "Fish", emoji: "🐟" },
    { word: "Flower", emoji: "🌸" },
    { word: "Fire", emoji: "🔥" },
    { word: "Frog", emoji: "🐸" }
  ],
  G: [
    { word: "Guitar", emoji: "🎸" },
    { word: "Grapes", emoji: "🍇" },
    { word: "Gift", emoji: "🎁" },
    { word: "Goat", emoji: "🐐" }
  ],
  H: [
    { word: "Hat", emoji: "🎩" },
    { word: "House", emoji: "🏠" },
    { word: "Heart", emoji: "❤️" },
    { word: "Horse", emoji: "🐴" }
  ],
  I: [
    { word: "Igloo", emoji: "🏠" },
    { word: "Ice", emoji: "🧊" },
    { word: "Ice Cream", emoji: "🍦" },
    { word: "Island", emoji: "🏝️" }
  ],
  J: [
    { word: "Juice", emoji: "🧃" },
    { word: "Jar", emoji: "🫙" },
    { word: "Jacket", emoji: "🧥" },
    { word: "Jeans", emoji: "👖" }
  ],
  K: [
    { word: "Kite", emoji: "🪁" },
    { word: "Key", emoji: "🔑" },
    { word: "King", emoji: "🤴" },
    { word: "Kiwi", emoji: "🥝" }
  ],
  L: [
    { word: "Lion", emoji: "🦁" },
    { word: "Leaf", emoji: "🍃" },
    { word: "Lamp", emoji: "💡" },
    { word: "Lemon", emoji: "🍋" }
  ],
  M: [
    { word: "Moon", emoji: "🌙" },
    { word: "Monkey", emoji: "🐵" },
    { word: "Milk", emoji: "🥛" },
    { word: "Music", emoji: "🎵" }
  ],
  N: [
    { word: "Nest", emoji: "🪺" },
    { word: "Nose", emoji: "👃" },
    { word: "Net", emoji: "🥅" },
    { word: "Notebook", emoji: "📓" }
  ],
  O: [
    { word: "Orange", emoji: "🍊" },
    { word: "Owl", emoji: "🦉" },
    { word: "Octopus", emoji: "🐙" },
    { word: "Onion", emoji: "🧅" }
  ],
  P: [
    { word: "Panda", emoji: "🐼" },
    { word: "Pizza", emoji: "🍕" },
    { word: "Pencil", emoji: "✏️" },
    { word: "Penguin", emoji: "🐧" }
  ],
  Q: [
    { word: "Queen", emoji: "👸" },
    { word: "Quilt", emoji: "🛏️" },
    { word: "Quiz", emoji: "❓" },
    { word: "Quarter", emoji: "🪙" }
  ],
  R: [
    { word: "Rocket", emoji: "🚀" },
    { word: "Rainbow", emoji: "🌈" },
    { word: "Ring", emoji: "💍" },
    { word: "Robot", emoji: "🤖" }
  ],
  S: [
    { word: "Sun", emoji: "☀️" },
    { word: "Star", emoji: "⭐" },
    { word: "Socks", emoji: "🧦" },
    { word: "Snake", emoji: "🐍" }
  ],
  T: [
    { word: "Tree", emoji: "🌳" },
    { word: "Train", emoji: "🚂" },
    { word: "Tiger", emoji: "🐯" },
    { word: "Tomato", emoji: "🍅" }
  ],
  U: [
    { word: "Umbrella", emoji: "☂️" },
    { word: "Unicorn", emoji: "🦄" },
    { word: "Uniform", emoji: "🎽" },
    { word: "Up", emoji: "⬆️" }
  ],
  V: [
    { word: "Van", emoji: "🚐" },
    { word: "Violin", emoji: "🎻" },
    { word: "Volcano", emoji: "🌋" },
    { word: "Vest", emoji: "🦺" }
  ],
  W: [
    { word: "Whale", emoji: "🐳" },
    { word: "Watch", emoji: "⌚" },
    { word: "Water", emoji: "💧" },
    { word: "Watermelon", emoji: "🍉" }
  ],
  X: [
    { word: "Xylophone", emoji: "🎼" },
    { word: "X-ray", emoji: "🩻" },
    { word: "Xmas Tree", emoji: "🎄" },
    { word: "X Mark", emoji: "❌" }
  ],
  Y: [
    { word: "Yacht", emoji: "⛵" },
    { word: "Yo-yo", emoji: "🪀" },
    { word: "Yarn", emoji: "🧶" },
    { word: "Yellow", emoji: "🟡" }
  ],
  Z: [
    { word: "Zebra", emoji: "🦓" },
    { word: "Zoo", emoji: "🦁" },
    { word: "Zip", emoji: "🤐" },
    { word: "Zero", emoji: "0️⃣" }
  ]
};

export const homeTiles = [
  { title: "Learn ABC", icon: "text", color: "#ef4444", route: "Learn" },
  { title: "Trace Letters", icon: "create", color: "#f59e0b", activity: "trace" },
  { title: "Phonics", icon: "volume-high", color: "#43a047", activity: "phonics" },
  { title: "Flash Cards", icon: "images", color: "#38bdf8", activity: "flashcards" },
  { title: "Games", icon: "game-controller", color: "#7c3aed", activity: "match" },
  { title: "Songs", icon: "musical-notes", color: "#ec4899", activity: "songs" },
  { title: "Quiz", icon: "help", color: "#8b5cf6", activity: "quiz" },
  { title: "Rewards", icon: "ribbon", color: "#f59e0b", activity: "rewards" },
  { title: "Progress", icon: "bar-chart", color: "#06b6d4", activity: "progress" }
];

export const onboarding = [
  {
    title: "Welcome to\nKid Genius ABC",
    subtitle: "The fun way to learn the alphabet!",
    artwork: "👦 👧",
    cta: "Next",
    background: ["#BFE8FF", "#FFFFFF"]
  },
  {
    title: "Trace Letters",
    subtitle: "Learn by tracing step by step!",
    artwork: "A",
    cta: "Next",
    background: ["#BFE8FF", "#FFFFFF"]
  },
  {
    title: "Earn Stars",
    subtitle: "Complete activities and win awesome rewards!",
    artwork: "🏆",
    cta: "Get Started",
    background: ["#BFE8FF", "#FFFFFF"]
  }
];

export const activities = {
  trace: {
    title: "Trace the Letter",
    prompt: "Follow the dots from 1 to 3.",
    mode: "trace",
    background: "bg4"
  },
  phonics: {
    title: "Phonics",
    prompt: "A says /ae/. Listen and repeat.",
    mode: "phonics",
    background: "bg3"
  },
  flashcards: {
    title: "Flash Cards",
    prompt: "1/26",
    mode: "flashcards",
    background: "bg2"
  },
  match: {
    title: "Match the Letter",
    prompt: "Which one is A?",
    mode: "choices",
    choices: ["A", "O", "B", "C"],
    background: "bg5"
  },
  beginning: {
    title: "Beginning Sound",
    prompt: "Apple starts with?",
    mode: "choices",
    choices: ["A", "B", "C"],
    background: "bg5"
  },
  missing: {
    title: "Missing Letter",
    prompt: "Which letter is missing?",
    mode: "missing",
    choices: ["C", "E", "F"],
    background: "bg6"
  },
  balloon: {
    title: "Balloon Pop",
    prompt: "Pop the letter: M",
    mode: "balloon",
    background: "bg1"
  },
  train: {
    title: "Alphabet Train",
    prompt: "Arrange the letters",
    mode: "train",
    background: "bg2"
  },
  fishing: {
    title: "Fishing Fun",
    prompt: "Catch the letter: P",
    mode: "fishing",
    background: "bg3"
  },
  quiz: {
    title: "Quiz",
    prompt: "What comes after G?",
    mode: "quiz",
    choices: ["H", "I", "J", "K"],
    background: "bg6"
  },
  result: {
    title: "Quiz Result",
    prompt: "Great Job!",
    mode: "result",
    background: "bg7"
  },
  rewards: {
    title: "Rewards",
    prompt: "125 stars and 50 coins",
    mode: "rewards",
    background: "bg7"
  },
  progress: {
    title: "Progress",
    prompt: "Keep learning every day.",
    mode: "progress",
    background: "blue"
  },
  achievements: {
    title: "Achievements",
    prompt: "Badges earned by Buddy",
    mode: "achievements",
    background: "bg5"
  },
  offline: {
    title: "Download Content",
    prompt: "Save lessons for offline learning.",
    mode: "offline",
    background: "blue"
  },
  noInternet: {
    title: "No Internet",
    prompt: "Please check your connection.",
    mode: "noInternet",
    background: "bg4"
  },
  comingSoon: {
    title: "Coming Soon",
    prompt: "New games are on the way!",
    mode: "comingSoon",
    background: "bg7"
  },
  share: {
    title: "Share the App",
    prompt: "Invite friends to learn with Buddy.",
    mode: "share",
    background: "bg1"
  },
  exit: {
    title: "Bye Buddy!",
    prompt: "See you next time.",
    mode: "exit",
    background: "bg7"
  }
};
