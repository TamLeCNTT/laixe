import { useState } from 'react';
import { toast } from 'react-toastify';
import GiaoVienService from '../../Service/GiaoVienService';
import { Modal } from "react-bootstrap";
const GiaoVien_Edit = (props) => {
    const [name, setname] = useState('')
    const [soxe, setsoxe] = useState('')

    const [show, setshow] = useState(false);

    const save = (e) => {



        if (!name)
            toast.error("Vui lòng nhập tên giáo viên")
        else {
            if (!soxe)
                toast.error("Vui lòng nhập số xe")
            else {
                let giaovien = { name: name, soxe: soxe }

                GiaoVienService.edit(props.id, giaovien).then(res => {
                    toast.success("Cập nhật thành công")
                    props.save()

                    setshow(false)

                })

            }

        }
    }
    const openModal = () => {
        GiaoVienService.getByid(props.id).then(res => {

            setname(res.data.name)
            setsoxe(res.data.soxe)
        })

        setshow(true)

    };
    const changename = (e) => {
        setname(e.target.value)
        console.log(e.target.value)
    }
    const changesoxe = (e) => {
        setsoxe(e.target.value)
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
                        <h1 id="title" className="text-center">CHỈNH SỬA GIÁO VIÊN</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section id="about" className="about">




                        <div className="container" data-aos="fade-up">
                            <div className="row">
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label className="form-label" htmlFor="teacher">Tên Giáo Viên</label>
                                        <input className="form-control" id="teacher" name="location" onChange={(e) => changename(e)} value={name} type="text" placeholder="Tên giáo viên" />
                                    </div>
                                </div>
                                <div className="col col-md-6">
                                    <div className='md-4'>
                                        <label htmlFor="number" className='form-label'>Giáo viên</label>
                                        <input type="text" className="form-control" id="number" onChange={(e) => changesoxe(e)} value={soxe} placeholder="Biển số xe" />
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

export default GiaoVien_Edit;