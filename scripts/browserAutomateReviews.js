/**
 * Puppeteer / Browser Automation Script for Submitting 15 Customer Reviews
 *
 * Requirements:
 *   npm install puppeteer
 *
 * Usage:
 *   node scripts/browserAutomateReviews.js [TARGET_URL]
 *   Example: node scripts/browserAutomateReviews.js http://localhost:5173/reviews#leave-review
 */

const puppeteer = require('puppeteer');

const reviewsData = [
  {
    "your_name": "Emma Davis",
    "country_city": "United Kingdom",
    "trip_destination": "Delhi, Agra, Jaipur",
    "ratings": {
      "cleanliness": 4,
      "accommodation": 5,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "JayaShakthi Tours handled everything perfectly for our first time in India. Their visa assistance made the initial process stress-free, and the custom-tailored package let us see exactly what we wanted. The accommodations were beautiful, and our tempo traveler was exceptionally comfortable for the long drives."
  },
  {
    "your_name": "Alejandro Silva",
    "country_city": "Spain",
    "trip_destination": "Pan-India Tour",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 4,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "An unforgettable experience! We wanted a pan-India tour, and they designed a flawless itinerary covering all over India. Our English-speaking guide was incredibly knowledgeable, and the private car provided was always clean and punctual. Highly recommend their services."
  },
  {
    "your_name": "Yuki Sato",
    "country_city": "Japan",
    "trip_destination": "Varanasi and Khajuraho",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 5,
      "tour_guiding": 5,
      "travel_transportation": 4,
      "overall_experience": 5
    },
    "your_experience": "Very professional agency. They helped with my visa application and organized a wonderful 14-day trip. The hotel choices were excellent, combining modern comfort with traditional Indian heritage. We felt safe and well-cared for the entire time."
  },
  {
    "your_name": "Michael & Sarah Thompson",
    "country_city": "USA",
    "trip_destination": "Rajasthan and Kerala Backwaters",
    "ratings": {
      "cleanliness": 4,
      "accommodation": 5,
      "tour_guiding": 4,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "We traveled as a group of 12, so they arranged a luxury AC bus for us. The vehicle was top-notch, and the driver navigated the traffic with ease. From Rajasthan to Kerala, JayaShakthi made sure our customized package went off without a hitch."
  },
  {
    "your_name": "Chloe Martin",
    "country_city": "France",
    "trip_destination": "Hampi and Goa",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 5,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "I was amazed by the level of detail in their tailor-made packages. They accommodated all our specific dietary requirements at the hotels and provided a brilliant local guide who brought the history of the monuments to life. Fantastic overall travel experience."
  },
  {
    "your_name": "Lars Jensen",
    "country_city": "Denmark",
    "trip_destination": "The Golden Triangle",
    "ratings": {
      "cleanliness": 4,
      "accommodation": 4,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "Booking with JayaShakthi was the best decision for our India trip. The visa assistance team was prompt, and the tempo traveler they arranged was spacious enough for our family of six. The accommodations exceeded our expectations."
  },
  {
    "your_name": "Isabella Rossi",
    "country_city": "Italy",
    "trip_destination": "Madurai and Alleppey",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 5,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "They truly understand how to cater to foreign tourists. We wanted to explore off-the-beaten-path locations in South India, and their custom package was perfect. The private car was comfortable, and our driver felt like a friend by the end of the trip."
  },
  {
    "your_name": "Markus Weber",
    "country_city": "Germany",
    "trip_destination": "Ladakh and the Himalayas",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 4,
      "tour_guiding": 5,
      "travel_transportation": 4,
      "overall_experience": 5
    },
    "your_experience": "Excellent organization from start to finish. We did a 3-week all-India tour. The domestic logistics, including airport transfers and local guides in every city, were handled flawlessly. The hotels selected were safe, clean, and centrally located."
  },
  {
    "your_name": "Liam O'Connor",
    "country_city": "Australia",
    "trip_destination": "Jodhpur and Jaisalmer",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 5,
      "tour_guiding": 4,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "If you want a hassle-free trip to India, use this agency. Their visa guidance saved us so much time. We opted for a tailored package through the Golden Triangle, and the dedicated car and driver made the journey incredibly smooth."
  },
  {
    "your_name": "Sofia Kowalski",
    "country_city": "Poland",
    "trip_destination": "Rishikesh and Haridwar",
    "ratings": {
      "cleanliness": 4,
      "accommodation": 5,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "A magical trip curated by a fantastic team. They customized our itinerary multiple times until it was perfect. The guide was wonderful, the tempo traveler was very comfortable, and the heritage accommodations were a highlight."
  },
  {
    "your_name": "Rohan Mehta",
    "country_city": "Mumbai, India",
    "trip_destination": "Sandakphu and Darjeeling",
    "ratings": {
      "cleanliness": 4,
      "accommodation": 4,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 4
    },
    "your_experience": "We booked a customized family package for our trip to the Northeast. The entire journey was seamless. The tempo traveler provided was in excellent condition, and the driver was highly experienced with the hilly terrain. Great accommodations as well!"
  },
  {
    "your_name": "Priya Sharma",
    "country_city": "Delhi, India",
    "trip_destination": "South India Temple Tour",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 5,
      "tour_guiding": 5,
      "travel_transportation": 4,
      "overall_experience": 5
    },
    "your_experience": "JayaShakthi Tours organized a fantastic 10-day trip to South India for us. They tailored the itinerary to include exactly what we wanted to visit. The local guides were fantastic, and the overall travel experience was completely stress-free."
  },
  {
    "your_name": "Karthik Rajan",
    "country_city": "Chennai, India",
    "trip_destination": "Kodaikanal and Munnar",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 4,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "Enga family trip ku JayaShakthi Tours thaan choose pannaom. Custom package panni kuduthanga, tempo traveler romba spacious and neat ah irundhuchu. Driver and guide renduperum romba helpful. Highly recommended!"
  },
  {
    "your_name": "Vignesh W",
    "country_city": "Bengaluru, India",
    "trip_destination": "Delhi, Agra, Jaipur",
    "ratings": {
      "cleanliness": 4,
      "accommodation": 5,
      "tour_guiding": 4,
      "travel_transportation": 5,
      "overall_experience": 4
    },
    "your_experience": "Foreign clients ku mattum illa, namma local trips kum ivanga best thaan. Accommodations ellam top-notch, price um reasonable. Innova car arrange panni kuduthanga, overall journey romba smooth ah pochu."
  },
  {
    "your_name": "Divya S",
    "country_city": "Coimbatore, India",
    "trip_destination": "Shimla and Manali",
    "ratings": {
      "cleanliness": 5,
      "accommodation": 5,
      "tour_guiding": 5,
      "travel_transportation": 5,
      "overall_experience": 5
    },
    "your_experience": "Naanga North India tour ponom. Language problem varumnu bayandom, but the guide they arranged was excellent. Everything was perfectly customized to our needs. Romba satisfied with their service!"
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function automateReviews() {
  const targetUrl = process.argv[2] || 'http://localhost:5173/reviews#leave-review';
  console.log(`\n======================================================`);
  console.log(`Starting Puppeteer Review Form Automation`);
  console.log(`Target URL: ${targetUrl}`);
  console.log(`Total reviews to submit: ${reviewsData.length}`);
  console.log(`======================================================\n`);

  const browser = await puppeteer.launch({
    headless: false, // Set to true for silent background execution
    defaultViewport: { width: 1280, height: 900 },
  });

  const page = await browser.newPage();
  await page.goto(targetUrl, { waitUntil: 'networkidle2' });

  for (let i = 0; i < reviewsData.length; i++) {
    const item = reviewsData[i];
    console.log(`[${i + 1}/${reviewsData.length}] Processing review for: ${item.your_name} (${item.country_city})...`);

    // Ensure the review form container is visible
    await page.waitForSelector('#leave-review');

    // 1. Fill "Your Name *"
    const nameInput = await page.waitForSelector('input[placeholder*="Arun Kumar"]');
    await nameInput.click({ clickCount: 3 });
    await nameInput.press('Backspace');
    await nameInput.type(item.your_name, { delay: 20 });

    // 2. Fill "Country / City *"
    const locationInput = await page.waitForSelector('input[placeholder*="Singapore / London"]');
    await locationInput.click({ clickCount: 3 });
    await locationInput.press('Backspace');
    await locationInput.type(item.country_city, { delay: 20 });

    // 3. Fill "Trip / Destination (optional)"
    if (item.trip_destination) {
      const destinationInput = await page.waitForSelector('input[placeholder*="South India Temple Trail"]');
      await destinationInput.click({ clickCount: 3 });
      await destinationInput.press('Backspace');
      await destinationInput.type(item.trip_destination, { delay: 20 });
    }

    // 4. Click 5-star rating SVG buttons for each category
    const ratingMappings = [
      { label: 'Cleanliness', rating: item.ratings.cleanliness },
      { label: 'Accommodation', rating: item.ratings.accommodation },
      { label: 'Tour Guiding', rating: item.ratings.tour_guiding },
      { label: 'Travel & Transportation', rating: item.ratings.travel_transportation },
      { label: 'Overall Experience', rating: item.ratings.overall_experience },
    ];

    for (const mapping of ratingMappings) {
      const starCount = Math.min(5, Math.max(1, mapping.rating));
      const starButtonSelector = `button[aria-label="${mapping.label}: Rate ${starCount} star${starCount > 1 ? 's' : ''}"]`;
      
      const starButton = await page.$(starButtonSelector);
      if (starButton) {
        await starButton.click();
        await sleep(50);
      } else {
        console.warn(`Could not find star button for: ${mapping.label} (${starCount} stars)`);
      }
    }

    // 5. Fill "Your Experience *"
    const textarea = await page.waitForSelector('textarea[placeholder*="Tell other travelers"]');
    await textarea.click({ clickCount: 3 });
    await textarea.press('Backspace');
    await textarea.type(item.your_experience, { delay: 10 });

    // 6. Click Submit Button
    const submitBtn = await page.waitForSelector('button[type="submit"]');
    await submitBtn.click();
    console.log(`Submitted review for ${item.your_name}, awaiting confirmation...`);

    // 7. Wait for success message
    await page.waitForXPath("//h4[contains(text(), 'Thank you for sharing your travel experience')]", { timeout: 10000 });
    console.log(`✅ Confirmation received for ${item.your_name}!`);

    // 8. Click "Submit Another Review" button to reset the form for next iteration
    if (i < reviewsData.length - 1) {
      const [resetBtn] = await page.$x("//button[contains(., 'Submit Another Review')]");
      if (resetBtn) {
        await resetBtn.click();
        await sleep(800); // Brief pause before next form submission
      }
    }
  }

  console.log(`\n🎉 All ${reviewsData.length} reviews submitted successfully!`);
  await sleep(2000);
  await browser.close();
}

automateReviews().catch((err) => {
  console.error('Automation error:', err);
  process.exit(1);
});
