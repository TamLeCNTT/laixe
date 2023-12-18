
import { NavLink } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import UserService from '../../Service/UserService';
import { connect } from 'react-redux';

import Header from '../../Layout/Header';

const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [check, setCheck] = useState(false)
    let flag = 0
    let navitive = useNavigate()

    useEffect(() => {
        const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        if (users && flag == 0) {
            flag = 1
            toast.info("Vui lòng đăng xuất trước")
            navitive('/')
        }




    }, [])




    const ChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const ChangePassword = (e) => {
        console.log(e.target.value)
        setPassword(e.target.value)
    }
    const ChangeCheck = () => {
        console.log(check)
        setCheck(!check)
    }
    const login = (e) => {
        let user = { username: username, password: password }
        console.log(user)
        UserService.login(user).then(res => {
            if (res.data) {
                res.data.password = "@299qwn8y2822n292223"
                localStorage.setItem("user", JSON.stringify(res.data))
                toast.success("Đăng nhập thành công")
                props.login(res.data)
                navitive("/")
            }
            else {
                toast.error("Tài khoản hoặc mật khẩu không đúng !")
            }
        })
    }

    return (
        <>
            <Header />
            <main className='main'>


                <section id="about" className="about">
                    <div className="container" >

                        <div className="row py-5 mt-4 align-items-center">

                            <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                                <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 " />
                                <h1 className='d-flex justify-content-center fw-bold'>Chào mừng bạn trở lại</h1>
                                {/* <p className="font-italic text-muted mb-0">Create a minimal registeration page using Bootstrap 4 HTML form elements.</p>
                                <p className="font-italic text-muted">Snippet By <a href="https://bootstrapious.com" className="text-muted">
                                    <u>Bootstrapious</u></a>
                                </p> */}
                            </div>


                            <div className="col-md-7 col-lg-6 ml-auto">

                                <div className="row">
                                    <h3 className='title d-flex justify-content-center'>Đăng nhập</h3>

                                    <div className="input-group col-6 mb-2">

                                        <input id="firstName" type="text" name="firstname" placeholder="Tên đăng nhập" value={username} onChange={(e) => ChangeUsername(e)} className="form-control bg-white border-left-0 border-md"
                                            onKeyPress={event => {
                                                if (event.key === 'Enter') {
                                                    login(event)
                                                }
                                            }} />
                                    </div>


                                    <div className="input-group col-6 mb-4">

                                        <input id="lastName" type="password" name="lastname" placeholder="Mật khẩu" value={password} onChange={(e) => ChangePassword(e)} className="form-control bg-white border-left-0 border-md" onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                login(event)
                                            }
                                        }} />
                                    </div>





                                    <div className="form-group d-flex justify-content-center col-lg-12 ">
                                        <button className="btn btn-primary  btn-lg p-3" onClick={(e) => login(e)}>
                                            <span className="font-weight-bold">Đăng nhập</span>
                                        </button>
                                    </div>



                                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                        <div className="border-bottom w-100 ml-5"></div>
                                        <span className="px-2 small text-muted font-weight-bold text-muted">Hoặc</span>
                                        <div className="border-bottom w-100 mr-5"></div>
                                    </div>




                                    <div className="text-center w-100">
                                        <p className="text-muted font-weight-bold">Bạn chưa có tài khoản?  <NavLink style={{ "textDecoration": "none" }} to="/register" activeclassname="nav-link scrollto">
                                            Đăng ký
                                        </NavLink></p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>






        </>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return {


        dataRedux: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (e) => dispatch({ type: 'LOGIN', payload: e }),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);