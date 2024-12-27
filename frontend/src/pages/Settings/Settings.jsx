import { useState } from "react";
import { EditContainer, EditSection } from "./styles";

function Settings() {
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    return (
        <form>
        <EditContainer>
                <EditSection>
                    <h1>Update your email address</h1>
                    <div>
                        <label htmlFor="firstname">Email address</label>
                        {!isEditingEmail && <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                            <p>sdjkfhsjkdfhjskdfhjksdfhjkfhjkshdfjkshdjfk@gmail.com</p>
                            <div onClick={() => setIsEditingEmail(!isEditingEmail)} style={{ 
                                width: "auto",
                                height: "fit-content",
                                border: "none",
                                margin: "0px",
                                padding: "5px 10px",
                                background: "green",
                                color: "white",
                                cursor: "pointer"
                            }}>Edit</div>
                        </div>}
                        {isEditingEmail && (
                            <>
                            <input type="email" id="firstname" />
                            <label htmlFor="firstname">Current password</label>
                            <input type="email" id="firstname" />
                            </>
                        )}
                    </div>
                </EditSection>
                <EditSection>
                    <h1>Update your password</h1>
                    <div>
                        <label htmlFor="firstname">Current password</label>
                        <input type="password" id="firstname" />
                        <label htmlFor="lastname">New password</label>
                        <input type="password" />
                        <label htmlFor="country">Password confirmation</label>
                        <input type="password" />
                    </div>
                </EditSection>
        </EditContainer>
        </form>
    )
}

export default Settings;
