import images from "~/images/base64";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJqdXBpdGVyMTIwMyIsImlhdCI6MTczNTI5NDQwMSwiZXhwIjoyMzQwMDk0NDAxfQ.3xAJ97WF9wH_fhAKAStSS52jmkgpVK8Yf7TuyU521A4";

const comments = {
    1: {
        user_id: 3,
        comment: "Do not stop thinking of life as an adventure. You have no security unless you can live bravely, excitingly, imaginatively; unless you can choose a challenge instead of competence.",
        campaign_id: 1,
        createdAt: new Date("2024-10-22")
    },
    2: {
        user_id: 4,
        comment: "Perfection is not attainable. But if we chase perfection we can catch excellence.",
        campaign_id: 1,
        createdAt: new Date("2024-10-25")
    }
};

const campaigns = {
    1: {
        id: 1,
        title: "Real change, enduring change, happens one step at a time",
        description: "All dreams are within reach. All you have to do is keep moving towards them.",
        goal_amount: 50000,
        raised_amount: 14100,
        start_date: new Date("2024-10-31"),
        end_date: new Date("2024-12-31"),
        status: "INDEMAND",
        user_id: 9,
        createdAt: new Date("2024-10-15"),
        updatedAt: new Date("2024-10-15"),
        get_images: [images.stove3, images.laptop],
        get_perks: [],
        get_donations: [],
        get_comments: [comments[1]],
        comments_counter: 2,
    },
    2: {
        id: 1,
        title: "Real change, enduring change, happens one step at a time",
        description: "All dreams are within reach. All you have to do is keep moving towards them.",
        goal_amount: 50000,
        raised_amount: 14100,
        start_date: new Date("2024-10-31"),
        end_date: new Date("2024-12-31"),
        status: "INDEMAND",
        user_id: 5,
        createdAt: new Date("2024-10-15"),
        updatedAt: new Date("2024-10-15"),
        get_images: [images.stove3, images.laptop],
        get_perks: [],
        get_donations: [],
        get_comments: [comments[1], comments[2]],
        comments_counter: 2,
    }
};

const publicUser = {
    5: {
    city: "Masachusset",
    country: "USA",
    id: 5,
    username: "jupiter1203",
    avatar: images.stove3,
    profile_image: images.cat_avatar,
    my_campaigns: [campaigns[2]],
    lastname: "Jefferson",
    firstname: "Thomas",
    about_me: "All our dreams can come true, if we have the courage to pursue them",
    short_description: "",
    contributions_counter: 0,
    campaigns_counter: 0,
    comments_counter: 0,
},
1: {
    city: "Long Island",
    country: "USA",
    id: 1,
    username: "shortgiraffe98",
    avatar: images.stove3,
    profile_image: images.apple_campus,
    my_campaigns: [campaigns[1]],
    lastname: "Lincoln",
    firstname: "Ambraham",
    about_me: "If you risk nothing, then you risk everything.",
    short_description: "",
    contributions_counter: 5,
    campaigns_counter: 3,
    comments_counter: 10,
},
3: {
    city: "Long Island",
    country: "USA",
    id: 1,
    username: "shortgiraffe98",
    avatar: images.stove3,
    profile_image: images.apple_campus,
    my_campaigns: [campaigns[1]],
    lastname: "Allen",
    firstname: "Lily",
    about_me: "If you risk nothing, then you risk everything.",
    short_description: "",
    contributions_counter: 5,
    campaigns_counter: 3,
    comments_counter: 10,
},
4: {
    city: "Long Island",
    country: "USA",
    id: 1,
    username: "shortgiraffe98",
    avatar: images.stove3,
    profile_image: images.apple_campus,
    my_campaigns: [campaigns[1]],
    lastname: "Cox",
    firstname: "Courtney",
    about_me: "If you risk nothing, then you risk everything.",
    short_description: "",
    contributions_counter: 5,
    campaigns_counter: 3,
    comments_counter: 10,
},
9: {
    city: "Manhattan",
    country: "USA",
    id: 1,
    username: "jupiter12035",
    avatar: images.austria,
    profile_image: images.apple_campus,
    my_campaigns: [campaigns[1]],
    lastname: "Geller",
    firstname: "Ross",
    about_me: "If you risk nothing, then you risk everything.",
    short_description: "",
    contributions_counter: 5,
    campaigns_counter: 3,
    comments_counter: 10,
}
}

const user = {
    id: 9,
    username: "jupiter12035",
    email: "jupiter12035@gmail.com",
    donate_history: [],
    avatar: images.austria,
    profile_image: images.apple_campus,
    my_campaigns: [campaigns[1]],
    lastname: "Geller",
    firstname: "Ross",
    country: "USA",
    city: "Manhattan",
    about_me: "To bring about change, you must not be afraid to take the first step. We will fail when we fail to try",
    short_description: ""
}

const fake_data = {
    comments,
    campaigns,
    publicUser,
    user,
    token
};

export default fake_data;
