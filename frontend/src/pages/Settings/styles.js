import styled from "styled-components";

const EditContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    gap: 15px;
`;

const EditSection = styled.div`
    background: #f5f5f5;
    padding: 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    & > h1 {
        margin: 0px;
        font-size: 25px;
        font-weight: 600;
        border-bottom: 1px solid #bdbdbd;
        padding-bottom: 5px;
    }

    & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    & > div > label {
        margin-top: 10px;
        margin-bottom: 5px;
    }

    & > div > input {
        width: 400px;
        padding: 8px;
        box-sizing: border-box;
        font-family: inherit;
    }

    & > div > textarea {
        padding: 8px;
        background: white;
        resize: vertical;
        width: 100%;
        font-family: inherit;
        box-sizing: border-box;
    }

    & > div > textarea:focus, & > div > input:focus {
        outline: none;
    }

    & > div > div:nth-child(2) {
        width: 200px;
    }

    & > div > div:nth-child(1) {
        flex-grow: 1;
    }
`;

const ImageCtn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid green;
    height: 200px;
    margin-top: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & > h3 {
        margin: 5px;
    }
    & > svg {
        width: 50px;
        height: 50px;
        color: green;
    }
    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export {
    ImageCtn,
    EditSection,
    EditContainer
}
