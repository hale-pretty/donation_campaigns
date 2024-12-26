export const getAllCampaigns = async (user_id, token) => {
    return await fetch("http://localhost:8800/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            query: `
                query getCampaigns($user_id: Int!,) {
                    campaigns(user_id: $user_id) {
                        id,
                        title,
                        get_images
                    }
                }
            `,
            variables: {
                "user_id": parseInt(user_id)
            }
        })
    })
    .then(res => res.json())
    .then(json => json.data.campaigns)
    .catch(err => {console.log(err); return err});
}

export const getOneCampaign = async (campaign_id, token) => {
    return await fetch("http://localhost:8800/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            query: `
                query getCampaign($campaign_id: Int!,) {
                    campaign(campaign_id: $campaign_id) {
                        title,
                        get_images,
                        get_perks {
                            amount,
                            base64_image,
                            title
                        }
                    }
                }
            `,
            variables: {
                "campaign_id": parseInt(campaign_id)
            }
        })
    })
    .then(res => res.json())
    .then(json => json.data.campaign)
    .catch(err => {console.log(err); return err});
}

export const addNewCampaign = async (data, token) => {
    return await fetch("http://localhost:8800/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            query: `
                mutation addCampaign($input: CampaignInput!, $images: [String], $perks: [PerkInput]) {
                    create_new_campaign(input: $input, images: $images, perks: $perks) {
                        title,
                        description
                    }
                }
            `,
            variables: {
                input: data.input,
                images: data.images,
                perks: data.perks
            }
        })
    })
    .then(res => res.json())
    .then(json => json)
    .catch(err => {console.log(err); return err});
}
