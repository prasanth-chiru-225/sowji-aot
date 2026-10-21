import { assetPath } from "../utils/assetPath";

export interface ChapterItem {
  id: number;
  roman: string;
  title: string;
  subtitle: string;
  quote: string;
  lead: string;
  story: string[];
  themeColor: string;
  scoutQuote: string;
  backgroundImage?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  caption: string;
  imageSrc: string;
  tag: string;
  notes: string;
}

export interface BirthdayConfig {
  recipientName: string;
  birthdayDate: string;
  yearCelebration: string;
  coreMessage: string;
  dossier: {
    subject: string;
    status: string;
    specialAbility: string;
    mission: string;
    priorityLevel: string;
    regimentCode: string;
    clearanceLevel: string;
    expeditionLogDate: string;
    subjectPhoto: string;
    typewriterLetter: string[];
  };
  chapters: ChapterItem[];
  memories: MemoryItem[];
  secretMessage: {
    clue: string;
    salutation: string;
    paragraphs: string[];
    signoff: string;
    sender: string;
    attachedPhoto: string;
  };
  climax: {
    stage1: string;
    stage2: string;
    headline: string;
    blessing: string;
    epilogue: string;
    finalWishLetter: {
      title: string;
      body: string[];
      crestMessage: string;
    };
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipientName: "Sowji",
  birthdayDate: "24 October",
  yearCelebration: "2024",
  coreMessage: "Some people make the world feel a little less ordinary. You're one of those people, Sowji.",

  dossier: {
    subject: "SOWJI",
    status: "ABSOLUTELY IRREPLACEABLE",
    specialAbility: "MAKING LIFE BETTER",
    mission: "KEEP SMILING",
    priorityLevel: "LEGENDARY",
    regimentCode: "SCOUT-EXP-1024",
    clearanceLevel: "CLASSIFIED // LEVEL OMEGA",
    expeditionLogDate: "24.10 // TIME IMMEMORIAL",
    subjectPhoto: assetPath("/photos/photo-1.jpg"),
    typewriterLetter: [
      "Hey Sowji,",
      "If you're reading this, then you've officially made it to the most important mission of the year.",
      "No titans to fight. No walls to climb. No humanity to save.",
      "Today, the entire world can take a little break.",
      "Because today is about celebrating you."
    ]
  },

  chapters: [
    {
      id: 1,
      roman: "CHAPTER 01",
      title: "THE BEGINNING",
      subtitle: "How an ordinary day turned into an extraordinary friendship",
      quote: "Even the tallest walls were built stone by stone.",
      lead: "Every unforgettable story starts without fanfare.",
      story: [
        "In a world where everyone is in a rush, running their own race and navigating their own walls, true connection is rare.",
        "Our story didn't start with thunder or fanfare. It started with an ordinary conversation, a simple moment in time that slowly carved out a place where honesty, laughter, and trust could flourish.",
        "Looking back, who would have guessed that a quiet beginning would become one of the most reliable anchors in life?"
      ],
      themeColor: "from-stone-900 via-titan-stone to-titan-dark",
      scoutQuote: "“The world is cruel, but it is also very beautiful.”",
      backgroundImage: assetPath("/images/aot-walls-landscape.webp")
    },
    {
      id: 2,
      roman: "CHAPTER 02",
      title: "THE LITTLE THINGS",
      subtitle: "The unwritten moments that mean the most",
      quote: "It was never the big grand gestures. It was always the simple times.",
      lead: "The real magic of having you as a best friend lives in the margins.",
      story: [
        "It’s the spontaneous jokes that only make sense to us. The shared memes that arrive right when a day is feeling too long.",
        "It’s having someone who listens without judgement, someone who laughs at the most unhinged moments, and someone whose presence makes even quiet silence feel completely comfortable.",
        "These are the small things that build an unbreakable bond. The world might see just everyday minutes, but to me, each one has been a gift."
      ],
      themeColor: "from-scout-emerald via-titan-stone to-titan-dark",
      scoutQuote: "“If you win, you live. If you don't fight, you can't win. But with you, every fight feels winnable.”",
      backgroundImage: assetPath("/images/aot-shiganshina.webp")
    },
    {
      id: 3,
      roman: "CHAPTER 03",
      title: "THROUGH EVERY WALL",
      subtitle: "Courage, storms, and the strength of genuine support",
      quote: "Walls are built to keep things out, but they also teach us how to rise above them.",
      lead: "Life will inevitably throw walls in front of us.",
      story: [
        "There are days when the world feels demanding, when things don’t go to plan, or when doubts creep in through the cracks.",
        "In those moments, having a person like you in my corner makes all the difference. Your resilience, your kindness, and the quiet dignity with which you face challenges inspire everyone around you.",
        "No matter what high walls or rough weather lie ahead, remember that you never have to face them on your own."
      ],
      themeColor: "from-crimson-deep via-titan-stone to-titan-dark",
      scoutQuote: "“Give your heart to the things and people that truly matter.”",
      backgroundImage: assetPath("/images/aot-heroes-bg.jpg")
    },
    {
      id: 4,
      roman: "CHAPTER 04",
      title: "THE WINGS OF FREEDOM",
      subtitle: "Soaring into new skies without fear",
      quote: "The wings don't represent escaping reality. They represent flying forward.",
      lead: "Some people don’t need to save the whole world.",
      story: [
        "Sometimes, making one person's world brighter is already something extraordinary.",
        "You carry a spark that brings light into rooms, that lifts heavy moods, and that makes life feel like an adventure worth embarking on.",
        "Spread those wings, Sowji. Whatever goals, dreams, or hidden ambitions you hold in your heart, you have the wings to reach them."
      ],
      themeColor: "from-scout-cloak via-slate-900 to-titan-dark",
      scoutQuote: "“Because you were born into this world, you are already free.”",
      backgroundImage: assetPath("/images/aot-scout-bg.png")
    },
    {
      id: 5,
      roman: "CHAPTER 05",
      title: "THE BIRTHDAY TRANSMISSION",
      subtitle: "Standing at the edge of the horizon",
      quote: "The dawn always breaks, no matter how long the night.",
      lead: "And so we arrive at this coordinates: 24 October.",
      story: [
        "A date carved into the calendar as a reminder of how lucky the people around you are.",
        "Today marks another orbit around the sun, another chapter in an incredible life story that is still writing its best verses.",
        "Take a deep breath, look out at the horizon, and prepare to open the transmission meant solely for you."
      ],
      themeColor: "from-amber-950 via-titan-charcoal to-titan-dark",
      scoutQuote: "“To Sowji: May your journey ahead be boundless.”",
      backgroundImage: assetPath("/images/aot-shiganshina.webp")
    }
  ],

  memories: [
    {
      id: "MEM-01",
      title: "The Unforgettable Smile",
      date: "Log Entry #001",
      location: "Wall Rose Inner District",
      caption: "Where two paths crossed and an unspoken alliance was forged.",
      imageSrc: assetPath("/photos/photo-1.jpg"),
      tag: "ORIGIN POINT",
      notes: "The beginning of conversations that would last for hours without either of us noticing time pass."
    },
    {
      id: "MEM-02",
      title: "Effortless Radiance",
      date: "Log Entry #002",
      location: "Scout Headquarters",
      caption: "That calm, graceful presence that makes every tough day instantly brighter.",
      imageSrc: assetPath("/photos/photo-2.jpg"),
      tag: "AURA OF HOPE",
      notes: "Proof that having someone who genuinely listens is one of life's greatest gifts."
    },
    {
      id: "MEM-03",
      title: "Tactical Tea & Random Talks",
      date: "Log Entry #003",
      location: "District Courtyard",
      caption: "Unfiltered laughter, ridiculous theories, and solving zero problems while feeling a hundred times lighter.",
      imageSrc: assetPath("/photos/photo-3.jpg"),
      tag: "SHARED LAUGHS",
      notes: "The simplest shared jokes become the strongest armor against bad days."
    },
    {
      id: "MEM-04",
      title: "Pure Joy & Warmth",
      date: "Log Entry #004",
      location: "Observation Tower",
      caption: "Always finding reasons to smile, even when the world gets hectic.",
      imageSrc: assetPath("/photos/photo-4.jpg"),
      tag: "VITAL ENERGY",
      notes: "A signature vibe that naturally puts everyone around at ease."
    },
    {
      id: "MEM-05",
      title: "Standing Tall",
      date: "Log Entry #005",
      location: "Outer Gate Horizon",
      caption: "Through stress, chaos, and busy schedules, remaining the dependable anchor.",
      imageSrc: assetPath("/photos/photo-5.jpg"),
      tag: "LOYALTY",
      notes: "Real friendship isn't about talking every single second; it's knowing that whenever you do, nothing has shifted."
    },
    {
      id: "MEM-06",
      title: "Candid Moments",
      date: "Log Entry #006",
      location: "Shiganshina Ridge",
      caption: "Natural, unposed, and 100% genuine — the real Sowji that everyone loves.",
      imageSrc: assetPath("/photos/photo-6.jpg"),
      tag: "AUTHENTICITY",
      notes: "The moments in-between are always the ones that stick in memory the longest."
    },
    {
      id: "MEM-07",
      title: "Golden Hour Glow",
      date: "Log Entry #007",
      location: "District Vista",
      caption: "Sunset lighting matching the warmth of an extraordinary friend.",
      imageSrc: assetPath("/photos/photo-7.jpg"),
      tag: "SUNSET PATROL",
      notes: "May your days always be touched by this kind of golden warmth."
    },
    {
      id: "MEM-08",
      title: "The Scout Spirit",
      date: "Log Entry #008",
      location: "Regiment Training Grounds",
      caption: "Fierce, independent, capable, and never afraid to chase what she wants.",
      imageSrc: assetPath("/photos/photo-8.jpg"),
      tag: "STRENGTH",
      notes: "Watching your resilience and ambition is a constant inspiration."
    },
    {
      id: "MEM-09",
      title: "Endless Celebrations",
      date: "Log Entry #009",
      location: "Festival Grounds",
      caption: "Dressed up, celebrating milestones, and bringing life to the party.",
      imageSrc: assetPath("/photos/photo-9.jpg"),
      tag: "CELEBRATION",
      notes: "Every room gets ten times livelier when you're there."
    },
    {
      id: "MEM-10",
      title: "Quiet Confidence",
      date: "Log Entry #010",
      location: "Inner Sanctum",
      caption: "Calm in the storm, graceful under pressure, and always true to herself.",
      imageSrc: assetPath("/photos/photo-10.jpg"),
      tag: "GRACE",
      notes: "Never lose that quiet confidence that defines who you are."
    },
    {
      id: "MEM-11",
      title: "Beyond the Horizon",
      date: "Log Entry #011",
      location: "The Boundary of Tomorrow",
      caption: "Dreaming big, talking about the future, and refusing to settle for ordinary.",
      imageSrc: assetPath("/photos/photo-11.jpg"),
      tag: "ASPIRATION",
      notes: "The world beyond the walls belongs to people who dare to dream."
    },
    {
      id: "MEM-12",
      title: "The 24 October Special",
      date: "24 October Special",
      location: "The Golden Dawn",
      caption: "An unbreakable pact of friendship, dedicated with the Wings of Freedom.",
      imageSrc: assetPath("/photos/photo-12.jpg"),
      tag: "ANNIVERSARY",
      notes: "Happy Birthday Sowji. May every chapter ahead be brighter than the last."
    }
  ],

  secretMessage: {
    clue: "Not every treasure is found beyond the walls. Some are hidden in the words we leave behind.",
    salutation: "Sowji,",
    attachedPhoto: assetPath("/photos/photo-2.jpg"),
    paragraphs: [
      "I don't know if I say it enough, but I'm genuinely glad that you're part of my life.",
      "Some friendships become special through the smallest things: random conversations, unexpected laughs, stupid jokes, and moments that seem ordinary until you look back and realize how much they mean.",
      "You deserve happiness that feels real, people who appreciate you, opportunities that excite you, and days that give you reasons to smile.",
      "Whatever adventures life has waiting beyond these walls, I hope this new chapter brings you beautiful memories, courage for the difficult moments, and countless reasons to believe in yourself.",
      "Keep being the person you are. Keep dreaming. Keep laughing.",
      "And never forget that you deserve to be celebrated, not just today, but on all the ordinary days too."
    ],
    signoff: "Happy Birthday, Sowji.",
    sender: "From your best friend, with a little help from the Wings of Freedom."
  },

  climax: {
    stage1: "MISSION COMPLETE.",
    stage2: "THE WORLD HAS ANOTHER REASON TO CELEBRATE.",
    headline: "HAPPY BIRTHDAY, SOWJI.",
    blessing: "May your next chapter be filled with the courage to chase your dreams, the freedom to become whoever you want to be, and the kind of happiness that makes even ordinary days unforgettable.",
    epilogue: "YOUR STORY IS JUST BEGINNING.",
    finalWishLetter: {
      title: "A DEDICATION TO SOWJI",
      body: [
        "To the girl who brings strength, warmth, and quiet brilliance wherever she goes.",
        "Another year has turned, and with it comes a clean slate of unexplored adventures, higher skies, and countless new memories waiting to be forged.",
        "Take pride in how far you’ve come, in the kindness you give so freely, and in the person you are becoming with every sunrise.",
        "Whatever horizon you choose to pursue next, walk towards it with head held high and your wings unfurled.",
        "Shinzou wo Sasageyo — dedicate your heart to your dreams, Sowji. The world beyond the walls belongs to you."
      ],
      crestMessage: "Wings of Freedom // Scout Regiment Expedition 2024"
    }
  }
};
