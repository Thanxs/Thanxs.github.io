"use strict";

const categories = [
    {
      name: 'Laptops',
      key: 'laptops',
    },
    {
      name: 'Phones',
      key: 'phones',
    },
    {
      name: 'Tablets',
      key: 'tablets'
    },
    {
      name: 'Guns',
      key: 'guns',
    },
  ];
  
  const productsData = {
    laptops: [
      {
        id: 1,
        name: 'Macbook Pro',
        price: 2000,
        description: "MacBook Pro has a high-resolution, LED-backlit glossy widescreen display. The maximum native resolution on the MacBook is 1,440 by 900 pixels. However, Apple provides a Retina Display option for the MacBook Pro that boosts resolution to 2,880 by 1,800 pixels."
      },
      {
        id: 2,
        name: 'Dell XPS 13',
        price: 1500,
        description: "The Dell XPS 13 serves up a new color, a powerful Intel Whiskey Lake processor, a 4K display (and ditches the ridiculous 'nosecam') - all in a slim, lightweight chassis."
      },
    ],
    phones: [
      {
        id: 3,
        name: 'iPhone 11 Pro',
        price: 1400,
        description: "The iPhone 11 Pro is Apple's most powerful phone that come in a one-hand-friendly size. It has a triple-lens camera to capture best-in-class photos and video from a variety of perspectives, a new night mode to enhance low-light photography and extra battery life prowess"
      },
      {
        id: 4,
        name: 'Samsung S10',
        price: 1000,
        description: "The Galaxy S10 is a fitting 10th anniversary phone for Samsung and its storied S series. It delivers on change with a novel-looking Infinity-O screen so large it displaces the front camera, and a triple-lens rear camera that takes ultra-wide photos."
      },
      {
        id: 5,
        name: 'Nokia 3310',
        price: 50,
        description: "The Nokia 3310 is a GSM mobile phone announced on 1 September 2000, and released in the fourth quarter of the year, replacing the popular Nokia 3210. It sold very well, being one of the most successful phones with 126 million units sold worldwide, and being one of Nokia's most iconic devices."
      },
    ],
    tablets: [
      {
        id: 6,
        name: 'iPad Pro',
        price: 900,
        description: "The Apple iPad Pro is a 12.9-inch touch screen tablet PC that is larger and offers higher resolution than Apple's other iPad models. The iPad Pro was scheduled to debut in November 2015, running the iOS 9 operating system. Apple unveiled the device at a September 2015 event in San Francisco."
      },
      {
        id: 7,
        name: 'Samsung Tab 4',
        price: 1000,
        description: "The tablet comes with a 7.00-inch display with a resolution of 1280x800 pixels. Samsung Galaxy Tab4 7.0 3G is powered by a 1.2GHz quad-core processor. It comes with 1.5GB of RAM. As far as the cameras are concerned, the Samsung Galaxy Tab4 7.0 3G on the rear packs 3-megapixel camera."
      }
    ],
    guns: [
      {
        id: 8,
        name: 'M4',
        price: 2000,
        description: "The M4/M4A1 5.56mm Carbine is a lightweight, gas operated, air cooled, magazine fed, selective rate, shoulder fired weapon with a collapsible stock. It is now the standard issue firearm for most units in the U.S. military."
      },
      {
        id: 9,
        name: 'AK47',
        price: 1000,
        description:  "AK-47, also called Kalashnikov Model 1947, Soviet assault rifle, possibly the most widely used shoulder weapon in the world. The initials AK represent Avtomat Kalashnikova, Russian for 'automatic Kalashnikov,' for its designer, Mikhail Timofeyevich Kalashnikov, who designed the accepted version of the weapon in 1947."
      }
    ],
  };