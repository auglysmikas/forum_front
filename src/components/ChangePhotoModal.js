import React, {useContext, useRef} from 'react';
import MyContext from "../context/MyContext";
import http from "../plugins/http";

const ChangePhotoModal = () => {

    const {getUser, setUser} = useContext(MyContext)
    const {setChangePhoto} = useContext(MyContext)

    const photo = useRef()

    async function changePhoto(id) {
        const photoInfo = {
            id,
            photo: photo.current.value
        }
        http.post(photoInfo, `changePhoto`).then(res => {
            if (res.success) {
                document.body.style.overflow = 'visible'
                setChangePhoto(false)
                setUser(res.updatedUser)
            }
        })
    }


    return (

        <div>
            <div onClick={()=>setChangePhoto(false)} className="modal center">
                <div onClick={(e) => e.stopPropagation()} className="modalBox center f-column">
                    <input type="text" ref={photo} placeholder="New Link"/>
                    <button className='pressBtn' onClick={() => changePhoto(getUser._id)}>Change photo</button>
                </div>

            </div>
        </div>

    );
};

export default ChangePhotoModal;