import { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../Layout/Header';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"

import CoHuuService from '../../Service/CoHuuService';
import Loading from '../../Layout/Loading';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import { Modal } from "react-bootstrap";
const CoHuu_Edit = (props) => {

    const [route, setroute] = useState()
    const [cohuu, setcohuu] = useState({})
    const [routechoose, setroutechoose] = useState()
    const [load, setLoad] = useState(false)
    const [show, setshow] = useState(false);


    let navitive = useNavigate()
    const changeroutechoose = (e) => {
        setroutechoose(e.target.value)
    }
    const changeroute = (e) => {
        setroute(e.target.value)
    }
    const save = (e) => {



        if (!route && !routechoose)
            toast.error("Vui lòng nhập lộ trình")
        else {
            let lt = ''
            if (!routechoose)
                lt = route
            else {
                console.log(routechoose)

                if (routechoose == 1)
                    lt = "Sóc Trăng - Trần Đề"
                if (routechoose == 2)
                    lt = "Sóc Trăng - Thạnh Trị"
                if (routechoose == 3)
                    lt = "Lịch Hội Thượng - Trần Đề"
                if (routechoose == 4)
                    lt = "Sóc Trăng - Mỹ Xuyên"
                if (routechoose == 5)
                    lt = "Nam Sông Hậu"




            }
            cohuu.lotrinh = lt
            CoHuuService.editbyid(cohuu.cohuuId, cohuu).then(res => {
                console.log(res.data)
                props.edit()

                setshow(false)
                toast.success("CậP nhật thông tin thành công")
            }).catch(err => {
                toast.error("Cập nhật không thành công")
            })


        }
    }
    const openModal = () => {
        // CoHuuService.getByid(props.id).then(res => {
        console.log(props)
        let cohuu = props.listch.filter(e => e.cohuuId == props.id)
        console.log(cohuu)
        setroute(cohuu[0].lotrinh)
        setcohuu(cohuu[0])

        // })

        setroutechoose('')
        setLoad(true)
        setshow(true)

    };


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
                        {/* <h3 className="text-center">Ngày </h3> */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section id="about" className="about">

                        <h1 id="title" className="text-center mb-5">CHỈNH SỬA LỘ TRÌNH</h1>


                        <div className="container" data-aos="fade-up">
                            <div className="row">
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="date">Ngày học</label>
                                        <input className="form-control" disabled id="date" name="location" value={cohuu.ngay} type="date" placeholder="Lộ trình đi" />
                                    </div>
                                </div>
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="teacher">Giáo viên</label>
                                        <input className="form-control" disabled id="teacher" name="location" value={cohuu.giaovien} type="text" placeholder="Lộ trình đi" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="route">Tên tuyến đường</label>
                                        <input className="form-control" id="route" name="location" onChange={(e) => changeroute(e)} value={route} type="text" placeholder="Lộ trình đi" />
                                    </div>
                                </div>
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="routechoose">&nbsp;</label>
                                        <select className="form-select " id="routechoose" onChange={(e) => changeroutechoose(e)} value={routechoose} >
                                            <option hidden value=''  >Chọn tuyến đường</option>
                                            <option value='1'  >Sóc Trăng - Trần Đề</option>
                                            <option value='2'  >Sóc Trăng - Thạnh Trị</option>
                                            <option value='3'  >Lịch Hội Thượng - Trần Đề</option>
                                            <option value='4'  >Sóc Trăng - Mỹ Xuyên</option>
                                            <option value='5'  >Nam Sông Hậu</option>
                                        </select>
                                    </div>
                                </div>

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

export default CoHuu_Edit;