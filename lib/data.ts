const dummyData = {
    categories: [
        { name: "Pain Relief", description: "Fever and pain reducers" },
        { name: "First Aid", description: "Bandages and antiseptics" },
        { name: "Vitamins", description: "Daily supplements & immunity" },
        { name: "Cough & Cold", description: "Syrups and lozenges for relief" },
        { name: "Personal Care", description: "Hygiene and skin protection" },
        { name: "Digestive Health", description: "Antacids and probiotic support" },
    ],

    customizations: [
        // Variants
        { name: "Strip of 10", price: 0, type: "size" },
        { name: "Strip of 15", price: 10, type: "size" },
        { name: "Bottle 100ml", price: 0, type: "size" },
        { name: "Bottle 200ml", price: 30, type: "size" },
        { name: "Pack of 20", price: 0, type: "size" },
        { name: "Box of 50", price: 45, type: "size" },
        { name: "Travel Size", price: -10, type: "size" },
        { name: "Family Pack", price: 50, type: "size" },

        // Add-ons
        { name: "Add Digital Thermometer", price: 150, type: "side" },
        { name: "Add Hand Sanitizer", price: 40, type: "side" },
        { name: "Add Cotton Swabs", price: 20, type: "side" },
        { name: "Add Pill Organizer", price: 80, type: "side" },
        { name: "Add Hot Water Bag", price: 120, type: "side" },
        { name: "Add Cough Drops", price: 15, type: "side" }
    ],

    menu: [
        {
            name: "Paracetamol 500mg",
            description: "Effective relief from mild to moderate pain and fever.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/003/750/large_2x/capsule-pill-isolated-on-a-transparent-background-free-png.png",
            price: 25.0,
            rating: 4.8,
            calories: 0,
            protein: 0,
            category_name: "Pain Relief",
            customizations: ["Strip of 10", "Strip of 15", "Box of 50", "Add Digital Thermometer"],
        },
        {
            name: "Vitamin C Gummies",
            description: "Chewable immunity boosters for daily health.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/058/395/576/large_2x/free-isolated-on-transparent-background-vibrant-orange-pills-healthy-supplement-health-and-wellness-free-png.png",
            price: 150.0,
            rating: 4.9,
            calories: 15,
            protein: 0,
            category_name: "Vitamins",
            customizations: [
                "Pack of 20",
                "Box of 50",
                "Family Pack",
                "Add Hand Sanitizer"
            ],
        },
        {
            name: "Honey Cough Syrup",
            description: "Fast soothing relief for dry and wet coughs.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/499/194/large_2x/a-small-glass-bottle-of-brown-liquid-with-a-black-cap-isolated-on-transparent-background-free-png.png",
            price: 85.0,
            rating: 4.5,
            calories: 40,
            protein: 0,
            category_name: "Cough & Cold",
            customizations: ["Bottle 100ml", "Bottle 200ml", "Add Cough Drops", "Add Digital Thermometer"],
        },
        {
            name: "Ibuprofen 400mg",
            description: "Strong relief from headaches, joint pain, and inflammation.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/003/755/large_2x/red-capsule-pill-isolated-on-a-transparent-background-free-png.png",
            price: 45.0,
            rating: 4.7,
            calories: 0,
            protein: 0,
            category_name: "Pain Relief",
            customizations: ["Strip of 10", "Box of 50", "Add Hot Water Bag"],
        },
        {
            name: "Waterproof Band-Aids",
            description: "Pack of 20 flexible, waterproof adhesive bandages.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/057/801/181/large_2x/plaster-or-bandaid-first-aid-medical-wound-care-adhesive-bandage-isolated-on-transparent-background-free-png.png",
            price: 35.0,
            rating: 4.6,
            calories: 0,
            protein: 0,
            category_name: "First Aid",
            customizations: ["Pack of 20", "Family Pack", "Add Cotton Swabs", "Add Hand Sanitizer"],
        },
        {
            name: "Antiseptic Healing Cream",
            description: "Prevents infection on minor cuts, scrapes, and burns.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/058/355/929/large_2x/moisturizing-cream-in-a-jar-isolated-on-a-transparent-background-free-png.png",
            price: 65.0,
            rating: 4.4,
            calories: 0,
            protein: 0,
            category_name: "First Aid",
            customizations: ["Travel Size", "Bottle 100ml", "Add Cotton Swabs"],
        },
        {
            name: "Daily Multivitamin Tablets",
            description: "Complete nutrition package with essential minerals A-Z.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/060/003/760/large_2x/blue-capsule-pill-isolated-on-a-transparent-background-free-png.png",
            price: 220.0,
            rating: 4.8,
            calories: 0,
            protein: 0,
            category_name: "Vitamins",
            customizations: [
                "Pack of 20",
                "Box of 50",
                "Add Pill Organizer"
            ],
        },
        {
            name: "Menthol Nasal Inhaler",
            description: "Clears up a blocked nose quickly.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/058/683/037/large_2x/a-small-bottle-of-skin-care-serum-or-medicine-on-a-transparent-background-free-png.png",
            price: 45.0,
            rating: 4.5,
            calories: 0,
            protein: 0,
            category_name: "Cough & Cold",
            customizations: ["Travel Size", "Add Cough Drops"],
        },
        {
            name: "Antacid Liquid Gel",
            description: "Fast-acting relief for heartburn and acid indigestion.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/056/158/978/large_2x/blank-medicine-bottle-blank-medical-pills-bottle-for-tablets-drugs-and-vitamins-empty-supplement-container-mock-up-object-free-png.png",
            price: 95.0,
            rating: 4.7,
            calories: 0,
            protein: 0,
            category_name: "Digestive Health",
            customizations: ["Bottle 100ml", "Bottle 200ml"],
        },
        {
            name: "Omega-3 Fish Oil",
            description: "Supports heart and brain health with pure fish oil extract.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/058/395/576/large_2x/free-isolated-on-transparent-background-vibrant-orange-pills-healthy-supplement-health-and-wellness-free-png.png",
            price: 299.0,
            rating: 4.9,
            calories: 5,
            protein: 1,
            category_name: "Vitamins",
            customizations: [
                "Pack of 20",
                "Box of 50",
                "Add Pill Organizer",
            ],
        },
        {
            name: "SPF 50 Sunscreen Lotion",
            description: "Broad-spectrum protection for face and body.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/056/327/930/large_2x/a-tube-of-yellow-sunscreen-isolated-on-transparent-background-free-png.png",
            price: 180.0,
            rating: 4.6,
            calories: 0,
            protein: 0,
            category_name: "Personal Care",
            customizations: ["Travel Size", "Bottle 100ml"],
        },
        {
            name: "Surgical Face Masks (N95)",
            description: "Pack of 5 high-filtration medical grade face masks.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/049/236/651/large_2x/blue-surgical-face-mask-disposable-isolated-on-transparent-background-protect-from-dust-and-virus-free-png.png",
            price: 150.0,
            rating: 4.8,
            calories: 0,
            protein: 0,
            category_name: "Personal Care",
            customizations: ["Travel Size", "Family Pack", "Add Hand Sanitizer"],
        },
        {
            name: "Digestive Enzyme Tablets",
            description: "Aids in breaking down complex foods and reduces bloating.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/058/683/097/large_2x/a-white-plastic-bottle-with-a-blank-label-on-a-transparent-background-free-png.png",
            price: 140.0,
            rating: 4.3,
            calories: 0,
            protein: 0,
            category_name: "Digestive Health",
            customizations: ["Strip of 10", "Strip of 15", "Add Pill Organizer"],
        },
        {
            name: "Cold Compress Spray",
            description: "Instant cooling spray for sprains and muscle injuries.",
            image_url:
                "https://static.vecteezy.com/system/resources/previews/056/808/327/large_2x/spray-bottle-isolate-no-background-generative-ai-free-png.png",
            price: 125.0,
            rating: 4.5,
            calories: 0,
            protein: 0,
            category_name: "First Aid",
            customizations: ["Bottle 100ml", "Add Hot Water Bag"],
        },
    ],
};

export default dummyData;