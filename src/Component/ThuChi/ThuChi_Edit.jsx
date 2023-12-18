import { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../Layout/Header';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import GiaoVienService from '../../Service/GiaoVienService';
import Loading from '../../Layout/Loading';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom"
import { Modal } from "react-bootstrap";
import ThuchiService from '../../Service/ThuchiService';
const ThuChi_Edit = (props) => {
    const [name, setname] = useState()
    const [soxe, setsoxe] = useState()

    const [load, setLoad] = useState(false)
    const [show, setshow] = useState(false);
    const [soluong, setsoluong] = useState("")
    const [content, setcontent] = useState("")
    const [date, setdate] = useState("")
    const [state, setstate] = useState("")
    let navitive = useNavigate()

    const save = (e) => {



        if (!date)
            toast.error("Vui lòng chọn ngày")
        else {
            if (!soluong)
                toast.error("Vui lòng nhập số lượng")

            else
                if (!content)
                    toast.error("Vui lòng nhập nội dung")
                else
                    if (!state)
                        toast.error("Vui lòng chọn trạng thái")
                    else {
                        let thuchi = { noidung: content, sotien: soluong, ngay: date, trangthai: state }
                        console.log(thuchi)
                        ThuchiService.editbyid(props.id, thuchi).then(res => {
                            setshow(false)
                            toast.success("Sửa thành công")
                            props.save()



                        })

                    }

        }
    }
    const openModal = () => {
        ThuchiService.getById(props.id).then(res => {
            setcontent(res.data.noidung)
            setdate(res.data.ngay)
            setsoluong(res.data.sotien)
            setstate(res.data.trangthai)
        })



        setLoad(true)
        setshow(true)

    };
    const changedate = (e) => {
        setdate(e.target.value)
        console.log(e.target.value)
    }
    const changecontent = (e) => {
        setcontent(e.target.value)
    }
    const changesoluong = (e) => {
        setsoluong(e.target.value)
    }
    const changestate = (e) => {
        setstate(e.target.value)
    }
    return (
        <>
            <a href="#" className="edit" data-dismiss="alert" aria-label="edit" onClick={() => openModal()}>
                <span aria-hidden="true"><i className="fa fa-edit"></i></span>

            </a>

            <Modal
                show={show}
                onHide={() => setshow(false)}
                dialogClassName="modal-90w modal_show"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <h1 id="title" className="text-center">THÊM GIÁO VIÊN</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section id="about" className="about">




                        <div className="container" data-aos="fade-up">
                            <div className="row">
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="date">Ngày</label>
                                        <input className="form-control" id="date" name="location" onChange={(e) => changedate(e)} value={date} type="date" placeholder="Tên giáo viên" />
                                    </div>
                                </div>
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label htmlFor="number" className='form-label'>Số lượng</label>
                                        <input type="text" className="form-control" id="number" onChange={(e) => changesoluong(e)} value={soluong} placeholder="Số lượng" />
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-4">
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="content">Nội dung</label>
                                        <input className="form-control" id="content" name="location" onChange={(e) => changecontent(e)} value={content} type="text" placeholder="Nội dung" />
                                    </div>
                                </div>
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label htmlFor="number" className='form-label'>Trạng thái</label>
                                        <select className="form-select" onChange={(e) => changestate(e)} value={state}>
                                            <option value="" hidden>Chọn trạng thái</option>
                                            <option value="1">Nhập</option>
                                            <option value="2">Gửi</option>

                                            <option value="3">Hoàn thành</option>

                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col col-md-4 offset-md-4">
                                    <button type="submit" className="btn btn-primary mt-4 w-100 btn-lg p-4" onClick={(e) => save(e)}>Thêm</button>
                                </div>
                            </div>
                        </div>
                    </section >
                </Modal.Body>
            </Modal>




        </>
    )
}

export default ThuChi_Edit;