export interface Book {
  title: string;
  slug: string;
  amazonUrl: string;
  coverUrl: string;
  format: string;
  price: string;
  shortDescription: string;
  fullDescription: string[];
}

export const AUTHOR_URL =
  "https://www.amazon.com/stores/Kolton-Oxshire/author/B0GWLW6R5K";

export const books: Book[] = [
  {
    title: "30 Day Devotional",
    slug: "30-day-devotional",
    amazonUrl:
      "https://www.amazon.com/30-day-devotional-Kolton-Oxshire-ebook/dp/B0GTXB6V5T",
    coverUrl: "https://m.media-amazon.com/images/I/810WYqH+BeL._SY600_.jpg",
    format: "Kindle Edition",
    price: "$4.78 — Free with Kindle Unlimited",
    shortDescription:
      "A daily devotional to draw you closer to God. Transform your walk with God in just 30 days.",
    fullDescription: [
      "Each day offers a powerful NKJV Bible verse, a clear grace-filled meditation, a practical reflection question, and a simple prayer prompt.",
      "Covering essential topics like wisdom, faith, love, forgiveness, healing, peace, joy, humility, the Holy Spirit, God's sovereignty, and more — this devotional emphasizes receiving God's provision by faith instead of striving in your own strength.",
      "Whether you're new to faith or longing for fresh fire, these short, impactful readings will help you experience God's peace, strength, and presence every single day.",
      "Perfect for personal devotion, quiet time, or small groups. Start your 30-day journey today and watch your faith come alive!",
    ],
  },
  {
    title: "The Full Armor of God",
    slug: "the-full-armor-of-god",
    amazonUrl:
      "https://www.amazon.com/full-armor-God-Kolton-Oxshire-ebook/dp/B0DZTZCSBC",
    coverUrl: "https://m.media-amazon.com/images/I/7181sl0YcYL._SY600_.jpg",
    format: "Kindle Edition",
    price: "$16.99",
    shortDescription:
      "A practical study to help you understand and walk in the full armor of God.",
    fullDescription: [
      "This book is written to help you understand the full armor of God — equipping believers to stand firm against the schemes of the enemy.",
      "Built around Ephesians 6, it walks through each piece of the armor with Scripture, application, and prayer.",
    ],
  },
];
