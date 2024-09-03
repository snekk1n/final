import React, {useCallback, useState} from 'react';

import cls from "./Auth.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {authSliceActions} from "../../../feature/slice/authSlice.js";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const data = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const onChange = useCallback((target) => {
        const { id, value } = target
        console.log(id, value)
        // dispatch(authSliceActions());
    }, [])

    return (
        <div className={cls.main}>
            {isLogin ? "Логин" : "Регистрация"}
            <form>
                <input type="text" value={data.username} id="name" onChange={(e) => onChange(e.target)}/>
                {isLogin ? <input type="text" value={data.password} id="phoneNumber" onChange={(e) => onChange(e.target)}/>: ""}
                <input type="text" value={data.password} id="password" onChange={(e) => onChange(e.target)}/>
                <input type="text" value={data.password2} id="password2" onChange={(e) => onChange(e.target)}/>
            </form>
            <button onClick={() => setIsLogin(prevState => !prevState)}>
                 уже есть аккаунт
            </button>
        </div>
    );
};

export default Auth;