import { EditContainer, EditSection, ImageCtn } from "./styles";
import svg from '../Profile/svg';
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { getImageSrc } from "../../pure-functions";
import images from "../../images/base64";

function EditProfile() {
    const coverFileRef = useRef();
    const avatarFileRef = useRef();
    const { avatar, profile_image } = useSelector(state => state.user.hasOwnProperty("info") ? state.user.info : {});
    const [coverImg, setCoverImage] = useState("");
    const [avatarImg, setAvatarImage] = useState("");
    const handleAvatarChange = async (e) => {
        console.log(e.target.files[0]);
        const newImg = await getImageSrc(e.target.files[0]);
        setAvatarImage(newImg);
    }
    const handleCoverImgChange = async (e) => {
        console.log(e.target.files[0]);
        const newImg = await getImageSrc(e.target.files[0]);
        setCoverImage(newImg);
    }
    useEffect(() => {
        setCoverImage(profile_image);
        setAvatarImage(avatar);
    }, [avatar, profile_image]);
    return (
        <form>
        <EditContainer>
                <EditSection>
                    <h1>Basic info</h1>
                    <div>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" id="firstname" />
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" />
                        <label htmlFor="country">Country</label>
                        <input type="text" />
                        <label htmlFor="city">City</label>
                        <input type="text" />
                    </div>
                </EditSection>
                <EditSection>
                    <h1>Your story</h1>
                    <div>
                        <label htmlFor="short-description">Short Description</label>
                        <input type="text" style={{ width: "100%" }} />
                        <label htmlFor="about-me">About me</label>
                        <textarea name="" id="" rows="20"></textarea>
                    </div>
                </EditSection>
                <EditSection>
                    <h1>Your Photos</h1>
                    <div style={{ flexDirection: "row", gap: "40px" }}>
                        <div>
                            <label htmlFor="">Cover Image</label>
                            <input ref={coverFileRef} type="file" hidden onChange={handleCoverImgChange} />
                            <ImageCtn onClick={() => coverFileRef.current.click()}>
                                {coverImg === ""
                                    ? <><h3>Add image</h3>{svg.add()}</>
                                    : <img src={coverImg} />
                                }
                            </ImageCtn>
                        </div>
                        <div>
                            <label htmlFor="">Avatar</label>
                            <input ref={avatarFileRef} type="file" hidden onChange={handleAvatarChange} />
                            <ImageCtn onClick={() => avatarFileRef.current.click()}>
                            {avatarImg === ""
                                ? <><h3>Add image</h3>{svg.add()}</>
                                : <img src={avatarImg} />
                            }
                            </ImageCtn>
                        </div>
                    </div>
                </EditSection>
        </EditContainer>
        </form>
    )
}

export default EditProfile;
