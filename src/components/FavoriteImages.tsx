import React, { useEffect, useState } from 'react'
import { getImages } from '../utils/UnsplashAPICall'
// import { TEST_RESPONSE } from '../constants'

import store from 'store'

import ImageCards from './ImageCards'

const FavoriteImages: React.FC = () => {

    let [images, setImages]: any = useState([])

    useEffect(() => {
        store.each(function (value, key: any) {
            if (value['isLoggedIn'] === true) {
                getPictures(key)
                return
            }
        })
    }, [])


    const getPictures = async (key: any) => {
        images = []

        let user = store.get(key)
        let tempImages = user['favourite_images']


        if (tempImages && tempImages.length > 0) {
            for (let i = 0; i < tempImages.length; i++) {

                let pics: any = await getImages(tempImages[i])
                if (typeof (pics) === 'object' && Object.keys(pics).length > 0) {
                    if (!pics.error) {
                        images.push(pics)
                        setImages([...images])
                    }
                } else {
                    setImages([])
                }
            }
        }

    }

    return (
        <div>
            <h4>Your Favourite Images</h4>
            {
                images.length === 0 ? <p>No Favourite Images</p>
                    : <ImageCards user={images} />
            }
        </div>
    )
}


export default FavoriteImages