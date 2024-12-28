export const waitingForNewMessages = async () => {
    return await fetch("http://localhost:8800/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({
            query: `
                query getCampaigns($user_id: Int!,) {
                    subscription WaitingForNewMessages {
                        messageAdded {
                        from,
                        body
                        }
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

