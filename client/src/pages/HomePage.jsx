import { Link } from "react-router-dom";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

function HomePage() {
    document.title = "GSET23BSG";

    return (
        <div>
            <p>
                Hello this is our project on Blockchain for the Social Good
            </p>

            <div className="home-image-container">
                <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/57f3a284-9cc1-4447-90c2-518971a3a8a5/out-0.png" />
                <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/1e326180-9e4d-425f-b903-5bd97a1770dd/out-0.png" />
                <img src="https://replicate.com/api/models/stability-ai/stable-diffusion/files/928234b0-22b4-4938-8552-1af213b7294f/out-0.png" />
            </div>
        </div>
        );
    }
    
    export { HomePage };