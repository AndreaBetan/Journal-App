
export const fileUpload = async( file ) => {
    if ( !file ) throw new Error('No tenemos ningúna archivo a subir');

    // Ruta a las imagenes de Cloudinary
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dwkmkpx7p/upload';

    // Contruir el formData como en postman
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file );

    // Hacer la peticion al endopoint
    try {
 
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });


        if ( !resp.ok ) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json();

        console.log(resp)

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }

}