import { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../Layout/Header';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import CabinService from '../../Service/CabinService';
import Loading from '../../Layout/Loading';
import { connect } from 'react-redux';


const Cabin_add = (props) => {
    const [ngay, setngay] = useState('')
    const [songuoi, setsonguoi] = useState('')
    const [buoi, setbuoi] = useState('')
    const [giaovien, setgiaovien] = useState('')
    const [load, setLoad] = useState(false)
    const [listdata, setList] = useState([])
    const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    let navitive = useNavigate()
    let flag = 0
    const changeNgay = (e) => {
        CabinService.getBymonth(new Date(e.target.value).getMonth() + 1).then(res => {
            setList(res.data)

        })
        setngay(e.target.value)
    }
    const save = (e) => {
        let date = new Date(ngay)

        console.log(date.getMonth() + 1)
        if (!ngay)
            toast.error("Vui lòng chọn ngày học")
        else {
            if (!buoi)
                toast.error("Vui lòng chọn buổi học")
            else
                if (!giaovien) toast.error("Vui lòng nhập giáo viên")
                else
                    if (!songuoi) toast.error("Vui lòng nhập số học viên ")
                    else {

                        let list = listdata.filter(e => e.ngay == ngay && e.buoi == buoi)
                        let sl = 0
                        list.map((item, index) => {
                            sl += Number(item.songuoi)
                        })

                        if (sl + Number(songuoi) > 4) {
                            toast.error("Buổi sáng ngay " + ngay + " đã có " + sl + " người đặt")

                            return;
                        }
                        else {
                            let cabin = { ngay: ngay + '', giaovien: giaovien, songuoi: songuoi, buoi: buoi }
                            console.log(cabin)
                            CabinService.add(cabin).then(res => {
                                toast.success("Đăng ký thành công")
                                props.save(res.data)
                                setLoad(true)
                                setbuoi('')
                                setgiaovien('')
                                setngay('')
                                setsonguoi(0)
                            }).then(err => {
                                console.log(err)
                            }).catch(err => {
                                toast.error("Đăng ký thất bại")
                            })
                        }



                    }
        }


    }
    useEffect(() => {
        if ((!users || users.roleId != 1) && flag == 0) {
            flag = 1
            navitive("/")
            toast.error("Truy cập không được phép")
        }
        else {
            setLoad(true)
        }

    }, [])
    const changeSonguoi = (e) => {
        setsonguoi(e.target.value)
    }
    const changebuoi = (e) => {
        setbuoi(e.target.value)
    }
    const changegiaovien = (e) => {
        setgiaovien(e.target.value)
    }
    return (
        <>
            <Header />

            <main className='main' id='add-cabin'>
                {
                    load ? <section id="about" className="about">

                        <h1 id="title" className="text-center mb-5">ĐĂNG KÝ LỊCH HỌC CABIN </h1>


                        <div className="container" data-aos="fade-up">
                            <div className="row">
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="inputLocation">Ngày học</label>
                                        <input className="form-control" id="inputLocation" name="location" onChange={(e) => changeNgay(e)} value={ngay} type="date" placeholder="Enter your location" />
                                    </div>
                                </div>
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label htmlFor="session" className='form-label'>Buổi học</label>
                                        <select className="form-select" id='session' onChange={(event) => changebuoi(event)} value={buoi}>
                                            <option hidden selected>Chọn buổi học</option>
                                            <option value='1'>Sáng 7h-10h</option>
                                            <option value='2'>Trưa 10h30-13h30</option>
                                            <option value='3'>Chiều 14h-17h</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label htmlFor="teacher" className='form-label'>Giáo viên</label>
                                        <input type="text" className="form-control" id="teacher" onChange={(e) => changegiaovien(e)} value={giaovien} placeholder="Giáo viên" />
                                    </div>
                                </div>
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label htmlFor="quantity" className='form-label'>Số người</label>
                                        <select className="form-select" id='quantity' onChange={(event) => changeSonguoi(event)} value={songuoi}>
                                            <option hidden value=''  >Chọn số người</option>
                                            <option value='1'  >1</option>
                                            <option value='2'  >2</option>
                                            <option value='3'  >3</option>
                                            <option value='4'  >4</option>
                                        </select>
                                    </div>




                                </div >
                            </div>
                            <div className="row">
                                <div className="col col-md-4 offset-md-4">
                                    <button type="submit" className="btn btn-primary mt-4 w-100 btn-lg p-4" onClick={(e) => save(e)}>Đăng ký</button>
                                </div>
                            </div>
                        </div>
                    </section > :
                        <Loading />
                }



            </main >




        </>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return {


        dataRedux: state.trangthai
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        save: (e) => dispatch({ type: 'ADDCABIN', payload: e }),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cabin_add);