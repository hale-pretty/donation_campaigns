import styled from "styled-components";

const CampaignSection = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 40px;
    padding: 0px 50px 50px;
    box-sizing: border-box;

    & > div {
        width: 100%;
    }
`;

const CampaignDetailsCtn = styled.div`
    height: 400px;
    background: lightyellow;
`;

const CommunityAndRelatedCampaigns = styled.div`
    display: flex;
    gap: 40px;
`;

const Community = styled.div`
    // background: skyblue;
    min-height: 400px;
    width: 65%;
    display: flex;
    gap: 5px;
    flex-direction: column;
`;

const CommunityHeader = styled.div`
    width: 100%;
    display: flex;
    height: 50px;
    align-items: center;
    border-bottom: 3px solid transparent;
    gap: 20px;

    & > div {
        height: 100%;
        border-bottom: 3px solid transparent;
        display: flex;
        align-items: center;
        padding: 0px 3px;
        cursor: pointer;
        gap: 5px;
    }

    & > div.selected, & > div.selected:hover {
        border-bottom: 3px solid black;
        cursor: auto;
    }

    & > div:hover {
        border-bottom: 3px solid #e0e0e0;
    }

    & > div > div {
        padding: 1px 5px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f5f5f5;
        font-weight: bolder;
        font-size: 13px;
    }
`;

const CommunityBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
`;

const RuleBox = styled.div`
    border: 1px solid #bdbdbd;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: grey;
`;

const MoreCampaignFromCurrentPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    background: lavender;
`;

const CommentCtn = styled.div`
    padding: 20px;
    display: flex;
    border: 1px solid #e0e0e0;
    box-shadow: 0px 3px 8px rgb(221, 221, 221);
    align-items: flex-start;
    gap: 10px;

    & > div:nth-child(1) {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
    }

    & > div:nth-child(1) > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & > h2 {
            margin: 0px;
            line-height: 16px;
        }

        & > p {
            margin: 0px;
            paddding: 0px;
            line-height: 13px;
            font-size: 13px;
            color: green;
        }
        
        & > pre {
            font-family: inherit;
            margin: 0px;
            font-weight: 400;
            font-size: 15px;
            white-space: pre-wrap;
        }
    }
`;

const Donation = styled.div`
    padding: 20px;
    display: flex;
    border: 1px solid lime;
    border-radius: 3px;
    box-shadow: 0px 2px 10px rgb(221, 221, 221);
    align-items: flex-start;
    gap: 10px;

    & > div:nth-child(1) {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
    }

    & > div:nth-child(1) > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    & > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & > h2 {
            margin: 0px;
            line-height: 16px;
        }

        & > h3 {
            margin: 0px;
            font-weight: 600;
        }

        & > p {
            margin: 0px;
            paddding: 0px;
            line-height: 13px;
            font-size: 13px;
            color: green;
        }
    }

    & > div:nth-child(3) {
        width: 200px;
        margin-left: auto;
        text-align: right;
        height: 100%;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-weight: 400;
        color: lime;
        text-shadow: -1px -1px #249b3b, 1px -1px #249b3b, -1px 1px #249b3b, 1px 1px #249b3b;
    }
`;

export {
    Donation,
    CommentCtn,
    RuleBox,
    MoreCampaignFromCurrentPage,
    CommunityAndRelatedCampaigns,
    CommunityHeader,
    Community,
    CampaignDetailsCtn,
    CampaignSection,
    CommunityBody
}
