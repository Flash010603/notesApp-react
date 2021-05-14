
export const fileUpload = async(file) => {
    
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dnxchppfm/upload';

    const formData = new FormData();
    formData.append('upload_preset','react-journal')
    formData.append('file',file);

    try {
        
        const res = await fetch(cloudinaryUrl,{
            method: 'POST',
            body: formData
        });

        if(res.ok){
            
            const data = await res.json();

            return data.secure_url;
        }else{
            console.log(await res.json())
        }

    } catch (error) {
        console.log(error)
    }

};