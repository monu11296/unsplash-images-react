import React, { useEffect, useState } from 'react'
import { getImages } from '../utils/UnsplashAPICall'
// import { TEST_RESPONSE } from '../constants'
import Button from 'react-bootstrap/Button'

import store from 'store'

import ImageCards from './ImageCards'

const ShowImages: React.FC = () => {

    let [images, setImages]: any = useState([])
    const [currentUser, setCurrentUser] = useState('')
    let [favouritePictures, setFavouritePictures]: any = useState([])


    useEffect(() => {
        store.each(function (value, key: any) {
            if (value['isLoggedIn'] === true) {
                setCurrentUser(key)
                return
            }
        })
        getPictures()
    }, [currentUser])

    const getPictures = async () => {

        images = []
        let pics: any = await getImages('random'
            , { count: 6 }
        )

        if (typeof (pics) === 'object' && Object.keys(pics).length > 0) {
            console.log(pics)
            if (!pics.error) {
                images = pics
                setImages(images)
            }
        }
        else {
            // images = [...TEST_RESPONSE, ...TEST_RESPONSE, ...TEST_RESPONSE, ...TEST_RESPONSE, ...TEST_RESPONSE]
            // console.log(images)
            setImages([])
        }
    }


    const favourite = (event: any, elm: any) => {
        event.preventDefault()

        let user = store.get(currentUser)

        if (!user['favourite_images'])
            user['favourite_images'] = []

        user['favourite_images'].push(elm.id)
        store.set(currentUser, user)

        favouritePictures.push(elm.id)
        setFavouritePictures(favouritePictures)

        alert(elm.id + ' Image In Favourite List')
    }


    const markFavouriteButton = (elm: any) => {


        if (favouritePictures.indexOf(elm.id) === -1) {
            return <Button onClick={(event: any) => favourite(event, elm)}>Mark Favourite</Button>
        } else {
            return <Button className="btn btn-success">Image In Favourite List</Button>
        }
    }

    return (
        <div>
            <h4>Random Unsplash Images
            &nbsp;&nbsp;
            <Button onClick={(event: any) => getPictures()} className="btn btn-success">Get New Images</Button>
            </h4>
            <ImageCards
                user={images}
                button={markFavouriteButton}
            />
        </div>
    )
}


export default ShowImages