/** Copy and pictures already on the home page. Nothing here is invented. */

export const ministry = {
  name: 'Kolton Oxshire',
  ministryName: 'Kolton Oxshire Ministries',
  email: 'speakinggodsgraceandpower@gmail.com',
  quote: '"That\'s what I do \u2014 I talk about Jesus."',
  description:
    'Boldly proclaiming the Gospel with the strength of a lion and the heart of a servant.',
  banner: 'Ministry of the Gospel',
  gospel: 'Go into all the world and preach the gospel to all creation.',
  harvest: 'The harvest is plentiful, but the workers are few.',
  aboutHeading: 'Called to Boldly Proclaim',
  about: [
    'Kolton Oxshire is a passionate evangelist and minister of the Gospel, driven by an unwavering calling to share the love and power of Jesus Christ. With a heart on fire for revival, Kolton reaches people across the nation through bold, uncompromising preaching and genuine compassion.',
    'Rooted in the Word of God and fueled by the Holy Spirit, his ministry stands at the intersection of faith and patriotism \u2014 believing that true national strength comes from returning to the foundations of Scripture.',
    'Whether through social media, live events, or one-on-one conversations, Kolton\'s mission is simple: talk about Jesus and watch God move.',
  ],
  preachingHeading: 'Preaching Highlights',
  preachingLede: 'Watch Kolton boldly proclaiming the Gospel. Subscribe on YouTube for more.',
  videos: [
    { title: 'Preaching Short #1', embedId: 'yQ2ISH7yqss' },
    { title: 'Preaching Short #2', embedId: '23gsPRcLwqE' },
  ],
  teachingHeading: 'Teaching & Ministry',
  teachingLede:
    'Equipping the saints with the uncompromised truth of Scripture through every platform available.',
  teaching: [
    {
      title: 'Video Teachings',
      description:
        'Weekly video messages breaking down Scripture with boldness and clarity. Follow along as Kolton dives deep into the Word.',
    },
    {
      title: 'Live Events',
      description:
        'Join Kolton at live speaking engagements and revival meetings across the country. Experience the power of God in person.',
    },
    {
      title: 'Bible Studies',
      description:
        'In-depth Bible study series designed to equip believers and ignite a passion for the truth of the Gospel.',
    },
  ],
  givingHeading: 'Support the Mission',
  givingLede:
    'Your generous giving fuels the spread of the Gospel. Every dollar sown is a seed planted for the Kingdom.',
  giving: [
    {
      title: 'Gospel Outreach',
      description: 'Funding evangelism efforts to reach the lost across the nation and beyond.',
    },
    {
      title: 'Community Impact',
      description: 'Supporting local communities with practical love and the message of Christ.',
    },
    {
      title: 'Ministry Growth',
      description:
        'Investing in content creation, events, and resources to expand the reach of the Gospel.',
    },
  ],
  contactHeading: 'Get in Touch',
  contactSubtext:
    'Have questions, prayer requests, or want to invite Kolton to speak? Reach out \u2014 we\'d love to hear from you.',
  portrait: '/assets/kolton-portrait.jpg',
  portraitAlt: 'Kolton Oxshire portrait',
  lion: '/assets/lion-eagle-flag.jpg',
  lionAlt: 'Lion of Judah, bald eagle and American flag',
}

export function navFor(home: string) {
  return [
    { href: home, label: 'Home' },
    { href: `${home}#about`, label: 'About' },
    { href: `${home}#preaching`, label: 'Preaching' },
    { href: '/what-we-believe', label: 'What we believe' },
    { href: '/i-just-got-saved', label: 'I just got saved' },
    { href: '/book-to-speak', label: 'Book Kolton' },
    { href: '/partner', label: 'Partner' },
    { href: `${home}#contact`, label: 'Contact' },
  ]
}
