import { useState } from "react";
import { CampaignEditBox, EditBoxHeader, EditBoxBody, EditBoxBodySection, ImageFilesCtn, ImageFile, PerkCtn, Perk, EmptyPerk } from "./styles";
import svg from "./svg";
import images from "../../images/base64";

const getImageSrc = (image) => {
    const reader = new FileReader();
    return new Promise(resolve => {
        reader.onload = ev => {
            resolve(ev.target.result);
        }
        reader.readAsDataURL(image);
    })
}

function NewCampaign({setIsAdding, isEditing}) {
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
        setPerks(prev => ([...prev, perk]));
        setPerk(null);
    }

    const updatePerks = (index) => {
        const newPerks = structuredClone(perks);
        newPerks[index] = perk;
        setEditingPerk(null);
        setPerks(newPerks);
        setPerk({});
    }

    console.log(perks);

    const addNewPerk = () => {
        setPerk({});
    }

    const handlePerkImg = async (e) => {
        console.log(e.target.files);
        if (e.target.files.length > 0) {
            const base64 = await getImageSrc(e.target.files[0]);
            setPerk(prev => ({
                ...prev,
                image: base64
            }))
        }
    }

    const addImgToPerk = (e) => {
        const inputEl = e.target.parentNode.children[0];
        inputEl.click();
        console.log(inputEl);
    }

    const handleSubmitCampaign = (e) => {
        e.preventDefault();
        console.log(e.target);
        const formData = new FormData(e.target);
        console.log("title: ", formData.get("title"));
    }
    return (
        <CampaignEditBox>
            <EditBoxHeader>
                <h1>{isEditing && "Editing Campaign: "}New Campaign Title</h1>
                <svg onClick={() => setIsAdding(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            </EditBoxHeader>
            <form onSubmit={handleSubmitCampaign}>
            <EditBoxBody>
                <EditBoxBodySection>
                    <h1>Campaign Title</h1>
                    <h3>What is the title of your campaign?</h3>
                    <input name="title" />
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Campaign Tagline</h1>
                    <h3>Provide a short description that best describes your campaign to your audience.</h3>
                    <textarea name="tagline" rows="5"></textarea>
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Feature Images</h1>
                    <h3>Discriptions</h3>
                    <input type="file" multiple onChange={(e) => handleAddImages(e)}/>
                    {(imagesFile.length > 0) && <ImageFilesCtn>
                        {imagesFile.map((img, index) => (
                            <ImageFile key={index}>
                                <img src={img} />
                            </ImageFile>
                        ))}
                    </ImageFilesCtn>}
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
                        {perks.map((item, index) => (<Perk key={index} className={editingPerk === index ? "" : "saved"}>
                            <div onClick={editingPerk === index ? addImgToPerk : null}>
                                <input type="file" hidden onChange={editingPerk === index ? (e) => handlePerkImg(e) : null} />
                                <img src={editingPerk === index ? perk.image : item.image}/>
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
                            <div onClick={addImgToPerk}>
                                <input type="file" hidden onChange={(e) => handlePerkImg(e)} />
                                <img src={perk.hasOwnProperty("image") ? perk.image : images.noimage}/>
                            </div>
                            <label>Title</label>
                            <input 
                                onChange={(e) => setPerk(prev => ({...prev, title: e.target.value}))}
                                value={perk.hasOwnProperty("title") ? perk.title : ""}
                            />
                            <label>Amount</label>
                            <input 
                                onChange={(e) => setPerk(prev => ({...prev, amount: e.target.value}))} 
                                value={perk.hasOwnProperty("amount") ? perk.amount : 0}
                            />
                            <div onClick={handleSavePerk}>Save</div>
                            </Perk>}
                        <EmptyPerk>
                            <div onClick={addNewPerk}>
                                <h3>Add perk</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                            </div>
                        </EmptyPerk>
                    </PerkCtn>
                </EditBoxBodySection>
                <EditBoxBodySection>
                    <h1>Campaign Duration</h1>
                    <h3>Discriptions</h3>
                    <input style={{ width: "50px" }}
                    type="number" placeholder="days"/>
                </EditBoxBodySection>
                <button type="submit">SUBMIT</button>
            </EditBoxBody>
            </form>
        </CampaignEditBox>
    )
}

export default NewCampaign;
