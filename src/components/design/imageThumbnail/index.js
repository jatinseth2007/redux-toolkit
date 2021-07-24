import "./index.css";
import { useEffect, useState } from "react";

const ImageThumbnail = ({ htmlFile = null, url = "", ...props }) => {
    const [preparedUrl, setPreparedUrl] = useState("");

    useEffect(() => {
        if (url)
            setPreparedUrl(url);
        else if (htmlFile) {
            const reader = new FileReader();
            reader.onloadend = (image) => {
                setPreparedUrl(image.target.result)
            }
            reader.readAsDataURL(htmlFile);
        }//EOI

    }, [htmlFile, url]);

    return (
        <>
            {
                (preparedUrl.length > 0)
                    ? <img alt="" src={preparedUrl} {...props} />
                    : null
            }
        </>
    );
};

export default ImageThumbnail;