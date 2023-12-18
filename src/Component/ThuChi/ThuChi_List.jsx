import Header from "../../Layout/Header";
import { useState, useEffect } from "react";
import ThuchiService from "../../Service/ThuchiService";

import Paginations from "../../support/Paginations";
// import Cabin_edit from "./Cabin_edit";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import ImPort from "../../support/ImPort";
import ThuChi_Edit from "./ThuChi_Edit";
import ThuChi_Add from "./ThuChi_Add";
import Loading from "../../Layout/Loading";
const ThuChi_List = () => {
    const [listthuchi, setlistthuchi] = useState([])
    const [lists, setLists] = useState([])
    const [listcb, setlistcb] = useState([])
    const [text, settext] = useState()
    const [date, setdate] = useState()
    const [head, sethead] = useState([])
    const [tongtien, settongtien] = useState([])
    const [load, setload] = useState(false)
    const [nhan, setnhan] = useState('')
    const [gui, setgui] = useState('')
    const [con, setcon] = useState('')
    const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    let navitive = useNavigate()
    let flag = 0
    const xoa_dau = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    const getdata = (e) => {


        toast.success("Đọc file thành công")
        console.log(e)


        // console.log(e.filter(item => new Date(item.thoigianbd).getHours() > 18))
        console.log(e.filter(item => item.soxe == "83C10207"))
        console.log(e.filter(item => item.soxe == "83C10207").reduce((a, v) => (a = a + Number(v.quangduong)), 0))
        e.filter(item => item.soxe == "83C10207").map((items, index) => {
            console.log(new Date(items.thoigianbd).getHours())
        })
        console.log(e.filter(item => item.soxe == "83C10207" && new Date(item.thoigianbd).getHours() >= 18).reduce((a, v) => (a = a + Number(v.quangduong)), 0))

    }
    useEffect(() => {
        let heads = ["name", "soxe"]
        sethead(heads)
        // if ((!users || users.roleId != 1) && flag == 0) {
        //     flag = 1
        //     navitive("/")
        //     toast.error("Truy cập không được phép")
        // }
        // else {
        setload(false)
        ThuchiService.getlist().then(
            res => {
                console.log(res.data)
                let list = res.data.filter(item => item.trangthai == 3)
                let date = ''
                console.log(list)
                if (list.length == 0) {
                    date = "1920-09-09"
                }
                else
                    date = list[list.length - 1].ngay
                console.log(list)
                let listshow = res.data.filter(item => new Date(item.ngay) > new Date(date))
                console.log(listshow)
                let gui = res.data.filter(item => new Date(item.ngay) > new Date(date) && item.trangthai == 2).reduce((a, v) => (a = a + Number(v.sotien)), 0)
                let nhan = res.data.filter(item => new Date(item.ngay) > new Date(date) && item.trangthai == 1).reduce((a, v) => (a = a + Number(v.sotien)), 0)
                setnhan(nhan)
                setgui(gui)
                setcon(nhan - gui)
                setlistthuchi(listshow.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                setlistcb(listshow.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                setload(true)
            }
        ).catch(err => {
            console.log(err)
        })
        // }


    }, [])
    const changetext = (e) => {
        settext(e.target.value)
        let list = []
        if (e.target.value)
            list = listcb.filter(item => (item.trangthai == e.target.value) || (xoa_dau(item.noidung.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true)
        else
            list = listcb
        setlistthuchi(list)
        console.log(list)
        settongtien(list.reduce((a, v) => (a = a + Number(v.sotien)), 0))



    }

    const getlist = (e) => {
        setLists(e)


    }
    const xoa = (e) => {
        let ok = window.confirm("Bạn có chắc chắn muốn xoá?")
        if (ok)
            ThuchiService.delete(e).then(
                res => {

                    toast.success("Xoá thành công")
                    ThuchiService.getlist().then(
                        res => {
                            console.log(res.data)
                            let list = res.data.filter(item => item.trangthai == 3)
                            let date = ''
                            console.log(list)
                            if (list.length == 0) {
                                date = "1920-09-09"
                            }
                            else
                                date = list[list.length - 1].ngay
                            console.log(list)
                            let listshow = res.data.filter(item => new Date(item.ngay) > new Date(date))
                            console.log(listshow)
                            let gui = res.data.filter(item => new Date(item.ngay) > new Date(date) && item.trangthai == 2).reduce((a, v) => (a = a + Number(v.sotien)), 0)
                            let nhan = res.data.filter(item => new Date(item.ngay) > new Date(date) && item.trangthai == 1).reduce((a, v) => (a = a + Number(v.sotien)), 0)
                            setnhan(nhan)
                            setgui(gui)
                            setcon(nhan - gui)
                            setlistthuchi(listshow.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                            setlistcb(listshow.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                            setload(true)
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                }
            )
    }
    const save = () => {
        ThuchiService.getlist().then(
            res => {
                console.log(res.data)
                let list = res.data.filter(item => item.trangthai == 3)
                let date = ''
                console.log(list)
                if (list.length == 0) {
                    date = "1920-09-09"
                }
                else
                    date = list[list.length - 1].ngay
                console.log(list)
                let listshow = res.data.filter(item => new Date(item.ngay) > new Date(date))
                console.log(listshow)
                let gui = res.data.filter(item => new Date(item.ngay) > new Date(date) && item.trangthai == 2).reduce((a, v) => (a = a + Number(v.sotien)), 0)
                let nhan = res.data.filter(item => new Date(item.ngay) > new Date(date) && item.trangthai == 1).reduce((a, v) => (a = a + Number(v.sotien)), 0)
                setnhan(nhan)
                setgui(gui)
                setcon(nhan - gui)
                setlistthuchi(listshow.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                setlistcb(listshow.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                setload(true)
            }
        ).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <Header />
            <main id="cabin_list" className="main">
                <div className="container">
                    {
                        load ?
                            <>
                                <div className='row mt-5  '>
                                    <div className="col col-md-4">
                                        <input type="text" className="form-control  ms-2 " id="teacher" onChange={(e) => changetext(e)} value={text} placeholder="Nhập nội dung tìm kiếm" />
                                    </div>
                                    {/* <div className="col col-md-6">
                        <input type="date" className="form-control w-50 ms-2 " id="teacher" onChange={(e) => changedate(e)} value={date} placeholder="Nhập nội dung tìm kiếm" />
                    </div> */}
                                    <div className="col col-md-2">
                                        <ThuChi_Add save={save} />
                                        {/* <ImPort getdata={getdata} head={head} data={Data} /> */}
                                    </div>


                                </div>
                                <div className="row mt-4 thead-dark p-4 text-white">
                                    <div className="col col-md-4 d-flex   justify-content-center">Tổng nhập</div>
                                    <div className="col col-md-4 d-flex   justify-content-center">Tổng gửi</div>
                                    <div className="col col-md-4 d-flex   justify-content-center">Còn lại</div>

                                </div>
                                <div className="row bg-success p-3 text-white">
                                    <div className="col col-md-4 d-flex   justify-content-center">{nhan ? nhan : 0}</div>
                                    <div className="col col-md-4 d-flex   justify-content-center">{gui ? gui : 0}</div>
                                    <div className="col col-md-4 d-flex  justify-content-center">{con ? con : 0}</div>

                                </div>
                                <table className="table">
                                    <thead className="thead-dark table-head">
                                        <tr>
                                            <th>STT</th>
                                            <th scope="col">Ngày</th>
                                            <th scope="col">Nội dung</th>

                                            <th>Số lượng</th>
                                            <th scope="col">Trạng thái</th>
                                            <th>Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lists && lists.length > 0 && (
                                                <tr>
                                                    <td colSpan={3}>Tổng</td>
                                                    <td>{tongtien}</td>
                                                </tr>
                                            )
                                        }
                                        {
                                            lists && lists.map((item, index) => {
                                                return (
                                                    <tr className="alert" role="alert" key={index}>
                                                        <td scope="row">{index + 1}</td>
                                                        <td>
                                                            {new Date(item.ngay).toLocaleDateString('en-GB')}
                                                        </td>

                                                        <td>
                                                            {item.noidung}
                                                        </td>
                                                        <td>
                                                            {item.sotien}
                                                        </td>
                                                        <td>
                                                            {item.trangthai}
                                                        </td>
                                                        <td className="manage">
                                                            <a href="#" className="close" data-dismiss="alert" aria-label="Close" onClick={() => xoa(item.thuchiId)}>
                                                                <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                                            </a>
                                                            <ThuChi_Edit id={item.thuchiId} save={save} />
                                                        </td>

                                                    </tr>

                                                )
                                            })
                                        }








                                    </tbody>
                                </table>
                                <Paginations itemsPerPage={15} list={listthuchi} getlist={getlist} />
                            </> :

                            <Loading />
                    }
                </div>
            </main>

        </>
    )
}
export default ThuChi_List;