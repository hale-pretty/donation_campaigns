import styled from "styled-components";

const ProfileContainer = styled.div`
    position: relative;
    width: 100%;
    & a:link {
        text-decoration: inherit;
        color: inherit;
    }
    & a:visited {
        text-decoration: inherit;
        color: inherit;
    }
`;

const Navbar = styled.div`
    width: 100%;
    height: 50px;
    color: grey;
    background: black;
    display: flex;
    justify-content: center;
    & > div {
        width: 800px;
        display: flex;
        align-items: center;
        gap: 20px;
    }
    & > div > div {
        cursor: pointer;
    }
    & > div > div.selected {
        color: white;
    }
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    & > div {
        width: 800px;
        display: flex;
        flex-direction: column;
    }
    & > div > h1 {
        font-size: 50px;
        padding: 0px;
        margin-top: 50px;
    }
`;

const Tabs = styled.div`
    width: 100%;
    display: flex;
    gap: 20px;
    & > div {
        padding: 10px 5px;
        border-bottom: 3px solid white;
    }

    & > div.selected {
        border-bottom: 3px solid pink;
    }
`;

const CampaignsCtn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    & > div {
        display: flex;
        flex-direction: column;
        position: relative;
    }
`;

const CampaignsRow = styled.div`
    display: flex;
    height: 210px;
    border-top: 1px solid lightgray;
    padding: 15px 0px;
    box-sizing: border-box;
    gap: 15px;
    justify-content: flex-start;
    width: 100%;
`;

const ImageCtn = styled.div`
    width: 180px;
    height: 180px;
    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CampaignsInfo = styled.div`
    display: flex;
    flex-direction: column;
    & h1 {
        margin: 0px;
    }
    & h4 {
        color: grey;
        font-size: 13px;
    }
`;

const ActionButton = styled.div`
    min-width: 100px;
    padding: 0px;
    margin-left: auto;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const DropdownButton = styled.div`
    width: 100px;
    height: 40px;
    padding: 0px 15px;
    font-size: 15px;
    border: 1px solid lightgray;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    & > svg {
        width: 15px;
        height: 15px;
    }

    & > p {
        padding: 0px;
        margin: 0px;
    }
`;

const ActionDropdown = styled.div`
    position: absolute;
    width: 100%;
    top: 40px;
    left: 0px;
    cursor: pointer;
    display: none;

    &.selected {
        display: block;
    }

    & > div {
        height: 40px;
        font-size: 15px;
        line-height: 40px;
        box-sizing: border-box;
        border: 1px solid lightgray;
        padding: 0px 15px;
    }

    & > div:hover {
        background: grey;
        color: white;
    }
`;



const AddCampaignButton = styled.div`
    cursor: pointer;
    height: 40px;
    position: absolute;
    line-height: 40px;
    right: 0px;
    top: 20px;
    background: pink;
    text-align: right;
    padding: 0px 15px;
    border-radius: 10px;
`;

const CampaignEditBox = styled.div`
    width: 780px;
    max-height: calc(100vh - 50px);
    background: white;
    position: fixed;
    top: 25px;
    left: 0; 
    right: 0; 
    margin: auto;
    display: flex;
    flex-direction: column;
    z-index: 10;
    box-shadow: 0px 2px 8px rgb(211, 211, 211);
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }

    & input {
        padding: 5px 10px;
    }
    
    & input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    & textarea {
        resize: none;
        min-width: 100%;
        box-sizing: border-box;
        line-height: 13px;
        font-family: inherit;
    }
`;

const EditBoxHeader = styled.div`
    width: 100%;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    box-sizing: border-box;
    position: sticky;
    background: #f5f5f5;
    top: 0px;

    & > svg {
        width: 30px;
        height: 30px;
        color: grey;
        cursor: pointer;
    }

    & > svg:hover {
        color: black;
    }

    & > h1 {
        margin: 0px;
        font-size: 25px;
    }
`;

const EditBoxBody = styled.div`
    display: flex;
    padding: 10px 20px;
    box-sizing: border-box;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const EditBoxBodySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > h1 {
        margin: 0px;
        font-size: 18px;
    }

    & > h3 {
        margin: 0px;
        font-size: 11px;
        color: grey;
    }
`;

const ImageFilesCtn = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 150px;
    width: 100%;
    overflow: scroll;
    gap: 5px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ImageFile = styled.div`
    flex-shrink: 0;
    width: 150px;
    height: 150px;
    border: 2px solid cyan;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const PerkCtn = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 330px;
    width: 100%;
    overflow: scroll;
    gap: 20px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Perk = styled.div`
    flex-shrink: 0;
    width: 160px;
    height: 330px;
    border: 1px solid grey;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-bottom: 10px;

    & > div:nth-child(1) {
        width: 160px;
        height: 160px;
    }

    & > div:nth-child(1) > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    }

    &.saved > div:nth-child(1) > img {
        filter: brightness(50%);
    }

    & > textarea {
        resize: none;
        width: 100%;
        box-sizing: border-box;
        margin: 5px;
        line-height: 15px;
        min-height: 100px;
    }

    & > label {
        margin-top: 10px;
        margin-left: 12px;
        font-weight: bolder;
    }

    & > input {
        width: calc(100% - 20px);
        box-sizing: border-box;
        padding: 2px;
        margin: 0px 10px;
        border: none;
        border-bottom: 1px solid grey;
    }

    &.saved input:disabled {
        color: grey !important;
        background: #f5f5f5;
    }

    & > input:focus {
        outline: none;
    }

    & > input:focus {
        outline: none;
    }

    & > div:nth-last-child(1) {
        padding: 5px 7px;
        text-align: center;
        background: green;
        align-self: flex-end;
        margin-right: 10px;
        color: white;
        margin-top: auto;
        cursor: pointer;
    }

    &.saved > div:nth-last-child(1) {
        background: grey;
        color: #f5f5f5;
        cursor: default;
    }

    &.saved {
        color: grey !important;
        background: #f5f5f5;
    }
`;

const EmptyPerk = styled.div`
    flex-shrink: 0;
    width: 160px;
    height: 330px;
    border: 1px solid green;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 3px;
    justify-content: center;
    align-items: center;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 3px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    & > div > h3 {
        margin: 0;
    }

    & > div > svg {
        color: green;
        width: 60px;
        height: 60px;
    }
`;

export {
    EmptyPerk,
    Perk,
    PerkCtn,
    ImageFile,
    ImageFilesCtn,
    EditBoxBodySection,
    EditBoxBody,
    EditBoxHeader,
    CampaignEditBox,
    DropdownButton,
    AddCampaignButton,
    ActionDropdown,
    CampaignsInfo,
    ActionButton,
    ImageCtn,
    CampaignsRow,
    CampaignsCtn,
    Tabs,
    ProfileContainer,
    Navbar,
    Content
};
