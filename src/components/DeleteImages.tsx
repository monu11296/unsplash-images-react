import React, { useEffect, useState } from 'react'
import { getImages } from '../utils/UnsplashAPICall'
// import { TEST_RESPONSE } from '../constants'
import Button from 'react-bootstrap/Button'

import store from 'store'

import ImageCards from './ImageCards'


const DeleteImages: React.FC = () => {
    const [currentUser, setCurrentUser] = useState('')
    let [images, setImages]: any = useState([])

    useEffect(() => {
        store.each(function (value, key: any) {
            if (value['isLoggedIn'] === true) {
                setCurrentUser(key)
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
                    images.push(pics)
                    setImages([...images])
                }
            }
        }


        // images = [...TEST_RESPONSE]
        // setImages(images)
    }

    const deleteImage = (event: any, elm: any) => {
        event.preventDefault()

        let user = store.get(currentUser)

        user['favourite_images'].forEach((img: any, i: any) => {
            if (img === elm.id) {
                user['favourite_images'].splice(i, 1)
                return
            }
        })

        images.forEach((img: any, i: any) => {
            if (img === img.id) {
                images.splice(i, 1)
                setImages([...images])
                return
            }
        })

        if (user['favourite_images'].length === 0)
            delete user['favourite_images']

        store.set(currentUser, user)
        alert(elm.id + ' Image Deleted')
        window.location.href = '/delete_images'
    }


    const deleteFavourite = (elm: any) => {
        return <Button onClick={(event: any) => deleteImage(event, elm)} className="btn btn-danger">Delete</Button>
    }


    return (
        <div>
            <h3>Delete Images</h3>
            {images.length === 0 ? 'No Images to Delete'
                :
                <ImageCards
                    user={images}
                    button={deleteFavourite}
                />
            }
        </div>
    )
}



export default DeleteImages