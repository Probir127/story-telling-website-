/**
 * Centralized Story Data Configuration
 * Defines narrative structure, image sequences, and transition timing
 */

export const storyScenes = [
    // Scene 0: Intro
    {
        id: 0,
        type: 'sequence',
        narrative: "This is my sister. My first bully. My favorite victim.",
        images: [
            "/media/IMG_0939.jpg",
            "/media/IMG_0937.jpg",
            "/media/IMG_0933.jpg"
        ],
        transitionPoints: [0, 40, 75], // % of text progress when images change
        characterType: 'intro'
    },

    // Scene 1: Growing Up
    {
        id: 1,
        type: 'sequence',
        narrative: "We grew up together. I was basically her unpaid intern in chaos.",
        images: [
            "/media/IMG_0018.jpg",
            "/media/IMG_0352.jpg",
            "/media/IMG_0936.jpg"
        ],
        transitionPoints: [0, 50, 80],
        characterType: 'together'
    },

    // Scene 2: Anger
    {
        id: 2,
        type: 'sequence',
        narrative: "Angriest person in the house. Conveniently, I lived closest.",
        images: [
            "/media/IMG_0019.jpg",
            "/media/IMG_0932.jpg"
        ],
        transitionPoints: [0, 55],
        characterType: 'anger'
    },

    // Scene 3: Roasting & Beating
    {
        id: 3,
        type: 'sequence',
        narrative: "I roasted her. She responded... physically expressive when annoyed.",
        images: [
            "/media/IMG_0932.jpg",
            "/media/IMG_0934.jpg",
            "/media/IMG_0940.jpg"
        ],
        transitionPoints: [0, 35, 70],
        characterType: 'roasting'
    },

    // Scene 4: Milk Tea
    {
        id: 4,
        type: 'sequence',
        narrative: "Milk tea was banned by Mamoni. I broke the law. Blamed her. She negotiated.",
        images: [
            "/media/milk_tea.jpg",
            "/media/IMG_0018.jpg"
        ],
        transitionPoints: [0, 60],
        characterType: 'together'
    },

    // Scene 5: Fast Food
    {
        id: 5,
        type: 'sequence',
        narrative: "Ordering food? I used her name. She took the shouting, so I didn't have to.",
        images: [
            "/media/fastfood.jpg",
            "/media/IMG_0936.jpg"
        ],
        transitionPoints: [0, 50],
        characterType: 'poke'
    },

    // Scene 6: Facebook
    {
        id: 6,
        type: 'sequence',
        narrative: "She made my first Facebook (Class 5). Only she knew I was 'cool' online.",
        images: [
            "/media/IMG_0929.jpg",
            "/media/IMG_0933.jpg",
            "/media/IMG_0941.jpg"
        ],
        transitionPoints: [0, 45, 75],
        characterType: 'intro'
    },

    // Scene 7: Flirting
    {
        id: 7,
        type: 'sequence',
        narrative: "I made her flirt with girls for me on chat. Peak wing-sister behavior. Still no girlfriend. Tragic.",
        images: [
            "/media/IMG_0930.jpg",
            "/media/IMG_0937.jpg",
            "/media/IMG_0818.jpg"
        ],
        transitionPoints: [0, 40, 75],
        characterType: 'eyeroll'
    },

    // Scene 8: Talker
    {
        id: 8,
        type: 'sequence',
        narrative: "She talked for both of us. My only role: look innocent and nod.",
        images: [
            "/media/IMG_0931.jpg",
            "/media/IMG_0940.jpg"
        ],
        transitionPoints: [0, 55],
        characterType: 'talking'
    },

    // Scene 9: Brother-in-Law
    {
        id: 9,
        type: 'sequence',
        narrative: "Enter: the brother-in-law. A brave man. Handles her moods with honor. Salute. 🫡",
        images: [
            "/media/2036cedb-4de6-4b3a-b00d-748f3be645f1.jpg",
            "/media/17a2104c-7ae7-433e-9895-2cbdbb9a2e96.jpg",
            "/media/IMG_5759.jpg"
        ],
        transitionPoints: [0, 45, 75],
        characterType: 'brotherInLaw'
    },

    // Scene 10: Wedding
    {
        id: 10,
        type: 'sequence',
        narrative: "She got married. I'm finally free! No refunds. No exchanges. His turn now.",
        images: [
            "/media/17a2104c-7ae7-433e-9895-2cbdbb9a2e96.jpg",
            "/media/IMG_5759.jpg"
        ],
        transitionPoints: [0, 50],
        characterType: 'together',
        specialText: true // Uses custom wedding text layout
    },

    // Scene 11: New Year
    {
        id: 11,
        type: 'sequence',
        narrative: "Tried to act normal on New Year's. Failed immediately. Permanent weirdos.",
        images: [
            "/media/IMG_5759.jpg",
            "/media/IMG_0937.jpg",
            "/media/IMG_1449.jpg"
        ],
        transitionPoints: [0, 50, 80],
        characterType: 'together'
    },

    // Scene 12: Distance
    {
        id: 12,
        type: 'sequence',
        narrative: "She moved out. The house got quiet. Too quiet.",
        images: [
            "/media/IMG_0935.jpg",
            "/media/ending_lake.jpg"
        ],
        transitionPoints: [0, 60],
        characterType: 'distance',
        hasProgress: true // Uses walking away animation
    },

    // Scene 13: Ending
    {
        id: 13,
        type: 'sequence',
        narrative: "Still annoying. Still impossible to replace. Still my sister. ❤️",
        images: [
            "/media/ending_lake.jpg",
            "/media/IMG_0939.jpg"
        ],
        transitionPoints: [0, 70],
        characterType: 'ghost'
    },

    // Scene 14: Collage
    {
        id: 14,
        type: 'collage',
        narrative: "And a million other memories.",
        images: [
            "/media/20b2c799-537a-428b-b6d2-0dbbe98bf292.jpg",
            "/media/8c7c44f7-168d-4ed1-99ff-46654299caab.jpg",
            "/media/IMG_0352.jpg",
            "/media/IMG_0933.jpg",
            "/media/IMG_0934.jpg",
            "/media/IMG_0937.jpg",
            "/media/IMG_0940.jpg",
            "/media/IMG_0941.jpg",
            "/media/IMG_1449.jpg",
            "/media/eff02042-9f62-4e94-82ad-f8b3c87441d1.jpg"
        ],
        characterType: 'collage'
    }
];

export const TOTAL_SCENES = storyScenes.length;

// Scene mood color themes
export const sceneMoods = [
    "mood-cool",      // 0: Intro
    "mood-vintage",   // 1: Growing Up
    "mood-anger",     // 2: Anger
    "mood-anger",     // 3: Roasting
    "mood-warm",      // 4: Milk Tea
    "mood-warm",      // 5: Fast Food
    "mood-vintage",   // 6: Facebook
    "mood-cool",      // 7: Flirting
    "mood-vintage",   // 8: Talker
    "mood-cool",      // 9: Brother-in-Law
    "mood-warm",      // 10: Wedding
    "mood-vintage",   // 11: New Year
    "mood-cool",      // 12: Distance
    "mood-warm",      // 13: Ending
    "mood-vintage"    // 14: Collage
];

// Scene duration configuration (milliseconds)
export const SCENE_DURATIONS = {
    0: 8000, 1: 8500, 2: 8000, 3: 8500, 4: 9000,
    5: 9000, 6: 10000, 7: 10500, 8: 8000, 9: 9000,
    10: 9500, 11: 10000, 12: 9000, 13: 9000, 14: 12000
};
