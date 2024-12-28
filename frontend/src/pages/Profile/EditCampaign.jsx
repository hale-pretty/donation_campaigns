import { useState } from "react";
import { CampaignEditBox, EditBoxHeader, EditBoxBody, EditBoxBodySection, ImageFilesCtn, ImageFile, PerkCtn, Perk, EmptyPerk, EmptyImage, EditButton, DeleteButton } from "./styles";
import svg from "~/pages/Profile/svg";
import images from "~/images/base64";
import { useSelector } from "react-redux";
import { triggerHiddenInputFromExistingImg, triggerHiddenInputFromParent, getImageSrc } from "./pureFunctions";
import graphql_api from "~/graphql";


function EditCampaign({ setIsEditing }) {
    const { id, token } = useSelector(state => state.user);
    const editing_campaign = useSelector(state => state.campaign.editing_campaign);
    console.log("editing_campaign: ", editing_campaign);
    const [title, setTitle] = useState("");
    const [imagesFile, setImagesFile] = useState([]);
    const [perks, setPerks] = useState([]);
    const [editingPerk, setEditingPerk] = useState(null);
    const [perk, setPerk] = useState(editingPerk === null ? null : perks[editingPerk]);
   
    const handleAddImages = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        const base64 = [];
        for (let i = 0; i < files.length; i++) {
            console.log(i);
            base64.push(await getImageSrc(files[i]));
        }
        setImagesFile(base64);
    }

    const handleSavePerk = () => {
        setPerks(prev => {
            if (!perk.hasOwnProperty("base64_image")) {
                perk.base64_image = images.noimage;
            }
            return [...prev, perk]
        });
        setPerk(null);
    }

    const updatePerks = (index) => {
        const newPerks = structuredClone(perks);
        newPerks[index] = perk;
        setEditingPerk(null);
        setPerks(newPerks);
        setPerk({});
    }

    const addNewPerk = () => {
        setPerk({});
    }

    const handlePerkImg = async (e) => {
        console.log(e.target.files);
        if (e.target.files.length > 0) {
            const base64 = await getImageSrc(e.target.files[0]);
            setPerk(prev => ({
                ...prev,
                base64_image: base64
            }))
        }
    }

    const handleSubmitCampaign = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = {
            title: formData.get("title"),
            description: formData.get("description"),
            goal_amount: parseFloat(formData.get("goal_amount")),
            raised_amount: 0,
            start_date: formData.get("start_date"),
            end_date: formData.get("end_date"),
            status: "indemand",
            user_id: id
        }
        console.log({
            input: inputs,
            images: imagesFile,
            perks: perks,
        })
        // const res = await graphql_api.addEditCampaign({
        //     input: inputs,
        //     images: imagesFile,
        //     perks: perks,
        // }, token);
        setIsEditing(false);
        // console.log(res);
    }

    
    return (
        <CampaignEditBox>
            <EditBoxHeader>
                <h1>Editting: {editing_campaign.title}</h1>
                <svg onClick={() => setIsEditing(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            </EditBoxHeader>
            <form onSubmit={handleSubmitCampaign}>
            <EditBoxBody>
                <EditBoxBodySection>
                    <h1>Campaign Title</h1>
                    <h3>What is the title of your campaign?</h3>
                    <input name="title" onChange={(e) => setTitle(e.target.value)} value={title} />
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Campaign Tagline</h1>
                    <h3>Provide a short description that best describes your campaign to your audience.</h3>
                    <textarea name="description" rows="5"></textarea>
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Goal Amount</h1>
                    <h3>Discriptions</h3>
                    <input style={{ width: "100px" }} name="goal_amount"
                    type="number" required placeholder="10,000.00"/>
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Feature Images</h1>
                    <h3>Discriptions</h3>
                    
                    <ImageFilesCtn>
                        <EmptyImage>
                            <div onClick={triggerHiddenInputFromParent}>
                                <input type="file" multiple onChange={(e) => handleAddImages(e)} hidden/>
                                <h3>Add images</h3>
                                {svg.add()}
                            </div>
                        </EmptyImage>
                        {(editing_campaign.hasOwnProperty("get_images")) && editing_campaign.get_images.map((img, index) => (
                            <ImageFile key={index}>
                                <EditButton className="edit">{svg.pencil()}</EditButton>
                                <DeleteButton className="edit">{svg.trash()}</DeleteButton>
                                <img src={img} />
                            </ImageFile>
                        ))}
                    </ImageFilesCtn>
                    
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Location</h1>
                    <h3>Discriptions</h3>
                    <input name="location" />
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Category</h1>
                    <h3>Discriptions</h3>
                    <select name="duration">
                        <option value="">US</option>
                    </select>
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Perks for donators (optional)</h1>
                    <h3>Discriptions</h3>
                    <PerkCtn>
                        {(editing_campaign.hasOwnProperty("get_perks")) && editing_campaign.get_perks.map((item, index) => (<Perk key={index} className={editingPerk === index ? "" : "saved"}>
                            <div onClick={editingPerk === index ? triggerHiddenInputFromExistingImg : null}>
                                <input type="file" hidden onChange={editingPerk === index ? (e) => handlePerkImg(e) : null} />
                                <img src={editingPerk === index ? perk.base64_image : item.base64_image}/>
                            </div>
                            <label>Title</label>
                            <input 
                                onChange={editingPerk === index ? (e) => setPerk(prev => ({...prev, title: e.target.value})) : null}
                                value={editingPerk === index ? perk.title : item.title}
                                disabled={editingPerk !== index} />
                            <label>Amount</label>
                            <input 
                                onChange={editingPerk === index ? (e) => setPerk(prev => ({...prev, amount: e.target.value})) : null} 
                                value={editingPerk === index ? perk.amount : item.amount}
                                disabled={editingPerk !== index} />
                            <div onClick={editingPerk === index ? () => updatePerks(index) : null}>Save</div>
                        </Perk>))}
                        {perk !== null && <Perk>
                            <div onClick={triggerHiddenInputFromExistingImg}>
                                <input type="file" hidden onChange={(e) => handlePerkImg(e)} />
                                <img src={perk.hasOwnProperty("base64_image") ? perk.base64_image : images.noimage}/>
                            </div>
                            <label>Title</label>
                            <input 
                                onChange={(e) => setPerk(prev => ({...prev, title: e.target.value}))}
                                value={perk.hasOwnProperty("title") ? perk.title : ""}
                            />
                            <label>Amount</label>
                            <input 
                                onChange={(e) => setPerk(prev => ({...prev, amount: parseFloat(e.target.value)}))} 
                                value={perk.hasOwnProperty("amount") ? perk.amount : 0}
                            />
                            <div onClick={handleSavePerk}>Save</div>
                            </Perk>}
                        <EmptyPerk>
                            <div onClick={addNewPerk}>
                                <h3>Add perk</h3>
                                {svg.add()}
                            </div>
                        </EmptyPerk>
                    </PerkCtn>
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Campaign Duration</h1>
                    <h3>Discriptions</h3>
                    <label htmlFor="">Start date:</label>
                    <input style={{ width: "100px" }} name="start_date"
                    type="date" />
                    <label htmlFor="">End date:</label>
                    <input style={{ width: "100px" }} name="end_date"
                    type="date" />
                </EditBoxBodySection>
                <button type="submit">SUBMIT</button>
            </EditBoxBody>
            </form>
        </CampaignEditBox>
    )
}

export default EditCampaign;
