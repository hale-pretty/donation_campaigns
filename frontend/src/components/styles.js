import styled, { keyframes } from "styled-components";

const HeaderCtn = styled.header`
    width: 100%;
    background: white;
    display: flex;
    padding: 0px 100px;
    box-sizing: border-box;
    height: 60px;
    align-items: center;
`;

const AccountButtonCtn = styled.div`
    position: relative;
    display: flex;
    max-width: 200px;
    
    margin-left: auto;
    gap: 10px;
    height: 100%;
    justify-content: flex-end;
`;

const AccountButton = styled.div`
    min-width: 170px;
    position: absolute;
    max-height: 100%;
    top: 0;
    right: 0;
    display: flex;
    max-width: 250px;
    width: max-content;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    background: white;
    cursor: pointer;
    z-index: 11;
    box-sizing: border-box;

    & > h3 {
        text-align: right;
    }
`;

const anm_fadein = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 100%;
    }
`;

const AccountButtonDropdown = styled(AccountButton)`
    top: 30px;
    display: none;
    max-height: none;
    flex-direction: column;
    z-index: 10;
    padding: 0px 20px;
    gap: 0px;
    animation: ${anm_fadein} 0.5s ease;
    
    & > div {
        position: relative;
        width: 130px;
        display: flex;
        font-size: 13px;
        height: 40px;
        align-items: center;
        transition: color 0.25s ease;
    }

    & > div > div > p {
        position: absolute;
        color: white ;
        font-size: 10px ;
        font-weight: bolder ;
    }

    & > div:hover {
        color: green;
        transition: color 0.25s ease;
    }

    &.active {
        display: flex;
        background: white;
        color: black;
        border-top: 1px solid #f5f5f5;
        box-shadow: 0px 3px 8px rgb(150, 150, 150);
    }
`;

const AvatarCtn = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: green;
    flex-shrink: 0;
    overflow: hidden;
    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Circle3D = styled.div`
    position: absolute;
    height: 20px;
    width: 20px;
    background: linear-gradient(#f00202 0%,rgb(230, 0, 0) 10%,rgb(167, 1, 1) 50%, rgb(92, 0, 0) 100%);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: ${props => props.position.bottom || "auto"};
    top: ${props => props.position.top || "auto"};
    right: ${props => props.position.right || "auto"};
    left: ${props => props.position.left || "auto"};
    z-index: 10;

    & > p {
        padding: 0;
        margin: 0;
    }

    & > svg {
        position: absolute;
        width: 13px;
        height: 13px;
        color: white;
    }

    &::before {
        content: "";
        height: 18px;
        width: 18px;
        background: linear-gradient(#f06060 0%, rgb(230, 0, 0) 60%,rgb(128, 3, 3) 100%);
        border-radius: 50%;
        filter: blur(1px);
    }
`;

export {
    Circle3D,
    AccountButtonDropdown,
    AccountButtonCtn,
    AvatarCtn,
    AccountButton,
    HeaderCtn
}
