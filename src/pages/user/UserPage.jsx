import React, {useEffect} from 'react';
import cls from "./User.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../feature/service/getProfile.js";


const UserPage = () => {
    const dispatch = useDispatch();
    const userDate = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getProfile())
    }, []);

    return (
        <>
            <div className={cls.container}>
                <h1 className={'mt-32 font-bold text-4xl'}>
                    Профиль
                </h1>
                <h2>
                    Имя: {userDate.username}
                    email: {userDate.email}
                </h2>
            </div>
        </>
    );
};

export default UserPage;