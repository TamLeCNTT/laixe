import { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../Layout/Header';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import CabinService from '../../Service/CabinService';
import Loading from '../../Layout/Loading';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import { Modal } from "react-bootstrap";
const Cabin_edit = (props) => {
    const [ngays, setngays] = useState()
    const [songuoi, setsonguoi] = useState('')
    const [buoi, setbuoi] = useState('')
    const [giaovien, setgiaovien] = useState('')
    const [load, setLoad] = useState(false)
    const [show, setshow] = useState(false);
    const [listdata, setList] = useState([])
    let { id } = useParams()
    let navitive = useNavigate()
    const changeNgayhoc = (e) => {
        setngays(e.target.value)
        CabinService.getBymonth(new Date(e.target.value).getMonth() + 1).then(res => {
            console.log(res.data, e.target.value)
            setList([...res.data])
            setngays(e.target.value)
        }).catch(er => {
            console.log(er)
        })

    }
    const save = (e) => {
        let date = new Date(ngays)

        console.log(date.getMonth() + 1)
        if (!ngays)
            toast.error("Vui lòng chọn ngày học")
        else {
            if (!buoi)
                toast.error("Vui lòng chọn buổi học")
            else
                if (!giaovien) toast.error("Vui lòng nhập giáo viên")
                else
                    if (!songuoi) toast.error("Vui lòng nhập số học viên ")
                    else {

                        let list = listdata.filter(e => e.ngay == ngays && e.buoi == buoi && e.cabinId != id)
                        let sl = 0

                        list.map((item, index) => {
                            if (item.cabinId != props.id)
                                sl += Number(item.songuoi)
                        })
                        console.log(listdata, list, sl, Number(songuoi))
                        if (sl + Number(songuoi) > 4) {
                            toast.error((buoi == 1 ? "Sáng " : buoi == 2 ? "Trưa" : "Chiều") + " ngay " + ngays + " đã có " + sl + " người đặt")
                            return;
                        }
                        else {
                            let cabin = { ngay: ngays + '', giaovien: giaovien, songuoi: songuoi, buoi: buoi }
                            console.log(cabin)
                            CabinService.edit(props.id, cabin).then(res => {
                                toast.success("Cập nhật thành công")
                                props.save()
                                setLoad(true)
                                setshow(false)

                            })
                        }



                    }
        }


    }
    const openModal = () => {
        console.log(props.listcbedit)
        CabinService.getByid(props.id).then(res => {
            setbuoi(res.data.buoi)
            setgiaovien(res.data.giaovien)
            setsonguoi(res.data.songuoi)
            setngays(res.data.ngay)
            console.log(res.data)

        })
        setLoad(true)
        setshow(true)

    };

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
            <a href="#" className="edit" data-dismiss="alert" aria-label="edit" onClick={() => openModal()}>
                <span aria-hidden="true"><i className="fa fa-edit"></i></span>

            </a>

            <Modal
                show={show}
                onHide={() => setshow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <h3 className="text-center">Ngày </h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section id="about" className="about">

                        <h1 id="title" className="text-center mb-5">CHỈNH SỬA LỊCH HỌC CABIN </h1>


                        <div className="container" data-aos="fade-up">
                            <div className="row">
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="inputLocation">Ngày học</label>
                                        <input className="form-control" onChange={(event) => changeNgayhoc(event)} value={ngays} type="date" placeholder="Enter your location" />
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
                                        <input type="text" className="form-control" id="teacher" onChange={(event) => changegiaovien(event)} value={giaovien} placeholder="Giáo viên" />
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
                                    <button type="submit" className="btn btn-primary mt-4 w-100 btn-lg p-4" onClick={(e) => save(e)}>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </section >
                </Modal.Body>
            </Modal>




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
        saves: (e) => dispatch({ type: 'ADDCABIN', payload: e }),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cabin_edit);