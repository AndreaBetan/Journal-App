import { ImageList, ImageListItem } from "@mui/material"


export const ImageGalery = ({images}) => {
    return (

        <ImageList sx={{ width: '100%', height: 500 }} variant="woven" cols={3} gap={8}>
            {images.map((image) => (
                <ImageListItem key={image}>
                    <img
                        srcSet={`${image}?w=161&fit=crop&auto=format&dpr=2 2x`}
                        src={`${image}?w=161&fit=crop&auto=format`}
                        alt='Imagen de la nota'
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

