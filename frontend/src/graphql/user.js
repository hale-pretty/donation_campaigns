export const getAuthUser = async (token) => {
    return await fetch("http://localhost:8800/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            query: `
                query GetUser {
            user {
                id
                my_campaigns {
                description
                get_donations {
                    donate_username
                    amount
                }
                }
                donate_history {
                campaign_id,
                donate_username,
                creator_checked
                }
                avatar
                profile_image
                lastname
                firstname
                country
                city
                about_me
                short_description
            }
        }
            `
        })
    })
    .then(res => res.json())
    .then(json => json.data.user)
    .catch(err => {console.log(err); return err});
}

export const getPublicUser = async (user_id) => {
    return await fetch("http://localhost:8800/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
                query GetUser($user_id: Int!) {
                    user_by_id(user_id: $user_id) {
                        my_campaigns {
                            id,
                            title,
                            get_images
                        }
                        avatar
                        profile_image
                        lastname
                        firstname
                        country
                        city
                        about_me
                        short_description
                        campaigns_counter
                        comments_counter
                        contributions_counter
                    }
                }
            `,
            variables: {
                user_id: parseInt(user_id)
            }
        })
    })
    .then(res => res.json())
    .then(json => json)
    .catch(err => {console.log(err); return err});
}
